import { useState, useEffect, useRef } from 'react';
import { Tag } from '../ds/components/core/Tag.jsx';
import { Badge } from '../ds/components/core/Badge.jsx';
import { Button } from '../ds/components/core/Button.jsx';
import { Card } from '../ds/components/data/Card.jsx';
import { StatCard } from '../ds/components/data/StatCard.jsx';
import { Breadcrumb } from '../ds/components/navigation/Breadcrumb.jsx';
import { Stepper } from '../ds/components/navigation/Stepper.jsx';
import { ImagePlaceholder } from './Chrome.jsx';

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

// Scroll-triggered entrance animation
function AnimatedImage({ src, alt, caption, layout = 'full', delay = 0 }) {
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
    full:       { width: '100%' },
    offset:     { width: '88%', marginLeft: 'auto' },
    'offset-left': { width: '88%', marginRight: 'auto' },
    wide:       { width: '110%', marginLeft: '-5%' },
    duo:        { width: '100%' },
  }[layout] || { width: '100%' };

  return (
    <div ref={ref} style={{
      ...wrapperStyle,
      marginBottom: 40,
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(28px)',
      transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
    }}>
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

function AnimatedDuo({ images }) {
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
        <div key={i} style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(28px)',
          transition: `opacity 0.7s ease ${i * 120}ms, transform 0.7s ease ${i * 120}ms`,
        }}>
          <img src={img.src} alt={img.alt || ''} style={{ display: 'block', width: '100%', height: 'auto', objectFit: 'cover' }} />
          {img.caption && (
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-faint)', marginTop: 10 }}>{img.caption}</div>
          )}
        </div>
      ))}
    </div>
  );
}

function BodyImages({ images, after }) {
  if (!images) return null;
  const matches = images.filter((img) => img.after === after);
  if (!matches.length) return null;

  // Group consecutive duo images
  const grouped = [];
  let i = 0;
  while (i < matches.length) {
    if (matches[i].layout === 'duo' && matches[i + 1]?.layout === 'duo') {
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
        g.type === 'duo'
          ? <AnimatedDuo key={idx} images={g.items} />
          : <AnimatedImage key={idx} {...g.item} delay={0} />
      )}
    </div>
  );
}

export default function CaseStudyScreenAlt({ project }) {
  const p = project;
  const [activeSection, setActiveSection] = useState('overview');

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
    <div>
      <NotionNav active={activeSection} />

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

      {/* Hero image */}
      <section style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '0 48px 0' }}>
        <ImagePlaceholder ratio="16/8" label="[ Hero — case study cover ]" src={p.coverImage} style={{ border: '1px solid var(--border-hairline)' }} />
      </section>

      {/* Project meta strip */}
      <section style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '0 48px' }}>
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border-hairline)' }}>
          {[
            { label: 'Role', value: p.role || 'Lead Designer' },
            { label: 'Year', value: p.year },
            { label: 'Team', value: p.team ? `${p.team} people` : '—' },
          ].map((m, i) => (
            <div key={m.label} style={{ padding: '20px 32px 20px 0', marginRight: 32, borderRight: i < 2 ? '1px solid var(--border-hairline)' : 'none' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: 6 }}>{m.label}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, letterSpacing: '0.04em', color: 'var(--text-primary)' }}>{m.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Body content */}
      <section style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '64px 48px 80px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>

          <div id="section-overview" style={{ marginBottom: 72, scrollMarginTop: 100 }}>
            <SectionHead n="01" title="Overview" />
            <p style={{ fontSize: 16, lineHeight: 1.65, color: 'var(--text-secondary)', maxWidth: '64ch', marginLeft: 76 }}>{p.overview}</p>
            <BodyImages images={p.bodyImages} after="overview" />
          </div>

          <div id="section-challenge" style={{ marginBottom: 72, scrollMarginTop: 100 }}>
            <SectionHead n="02" title="Challenge" />
            <p style={{ fontSize: 16, lineHeight: 1.65, color: 'var(--text-secondary)', maxWidth: '64ch', marginLeft: 76 }}>{p.challenge}</p>
            <BodyImages images={p.bodyImages} after="challenge" />
          </div>

          <div id="section-process" style={{ marginBottom: 72, scrollMarginTop: 100 }}>
            <SectionHead n="03" title="Process" />
            <div style={{ marginLeft: 76 }}>
              <Stepper steps={p.steps || ['Brief', 'Design', 'Ship']} current={(p.steps || []).length - 1} />
            </div>
            <BodyImages images={p.bodyImages} after="process" />
          </div>

          {p.outcomes && (
            <div id="section-outcome" style={{ marginBottom: 56, scrollMarginTop: 100 }}>
              <SectionHead n="04" title="Outcome" />
              <div style={{ marginLeft: 76, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                {p.outcomes.map((o) => (
                  <Card key={o.label} tone="ink"><StatCard value={o.value} label={o.label} onDark /></Card>
                ))}
              </div>
              <BodyImages images={p.bodyImages} after="outcome" />
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
