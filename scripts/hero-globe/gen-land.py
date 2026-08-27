#!/usr/bin/env python3
"""Bake the hero map's coastline data.

Downloads Natural Earth land polygons, simplifies them to the resolution the
dot lattice can actually show, and writes land.json for build.py to inline.

Two datasets, because the animation spans a huge zoom range:

  g  110m global, ~0.05 deg tolerance. Only ever drawn below zoom 9.5, where
     one lattice dot spans >= 0.05 deg, so finer data would be invisible.
  l  10m clipped to a window around Sao Paulo, ~0.004 deg tolerance. The
     Sao Paulo -> Santos leg runs at zoom ~9.9, where a dot spans ~0.01 deg
     and the 110m coastline is a smear. The window is sized to cover the
     viewport for the whole crossfade band, with headroom for wide screens.

The 10m source is ~18MB; it is cached in CACHE and clipped down to a few KB.
Re-run only when you want to change resolution, tolerance, or the window.

    python3 scripts/hero-globe/gen-land.py
"""
import json
import math
import os
import sys
import urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
CACHE = os.path.join(HERE, '.cache')
BASE = 'https://raw.githubusercontent.com/martynafford/natural-earth-geojson/master'

# Window for the 10m patch: lon/lat rectangle around Sao Paulo and Santos.
# Must stay wider than the viewport at GRID_LO (see dotmap.js) or the patch's
# edge shows up on screen during the crossfade.
BBOX = (-62.0, -38.0, -31.0, -10.0)


def fetch(rel):
    """Download a Natural Earth file, caching it next to this script."""
    os.makedirs(CACHE, exist_ok=True)
    path = os.path.join(CACHE, os.path.basename(rel))
    if not os.path.exists(path):
        url = '%s/%s' % (BASE, rel)
        sys.stderr.write('downloading %s\n' % url)
        urllib.request.urlretrieve(url, path)
    return path


def rings(path):
    """Every exterior ring in a GeoJSON land file, as [(lon, lat), ...]."""
    out = []
    for f in json.load(open(path))['features']:
        g = f['geometry']
        polys = [g['coordinates']] if g['type'] == 'Polygon' else g['coordinates']
        for poly in polys:
            out.append([tuple(p[:2]) for p in poly[0]])  # exterior only; holes are lakes
    return out


def simplify(pts, tol):
    """Douglas-Peucker. Iterative, so deep rings can't blow the stack."""
    if len(pts) < 3:
        return pts
    keep = [False] * len(pts)
    keep[0] = keep[-1] = True
    stack = [(0, len(pts) - 1)]
    while stack:
        a, b = stack.pop()
        if b <= a + 1:
            continue
        ax, ay = pts[a]
        bx, by = pts[b]
        dx, dy = bx - ax, by - ay
        den = dx * dx + dy * dy
        worst, wi = -1.0, -1
        for i in range(a + 1, b):
            px, py = pts[i]
            if den == 0:
                d = math.hypot(px - ax, py - ay)
            else:
                t = max(0.0, min(1.0, ((px - ax) * dx + (py - ay) * dy) / den))
                d = math.hypot(px - ax - t * dx, py - ay - t * dy)
            if d > worst:
                worst, wi = d, i
        if worst > tol:
            keep[wi] = True
            stack += [(a, wi), (wi, b)]
    return [p for p, k in zip(pts, keep) if k]


def clip(ring, bb):
    """Sutherland-Hodgman: clip a closed ring to a lon/lat rectangle.

    Filtering whole rings by bbox is not enough — South America is a single
    ring, so an intersection test keeps the entire continent (250KB rather
    than 12KB). This cuts the geometry itself.
    """
    w, s, e, n = bb

    def half(pts, inside, isect):
        if not pts:
            return []
        out = []
        for i in range(len(pts)):
            a, b = pts[i - 1], pts[i]
            ia, ib = inside(a), inside(b)
            if ib:
                if not ia:
                    out.append(isect(a, b))
                out.append(b)
            elif ia:
                out.append(isect(a, b))
        return out

    def ix(a, b, x):
        t = (x - a[0]) / (b[0] - a[0])
        return (x, a[1] + t * (b[1] - a[1]))

    def iy(a, b, y):
        t = (y - a[1]) / (b[1] - a[1])
        return (a[0] + t * (b[0] - a[0]), y)

    p = list(ring)
    p = half(p, lambda q: q[0] >= w, lambda a, b: ix(a, b, w))
    p = half(p, lambda q: q[0] <= e, lambda a, b: ix(a, b, e))
    p = half(p, lambda q: q[1] >= s, lambda a, b: iy(a, b, s))
    p = half(p, lambda q: q[1] <= n, lambda a, b: iy(a, b, n))
    return p


def encode(rs, scale):
    """Quantise to `scale` units per degree, then delta-encode.

    Deltas are small integers, so this costs far fewer bytes than absolute
    floats. dotmap.js walks them back to absolute coords at load.
    """
    out = []
    for r in rs:
        q = [(round(x * scale), round(y * scale)) for x, y in r]
        d = [q[0]]
        for p in q[1:]:
            if p != d[-1]:      # drop duplicates created by quantising
                d.append(p)
        if len(d) < 4:
            continue
        flat = [d[0][0], d[0][1]]
        for i in range(1, len(d)):
            flat += [d[i][0] - d[i - 1][0], d[i][1] - d[i - 1][1]]
        out.append(flat)
    return out


def main():
    g = [simplify(r, 0.05) for r in rings(fetch('110m/physical/ne_110m_land.json'))]
    G = encode([r for r in g if len(r) >= 4], 100)          # 0.01 deg units

    l = [clip(r, BBOX) for r in rings(fetch('10m/physical/ne_10m_land.json'))]
    l = [simplify(r, 0.004) for r in l if len(r) >= 4]
    L = encode([r for r in l if len(r) >= 4], 1000)         # 0.001 deg units

    out = os.path.join(HERE, 'land.json')
    json.dump({'g': G, 'l': L, 'bb': BBOX}, open(out, 'w'), separators=(',', ':'))

    for name, d in (('110m global', G), ('10m patch', L)):
        pts = sum(len(r) // 2 for r in d)
        kb = len(json.dumps(d, separators=(',', ':'))) / 1024
        print('%-12s %3d rings  %6d pts  %6.1f KB' % (name, len(d), pts, kb))
    print('wrote %s (%.1f KB)' % (out, os.path.getsize(out) / 1024))


if __name__ == '__main__':
    main()
