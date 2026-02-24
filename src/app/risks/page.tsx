'use client';

import { useState } from 'react';
import AppShell from '@/components/AppShell';
import DetailModal from '@/components/DetailModal';
import { useData, RiskItem } from '@/lib/DataContext';

const barClass = (impact: string) => { switch (impact) { case 'critical': return 'rc'; case 'high': return 'rh'; default: return 'rm'; } };
const statusBadgeClass = (status: string) => { switch (status) { case 'active': return 'ra'; case 'watching': return 'rw'; case 'mitigation': return 'rmi'; default: return 'rw'; } };
const statusLabel = (status: string) => { switch (status) { case 'active': return 'AKTIV'; case 'watching': return 'MONITOR'; case 'mitigation': return 'MINDERUNG'; default: return status.toUpperCase(); } };
const impactLabel = (i: string) => { switch (i) { case 'critical': return 'Kritisch'; case 'high': return 'Hoch'; case 'medium': return 'Mittel'; default: return i; } };
const probLabel = (p: string) => { switch (p) { case 'high': return 'Hoch'; case 'medium': return 'Mittel'; case 'low': return 'Niedrig'; default: return p; } };

const EMPTY_RISK: RiskItem = { title: '', impact: 'medium' as const, prob: 'medium' as const, status: 'active' as const, owner: 'PM', mitigation: '' };

type ModalContent = { title: string; body: React.ReactNode } | null;

export default function RisksPage() {
  return <AppShell><RisksContent /></AppShell>;
}

