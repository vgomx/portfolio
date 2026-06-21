import { Button } from '../ds/components/core/Button.jsx';
import { Tag } from '../ds/components/core/Tag.jsx';
import { Card } from '../ds/components/data/Card.jsx';
import { StatCard } from '../ds/components/data/StatCard.jsx';
import { Accordion } from '../ds/components/feedback/Accordion.jsx';
import { ImagePlaceholder, Eyebrow } from './Chrome.jsx';

export default function HomeScreen({ projects }) {
  const featured = projects.slice(0, 4);
  return (
    <div>
      <section style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Globe animation background */}
        <iframe
          src="/hero-globe.html"
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            border: 'none', pointerEvents: 'none',
            opacity: 0.5,
          }}
          tabIndex={-1}
          aria-hidden="true"
        />
        {/* Hero content */}
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 'var(--container)', margin: '0 auto', padding: '88px 48px 56px' }}>
          <Eyebrow style={{ marginBottom: 24 }}>Product Designer · Amsterdam</Eyebrow>
          <h1 style={{ fontSize: 'clamp(38px,6vw,72px)', lineHeight: 0.98, letterSpacing: '-0.03em', fontWeight: 700, margin: 0, maxWidth: '15ch' }}>Design for teams shaping new things.</h1>
          <p style={{ fontSize: 18, lineHeight: 1.55, color: 'var(--text-secondary)', maxWidth: '54ch', margin: '24px 0 0', fontWeight: 400 }}>Twelve years of brand, product and the systems that hold them together — identity through interface, shipped end to end.</p>
          <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
            <Button variant="accent" onClick={() => window.location.href = '/about'}>Start a project</Button>
            <Button variant="secondary" onClick={() => window.location.href = '/work'}>See all work</Button>
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ borderTop: '1px solid var(--border-hairline)', maxWidth: 'var(--container)', margin: '0 auto', padding: '64px 48px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 32 }}>
          <h2 style={{ fontSize: 30, fontWeight: 600, letterSpacing: '-0.02em', margin: 0 }}>Selected work</h2>
          <a href="/work" style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', textDecoration: 'none' }}>Index →</a>
        </div>
        <div className="grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {featured.map((p) => (
            <Card key={p.slug} interactive flush onClick={() => window.location.href = `/work/${p.slug}`} style={{ overflow: 'hidden', cursor: 'pointer' }}>
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
          ))}
        </div>
      </section>

      <section className="grid-2col section-pad" style={{ borderTop: '1px solid var(--border-hairline)', maxWidth: 'var(--container)', margin: '0 auto', padding: '64px 48px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'start' }}>
        <h2 style={{ fontSize: 'clamp(34px,5vw,56px)', lineHeight: 1.02, letterSpacing: '-0.03em', fontWeight: 700, margin: 0 }}>What do I do?</h2>
        <Accordion items={[
          { title: 'Consultancy', content: 'Strategic design support for teams building new products or evolving existing ones — from brief through to shipped.' },
          { title: 'User Experience (UX) Design', content: 'Research, flows, wireframes, and high-fidelity prototypes that map clearly to real user needs.' },
          { title: 'User Interface (UI) Design', content: 'Interface design that works at every scale — component-level decisions, system-level coherence.' },
          { title: 'Visual Design', content: 'Brand identity, typography, and visual systems that give a product a recognisable point of view.' },
        ]} />
      </section>

      <section style={{ background: 'var(--surface-ink)' }}>
        <div className="grid-4col section-pad" style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '56px 48px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }}>
          {[['12+', 'Years shipping product'], ['40', 'Projects delivered'], ['9', 'Brands built from zero'], ['3', 'Continents, remote']].map(([v, l]) => (
            <StatCard key={l} value={v} label={l} onDark />
          ))}
        </div>
      </section>
    </div>
  );
}
