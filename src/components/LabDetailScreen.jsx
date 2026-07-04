import { Badge } from '../ds/components/core/Badge.jsx';
import { Tag } from '../ds/components/core/Tag.jsx';
import { Eyebrow, GridLines } from './Chrome.jsx';
import { ExternalLinkCard } from './ExternalLinkCard.jsx';
import { LabEntry, LabFx, LabExit } from './LabScreen.jsx';

function MetaCell({ label, value }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-faint)' }}>{label}</span>
      <span style={{ fontSize: 14, color: 'var(--text-primary)' }}>{value}</span>
    </div>
  );
}

export default function LabDetailScreen({ project }) {
  const p = project;
  return (
    <>
    <LabEntry />
    <LabFx />
    <LabExit />
    <div className="page-enter">
      <section className="section-pad" style={{ maxWidth: 760, margin: '0 auto', padding: '64px 48px 96px', position: 'relative' }}>
        <a href="/lab" style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', textDecoration: 'none' }}>← Lab index</a>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '40px 0 16px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)' }}>{p.code}</span>
          <Badge status={p.status}>{p.statusLabel}</Badge>
        </div>

        <h1 className="lab-glitch" data-text={p.title} style={{ fontSize: 'clamp(32px,4.5vw,48px)', lineHeight: 1.05, letterSpacing: '-0.03em', fontWeight: 700, margin: '0 0 18px' }}>{p.title}</h1>
        <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--text-secondary)', margin: '0 0 32px' }}>{p.summary}</p>

        {p.liveUrl && (
          <a className="lab-launch-btn" href={p.liveUrl} target="_blank" rel="noopener noreferrer" style={{ marginBottom: 40 }}>
            Launch experiment
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M4.5 11.5L11.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M6 4.5H11.5V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        )}

        <div className="meta-strip" style={{ display: 'flex', gap: 40, padding: '24px 0', margin: '8px 0 40px', borderTop: '1px solid var(--border-hairline)', borderBottom: '1px solid var(--border-hairline)' }}>
          <MetaCell label="Year" value={p.year} />
          <MetaCell label="Status" value={p.statusLabel} />
          {p.stack && <MetaCell label="Stack" value={p.stack.join(' / ')} />}
        </div>

        {p.coverImage && (
          <img src={p.coverImage} alt={p.imageLabel || p.title} loading="lazy" decoding="async" style={{ width: '100%', borderRadius: 'var(--radius)', border: '1px solid var(--border-hairline)', marginBottom: 40, display: 'block' }} />
        )}

        {p.about && p.about.map((para, i) => (
          <p key={i} style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-secondary)', margin: '0 0 20px' }}>{para}</p>
        ))}

        {p.tags && (
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', margin: '12px 0 48px' }}>
            {p.tags.map((t) => <Tag key={t} size="sm">{t}</Tag>)}
          </div>
        )}

        {p.links && p.links.length > 0 && (
          <div style={{ margin: '0 0 48px' }}>
            <Eyebrow style={{ marginBottom: 16 }}>Links</Eyebrow>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {p.links.map((l) => <ExternalLinkCard key={l.href} title={l.title} href={l.href} />)}
            </div>
          </div>
        )}

        {p.log && p.log.length > 0 && (
          <>
            <Eyebrow style={{ marginBottom: 20 }}>Lab log</Eyebrow>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {p.log.map((entry, i) => (
                <div key={i} style={{ display: 'flex', gap: 20, padding: '16px 0 16px 20px', borderLeft: '1px solid var(--border-default)', position: 'relative' }}>
                  <span aria-hidden="true" style={{ position: 'absolute', left: -3.5, top: 22, width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)' }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', color: 'var(--text-faint)', flex: 'none', paddingTop: 3 }}>{entry.date}</span>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--text-secondary)', margin: 0 }}>{entry.entry}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
    </>
  );
}
