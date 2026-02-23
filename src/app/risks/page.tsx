'use client';

import { useState } from 'react';
import { PROJECT_RISKS } from '@/lib/constants';
import AppShell from '@/components/AppShell';
import DetailModal from '@/components/DetailModal';

const DripfyFooter = () => (
  <div style={{ textAlign: 'center', padding: '20px 0 4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
    <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg,transparent,rgba(184,115,51,0.2))' }} />
    <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text-muted)', fontFamily: 'var(--f-body)', whiteSpace: 'nowrap' }}>
      Powered by <a href="https://dripfy.app" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--bronze)', textDecoration: 'none' }}>DRIPFY.APP</a>
    </span>
    <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg,rgba(184,115,51,0.2),transparent)' }} />
  </div>
);

const barClass = (impact: string) => {
  switch (impact) { case 'critical': return 'rc'; case 'high': return 'rh'; case 'medium': return 'rm'; default: return 'rm'; }
};
const statusBadgeClass = (status: string) => {
  switch (status) { case 'active': return 'ra'; case 'watching': return 'rw'; case 'mitigation': return 'rmi'; default: return 'rw'; }
};
const statusLabel = (status: string) => {
  switch (status) { case 'active': return 'AKTIV'; case 'watching': return 'MONITOR'; case 'mitigation': return 'MINDERUNG'; default: return status.toUpperCase(); }
};
const impactLabel = (impact: string) => {
  switch (impact) { case 'critical': return 'Kritisch'; case 'high': return 'Hoch'; case 'medium': return 'Mittel'; case 'low': return 'Niedrig'; default: return impact; }
};
const probLabel = (prob: string) => {
  switch (prob) { case 'high': return 'Hoch'; case 'medium': return 'Mittel'; case 'low': return 'Niedrig'; default: return prob; }
};

type ModalContent = { title: string; body: React.ReactNode } | null;

export default function RisksPage() {
  const [modal, setModal] = useState<ModalContent>(null);
  const risks = PROJECT_RISKS;

  const totalCount = risks.length;
  const activeCount = risks.filter(r => r.status === 'active').length;
  const criticalCount = risks.filter(r => r.impact === 'critical').length;

  const openStatDetail = (label: string, filterFn: (r: typeof risks[0]) => boolean) => {
    const filtered = risks.filter(filterFn);
    setModal({
      title: `${label} (${filtered.length})`,
      body: (
        <>
          {filtered.map((r, i) => (
            <div key={i} style={{ padding: '10px 0', borderBottom: '1px solid rgba(184,115,51,0.08)' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{r.title}</div>
              <div style={{ fontSize: 10, color: 'var(--text-light)', marginTop: 2 }}>
                Auswirkung: {impactLabel(r.impact)} · Wahrscheinlichkeit: {probLabel(r.prob)} · {r.owner}
              </div>
              {r.mitigation && (
                <div style={{ fontSize: 10, color: 'var(--forest)', marginTop: 4, fontWeight: 600 }}>
                  MINDERUNG: <span style={{ fontWeight: 400, color: 'var(--text-light)' }}>{r.mitigation}</span>
                </div>
              )}
            </div>
          ))}
        </>
      ),
    });
  };

  const openRisk = (r: typeof risks[0]) => setModal({
    title: r.title,
    body: (
      <>
        <div className="detail-field"><span className="detail-label">Auswirkung</span><span className="detail-value">{impactLabel(r.impact)}</span></div>
        <div className="detail-field"><span className="detail-label">Wahrscheinlichkeit</span><span className="detail-value">{probLabel(r.prob)}</span></div>
        <div className="detail-field"><span className="detail-label">Status</span><span className="detail-value"><span className={`r-sb ${statusBadgeClass(r.status)}`}>{statusLabel(r.status)}</span></span></div>
        <div className="detail-field"><span className="detail-label">Verantwortlich</span><span className="detail-value">{r.owner}</span></div>
        {r.mitigation && (
          <div className="detail-section">
            <div className="detail-section-title">Minderungsstrategie</div>
            <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.6 }}>{r.mitigation}</div>
          </div>
        )}
      </>
    ),
  });

  return (
    <AppShell>
      <div className="sec-hdr">
        <div className="sec-title">Risikoregister</div>
        <div className="ornament">◆ ◆ ◆</div>
      </div>

      <div className="grid3">
        <div className="stat" data-clickable onClick={() => openStatDetail('Gesamtrisiken', () => true)}>
          <div className="stat-lbl">Gesamtrisiken</div>
          <div className="stat-val">{totalCount}</div>
          <div className="stat-sub">im Register</div>
        </div>
        <div className="stat" data-clickable onClick={() => openStatDetail('Aktive Risiken', r => r.status === 'active')}>
          <div className="stat-lbl">Aktive Risiken</div>
          <div className="stat-val">{activeCount}</div>
          <div className="stat-sub">erfordern Maßnahmen</div>
          <div className="stat-chg warn">Handlungsbedarf</div>
        </div>
        <div className="stat" data-clickable onClick={() => openStatDetail('Kritische Risiken', r => r.impact === 'critical')}>
          <div className="stat-lbl">Kritische Risiken</div>
          <div className="stat-val">{criticalCount}</div>
          <div className="stat-sub">höchste Schwere</div>
          <div className="stat-chg dn">Dauerüberwachung</div>
        </div>
      </div>

      <div className="glass-card" style={{ marginTop: '16px' }}>
        <div className="card-title">Risikoregister</div>
        {risks.map((r, i) => (
          <div key={i} className="risk" data-clickable onClick={() => openRisk(r)} style={{ cursor: 'pointer' }}>
            <div className={`r-bar ${barClass(r.impact)}`} />
            <div style={{ flex: 1 }}>
              <div className="r-ttl">{r.title}</div>
              <div className="r-own">
                Verantwortlich: {r.owner} · Auswirkung: {impactLabel(r.impact)} · Wahrscheinlichkeit: {probLabel(r.prob)}
              </div>
              {r.mitigation && (
                <div style={{ fontSize: '10px', color: 'var(--text-light)', marginTop: '4px', lineHeight: 1.5 }}>
                  <span style={{ color: 'var(--forest)', fontWeight: 700, letterSpacing: '0.5px' }}>MINDERUNG:</span> {r.mitigation}
                </div>
              )}
            </div>
            <span className={`r-sb ${statusBadgeClass(r.status)}`}>{statusLabel(r.status)}</span>
          </div>
        ))}
      </div>

      <DripfyFooter />

      <DetailModal open={!!modal} onClose={() => setModal(null)} title={modal?.title || ''}>
        {modal?.body}
      </DetailModal>
    </AppShell>
  );
}
