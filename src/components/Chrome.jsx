import { useState, useEffect } from 'react';
import { Button } from '../ds/components/core/Button.jsx';

function VGMark({ size = 40, color = 'var(--text-primary)' }) {
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
    <span className="vg-eye" style={{ width: size, flex: 'none', display: 'inline-flex', color: 'var(--text-primary)' }}>
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
  const [active, setActive] = useState(false);
  const items = [{ href: '/work', label: 'Work', key: 'work' }, { href: '/lab', label: 'Lab', key: 'lab' }, { href: '/notes', label: 'Notes', key: 'notes' }, { href: '/about', label: 'About', key: 'about' }];

  // Auto-trigger eye glitch every 10s for ~2s
  useEffect(() => {
    const interval = setInterval(() => {
      setActive(true);
      setTimeout(() => setActive(false), 3500);
    }, 10000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div style={{ borderBottom: '1px solid var(--border-hairline)', background: 'var(--surface-page)', position: 'sticky', top: 0, zIndex: 50 }}>
      <div className="topbar-inner" style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '16px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
          onMouseEnter={() => setActive(true)}
          onMouseLeave={() => setActive(false)}>
          <span style={{ display: active ? 'none' : 'inline-flex' }}><VGMark size={40} /></span>
          <span style={{ display: active ? 'inline-flex' : 'none' }}><VGEyeGlitch size={40} /></span>
        </a>
        <div className="topbar-nav" style={{ display: 'flex', gap: 8, alignItems: 'center', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          {items.map((it) => (
            <a key={it.key} href={it.href} className="topbar-link" style={{
              padding: '8px 12px', textDecoration: 'none',
              color: activePage === it.key ? 'var(--text-primary)' : 'var(--text-secondary)',
              borderBottom: activePage === it.key ? '2px solid var(--accent)' : '2px solid transparent',
              transition: 'color 0.18s ease, border-color 0.18s ease',
            }}
            onMouseEnter={e => { if (activePage !== it.key) { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderBottomColor = 'var(--border-default)'; } }}
            onMouseLeave={e => { if (activePage !== it.key) { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderBottomColor = 'transparent'; } }}
            >{it.label}</a>
          ))}
          <Button size="sm" style={{ marginLeft: 8 }} onClick={() => window.location.href = '/about'}>Contact</Button>
        </div>
      </div>
    </div>
  );
}

export function SiteBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem('banner-dismissed')) setVisible(true);
  }, []);

  if (!visible) return null;

  return (
    <div className="site-banner" style={{ background: 'var(--surface-subtle)', borderBottom: '1px solid var(--border-hairline)' }}>
      <div className="section-pad" style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '10px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: 'var(--text-secondary)' }}>
          <span style={{ fontWeight: 600, color: 'var(--banner-lead, var(--text-primary))' }}>Work in progress —</span>{' '}
          This website is currently being updated. Some information or projects may be missing or incomplete.
        </p>
        <button
          onClick={() => { sessionStorage.setItem('banner-dismissed', '1'); setVisible(false); }}
          aria-label="Dismiss"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-faint)', fontSize: 18, lineHeight: 1, padding: '2px 4px', flexShrink: 0 }}
        >
          ×
        </button>
      </div>
    </div>
  );
}

