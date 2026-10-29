---
# Case on the case-study template (template: "case"). Block types are
# documented in src/content.config.ts; copy case-template.md for a new case.
title: Setting a modern foundation for digital banking in the Middle East
slug: digital-banking-ksa
discipline: Product Design
year: 2024
tags:
- Case Study
- Product Design
- Mobile
- Banking
status: live
statusLabel: Live
hidden: false
template: case
summary: Designing the end-to-end onboarding journey for a leading Saudi retail bank adopting a modern digital banking platform, localised for the national identity infrastructure, payment network and regulatory environment of the Saudi market.
imageLabel: '[ Digital Banking — KSA Onboarding ]'
coverImage: /images/banking-ksa/cover.jpg
role: Senior Product Designer
country: Saudi Arabia
bodyImages:
- src: /images/banking-ksa/shaqra-desert.jpg
  after: overview
- src: /images/banking-ksa/cars-shaqra.jpg
  after: overview
- src: /images/banking-ksa/shaqra.jpg
  after: overview
- src: /images/banking-ksa/street-sign-riyadh.jpg
  after: overview
- src: /images/banking-ksa/window-shaqra.jpg
  after: overview
caseDetails:
  facts:
  - label: Role
    value: Senior Product Designer · Origination
  - label: Team
    value: 'Platform side: 1 PM, 2 BAs, me as Senior Product Designer, and the development team. Bank side: 2 product owners and a UX Lead.'
  - label: Timeline
    value: 2024 · Saudi retail bank, three on-site trips to Riyadh
  - label: Tools
    value: Figma · platform design system · styles-based tokens
  details:
  - label: What I did
    value: Sole designer on Origination, including onboarding; later took over Retail from another designer. Mapped both onboarding paths (up to 11 steps for non-nationals, fewer for Saudi nationals) with every error state and compliance exit, designed within the platform's system and adapted it for local needs. Proposed the duplicate-country rule for tax and residency data.
  - label: Impact
    value: Live in production. Replaced fragmented legacy tools with one consistent journey, and moved account opening from the branch into the app.
  - label: Constraints
    value: Nafath identity handoff, in-Kingdom geo-gating, National ID and Iqama formats, FATCA and tax-residency capture, PEP and risk screening, and a brand refresh mid-build.
sections:
- id: overview
  eyebrow: Overview
  title: The first impression the new app had to get right.
  lead: 'End-to-end account opening for a leading Saudi retail bank moving onto a modern digital banking platform. From a location check and Nafath verification, through tax, residency and financial screening, to a virtual mada card: up to 11 steps for non-nationals, fewer for Saudi nationals, who skip the residency questions. Exact counts vary with each person''s answers and have shifted between releases. I was the sole designer on Origination, which includes onboarding, and later took over the Retail stream from another designer.'
  blocks:
  - type: outcomes
    label: Outcomes
    items:
    - label: Delivery
      value: Live
      live: true
      note: Shipped to production and in customers' hands. The screens here show the first release.
    - label: Consistency
      value: Legacy → one system
      note: Fragmented legacy tools, with little in common, gave way to one set of established patterns across the whole journey.
    - label: Access
      value: Branch → app
      note: Opening an account moved from the branch counter into the app. A branch visit is only needed to lift transaction limits.
    - label: Coverage
      value: 7 of 7
      note: 'Every compliance exit designed on one pattern: a clear reason, a way to call support and, where it helps, a route to a branch. No dead ends.'
  - type: showcase
    eyebrow: Final design · Shipped
    title: The onboarding, as shipped.
    lead: 'Three moments that define the journey: the ID number that sets the route and starts the step count, the handoff to Nafath for verification, and an account that''s ready to use, with its one limit stated up front.'
    items:
    - src: /images/banking-ksa/id-entry.jpg
      label: ID entry · 1 of 11
      alt: 'Shipped screen: step 1 of 11, identity details, with the National ID or Iqama number field'
    - src: /images/banking-ksa/nafath-handoff.jpg
      label: Nafath handoff · 3 of 11
      alt: 'Shipped screen: step 3 of 11, ID verification, asking to verify through the Nafath app'
    - src: /images/banking-ksa/account-ready.jpg
      label: Account ready
      alt: 'Shipped screen: account ready, with IBAN, account and customer numbers to copy, and the branch-verification limit'
