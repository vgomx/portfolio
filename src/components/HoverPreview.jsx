import { useState, useEffect, useRef } from 'react';

/* Only real image paths belong in the preview — bodyImages can also carry
   embed URLs (Figma prototypes, video), which would render as a broken frame. */
const IMAGE_RE = /\.(png|jpe?g|webp|gif|avif)(\?|$)/i;

export function previewFrames(project, max = 6) {
  const srcs = (project.bodyImages || [])
    .map((b) => b && b.src)
    .filter((s) => typeof s === 'string' && IMAGE_RE.test(s));
  // Lead with the cover so the first frame matches what the card already shows,
  // then move through the case. De-duped in case the cover repeats in the body.
  const all = [project.coverImage, ...srcs].filter(Boolean);
  return [...new Set(all)].slice(0, max);
}

/* A small CRT window that trails the cursor and cycles through a project's
   images. Borrows the Lab's monitor language — scanlines, phosphor edge, a
   soft glitch on each frame change — at a much lower intensity, since this
   one sits on the light homepage rather than in a darkroom.

   Rendered once by the parent and repositioned, rather than one node per
   card. Pointer-driven, so it never appears on touch (guarded again in CSS
   via `hover: hover`). */
export function HoverPreview({ frames, slug, x, y, visible }) {
  const [i, setI] = useState(0);
  const [reduced, setReduced] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  /* Keyed on slug, not the frames array — the parent rebuilds that array on
     each hover, so depending on its identity would restart the reel from 01
     mid-cycle instead of letting it wrap. */
  useEffect(() => {
    setI(0);
    if (!frames) return;
    // Warm the cache: at reel speed an uncached frame lands as a blank flash.
    frames.forEach((src) => { const im = new Image(); im.src = src; });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  useEffect(() => {
    clearInterval(timer.current);
    const n = frames ? frames.length : 0;
    if (!visible || reduced || n < 2) return;
    timer.current = setInterval(() => {
      setI((prev) => (prev + 1) % n);
    }, 320);
    return () => clearInterval(timer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, reduced, slug, frames ? frames.length : 0]);

  if (!frames || !frames.length) return null;

  // Keep the window on screen — flip to the other side of the cursor near
  // the right/bottom edges instead of letting it run off.
  const W = 248;
  const H = 178;
  const pad = 12;
  const off = 14; // tight to the pointer, clear of the cursor glyph
  let left = x + off;
  let top = y + off;
  if (typeof window !== 'undefined') {
    if (left + W + pad > window.innerWidth) left = x - W - off;
    if (top + H + pad > window.innerHeight) top = y - H - off;
  }

  return (
    <div
      className={`crt-preview${visible ? ' crt-preview--on' : ''}`}
      style={{ left, top, width: W }}
      aria-hidden="true"
    >
      <div className="crt-preview-screen">
        {/* Keyed on the frame index so each change remounts the image and
            replays the glitch from zero — WebKit will not restart a running
            animation on a persistent node. */}
        <img key={i} src={frames[i]} alt="" className="crt-preview-img" decoding="async" />
        <span className="crt-preview-scan" />
        <span className="crt-preview-vignette" />
      </div>
      <div className="crt-preview-bar">
        <span className="crt-preview-dot" />
        <span>
          {String(i + 1).padStart(2, '0')}/{String(frames.length).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
}
