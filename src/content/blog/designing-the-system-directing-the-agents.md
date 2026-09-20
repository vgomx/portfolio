---
title: "Designing the system, directing the agents"
slug: "designing-the-system-directing-the-agents"
date: "2026-09-19"
summary: "How I rebuilt my portfolio with agentic AI. An AI agent can write a component in seconds — it can't decide which component is worth writing, or tell you when the result is almost right but not quite."
tags: ["AI", "Design Systems", "Process"]
---

That gap is where I spent most of my time rebuilding this site. In June 2026 I left Squarespace and built my portfolio and its design system from scratch, working with AI agents. Most of the code came from the agents. The planning, direction, review and final decisions were mine. That's the same work I've done as a product designer for more than 12 years.

**In short:**

- **Plan first.** A documented design system and a defined architecture existed before any code.
- **Two public repos, one cascade.** A change to the design system updates the live site automatically.
- **Every change reviewed.** Pull requests, accessibility checks and cross-browser testing, against criteria set upfront.
- **New technical depth.** I learned the front-end, versioning and deployment skills needed to direct and review the work.
- **One lesson.** Learn how an AI agent's context memory works before you start. It saves tokens and rework.

## Planning before prompting

Before any code was written, three things were in place.

**A documented design system.** I started in Claude Design, creating a visual identity from my logo, the colors and fonts I chose, the planned structure of the portfolio and a set of references. Once the identity was refined, I used Claude Design to generate a design system from those assets, including written guidelines. Only then did I switch to Claude Code for the implementation. The guidelines cover the visual foundations, such as color, type, spacing, radius, motion and states. They also cover how the brand writes: first person, sentence case, short and concrete. Every later decision was checked against them.

**A defined architecture.** I decided early how the pieces would connect: the design system and the site as separate public repositories, with changes to the system reaching the site automatically.

**A clear structure for the site.** Who it's for (hiring managers, recruiters and other designers), what they need to find, and how the content should be organized so they find it quickly.

With that plan in place, the agents weren't guessing what to build. They were carrying out defined work against clear criteria.

## The design system: ink on paper

The direction was simple on purpose. It's a cool monochrome palette, with 1px borders instead of shadows and a 2px radius as the only softness. One green accent is held back for live states and key actions. **Archivo** carries the interface and **JetBrains Mono** labels everything else. Both are open-source typefaces.

I explored and refined the components in **Claude Design**. Its React exports weren't code I'd trust in production, so I kept the **tokens** as the source of truth and add shared components only when the product needs them. The system is published as its own page on GitHub Pages, documented in the same place it's versioned.

## Two repos, one cascade

Change a token in the design system, and the live site updates on its own. Everything runs on two public GitHub repositories:

- **`ds`**: the design system, with tokens, components and guidelines
- **`portfolio`**: the site, built with **Astro** and **React**, deployed on **Vercel**

The cascade runs in one direction:

1. A change lands in the `ds` repo
2. A GitHub Action fires
3. Vercel redeploys the portfolio
4. The build pulls the latest design system
5. The live site is updated

The goal was fixed from the start. On the first day I compared three ways to connect the repos and kept the one that was simplest and most reliable in production.

## Open source and version control

Almost every part of this project is open: Astro, React, the typefaces and my own repositories. Making the work public keeps me accountable. Anyone can read the naming, the structure and the history, so the portfolio shows my process as well as the finished work.

**Version control was the backbone of the process.** An agent can change twenty files in a few seconds, so every session ended as commits I could read, compare and revert. As the project matured I moved to **pull requests**, even as the only person working on it. Every change now goes through a deliberate review before it reaches the live site.

From June to September that added up to more than 100 commits to the portfolio and 9 to the design system.

## What's in the site

The site has four main parts, each designed for a different kind of visit:

- **Work**: case studies in a filterable gallery, for people evaluating how I solve problems
- **Lab**: a darkroom-themed space for side projects and experiments, with its own entry and exit transitions
- **Notes**: the blog you're reading now
- **About**: my story as a designer, with a career timeline, the services I offer, and my CV to download

The Lab holds side projects that don't fit a case study format but show how I think and build. It's where I allow myself more playful interactions than anywhere else on the site. About is the opposite: quiet and direct, so people can get a sense of who I am quickly.

