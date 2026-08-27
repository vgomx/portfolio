# hero-globe

Sources for the home page hero animation — the dot map that traces
São Paulo → Santos → Amsterdam.

## Why it's built this way

The hero used to be a Leaflet map on third-party raster tiles. In August 2026
the provider began stamping **"API key required"** across the tiles it served
for unauthenticated requests. Nothing in this repo changed, and nothing broke
loudly: the tiles still returned `200 OK` with a valid PNG, so Leaflet
rendered them normally and the watermark just appeared on the site.

Swapping providers would have left the same failure mode in place, so the map
now draws itself from coastline data baked into the bundle. It makes **no
network requests at all**, which also let Leaflet go — about 147 KB of JS,
plus its stylesheet and control icons.

## Files

| | |
|---|---|
| `camera.js` | Web Mercator projection and the scripted fly-to. Replaces the only parts of Leaflet the animation actually used. |
| `dotmap.js` | The renderer, plus the component's camera methods. Rasterises land into an offscreen canvas at one pixel per lattice dot, then draws a dot per covered cell. |
| `land.json` | Baked coastline, ~45 KB. Generated — don't hand-edit. |
| `gen-land.py` | Regenerates `land.json` from Natural Earth. |
| `build.py` | Injects the above into `public/hero-globe.html`. |

## Editing the animation

```bash
# edit camera.js / dotmap.js, then:
python3 scripts/hero-globe/build.py
```

`public/hero-globe.html` is a single-file bundle from an external tool (a JSON
template plus gzipped, base64'd assets). We don't have that tool, so `build.py`
edits the bundle in place, replacing two sentinel-delimited blocks:

```
/* ==== hero-globe/camera ... ==== */   camera.js + land.json
/* ==== hero-globe/dotmap ... ==== */   dotmap.js
```

It's idempotent — running it with no source changes rewrites the file
byte-for-byte. Everything *outside* those sentinels (the design system styles,
the markup, the animation sequence, the fonts) is only editable by hand in the
bundle, so treat the bundle as the source of truth for those.

## Regenerating the coastline

```bash
python3 scripts/hero-globe/gen-land.py && python3 scripts/hero-globe/build.py
```

Only needed if you change resolution, simplification tolerance, or the local
window. Downloads ~18 MB from
[natural-earth-geojson](https://github.com/martynafford/natural-earth-geojson)
into `.cache/` (git-ignored) on first run.

Natural Earth is public domain and requires no attribution, which is why the
hero no longer carries an attribution line.

### The two datasets

The animation spans zoom ~9.9 down to ~2.8 and back to 4.7, which is too wide
a range for one dataset:

- **`g`** — 110m global, ~0.05° tolerance. Drawn below zoom 9.5, where one
  lattice dot spans ≥ 0.05° and finer data would be invisible anyway.
- **`l`** — 10m, clipped to a window around São Paulo, ~0.004° tolerance. The
  city leg runs at zoom ~9.9, where a dot spans ~0.01° and the 110m coastline
  is a smear — it loses the Santos estuary entirely.

`GRID_LO`/`GRID_HI` in `dotmap.js` crossfade between them so the detail
resolves in rather than popping. Two things to know if you move that band:

- It sits **high (8.5–9.5) on purpose.** The fly-out pans hundreds of km
  inland as it zooms out, so a lower band would hand over with the 10m
  window's edge on screen, seaming the two datasets together in full view.
- `BBOX` in `gen-land.py` must stay wider than the viewport at `GRID_LO`,
  with headroom for wide displays, for the same reason.

Clipping is real geometry (Sutherland-Hodgman), not a bounding-box filter on
whole rings — South America is a single ring, so an intersection test keeps
the entire continent and the patch balloons from 12 KB to 250 KB.
