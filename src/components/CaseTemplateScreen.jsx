import { useEffect, useMemo, useState } from 'react';
import { Tag } from '../ds/components/core/Tag.jsx';
import { Badge } from '../ds/components/core/Badge.jsx';
import { Avatar } from '../ds/components/core/Avatar.jsx';
import { Card } from '../ds/components/data/Card.jsx';
import { StatCard } from '../ds/components/data/StatCard.jsx';
import { Breadcrumb } from '../ds/components/navigation/Breadcrumb.jsx';
import { SectionNav } from '../ds/components/case/SectionNav.jsx';
import { ReadingBar } from '../ds/components/case/ReadingBar.jsx';
import { SectionHeader } from '../ds/components/case/SectionHeader.jsx';
import { CaseDetails } from '../ds/components/case/CaseDetails.jsx';
import { OutcomeStrip } from '../ds/components/case/OutcomeStrip.jsx';
import { ReframeQuote } from '../ds/components/case/ReframeQuote.jsx';
import { NumberedCards } from '../ds/components/case/NumberedCards.jsx';
import { ReasoningChain } from '../ds/components/case/ReasoningChain.jsx';
import { FlowDiagram } from '../ds/components/case/FlowDiagram.jsx';
import { CompareSlider } from '../ds/components/case/CompareSlider.jsx';
import { DecisionRow } from '../ds/components/case/DecisionRow.jsx';
import { StateList } from '../ds/components/case/StateList.jsx';
import { AnnotatedScreen } from '../ds/components/case/AnnotatedScreen.jsx';
import { ImageCarousel } from '../ds/components/case/ImageCarousel.jsx';
import { Callout } from '../ds/components/case/Callout.jsx';
import { CaseNav } from '../ds/components/case/CaseNav.jsx';

/* The case-study template (template: "case"). A case is a list of
   sections, each a SectionHeader followed by blocks; every block type is
   documented in src/content.config.ts. Layout, spacing and the reading
   progress live here; the parts come from vgomx/ds components/case. */

const mono = { fontFamily: 'var(--font-mono)', textTransform: 'uppercase' };
const eyebrowStyle = { ...mono, fontSize: 11, fontWeight: 500, letterSpacing: 'var(--tracking-caps)', color: 'var(--text-primary)' };
const metaStyle = { ...mono, fontSize: 11, letterSpacing: '0.1em', color: 'var(--text-muted)' };
const bodyStyle = { fontSize: 16, lineHeight: 1.65, color: 'var(--text-secondary)', margin: 0 };
const h3Style = { fontSize: 26, lineHeight: 1.15, fontWeight: 600, letterSpacing: 'var(--tracking-tight)', margin: 0 };
const stripes = 'repeating-linear-gradient(135deg, var(--surface-subtle) 0 11px, var(--border-hairline) 11px 22px)';
const WORDS_PER_MINUTE = 230;
const pad = (n) => String(n).padStart(2, '0');

/* ── Small parts ─────────────────────────────────────────────────────── */

function Shot({ src, alt, label, ratio, onInk, fit = 'cover', style }) {
  if (src) {
    return (
      <img src={src} alt={alt || ''} loading="lazy" decoding="async"
        style={{ display: 'block', width: '100%', height: ratio ? undefined : 'auto', aspectRatio: ratio, objectFit: fit, objectPosition: 'top',
          border: `1px solid ${onInk ? 'var(--border-on-ink)' : 'var(--border-hairline)'}`, borderRadius: 'var(--radius)', ...style }} />
    );
  }
  return (
    <div style={{ aspectRatio: ratio || '4 / 5', border: `1px solid ${onInk ? 'var(--border-on-ink)' : 'var(--border-hairline)'}`, borderRadius: 'var(--radius)',
      background: onInk ? 'var(--surface-ink-2)' : stripes, display: 'flex', alignItems: 'center', justifyContent: 'center', ...style }}>
      <span style={{ ...mono, fontSize: 11, letterSpacing: '0.08em', color: onInk ? 'var(--text-inverse-muted)' : 'var(--text-muted)' }}>[ {label || 'Image'} ]</span>
    </div>
  );
}

function Paragraphs({ items = [], style }) {
  if (!items.length) return null;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, ...style }}>
      {items.map((t, i) => <p key={i} style={bodyStyle}>{t}</p>)}
    </div>
  );
}

function Caption({ children }) {
  if (!children) return null;
  return <figcaption style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--text-muted)', marginTop: 10 }}>{children}</figcaption>;
}