- id: context
  eyebrow: Context
  title: A branch-first bank, rebuilding for digital.
  blocks:
  - type: text
    paragraphs:
    - 'A leading retail bank in the Middle East had built its business on branch relationships: customers opened accounts, moved money and solved problems in person. Its digital tools hadn''t kept up, so it adopted a modern digital banking platform to rebuild the experience from the ground up.'
    - I joined on the Origination stream, the flows that bring new customers into the bank. When the team shifted, I absorbed the Retail stream from a previous designer late in the project, along with its files, its client relationship and decisions already in motion, and kept both streams moving as the sole designer.
  - type: images
    layout: trio
    items:
    - src: /images/banking-ksa/shaqra-desert.jpg
      alt: Desert near Shaqra
    - src: /images/banking-ksa/cars-shaqra.jpg
      alt: Cars in Shaqra
    - src: /images/banking-ksa/shaqra.jpg
      alt: Shaqra old town
- id: challenge
  eyebrow: Challenge
  title: A global platform, a market with its own rules.
  lead: Implementation work isn't a blank canvas. The platform brings its own design system, components and opinionated flows; the client brings their brand, regulation and users with specific expectations. The Saudi market added six constraints on top.
  blocks:
  - type: cards
    label: Constraints
    minWidth: 300
    items:
    - title: Local identity infrastructure
      body: Account opening runs through Nafath (نفاذ), the national digital ID. Users leave for a government app to verify, then come back to one of many eligibility outcomes, each needing its own resolution.
    - title: Regulatory gating
      body: Accounts can only be opened from inside the Kingdom, by adults who pass politically-exposed-person and risk screening. Each check can end the journey, and they fall at different points in it.
    - title: Local ID formats
      body: National IDs and Iqama numbers are 10 digits, starting with 1 or 2. The ID field was configured for local rules, with errors that explain the format, not just flag it.
    - title: Regulated data capture
      body: Nafath confirms identity, but the bank still needs tax residency for FATCA reporting, residence abroad, employment and source of funds. That's compliance-grade data, collected inside a consumer app.
    - title: A moving design system
      body: A mid-project brand refresh cascaded into the platform's tokens. Every change had to be tracked and absorbed without breaking work already in progress.
    - title: Stakeholder complexity
      body: The bank's product and compliance teams, the platform's product teams and our delivery team each had their own priorities. Alignment took as much communication as craft.
  - type: images
    layout: duo
    items:
    - src: /images/banking-ksa/street-sign-riyadh.jpg
      alt: Street sign in Riyadh
    - src: /images/banking-ksa/window-shaqra.jpg
      alt: Carved window in Shaqra
- id: research
  eyebrow: Research
  title: Users didn't need fewer steps. They needed to know where they were.
  lead: 'Two inputs shaped the work: time on the ground in Riyadh, and a guerrilla test with 10 users, run by the bank''s UX Lead with me preparing and observing remotely.'
  blocks:
  - type: methods
    items:
    - eyebrow: Method 01 · Field visits
      title: Three trips to Riyadh
      body: How the bank operated, what its customers expected, and what trust looks and feels like in this context. None of it translates through a brief.
      role: On site
    - eyebrow: Method 02 · Guerrilla test
      title: Testing with 10 real users
      body: I planned the session, defined its goals and shaped the test content. The client's UX Lead ran it on the ground while I observed in real time.
      role: Prep and remote observation
  - type: finding
    eyebrow: Key finding · Guerrilla test
    quote: Users weren't confused by individual steps. They were unsettled by the flow as a whole.
    detail: Without a visible sense of where they were or how much remained, the process felt open-ended, and that uncertainty made them hesitant to continue.
  - type: reframe
    source: The reframe · Guerrilla test
    quote: The flow wasn't too long. It felt open-ended, and open-ended feels risky when it's your identity and your money.
    themes:
    - Orientation
    - System status
    - Trust
    soWhat: So the goal wasn't fewer steps. It was making every step's place in the journey visible.
  - type: chain
    label: From hypothesis to decision
    steps:
    - label: Hypothesis
      text: A numbered progress indicator would help people keep going.
    - label: Finding
      text: 'It wasn''t optional: orientation was the core usability issue, not any single step.'
    - label: Decision
      text: Every screen carries "X of N" in its step title, built into an existing component, with N set by the person's route.
