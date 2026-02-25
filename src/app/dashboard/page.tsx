'use client';

import { useState } from 'react';
import AppShell from '@/components/AppShell';
import DetailModal from '@/components/DetailModal';
import { useData } from '@/lib/DataContext';
import { PHASES, MILESTONES } from '@/lib/constants';
import { fmtEur, priorityClass, priorityLabel, statusClass, statusLabel, impactLabel, probLabel, msIcon, ModalContent } from '@/lib/ui';

export default function DashboardPage() {
  return <AppShell><DashboardContent /></AppShell>;
}

function DashboardContent() {
  const { tasks, risks, budget } = useData();
  const [modal, setModal] = useState<ModalContent>(null);

  const { total: totalBudget, spent: totalSpent, committed: totalCommitted } = budget;
  const available = totalBudget - totalSpent - totalCommitted;
  const budgetPct = totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0;

  const openTasks = tasks.filter(t => t.status !== 'done').length;
  const activeRisks = risks.filter(r => r.status === 'active').length;
  const criticalTasks = tasks.filter(t => t.priority === 'critical');
  const doneTasks = tasks.filter(t => t.status === 'done').length;

  const openProgress = () => setModal({ title: 'Gesamtfortschritt', body: (
    <>
      <div className="detail-field"><span className="detail-label">Status</span><span className="detail-value">Woche 9 von 18</span></div>
      <div className="detail-field"><span className="detail-label">Fortschritt</span><span className="detail-value">37%</span></div>
      <div className="detail-section">
        <div className="detail-section-title">Phasendetails</div>
        {PHASES.map(p => (<div key={p.id} className="detail-field"><span className="detail-label" style={{ color: p.color }}>{p.name}</span><span className="detail-value">{p.progress}% — {p.weeks}</span></div>))}
      </div>
      <div className="detail-section">
        <div className="detail-section-title">Aufgaben-Übersicht</div>
        {[['Gesamt', tasks.length], ['Abgeschlossen', doneTasks], ['In Bearbeitung', tasks.filter(t => t.status === 'in_progress').length], ['Nicht begonnen', tasks.filter(t => t.status === 'not_started').length]].map(([l, v]) => (
          <div key={l as string} className="detail-field"><span className="detail-label">{l}</span><span className="detail-value">{v}</span></div>
        ))}
      </div>
    </>
  ) });

  const openBudgetStat = () => setModal({ title: 'Budgetübersicht', body: (
    <>
      {[['Gesamtbudget', totalBudget], ['Ausgegeben', totalSpent], ['Gebunden', totalCommitted]].map(([l, v]) => (
        <div key={l as string} className="detail-field"><span className="detail-label">{l}</span><span className="detail-value">{fmtEur(v as number)}</span></div>
      ))}
      <div className="detail-field"><span className="detail-label">Verfügbar</span><span className="detail-value" style={{ color: 'var(--forest)' }}>{fmtEur(available)}</span></div>
      <div className="detail-section">
        <div className="detail-section-title">Nach Kategorie</div>
        {budget.cats.map((c, i) => {
          const pct = c.budget > 0 ? Math.round((c.spent / c.budget) * 100) : 0;
          return (<div key={i} className="detail-field"><span className="detail-label" style={{ color: c.color }}>{c.name}</span><span className="detail-value">{fmtEur(c.spent)} / {fmtEur(c.budget)} ({pct}%)</span></div>);
        })}
      </div>
    </>
  ) });

  const openOpenTasks = () => setModal({ title: `Offene Aufgaben (${openTasks})`, body: (
    <>
      {tasks.filter(t => t.status !== 'done').map((t, i) => (
        <div key={i} className="list-item">
          <div className="list-item-title">{t.title}</div>
          <div className="list-item-meta">Phase {t.phase} · {priorityLabel(t.priority)} · {statusLabel(t.status)} · Fällig {t.due}</div>
          <div className="pb" style={{ height: 3, marginTop: 4 }}><div className="pb-fill" style={{ width: `${t.progress}%`, background: 'var(--forest)', height: 3 }} /></div>
        </div>
      ))}
    </>
  ) });

  const openActiveRisks = () => setModal({ title: `Aktive Risiken (${activeRisks})`, body: (
    <>
      {risks.filter(r => r.status === 'active').map((r, i) => (
        <div key={i} className="list-item">
          <div className="list-item-title">{r.title}</div>
          <div className="list-item-meta">Auswirkung: {impactLabel(r.impact)} · Wahrscheinlichkeit: {probLabel(r.prob)} · {r.owner}</div>
          {r.mitigation && (<div className="list-item-note"><span className="list-item-note-label">MINDERUNG:</span> {r.mitigation}</div>)}
        </div>
      ))}
    </>
  ) });

  const openPhase = (p: typeof PHASES[0]) => setModal({ title: p.name, body: (
    <>
      <div className="detail-field"><span className="detail-label">Zeitraum</span><span className="detail-value">{p.weeks}</span></div>
      <div className="detail-field"><span className="detail-label">Fortschritt</span><span className="detail-value" style={{ color: p.color }}>{p.progress}%</span></div>
      <div className="pb" style={{ height: 8, margin: '8px 0' }}><div className="pb-fill" style={{ width: `${p.progress}%`, background: p.color, height: 8 }} /></div>
      <div className="detail-section">
        <div className="detail-section-title">Aufgaben in dieser Phase</div>
        {tasks.filter(t => t.phase === p.id).map((t, i) => (
          <div key={i} className="list-item-sm">
            <span>{t.title}</span>
            <span className={`sb ${statusClass(t.status)}`} style={{ fontSize: 9, marginLeft: 8, flexShrink: 0 }}>{statusLabel(t.status)}</span>
          </div>
        ))}
      </div>
    </>
  ) });

  const openMilestone = (m: typeof MILESTONES[0]) => setModal({ title: m.title, body: (
    <>
      <div className="detail-field"><span className="detail-label">Termin</span><span className="detail-value">{m.date}</span></div>
      <div className="detail-field"><span className="detail-label">Status</span>
        <span className="detail-value" style={{ color: m.status === 'done' ? 'var(--forest)' : m.status === 'active' ? 'var(--bronze)' : 'var(--text-light)' }}>
          {m.status === 'done' ? '✓ Abgeschlossen' : m.status === 'active' ? '◉ Aktiv' : '○ Ausstehend'}
        </span>
      </div>
    </>
  ) });

  return (
    <>
      <div className="sec-hdr"><div className="sec-title">Dashboard</div><div className="ornament">◆ ◆ ◆</div></div>

      <div className="grid4">
        <div className="stat" data-clickable onClick={openProgress}><div className="stat-lbl">Gesamtfortschritt</div><div className="stat-val">37%</div><div className="stat-sub">Woche 9 von 18</div><div className="stat-chg up">↑ +5% diese Woche</div></div>
        <div className="stat" data-clickable onClick={openBudgetStat}><div className="stat-lbl">Budget genutzt</div><div className="stat-val" style={{ color: 'var(--bronze)' }}>{fmtEur(totalSpent)}</div><div className="stat-sub">von {fmtEur(totalBudget)} gesamt</div><div className="stat-chg warn">{budgetPct}% ausgeschöpft</div></div>
        <div className="stat" data-clickable onClick={openOpenTasks}><div className="stat-lbl">Offene Aufgaben</div><div className="stat-val">{openTasks}</div><div className="stat-sub">von {tasks.length} insgesamt</div><div className="stat-chg warn">{criticalTasks.length} kritisch</div></div>
        <div className="stat" data-clickable onClick={openActiveRisks}><div className="stat-lbl">Aktive Risiken</div><div className="stat-val">{activeRisks}</div><div className="stat-sub">von {risks.length} insgesamt</div><div className="stat-chg warn">Dauerüberwachung</div></div>
      </div>

      <div className="grid2" style={{ marginTop: 16 }}>
        <div className="glass-card">
          <div className="card-title">Phasenübersicht</div>
          {PHASES.map(p => (
            <div key={p.id} className="phase-row" data-clickable onClick={() => openPhase(p)}>
              <div className="ph-dot" style={{ background: p.color }} />
              <div className="ph-info">
                <div className="ph-name">{p.name}{' '}<span style={{ fontSize: 10, color: 'var(--bronze)', fontWeight: 700 }}>{p.weeks}</span></div>
                <div className="pb" style={{ height: 6 }}><div className="pb-fill" style={{ width: `${p.progress}%`, background: p.color, height: 6 }} /></div>
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
              <div className={`ms-ic ${m.status === 'done' ? 'ms-done' : m.status === 'active' ? 'ms-active' : 'ms-pending'}`}>{msIcon(m.status)}</div>
              <div className="ms-ttl">{m.title}</div>
              <div className="ms-dt">{m.date}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid2" style={{ marginTop: 16 }}>
        <div className="glass-card">
          <div className="card-title">Kritische Aufgaben</div>
          {tasks.filter(t => t.priority === 'high' || t.priority === 'critical').map((t, i) => (
            <div key={i} className="task" data-clickable onClick={() => setModal({ title: t.title, body: (
              <>
                <div className="detail-field"><span className="detail-label">Phase</span><span className="detail-value">Phase {t.phase}</span></div>
                <div className="detail-field"><span className="detail-label">Priorität</span><span className="detail-value"><span className={`pb-badge ${priorityClass(t.priority)}`}>{priorityLabel(t.priority)}</span></span></div>
                <div className="detail-field"><span className="detail-label">Status</span><span className="detail-value"><span className={`sb ${statusClass(t.status)}`}>{statusLabel(t.status)}</span></span></div>
                <div className="detail-field"><span className="detail-label">Fällig</span><span className="detail-value">{t.due}</span></div>
                <div className="detail-field"><span className="detail-label">Fortschritt</span><span className="detail-value">{t.progress}%</span></div>
              </>
            ) })}>
              <div className="task-hdr"><div className="task-ttl">{t.title}</div><span className={`pb-badge ${priorityClass(t.priority)}`}>{priorityLabel(t.priority)}</span></div>
              <div className="task-meta"><span className={`sb ${statusClass(t.status)}`}>{statusLabel(t.status)}</span><span>· Fällig {t.due}</span></div>
              <div className="pb" style={{ height: 4 }}><div className="pb-fill" style={{ width: `${t.progress}%`, background: 'var(--forest)', height: 4 }} /></div>
              <div style={{ fontSize: 10, color: 'var(--text-light)', marginTop: 4 }}>{t.progress}% abgeschlossen</div>
            </div>
          ))}
        </div>
        <div className="glass-card">
          <div className="card-title">Budgetübersicht</div>
          <div className="budget-summary">
            {[{ label: 'Ausgegeben', value: totalSpent, color: 'var(--forest)' }, { label: 'Gebunden', value: totalCommitted, color: 'var(--bronze)' }, { label: 'Verfügbar', value: available, color: 'var(--forest2)' }].map(item => (
              <div key={item.label} className="budget-summary-item">
                <div className="budget-summary-label">{item.label}</div>
                <div className="budget-summary-value" style={{ color: item.color }}>{fmtEur(item.value)}</div>
              </div>
            ))}
          </div>
          <div className="pb" style={{ height: 10 }}><div className="pb-fill" style={{ width: `${budgetPct}%`, background: 'var(--forest)', height: 10 }} /></div>
          <div style={{ fontSize: 10, color: 'var(--text-light)', marginTop: 5, marginBottom: 16 }}>{budgetPct}% des Gesamtbudgets genutzt</div>
          {budget.cats.map((c, i) => (
            <div key={i} className="brow" data-clickable onClick={() => { const pct = c.budget > 0 ? Math.round((c.spent / c.budget) * 100) : 0; setModal({ title: c.name, body: (<><div className="detail-field"><span className="detail-label">Budget</span><span className="detail-value">{fmtEur(c.budget)}</span></div><div className="detail-field"><span className="detail-label">Ausgegeben</span><span className="detail-value">{fmtEur(c.spent)}</span></div><div className="detail-field"><span className="detail-label">Verbrauch</span><span className="detail-value">{pct}%</span></div><div className="pb" style={{ height: 8, margin: '8px 0' }}><div className="pb-fill" style={{ width: `${pct}%`, background: c.color, height: 8 }} /></div></>) }); }}>
              <div className="b-dot" style={{ background: c.color }} />
              <div className="b-name">{c.name}</div>
              <div className="b-nums"><div className="b-sp">{fmtEur(c.spent)}</div><div className="b-of">/ {fmtEur(c.budget)}</div></div>
            </div>
          ))}
        </div>
      </div>

      <div className="dripfy-footer" style={{ marginTop: 16 }}>Powered by <a href="https://dripfy.app" target="_blank" rel="noopener noreferrer">DRIPFY.APP</a></div>
      <DetailModal open={!!modal} onClose={() => setModal(null)} title={modal?.title || ''}>{modal?.body}</DetailModal>
    </>
  );
}
