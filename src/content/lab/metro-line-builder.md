---
title: "Metro Line Builder"
slug: "metro-line-builder"
code: "EXP-001"
year: 2026
tags: ["Interactive", "Maps", "Toy"]
status: "live"
statusLabel: "In progress"
summary: "A drawing toy for transit nerds. Sketch your own metro lines over a blank grid — stations snap into place, interchanges connect, and the map renders itself in the classic diagram style."
imageLabel: "[ Metro Line Builder ]"
coverImage: "/images/lab/metro-line-builder-cover.svg"
liveUrl: "https://vgomx.github.io/metro-line-builder/"
stack: ["JavaScript", "Canvas"]
about:
  - "Every city I've lived in, I've ended up staring at the metro map. Metro Line Builder is what happens when that habit turns into a side project: a small canvas toy where you draw lines, drop stations, and watch the diagram redraw itself with the 45-degree geometry that makes transit maps feel official."
  - "It's an experiment in constraint-driven drawing — the tool fights you a little, snapping everything to the grid, and that fight is what makes the result look designed rather than doodled."
  - "The toy comes with its own small design system — Metro DS — covering the diagram grammar: line colours, station ticks, interchange marks, and the type that labels them."
links:
  - title: "Metro DS — design system"
    href: "https://vgomx.github.io/metro-ds/"
log:
  - date: "2026-06"
    entry: "First working prototype — lines snap to 45° angles, stations render as ticks and interchanges as circles."
  - date: "2026-07"
    entry: "Working on line colours, labels, and exporting the map as an image."
---
