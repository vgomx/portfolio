import { useEffect, useState } from 'react';
import { Eyebrow } from './Chrome.jsx';

export default function AboutScreen() {
  const [VG, setVG] = useState(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const ns = window.VitorGomesDesignSystem_32625a;
    if (ns) { setVG(ns); return; }
    const t = setInterval(() => { if (window.VitorGomesDesignSystem_32625a) { setVG(window.VitorGomesDesignSystem_32625a); clearInterval(t); } }, 50);
    return () => clearInterval(t);
  }, []);

  if (!VG) return null;

  return (
    <div>
      <section style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '88px 48px 56px', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 56, alignItems: 'start' }}>
        <div>
          <Eyebrow style={{ marginBottom: 24 }}>About</Eyebrow>
          <h1 style={{ fontSize: 'clamp(34px,5vw,56px)', lineHeight: 1.02, letterSpacing: '-0.03em', fontWeight: 700, margin: 0, maxWidth: '16ch' }}>I design brands and the products they become.</h1>
          <p style={{ fontSize: 18, lineHeight: 1.55, color: 'var(--text-secondary)', maxWidth: '52ch', margin: '24px 0 0' }}>I'm Vitor — a product designer working across identity, interface and design systems. Twelve years in, I still believe the best systems are the ones you barely notice: restraint, one clear signal, edges that do the work.</p>
          <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
            <VG.Button variant="accent" onClick={() => setOpen(true)}>Get in touch</VG.Button>
            <VG.Button variant="ghost">Download CV</VG.Button>
          </div>
        </div>
        <VG.Card tone="ink" style={{ padding: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
            <VG.Avatar name="Vitor Gomes" size="lg" />
            <div>
              <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--paper)' }}>Vitor Gomes</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-inverse-faint)', marginTop: 4 }}>Amsterdam · Remote</div>
            </div>
          </div>
          <div style={{ marginBottom: 18 }}><VG.Badge status="live" onDark>Available · Q3</VG.Badge></div>
          <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--text-inverse-muted)', margin: 0 }}>Taking on two select projects this quarter — brand systems and product design for teams shaping something new.</p>
        </VG.Card>
      </section>

      <section style={{ borderTop: '1px solid var(--border-hairline)', maxWidth: 'var(--container)', margin: '0 auto', padding: '64px 48px', display: 'grid', gridTemplateColumns: '220px 1fr', gap: 48, alignItems: 'start' }}>
        <h2 style={{ fontSize: 24, fontWeight: 600, letterSpacing: '-0.02em', margin: 0 }}>Questions</h2>
        <VG.Accordion items={[
          { title: 'What do you work on?', content: 'Brand and product design for teams shaping new things — identity, interface and the systems that hold them together.' },
          { title: 'Where are you based?', content: 'Amsterdam, working remotely across European and US time zones.' },
          { title: 'Do you take freelance?', content: 'Yes — a couple of select engagements a quarter, usually 4–12 weeks.' },
          { title: "What's your process?", content: 'Brief, design, ship. Tight loops, working in the open, no black boxes.' },
        ]} />
      </section>

      <VG.Modal open={open} onClose={() => setOpen(false)} title="Start a project"
        footer={<><VG.Button variant="ghost" size="sm" onClick={() => setOpen(false)}>Cancel</VG.Button><VG.Button variant="accent" size="sm" onClick={() => setOpen(false)}>Send</VG.Button></>}>
        <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--text-secondary)', margin: '0 0 16px' }}>Tell me a little about what you're building and I'll get back within two days.</p>
        <VG.Input label="Email" placeholder="you@studio.com" wrapperStyle={{ marginBottom: 14 }} />
        <VG.Input label="Project" placeholder="A sentence or two" />
      </VG.Modal>
    </div>
  );
}
