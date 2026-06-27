import { useState, useEffect, useRef } from 'react';
import { Tag } from '../ds/components/core/Tag.jsx';
import { Badge } from '../ds/components/core/Badge.jsx';
import { Button } from '../ds/components/core/Button.jsx';
import { Card } from '../ds/components/data/Card.jsx';
import { StatCard } from '../ds/components/data/StatCard.jsx';
import { Breadcrumb } from '../ds/components/navigation/Breadcrumb.jsx';
import { Stepper } from '../ds/components/navigation/Stepper.jsx';
import { ImagePlaceholder, GridLines } from './Chrome.jsx';

const SECTIONS = [
  { id: 'overview',  label: 'Overview',  n: '01' },
  { id: 'challenge', label: 'Challenge', n: '02' },
  { id: 'process',   label: 'Process',   n: '03' },
  { id: 'outcome',   label: 'Outcome',   n: '04' },
];

function NotionNav({ active }) {
  const [open, setOpen] = useState(false);

  const scrollTo = (id) => {
    const el = document.getElementById(`section-${id}`);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 88;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <div
      className="case-sidenav"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      style={{ position: 'fixed', left: 24, top: '50%', transform: 'translateY(-50%)', zIndex: 40 }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, opacity: open ? 0 : 1, transition: 'opacity 0.15s ease', pointerEvents: 'none' }}>
        {SECTIONS.map((s) => (
          <div key={s.id} style={{ width: 3, height: 20, borderRadius: 2, background: active === s.id ? 'var(--accent)' : 'var(--border-hairline)', transition: 'background 0.2s' }} />
        ))}
      </div>
      <div style={{
        position: 'absolute', top: '50%', left: 0, transform: 'translateY(-50%)',
        overflow: 'hidden', width: 160,
        opacity: open ? 1 : 0,
        clipPath: open ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)',
        transition: 'opacity 0.2s ease, clip-path 0.22s ease',
        pointerEvents: open ? 'auto' : 'none',
        background: 'var(--surface-page)', border: '1px solid var(--border-hairline)', boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      }}>
        <div style={{ width: 148 }}>
          {SECTIONS.map((s) => (
            <div key={s.id} onClick={() => scrollTo(s.id)} style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '7px 10px', cursor: 'pointer',
              borderLeft: `2px solid ${active === s.id ? 'var(--accent)' : 'transparent'}`,
              background: active === s.id ? 'var(--surface-subtle)' : 'transparent', transition: 'background 0.15s',
            }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--text-faint)', width: 18, flexShrink: 0 }}>{s.n}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: active === s.id ? 'var(--text-primary)' : 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SectionHead({ n, title }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: 16, alignItems: 'baseline', marginBottom: 16 }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', color: 'var(--text-faint)' }}>{n}</span>
      <h2 style={{ fontSize: 24, fontWeight: 600, letterSpacing: '-0.02em', margin: 0 }}>{title}</h2>
    </div>
  );
}

