#!/usr/bin/env python3
"""Generate small thumbnails for the home page's CRT hover preview.

The preview window is 248px wide but was loading full case-study images —
several MB to show a thumbnail. Astro's <Image /> cannot help here: the
preview is a React island (Image is an Astro component), the sources live
in public/ (which astro:assets does not process), and the src is chosen at
runtime from content data, so there is nothing to analyse statically.

So we pre-generate instead. Re-run after changing HOME_PICKS or the body
images of a featured case:

    python3 scripts/gen-preview-thumbs.py
"""
import re, pathlib
from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / 'public/images/_previews'
WIDTH = 496          # 2x the 248px window, for retina
IMG_RE = re.compile(r'\.(png|jpe?g|webp|gif|avif)(\?|$)', re.I)

def thumb_path(src: str) -> str:
    """Mirror of the mapping in HoverPreview.jsx — keep the two in step."""
    stem = src.replace('/images/', '').rsplit('.', 1)[0].replace('/', '-')
    return f'/images/_previews/{stem}.webp'

picks = re.search(r'const HOME_PICKS = \[(.*?)\]',
                  (ROOT / 'src/components/HomeScreen.jsx').read_text(), re.S).group(1)
slugs = re.findall(r"'([^']+)'", picks)

OUT.mkdir(parents=True, exist_ok=True)
made = saved = 0
for slug in slugs:
    t = (ROOT / f'src/content/work/{slug}.md').read_text()
    cover = re.search(r'^coverImage:\s*"([^"]+)"', t, re.M)
    body = re.findall(r'^\s*-\s*src:\s*"([^"]+)"', t, re.M)
    srcs, seen = [], set()
    for s in ([cover.group(1)] if cover else []) + body:
        if IMG_RE.search(s) and s.startswith('/') and s not in seen:
            seen.add(s); srcs.append(s)
    for s in srcs[:6]:
        src_p = ROOT / ('public' + s)
        if not src_p.exists():
            print(f'  missing, skipped: {s}'); continue
        dst = ROOT / ('public' + thumb_path(s).lstrip('/')).replace('public/', 'public/', 1)
        dst = ROOT / 'public' / thumb_path(s).lstrip('/')
        dst.parent.mkdir(parents=True, exist_ok=True)
        im = Image.open(src_p)
        im.seek(0)                                  # animated sources: first frame
        im = im.convert('RGBA' if 'A' in im.getbands() else 'RGB')
        if im.width > WIDTH:
            im = im.resize((WIDTH, round(im.height * WIDTH / im.width)), Image.LANCZOS)
        im.save(dst, 'WEBP', quality=78, method=6)
        saved += src_p.stat().st_size - dst.stat().st_size
        made += 1
print(f'{made} thumbnails -> public/images/_previews  (saved {saved/1024/1024:.2f} MB)')
