import { useEffect, useState } from 'react';

function VGMark({ size = 40, color = 'var(--ink-900)' }) {
  return (
    <span style={{ color, width: size, flex: 'none', display: 'inline-flex' }}>
      <svg viewBox="0 0 562 369" fill="currentColor" style={{ display: 'block', width: '100%', height: 'auto', fillRule: 'evenodd', clipRule: 'evenodd' }}>
        <g transform="matrix(1,0,0,1,-696,73)"><g transform="matrix(8.693433,0,0,8.693433,-7671.335362,-8770.706084)"><g transform="matrix(1,0,0,1,994.8125,1002.9085)"><path d="M0,37.612L31.187,18.993L31.187,18.619L0,0L-31.187,18.619L-31.187,18.993L0,37.612ZM0,32.004L-22.105,18.806L0,5.609L22.105,18.806L0,32.004Z" /></g><g transform="matrix(1,0,0,1,1008.8203,1021.5751)"><path d="M0,0.169L0,0L-14.077,-8.404L-28.154,0L-28.154,0.169L-14.077,8.573L0,0.169Z" /></g></g></g>
      </svg>
    </span>
  );
}

export function TopBar({ activePage }) {
  const [VG, setVG] = useState(null);
  useEffect(() => {
    const ns = window.VitorGomesDesignSystem_32625a;
    if (ns) setVG(ns);
    else { const t = setInterval(() => { if (window.VitorGomesDesignSystem_32625a) { setVG(window.VitorGomesDesignSystem_32625a); clearInterval(t); } }, 50); return () => clearInterval(t); }
  }, []);

  const items = [{ href: '/work', label: 'Work', key: 'work' }, { href: '/about', label: 'About', key: 'about' }];
  return (
    <div style={{ borderBottom: '1px solid var(--border-hairline)', background: 'var(--surface-page)', position: 'sticky', top: 0, zIndex: 50 }}>
      <div style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '16px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ textDecoration: 'none', display: 'inline-flex' }}><VGMark size={40} /></a>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          {items.map((it) => (
            <a key={it.key} href={it.href} style={{
              padding: '8px 12px', textDecoration: 'none',
              color: activePage === it.key ? 'var(--text-primary)' : 'var(--text-secondary)',
              borderBottom: activePage === it.key ? '2px solid var(--accent)' : '2px solid transparent',
            }}>{it.label}</a>
          ))}
          {VG && <VG.Button size="sm" style={{ marginLeft: 8 }} onClick={() => window.location.href = '/about'}>Contact</VG.Button>}
        </div>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer style={{ background: 'var(--surface-ink)', color: 'var(--text-inverse-faint)' }}>
      <div style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '40px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <VGMark size={34} color="var(--paper)" />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Vitor Gomes · Product Designer</span>
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase' }}>© 2026 — Amsterdam</span>
      </div>
    </footer>
  );
}

export function ImagePlaceholder({ ratio = '16/10', label = '[ Project image ]', src, style }) {
  if (src) return <img src={src} alt={label} style={{ width: '100%', aspectRatio: ratio, objectFit: 'cover', display: 'block', ...style }} />;
  return (
    <div style={{ aspectRatio: ratio, background: 'repeating-linear-gradient(135deg,#F4F4F5 0 11px,#E9E9EB 11px 22px)', display: 'flex', alignItems: 'center', justifyContent: 'center', ...style }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', color: 'var(--text-faint)', textTransform: 'uppercase' }}>{label}</span>
    </div>
  );
}

export function Eyebrow({ children, style }) {
  return <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', ...style }}>{children}</div>;
}
