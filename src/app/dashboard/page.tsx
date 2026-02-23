'use client';

import { useState } from 'react';
import AppShell from '@/components/AppShell';
import DetailModal from '@/components/DetailModal';
import { PHASES, MILESTONES, PROJECT_TASKS, PROJECT_RISKS, PROJECT_BUDGET } from '@/lib/constants';

const fmtEur = (v: number) => v >= 1000000 ? `€${(v / 1000000).toFixed(1)}M` : `€${(v / 1000).toFixed(0)}K`;
const impactLabel = (s: string) => { switch (s) { case 'critical': return 'Kritisch'; case 'high': return 'Hoch'; case 'medium': return 'Mittel'; default: return s; } };
const probLbl = (s: string) => { switch (s) { case 'high': return 'Hoch'; case 'medium': return 'Mittel'; case 'low': return 'Niedrig'; default: return s; } };

type ModalContent = { title: string; body: React.ReactNode } | null;

export default function DashboardPage() {
  const [modal, setModal] = useState<ModalContent>(null);

  const totalSpent = PROJECT_BUDGET.spent;
  const totalCommitted = PROJECT_BUDGET.committed;
  const totalBudget = PROJECT_BUDGET.total;
  const available = totalBudget - totalSpent - totalCommitted;
  const budgetPct = Math.round((totalSpent / totalBudget) * 100);

  const openTasks = PROJECT_TASKS.filter(t => t.status !== 'done').length;
  const activeRisks = PROJECT_RISKS.filter(r => r.status === 'active').length;
  const criticalTasks = PROJECT_TASKS.filter(t => t.priority === 'critical');
  const doneTasks = PROJECT_TASKS.filter(t => t.status === 'done').length;

  const priorityBadge = (p: string) => {
    switch (p) { case 'critical': return 'pc'; case 'high': return 'pc'; case 'medium': return 'ph2'; default: return 'pm2'; }
  };
  const priorityLabel = (p: string) => {
    switch (p) { case 'critical': return 'Kritisch'; case 'high': return 'Hoch'; case 'medium': return 'Mittel'; default: return 'Niedrig'; }
  };
  const statusBadge = (s: string) => {
    switch (s) { case 'done': return 'sd'; case 'in_progress': return 'sp'; case 'blocked': return 'sbl'; default: return 'sw'; }
  };
  const statusLabel = (s: string) => {
    switch (s) { case 'done': return 'Abgeschlossen'; case 'in_progress': return 'In Bearbeitung'; case 'blocked': return 'Blockiert'; case 'not_started': return 'Offen'; default: return s; }
  };
  const msIcon = (status: 'done' | 'active' | 'pending') => {
    switch (status) { case 'done': return '✓'; case 'active': return '◉'; case 'pending': return '○'; }
  };

  // ── Modal openers ──────────────────────────────────────────

  const openProgress = () => setModal({
    title: 'Gesamtfortschritt',
    body: (
      <>
        <div className="detail-field"><span className="detail-label">Status</span><span className="detail-value">Woche 9 von 18</span></div>
        <div className="detail-field"><span className="detail-label">Fortschritt</span><span className="detail-value">37%</span></div>
        <div className="detail-field"><span className="detail-label">Trend</span><span className="detail-value" style={{ color: 'var(--forest)' }}>↑ +5% diese Woche</span></div>
        <div className="detail-section">
          <div className="detail-section-title">Phasendetails</div>
          {PHASES.map(p => (
            <div key={p.id} className="detail-field">
              <span className="detail-label" style={{ color: p.color }}>{p.name}</span>
              <span className="detail-value">{p.progress}% — {p.weeks}</span>
            </div>
          ))}
        </div>
        <div className="detail-section">
          <div className="detail-section-title">Aufgaben-Übersicht</div>
          <div className="detail-field"><span className="detail-label">Gesamt</span><span className="detail-value">{PROJECT_TASKS.length}</span></div>
          <div className="detail-field"><span className="detail-label">Abgeschlossen</span><span className="detail-value">{doneTasks}</span></div>
          <div className="detail-field"><span className="detail-label">In Bearbeitung</span><span className="detail-value">{PROJECT_TASKS.filter(t => t.status === 'in_progress').length}</span></div>
          <div className="detail-field"><span className="detail-label">Nicht begonnen</span><span className="detail-value">{PROJECT_TASKS.filter(t => t.status === 'not_started').length}</span></div>
        </div>
      </>
    ),
  });

  const openBudgetStat = () => setModal({
    title: 'Budgetübersicht',
    body: (
      <>
        <div className="detail-field"><span className="detail-label">Gesamtbudget</span><span className="detail-value">{fmtEur(totalBudget)}</span></div>
        <div className="detail-field"><span className="detail-label">Ausgegeben</span><span className="detail-value">{fmtEur(totalSpent)}</span></div>
        <div className="detail-field"><span className="detail-label">Gebunden</span><span className="detail-value">{fmtEur(totalCommitted)}</span></div>
        <div className="detail-field"><span className="detail-label">Verfügbar</span><span className="detail-value" style={{ color: 'var(--forest)' }}>{fmtEur(available)}</span></div>
        <div className="detail-field"><span className="detail-label">Verbrauch</span><span className="detail-value">{budgetPct}%</span></div>
        <div className="detail-section">
          <div className="detail-section-title">Nach Kategorie</div>
          {PROJECT_BUDGET.cats.map((c, i) => {
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

  const openOpenTasks = () => setModal({
    title: `Offene Aufgaben (${openTasks})`,
    body: (
      <>
        <div className="detail-field"><span className="detail-label">Gesamt offen</span><span className="detail-value">{openTasks}</span></div>
        <div className="detail-field"><span className="detail-label">Kritisch</span><span className="detail-value" style={{ color: '#c83232' }}>{criticalTasks.length}</span></div>
        <div className="detail-section">
          <div className="detail-section-title">Alle offenen Aufgaben</div>
          {PROJECT_TASKS.filter(t => t.status !== 'done').map((t, i) => (
            <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid rgba(184,115,51,0.08)' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{t.title}</div>
              <div style={{ fontSize: 10, color: 'var(--text-light)', marginTop: 2 }}>
                Phase {t.phase} · {priorityLabel(t.priority)} · {statusLabel(t.status)} · Fällig {t.due}
              </div>
              <div className="pb" style={{ height: 3, marginTop: 4 }}>
                <div className="pb-fill" style={{ width: `${t.progress}%`, background: 'var(--forest)', height: 3 }} />
              </div>
            </div>
          ))}
        </div>
      </>
    ),
  });

  const openActiveRisks = () => setModal({
    title: `Aktive Risiken (${activeRisks})`,
    body: (
      <>
        {PROJECT_RISKS.filter(r => r.status === 'active').map((r, i) => (
          <div key={i} style={{ padding: '10px 0', borderBottom: '1px solid rgba(184,115,51,0.08)' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{r.title}</div>
            <div style={{ fontSize: 10, color: 'var(--text-light)', marginTop: 2 }}>
              Auswirkung: {impactLabel(r.impact)} · Wahrscheinlichkeit: {probLbl(r.prob)} · {r.owner}
            </div>
            {r.mitigation && (
              <div style={{ fontSize: 10, color: 'var(--forest)', marginTop: 4, fontWeight: 600 }}>MINDERUNG: <span style={{ fontWeight: 400, color: 'var(--text-light)' }}>{r.mitigation}</span></div>
            )}
          </div>
        ))}
      </>
    ),
  });

  const openPhase = (p: typeof PHASES[0]) => setModal({
    title: p.name,
    body: (
      <>
        <div className="detail-field"><span className="detail-label">Zeitraum</span><span className="detail-value">{p.weeks}</span></div>
        <div className="detail-field"><span className="detail-label">Fortschritt</span><span className="detail-value" style={{ color: p.color }}>{p.progress}%</span></div>
        <div className="pb" style={{ height: 8, margin: '8px 0' }}>
          <div className="pb-fill" style={{ width: `${p.progress}%`, background: p.color, height: 8 }} />
        </div>
        <div className="detail-section">
          <div className="detail-section-title">Aufgaben in dieser Phase</div>
          {PROJECT_TASKS.filter(t => t.phase === p.id).map((t, i) => (
            <div key={i} style={{ padding: '6px 0', borderBottom: '1px solid rgba(184,115,51,0.06)' }}>
              <div style={{ fontSize: 12, color: 'var(--text)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>{t.title}</span>
                <span className={`sb ${statusBadge(t.status)}`} style={{ fontSize: 9, marginLeft: 8, flexShrink: 0 }}>{statusLabel(t.status)}</span>
              </div>
            </div>
          ))}
        </div>
      </>
    ),
  });

  const openMilestone = (m: typeof MILESTONES[0]) => setModal({
    title: m.title,
    body: (
      <>
        <div className="detail-field"><span className="detail-label">Termin</span><span className="detail-value">{m.date}</span></div>
        <div className="detail-field"><span className="detail-label">Status</span>
          <span className="detail-value" style={{ color: m.status === 'done' ? 'var(--forest)' : m.status === 'active' ? 'var(--bronze)' : 'var(--text-light)' }}>
            {m.status === 'done' ? '✓ Abgeschlossen' : m.status === 'active' ? '◉ Aktiv' : '○ Ausstehend'}
          </span>
        </div>
      </>
    ),
  });

  const openTask = (t: typeof PROJECT_TASKS[0]) => setModal({
    title: t.title,
    body: (
      <>
        <div className="detail-field"><span className="detail-label">Phase</span><span className="detail-value">Phase {t.phase}</span></div>
        <div className="detail-field"><span className="detail-label">Priorität</span><span className="detail-value"><span className={`pb-badge ${priorityBadge(t.priority)}`}>{priorityLabel(t.priority)}</span></span></div>
        <div className="detail-field"><span className="detail-label">Status</span><span className="detail-value"><span className={`sb ${statusBadge(t.status)}`}>{statusLabel(t.status)}</span></span></div>
        <div className="detail-field"><span className="detail-label">Fällig</span><span className="detail-value">{t.due}</span></div>
        <div className="detail-field"><span className="detail-label">Verantwortlich</span><span className="detail-value">{t.owner?.toUpperCase()}</span></div>
        <div className="detail-field"><span className="detail-label">Fortschritt</span><span className="detail-value">{t.progress}%</span></div>
        <div className="pb" style={{ height: 6, margin: '4px 0 0' }}>
          <div className="pb-fill" style={{ width: `${t.progress}%`, background: 'var(--forest)', height: 6 }} />
        </div>
      </>
    ),
  });

  const openBudgetCat = (c: typeof PROJECT_BUDGET.cats[0]) => {
    const pct = c.budget > 0 ? Math.round((c.spent / c.budget) * 100) : 0;
    setModal({
      title: c.name,
      body: (
        <>
          <div className="detail-field"><span className="detail-label">Budget</span><span className="detail-value">{fmtEur(c.budget)}</span></div>
          <div className="detail-field"><span className="detail-label">Ausgegeben</span><span className="detail-value">{fmtEur(c.spent)}</span></div>
          <div className="detail-field"><span className="detail-label">Verbrauch</span><span className="detail-value">{pct}%</span></div>
          <div className="detail-field"><span className="detail-label">Verbleibend</span><span className="detail-value" style={{ color: 'var(--forest)' }}>{fmtEur(c.budget - c.spent)}</span></div>
          <div className="pb" style={{ height: 8, margin: '8px 0' }}>
            <div className="pb-fill" style={{ width: `${pct}%`, background: c.color, height: 8 }} />
          </div>
        </>
      ),
    });
  };

  return (
    <AppShell>
      <div className="sec-hdr">
        <div className="sec-title">Dashboard</div>
        <div className="ornament">◆ ◆ ◆</div>
      </div>

      {/* ── 4 Stat Cards ────────────────────────────────── */}
      <div className="grid4">
        <div className="stat" data-clickable onClick={openProgress}>
          <div className="stat-lbl">Gesamtfortschritt</div>
          <div className="stat-val">37%</div>
          <div className="stat-sub">Woche 9 von 18</div>
          <div className="stat-chg up">↑ +5% diese Woche</div>
        </div>
        <div className="stat" data-clickable onClick={openBudgetStat}>
          <div className="stat-lbl">Budget genutzt</div>
          <div className="stat-val" style={{ color: 'var(--bronze)' }}>{fmtEur(totalSpent)}</div>
          <div className="stat-sub">von {fmtEur(totalBudget)} gesamt</div>
          <div className="stat-chg warn">{budgetPct}% ausgeschöpft</div>
        </div>
        <div className="stat" data-clickable onClick={openOpenTasks}>
          <div className="stat-lbl">Offene Aufgaben</div>
          <div className="stat-val">{openTasks}</div>
          <div className="stat-sub">von {PROJECT_TASKS.length} insgesamt</div>
          <div className="stat-chg warn">{criticalTasks.length} kritisch</div>
        </div>
        <div className="stat" data-clickable onClick={openActiveRisks}>
          <div className="stat-lbl">Aktive Risiken</div>
          <div className="stat-val">{activeRisks}</div>
          <div className="stat-sub">von {PROJECT_RISKS.length} insgesamt</div>
          <div className="stat-chg warn">1 kritisch</div>
        </div>
      </div>

      {/* ── Phasenübersicht + Meilenstein-Tracker ───────── */}
      <div className="grid2" style={{ marginTop: 16 }}>
        <div className="glass-card">
          <div className="card-title">Phasenübersicht</div>
          {PHASES.map((p) => (
            <div key={p.id} className="phase-row" data-clickable onClick={() => openPhase(p)}>
              <div className="ph-dot" style={{ background: p.color }} />
              <div className="ph-info">
                <div className="ph-name">
                  {p.name}{' '}
                  <span style={{ fontSize: 10, color: 'var(--bronze)', fontWeight: 700, letterSpacing: '0.5px' }}>{p.weeks}</span>
                </div>
                <div className="pb" style={{ height: 6 }}>
                  <div className="pb-fill" style={{ width: `${p.progress}%`, background: p.color, height: 6 }} />
                </div>
                <div className="ph-meta">{p.progress}% abgeschlossen</div>
              </div>
              <div className="ph-pct" style={{ color: p.color }}>{p.progress}%</div>
            </div>
          ))}
        </div>

        <div className="glass-card">
          <div className="card-title">Meilenstein-Tracker</div>
          {MILESTONES.map((m, i) => (
            <div key={i} className="ms-row" data-clickable onClick={() => openMilestone(m)}>
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
        <div className="glass-card">
          <div className="card-title">Kritische Aufgaben</div>
          {PROJECT_TASKS
            .filter(t => t.priority === 'high' || t.priority === 'critical')
            .map((t, i) => (
              <div key={i} className="task" data-clickable onClick={() => openTask(t)}>
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
                <div style={{ fontSize: 10, color: 'var(--text-light)', marginTop: 4, letterSpacing: '0.5px' }}>{t.progress}% abgeschlossen</div>
              </div>
            ))}
        </div>

        <div className="glass-card">
          <div className="card-title">Budgetübersicht</div>
          <div style={{ display: 'flex', gap: 14, marginBottom: 18 }}>
            {[
              { label: 'Ausgegeben', value: totalSpent, color: 'var(--forest)' },
              { label: 'Gebunden', value: totalCommitted, color: 'var(--bronze)' },
              { label: 'Verfügbar', value: available, color: 'var(--forest2)' },
            ].map((item) => (
              <div key={item.label} style={{ flex: 1 }}>
                <div style={{ fontSize: 10, color: 'var(--bronze)', letterSpacing: 1, textTransform: 'uppercase', fontWeight: 700, marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontFamily: 'var(--f-head)', fontSize: 20, fontWeight: 600, color: item.color }}>{fmtEur(item.value)}</div>
              </div>
            ))}
          </div>
          <div className="pb" style={{ height: 10 }}>
            <div className="pb-fill" style={{ width: `${budgetPct}%`, background: 'var(--forest)', height: 10 }} />
          </div>
          <div style={{ fontSize: 10, color: 'var(--text-light)', marginTop: 5, marginBottom: 16, letterSpacing: '0.5px' }}>{budgetPct}% des Gesamtbudgets genutzt</div>
          {PROJECT_BUDGET.cats.map((c, i) => (
            <div key={i} className="brow" data-clickable onClick={() => openBudgetCat(c)}>
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

      <div className="dripfy-footer" style={{ marginTop: 16 }}>
        Powered by <a href="https://dripfy.app" target="_blank" rel="noopener noreferrer">DRIPFY.APP</a>
      </div>

      <DetailModal open={!!modal} onClose={() => setModal(null)} title={modal?.title || ''}>
        {modal?.body}
      </DetailModal>
    </AppShell>
  );
}