## My part: direction, revision, copywriting and QA

**Product design direction.** Each task started with a brief, the same way I'd brief a product team: who it's for, what problem it solves, what the constraints are, and what "done" means. That's how the homepage came to feature five curated cases, with one lead case at full width. The same thinking applied to every component:

- **Vague brief:** "Build a card." The result is generic.
- **Product brief:** "Build a card that helps a hiring manager scan role, scope and outcome, using only existing tokens, with 1px edges and no shadow." The result serves the product and fits the system.

**Revision.** I reviewed every output against its source material and the guidelines. When an agent simplified content it shouldn't have touched, such as the career timeline on the About page, I restored it to match the original. I rebuilt one case study from its source for the same reason.

**Copywriting.** Every word on the site went through me. The guidelines set the voice, but applying it took work: tightening case study copy so the outcome comes first, and rewriting drafts that sounded polished but generic. For readers, the words are the product as much as the layout is. The hero tagline alone went through more versions than any component.

**QA and testing.** Quality was defined before execution, in the design system's guidelines. Every change was reviewed against those criteria through a pull request before it reached the live site. My review covered four areas:

- **System adherence:** tokens instead of hard-coded values, and components that match the documented patterns
- **Cross-browser behavior:** this caught Safari-specific rendering issues and a hydration mismatch that broke a dismiss button
- **Accessibility:** WCAG AA contrast, accessible names on links, and titles on every embedded frame
- **Performance:** for example, drawing the hero map myself instead of loading external map tiles

The agents made execution fast. The plan and the review criteria made sure that speed didn't cost quality.

## What I learned along the way

I know the software delivery process well. As a product designer I work alongside agile implementation squads, so releases, pull requests and deployments were familiar. What changed here is that I wasn't beside the process anymore. I was running it myself, hands on. So along the way I learned more about the parts of front-end development and site management I needed to make it all work, and my skills there grew a lot:

- **The stack:** how Astro pages and React components fit together, and how design tokens become CSS the whole site shares
- **Version control:** commits, branches and pull requests as a daily workflow, not just a place to store files
- **Automation and deployment:** GitHub Actions, deploy hooks, environment secrets and Node versions on Vercel
- **Domain and hosting:** moving the domain off Squarespace, using Cloudflare as registrar, and configuring DNS
- **Browser and quality tooling:** debugging rendering differences between browsers, accessibility attributes, and image and performance optimization

I didn't set out to become a front-end developer. But doing the work myself, instead of seeing a squad do it, changed how I work. I can now read a diff, spot when a fix is in the wrong place, and talk to engineers in their terms. That makes me a better product designer, with or without AI.

## What I'd do differently: learn first how the context window works in agentic AI

If I did this again, I'd keep the plan exactly as it was. What I'd change is how I **delivered** that plan to the agents.

An agent doesn't carry your project from one session to the next the way a colleague does. Every session works inside a context window. The files it reads, the instructions it gets and the conversation so far all take up space, and that space costs tokens. My planning was solid, but much of it lived in documents and briefs I passed along session by session. So the agent was often reloading context it had already seen.

Knowing how contextual memory works earlier would have helped me package the plan for the agent as well as for myself:

- A **project memory file** (like a `CLAUDE.md`) holding the permanent rules, such as tokens, naming and "edges, not shadows," so every session starts already aligned
- **Sessions scoped to one planned task**, matching the way I already broke the work down
- **Only the relevant files** in context for each task, not the whole repository
- **Decisions recorded once** in the repo, where both the agent and I can refer to them

Planning well is one skill. Packaging that plan so an AI agent can use it efficiently is another, and it's the one I'd learn first next time. Better context isn't only cheaper. It gives sharper output and less rework.

## Closing thought

AI didn't replace the design process. It made execution faster and put more weight on everything around it: planning, direction, review and judgment. Those are the skills I use every day as a product designer.

Both repositories are public if you want to see how it's built: [github.com/vgomx/ds](https://github.com/vgomx/ds) and [github.com/vgomx/portfolio](https://github.com/vgomx/portfolio).

To see more of how I work, take a look at my [case studies](https://vitorgomes.design/work) or the [Lab](https://vitorgomes.design/lab).