const SOCIAL_LINKS = [
  {
    label: 'Behance', href: 'https://www.behance.net/vitor-gomes',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16.969 16.927a2.561 2.561 0 0 0 1.901.677 2.501 2.501 0 0 0 1.531-.475c.362-.235.636-.584.779-.99h2.585a5.091 5.091 0 0 1-1.9 2.896 5.292 5.292 0 0 1-3.091.88 5.839 5.839 0 0 1-2.284-.433 4.871 4.871 0 0 1-1.723-1.211 5.657 5.657 0 0 1-1.08-1.874 7.057 7.057 0 0 1-.383-2.393c-.005-.8.129-1.595.396-2.349a5.313 5.313 0 0 1 5.088-3.604 4.87 4.87 0 0 1 2.376.563c.661.362 1.231.87 1.668 1.485a6.2 6.2 0 0 1 .943 2.133c.194.821.263 1.666.205 2.508h-7.699c-.063.79.184 1.574.688 2.187ZM6.947 4.084a8.065 8.065 0 0 1 1.928.198 4.29 4.29 0 0 1 1.49.638c.418.303.748.711.958 1.182.241.579.357 1.203.341 1.83a3.506 3.506 0 0 1-.506 1.961 3.726 3.726 0 0 1-1.503 1.287 3.588 3.588 0 0 1 2.027 1.437c.464.747.697 1.615.67 2.494a4.593 4.593 0 0 1-.423 2.032 3.945 3.945 0 0 1-1.163 1.413 5.114 5.114 0 0 1-1.683.807 7.135 7.135 0 0 1-1.928.259H0V4.084h6.947Zm-.235 12.9c.308.004.616-.029.916-.099a2.18 2.18 0 0 0 .766-.332c.228-.158.411-.371.534-.619.142-.317.208-.663.191-1.009a2.08 2.08 0 0 0-.642-1.715 2.618 2.618 0 0 0-1.696-.505h-3.54v4.279h3.471Zm13.635-5.967a2.13 2.13 0 0 0-1.654-.619 2.336 2.336 0 0 0-1.163.259 2.474 2.474 0 0 0-.738.62 2.359 2.359 0 0 0-.396.792c-.074.239-.12.485-.137.734h4.769a3.239 3.239 0 0 0-.679-1.785l-.002-.001Zm-13.813-.648a2.254 2.254 0 0 0 1.423-.433c.399-.355.607-.88.56-1.413a1.916 1.916 0 0 0-.178-.891 1.298 1.298 0 0 0-.495-.533 1.851 1.851 0 0 0-.711-.274 3.966 3.966 0 0 0-.835-.073H3.241v3.631h3.293v-.014ZM21.62 5.122h-5.976v1.527h5.976V5.122Z"/></svg>,
  },
  {
    label: 'LinkedIn', href: 'https://www.linkedin.com/in/vitorgs/',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  },
  {
    label: 'Instagram', href: 'https://www.instagram.com/semi.otics/',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>,
  },
  {
    label: 'Dribbble', href: 'https://dribbble.com/vitorgomes',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308a10.29 10.29 0 0 0 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4a10.161 10.161 0 0 0 6.29 2.166c1.42 0 2.77-.29 4.006-.816zm-11.62-2.073c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12a28.38 28.38 0 0 0-.713-1.423c-5.156 1.543-10.165 1.478-10.64 1.463a10.146 10.146 0 0 0 2.616 6.845zm-2.977-8.535c.486.006 4.725.052 9.585-1.263a71.702 71.702 0 0 0-3.842-5.93A10.218 10.218 0 0 0 1.408 12.833zm7.562-9.264a67.4 67.4 0 0 1 3.868 5.981c3.695-1.386 5.257-3.495 5.44-3.75A10.146 10.146 0 0 0 12 2.166a10.246 10.246 0 0 0-3.03.403zm10.88 2.95c-.2.27-1.933 2.508-5.77 4.076.24.49.47.99.68 1.49.07.19.14.38.21.57 3.38-.424 6.745.257 7.085.33a10.2 10.2 0 0 0-2.205-6.466z"/></svg>,
  },
  {
    label: 'GitHub', href: 'https://github.com/vgomx',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>,
  },
];

function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('cookies-accepted')) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem('cookies-accepted', '1');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed', bottom: 24, left: 24, zIndex: 1000,
      background: 'var(--surface-ink)', color: 'var(--text-inverse-faint)',
      borderRadius: 8, padding: '16px 20px', maxWidth: 340,
      boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
      display: 'flex', flexDirection: 'column', gap: 14,
    }}>
      <p style={{ margin: 0, fontSize: 13, lineHeight: 1.55 }}>
        By using this website, you agree to our use of cookies. We use cookies to provide you with a great experience and to help our website run effectively.
      </p>
      <button
        onClick={accept}
        style={{
          alignSelf: 'flex-start', background: 'var(--paper)', color: 'var(--ink-900)',
          border: 'none', borderRadius: 4, padding: '8px 18px',
          fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600,
          cursor: 'pointer', letterSpacing: '-0.01em',
        }}
      >
        Accept
      </button>
    </div>
  );
}

function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [labMode, setLabMode] = useState(false);
  useEffect(() => {
    const theme = document.documentElement.getAttribute('data-theme');
    setDark(theme === 'dark');
    setLabMode(theme === 'lab'); // lab pages own their theme — no toggle
  }, []);
  if (labMode) return null;
  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute('data-theme', next ? 'dark' : '');
    localStorage.setItem('theme', next ? 'dark' : 'light');
  }
  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-inverse-faint)', padding: 0, display: 'flex', alignItems: 'center', transition: 'color 0.2s' }}
      onMouseEnter={e => e.currentTarget.style.color = 'var(--paper)'}
      onMouseLeave={e => e.currentTarget.style.color = 'var(--text-inverse-faint)'}
    >
      {dark
        ? <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 5a1 1 0 0 1 1-1V2a1 1 0 1 0-2 0v2a1 1 0 0 1 1-1zm0 14a1 1 0 0 1 1 1v2a1 1 0 1 0-2 0v-2a1 1 0 0 1 1-1zm9-7a1 1 0 0 1-1 1h-2a1 1 0 1 0 0-2h2a1 1 0 0 1 1 1zM4 12a1 1 0 0 1-1 1H1a1 1 0 1 0 0-2h2a1 1 0 0 1 1 1zm14.95-6.364a1 1 0 0 1 0 1.414l-1.414 1.414a1 1 0 1 1-1.414-1.414l1.414-1.414a1 1 0 0 1 1.414 0zM7.05 18.364a1 1 0 0 1 0 1.414L5.636 21.19a1 1 0 1 1-1.414-1.414l1.414-1.414a1 1 0 0 1 1.414 0zM18.95 18.364a1 1 0 0 1-1.414 0l-1.414-1.414a1 1 0 0 1 1.414-1.414l1.414 1.414a1 1 0 0 1 0 1.414zM7.05 5.636a1 1 0 0 1-1.414 0L4.222 4.222A1 1 0 0 1 5.636 2.808L7.05 4.222a1 1 0 0 1 0 1.414zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/></svg>
        : <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>
      }
    </button>
  );
}