/* Number and headline on the left, reasoning on the right: the header
   used by decisions whose media runs full width underneath. */
function SplitHead({ number, eyebrow, tag, title, paragraphs }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px 48px', alignItems: 'baseline' }}>
      <div style={{ flex: '1 1 360px', minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {number && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.1em', color: 'var(--text-muted)' }}>{number}</span>}
          {eyebrow && <span style={metaStyle}>{eyebrow}</span>}
          {tag && <Tag tone="subtle" size="sm">{tag}</Tag>}
        </div>
        <h3 style={{ ...h3Style, marginTop: 8 }}>{title}</h3>
      </div>
      <Paragraphs items={paragraphs} style={{ flex: '1 1 480px', minWidth: 0, gap: 16 }} />
    </div>
  );
}

/* A form field in its error state, drawn live rather than as a screenshot. */
function FieldDemo({ eyebrow, label, value, error }) {
  return (
    <div style={{ padding: 24, border: '1px solid var(--border-hairline)', borderRadius: 'var(--radius)', background: 'var(--surface-subtle)', display: 'flex', flexDirection: 'column', gap: 8 }}>
      {eyebrow && <span style={{ ...metaStyle, marginBottom: 8 }}>{eyebrow}</span>}
      <label style={{ fontSize: 14, fontWeight: 500 }}>
        {label}
        <input type="text" value={value} readOnly aria-invalid="true"
          style={{ display: 'block', width: '100%', marginTop: 8, padding: '12px 14px', font: 'inherit', fontWeight: 400, fontSize: 15, color: 'var(--text-primary)',
            background: 'var(--surface-page)', border: '1px solid var(--danger)', borderRadius: 'var(--radius)', outline: 'none' }} />
      </label>
      <span role="alert" style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--danger)' }}>{error}</span>
    </div>
  );
}

/* Several screens side by side with numbered markers across them. The
   markers sit in percentages, so the set scales down on small screens; the
   open callout shows beside the set, or under it when there's no room. */
const SET_GAP = 40;
function ScreenSet({ screens = [], callouts = [] }) {
  const [active, setActive] = useState(0);
  let left = 0;
  const geo = screens.map((sc) => { const g = { left, w: sc.width, h: sc.width * sc.ratio }; left += sc.width + SET_GAP; return g; });
  const TW = left - SET_GAP;
  const TH = Math.max(...geo.map((g) => g.h));
  const pos = (c) => ({ x: ((geo[c.screen].left + (geo[c.screen].w * c.x) / 100) / TW) * 100, y: (((geo[c.screen].h * c.y) / 100) / TH) * 100 });
  const a = callouts[active] || callouts[0];
  const n = (i) => pad(i + 1);
  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'flex-start', justifyContent: 'center' }}>
        <div style={{ position: 'relative', flex: `0 1 ${TW}px`, minWidth: 0, maxWidth: '100%', aspectRatio: `${TW} / ${TH}` }}>
          {screens.map((sc, i) => (
            <img key={i} src={sc.src} alt={sc.alt || ''} loading="lazy" decoding="async"
              style={{ position: 'absolute', top: 0, left: `${(geo[i].left / TW) * 100}%`, width: `${(geo[i].w / TW) * 100}%`, height: 'auto',
                border: '1px solid var(--border-default)', borderRadius: 'var(--radius)' }} />
          ))}
          {callouts.map((c, i) => {
            const p = pos(c);
            const on = i === active;
            return (
              <button key={i} type="button" aria-label={`Callout ${n(i)}: ${c.title}`} aria-expanded={on}
                onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)}
                style={{ position: 'absolute', left: `${p.x}%`, top: `${p.y}%`, width: 44, height: 44, margin: '-22px 0 0 -22px', padding: 0, border: 0, background: 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: on ? 3 : 2 }}>
                <span aria-hidden="true" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28, borderRadius: 999,
                  background: on ? 'var(--green-600)' : 'var(--ink-900)', color: '#fafafa',
                  boxShadow: `0 0 0 2px var(--surface-page)${on ? ', 0 0 0 4px var(--green-600)' : ''}`,
                  fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500, letterSpacing: '0.04em' }}>{n(i)}</span>
              </button>
            );
          })}
        </div>
        {a && (
          <div role="status" style={{ flex: '1 1 260px', maxWidth: 360, padding: 20, border: '1px solid var(--border-hairline)', borderRadius: 'var(--radius)', background: 'var(--surface-page)', boxShadow: 'var(--shadow-pop)', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', color: 'var(--text-muted)' }}>{n(active)} / {n(callouts.length - 1)}</span>
              <span style={{ flex: 1, height: 1, background: 'var(--border-hairline)' }} />
            </div>
            <h4 style={{ fontSize: 17, lineHeight: 1.3, fontWeight: 600, letterSpacing: 'var(--tracking-snug)', margin: 0 }}>{a.title}</h4>
            <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--text-secondary)', margin: 0 }}>{a.body}</p>
          </div>
        )}
      </div>
      <ol aria-label="Callouts" style={{ listStyle: 'none', margin: '32px 0 0', padding: 0, display: 'flex', flexWrap: 'wrap', gap: 1, background: 'var(--border-hairline)', border: '1px solid var(--border-hairline)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
        {callouts.map((c, i) => {
          const on = i === active;
          return (
            <li key={i} style={{ flex: '1 1 220px', minWidth: 0, background: 'var(--surface-page)' }}>
              <button type="button" onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)}
                style={{ width: '100%', minHeight: 64, display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px', border: 0,
                  borderTop: `2px solid ${on ? 'var(--green-600)' : 'transparent'}`, background: on ? 'var(--surface-subtle)' : 'transparent',
                  color: 'var(--text-primary)', font: 'inherit', cursor: 'pointer', textAlign: 'left' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', color: 'var(--text-muted)' }}>{n(i)}</span>
                <span style={{ fontSize: 15, fontWeight: 500 }}>{c.title}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* ── Blocks ──────────────────────────────────────────────────────────── */

function Decision({ b }) {
  const m = b.media;
  const chain = b.chain?.length ? <ReasoningChain steps={b.chain} label="Considered, chose, why" style={{ marginTop: 32 }} /> : null;
  const article = { marginTop: 0, paddingTop: 40, borderTop: '1px solid var(--border-hairline)' };

  // Media beside the text: a screen, a sequence, a live field, or nothing (placeholder).
  if (!m || (m.kind === 'image' && !m.wide) || m.kind === 'carousel' || m.kind === 'field') {
    let media;
    if (m?.kind === 'field') media = <FieldDemo {...m} />;
    else if (m?.kind === 'carousel') media = <ImageCarousel images={m.images} startIndex={m.startIndex} ratio={m.ratio} label={m.label || b.title} />;
    else if (m?.kind === 'image') media = <figure style={{ margin: 0 }}><Shot src={m.src} alt={m.alt} label={m.label || 'Screen'} ratio={m.ratio || (m.src ? undefined : '9 / 16')} /><Caption>{m.caption}</Caption></figure>;
    return (
      <div>
        <DecisionRow number={b.number} tag={b.tag} title={b.title} media={media} mediaWidth={b.mediaWidth || 300}>
          {(b.paragraphs || []).map((t, i) => <p key={i} style={{ margin: 0 }}>{t}</p>)}
        </DecisionRow>
        {chain}
      </div>
    );
  }

  // States beside the text.
  if (m.kind === 'states') {
    return (
      <article style={article}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px 48px', alignItems: 'flex-start' }}>
          <div style={{ flex: '1 1 420px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {b.number && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.1em', color: 'var(--text-muted)' }}>{b.number}</span>}
              {b.tag && <Tag tone="subtle" size="sm">{b.tag}</Tag>}
            </div>
            <h3 style={h3Style}>{b.title}</h3>
            <Paragraphs items={b.paragraphs} style={{ gap: 12 }} />
          </div>
          <div style={{ flex: '1 1 420px', minWidth: 0 }}><StateList states={m.states} countLabel={m.countLabel} /></div>
        </div>
        {chain}
      </article>
    );
  }

  // Full-width media under a split header.
  let media = null;
  if (m.kind === 'image') {
    media = <figure style={{ margin: 0 }}><Shot src={m.src} alt={m.alt} label={m.label || 'Screen'} ratio={m.ratio} /><Caption>{m.caption}</Caption></figure>;
  } else if (m.kind === 'annotated-set') {
    media = <ScreenSet screens={m.screens} callouts={m.callouts} />;
  } else if (m.kind === 'compare') {
    media = <CompareSlider before={m.before} after={m.after} labels={m.labels} caption={m.captions} ratio={m.ratio || '16 / 7'} start={m.start} />;
  } else if (m.kind === 'annotated') {
    media = <AnnotatedScreen image={m.image} callouts={m.callouts} ratio={m.ratio || '9 / 20'} width={m.width} placement={m.placement || 'auto'} />;
  } else if (m.kind === 'gallery') {
    media = (
      <div className="case-gallery" style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(${m.minWidth || 200}px, 1fr))`, gap: '32px 24px', alignItems: 'start' }}>
        {m.items.map((it, i) => (
          <figure key={i} style={{ margin: 0 }}>
            <Shot src={it.src} alt={it.alt} label={it.label || 'Screen'} ratio={m.ratio || (it.src ? undefined : '9 / 20')} />
            {(it.label || it.caption) && (
              <figcaption style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
                {it.label && <span style={metaStyle}>{it.label}</span>}
                {it.caption && <span style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--text-secondary)' }}>{it.caption}</span>}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    );
  }
  return (
    <article style={article}>
      <SplitHead number={b.number} eyebrow={b.eyebrow} tag={b.tag} title={b.title} paragraphs={b.paragraphs} />
      <div style={{ marginTop: 32 }}>{media}</div>
      {chain}
    </article>
  );
}

function Block({ b }) {
  switch (b.type) {
    case 'text':
      return (
        <div>
          {b.title && <h3 style={{ fontSize: 22, lineHeight: 1.2, fontWeight: 600, letterSpacing: 'var(--tracking-snug)', margin: '0 0 12px' }}>{b.title}</h3>}
          <Paragraphs items={b.paragraphs} />
        </div>
      );

    case 'aside':
      return (
        <aside aria-label={b.tag || b.title} style={{ display: 'flex', flexWrap: 'wrap', gap: '16px 48px', alignItems: 'baseline', padding: '28px 32px', border: '1px dashed var(--border-default)', borderRadius: 'var(--radius)' }}>
          <div style={{ flex: '1 1 260px', minWidth: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 10 }}>
            {b.tag && <Tag tone="subtle" size="sm">{b.tag}</Tag>}
            <span style={{ fontSize: 18, fontWeight: 600, letterSpacing: 'var(--tracking-snug)' }}>{b.title}</span>
          </div>
          <p style={{ ...bodyStyle, flex: '999 1 480px', minWidth: 0, fontSize: 15, lineHeight: 1.6 }}>{b.body}</p>
        </aside>
      );

    case 'outcomes':
      return (
        <div>
          {b.caption && <div style={{ ...metaStyle, marginBottom: 16 }}>{b.caption}</div>}
          <OutcomeStrip items={b.items} label={b.label || 'Outcomes'} />
        </div>
      );

    case 'showcase':
      return (
        <div aria-label={b.eyebrow || 'Final design'}>
          {b.eyebrow && <div style={{ ...eyebrowStyle, marginBottom: 20 }}>{b.eyebrow}</div>}
          {b.title && <h3 style={{ fontSize: 30, lineHeight: 1.1, fontWeight: 600, letterSpacing: 'var(--tracking-tight)', margin: 0 }}>{b.title}</h3>}
          {b.lead && <p style={{ ...bodyStyle, marginTop: 16 }}>{b.lead}</p>}
          <div className="case-showcase" style={{ marginTop: 32, background: 'var(--surface-ink)', borderRadius: 'var(--radius)', padding: '64px 48px 48px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 40 }}>
            {b.items.map((it, i) => (
              <figure key={i} style={{ flex: '0 1 260px', minWidth: 200, margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <Shot src={it.src} alt={it.alt} label={it.label || 'Screen'} ratio={b.ratio || '9 / 20'} onInk />
                <figcaption style={{ display: 'flex', gap: 10, ...mono, fontSize: 11, letterSpacing: '0.1em' }}>
                  <span style={{ color: 'var(--text-inverse-muted)' }}>{pad(i + 1)}</span>
                  <span style={{ color: 'var(--text-on-ink)' }}>{it.label}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      );

    case 'images': {
      const cols = b.layout === 'duo' ? 2 : b.layout === 'full' ? 1 : 3;
      return (
        <div className="case-images" style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gap: 16 }}>
          {b.items.map((it, i) => (
            <figure key={i} style={{ margin: 0 }}>
              <Shot src={it.src} alt={it.alt} label={it.label || 'Photo'} ratio={b.ratio || (cols === 1 ? '16 / 9' : '4 / 5')} style={{ border: 0 }} />
              <Caption>{it.caption}</Caption>
            </figure>
          ))}
        </div>
      );
    }

    case 'cards':
      return <NumberedCards items={b.items} minWidth={b.minWidth || 300} label={b.label} />;

    case 'methods':
      return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
          {b.items.map((it, i) => (
            <article key={i} style={{ flex: '1 1 360px', minWidth: 0, padding: 32, border: '1px solid var(--border-hairline)', borderRadius: 'var(--radius)', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <span style={metaStyle}>{it.eyebrow || `Method ${pad(i + 1)}`}</span>
              <h3 style={{ fontSize: 22, lineHeight: 1.2, fontWeight: 600, letterSpacing: 'var(--tracking-snug)', margin: '4px 0 0' }}>{it.title}</h3>
              <p style={{ ...bodyStyle, fontSize: 15, lineHeight: 1.6 }}>{it.body}</p>
              {it.role && <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: '1px solid var(--border-hairline)', ...mono, fontSize: 11, letterSpacing: '0.08em', color: 'var(--text-secondary)' }}>My role · {it.role}</div>}
            </article>
          ))}
        </div>
      );

    case 'finding':
      return (
        <figure className="case-finding" style={{ margin: 0, padding: '56px 48px', background: 'var(--surface-ink)', borderRadius: 'var(--radius)', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {b.eyebrow && <span style={{ ...mono, fontSize: 11, letterSpacing: 'var(--tracking-caps)', color: 'var(--text-inverse-muted)' }}>{b.eyebrow}</span>}
          <blockquote style={{ margin: 0, fontSize: 'clamp(24px, 3vw, 34px)', lineHeight: 1.15, fontWeight: 600, letterSpacing: 'var(--tracking-tight)', color: 'var(--text-on-ink)' }}>{b.quote}</blockquote>
          {b.detail && <figcaption style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--text-inverse-muted)' }}>{b.detail}</figcaption>}
        </figure>
      );

    case 'reframe':
      return <ReframeQuote source={b.source} quote={b.quote} soWhat={b.soWhat} themes={b.themes} />;

    case 'voices':
      return (
        <section aria-label={b.title || 'In their own words'}>
          <h3 style={{ ...eyebrowStyle, margin: '0 0 20px' }}>{b.title || 'In their own words'}</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
            {b.items.map((it, i) => (
              <figure key={i} style={{ flex: '1 1 300px', minWidth: 0, margin: 0, padding: 32, border: '1px solid var(--border-hairline)', borderRadius: 'var(--radius)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 32 }}>
                <blockquote style={{ margin: 0, fontSize: 20, lineHeight: 1.4, fontWeight: 500, letterSpacing: 'var(--tracking-snug)' }}>“{it.quote}”</blockquote>
                <figcaption style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <Avatar name={it.name} size="lg" />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <span style={{ fontSize: 16, fontWeight: 600 }}>{it.name}</span>
                    {it.meta && <span style={metaStyle}>{it.meta}</span>}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      );

    case 'chain':
      return <ReasoningChain steps={b.steps} label={b.label} />;

    case 'matrix': {
      const last = b.columns.length - 1;
      const cell = { padding: '16px 20px', borderBottom: '1px solid var(--border-hairline)', borderLeft: '1px solid var(--border-hairline)', verticalAlign: 'top' };
      return (
        <div>
          <div style={{ border: '1px solid var(--border-hairline)', borderRadius: 'var(--radius)', overflowX: 'auto' }}>
            <table style={{ width: '100%', minWidth: 760, borderCollapse: 'collapse', fontSize: 15, lineHeight: 1.5 }}>
              <thead>
                <tr style={{ background: 'var(--surface-subtle)' }}>
                  <th scope="col" style={{ textAlign: 'left', padding: '16px 20px', ...mono, fontSize: 11, fontWeight: 500, letterSpacing: 'var(--tracking-caps)', borderBottom: '1px solid var(--border-hairline)' }}>Capability</th>
                  {b.columns.map((c, i) => (
                    <th key={i} scope="col" style={{ textAlign: 'left', padding: '16px 20px', ...mono, fontSize: 11, fontWeight: 500, letterSpacing: 'var(--tracking-caps)',
                      color: i === last ? 'var(--text-on-ink)' : 'var(--text-secondary)', background: i === last ? 'var(--surface-ink)' : undefined,
                      borderBottom: '1px solid var(--border-hairline)', borderLeft: '1px solid var(--border-hairline)' }}>{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {b.rows.map((r, ri) => (
                  <tr key={ri}>
                    <th scope="row" style={{ textAlign: 'left', fontWeight: 500, padding: '16px 20px', borderBottom: ri < b.rows.length - 1 ? '1px solid var(--border-hairline)' : 0 }}>{r.label}</th>
                    {r.cells.map((c, ci) => (
                      <td key={ci} style={{ ...cell, color: ci === last ? 'var(--text-primary)' : 'var(--text-muted)', borderBottom: ri < b.rows.length - 1 ? cell.borderBottom : 0 }}>{c}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {b.takeaway && <Callout label="Takeaway" style={{ marginTop: 24 }}>{b.takeaway}</Callout>}
        </div>
      );
    }

    case 'process':
      return (
        <div>
          {b.title && <h3 style={{ fontSize: 22, lineHeight: 1.2, fontWeight: 600, letterSpacing: 'var(--tracking-snug)', margin: 0 }}>{b.title}</h3>}
          {b.intro && <p style={{ ...bodyStyle, marginTop: 12 }}>{b.intro}</p>}
          <ol aria-label="Process steps" style={{ listStyle: 'none', margin: '32px 0 0', padding: 0 }}>
            {b.steps.map((s, i) => {
              const lastStep = i === b.steps.length - 1;
              return (
                <li key={i} style={{ display: 'flex', gap: 24 }}>
                  <div aria-hidden="true" style={{ position: 'relative', flex: '0 0 15px' }}>
                    <span style={{ position: 'absolute', left: 0, top: 0, width: 15, height: 15, borderRadius: 999, background: 'var(--text-primary)' }} />
                    {!lastStep && <span style={{ position: 'absolute', left: 7, top: 23, bottom: 8, width: 1, background: 'var(--border-default)' }} />}
                  </div>
                  <div style={{ flex: '1 1 auto', minWidth: 0, paddingBottom: lastStep ? 0 : 32, marginBottom: lastStep ? 0 : 32, borderBottom: lastStep ? 0 : '1px solid var(--border-hairline)' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginTop: -7 }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.1em', color: 'var(--text-muted)' }}>{s.number || pad(i + 1)}</span>
                      <h4 style={{ fontSize: 'clamp(20px, 2.4vw, 26px)', lineHeight: 1.15, fontWeight: 600, letterSpacing: 'var(--tracking-tight)', margin: 0 }}>{s.title}</h4>
                    </div>
                    {s.body && <p style={{ ...bodyStyle, marginTop: 12 }}>{s.body}</p>}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      );

    case 'flow':
      return <FlowDiagram nodes={b.nodes} edges={b.edges} paths={b.paths} defaultPath={b.defaultPath} width={b.width} height={b.height} title={b.title} />;

    case 'panels':
      return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
          {b.items.map((it, i) => (
            <div key={i} style={{ flex: '1 1 300px', minWidth: 0, padding: 32, border: '1px solid var(--border-hairline)', borderRadius: 'var(--radius)', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {it.eyebrow && <span style={{ ...mono, fontSize: 10, letterSpacing: '0.1em', color: 'var(--text-muted)' }}>{it.eyebrow}</span>}
              <h3 style={{ fontSize: 20, lineHeight: 1.25, fontWeight: 600, letterSpacing: 'var(--tracking-snug)', margin: 0 }}>{it.title}</h3>
              {it.body && <p style={{ ...bodyStyle, fontSize: 15, lineHeight: 1.6 }}>{it.body}</p>}
              {it.list && (
                <ul style={{ listStyle: 'none', margin: '4px 0 0', padding: 0, display: 'flex', flexDirection: 'column', gap: 8, fontSize: 15, lineHeight: 1.45, color: 'var(--text-secondary)' }}>
                  {it.list.map((l, li) => (
                    <li key={li} style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
                      <span aria-hidden="true" style={{ flex: '0 0 7px', width: 7, height: 7, borderRadius: 999, transform: 'translateY(-1px)',
                        background: l.tone === 'success' ? 'var(--green-600)' : l.tone === 'ink' ? 'var(--text-primary)' : 'var(--gray-400)' }} />
                      {l.text}
                    </li>
                  ))}
                </ul>
              )}
              {it.chips && <StateList states={it.chips} countLabel={null} />}
            </div>
          ))}
        </div>
      );

    case 'board':
      return (
        <figure style={{ margin: 0 }}>
          {(b.eyebrow || b.title) && (
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '8px 24px', marginBottom: 16 }}>
              {b.title && <span style={eyebrowStyle}>{b.title}</span>}
              {b.eyebrow && <span style={metaStyle}>{b.eyebrow}</span>}
            </div>
          )}
          <div style={{ border: '1px solid var(--border-hairline)', borderRadius: 'var(--radius)', overflowX: 'auto', background: 'var(--surface-subtle)' }}>
            {b.src
              ? <img src={b.src} alt={b.alt || ''} loading="lazy" decoding="async" style={{ display: 'block', width: '100%', minWidth: b.minWidth || 900, height: 'auto' }} />
              : <Shot label={b.label || 'Full flow board'} ratio="16 / 6" style={{ border: 0 }} />}
          </div>
          <Caption>{b.caption}</Caption>
        </figure>
      );

    case 'decision':
      return <Decision b={b} />;

    case 'callout':
      return <Callout label={b.label}>{b.body}</Callout>;

    case 'stats':
      return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
          {b.items.map((it, i) => (
            <Card key={i} tone="ink"><StatCard value={it.value} label={it.label} onDark /></Card>
          ))}
        </div>
      );

    case 'status':
      return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px 16px', alignItems: 'center' }}>
          <Badge status={b.status}>{b.label}</Badge>
          {b.note && <p style={{ ...bodyStyle, flex: '1 1 400px' }}>{b.note}</p>}
        </div>
      );

    case 'pullquote':
      return (
        <figure style={{ margin: '24px 0 0', padding: '48px 0', borderTop: '1px solid var(--text-primary)', borderBottom: '1px solid var(--border-hairline)' }}>
          <blockquote style={{ margin: 0, fontSize: 'clamp(28px, 3.6vw, 40px)', lineHeight: 1.12, fontWeight: 600, letterSpacing: 'var(--tracking-tight)' }}>{b.text}</blockquote>
        </figure>
      );

    default:
      return null;
  }
}

/* Space above a block depends on what it follows: decisions are separated
   by their own hairline, everything else by a steady rhythm. */
function gapBefore(b, prev) {
  if (!prev) return 40;
  if (b.type === 'decision') return prev.type === 'decision' ? 48 : 56;
  if (['showcase', 'voices', 'process', 'pullquote'].includes(b.type)) return 72;
  if (b.type === 'chain' || b.type === 'reframe') return 48;
  if (b.type === 'outcomes' && prev.type === 'outcomes') return 32;
  return 40;
}

/* ── Reading progress ────────────────────────────────────────────────── */

function countWords(value) {
  if (typeof value === 'string') return value.trim().split(/\s+/).length;
  if (Array.isArray(value)) return value.reduce((n, v) => n + countWords(v), 0);
  if (value && typeof value === 'object') {
    // Skip data that isn't read as prose (flow coordinates, image paths).
    return Object.entries(value).reduce((n, [k, v]) => (['src', 'x', 'y', 'w', 'h', 'nodes', 'edges', 'id', 'kind', 'type'].includes(k) ? n : n + countWords(v)), 0);
  }
  return 0;
}

function useReading(ids, totalMinutes) {
  const [state, setState] = useState({ active: ids[0], sectionProgress: 0, progress: 0 });
  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const anchor = window.innerHeight * 0.35;
      let active = ids[0];
      let sectionProgress = 0;
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (r.top <= anchor) {
          active = id;
          sectionProgress = Math.max(0, Math.min(100, ((anchor - r.top) / Math.max(1, r.height)) * 100));
        }
      });
      const body = document.getElementById('case-body');
      let progress = 0;
      if (body) {
        const r = body.getBoundingClientRect();
        const travel = Math.max(1, r.height - window.innerHeight * 0.65);
        progress = Math.max(0, Math.min(100, ((anchor - r.top) / travel) * 100));
      }
      setState((s) => (s.active === active && Math.round(s.sectionProgress) === Math.round(sectionProgress) && Math.round(s.progress) === Math.round(progress)
        ? s : { active, sectionProgress, progress }));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(measure); };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if (frame) cancelAnimationFrame(frame); };
  }, [ids.join('|')]);
  const minutesLeft = Math.max(0, Math.ceil(totalMinutes * (1 - state.progress / 100)));
  return { ...state, minutesLeft };
}

/* ── Page ─────────────────────────────────────────────────────────────── */

const container = { maxWidth: 'var(--container)', margin: '0 auto', padding: '0 48px' };

export default function CaseTemplateScreen({ project, prev, next }) {
  const p = project;
  const sections = p.sections || [];
  const ids = useMemo(() => sections.map((s) => s.id), [sections]);
  const totalMinutes = useMemo(() => Math.max(1, Math.round(countWords([p.summary, p.caseDetails, sections]) / WORDS_PER_MINUTE)), [p]);
  const reading = useReading(ids, totalMinutes);
  const navSections = sections.map((s, i) => ({ id: s.id, label: s.eyebrow, number: pad(i + 1) }));
  const activeIndex = Math.max(0, ids.indexOf(reading.active));

  // The phone reading bar sticks right under the site's sticky top bar.
  useEffect(() => {
    const bar = document.querySelector('.topbar');
    const set = () => { if (bar) document.documentElement.style.setProperty('--case-topbar', `${bar.offsetHeight}px`); };
    set();
    window.addEventListener('resize', set);
    return () => window.removeEventListener('resize', set);
  }, []);

  const goTo = (id, e) => {
    const el = document.getElementById(id);
    if (!el) return;
    e?.preventDefault();
    const top = el.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    history.replaceState(null, '', `#${id}`);
  };

  return (
    <div className="page-enter case-template">
      <style>{`
        .case-template .case-nav-rail { position: fixed; left: 24px; top: 50%; transform: translateY(-50%); z-index: 40; }
        .case-template .case-readingbar { display: none; }
        @media (min-width: 900px) and (max-width: 1340px) {
          .case-template .case-shell { padding-left: 104px !important; }
        }
        @media (max-width: 899px) {
          .case-template .case-nav-rail { display: none; }
          .case-template .case-readingbar { display: block; position: sticky; top: var(--case-topbar, 57px); z-index: 30; }
        }
        @media (max-width: 640px) {
          .case-template .case-shell { padding-left: 24px !important; padding-right: 24px !important; }
          .case-template .case-showcase, .case-template .case-finding { padding: 40px 24px !important; }
          .case-template .case-images { grid-template-columns: 1fr !important; }
          .case-template .case-showcase figure { flex: 0 1 220px !important; min-width: 0 !important; }
          .case-template .case-gallery { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; gap: 24px 16px !important; }
        }
      `}</style>

      <div className="case-readingbar">
        <ReadingBar sticky={false} section={sections[activeIndex] ? { number: pad(activeIndex + 1), label: sections[activeIndex].eyebrow } : undefined}
          progress={reading.progress} minutesLeft={reading.minutesLeft} />
      </div>

      <div className="case-nav-rail">
        <SectionNav sections={navSections} activeId={reading.active} sectionProgress={reading.sectionProgress}
          progress={reading.progress} minutesLeft={reading.minutesLeft} onNavigate={goTo} />
      </div>

      <section className="case-shell" style={{ ...container, paddingTop: 40 }}>
        <Breadcrumb
          items={[{ label: 'Work' }, { label: p.discipline }, { label: p.title }]}
          onNavigate={(_, i) => { if (i < 2) window.location.href = '/work'; }}
        />
      </section>

      <section className="case-shell" style={{ ...container, paddingTop: 40, paddingBottom: 48 }}>
        <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
          {p.tags.map((t) => <Tag key={t}>{t}</Tag>)}
          <Badge status={p.status}>{p.statusLabel}</Badge>
        </div>
        <h1 style={{ fontSize: 'clamp(36px, 5.5vw, 64px)', lineHeight: 1, letterSpacing: '-0.03em', fontWeight: 700, margin: 0 }}>{p.title}</h1>
        <p style={{ fontSize: 18, lineHeight: 1.55, color: 'var(--text-secondary)', margin: '24px 0 0' }}>{p.summary}</p>
      </section>

      <section className="case-shell" style={container}>
        {p.coverImage
          ? <img src={p.coverImage} alt="" loading="eager" style={{ display: 'block', width: '100%', aspectRatio: '16 / 8', objectFit: 'cover', border: '1px solid var(--border-hairline)' }} />
          : <Shot label="Cover image · 16:8" ratio="16 / 8" style={{ borderRadius: 0 }} />}
        {p.caseDetails && <CaseDetails facts={p.caseDetails.facts} details={p.caseDetails.details} />}
      </section>

      <div id="case-body" className="case-shell" style={{ ...container, paddingTop: 96, paddingBottom: 80 }}>
        {sections.map((s, si) => (
          <section key={s.id} id={s.id} aria-label={s.eyebrow} style={{ marginBottom: si < sections.length - 1 ? 112 : 0, scrollMarginTop: 96 }}>
            <SectionHeader number={pad(si + 1)} eyebrow={s.eyebrow} title={s.title} lead={s.lead} />
            {(s.blocks || []).map((b, bi) => (
              <div key={bi} style={{ marginTop: gapBefore(b, s.blocks[bi - 1]) }}><Block b={b} /></div>
            ))}
          </section>
        ))}

        <CaseNav
          style={{ marginTop: 72 }}
          prev={prev ? { title: prev.title, href: `/work/${prev.slug}` } : undefined}
          next={next ? { title: next.title, href: `/work/${next.slug}` } : undefined}
        />
      </div>
    </div>
  );
}