- id: strategy
  eyebrow: Strategy
  title: Extend the platform only where the market demands it.
  lead: 'Every decision ran through the same judgment call: when to extend the platform''s components, when to accept their defaults, and when to raise a need with the platform team rather than quietly work around it.'
  blocks:
  - type: cards
    label: Principles
    minWidth: 240
    items:
    - number: Principle 01
      title: Extend only with a reason
      body: Local requirements justified extensions. Everything else stayed on the platform default, protecting delivery velocity.
    - number: Principle 02
      title: Lean on national infrastructure
      body: 'Nafath instead of a proprietary ID flow: the platform''s third-party integrations, used the way it was chosen for.'
    - number: Principle 03
      title: Ask only what applies
      body: 'The ID number sets the route: residency questions appear only for non-nationals, and tax fields expand only for people who pay tax abroad.'
    - number: Principle 04
      title: A no is never a dead end
      body: Every compliance exit and failure state says what happened and what to do next, even when the next step is a branch visit.
  - type: text
    title: How we worked
    paragraphs:
    - 'Iterative sprints with a client review in every cycle: understand the requirement, map the flow before mocking screens, design inside the platform''s system, align with the bank, then annotate for handoff. The distance between a documented requirement and a screen that makes sense is where the real design work happens.'
- id: flow
  eyebrow: Flow
  title: Two routes, seven exits, every branch designed.
  lead: The ID number at step 1 sets the route. Saudi nationals go straight through; Iqama holders answer two extra steps about their country of origin and residence abroad. Compliance checks can end the journey at seven points, and each has its own exit screen.
  blocks:
  - type: flow
    title: Trace a path
    defaultPath: through
    nodes:
    - id: loc
      type: decision
      label: In KSA?
      x: 0
      y: 24
      w: 136
      h: 88
    - id: id
      type: step
      label: Steps 1–2 · ID & mobile
      x: 192
      y: 36
      w: 160
      h: 64
    - id: nafath
      type: decision
      label: Nafath verified?
      x: 408
      y: 24
      w: 148
      h: 88
    - id: details
      type: step
      label: Steps 4–11 · Details, checks & login
      x: 612
      y: 36
      w: 184
      h: 64
    - id: mada
      type: step
      label: ✓ mada card issued
      x: 852
      y: 40
      w: 160
      h: 56
    - id: abroad
      type: exit
      label: ✕ Abroad screen
      x: 0
      y: 176
      w: 136
      h: 52
    - id: nafathOut
      type: exit
      label: ✕ Nafath outcome screens
      x: 404
      y: 176
      w: 156
      h: 52
    - id: checksOut
      type: exit
      label: ✕ PEP & risk exits
      x: 620
      y: 176
      w: 168
      h: 52
    edges:
    - from: loc
      to: id
    - from: id
      to: nafath
    - from: nafath
      to: details
    - from: details
      to: mada
    - from: loc
      to: abroad
    - from: nafath
      to: nafathOut
    - from: details
      to: checksOut
    paths:
    - id: through
      label: Straight through
      nodes:
      - loc
      - id
      - nafath
      - details
      - mada
      description: Inside the Kingdom, verified by Nafath, through details and screening to a virtual mada card. Iqama holders answer two extra steps on the way.
    - id: abroad
      label: Outside KSA
      nodes:
      - loc
      - abroad
      description: A geo-check before step 1. Opening an account from abroad is not allowed, so the journey ends on a screen that says why and offers a call to support.
    - id: nafath
      label: Nafath fails
      nodes:
      - loc
      - id
      - nafath
      - nafathOut
      description: 'An expired, orphaned or disqualified ID, a missing national address: each Nafath outcome has its own screen and next step.'
    - id: checks
      label: Screening
      nodes:
      - loc
      - id
      - nafath
      - details
      - checksOut
      description: Politically-exposed-person screening after employment and the risk rating after financial details can each end the journey, on the same exit pattern.
  - type: panels
    items:
    - eyebrow: Route · Iqama holders
      title: Two extra steps for non-nationals
      body: An ID starting with 2 adds step 5, country-of-origin address, and step 7, residence status in other countries. Saudi nationals never see them.
      list:
      - text: Saudi nationals · shorter route
        tone: ink
      - text: Iqama holders · up to 11 steps
        tone: ink
    - eyebrow: Exits · Compliance
      title: Seven ways out, one pattern
      list:
      - text: Outside the Kingdom
      - text: Under 18
      - text: National address missing
      - text: Mobile not linked to the ID
      - text: 'Nafath: ID expired, orphaned or disqualified'
      - text: Politically exposed person
      - text: High-risk customer rating
    - eyebrow: States · Mobile number
      title: Nine OTP states
      body: Each with its own response, from knowing what breaks in production and what gets escalated to support.
      chips:
      - Empty field
      - Invalid format
      - Code sent
      - Code resent
      - Code expired
      - Wrong code
      - Too many requests
      - Internal error
      - Timeout
  - type: board
    title: The full flow board · Android
    eyebrow: Ready for development · 11 steps · 2 routes · 7 exits
    src: /images/banking-ksa/flow-board.jpg
    minWidth: 1000
    alt: 'The complete Android onboarding flow board: pre-onboarding, identity and mobile, Nafath, steps 4 to 10 with the compliance checks, credentials, completion and the Wallet scenarios, with decision points and exit screens along the way'
    caption: 'Left to right: pre-onboarding, identity and mobile, Nafath, then steps 4–10 (the large grey block, where most of the compliance work sits), credentials, completion and the Wallet scenarios. Shown at overview size; screen details appear in Solution.'
