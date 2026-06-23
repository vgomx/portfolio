import { Tag } from '../ds/components/core/Tag.jsx';
import { Eyebrow, GridLines } from './Chrome.jsx';

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

function readingTime(summary) {
  const words = summary.split(' ').length;
  const mins = Math.max(1, Math.round(words / 200));
  return `${mins} min read`;
}

export default function NotesScreen({ notes }) {
  const featured = notes.find((n) => n.featured);
  const rest = notes.filter((n) => !n.featured);

  return (
    <div className="page-enter">
      {/* Hero */}
      <section style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '88px 48px 64px', borderBottom: '1px solid var(--border-hairline)' }}>
        <Eyebrow style={{ marginBottom: 24 }}>Notes</Eyebrow>
        <h1 style={{ fontSize: 'clamp(34px,5vw,56px)', lineHeight: 1.02, letterSpacing: '-0.03em', fontWeight: 700, margin: '0 0 16px', maxWidth: '20ch' }}>
          Writing on design, systems and process.
        </h1>
        <p style={{ fontSize: 18, lineHeight: 1.55, color: 'var(--text-secondary)', margin: 0, maxWidth: '52ch' }}>
          Mixed length — some long essays, some quick observations. Updated irregularly.
        </p>
      </section>

      {/* Featured post */}
      {featured && (
        <section style={{ borderBottom: '1px solid var(--border-hairline)', position: 'relative', overflow: 'hidden' }}>
          <GridLines />
          <div style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '64px 48px', position: 'relative', zIndex: 1 }}>
            <a
              href={`/notes/${featured.slug}`}
              className="grid-2col"
              style={{ textDecoration: 'none', color: 'inherit', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'start' }}
            >
              <div>
                <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
                  {(featured.tags || []).map((t) => <Tag key={t} size="sm">{t}</Tag>)}
                </div>
                <h2 style={{ fontSize: 'clamp(24px,3.5vw,40px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.025em', margin: '0 0 20px' }}>
                  {featured.title}
                </h2>
                <p style={{ fontSize: 17, lineHeight: 1.65, color: 'var(--text-secondary)', margin: '0 0 28px', maxWidth: '52ch' }}>
                  {featured.summary}
                </p>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', borderBottom: '1px solid var(--accent)', paddingBottom: 3 }}>
                  Read →
                </span>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-faint)', letterSpacing: '0.06em', paddingTop: 4 }}>
                {formatDate(featured.date)}
              </div>
            </a>
          </div>
        </section>
      )}

      {/* Note list */}
      <section style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '0 48px 80px' }}>
        {rest.map((note, i) => (
          <a
            key={note.slug}
            href={`/notes/${note.slug}`}
            className="grid-notes-list"
            style={{
              display: 'grid', gridTemplateColumns: '160px 1fr auto', gap: 40, alignItems: 'baseline',
              padding: '32px 0', borderBottom: '1px solid var(--border-hairline)',
              textDecoration: 'none', color: 'inherit',
            }}
          >
            <span className="notes-list-date" style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-faint)', letterSpacing: '0.06em' }}>
              {formatDate(note.date)}
            </span>
            <div>
              <h3 style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.015em', lineHeight: 1.2, margin: '0 0 8px' }}>
                {note.title}
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--text-secondary)', margin: '0 0 12px', maxWidth: '60ch' }}>
                {note.summary}
              </p>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {(note.tags || []).map((t) => <Tag key={t} size="sm">{t}</Tag>)}
              </div>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-faint)', whiteSpace: 'nowrap' }}>
              {readingTime(note.summary)}
            </span>
          </a>
        ))}
      </section>
    </div>
  );
}
