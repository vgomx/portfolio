import { Tag } from '../ds/components/core/Tag.jsx';

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function NoteScreen({ note, body }) {
  return (
    <div>
      {/* Header */}
      <section className="section-pad" style={{ maxWidth: 720, margin: '0 auto', padding: '80px 48px 48px' }}>
        <a
          href="/notes"
          style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-faint)', textDecoration: 'none', display: 'inline-block', marginBottom: 40 }}
        >
          ← Notes
        </a>
        <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
          {(note.tags || []).map((t) => <Tag key={t} size="sm">{t}</Tag>)}
        </div>
        <h1 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 700, lineHeight: 1.08, letterSpacing: '-0.03em', margin: '0 0 24px' }}>
          {note.title}
        </h1>
        <p style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--text-secondary)', margin: '0 0 32px' }}>
          {note.summary}
        </p>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-faint)', letterSpacing: '0.06em', paddingTop: 24, borderTop: '1px solid var(--border-hairline)' }}>
          {formatDate(note.date)}
        </div>
      </section>

      {/* Body */}
      <article
        className="note-body section-pad"
        style={{ maxWidth: 720, margin: '0 auto', padding: '0 48px 120px' }}
        dangerouslySetInnerHTML={{ __html: body }}
      />

      <style>{`
        .note-body { color: var(--text-primary); }
        .note-body p { font-size: 17px; line-height: 1.75; margin: 0 0 1.4em; }
        .note-body h2 { font-size: 22px; font-weight: 700; letter-spacing: -0.02em; line-height: 1.2; margin: 2.4em 0 0.8em; }
        .note-body h3 { font-size: 18px; font-weight: 600; letter-spacing: -0.01em; margin: 2em 0 0.6em; }
        .note-body ul, .note-body ol { font-size: 17px; line-height: 1.75; padding-left: 1.5em; margin: 0 0 1.4em; }
        .note-body li { margin-bottom: 0.4em; }
        .note-body hr { border: none; border-top: 1px solid var(--border-hairline); margin: 3em 0; }
        .note-body strong { font-weight: 600; }
        .note-body em { font-style: italic; color: var(--text-secondary); }
        .note-body a { color: var(--accent); text-decoration: underline; text-underline-offset: 3px; }
        .note-body code { font-family: var(--font-mono); font-size: 13px; background: var(--surface-subtle); padding: 2px 6px; border-radius: 4px; }
        .note-body blockquote { border-left: 3px solid var(--border-default); margin: 0 0 1.4em; padding: 0 0 0 20px; color: var(--text-secondary); font-style: italic; }
      `}</style>
    </div>
  );
}
