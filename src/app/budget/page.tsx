'use client';

import { useState } from 'react';
import AppShell from '@/components/AppShell';
import DetailModal from '@/components/DetailModal';
import { useData, BudgetCat } from '@/lib/DataContext';

const fmtEur = (v: number) => v >= 1000000 ? `€${(v / 1000000).toFixed(1)}M` : v >= 1000 ? `€${(v / 1000).toFixed(0)}K` : `€${v}`;

const COLORS = ['#2F4F4F', '#B87333', '#4d7c7c', '#c0392b', '#8b6914', '#5a8080', '#a0522d', '#4d6c6c', '#c49a6c', '#6b8e8e'];

type ModalContent = { title: string; body: React.ReactNode } | null;

const EMPTY_CAT: BudgetCat = { name: '', budget: 0, spent: 0, color: '#2F4F4F' };

export default function BudgetPage() {
  return <AppShell><BudgetContent /></AppShell>;
}

function BudgetContent() {
  const { budget, updateBudgetTotals, addBudgetCategory, updateBudgetCategory, deleteBudgetCategory, currentUser } = useData();
  const [modal, setModal] = useState<ModalContent>(null);
  const [showForm, setShowForm] = useState(false);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [form, setForm] = useState<BudgetCat>({ ...EMPTY_CAT });
  const [showTotalEdit, setShowTotalEdit] = useState(false);
  const [totalForm, setTotalForm] = useState({ total: budget.total, spent: budget.spent, committed: budget.committed });

  const isPM = currentUser?.role?.toUpperCase() === 'PM';
  const { total, spent, committed, cats } = budget;
  const available = total - spent - committed;
  const overallPercent = total > 0 ? Math.round((spent / total) * 100) : 0;

  const startAddCat = () => { setForm({ ...EMPTY_CAT, color: COLORS[cats.length % COLORS.length] }); setEditIdx(null); setShowForm(true); };
  const startEditCat = (i: number) => { setForm({ ...cats[i] }); setEditIdx(i); setShowForm(true); setModal(null); };
  const handleSave = () => {
    if (!form.name.trim()) return;
    if (editIdx !== null) updateBudgetCategory(editIdx, form);
    else addBudgetCategory(form);
    setShowForm(false); setEditIdx(null);
  };
  const handleDeleteCat = (i: number) => { deleteBudgetCategory(i); setModal(null); };

  const handleSaveTotals = () => {
    updateBudgetTotals(totalForm);
    setShowTotalEdit(false);
  };

  const openCat = (cat: BudgetCat, i: number) => {
    const catPercent = cat.budget > 0 ? Math.round((cat.spent / cat.budget) * 100) : 0;
    setModal({
      title: cat.name,
      body: (
        <>
          <div className="detail-field"><span className="detail-label">Budget</span><span className="detail-value">{fmtEur(cat.budget)}</span></div>
          <div className="detail-field"><span className="detail-label">Ausgegeben</span><span className="detail-value">{fmtEur(cat.spent)}</span></div>
          <div className="detail-field"><span className="detail-label">Verbrauch</span><span className="detail-value">{catPercent}%</span></div>
          <div className="detail-field"><span className="detail-label">Verbleibend</span><span className="detail-value" style={{ color: 'var(--forest)' }}>{fmtEur(cat.budget - cat.spent)}</span></div>
          <div className="pb" style={{ height: 8, margin: '12px 0' }}><div className="pb-fill" style={{ width: `${catPercent}%`, background: cat.color, height: 8 }} /></div>
          {isPM && (
            <div className="crud-actions" style={{ marginTop: 16 }}>
              <button className="crud-btn crud-btn-edit" onClick={() => startEditCat(i)}>✎ Bearbeiten</button>
              <button className="crud-btn crud-btn-delete" onClick={() => handleDeleteCat(i)}>✕ Löschen</button>
            </div>
          )}
        </>
      ),
    });
  };

  return (
    <>
      <div className="sec-hdr">
        <div className="sec-title">Budgetübersicht</div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {isPM && <button className="crud-btn crud-btn-primary" onClick={startAddCat}>+ Kategorie</button>}
          {isPM && <button className="crud-btn crud-btn-edit" onClick={() => { setTotalForm({ total, spent, committed }); setShowTotalEdit(true); }}>✎ Gesamt</button>}
          <div className="ornament">◆ ◆ ◆</div>
        </div>
      </div>

      <div className="grid4">
        <div className="stat"><div className="stat-lbl">Gesamtbudget</div><div className="stat-val">{fmtEur(total)}</div><div className="stat-sub">Genehmigt</div></div>
        <div className="stat"><div className="stat-lbl">Ausgegeben</div><div className="stat-val">{fmtEur(spent)}</div><div className="stat-sub">{overallPercent}%</div><div className="stat-chg up">Im Plan</div></div>
        <div className="stat"><div className="stat-lbl">Gebunden</div><div className="stat-val">{fmtEur(committed)}</div><div className="stat-sub">In Bestellung</div></div>
        <div className="stat"><div className="stat-lbl">Verfügbar</div><div className="stat-val">{fmtEur(available)}</div><div className="stat-sub">Verbleibend</div></div>
      </div>

      {/* Edit Totals Form */}
      {showTotalEdit && isPM && (
        <div className="glass-card" style={{ marginTop: 16 }}>
          <div className="card-title">Gesamtbudget bearbeiten</div>
          <div className="crud-form">
            <div className="crud-form-row">
              <div><label>Gesamtbudget (€)</label><input type="number" value={totalForm.total} onChange={e => setTotalForm(f => ({ ...f, total: +e.target.value }))} /></div>
              <div><label>Ausgegeben (€)</label><input type="number" value={totalForm.spent} onChange={e => setTotalForm(f => ({ ...f, spent: +e.target.value }))} /></div>
              <div><label>Gebunden (€)</label><input type="number" value={totalForm.committed} onChange={e => setTotalForm(f => ({ ...f, committed: +e.target.value }))} /></div>
            </div>
            <div className="crud-actions">
              <button className="crud-btn crud-btn-cancel" onClick={() => setShowTotalEdit(false)}>Abbrechen</button>
              <button className="crud-btn crud-btn-save" onClick={handleSaveTotals}>✓ Speichern</button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Category Form */}
      {showForm && isPM && (
        <div className="glass-card" style={{ marginTop: 16 }}>
          <div className="card-title">{editIdx !== null ? 'Kategorie bearbeiten' : 'Neue Kategorie'}</div>
          <div className="crud-form">
            <div><label>Name</label><input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Kategoriename..." /></div>
            <div className="crud-form-row">
              <div><label>Budget (€)</label><input type="number" value={form.budget} onChange={e => setForm(f => ({ ...f, budget: +e.target.value }))} /></div>
              <div><label>Ausgegeben (€)</label><input type="number" value={form.spent} onChange={e => setForm(f => ({ ...f, spent: +e.target.value }))} /></div>
            </div>
            <div><label>Farbe</label>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {COLORS.map(c => (
                  <div key={c} onClick={() => setForm(f => ({ ...f, color: c }))} style={{
                    width: 28, height: 28, borderRadius: '50%', background: c, cursor: 'pointer',
                    border: form.color === c ? '3px solid var(--text-dark)' : '2px solid transparent',
                    transition: 'border 0.15s',
                  }} />
                ))}
              </div>
            </div>
            <div className="crud-actions">
              <button className="crud-btn crud-btn-cancel" onClick={() => { setShowForm(false); setEditIdx(null); }}>Abbrechen</button>
              <button className="crud-btn crud-btn-save" onClick={handleSave}>✓ Speichern</button>
            </div>
          </div>
        </div>
      )}

      <div className="glass-card" style={{ marginTop: 16 }}>
        <div className="card-title">Budget nach Kategorie — {cats.length} Kategorien</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-light)', marginBottom: 6 }}>
          <span>Gesamtverbrauch</span><span>{overallPercent}%</span>
        </div>
        <div className="pb" style={{ height: 6 }}><div className="pb-fill" style={{ width: `${overallPercent}%`, height: 6 }} /></div>

        {cats.map((cat, i) => {
          const catPercent = cat.budget > 0 ? Math.round((cat.spent / cat.budget) * 100) : 0;
          return (
            <div key={i} className="brow" data-clickable onClick={() => openCat(cat, i)}>
              <div className="b-dot" style={{ background: cat.color }} />
              <div className="b-name">{cat.name}</div>
              <div style={{ flex: 1, padding: '0 16px', minWidth: 80 }}>
                <div className="pb" style={{ height: 4 }}><div className="pb-fill" style={{ width: `${catPercent}%`, background: cat.color, height: 4 }} /></div>
              </div>
              <div className="b-nums"><div className="b-sp">{fmtEur(cat.spent)}</div><div className="b-of">/ {fmtEur(cat.budget)}</div></div>
            </div>
          );
        })}
      </div>

      <div className="dripfy-footer" style={{ marginTop: 16 }}>Powered by <a href="https://dripfy.app" target="_blank" rel="noopener noreferrer">DRIPFY.APP</a></div>
      <DetailModal open={!!modal} onClose={() => setModal(null)} title={modal?.title || ''}>{modal?.body}</DetailModal>
    </>
  );
}
