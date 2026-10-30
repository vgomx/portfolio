import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/* ── Case template (template: "case") ───────────────────────────────────────
   A case is a list of sections; each section is a header plus an ordered
   list of blocks. Every block maps to a case component from vgomx/ds
   (components/case) or a small layout around one. Cases on the older
   templates never read these fields. */

const img = z.object({ src: z.string().optional(), alt: z.string().optional(), caption: z.string().optional(), label: z.string().optional() });
const labelled = z.object({ label: z.string(), value: z.string() });
const titled = z.object({ number: z.string().optional(), title: z.string(), body: z.string().optional() });
const step = z.object({ label: z.string(), text: z.string() });

const decisionMedia = z.discriminatedUnion('kind', [
  // A screen beside the text, or full width under it with wide: true.
  z.object({ kind: z.literal('image'), ...img.shape, ratio: z.string().optional(), wide: z.boolean().optional() }),
  // A live UI snippet: a labelled field in its error state.
  z.object({ kind: z.literal('field'), eyebrow: z.string().optional(), label: z.string(), value: z.string(), error: z.string() }),
  // Several screens side by side, with numbered callouts across them.
  z.object({ kind: z.literal('annotated-set'),
    screens: z.array(z.object({ src: z.string().optional(), alt: z.string().optional(), width: z.number(), ratio: z.number() })),
    callouts: z.array(z.object({ screen: z.number(), x: z.number(), y: z.number(), title: z.string(), body: z.string() })) }),
  // Screens told as scrolling steps: the screen pins, the steps scroll past.
  z.object({ kind: z.literal('steps'), ratio: z.string().optional(), width: z.number().optional(),
    steps: z.array(z.object({ eyebrow: z.string().optional(), title: z.string(), body: z.string().optional(), image: img.optional() })) }),
  z.object({ kind: z.literal('carousel'), images: z.array(img), startIndex: z.number().optional(), ratio: z.string().optional(), label: z.string().optional() }),
  z.object({ kind: z.literal('compare'), before: img.optional(), after: img.optional(), labels: z.object({ before: z.string(), after: z.string() }).optional(), captions: z.object({ before: z.string().optional(), after: z.string().optional() }).optional(), ratio: z.string().optional(), start: z.number().optional() }),
  z.object({ kind: z.literal('annotated'), image: img.optional(), ratio: z.string().optional(), width: z.number().optional(), placement: z.enum(['auto', 'left', 'right']).optional(), callouts: z.array(z.object({ x: z.number(), y: z.number(), title: z.string(), body: z.string() })) }),
  z.object({ kind: z.literal('states'), states: z.array(z.string()), countLabel: z.string().optional() }),
  z.object({ kind: z.literal('gallery'), items: z.array(img), ratio: z.string().optional(), minWidth: z.number().optional() }),
]);

