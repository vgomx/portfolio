import { useState } from 'react';
import { Button } from '../ds/components/core/Button.jsx';

function VGMark({ size = 40, color = 'var(--ink-900)' }) {
  return (
    <span style={{ color, width: size, flex: 'none', display: 'inline-flex' }}>
      <svg viewBox="0 0 562 369" fill="currentColor" style={{ display: 'block', width: '100%', height: 'auto', fillRule: 'evenodd', clipRule: 'evenodd' }}>
        <g transform="matrix(1,0,0,1,-696,73)"><g transform="matrix(8.693433,0,0,8.693433,-7671.335362,-8770.706084)"><g transform="matrix(1,0,0,1,994.8125,1002.9085)"><path d="M0,37.612L31.187,18.993L31.187,18.619L0,0L-31.187,18.619L-31.187,18.993L0,37.612ZM0,32.004L-22.105,18.806L0,5.609L22.105,18.806L0,32.004Z" /></g><g transform="matrix(1,0,0,1,1008.8203,1021.5751)"><path d="M0,0.169L0,0L-14.077,-8.404L-28.154,0L-28.154,0.169L-14.077,8.573L0,0.169Z" /></g></g></g>
      </svg>
    </span>
  );
}

function VGEyeGlitch({ size = 40 }) {
  return (
    <span className="vg-eye" style={{ width: size * (562 / 369), height: size, flex: 'none', display: 'inline-flex' }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 562 369" style={{ display: 'block', width: '100%', height: 'auto' }}>
        <defs>
          <g id="vgEye" style={{ fill: 'currentColor' }}>
            <path d="M281,21 L552,186 L281,348 L10,186 Z M281,70 L473,184 L281,299 L89,184 Z" fillRule="evenodd" />
            <g id="vgPupil"><path d="M281,110 L403,183 L281,256 L159,183 Z" /></g>
          </g>
          <clipPath id="vgClipT"><rect x="-40" y="-10" width="642" height="162" /></clipPath>
          <clipPath id="vgClipM"><rect x="-40" y="150" width="642" height="82" /></clipPath>
          <clipPath id="vgClipB"><rect x="-40" y="230" width="642" height="160" /></clipPath>
          <clipPath id="vgEyeClip"><path d="M281,21 L552,186 L281,348 L10,186 Z" /></clipPath>
          <pattern id="vgLines" width="3" height="3" patternUnits="userSpaceOnUse"><rect width="3" height="1" fill="#141416" /></pattern>
        </defs>
        <g id="vgJitterG">
          <g id="vgBlinkG">
            <g id="vgGhostG"><use href="#vgEye" /></g>
            <g id="vgGhostI"><use href="#vgEye" /></g>
            <g id="vgBandT"><use href="#vgEye" /></g>
            <g id="vgBandM"><use href="#vgEye" /></g>
            <g id="vgBandB"><use href="#vgEye" /></g>
            <rect x="0" y="0" width="562" height="369" fill="url(#vgLines)" opacity=".06" clipPath="url(#vgEyeClip)" />
            <g clipPath="url(#vgEyeClip)"><rect id="vgScanBar" x="0" y="0" width="562" height="7" fill="var(--signal,#2F6F4F)" /></g>
          </g>
        </g>
      </svg>
    </span>
  );
}

export function TopBar({ activePage }) {
  const [hovered, setHovered] = useState(false);
  const items = [{ href: '/work', label: 'Work', key: 'work' }, { href: '/about', label: 'About', key: 'about' }];
  return (
    <div style={{ borderBottom: '1px solid var(--border-hairline)', background: 'var(--surface-page)', position: 'sticky', top: 0, zIndex: 50 }}>
      <div style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '16px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}>
          <span style={{ display: hovered ? 'none' : 'inline-flex' }}><VGMark size={40} /></span>
          <span style={{ display: hovered ? 'inline-flex' : 'none' }}><VGEyeGlitch size={40} /></span>
        </a>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          {items.map((it) => (
            <a key={it.key} href={it.href} style={{
              padding: '8px 12px', textDecoration: 'none',
              color: activePage === it.key ? 'var(--text-primary)' : 'var(--text-secondary)',
              borderBottom: activePage === it.key ? '2px solid var(--accent)' : '2px solid transparent',
            }}>{it.label}</a>
          ))}
          <Button size="sm" style={{ marginLeft: 8 }} onClick={() => window.location.href = '/about'}>Contact</Button>
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