const NAV_LINKS = [
  { href: '/work', label: 'Cases' },
  { href: '/lab', label: 'Lab' },
  { href: '/about', label: 'About' },
  { href: 'mailto:vgmxx@proton.me', label: 'Contact' },
];

const LEGAL_LINKS = [
  { href: '/legal/cookies', label: 'Cookies policy' },
  { href: '/legal/privacy', label: 'Privacy notice' },
  { href: '/legal/terms', label: 'Terms & Conditions' },
];

function FooterLink({ href, label, external }) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text-inverse-faint)', textDecoration: 'none', transition: 'color 0.18s ease' }}
      onMouseEnter={e => e.currentTarget.style.color = 'var(--paper)'}
      onMouseLeave={e => e.currentTarget.style.color = 'var(--text-inverse-faint)'}
    >{label}</a>
  );
}

export function Footer() {
  return (
    <>
    <CookieBanner />
    <footer style={{ background: 'var(--surface-ink)', color: 'var(--text-inverse-faint)', borderTop: '1px solid var(--border-on-ink)' }}>
      <div style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '48px 48px 0' }} className="footer-wrap">
        {/* Three-column grid */}
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 48, paddingBottom: 40, borderBottom: '1px solid var(--border-on-ink)' }}>

          {/* Left: identity + social */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 500, color: 'var(--paper)', marginBottom: 4 }}>Vitor Gomes</div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 14 }}>Product Designer</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              {SOCIAL_LINKS.map(({ label, icon, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}
                  style={{ color: 'var(--text-inverse-faint)', textDecoration: 'none', display: 'flex', alignItems: 'center', transition: 'color 0.18s ease' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--paper)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-inverse-faint)'}
                >{icon}</a>
              ))}
            </div>
          </div>

          {/* Middle: nav */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {NAV_LINKS.map(l => <FooterLink key={l.label} href={l.href} label={l.label} />)}
          </div>

          {/* Right: legal */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {LEGAL_LINKS.map(l => <FooterLink key={l.label} href={l.href} label={l.label} />)}
          </div>
        </div>

        {/* Copyright bar */}
        <div style={{ padding: '20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <VGMark size={22} color="var(--text-inverse-faint)" />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.04em' }}>© Vitor Gomes. All rights reserved.</span>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </footer>
    </>
  );
}

export function ImagePlaceholder({ ratio = '16/10', label = '[ Project image ]', src, style, loading = 'lazy' }) {
  if (src) return <img src={src} alt={label} loading={loading} decoding="async" style={{ width: '100%', aspectRatio: ratio, objectFit: 'cover', display: 'block', ...style }} />;
  return (
    <div style={{ aspectRatio: ratio, background: 'repeating-linear-gradient(135deg,#F4F4F5 0 11px,#E9E9EB 11px 22px)', display: 'flex', alignItems: 'center', justifyContent: 'center', ...style }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', color: 'var(--text-faint)', textTransform: 'uppercase' }}>{label}</span>
    </div>
  );
}

export function Eyebrow({ children, style }) {
  return <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', ...style }}>{children}</div>;
}

export function GridLines({ cols = 4, style }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: -1,
        opacity: 0.35,
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)',
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)',
        ...style,
      }}
    >
      <div style={{
        maxWidth: 'var(--container)',
        margin: '0 auto',
        padding: '0 48px',
        height: '100%',
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        boxSizing: 'border-box',
      }}>
        {Array.from({ length: cols }).map((_, i) => (
          <div
            key={i}
            style={{
              borderLeft: '1px solid var(--border-default)',
              ...(i === cols - 1 ? { borderRight: '1px solid var(--border-default)' } : {}),
            }}
          />
        ))}
      </div>
    </div>
  );
}