const caseBlock = z.discriminatedUnion('type', [
  // Running text.
  z.object({ type: z.literal('text'), title: z.string().optional(), paragraphs: z.array(z.string()) }),
  // OutcomeStrip: numbers, or qualitative shifts when numbers are under NDA.
  z.object({ type: z.literal('outcomes'), label: z.string().optional(), caption: z.string().optional(), items: z.array(z.object({ label: z.string(), value: z.string(), note: z.string().optional(), live: z.boolean().optional() })) }),
  // Shipped screens on an ink panel. `ratio` defaults to 9 / 20 (a phone
  // screen) — override it for anything landscape (brand marks, desktop
  // shots), or the default crops wide artwork down to a sliver.
  z.object({ type: z.literal('showcase'), eyebrow: z.string().optional(), title: z.string().optional(), lead: z.string().optional(), ratio: z.string().optional(), items: z.array(img) }),
  // Photos or images in a row.
  z.object({ type: z.literal('images'), layout: z.enum(['full', 'duo', 'trio']).optional(), ratio: z.string().optional(), items: z.array(img) }),
  // NumberedCards: constraints, principles, takeaways.
  z.object({ type: z.literal('cards'), label: z.string().optional(), minWidth: z.number().optional(), items: z.array(titled) }),
  // Research methods.
  z.object({ type: z.literal('methods'), items: z.array(z.object({ eyebrow: z.string().optional(), title: z.string(), body: z.string(), role: z.string().optional() })) }),
  // The one key finding, on ink.
  z.object({ type: z.literal('finding'), eyebrow: z.string().optional(), quote: z.string(), detail: z.string().optional() }),
  // ReframeQuote.
  z.object({ type: z.literal('reframe'), source: z.string().optional(), quote: z.string(), soWhat: z.string().optional(), themes: z.array(z.string()).optional() }),
  // Verbatim quotes from participants.
  z.object({ type: z.literal('voices'), title: z.string().optional(), items: z.array(z.object({ quote: z.string(), name: z.string(), meta: z.string().optional() })) }),
  // ReasoningChain: Hypothesis → Finding → Decision.
  z.object({ type: z.literal('chain'), label: z.string().optional(), steps: z.array(step) }),
  // Competitive analysis matrix; the last column is this project.
  z.object({ type: z.literal('matrix'), columns: z.array(z.string()), rows: z.array(z.object({ label: z.string(), cells: z.array(z.string()) })), takeaway: z.string().optional() }),
  // How we worked: a vertical sequence of steps.
  z.object({ type: z.literal('process'), title: z.string().optional(), intro: z.string().optional(), steps: z.array(titled) }),
  // FlowDiagram.
  z.object({ type: z.literal('flow'), title: z.string().optional(), width: z.number().optional(), height: z.number().optional(), defaultPath: z.string().optional(),
    nodes: z.array(z.object({ id: z.string(), type: z.enum(['step', 'decision', 'exit']), label: z.string(), x: z.number(), y: z.number(), w: z.number().optional(), h: z.number().optional() })),
    edges: z.array(z.object({ from: z.string(), to: z.string(), points: z.array(z.tuple([z.number(), z.number()])).optional() })),
    paths: z.array(z.object({ id: z.string(), label: z.string(), nodes: z.array(z.string()), description: z.string().optional() })).optional() }),
  // Branch / route / exit panels beside a flow.
  z.object({ type: z.literal('panels'), items: z.array(z.object({ eyebrow: z.string().optional(), title: z.string(), body: z.string().optional(),
    list: z.array(z.object({ text: z.string(), tone: z.enum(['success', 'neutral', 'ink']).optional() })).optional(),
    chips: z.array(z.string()).optional() })) }),
  // A large board (a full flow), scrollable sideways on small screens.
  z.object({ type: z.literal('board'), eyebrow: z.string().optional(), title: z.string().optional(), caption: z.string().optional(), minWidth: z.number().optional(), ...img.shape }),
  // One design decision with its media.
  z.object({ type: z.literal('decision'), number: z.string().optional(), title: z.string(), tag: z.string().optional(), eyebrow: z.string().optional(),
    paragraphs: z.array(z.string()).optional(), media: decisionMedia.optional(), chain: z.array(step).optional(), mediaWidth: z.number().optional() }),
  // A short aside: something deliberately left as it was.
  z.object({ type: z.literal('aside'), tag: z.string().optional(), title: z.string(), body: z.string() }),
  // Callout aside.
  z.object({ type: z.literal('callout'), label: z.string(), body: z.string() }),
  // Ink stat cards.
  z.object({ type: z.literal('stats'), items: z.array(z.object({ value: z.string(), label: z.string() })) }),
  // Status badge with a line beside it.
  z.object({ type: z.literal('status'), status: z.string(), label: z.string(), note: z.string().optional() }),
  // External reference cards — a source, a tool, a live link.
  z.object({ type: z.literal('links'), label: z.string().optional(), items: z.array(z.object({ title: z.string(), href: z.string() })) }),
  // Closing pull quote.
  z.object({ type: z.literal('pullquote'), text: z.string() }),
]);