// Lightbox
function Lightbox({ images, index, onClose, onPrev, onNext }) {
  const img = images[index];

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    }
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [index]);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.92)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24,
        animation: 'lb-in 0.18s ease',
      }}
    >
      <style>{`@keyframes lb-in { from { opacity: 0 } to { opacity: 1 } }`}</style>

      {/* Prev */}
      {images.length > 1 && (
        <button onClick={e => { e.stopPropagation(); onPrev(); }} style={{
          position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)',
          background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
          color: '#fff', width: 44, height: 44, borderRadius: '50%', cursor: 'pointer',
          fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>←</button>
      )}

      {/* Image */}
      <div onClick={e => e.stopPropagation()} style={{ maxWidth: '90vw', maxHeight: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <img
          src={img.src}
          alt={img.alt || ''}
          style={{ display: 'block', maxWidth: '100%', maxHeight: '82vh', objectFit: 'contain', borderRadius: 2 }}
        />
        {(img.alt || img.caption) && (
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>
            {img.caption || img.alt}
          </div>
        )}
        {images.length > 1 && (
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.25)' }}>
            {index + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Next */}
      {images.length > 1 && (
        <button onClick={e => { e.stopPropagation(); onNext(); }} style={{
          position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)',
          background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
          color: '#fff', width: 44, height: 44, borderRadius: '50%', cursor: 'pointer',
          fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>→</button>
      )}

      {/* Close */}
      <button onClick={onClose} style={{
        position: 'absolute', top: 20, right: 20,
        background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
        color: '#fff', width: 36, height: 36, borderRadius: '50%', cursor: 'pointer',
        fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>×</button>
    </div>
  );
}

// Scroll-triggered entrance animation
function AnimatedImage({ src, alt, caption, layout = 'full', delay = 0, onClick }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { rootMargin: '0px 0px -80px 0px', threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const wrapperStyle = {
    full:          { width: '100%' },
    offset:        { width: '88%', marginLeft: 'auto' },
    'offset-left': { width: '88%', marginRight: 'auto' },
    wide:          { width: '100%' },
    duo:           { width: '100%' },
  }[layout] || { width: '100%' };

  return (
    <div ref={ref} style={{
      ...wrapperStyle,
      marginBottom: 40,
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(28px)',
      transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      cursor: 'zoom-in',
    }} onClick={onClick}>
      <img
        src={src}
        alt={alt || ''}
        style={{ display: 'block', width: '100%', height: 'auto', objectFit: 'cover' }}
      />
      {caption && (
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-faint)', marginTop: 10 }}>{caption}</div>
      )}
    </div>
  );
}

function AnimatedDuo({ images, onClickImage }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { rootMargin: '0px 0px -80px 0px', threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 40 }}>
      {images.map((img, i) => (
        <div key={i} onClick={() => onClickImage?.(img)} style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(28px)',
          transition: `opacity 0.7s ease ${i * 120}ms, transform 0.7s ease ${i * 120}ms`,
          cursor: 'zoom-in',
        }}>
          <img src={img.src} alt={img.alt || ''} loading="lazy" decoding="async" style={{ display: 'block', width: '100%', height: 'auto', objectFit: 'cover' }} />
          {img.caption && (
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-faint)', marginTop: 10 }}>{img.caption}</div>
          )}
        </div>
      ))}
    </div>
  );
}

function AnimatedTrio({ images, onClickImage }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { rootMargin: '0px 0px -80px 0px', threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 40 }}>
      {images.map((img, i) => (
        <div key={i} onClick={() => onClickImage?.(img)} style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(28px)',
          transition: `opacity 0.7s ease ${i * 100}ms, transform 0.7s ease ${i * 100}ms`,
          cursor: 'zoom-in',
        }}>
          <img src={img.src} alt={img.alt || ''} loading="lazy" decoding="async" style={{ display: 'block', width: '100%', height: 'auto', objectFit: 'cover' }} />
          {img.caption && (
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-faint)', marginTop: 10 }}>{img.caption}</div>
          )}
        </div>
      ))}
    </div>
  );
}

function BodyEmbeds({ embeds, after }) {
  if (!embeds) return null;
  const matches = embeds.filter((e) => e.after === after);
  if (!matches.length) return null;
  return (
    <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 24 }}>
      {matches.map((e, i) => {
        const mobile = e.layout === 'mobile';
        const [rw, rh] = (e.ratio || '16/9').split('/').map(Number);
        const paddingBottom = `${(rh / rw) * 100}%`;
        return (
          <div key={i}>
            {e.label && (
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: 10 }}>{e.label}</div>
            )}
            <div style={mobile
              ? { maxWidth: 420, margin: '0 auto', border: '1px solid var(--border-hairline)', borderRadius: 8, overflow: 'hidden' }
              : { position: 'relative', width: '100%', paddingBottom, border: '1px solid var(--border-hairline)', borderRadius: 4, overflow: 'hidden' }
            }>
              <iframe
                src={e.src}
                allowFullScreen
                style={mobile
                  ? { display: 'block', width: '100%', height: 780, border: 'none' }
                  : { position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }
                }
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function BodyQuotes({ quotes, after }) {
  if (!quotes) return null;
  const matches = quotes.filter((q) => q.after === after);
  if (!matches.length) return null;
  return (
    <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 16 }}>
      {matches.map((q, i) => (
        <div key={i} style={{
          borderLeft: '2px solid var(--border-default)',
          paddingLeft: 20,
          paddingTop: 4,
          paddingBottom: 4,
        }}>
          <p style={{ fontSize: 15, lineHeight: 1.6, fontStyle: 'italic', color: 'var(--text-primary)', margin: '0 0 8px', maxWidth: '52ch' }}>"{q.text}"</p>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-faint)' }}>{q.author}</span>
        </div>
      ))}
    </div>
  );
}

