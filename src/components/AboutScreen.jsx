import { useState, useRef, useEffect } from 'react';
import { Button } from '../ds/components/core/Button.jsx';
import { Badge } from '../ds/components/core/Badge.jsx';
import { Avatar } from '../ds/components/core/Avatar.jsx';
import { Input } from '../ds/components/core/Input.jsx';
import { Card } from '../ds/components/data/Card.jsx';
import { Accordion } from '../ds/components/feedback/Accordion.jsx';
import { Modal } from '../ds/components/overlay/Modal.jsx';
import { Eyebrow, GridLines } from './Chrome.jsx';


const TIMELINE = [
  {
    year: '1992',
    text: 'Millennial generation. Born in São Paulo into a world still making the shift to digital — analogue on one side, something new on the other.',
  },
  {
    year: '1998',
    text: 'Thanks to my dad\'s interest in tech, I got one of those white-beige PCs. A whole new world of interfaces appeared. More buttons than I\'d ever seen — and I pressed every single one.',
  },
  {
    year: '2007',
    text: 'With the help of tutorials I found on the web, I learned how to use professional design software. Once I realized design was my thing, I deep-dived — courses, training, endless experimentation.',
  },
  {
    year: '2011',
    text: 'A year of big changes. Life took me to the seaside — Santos, on the coast of São Paulo.',
  },
  {
    year: '2012–2015',
    text: 'Worked with art direction across advertising agencies, then landed at Vagalume — one of Brazil\'s most loved music portals. A dream job for a music lover.',
  },
  {
    year: '2015',
    text: 'Got an email out of nowhere from a client in Kuwait. Said yes. That single project opened a door to working internationally.',
  },
  {
    year: '2020',
    text: 'After years of side-by-side work and study, concluded my post-graduation. Then pivoted fully into digital products and the fintech industry.',
  },
  {
    year: '2021',
    text: 'Packed up and moved to Amsterdam as a highly skilled immigrant. Started a new chapter — and within the year, was promoted to Lead Designer.',
  },
  {
    year: '2022',
    text: 'Completed the UX Certification by Nielsen Norman Group, something I\'d been working toward for years. Some things are worth the long game.',
  },
  {
    year: 'Now',
    text: 'Still curious. Still pressing buttons. Working across brand, product and design systems for teams building something worth noticing.',
  },
];

