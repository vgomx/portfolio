import { Tag } from '../ds/components/core/Tag.jsx';
import { Badge } from '../ds/components/core/Badge.jsx';
import { Button } from '../ds/components/core/Button.jsx';
import { Card } from '../ds/components/data/Card.jsx';
import { StatCard } from '../ds/components/data/StatCard.jsx';
import { Breadcrumb } from '../ds/components/navigation/Breadcrumb.jsx';
import { Stepper } from '../ds/components/navigation/Stepper.jsx';
import { ImagePlaceholder } from './Chrome.jsx';

function SectionHead({ n, title }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: 16, alignItems: 'baseline', marginBottom: 16 }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', color: 'var(--text-faint)' }}>{n}</span>
      <h2 style={{ fontSize: 24, fontWeight: 600, letterSpacing: '-0.02em', margin: 0 }}>{title}</h2>
    </div>
  );
}

export default function CaseStudyScreen({ project }) {
  const p = project;
  return (
    <div>
      <section style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '40px 48px 0' }}>
        <Breadcrumb
          items={[{ label: 'Work' }, { label: p.discipline }, { label: p.title }]}
          onNavigate={(_, i) => { if (i < 2) window.location.href = '/work'; }}
        />
      </section>

      <section style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '40px 48px 48px' }}>
        <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
          {p.tags.map((t) => <Tag key={t}>{t}</Tag>)}
          <Badge status={p.status}>{p.statusLabel}</Badge>
        </div>
        <h1 style={{ fontSize: 'clamp(36px,5.5vw,64px)', lineHeight: 1, letterSpacing: '-0.03em', fontWeight: 700, margin: 0, maxWidth: '18ch' }}>{p.title}</h1>
        <p style={{ fontSize: 18, lineHeight: 1.55, color: 'var(--text-secondary)', maxWidth: '56ch', margin: '24px 0 0' }}>{p.summary}</p>
      </section>

      <section style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '0 48px 56px' }}>
        <ImagePlaceholder ratio="16/8" label="[ Hero — case study cover ]" src={p.coverImage} style={{ border: '1px solid var(--border-hairline)' }} />
      </section>

      <section style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '0 48px 80px', display: 'grid', gridTemplateColumns: '220px 1fr', gap: 48, alignItems: 'start' }}>
        <div style={{ position: 'sticky', top: 96 }}>
          <div style={{ border: '1px solid var(--border-hairline)', padding: 8 }}>
            {['Overview', 'Challenge', 'Process', 'Outcome'].map((s, i) => (
              <div key={s} style={{
                fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase',
                color: i === 0 ? 'var(--text-primary)' : 'var(--text-secondary)',
                padding: '10px 12px', borderLeft: i === 0 ? '2px solid var(--accent)' : '2px solid transparent',
                background: i === 0 ? 'var(--surface-subtle)' : 'transparent', cursor: 'pointer',
              }}>{s}</div>
            ))}
          </div>
          <div style={{ marginTop: 20, fontFamily: 'var(--font-mono)', fontSize: 11, lineHeight: 2, color: 'var(--text-muted)' }}>
            <div>Role · {p.role || 'Lead Designer'}</div>
            <div>Year · {p.year}</div>
            <div>Team · {p.team || '—'}</div>
            {p.country && <div>Country · {p.country}</div>}
          </div>
        </div>

        <div>
          <div style={{ marginBottom: 56 }}>
            <SectionHead n="01" title="Overview" />
            <p style={{ fontSize: 16, lineHeight: 1.65, color: 'var(--text-secondary)', maxWidth: '64ch', marginLeft: 76 }}>{p.overview}</p>
          </div>
          <div style={{ marginBottom: 56 }}>
            <SectionHead n="02" title="Challenge" />
            <p style={{ fontSize: 16, lineHeight: 1.65, color: 'var(--text-secondary)', maxWidth: '64ch', marginLeft: 76 }}>{p.challenge}</p>
          </div>
          <div style={{ marginBottom: 56 }}>
            <SectionHead n="03" title="Process" />
            <div style={{ marginLeft: 76 }}><Stepper steps={p.steps || ['Brief', 'Design', 'Ship']} current={(p.steps || []).length - 1} /></div>
          </div>
          {p.outcomes && (
            <div style={{ marginBottom: 48 }}>
              <SectionHead n="04" title="Outcome" />
              <div style={{ marginLeft: 76, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                {p.outcomes.map((o) => (
                  <Card key={o.label} tone="ink"><StatCard value={o.value} label={o.label} onDark /></Card>
                ))}
              </div>
            </div>
          )}
          <div style={{ marginLeft: 76 }}>
            <Button variant="accent" onClick={() => window.location.href = '/about'}>Start a project like this</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