function BodyImages({ images, after, allImages, openLightbox }) {
  if (!images) return null;
  const matches = images.filter((img) => img.after === after);
  if (!matches.length) return null;

  // Group consecutive duo/trio images
  const grouped = [];
  let i = 0;
  while (i < matches.length) {
    if (matches[i].layout === 'trio' && matches[i + 1]?.layout === 'trio' && matches[i + 2]?.layout === 'trio') {
      grouped.push({ type: 'trio', items: [matches[i], matches[i + 1], matches[i + 2]] });
      i += 3;
    } else if (matches[i].layout === 'duo' && matches[i + 1]?.layout === 'duo') {
      grouped.push({ type: 'duo', items: [matches[i], matches[i + 1]] });
      i += 2;
    } else {
      grouped.push({ type: 'single', item: matches[i] });
      i++;
    }
  }

  return (
    <div style={{ marginTop: 40 }}>
      {grouped.map((g, idx) =>
        g.type === 'trio'
          ? <AnimatedTrio key={idx} images={g.items} onClickImage={(img) => openLightbox?.(allImages?.indexOf(img) ?? -1)} />
          : g.type === 'duo'
          ? <AnimatedDuo key={idx} images={g.items} onClickImage={(img) => openLightbox?.(allImages?.indexOf(img) ?? -1)} />
          : <AnimatedImage key={idx} {...g.item} delay={0} onClick={() => openLightbox?.(allImages?.indexOf(g.item) ?? -1)} />
      )}
    </div>
  );
}