function RisksContent() {
  const { risks, addRisk, updateRisk, deleteRisk, currentUser } = useData();
  const [modal, setModal] = useState<ModalContent>(null);
  const [showForm, setShowForm] = useState(false);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [form, setForm] = useState<RiskItem>({ ...EMPTY_RISK });

  const isPM = currentUser?.role?.toUpperCase() === 'PM';
  const activeCount = risks.filter(r => r.status === 'active').length;
  const criticalCount = risks.filter(r => r.impact === 'critical').length;

  const startAdd = () => { setForm({ ...EMPTY_RISK }); setEditIdx(null); setShowForm(true); };
  const startEdit = (i: number) => { setForm({ ...risks[i] }); setEditIdx(i); setShowForm(true); setModal(null); };
  const handleSave = () => {
    if (!form.title.trim()) return;
    if (editIdx !== null) updateRisk(editIdx, form);
    else addRisk(form);
    setShowForm(false); setEditIdx(null);
  };
  const handleDelete = (i: number) => { deleteRisk(i); setModal(null); };

  const openRisk = (r: RiskItem, i: number) => setModal({
    title: r.title,
    body: (
      <>
        <div className="detail-field"><span className="detail-label">Auswirkung</span><span className="detail-value">{impactLabel(r.impact)}</span></div>
        <div className="detail-field"><span className="detail-label">Wahrscheinlichkeit</span><span className="detail-value">{probLabel(r.prob)}</span></div>
        <div className="detail-field"><span className="detail-label">Status</span><span className="detail-value"><span className={`r-sb ${statusBadgeClass(r.status)}`}>{statusLabel(r.status)}</span></span></div>
        <div className="detail-field"><span className="detail-label">Verantwortlich</span><span className="detail-value">{r.owner}</span></div>
        {r.mitigation && (
          <div className="detail-section"><div className="detail-section-title">Minderungsstrategie</div><div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.6 }}>{r.mitigation}</div></div>
        )}
        {isPM && (
          <div className="crud-actions" style={{ marginTop: 16 }}>
            <button className="crud-btn crud-btn-edit" onClick={() => startEdit(i)}>✎ Bearbeiten</button>
            <button className="crud-btn crud-btn-delete" onClick={() => handleDelete(i)}>✕ Löschen</button>
          </div>
        )}
      </>
    ),
  });

  return (
    <>
      <div className="sec-hdr">
        <div className="sec-title">Risikoregister</div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {isPM && <button className="crud-btn crud-btn-primary" onClick={startAdd}>+ Neues Risiko</button>}
          <div className="ornament">◆ ◆ ◆</div>
        </div>
      </div>

      <div className="grid3">
        <div className="stat"><div className="stat-lbl">Gesamtrisiken</div><div className="stat-val">{risks.length}</div><div className="stat-sub">im Register</div></div>
        <div className="stat"><div className="stat-lbl">Aktive Risiken</div><div className="stat-val">{activeCount}</div><div className="stat-sub">erfordern Maßnahmen</div></div>
        <div className="stat"><div className="stat-lbl">Kritische Risiken</div><div className="stat-val">{criticalCount}</div><div className="stat-sub">höchste Schwere</div></div>
      </div>

      {showForm && isPM && (
        <div className="glass-card" style={{ marginTop: 16 }}>
          <div className="card-title">{editIdx !== null ? 'Risiko bearbeiten' : 'Neues Risiko'}</div>
          <div className="crud-form">
            <div><label>Titel</label><input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Risikoname..." /></div>
            <div className="crud-form-row">
              <div><label>Auswirkung</label><select value={form.impact} onChange={e => setForm(f => ({ ...f, impact: e.target.value as RiskItem['impact'] }))}>
                <option value="critical">Kritisch</option><option value="high">Hoch</option><option value="medium">Mittel</option><option value="low">Niedrig</option>
              </select></div>
              <div><label>Wahrscheinlichkeit</label><select value={form.prob} onChange={e => setForm(f => ({ ...f, prob: e.target.value as RiskItem['prob'] }))}>
                <option value="high">Hoch</option><option value="medium">Mittel</option><option value="low">Niedrig</option>
              </select></div>
            </div>
            <div className="crud-form-row">
              <div><label>Status</label><select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as RiskItem['status'] }))}>
                <option value="active">Aktiv</option><option value="watching">Monitor</option><option value="mitigation">Minderung</option>
              </select></div>
              <div><label>Verantwortlich</label><input value={form.owner} onChange={e => setForm(f => ({ ...f, owner: e.target.value }))} placeholder="z.B. PM, MD" /></div>
            </div>
            <div><label>Minderungsstrategie</label><textarea value={form.mitigation} onChange={e => setForm(f => ({ ...f, mitigation: e.target.value }))} placeholder="Minderungsmaßnahmen..." /></div>
            <div className="crud-actions">
              <button className="crud-btn crud-btn-cancel" onClick={() => { setShowForm(false); setEditIdx(null); }}>Abbrechen</button>
              <button className="crud-btn crud-btn-save" onClick={handleSave}>✓ Speichern</button>
            </div>
          </div>
        </div>
      )}

      <div className="glass-card" style={{ marginTop: 16 }}>
        <div className="card-title">Risikoregister — {risks.length} Risiken</div>
        {risks.map((r, i) => (
          <div key={i} className="risk" data-clickable onClick={() => openRisk(r, i)} style={{ cursor: 'pointer' }}>
            <div className={`r-bar ${barClass(r.impact)}`} />
            <div style={{ flex: 1 }}>
              <div className="r-ttl">{r.title}</div>
              <div className="r-own">Verantwortlich: {r.owner} · Auswirkung: {impactLabel(r.impact)} · Wahrscheinlichkeit: {probLabel(r.prob)}</div>
              {r.mitigation && (<div style={{ fontSize: 10, color: 'var(--text-light)', marginTop: 4, lineHeight: 1.5 }}><span style={{ color: 'var(--forest)', fontWeight: 700 }}>MINDERUNG:</span> {r.mitigation}</div>)}
            </div>
            <span className={`r-sb ${statusBadgeClass(r.status)}`}>{statusLabel(r.status)}</span>
          </div>
        ))}
      </div>

      <div className="dripfy-footer" style={{ marginTop: 16 }}>Powered by <a href="https://dripfy.app" target="_blank" rel="noopener noreferrer">DRIPFY.APP</a></div>
      <DetailModal open={!!modal} onClose={() => setModal(null)} title={modal?.title || ''}>{modal?.body}</DetailModal>
    </>
  );
}
