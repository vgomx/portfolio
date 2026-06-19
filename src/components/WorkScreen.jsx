import { useEffect, useState } from 'react';
import { Eyebrow } from './Chrome.jsx';

export default function WorkScreen({ projects }) {
  const [VG, setVG] = useState(null);
  const [discipline, setDiscipline] = useState('All');
  const [sort, setSort] = useState('recent');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const ns = window.VitorGomesDesignSystem_32625a;
    if (ns) { setVG(ns); return; }
    const t = setInterval(() => { if (window.VitorGomesDesignSystem_32625a) { setVG(window.VitorGomesDesignSystem_32625a); clearInterval(t); } }, 50);
    return () => clearInterval(t);
  }, []);

  if (!VG) return null;

  const disciplines = ['All', 'Branding', 'UX / UI', 'Visual Design'];
  let rows = projects.filter((p) => discipline === 'All' || p.discipline === discipline);
  rows = [...rows].sort((a, b) =>
    sort === 'az' ? a.title.localeCompare(b.title)
    : sort === 'oldest' ? a.year - b.year
    : b.year - a.year
  );

  return (
    <div>
      <section style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '72px 48px 40px' }}>
        <Eyebrow style={{ marginBottom: 18 }}>Index / {rows.length} projects</Eyebrow>
        <h1 style={{ fontSize: 'clamp(34px,5vw,56px)', lineHeight: 1, letterSpacing: '-0.03em', fontWeight: 700, margin: 0 }}>All work</h1>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginTop: 36 }}>
          <VG.SegmentedControl options={disciplines} value={discipline} onChange={(v) => { setDiscipline(v); setPage(1); }} />
          <VG.Menu label="Sort" value={sort} onSelect={setSort} align="right" items={[
            { label: 'Recent', value: 'recent' },
            { label: 'Oldest', value: 'oldest' },
            { label: 'A–Z', value: 'az' },
          ]} />
        </div>
      </section>

      <section style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '0 48px 80px' }}>
        <VG.Table
          columns={[
            { key: 'title', header: 'Project', width: '2.4fr', strong: true },
            { key: 'discipline', header: 'Discipline', width: '1.4fr', muted: true },
            { key: 'year', header: 'Year', width: '1fr', mono: true, muted: true },
            { key: 'status', header: 'Status', width: '0.9fr', align: 'right',
              render: (r) => <VG.Badge status={r.status}>{r.statusLabel}</VG.Badge> },
          ]}
          rows={rows}
          rowKey={(r) => r.slug}
          onRowClick={(r) => window.location.href = `/work/${r.slug}`}
        />
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
          <VG.Pagination total={Math.ceil(rows.length / 10)} page={page} onChange={setPage} />
        </div>
      </section>
    </div>
  );
}
