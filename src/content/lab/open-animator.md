---
title: "Open Animator"
slug: "open-animator"
code: "EXP-002"
year: 2026
tags: ["Animation", "SVG", "Editor"]
status: "live"
statusLabel: "In progress"
summary: "A browser-based SVG animation editor — draw shapes, edit Bézier paths, and keyframe position, rotation, scale, opacity and colour, then export to SVG, Lottie, WebM, GIF, CSS or a React component."
imageLabel: "[ Open Animator ]"
coverImage: "/images/open-animator/cover.svg"
liveUrl: "https://vgomx.github.io/open-animator/"
stack: ["React", "TypeScript", "Vite"]
about:
  - "Open Animator is a small design tool disguised as a side project: a browser-based editor for building simple shape animations without leaving the canvas. Draw a rectangle, an ellipse, a bit of text or a vector path, then keyframe it — position, rotation, scale, opacity, colour — with a proper cubic-Bézier easing editor instead of a handful of preset curves."
  - "The interface borrows heavily from the tools I use every day: a proper colour picker with an eyedropper, floating context menus, collapsible layers and properties panels, rulers with guide snapping, and frosted-glass chrome over a dark canvas. Record mode auto-keyframes as you drag, and onion skinning shows the frames on either side of the one you're editing."
  - "Export was the part worth taking seriously — a toy that only lives inside its own canvas isn't that useful. Animations can leave as static or animated SVG, WebM, GIF, CSS keyframes, Lottie JSON, or a generated React component, so whatever gets built here can actually go somewhere."
  - "It also got its own small visual identity: a mark built from a single Bézier curve held by two control points — the core gesture of drawing motion — in a warm orange against near-black, with light and dark lockups and clear-space rules worked out the same way I'd approach it for a client."
links:
  - title: "GitHub — vgomx/open-animator"
    href: "https://github.com/vgomx/open-animator"
log:
  - date: "2026-07-10"
    entry: "Editor foundation shipped in a single day — shape tools, vector paths, keyframe animation, the easing editor, and the full export pipeline (SVG, Lottie, WebM, GIF, CSS, React)."
  - date: "2026-07-10"
    entry: "Canvas UI polish and the visual identity — Bézier anchor mark, colour system, and the frosted-glass chrome across rulers, panels and menus."
---
