import { useEffect, useState } from 'react';
import { Badge } from '../ds/components/core/Badge.jsx';
import { Tag } from '../ds/components/core/Tag.jsx';
import { Eyebrow, GridLines } from './Chrome.jsx';

/* The lights-on transition. Renders opaque black over the page and lets
   CSS run the fluorescent stutter (animation-fill: forwards hides it).
   Full boot sequence on first entry per session, quick flicker after. */
export function LabEntry() {
  const [mode, setMode] = useState('full');
  const [dotsTyped, setDotsTyped] = useState(0);
  const [showOk, setShowOk] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let alreadyEntered = false;
    try {
      alreadyEntered = Boolean(sessionStorage.getItem('lab-entered'));
    } catch (e) {
      alreadyEntered = false;
    }

    const timers = [];
    if (reduced) {
      setMode('reduced');
    } else if (alreadyEntered) {
      setMode('quick');
    } else {
      setMode('full');
      for (let i = 1; i <= 6; i++) {
        timers.push(setTimeout(() => setDotsTyped(i), 500 + i * 80));
      }
      timers.push(setTimeout(() => setShowOk(true), 1090));
    }

    try {
      sessionStorage.setItem('lab-entered', '1');
    } catch (e) {
      /* storage unavailable (private mode / ITP) — non-fatal, just skip persistence */
    }

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className={`lab-entry lab-entry--${mode}`} aria-hidden="true">
      <div className="lab-boot">
        <span className="lab-boot-line lab-boot-line--faint" style={{ animationDelay: '0.15s' }}>&gt; vg.lab — session {new Date().getFullYear()}</span>
        <div className="lab-boot-line-row">
          <span className="lab-passcode-label">&gt; passcode:</span>
          <span className="lab-passcode-value">{'•'.repeat(dotsTyped)}{showOk ? ' [ok]' : ''}</span>
        </div>
        <span className="lab-boot-line lab-boot-line--safelight" style={{ animationDelay: '1.3s' }}>&gt; safelight: on</span>
        <span className="lab-boot-line" style={{ animationDelay: '1.75s' }}>&gt; exposing<span className="lab-caret">▌</span></span>
      </div>
    </div>
  );
}

/* Scanlines, grain, vignette, CRT sweep — the room itself. */
export function LabFx() {
  return <div className="lab-fx" aria-hidden="true" />;
}

/* The lights-off transition. Intercepts same-tab internal link clicks,
   plays a quick glitch-to-black flicker, then completes the navigation. */
export function LabExit() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    function handleClick(e) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest && e.target.closest('a');
      if (!a || a.target === '_blank') return;

      const href = a.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

      let url;
      try {
        url = new URL(href, window.location.href);
      } catch (err) {
        return;
      }
      if (url.origin !== window.location.origin) return;

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced) return;

      e.preventDefault();
      setActive(true);
      setTimeout(() => { window.location.href = url.href; }, 550);
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return <div className={`lab-exit${active ? ' lab-exit--active' : ''}`} aria-hidden="true" />;
}

function LabCard({ p }) {
  return (
    <a className="lab-card" href={`/lab/${p.slug}`} aria-label={`View ${p.title}`}>
      <div className="lab-card-hit">
        {p.coverImage
          ? <img src={p.coverImage} alt={p.imageLabel || p.title} loading="lazy" decoding="async" />
          : (
            <div className="lab-placeholder">
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', color: 'var(--text-faint)', textTransform: 'uppercase' }}>{p.imageLabel || '[ No exposure yet ]'}</span>
            </div>
          )}
        <span className="lab-card-launch">View details →</span>
      </div>
      <div style={{ padding: '20px 24px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)' }}>{p.code}</span>
          <Badge status={p.status}>{p.statusLabel}</Badge>
        </div>
        <h3 style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.18, margin: '0 0 8px' }}>{p.title}</h3>
        <p style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--text-secondary)', margin: '0 0 16px' }}>{p.summary}</p>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 18 }}>
          {p.tags.map((t) => <Tag key={t} size="sm">{t}</Tag>)}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-faint)' }}>
            {p.year}{p.stack ? ` · ${p.stack.join(' / ')}` : ''}
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Details →</span>
        </div>
      </div>
    </a>
  );
}

export default function LabScreen({ experiments }) {
  const nextCode = `EXP-${String(experiments.length + 1).padStart(3, '0')}`;
  return (
    <>
    <LabEntry />
    <LabFx />
    <LabExit />
    <div className="page-enter">
      <section className="section-pad" style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '72px 48px 40px', position: 'relative', overflow: 'hidden' }}>
        <GridLines />
        <Eyebrow style={{ marginBottom: 18, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="lab-dot" aria-hidden="true" />
          Lab / {experiments.length} experiment{experiments.length === 1 ? '' : 's'} — unstable
        </Eyebrow>
        <h1 className="lab-glitch" data-text="The Lab" style={{ fontSize: 'clamp(34px,5vw,56px)', lineHeight: 1, letterSpacing: '-0.03em', fontWeight: 700, margin: '0 0 20px' }}>The Lab</h1>
        <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--text-secondary)', maxWidth: 560, margin: 0 }}>
          Off-hours experiments, developed in the dark. Prototypes and toys that ship half-finished on purpose — click one to see the write-up. No warranty, no roadmap.
        </p>
      </section>

      <section className="section-pad" style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '0 48px 80px', position: 'relative', overflow: 'hidden' }}>
        <GridLines />
        <div className="grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {experiments.map((p) => <LabCard key={p.slug} p={p} />)}
          <div className="lab-slot" aria-hidden="true">
            <span style={{ color: 'var(--text-faint)' }}>{nextCode}</span>
            <span>developing<span className="lab-caret">▌</span></span>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
