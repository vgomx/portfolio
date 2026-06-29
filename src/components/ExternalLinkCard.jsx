import { useState } from 'react';

function ExternalLinkIcon({ size = 16, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M6.5 3H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V9.5" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9.5 2.5H13.5V6.5" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13.5 2.5L7.5 8.5" stroke={color} strokeWidth="1.25" strokeLinecap="round"/>
    </svg>
  );
}

export function ExternalLinkCard({ title, href, style }) {
  const [hover, setHover] = useState(false);

  const displayHref = href.replace(/^https?:\/\//, '');

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        padding: '16px 20px',
        background: 'var(--surface-card)',
        border: `1px solid ${hover ? 'var(--border-strong)' : 'var(--border-hairline)'}`,
        borderRadius: 'var(--radius)',
        textDecoration: 'none',
        transition: 'border-color var(--dur-base) var(--ease-out)',
        ...style,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0 }}>
        <span style={{
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: '-0.01em',
          color: 'var(--text-primary)',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          {title}
        </span>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          letterSpacing: '0.04em',
          color: 'var(--text-faint)',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          {displayHref}
        </span>
      </div>
      <ExternalLinkIcon
        size={15}
        color={hover ? 'var(--text-primary)' : 'var(--text-muted)'}
      />
    </a>
  );
}
