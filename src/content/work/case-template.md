---
# The case-study template, filled with placeholders. Hidden: it builds at
# /work/case-template but is never listed. Copy this file to start a new
# case, set hidden to false, and drop the sections or blocks you don't need.
# Every block type is documented in src/content.config.ts.
title: "[Case title — the outcome in one line]"
slug: "case-template"
discipline: "Product Design"
year: 2026
tags: ["Case Study", "[Discipline]", "[Platform]", "[Industry]"]
status: "live"
statusLabel: "[Status]"
hidden: true
template: "case"
summary: "[Summary — what you designed, for whom, and under which conditions, in one or two sentences.]"

caseDetails:
  facts:
    - { label: "Role", value: "[Title · scope]" }
    - { label: "Team", value: "[Size and makeup]" }
    - { label: "Timeline", value: "[Year(s) · client, location]" }
    - { label: "Tools", value: "[Tool · tool · tool]" }
  details:
    - { label: "What I did", value: "[Your ownership in two or three lines.]" }
    - { label: "Impact", value: "[The headline outcome in one line.]" }
    - { label: "Constraints", value: "[What shaped or limited the work.]" }

sections:
  - id: overview
    eyebrow: Overview
    title: "[Section headline]"
    lead: "[Lead — the project in two or three sentences: product, audience, your role.]"
    blocks:
      - type: outcomes
        label: Key metrics
        items:
          - { label: "[Metric]", value: "[00]% ↓", note: "[What went down, over what window.]" }
          - { label: "[Metric]", value: "[0] → [0]", note: "[A before → after comparison.]" }
          - { label: "[Metric]", value: "[00]% ↑", note: "[What went up, over what window.]" }
      - type: outcomes
        caption: "Or, when numbers are under NDA"
        label: Outcomes
        items:
          - { label: "[Label]", value: "[Status]", note: "[Where the product stands — live, in pilot, shipped to N markets.]", live: true }
          - { label: "[Label]", value: "[Before] → [After]", note: "[A before → after shift you can describe without numbers.]" }
          - { label: "[Label]", value: "[Before] → [After]", note: "[Another qualitative shift — access, process, team.]" }
          - { label: "[Label]", value: "[N of N]", note: "[Scope or coverage you can verify — states, exits, screens.]" }
      - type: showcase
        eyebrow: "Final design · Shipped"
        title: "[What shipped, in one line]"
        items:
          - { label: "[Screen name]" }
          - { label: "[Screen name]" }
          - { label: "[Screen name]" }

  - id: context
    eyebrow: Context
    title: "[Section headline]"
    blocks:
      - type: text
        paragraphs:
          - "[The business and product situation before you joined.]"
          - "[How you came into the project and what you owned.]"
      - type: images
        layout: trio
        items: [{ label: "Photo" }, { label: "Photo" }, { label: "Photo" }]

  - id: challenge
    eyebrow: Challenge
    title: "[Section headline]"
    lead: "[Lead — the core tension in two sentences.]"
    blocks:
      - type: cards
        label: Constraints
        minWidth: 440
        items:
          - { title: "[Constraint]", body: "[Why it mattered, in two lines.]" }
          - { title: "[Constraint]", body: "[Why it mattered, in two lines.]" }
          - { title: "[Constraint]", body: "[Why it mattered, in two lines.]" }
          - { title: "[Constraint]", body: "[Why it mattered, in two lines.]" }
      - type: images
        layout: duo
        items: [{ label: "Photo" }, { label: "Photo" }]

  - id: research
    eyebrow: Research
    title: "[Section headline — the insight]"
    lead: "[Lead — what you set out to learn, and how.]"
    blocks:
      - type: methods
        items:
          - { eyebrow: "Method 01 · [Type]", title: "[Method name]", body: "[Who, how many, what you looked for.]", role: "[Role]" }
          - { eyebrow: "Method 02 · [Type]", title: "[Method name]", body: "[Who, how many, what you looked for.]", role: "[Role]" }
      - type: finding
        eyebrow: "Key finding · [Source]"
        quote: "[The one finding that changed the direction.]"
        detail: "[One line of supporting detail.]"
      - type: reframe
        source: "The reframe · [Source]"
        quote: "[The insight, restated as one quotable sentence.]"
        soWhat: "[So what — the goal this insight points to, in one line.]"
        themes: ["[Theme]", "[Theme]", "[Theme]"]
      - type: voices
        items:
          - { quote: "[Verbatim quote.]", name: "Participant A", meta: "[Profile] · [Method]" }
          - { quote: "[Verbatim quote.]", name: "Participant B", meta: "[Profile] · [Method]" }
          - { quote: "[Verbatim quote.]", name: "Participant C", meta: "[Profile] · [Method]" }
      - type: chain
        label: From hypothesis to decision
        steps:
          - { label: "Hypothesis", text: "[What you believed going in.]" }
          - { label: "Finding", text: "[What the research showed.]" }
          - { label: "Decision", text: "[What you changed because of it.]" }

  - id: competitors
    eyebrow: Competitive analysis
    title: "[Section headline]"
    lead: "[Who you reviewed and what you compared.]"
    blocks:
      - type: matrix
        columns: ["[Competitor A]", "[Competitor B]", "[Competitor C]", "This project"]
        rows:
          - { label: "[Capability]", cells: ["[ ]", "[ ]", "[ ]", "[ ]"] }
          - { label: "[Capability]", cells: ["[ ]", "[ ]", "[ ]", "[ ]"] }
          - { label: "[Capability]", cells: ["[ ]", "[ ]", "[ ]", "[ ]"] }
          - { label: "[Capability]", cells: ["[ ]", "[ ]", "[ ]", "[ ]"] }
        takeaway: "[The gap the analysis exposed.]"

  - id: strategy
    eyebrow: Strategy
    title: "[Section headline — the bet]"
    lead: "[Lead — the approach in two sentences.]"
    blocks:
      - type: cards
        label: Principles
        minWidth: 240
        items:
          - { number: "Principle 01", title: "[Principle]", body: "[What it meant in practice.]" }
          - { number: "Principle 02", title: "[Principle]", body: "[What it meant in practice.]" }
          - { number: "Principle 03", title: "[Principle]", body: "[What it meant in practice.]" }
          - { number: "Principle 04", title: "[Principle]", body: "[What it meant in practice.]" }
      - type: process
        title: How we worked
        intro: "[The working rhythm, in one or two lines.]"
        steps:
          - { title: "[Step]", body: "[What happened in this step.]" }
          - { title: "[Step]", body: "[What happened in this step.]" }
          - { title: "[Step]", body: "[What happened in this step.]" }

  - id: flow
    eyebrow: Flow
    title: "[Section headline]"
    lead: "[How the journey runs end to end.]"
    blocks:
      - type: flow
        defaultPath: "yes"
        nodes:
          - { id: a, type: step, label: "[Role] · [Action]", x: 0, y: 80, w: 176, h: 64 }
          - { id: b, type: step, label: "[Role] · [Action]", x: 232, y: 80, w: 176, h: 64 }
          - { id: check, type: decision, label: "[Check]?", x: 464, y: 52, w: 200, h: 120 }
          - { id: ok, type: step, label: "✓ [Outcome]", x: 736, y: 0, w: 176, h: 56 }
          - { id: back, type: exit, label: "✕ [Fallback]", x: 736, y: 176, w: 176, h: 56 }
        edges:
          - { from: a, to: b }
          - { from: b, to: check }
          - { from: check, to: ok }
          - { from: check, to: back }
        paths:
          - { id: "yes", label: "Yes", nodes: [a, b, check, ok], description: "[What happens when the check passes.]" }
          - { id: "no", label: "No", nodes: [a, b, check, back], description: "[Where it goes when it fails, and how the person recovers.]" }
      - type: panels
        items:
          - { eyebrow: "Branch · [Where]", title: "[Branch name]", body: "[How it's handled.]" }
          - eyebrow: "Branch · [Where]"
            title: "[Branch name]"
            list:
              - { text: "[Success outcome]", tone: success }
              - { text: "[Other outcome]" }
              - { text: "[Other outcome]" }
          - { eyebrow: "Branch · [Where]", title: "[Branch name]", body: "[How it's handled.]" }
      - type: board
        title: "[The full flow board]"
        eyebrow: "[Optional]"
        label: "Full flow board — optional"

  - id: solution
    eyebrow: Solution
    title: "[Section headline]"
    lead: "[Lead — the decisions that shaped the result.]"
    blocks:
      - type: decision
        number: "01"
        title: "[Decision · with before / after]"
        paragraphs: ["[What changed and why.]"]
        media:
          kind: compare
          captions: { before: "[what didn't work]", after: "[what changed]" }
      - type: decision
        number: "02"
        title: "[Decision · with screen]"
        paragraphs: ["[The problem, the call you made, and why.]"]
        chain:
          - { label: "Considered", text: "[What else you weighed.]" }
          - { label: "Chose", text: "[What you went with.]" }
          - { label: "Why", text: "[The reason, in one line.]" }
      - type: decision
        number: "03"
        tag: "Compact spots only · prefer scrolling steps"
        title: "[Decision · with a screen sequence]"
        paragraphs: ["[Use when two to five screens belong together, like a walkthrough. Start on the screen the text talks about.]"]
        media:
          kind: carousel
          label: "[Sequence name]"
          images: [{ label: "[Screen 1]" }, { label: "[Screen 2]" }, { label: "[Screen 3]" }]
      - type: decision
        number: "03b"
        tag: "Optional · scrolling steps"
        title: "[Decision · told as scrolling steps]"
        paragraphs: ["[Use when each screen in the sequence needs its own sentence or two. The screen pins on the left while the steps scroll past.]"]
        media:
          kind: steps
          steps:
            - { eyebrow: "[Screen 1]", title: "[What this screen does]", body: "[One or two sentences on this screen.]" }
            - { eyebrow: "[Screen 2]", title: "[What this screen does]", body: "[One or two sentences on this screen.]" }
            - { eyebrow: "[Screen 3]", title: "[What this screen does]", body: "[One or two sentences on this screen.]" }
      - type: decision
        number: "04"
        tag: "[Optional tag]"
        title: "[Decision · with states]"
        paragraphs: ["[Why every state was designed.]"]
        media:
          kind: states
          countLabel: "[N] states"
          states: ["[State]", "[State]", "[State]", "[State]", "[State]"]
      - type: decision
        number: "05"
        title: "[Decision · with a set of screens]"
        paragraphs: ["[Use for a family of screens that share one pattern, like exits or empty states.]"]
        media:
          kind: gallery
          items:
            - { label: "[Screen]", caption: "[Where it appears]" }
            - { label: "[Screen]", caption: "[Where it appears]" }
            - { label: "[Screen]", caption: "[Where it appears]" }
            - { label: "[Screen]", caption: "[Where it appears]" }
      - type: decision
        eyebrow: "A closer look · [Area]"
        title: "[Anatomy of a screen]"
        paragraphs: ["[What this screen does.] Hover or tap a number to see what each part does."]
        media:
          kind: annotated
          callouts:
            - { x: 82, y: 18, title: "[Callout title]", body: "[What this part of the UI does and why.]" }
            - { x: 88, y: 42, title: "[Callout title]", body: "[What this part of the UI does and why.]" }
            - { x: 70, y: 66, title: "[Callout title]", body: "[What this part of the UI does and why.]" }
            - { x: 50, y: 92, title: "[Callout title]", body: "[What this part of the UI does and why.]" }

  - id: impact
    eyebrow: Impact
    title: "[Section headline]"
    blocks:
      - type: status
        status: live
        label: "[Status]"
        note: "[Where it stands now, in one line.]"
      - type: stats
        items:
          - { value: "[00]", label: "[What the number measures]" }
          - { value: "[00]", label: "[What the number measures]" }
          - { value: "[00]", label: "[What the number measures]" }
      - type: callout
        label: "[Callout label]"
        body: "[A systems note, a constraint or context that sits beside the outcome.]"

  - id: reflection
    eyebrow: Reflection
    title: "[Section headline]"
    blocks:
      - type: cards
        label: Takeaways
        minWidth: 440
        items:
          - { title: "[Takeaway]", body: "[What you'd keep or change, and why.]" }
          - { title: "[Takeaway]", body: "[What you'd keep or change, and why.]" }
          - { title: "[Takeaway]", body: "[What you'd keep or change, and why.]" }
          - { title: "[Takeaway]", body: "[What you'd keep or change, and why.]" }
      - type: pullquote
        text: "[The closing line: what this project taught you, in one sentence.]"
---