- id: solution
  eyebrow: Solution
  title: Seven decisions that shaped the journey.
  lead: 'From the first screen to the mada card: where the platform was extended for the Saudi market and its regulation, and where its defaults already did the job.'
  blocks:
  - type: decision
    number: '01'
    title: Expectations before effort
    mediaWidth: 280
    paragraphs:
    - 'Before step 1, a three-screen walkthrough sets expectations. "Benefits" says why the account is worth opening. "Get ready" lists the requirements behind the hard stops: a registered national address, the Nafath app, a mobile number linked to the ID, being 18 or over, and not being politically exposed. "Let''s get started" turns the compliance conditions into declarations to confirm: the terms and privacy policy, not being politically exposed, and being the real beneficiary of the account.'
    - People learn what can stop them before step 1, not after step 8, and the first thing the journey asks of them is agreement, not data.
    media:
      kind: carousel
      label: Pre-onboarding walkthrough
      ratio: 9 / 20
      images:
      - src: /images/banking-ksa/walkthrough-benefits.jpg
        label: Benefits
        alt: 'Walkthrough 1 of 3, Benefits: what the account offers, with Skip and Next'
      - src: /images/banking-ksa/walkthrough-get-ready.jpg
        label: Get ready
        alt: 'Walkthrough 2 of 3, Get ready: privacy note and the requirements checklist, with Back and Next'
      - src: /images/banking-ksa/walkthrough-get-started.jpg
        label: Let's get started
        alt: 'Walkthrough 3 of 3, Let''s get started: the declarations to confirm before starting, with Back and Get started'
  - type: decision
    number: '02'
    title: A count that's honest from the first screen
    paragraphs:
    - 'The test showed orientation was the problem, so every screen needed to say where people were and how much was left. But the journey isn''t the same length for everyone. The ID number settles it: the field that validates the format at step 1 also sets the route, so Saudi nationals see a shorter total than Iqama holders, who see up to 11. The total never jumps mid-journey. (Exact counts depend on each person''s answers and have shifted between releases; what held was the rule, not the number.)'
    - The count lives inside the platform's existing step title rather than a new component, keeping the build lean.
    media:
      kind: image
      wide: true
      src: /images/banking-ksa/step-header.jpg
      alt: 'Step header reading 1 of 11: Identity details'
      caption: '"X of N" in the existing step title, N set by the route. Before, the header showed only the step title and a bar, so people couldn''t tell how much was left.'
    chain:
    - label: Considered
      text: One fixed total of 11 for everyone, with Saudi nationals jumping over the residency steps, or no total at all, just the step title and a bar.
    - label: Chose
      text: A total set by the route at step 1, inside the existing step title.
    - label: Why
      text: A counter that skips numbers breaks the trust it was added to build.
  - type: decision
    number: '03'
    title: Validating for local ID formats
    mediaWidth: 340
    paragraphs:
    - Step 1 asks for a National ID or Iqama number. The adapted field checks for exactly 10 digits starting with 1 (citizen) or 2 (resident), and the error says why, because people who don't understand a failure are the ones who abandon. The same rule routes the rest of the journey.
    media:
      kind: field
      eyebrow: Error state · as specified
      label: National ID or Iqama number
      value: '312345678'
      error: Your National ID or Iqama number is invalid. It must have 10 digits and should start with 1 or 2.
  - type: decision
    number: '04'
    title: 'Nafath: verification without the burden'
    mediaWidth: 420
    paragraphs:
    - Nafath confirms who someone is and returns their verified name, so the details step opens with it already filled in. The hard part was the handoff. Users get a verification number and switch to the government app, so the design bridges that with explicit instruction, Arabic system states, a loading state during approval, and an outcome screen for every result.
    media:
      kind: image
      src: /images/banking-ksa/nafath-flow.jpg
      alt: 'Nafath verification flow: the instruction screen, the verification number, the Nafath app request, waiting and error states, the verified result, and the exit screens for each failed check'
  - type: decision
    number: '05'
    title: Tax residency, designed for the exceptions
    paragraphs:
    - 'Step 6 opens with one question: "Are you paying taxes outside KSA?" Most people answer no and move on. For everyone else, what the regulator needs depends on the country, so the form adapts to each one.'
    - 'People can be tax resident in several countries, and each asks for different details, so every country gets its own block. The US gets its own branch for FATCA reporting: pick an identification type (SSN, ITIN or ATIN) and the next field changes to match. Every other country asks whether you have a Tax Identification Number and only then shows the field.'
    - Adding the same country twice now triggers "Country is already selected", a rule I proposed. A duplicate doesn't look like an error in the form, but it creates conflicting records in a compliance report. Step 7, residence abroad, reuses the same repeater and rule, so the pattern is learned once. Hover or tap a number on the screens to see each part.
    media:
      kind: annotated-set
      screens:
      - src: /images/banking-ksa/tax-no.jpg
        width: 280
        ratio: 2.255556
        alt: 'Tax details, step 6 of 11, as it first appears: the question about paying taxes outside KSA, with No selected'
      - src: /images/banking-ksa/tax-long.jpg
        width: 320
        ratio: 2.986111
        alt: 'Tax details after answering yes: a United States block with ATIN as the identification type, and a second block where picking the United States again shows the error Country is already selected'
      callouts:
      - screen: 0
        x: 93
        y: 26.8
        title: One question first
        body: '"Are you paying taxes outside KSA?" Most people answer no and move on. Yes adds a country block.'
      - screen: 1
        x: 70
        y: 34.8
        title: A block per country
        body: People can be tax resident in several countries, and each asks for different details, so every country gets its own block.
      - screen: 1
        x: 70
        y: 53.5
        title: A US branch for FATCA
        body: Choosing the US asks for an ID type (SSN, ITIN or ATIN), and the next field changes to match. "Do you have a TIN?" appears only for countries other than the US.
      - screen: 1
        x: 70
        y: 83.3
        title: No duplicate countries
        body: '"Country is already selected": a rule I proposed, because a duplicate creates conflicting records in a compliance report. Step 7 reuses it.'
    chain:
    - label: Considered
      text: A single tax-country field with one ID number.
    - label: Chose
      text: A repeater with country-specific fields, a US branch, and a duplicate check.
    - label: Why
      text: Each country needs different details, and the data feeds FATCA reporting, where it has to be right first time.
  - type: decision
    number: '06'
    title: Every exit designed as a system
    paragraphs:
    - 'Opening an account in Saudi Arabia has seven hard stops, and they fall at different points: the location check before step 1, Nafath outcomes at step 3, politically-exposed-person screening after employment, and the risk rating after financial details. Each could have been a generic error.'
    - 'Instead they share one pattern: a plain statement of what happened, a way to call support and, where it helps, a route to the nearest branch or the right channel. Existing customers get a friendlier version of the same screen that points them to registration. The first one, a location blocker before anything else, set the tone for the rest. And because "Get ready" names the same conditions up front, most people meet them as a checklist, not a rejection.'
    media:
      kind: gallery
      minWidth: 180
      items:
      - src: /images/banking-ksa/exit-outside-ksa.jpg
        label: Before step 1 · Outside KSA
        alt: 'Exit screen: You are outside KSA. You cannot open an account while you are abroad, with Call support and Done buttons'
      - src: /images/banking-ksa/exit-already-customer.jpg
        label: ID check · Redirect, not an exit
        alt: 'Exit screen: You are already a customer, pointing existing customers to reset their credentials or update their info by registering'
      - src: /images/banking-ksa/exit-address-missing.jpg
        label: Step 3 · Address missing
        alt: 'Exit screen: Your National Address is missing, explaining that a registered national address is required and pointing to SPL to register'
      - src: /images/banking-ksa/exit-not-eligible.jpg
        label: Compliance checks · Not eligible
        alt: 'Exit screen: You are not eligible to open an account at this moment, with a link to the nearest branch and Call support and Done buttons'
  - type: decision
    number: '07'
    title: An honest ending
    mediaWidth: 280
    paragraphs:
    - The confirmation screen surfaces IBAN, account number and customer reference, each copyable with one tap, and a virtual mada card is ready to use. It also says plainly that transactions are limited to 10% until identity is verified in a branch.
    - A branch-first bank, reached digitally, still meets its new customers in person, and the screen says so instead of letting them find out at checkout. Local photography grounds the moment; adding the card to Apple Wallet was designed and documented for a later phase.
    media:
      kind: image
      src: /images/banking-ksa/account-ready.jpg
      alt: 'Account ready screen: a welcome message, the new account and virtual mada card ready to use with the 10% limit until branch verification, IBAN, account and customer numbers each with a copy button, and an IBAN copied confirmation'
  - type: aside
    tag: Kept as platform default
    title: Step 11 · Credentials
    body: 'The platform''s password pattern already did the job: a live checklist that ticks off each requirement as you type, and field-level errors like "Username already exists". It already handled this well, so the effort went where the market needed it.'
