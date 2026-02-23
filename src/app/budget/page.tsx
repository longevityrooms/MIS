'use client';

import { useState } from 'react';
import { PROJECT_BUDGET } from '@/lib/constants';
import AppShell from '@/components/AppShell';
import DetailModal from '@/components/DetailModal';

const fmtEur = (v: number) => v >= 1000000 ? `€${(v / 1000000).toFixed(1)}M` : `€${(v / 1000).toFixed(0)}K`;

const DripfyFooter = () => (
  <div style={{ textAlign: 'center', padding: '20px 0 4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
    <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg,transparent,rgba(184,115,51,0.2))' }} />
    <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text-muted)', fontFamily: 'var(--f-body)', whiteSpace: 'nowrap' }}>
      Powered by <a href="https://dripfy.app" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--bronze)', textDecoration: 'none' }}>DRIPFY.APP</a>
    </span>
    <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg,rgba(184,115,51,0.2),transparent)' }} />
  </div>
);

type ModalContent = { title: string; body: React.ReactNode } | null;

export default function BudgetPage() {
  const [modal, setModal] = useState<ModalContent>(null);
  const { total, spent, committed, cats } = PROJECT_BUDGET;
  const available = total - spent - committed;
  const overallPercent = Math.round((spent / total) * 100);

  const openBudgetTotal = () => setModal({
    title: 'Gesamtbudget',
    body: (
      <>
        <div className="detail-field"><span className="detail-label">Genehmigt</span><span className="detail-value">{fmtEur(total)}</span></div>
        <div className="detail-field"><span className="detail-label">Ausgegeben</span><span className="detail-value">{fmtEur(spent)}</span></div>
        <div className="detail-field"><span className="detail-label">Gebunden</span><span className="detail-value">{fmtEur(committed)}</span></div>
        <div className="detail-field"><span className="detail-label">Verfügbar</span><span className="detail-value" style={{ color: 'var(--forest)' }}>{fmtEur(available)}</span></div>
        <div className="detail-section">
          <div className="detail-section-title">Alle Kategorien</div>
          {cats.map((c, i) => {
            const pct = c.budget > 0 ? Math.round((c.spent / c.budget) * 100) : 0;
            return (
              <div key={i} className="detail-field">
                <span className="detail-label" style={{ color: c.color }}>{c.name}</span>
                <span className="detail-value">{fmtEur(c.spent)} / {fmtEur(c.budget)} ({pct}%)</span>
              </div>
            );
          })}
        </div>
      </>
    ),
  });

  const openSpent = () => setModal({
    title: 'Ausgegeben',
    body: (
      <>
        <div className="detail-field"><span className="detail-label">Betrag</span><span className="detail-value">{fmtEur(spent)}</span></div>
        <div className="detail-field"><span className="detail-label">Anteil</span><span className="detail-value">{overallPercent}%</span></div>
        <div className="detail-field"><span className="detail-label">Status</span><span className="detail-value" style={{ color: 'var(--forest)' }}>Im Plan</span></div>
        <div className="detail-section">
          <div className="detail-section-title">Ausgaben nach Kategorie</div>
          {cats.filter(c => c.spent > 0).map((c, i) => (
            <div key={i} className="detail-field">
              <span className="detail-label" style={{ color: c.color }}>{c.name}</span>
              <span className="detail-value">{fmtEur(c.spent)}</span>
            </div>
          ))}
        </div>
      </>
    ),
  });

  const openCommitted = () => setModal({
    title: 'Gebundene Mittel',
    body: (
      <>
        <div className="detail-field"><span className="detail-label">Betrag</span><span className="detail-value">{fmtEur(committed)}</span></div>
        <div className="detail-field"><span className="detail-label">Status</span><span className="detail-value" style={{ color: 'var(--bronze)' }}>In Bestellung</span></div>
        <div className="detail-field"><span className="detail-label">Hinweis</span><span className="detail-value">Bestellte Geräte & Dienstleistungen, noch nicht geliefert/abgerechnet</span></div>
      </>
    ),
  });

  const openAvailable = () => setModal({
    title: 'Verfügbares Budget',
    body: (
      <>
        <div className="detail-field"><span className="detail-label">Verfügbar</span><span className="detail-value" style={{ color: 'var(--forest)' }}>{fmtEur(available)}</span></div>
        <div className="detail-field"><span className="detail-label">Gesamtbudget</span><span className="detail-value">{fmtEur(total)}</span></div>
        <div className="detail-field"><span className="detail-label">Bereits gebunden</span><span className="detail-value">{fmtEur(spent + committed)}</span></div>
        <div className="detail-field"><span className="detail-label">Reserve</span><span className="detail-value">{Math.round((available / total) * 100)}% des Budgets</span></div>
      </>
    ),
  });

  const openCat = (cat: typeof cats[0]) => {
    const catPercent = cat.budget > 0 ? Math.round((cat.spent / cat.budget) * 100) : 0;
    setModal({
      title: cat.name,
      body: (
        <>
          <div className="detail-field"><span className="detail-label">Budget</span><span className="detail-value">{fmtEur(cat.budget)}</span></div>
          <div className="detail-field"><span className="detail-label">Ausgegeben</span><span className="detail-value">{fmtEur(cat.spent)}</span></div>
          <div className="detail-field"><span className="detail-label">Verbrauch</span><span className="detail-value">{catPercent}%</span></div>
          <div className="detail-field"><span className="detail-label">Verbleibend</span><span className="detail-value" style={{ color: 'var(--forest)' }}>{fmtEur(cat.budget - cat.spent)}</span></div>
          <div className="pb" style={{ height: 8, margin: '12px 0' }}>
            <div className="pb-fill" style={{ width: `${catPercent}%`, background: cat.color, height: 8 }} />
          </div>
        </>
      ),
    });
  };

  return (
    <AppShell>
      <div className="grid4">
        <div className="stat" data-clickable onClick={openBudgetTotal}>
          <div className="stat-lbl">Gesamtbudget</div>
          <div className="stat-val">{fmtEur(total)}</div>
          <div className="stat-sub">Genehmigt</div>
        </div>
        <div className="stat" data-clickable onClick={openSpent}>
          <div className="stat-lbl">Ausgegeben</div>
          <div className="stat-val">{fmtEur(spent)}</div>
          <div className="stat-sub">{overallPercent}%</div>
          <div className="stat-chg up">Im Plan</div>
        </div>
        <div className="stat" data-clickable onClick={openCommitted}>
          <div className="stat-lbl">Gebunden</div>
          <div className="stat-val">{fmtEur(committed)}</div>
          <div className="stat-sub">In Bestellung</div>
          <div className="stat-chg warn">Beobachten</div>
        </div>
        <div className="stat" data-clickable onClick={openAvailable}>
          <div className="stat-lbl">Verfügbar</div>
          <div className="stat-val">{fmtEur(available)}</div>
          <div className="stat-sub">Verbleibend</div>
        </div>
      </div>

      <div className="glass-card">
        <div className="card-title">Budget nach Kategorie</div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-light)', marginBottom: '6px' }}>
          <span>Gesamtverbrauch</span>
          <span>{overallPercent}%</span>
        </div>
        <div className="pb">
          <div className="pb-fill" style={{ width: `${overallPercent}%` }} />
        </div>

        {cats.map((cat) => {
          const catPercent = cat.budget > 0 ? Math.round((cat.spent / cat.budget) * 100) : 0;
          return (
            <div key={cat.name} className="brow" data-clickable onClick={() => openCat(cat)}>
              <div className="b-dot" style={{ background: cat.color }} />
              <div className="b-name">{cat.name}</div>
              <div style={{ flex: 1, padding: '0 16px', minWidth: '80px' }}>
                <div className="pb" style={{ height: '4px' }}>
                  <div className="pb-fill" style={{ width: `${catPercent}%`, background: cat.color, height: '4px' }} />
                </div>
              </div>
              <div className="b-nums">
                <div className="b-sp">{fmtEur(cat.spent)}</div>
                <div className="b-of">/ {fmtEur(cat.budget)}</div>
              </div>
            </div>
          );
        })}
      </div>

      <DripfyFooter />

      <DetailModal open={!!modal} onClose={() => setModal(null)} title={modal?.title || ''}>
        {modal?.body}
      </DetailModal>
    </AppShell>
  );
}
