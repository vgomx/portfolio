import { Button } from '../ds/components/core/Button.jsx';
import { Tag } from '../ds/components/core/Tag.jsx';
import { Card } from '../ds/components/data/Card.jsx';
import { StatCard } from '../ds/components/data/StatCard.jsx';
import { Accordion } from '../ds/components/feedback/Accordion.jsx';
import { useState } from 'react';
import { ImagePlaceholder, Eyebrow, GridLines } from './Chrome.jsx';
import { CountUp } from './CountUp.jsx';
import { HoverPreview, previewFrames } from './HoverPreview.jsx';
import { Reveal } from './Reveal.jsx';

/* Homepage curation, in display order — the first gets the full-width
   feature slot, the rest fill the two-column grid below it. Explicit
   slugs rather than a filter so the running order is a deliberate
   editorial choice, not a side effect of `featured` flags or year sort. */
const HOME_PICKS = [
  'digital-banking-ksa',
  'video-platform-identity',
  'brastemp-wash-machines',
  'kitchen-appliance-campaign',
  'internet-brand-facelift',
];

export default function HomeScreen({ projects }) {
  const bySlug = new Map(projects.map((p) => [p.slug, p]));
  const picks = HOME_PICKS.map((s) => bySlug.get(s)).filter(Boolean);
  const [lead, ...rest] = picks;

  /* One preview node for the whole section, repositioned on move, rather
     than one per card. Card spreads `...rest` after its own mouse handlers,
     so passing these through would clobber its hover border — hence the
     wrapper element below. */
  const [preview, setPreview] = useState({ frames: null, slug: null, x: 0, y: 0, on: false });
  const previewOn = (p) => (e) => {
    const frames = previewFrames(p);
    if (frames.length < 2) return;
    setPreview({ frames, slug: p.slug, x: e.clientX, y: e.clientY, on: true });
  };
  const previewMove = (e) => {
    const { clientX, clientY } = e;
    setPreview((s) => (s.on ? { ...s, x: clientX, y: clientY } : s));
  };
  const previewOff = () => setPreview((s) => ({ ...s, on: false }));
  const previewProps = (p) => ({
    onMouseEnter: previewOn(p),
    onMouseMove: previewMove,
    onMouseLeave: previewOff,
  });
  return (
    <div className="page-enter">
      <section style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Globe animation background */}
        <iframe
          src="/hero-globe.html"
          className="hero-globe"
          loading="lazy"
          /* Decorative, so it is hidden from assistive tech and taken out of
             the tab order — but a title is still required, and matters if
             aria-hidden is ever lifted. */
          title="Animated map tracing a route from São Paulo to Amsterdam"
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            border: 'none', pointerEvents: 'none',
            opacity: 0.5,
          }}
          tabIndex={-1}
          aria-hidden="true"
        />
        {/* Hero content */}
        <div className="section-pad hero-pad" style={{ position: 'relative', zIndex: 1, maxWidth: 'var(--container)', margin: '0 auto', padding: '88px 48px 56px' }}>
          <Eyebrow style={{ marginBottom: 24 }}>Senior Product Designer · Backbase · Amsterdam</Eyebrow>
          <h1 style={{ fontSize: 'clamp(38px,6vw,72px)', lineHeight: 0.98, letterSpacing: '-0.03em', fontWeight: 700, margin: 0 }}>Design for teams building new products — or evolving existing ones</h1>
          <p style={{ fontSize: 18, lineHeight: 1.55, color: 'var(--text-secondary)', margin: '24px 0 0', fontWeight: 400 }}>Twelve years of brand, product and the systems that hold them together — identity through interface, shipped end to end.</p>
          <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
            <Button variant="accent" onClick={() => window.location.href = '/work'}>See all work</Button>
            <Button variant="secondary" onClick={() => window.location.href = '/about'}>About me</Button>
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ borderTop: '1px solid var(--border-hairline)', maxWidth: 'var(--container)', margin: '0 auto', padding: '64px 48px', position: 'relative', overflow: 'hidden' }}>
        <GridLines />
        <Reveal style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 32 }}>
          <h2 style={{ fontSize: 30, fontWeight: 600, letterSpacing: '-0.02em', margin: 0 }}>Selected work</h2>
          <a href="/work" style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', textDecoration: 'none' }}>Index →</a>
        </Reveal>
        {/* Lead case — full row, image beside the copy so the wider slot
            buys prominence rather than just a taller image. */}
        {lead && (
          <Reveal {...previewProps(lead)}>
          <Card interactive flush onClick={() => window.location.href = `/work/${lead.slug}`} style={{ overflow: 'hidden', cursor: 'pointer', marginBottom: 24 }}>
            {/* Image column is sized to match a thumbnail in the grid below,
                so its right edge lands on the left card's edge: the grid is
                two 1fr columns with a 24px gap, and each card carries 1px
                borders — hence 50% less half the gap, less the border delta. */}
            <div className="home-lead" style={{ display: 'grid', gridTemplateColumns: 'calc(50% - 13px) 1fr', gap: 0, alignItems: 'stretch' }}>
              <ImagePlaceholder label={lead.imageLabel} src={lead.coverImage} ratio="16/10" style={{ height: '100%' }} />
              <div style={{ padding: 40, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
                  {lead.tags.map((t) => <Tag key={t} size="sm">{t}</Tag>)}
                </div>
                <h3 style={{ fontSize: 30, fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.14, margin: '0 0 12px' }}>{lead.title}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--text-secondary)', margin: '0 0 22px' }}>{lead.summary}</p>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', display: 'inline-flex', alignItems: 'center', gap: 8, borderBottom: '1px solid var(--accent)', paddingBottom: 3, alignSelf: 'flex-start' }}>Read case →</span>
              </div>
            </div>
          </Card>
          </Reveal>
        )}

        <div className="grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {rest.map((p, i) => (
            /* Staggered so a row arrives in sequence rather than as one block. */
            <Reveal key={p.slug} delay={(i % 2) * 70} {...previewProps(p)}>
            <Card interactive flush onClick={() => window.location.href = `/work/${p.slug}`} style={{ overflow: 'hidden', cursor: 'pointer' }}>
              <ImagePlaceholder label={p.imageLabel} src={p.coverImage} />
              <div style={{ padding: 24 }}>
                <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
                  {p.tags.map((t) => <Tag key={t} size="sm">{t}</Tag>)}
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.18, margin: '0 0 10px' }}>{p.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--text-secondary)', margin: '0 0 18px' }}>{p.summary}</p>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', display: 'inline-flex', alignItems: 'center', gap: 8, borderBottom: '1px solid var(--accent)', paddingBottom: 3 }}>Read case →</span>
              </div>
            </Card>
            </Reveal>
          ))}
        </div>

        <HoverPreview frames={preview.frames} slug={preview.slug} x={preview.x} y={preview.y} visible={preview.on} onDismiss={previewOff} />
      </section>

      <section className="grid-2col section-pad" style={{ borderTop: '1px solid var(--border-hairline)', maxWidth: 'var(--container)', margin: '0 auto', padding: '64px 48px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'start' }}>
        <Reveal>
          <h2 style={{ fontSize: 'clamp(34px,5vw,56px)', lineHeight: 1.02, letterSpacing: '-0.03em', fontWeight: 700, margin: 0 }}>What I do</h2>
        </Reveal>
        <Reveal delay={70}>
        <Accordion items={[
          { title: 'Product Design', content: 'I work across the full product design lifecycle, from discovery and requirements analysis to interaction design, prototyping, validation, and delivery. My background in design systems, visual design, and client-facing implementation allows me to turn complex business needs into scalable, intuitive experiences — especially in structured environments like financial services and e-commerce. I collaborate closely with product, engineering, and business stakeholders to shape solutions that are usable, consistent, and feasible to build.' },
          { title: 'Consultancy', content: 'Strategic design support for teams building new products or evolving existing ones — from brief through to shipped. This includes supporting the requirements and discovery process: clarifying business needs, synthesising stakeholder input, and translating early ideas into structured product direction.' },
          { title: 'Design system enablement and management', content: 'Experience working in Figma to support design system management, extension, and adoption, including the creation of new systems with AI-assisted processes.' },
          { title: 'AI-assisted design & development', content: 'Leverage AI tooling — including connected MCP workflows with Claude Code and Penpot — to automate design work directly in the canvas, generate production-ready components, and maintain consistency across large systems. Extends into front-end: translating design tokens and specs into responsive web interfaces using HTML, CSS, Git, and deployment workflows.' },
          { title: 'Visual Design', content: 'Brand identity, typography, and visual systems that give a product a recognisable point of view.' },
        ]} />
        </Reveal>
      </section>

      <section style={{ background: 'var(--surface-ink)' }}>
        <div className="grid-4col section-pad" style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '56px 48px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }}>
          {[['12+', 'Years shipping product'], ['40', 'Projects delivered'], ['10+', 'Brands built from zero'], ['7', 'Countries, clients from']].map(([v, l], i) => (
            <Reveal key={l} delay={i * 70}>
              <StatCard value={<CountUp value={v} />} label={l} onDark />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