const caseSection = z.object({
  id: z.string(),
  eyebrow: z.string(),
  title: z.string(),
  lead: z.string().optional(),
  blocks: z.array(caseBlock).optional(),
});

const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    discipline: z.string(),
    year: z.number(),
    tags: z.array(z.string()),
    status: z.string(),
    statusLabel: z.string(),
    featured: z.boolean().optional(),
    hidden: z.boolean().optional(),
    summary: z.string(),
    imageLabel: z.string().optional(),
    coverImage: z.string().optional(),
    role: z.string().optional(),
    client: z.string().optional(),
    agency: z.string().optional(),
    framework: z.string().optional(),
    team: z.string().optional(),
    country: z.string().optional(),
    quotes: z.array(z.object({ text: z.string(), author: z.string(), after: z.string() })).optional(),
    embeds: z.array(z.object({ src: z.string(), after: z.string(), label: z.string().optional(), layout: z.enum(['landscape', 'mobile']).optional(), ratio: z.string().optional() })).optional(),
    steps: z.array(z.string()).optional(),
    overview: z.string().optional(),
    overviewBody: z.array(z.string()).optional(),
    challenge: z.string().optional(),
    challengeBody: z.array(z.object({ body: z.string(), lead: z.string().optional() })).optional(),
    roleIntro: z.string().optional(),
    roleItems: z.array(z.object({ heading: z.string(), body: z.string() })).optional(),
    processIntro: z.string().optional(),
    processNote: z.string().optional(),
    processStepsDetail: z.array(z.object({ lead: z.string(), body: z.string() })).optional(),
    decisionsTitle: z.string().optional(),
    decisionItems: z.array(z.object({
      heading: z.string(),
      paragraphs: z.array(z.string()).optional(),
      // Verbatim list items, each able to carry its own small gloss.
      bullets: z.array(z.object({ text: z.string(), note: z.string().optional() })).optional(),
      // Small English gloss under copy kept verbatim in its original language.
      note: z.string().optional(),
      image: z.string().optional(),
      imageAlt: z.string().optional(),
      // Some stages carry several boards under one heading.
      images: z.array(z.object({ src: z.string(), alt: z.string().optional() })).optional(),
    })).optional(),
    systemsBody: z.string().optional(),
    learningsParagraphs: z.array(z.string()).optional(),
    statusNote: z.string().optional(),
    outcomes: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
    extraDisciplines: z.array(z.string()).optional(),
    links: z.array(z.object({ title: z.string(), href: z.string(), after: z.string() })).optional(),
    template: z.enum(['default', 'alt', 'case']).optional(),
    // template: "case" only.
    caseDetails: z.object({ facts: z.array(labelled), details: z.array(labelled).optional() }).optional(),
    sections: z.array(caseSection).optional(),
    bodyImages: z.array(z.object({
      src: z.string(),
      alt: z.string().optional(),
      caption: z.string().optional(),
      after: z.string(),
      layout: z.enum(['full', 'offset', 'offset-left', 'wide', 'duo', 'trio']).optional(),
    })).optional(),
  }),
});

const lab = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/lab' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    code: z.string(),
    year: z.number(),
    tags: z.array(z.string()),
    status: z.string(),
    statusLabel: z.string(),
    summary: z.string(),
    imageLabel: z.string().optional(),
    coverImage: z.string().optional(),
    liveUrl: z.string().optional(),
    hidden: z.boolean().optional(),
    featured: z.boolean().optional(),
    stack: z.array(z.string()).optional(),
    about: z.array(z.string()).optional(),
    links: z.array(z.object({ title: z.string(), href: z.string() })).optional(),
    log: z.array(z.object({ date: z.string(), entry: z.string() })).optional(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    date: z.string(),
    summary: z.string(),
    tags: z.array(z.string()).optional(),
    coverImage: z.string().optional(),
    hidden: z.boolean().optional(),
  }),
});

export const collections = { work, blog, lab };
