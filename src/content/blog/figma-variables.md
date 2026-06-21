---
title: "Figma variables finally make tokens feel real"
slug: "figma-variables"
date: "2026-04-10"
summary: "A short note on why variables changed how I structure design systems in Figma — and what's still missing."
tags: ["Design Systems", "Tools"]
---

For a long time, token management in Figma felt like a workaround. You'd maintain a separate styles file, sync it via a plugin, pray nothing drifted. Variables changed that.

The thing that clicked for me: variables let you think in layers. You have primitive tokens at the bottom — a raw set of colour values. Above that, semantic tokens that reference the primitives — `color/background/surface` pointing to `gray/50`. And at the top, component-level decisions that reference the semantic layer.

This is the architecture that's been standard in code-side token management for years. Having it live natively in Figma, with actual references you can inspect, changes the dynamic with engineers. The conversation stops being "what does this grey mean" and starts being "we both point at the same token."

## What's still missing

Scoping is incomplete. You can scope a variable to a specific component or frame, but there's no way to say "this token only applies inside cards" at a collection level. You end up either over-applying or manually scoping in ways that don't survive reorganisation.

Mode propagation across nested components is also still fiddly. If you have a dark-mode parent and a component inside it that has its own mode override, the resolution order can surprise you.

None of this is a dealbreaker. Variables are a genuine step forward. But there's still a gap between "variables in Figma" and "full token system parity with code" — and that gap is most visible when your system grows past a certain scale.

Worth using. Worth knowing the edges.