function StorySection() {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef(null);

  return (
    <section className="section-pad" style={{ borderTop: '1px solid var(--border-hairline)', maxWidth: 'var(--container)', margin: '0 auto', padding: '0 48px' }}>
      {/* Toggle header */}
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '28px 0', background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: 'inherit', textAlign: 'left',
        }}
      >
        <span style={{ fontSize: 24, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>The longer version</span>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase',
          color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 8,
          transition: 'color 0.2s',
        }}>
          {open ? 'Collapse' : 'Read story'}
          <span style={{
            display: 'inline-block',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease',
            fontSize: 14,
          }}>↓</span>
        </span>
      </button>

      {/* Collapsible body */}
      <div
        ref={bodyRef}
        style={{
          overflow: 'hidden',
          maxHeight: open ? 3000 : 0,
          opacity: open ? 1 : 0,
          transition: 'max-height 0.5s ease, opacity 0.35s ease',
        }}
      >
        <div style={{ paddingBottom: 56 }}>
          {/* Opening quotes */}
          <div className="grid-sidebar" style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 48, marginBottom: 48, alignItems: 'start' }}>
            <div />
            <div>
              <p style={{ fontSize: 22, lineHeight: 1.45, fontWeight: 600, letterSpacing: '-0.01em', color: 'var(--text-primary)', margin: '0 0 16px', maxWidth: '44ch' }}>
                "I have always been curious. When I was a kid, I used to press every button that appeared in front of me."
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.65, color: 'var(--text-secondary)', margin: '0 0 16px', maxWidth: '56ch' }}>
                The best story was the one when I stopped an escalator in a mall. Of course, my parents got mad all the time, but that didn't change a thing in me.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.65, color: 'var(--text-secondary)', margin: '0 0 16px', maxWidth: '56ch' }}>
                With my first computer, I discovered a whole new world of interfaces with even more buttons. Besides crashing everything from time to time, I also used to spend hours playing with presentation tools and website editors, creating my very first prototypes. Such a young geek.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.65, color: 'var(--text-secondary)', margin: 0, maxWidth: '56ch' }}>
                Once I realized that design was my thing I deep-dived into it by enrolling in many courses and training. I worked at some agencies, at a music website, in a digital products hub, and even in the fintech industry.
              </p>
            </div>
          </div>

          {/* Timeline */}
          {TIMELINE.map((entry, i) => (
            <div
              key={entry.year}
              className="grid-sidebar"
              style={{
                display: 'grid', gridTemplateColumns: '220px 1fr', gap: 48,
                paddingTop: 24, paddingBottom: 24,
                borderTop: '1px solid var(--border-hairline)',
              }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, letterSpacing: '0.06em', color: 'var(--text-faint)', paddingTop: 2 }}>{entry.year}</span>
              <p style={{ fontSize: 16, lineHeight: 1.65, color: 'var(--text-secondary)', margin: 0, maxWidth: '56ch' }}>{entry.text}</p>
            </div>
          ))}

          {/* Philosophy */}
          <div className="grid-sidebar" style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 48, paddingTop: 24, paddingBottom: 24, borderTop: '1px solid var(--border-hairline)' }}>
            <div />
            <div>
              <p style={{ fontSize: 16, lineHeight: 1.65, color: 'var(--text-secondary)', margin: '0 0 12px', maxWidth: '56ch' }}>
                I can help shape people-centered experiences in digital products — from the initial stages like research through high-fidelity prototypes.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.65, color: 'var(--text-secondary)', margin: 0, maxWidth: '56ch' }}>
                I like to facilitate workshops and also have a background in visual design.
              </p>
            </div>
          </div>

          {/* Closing line */}
          <div className="grid-sidebar" style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 48, paddingTop: 24, borderTop: '1px solid var(--border-hairline)' }}>
            <div />
            <p style={{ fontSize: 16, lineHeight: 1.65, color: 'var(--text-muted)', margin: 0, fontStyle: 'italic', maxWidth: '52ch' }}>
              Born and raised in São Paulo, I also lived in Santos on the coast. Since 2021, living in Amsterdam.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AboutScreen() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [project, setProject] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const eyeRef = useRef(null);

  async function handleSend() {
    if (!email || !project) return;
    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: '15defe94-5bf0-4da2-8cc5-b891914578d2',
          subject: 'New project enquiry — vitorgomes.design',
          email,
          message: project,
        }),
      });
      const data = await res.json();
      setStatus(data.success ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  }

  function handleClose() {
    setOpen(false);
    setTimeout(() => { setEmail(''); setProject(''); setStatus('idle'); }, 300);
  }

  useEffect(() => {
    if (eyeRef.current && window.VGEyeGlitch) {
      window.VGEyeGlitch.mount(eyeRef.current);
    }
  }, []);

  return (
    <div>
      <div style={{ position: 'relative', overflow: 'hidden' }}>
      <section className="grid-hero section-pad" style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '88px 48px 56px', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 56, alignItems: 'start', position: 'relative', zIndex: 1 }}>
        <div>
          <Eyebrow style={{ marginBottom: 24 }}>About</Eyebrow>
          <h1 style={{ fontSize: 'clamp(34px,5vw,56px)', lineHeight: 1.02, letterSpacing: '-0.03em', fontWeight: 700, margin: 0, maxWidth: '16ch' }}>I design brands and the products they become.</h1>
          <p style={{ fontSize: 18, lineHeight: 1.55, color: 'var(--text-secondary)', maxWidth: '52ch', margin: '24px 0 0' }}>I'm Vitor — a product designer working across identity, interface and design systems. Twelve years in, I still believe the best systems are the ones you barely notice: restraint, one clear signal, edges that do the work.</p>
          <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
            <Button variant="accent" onClick={() => setOpen(true)}>Get in touch</Button>
            <Button variant="ghost" onClick={() => { const a = document.createElement('a'); a.href = '/vitor-gomes-cv.pdf'; a.download = 'Vitor Gomes - CV.pdf'; a.click(); }}>Download CV</Button>
          </div>
        </div>
        <Card tone="ink" className="about-hero-card" style={{ padding: 28 }}>
          <img
            src="/images/vitor.jpg"
            alt="Vitor Gomes"
            style={{ width: '100%', aspectRatio: '3/3.5', objectFit: 'cover', objectPosition: 'center 5%', display: 'block', borderRadius: 4, marginBottom: 20 }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--paper)' }}>Vitor Gomes</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-inverse-faint)' }}>Amsterdam · Remote</div>
          </div>
        </Card>
      </section>
      <div
        ref={eyeRef}
        data-vg-eye
        data-glitch="1.2"
        data-signal="#2F6F4F"
        style={{
          position: 'absolute',
          bottom: '-60px',
          right: '-80px',
          width: '340px',
          opacity: 0.12,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      </div>

      <StorySection />

      <section className="grid-sidebar section-pad" style={{ borderTop: '1px solid var(--border-hairline)', maxWidth: 'var(--container)', margin: '0 auto', padding: '64px 48px', display: 'grid', gridTemplateColumns: '220px 1fr', gap: 48, alignItems: 'start', position: 'relative', overflow: 'hidden' }}>
        <GridLines />
        <h2 style={{ fontSize: 24, fontWeight: 600, letterSpacing: '-0.02em', margin: 0 }}>Questions</h2>
        <Accordion items={[
          { title: 'What do you work on?', content: 'Brand and product design for teams shaping new things — identity, interface and the systems that hold them together.' },
          { title: 'Where are you based?', content: 'Amsterdam, working remotely across European and US time zones.' },
          { title: "What's your process?", content: 'Brief, design, ship. Tight loops, working in the open, no black boxes.' },
        ]} />
      </section>

      <Modal open={open} onClose={handleClose} title="Start a project"
        footer={status !== 'success' && (
          <>
            <Button variant="ghost" size="sm" onClick={handleClose}>Cancel</Button>
            <Button variant="accent" size="sm" onClick={handleSend} disabled={status === 'sending' || !email || !project}>
              {status === 'sending' ? 'Sending…' : 'Send'}
            </Button>
          </>
        )}>
        {status === 'success' ? (
          <div style={{ padding: '8px 0 16px' }}>
            <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 8px' }}>Message sent.</p>
            <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--text-secondary)', margin: 0 }}>I'll get back to you within two days.</p>
          </div>
        ) : (
          <>
            <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--text-secondary)', margin: '0 0 16px' }}>Tell me a little about what you're building and I'll get back within two days.</p>
            <Input label="Email" placeholder="you@studio.com" value={email} onChange={e => setEmail(e.target.value)} wrapperStyle={{ marginBottom: 14 }} />
            <Input label="Project" placeholder="A sentence or two" value={project} onChange={e => setProject(e.target.value)} />
            {status === 'error' && (
              <p style={{ fontSize: 13, color: 'var(--danger)', margin: '12px 0 0' }}>Something went wrong — please try again or email directly.</p>
            )}
          </>
        )}
      </Modal>
    </div>
  );
}