function CaseNav({ prev, next }) {
  return (
    <div style={{
      borderTop: '1px solid var(--border-hairline)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'stretch',
    }}>
      {prev ? (
        <a href={`/work/${prev.slug}`} style={{
          display: 'flex', alignItems: 'center', gap: 12, padding: '28px 0',
          textDecoration: 'none', color: 'var(--text-secondary)',
          transition: 'color 0.18s ease',
        }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
        >
          <span style={{ fontSize: 18, lineHeight: 1 }}>‹</span>
          <span style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em' }}>{prev.title}</span>
        </a>
      ) : <div />}
      {next ? (
        <a href={`/work/${next.slug}`} style={{
          display: 'flex', alignItems: 'center', gap: 12, padding: '28px 0',
          textDecoration: 'none', color: 'var(--text-secondary)',
          transition: 'color 0.18s ease',
        }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
        >
          <span style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em' }}>{next.title}</span>
          <span style={{ fontSize: 18, lineHeight: 1 }}>›</span>
        </a>
      ) : <div />}
    </div>
  );
}

export default function CaseStudyScreenAlt({ project, prev, next }) {
  const p = project;
  const [activeSection, setActiveSection] = useState('overview');
  const [lbIndex, setLbIndex] = useState(-1);
  const allImages = p.bodyImages || [];
  const openLightbox = (idx) => { if (idx >= 0) setLbIndex(idx); };

  useEffect(() => {
    const observers = SECTIONS.map((s) => {
      const el = document.getElementById(`section-${s.id}`);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(s.id); },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <>
      {lbIndex >= 0 && (
        <Lightbox
          images={allImages}
          index={lbIndex}
          onClose={() => setLbIndex(-1)}
          onPrev={() => setLbIndex((lbIndex - 1 + allImages.length) % allImages.length)}
          onNext={() => setLbIndex((lbIndex + 1) % allImages.length)}
        />
      )}
      <div className="page-enter">
      <NotionNav active={activeSection} />

      <section className="section-pad" style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '40px 48px 0' }}>
        <Breadcrumb
          items={[{ label: 'Work' }, { label: p.discipline }, { label: p.title }]}
          onNavigate={(_, i) => { if (i < 2) window.location.href = '/work'; }}
        />
      </section>

      <section className="section-pad" style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '40px 48px 48px' }}>
        <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
          {p.tags.map((t) => <Tag key={t}>{t}</Tag>)}
          <Badge status={p.status}>{p.statusLabel}</Badge>
        </div>
        <h1 style={{ fontSize: 'clamp(36px,5.5vw,64px)', lineHeight: 1, letterSpacing: '-0.03em', fontWeight: 700, margin: 0, maxWidth: '18ch' }}>{p.title}</h1>
        <p style={{ fontSize: 18, lineHeight: 1.55, color: 'var(--text-secondary)', maxWidth: '56ch', margin: '24px 0 0' }}>{p.summary}</p>
      </section>

      {/* Hero image */}
      <section className="section-pad" style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '0 48px 0' }}>
        <ImagePlaceholder ratio="16/8" label="[ Hero — case study cover ]" src={p.coverImage} loading="eager" style={{ border: '1px solid var(--border-hairline)' }} />
      </section>

      {/* Project meta strip */}
      <section className="section-pad" style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '0 48px' }}>
        <div className="meta-strip" style={{ display: 'flex', borderBottom: '1px solid var(--border-hairline)' }}>
          {[
            { label: 'Role', value: p.role || 'Lead Designer' },
            { label: 'Year', value: p.year },
            { label: 'Team', value: p.team ? `${p.team} people` : '—' },
            ...(p.country ? [{ label: 'Country', value: p.country }] : []),
          ].map((m, i, arr) => (
            <div key={m.label} style={{ flex: 1, paddingTop: 20, paddingBottom: 20, paddingLeft: i > 0 ? 24 : 0, paddingRight: i < arr.length - 1 ? 24 : 0, borderRight: i < arr.length - 1 ? '1px solid var(--border-hairline)' : 'none' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: 6 }}>{m.label}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, letterSpacing: '0.04em', color: 'var(--text-primary)' }}>{m.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Body content */}
      <section className="section-pad" style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '64px 48px 80px', position: 'relative', overflow: 'hidden' }}>
        <GridLines />
        <div style={{ maxWidth: 940, margin: '0 auto' }}>

          <div id="section-overview" style={{ marginBottom: 72, scrollMarginTop: 100 }}>
            <SectionHead n="01" title="Overview" />
            <p style={{ fontSize: 16, lineHeight: 1.65, color: 'var(--text-secondary)', marginLeft: 76 }}>{p.overview}</p>
            <BodyImages images={p.bodyImages} after="overview" allImages={allImages} openLightbox={openLightbox} />
          </div>

          <div id="section-challenge" style={{ marginBottom: 72, scrollMarginTop: 100 }}>
            <SectionHead n="02" title="Challenge" />
            <p style={{ fontSize: 16, lineHeight: 1.65, color: 'var(--text-secondary)', marginLeft: 76 }}>{p.challenge}</p>
            <BodyImages images={p.bodyImages} after="challenge" allImages={allImages} openLightbox={openLightbox} />
            <BodyQuotes quotes={p.quotes} after="challenge" />
          </div>

          <div id="section-process" style={{ marginBottom: 72, scrollMarginTop: 100 }}>
            <SectionHead n="03" title="Process" />
            <Stepper steps={p.steps || ['Brief', 'Design', 'Ship']} current={(p.steps || []).length - 1} style={{ maxWidth: '100%', marginLeft: 76 }} />
            <BodyImages images={p.bodyImages} after="process" allImages={allImages} openLightbox={openLightbox} />
            <BodyEmbeds embeds={p.embeds} after="process" />
          </div>

          {p.outcomes && (
            <div id="section-outcome" style={{ marginBottom: 56, scrollMarginTop: 100 }}>
              <SectionHead n="04" title="Outcome" />
              <div style={{ marginLeft: 76, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                {p.outcomes.map((o) => (
                  <Card key={o.label} tone="ink"><StatCard value={o.value} label={o.label} onDark /></Card>
                ))}
              </div>
              <BodyImages images={p.bodyImages} after="outcome" allImages={allImages} openLightbox={openLightbox} />
              <BodyEmbeds embeds={p.embeds} after="outcome" />
            </div>
          )}

        </div>
      </section>

      <section className="section-pad" style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '0 48px' }}>
        <CaseNav prev={prev} next={next} />
      </section>
    </div>
    </>
  );
}
