'use client';

import AppShell from '@/components/AppShell';
import { PHASES, MILESTONES, PROJECT_TASKS, PROJECT_RISKS, PROJECT_BUDGET } from '@/lib/constants';

const fmtEur = (v: number) => v >= 1000000 ? `€${(v / 1000000).toFixed(1)}M` : `€${(v / 1000).toFixed(0)}K`;

export default function DashboardPage() {
  const totalSpent = PROJECT_BUDGET.spent;
  const totalCommitted = PROJECT_BUDGET.committed;
  const totalBudget = PROJECT_BUDGET.total;
  const available = totalBudget - totalSpent - totalCommitted;
  const budgetPct = Math.round((totalSpent / totalBudget) * 100);

  const openTasks = PROJECT_TASKS.filter(t => t.status !== 'done').length;
  const activeRisks = PROJECT_RISKS.filter(r => r.status === 'active').length;

  const priorityBadge = (p: string) => {
    switch (p) {
      case 'critical': return 'pc';
      case 'high': return 'pc';
      case 'medium': return 'ph2';
      default: return 'pm2';
    }
  };

  const priorityLabel = (p: string) => {
    switch (p) {
      case 'critical': return 'Kritisch';
      case 'high': return 'Hoch';
      case 'medium': return 'Mittel';
      default: return 'Niedrig';
    }
  };

  const statusBadge = (s: string) => {
    switch (s) {
      case 'done': return 'sd';
      case 'in_progress': return 'sp';
      case 'blocked': return 'sbl';
      default: return 'sw';
    }
  };

  const statusLabel = (s: string) => {
    switch (s) {
      case 'done': return 'Abgeschlossen';
      case 'in_progress': return 'In Bearbeitung';
      case 'blocked': return 'Blockiert';
      case 'not_started': return 'Offen';
      default: return s;
    }
  };

  const msIcon = (status: 'done' | 'active' | 'pending') => {
    switch (status) {
      case 'done': return '✓';
      case 'active': return '◉';
      case 'pending': return '○';
    }
  };

  return (
    <AppShell>
      <div className="sec-hdr">
        <div className="sec-title">Dashboard</div>
        <div className="ornament">◆ ◆ ◆</div>
      </div>

      {/* ── 4 Stat Cards ────────────────────────────────── */}
      <div className="grid4">
        <div className="stat">
          <div className="stat-lbl">Gesamtfortschritt</div>
          <div className="stat-val">37%</div>
          <div className="stat-sub">Woche 9 von 18</div>
          <div className="stat-chg up">↑ +5% diese Woche</div>
        </div>
        <div className="stat">
          <div className="stat-lbl">Budget genutzt</div>
          <div className="stat-val" style={{ color: 'var(--bronze)' }}>{fmtEur(totalSpent)}</div>
          <div className="stat-sub">von {fmtEur(totalBudget)} gesamt</div>
          <div className="stat-chg warn">{budgetPct}% ausgeschöpft</div>
        </div>
        <div className="stat">
          <div className="stat-lbl">Offene Aufgaben</div>
          <div className="stat-val">{openTasks}</div>
          <div className="stat-sub">von {PROJECT_TASKS.length} insgesamt</div>
          <div className="stat-chg warn">{PROJECT_TASKS.filter(t => t.priority === 'critical').length} kritisch</div>
        </div>
        <div className="stat">
          <div className="stat-lbl">Aktive Risiken</div>
          <div className="stat-val">{activeRisks}</div>
          <div className="stat-sub">von {PROJECT_RISKS.length} insgesamt</div>
          <div className="stat-chg warn">1 kritisch</div>
        </div>
      </div>

      {/* ── Phasenübersicht + Meilenstein-Tracker ───────── */}
      <div className="grid2" style={{ marginTop: 16 }}>
        {/* Left: Phasenübersicht */}
        <div className="glass-card">
          <div className="card-title">Phasenübersicht</div>
          {PHASES.map((p) => (
            <div key={p.id} className="phase-row">
              <div className="ph-dot" style={{ background: p.color }} />
              <div className="ph-info">
                <div className="ph-name">
                  {p.name}{' '}
                  <span style={{ fontSize: 10, color: 'var(--bronze)', fontWeight: 700, letterSpacing: '0.5px' }}>
                    {p.weeks}
                  </span>
                </div>
                <div className="pb" style={{ height: 6 }}>
                  <div
                    className="pb-fill"
                    style={{ width: `${p.progress}%`, background: p.color, height: 6 }}
                  />
                </div>
                <div className="ph-meta">{p.progress}% abgeschlossen</div>
              </div>
              <div className="ph-pct" style={{ color: p.color }}>{p.progress}%</div>
            </div>
          ))}
        </div>

        {/* Right: Meilenstein-Tracker */}
        <div className="glass-card">
          <div className="card-title">Meilenstein-Tracker</div>
          {MILESTONES.map((m, i) => (
            <div key={i} className="ms-row">
              <div className={`ms-ic ${m.status === 'done' ? 'ms-done' : m.status === 'active' ? 'ms-active' : 'ms-pending'}`}>
                {msIcon(m.status)}
              </div>
              <div className="ms-ttl">{m.title}</div>
              <div className="ms-dt">{m.date}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Kritische Aufgaben + Budgetübersicht ────────── */}
      <div className="grid2" style={{ marginTop: 16 }}>
        {/* Left: Kritische Aufgaben */}
        <div className="glass-card">
          <div className="card-title">Kritische Aufgaben</div>
          {PROJECT_TASKS
            .filter(t => t.priority === 'high' || t.priority === 'critical')
            .map((t, i) => (
              <div key={i} className="task">
                <div className="task-hdr">
                  <div className="task-ttl">{t.title}</div>
                  <span className={`pb-badge ${priorityBadge(t.priority)}`}>{priorityLabel(t.priority)}</span>
                </div>
                <div className="task-meta">
                  <span className={`sb ${statusBadge(t.status)}`}>{statusLabel(t.status)}</span>
                  <span>· Fällig {t.due}</span>
                </div>
                <div className="pb" style={{ height: 4 }}>
                  <div className="pb-fill" style={{ width: `${t.progress}%`, background: 'var(--forest)', height: 4 }} />
                </div>
                <div style={{ fontSize: 10, color: 'var(--text-light)', marginTop: 4, letterSpacing: '0.5px' }}>
                  {t.progress}% abgeschlossen
                </div>
              </div>
            ))}
        </div>

        {/* Right: Budgetübersicht */}
        <div className="glass-card">
          <div className="card-title">Budgetübersicht</div>
          <div style={{ display: 'flex', gap: 14, marginBottom: 18 }}>
            {[
              { label: 'Ausgegeben', value: totalSpent, color: 'var(--forest)' },
              { label: 'Gebunden', value: totalCommitted, color: 'var(--bronze)' },
              { label: 'Verfügbar', value: available, color: 'var(--forest2)' },
            ].map((item) => (
              <div key={item.label} style={{ flex: 1 }}>
                <div style={{ fontSize: 10, color: 'var(--bronze)', letterSpacing: 1, textTransform: 'uppercase', fontWeight: 700, marginBottom: 4 }}>
                  {item.label}
                </div>
                <div style={{ fontFamily: 'var(--f-head)', fontSize: 20, fontWeight: 600, color: item.color }}>
                  {fmtEur(item.value)}
                </div>
              </div>
            ))}
          </div>
          <div className="pb" style={{ height: 10 }}>
            <div className="pb-fill" style={{ width: `${budgetPct}%`, background: 'var(--forest)', height: 10 }} />
          </div>
          <div style={{ fontSize: 10, color: 'var(--text-light)', marginTop: 5, marginBottom: 16, letterSpacing: '0.5px' }}>
            {budgetPct}% des Gesamtbudgets genutzt
          </div>
          {PROJECT_BUDGET.cats.map((c, i) => (
            <div key={i} className="brow">
              <div className="b-dot" style={{ background: c.color }} />
              <div className="b-name">{c.name}</div>
              <div className="b-nums">
                <div className="b-sp">{fmtEur(c.spent)}</div>
                <div className="b-of">/ {fmtEur(c.budget)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Dripfy Footer ───────────────────────────────── */}
      <div className="dripfy-footer" style={{ marginTop: 16 }}>
        Powered by <a href="https://dripfy.app" target="_blank" rel="noopener noreferrer">DRIPFY.APP</a>
      </div>
    </AppShell>
  );
}