- id: impact
  eyebrow: Impact
  title: What shipped, and what held it together.
  blocks:
  - type: status
    status: live
    label: Live
    note: In production since launch. The screens shown are the first release (MMP) as I left it; the product has kept evolving since.
  - type: stats
    items:
    - value: '11'
      label: Steps across two routes, with every error state and all seven compliance exits designed
    - value: '2'
      label: 'Streams owned: Origination as sole designer from the start, Retail taken over mid-project'
  - type: callout
    label: On the platform design system
    body: I reconciled the local Figma file with newer platform releases and absorbed a mid-project brand refresh that cascaded into token updates, all without Figma variables. Consistency became a discipline rather than a default. Holding the extend-or-accept call steady across 11 steps and hundreds of states is what kept the implementation coherent rather than patchworked.
- id: reflection
  eyebrow: Reflection
  title: What implementation work taught me.
  blocks:
  - type: cards
    label: Takeaways
    minWidth: 440
    items:
    - title: Implementation design is its own discipline
      body: You're a translator, a negotiator and sometimes the user's advocate in a three-way partnership, balancing design with delivery and commercial priorities.
    - title: Momentum is half the job
      body: 'Absorbing a second stream mid-project meant as much energy on existing conditions as on new work. The token update sharpened it: the more consistently a system is applied, the less an update hurts.'
    - title: Being there changes the work
      body: A design counterpart on the client side made the testing possible, and observing it remotely only works when shared context is already there. Time on site is what built that context.
    - title: The market teaches you
      body: Nafath is elegant national infrastructure that people trust. Mada is a point of pride. The photography that resonated was distinctly local, not generic global-banking stock.
  - type: pullquote
    text: Designing for a market you're not from asks for genuine curiosity. The answers are rarely in the requirements document.
---
