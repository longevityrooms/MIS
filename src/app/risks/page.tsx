'use client';

import { PROJECT_RISKS } from '@/lib/constants';
import AppShell from '@/components/AppShell';

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

export default function RisksPage() {
  const risks = PROJECT_RISKS;

  const totalCount = risks.length;
  const activeCount = risks.filter(r => r.status === 'active').length;
  const criticalCount = risks.filter(r => r.impact === 'critical').length;

  return (
    <AppShell>
      <div className="sec-hdr">
        <div className="sec-title">Risikoregister</div>
        <div className="ornament">◆ ◆ ◆</div>
      </div>

      <div className="grid3">
        <div className="stat">
          <div className="stat-lbl">Gesamtrisiken</div>
          <div className="stat-val">{totalCount}</div>
          <div className="stat-sub">im Register</div>
        </div>
        <div className="stat">
          <div className="stat-lbl">Aktive Risiken</div>
          <div className="stat-val">{activeCount}</div>
          <div className="stat-sub">erfordern Maßnahmen</div>
          <div className="stat-chg warn">Handlungsbedarf</div>
        </div>
        <div className="stat">
          <div className="stat-lbl">Kritische Risiken</div>
          <div className="stat-val">{criticalCount}</div>
          <div className="stat-sub">höchste Schwere</div>
          <div className="stat-chg dn">Dauerüberwachung</div>
        </div>
      </div>

      <div className="glass-card" style={{ marginTop: '16px' }}>
        <div className="card-title">Risikoregister</div>
        {risks.map((r, i) => (
          <div key={i} className="risk">
            <div className={`r-bar ${barClass(r.impact)}`} />
            <div style={{ flex: 1 }}>
              <div className="r-ttl">{r.title}</div>
              <div className="r-own">
                Verantwortlich: {r.owner} · Auswirkung: {impactLabel(r.impact)} · Wahrscheinlichkeit: {probLabel(r.prob)}
              </div>
            </div>
            <span className={`r-sb ${statusBadgeClass(r.status)}`}>{statusLabel(r.status)}</span>
          </div>
        ))}
      </div>

      <DripfyFooter />
    </AppShell>
  );
}
