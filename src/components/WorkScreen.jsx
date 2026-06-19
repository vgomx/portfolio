import { useState } from 'react';
import { SegmentedControl } from '../ds/components/core/SegmentedControl.jsx';
import { Badge } from '../ds/components/core/Badge.jsx';
import { Tag } from '../ds/components/core/Tag.jsx';
import { Card } from '../ds/components/data/Card.jsx';
import { ImagePlaceholder, Eyebrow } from './Chrome.jsx';

export default function WorkScreen({ projects }) {
  const [discipline, setDiscipline] = useState('All');

  const disciplines = ['All', 'Branding', 'UX / UI', 'Visual Design'];
  const rows = projects.filter((p) => discipline === 'All' || p.discipline === discipline);

  return (
    <div>
      <section style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '72px 48px 40px' }}>
        <Eyebrow style={{ marginBottom: 18 }}>Index / {rows.length} projects</Eyebrow>
        <h1 style={{ fontSize: 'clamp(34px,5vw,56px)', lineHeight: 1, letterSpacing: '-0.03em', fontWeight: 700, margin: '0 0 36px' }}>All work</h1>
        <SegmentedControl options={disciplines} value={discipline} onChange={setDiscipline} />
      </section>

      <section style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '0 48px 80px' }}>
        <div style={{
          columns: '2',
          columnGap: 24,
        }}>
          {rows.map((p) => (
            <div
              key={p.slug}
              onClick={() => window.location.href = `/work/${p.slug}`}
              style={{ breakInside: 'avoid', marginBottom: 24, cursor: 'pointer' }}
            >
              <Card interactive flush style={{ overflow: 'hidden' }}>
                <ImagePlaceholder
                  label={p.imageLabel}
                  src={p.coverImage}
                  ratio={p.slug === 'video-platform-identity' || p.slug === 'fintech-design-system' ? '4/3' : '16/10'}
                />
                <div style={{ padding: '20px 24px 24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {p.tags.map((t) => <Tag key={t} size="sm">{t}</Tag>)}
                    </div>
                    <Badge status={p.status}>{p.statusLabel}</Badge>
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.18, margin: '0 0 8px' }}>{p.title}</h3>
                  <p style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--text-secondary)', margin: '0 0 16px' }}>{p.summary}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-faint)' }}>{p.discipline} · {p.year}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', borderBottom: '1px solid var(--accent)', paddingBottom: 2 }}>View →</span>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
