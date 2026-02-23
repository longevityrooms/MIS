'use client';

import { PROJECT_BUDGET } from '@/lib/constants';
import AppShell from '@/components/AppShell';

const fmt$ = (v: number) => `$${(v / 1000).toFixed(0)}K`;

const DripfyFooter = () => (
  <div style={{ textAlign: 'center', padding: '20px 0 4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
    <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg,transparent,rgba(184,115,51,0.2))' }} />
    <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text-muted)', fontFamily: 'var(--f-body)', whiteSpace: 'nowrap' }}>
      Powered by <a href="https://dripfy.app" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--bronze)', textDecoration: 'none' }}>DRIPFY.APP</a>
    </span>
    <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg,rgba(184,115,51,0.2),transparent)' }} />
  </div>
);

export default function BudgetPage() {
  const { total, spent, committed, cats } = PROJECT_BUDGET;
  const available = total - spent - committed;
  const overallPercent = Math.round((spent / total) * 100);

  return (
    <AppShell>
      <div className="grid4">
        <div className="stat">
          <div className="stat-lbl">Gesamtbudget</div>
          <div className="stat-val">1,2 Mio. &euro;</div>
          <div className="stat-sub">Genehmigt</div>
        </div>
        <div className="stat">
          <div className="stat-lbl">Ausgegeben</div>
          <div className="stat-val">{fmt$(spent)}</div>
          <div className="stat-sub">{overallPercent}%</div>
          <div className="stat-chg up">Im Plan</div>
        </div>
        <div className="stat">
          <div className="stat-lbl">Gebunden</div>
          <div className="stat-val">{fmt$(committed)}</div>
          <div className="stat-sub">In Bestellung</div>
          <div className="stat-chg warn">Beobachten</div>
        </div>
        <div className="stat">
          <div className="stat-lbl">Verf&uuml;gbar</div>
          <div className="stat-val">{fmt$(available)}</div>
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
            <div key={cat.name} className="brow">
              <div className="b-dot" style={{ background: cat.color }} />
              <div className="b-name">{cat.name}</div>
              <div style={{ flex: 1, padding: '0 16px', minWidth: '80px' }}>
                <div className="pb" style={{ height: '4px' }}>
                  <div className="pb-fill" style={{ width: `${catPercent}%`, background: cat.color, height: '4px' }} />
                </div>
              </div>
              <div className="b-nums">
                <div className="b-sp">{fmt$(cat.spent)}</div>
                <div className="b-of">/ {fmt$(cat.budget)}</div>
              </div>
            </div>
          );
        })}
      </div>

      <DripfyFooter />
    </AppShell>
  );
}
