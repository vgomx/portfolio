---
title: "Lingo Toolbox"
slug: "lingo-toolbox"
code: "EXP-003"
year: 2026
tags: ["Language", "Learning", "PWA"]
status: "live"
statusLabel: "In progress"
summary: "A set of language-learning tools that runs entirely in your browser — flashcards on a real spaced-repetition scheduler, grammar notes that surface mid-review, and an etymology tool that traces a word back through the languages it passed through."
imageLabel: "[ Lingo Toolbox ]"
coverImage: "/images/lingo-toolbox/cover.svg"
liveUrl: "https://vgomx.github.io/lingotoolbox/"
stack: ["React", "TypeScript", "IndexedDB"]
about:
  - "Lingo Toolbox isn't a course. It's for the words you nearly know — a deck you're mid-way through, a rule you keep looking up, a verb that never sticks. Four workspaces (English, Brazilian Portuguese, Dutch and Spanish) each keep their own decks, notes and schedule, and switching one changes the whole app."
  - "The flashcards run on a local SM-2 implementation with four grades, and the labels under the buttons show the actual interval each one buys you, worked out from the card in front of you rather than fixed copy. A deck can be asked both ways, and each direction carries its own schedule — recognising 'brood' and producing it from 'bread' are two different things you know to two different degrees. A triage step lets you pick which cards survive the reversal, since plenty of phrases only work in one direction."
  - "The tools that sit around review are the part I keep coming back to. Grammar Notes match a card by tag rather than by a link you have to maintain, so the rule about 'de' or 'het' turns up while you're reviewing a noun. Etymology traces a word back through the languages it passed through — 'pond' goes Middle Dutch, Old Dutch, Proto-West Germanic, Proto-Germanic, Latin — and open a word and it branches: 'woordenboek' is 'woord' and 'boek', each unfolding into its own descent. Both open mid-review without ending the session."
  - "Nothing leaves the device. There's no server, no account and no paid tier — cards live in IndexedDB on your own machine, which is why the single-file backup matters and why restoring twice is designed to be harmless. It installs to a home screen and runs offline, in its own type, with a full keyboard path through review and a dock built for a thumb on a phone. Like the other experiments here it got its own design system, lingo-ds, carrying the tokens, components and sounds."
links:
  - title: "GitHub — vgomx/lingotoolbox"
    href: "https://github.com/vgomx/lingotoolbox"
  - title: "lingo-ds — design system"
    href: "https://vgomx.github.io/lingo-ds/"
log:
  - date: "2026-08-04"
    entry: "First build in a day — marketing landing, the product shell, and Flashcards on a local SM-2 scheduler."
  - date: "2026-08-05"
    entry: "Four language workspaces, 526 vendored OpenMoji illustrations, sound, PWA install, and an adaptation down to phone."
  - date: "2026-08-07"
    entry: "Twelve more starter decks, CEFR levels as a field rather than a tag, and the mobile chrome reworked around iOS safe areas."
  - date: "2026-08-08"
    entry: "Cards asked both ways with a schedule per direction, ten-deep undo, Grammar Notes, and the etymology tool built off Wiktionary shards."
  - date: "2026-08-10"
    entry: "Etymology deepened — languages link to each other, descendants listed, and screen transitions that say which way you went."
---
