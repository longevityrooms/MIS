'use client';

import { PROJECT_TASKS } from '@/lib/constants';
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

const priorityClass = (p: string) => {
  switch (p) { case 'critical': return 'pc'; case 'high': return 'ph2'; case 'medium': return 'pm2'; default: return 'pm2'; }
};
const priorityLabel = (p: string) => {
  switch (p) { case 'critical': return 'KRITISCH'; case 'high': return 'HOCH'; case 'medium': return 'MITTEL'; default: return p.toUpperCase(); }
};

const statusClass = (s: string) => {
  switch (s) { case 'done': return 'sd'; case 'in_progress': return 'sp'; case 'blocked': return 'sbl'; case 'not_started': return 'sw'; default: return 'sw'; }
};
const statusLabel = (s: string) => {
  switch (s) { case 'done': return 'Abgeschlossen'; case 'in_progress': return 'In Bearbeitung'; case 'blocked': return 'Blockiert'; case 'not_started': return 'Nicht begonnen'; default: return s; }
};

export default function TasksPage() {
  const tasks = PROJECT_TASKS;

  const notStarted = tasks.filter(t => t.status === 'not_started').length;
  const inProgress = tasks.filter(t => t.status === 'in_progress').length;
  const critical = tasks.filter(t => t.priority === 'critical').length;
  const done = tasks.filter(t => t.status === 'done').length;

  return (
    <AppShell>
      <div className="sec-hdr">
        <div className="sec-title">Aufgaben</div>
        <div className="ornament">◆ ◆ ◆</div>
      </div>

      <div className="grid4">
        {[
          { label: 'Nicht begonnen', val: notStarted },
          { label: 'In Bearbeitung', val: inProgress },
          { label: 'Kritisch', val: critical },
          { label: 'Abgeschlossen', val: done },
        ].map((s) => (
          <div key={s.label} className="stat">
            <div className="stat-lbl">{s.label}</div>
            <div className="stat-val">{s.val}</div>
            <div className="stat-sub">Aufgaben</div>
          </div>
        ))}
      </div>

      <div className="glass-card" style={{ marginTop: '16px' }}>
        <div className="card-title">Aufgabenliste</div>

        {tasks.map((t, i) => (
          <div key={i} className="task">
            <div className="task-hdr">
              <div className="task-ttl">{t.title}</div>
              <span className={`pb-badge ${priorityClass(t.priority)}`}>{priorityLabel(t.priority)}</span>
              <span className={`sb ${statusClass(t.status)}`}>{statusLabel(t.status)}</span>
            </div>
            <div className="task-meta">
              <span>Fällig: {t.due}</span>
              <span>· Phase {t.phase}</span>
            </div>
            <div className="pb" style={{ height: '4px' }}>
              <div className="pb-fill" style={{ width: `${t.progress}%`, background: 'var(--forest)', height: '4px' }} />
            </div>
            <div style={{ fontSize: '10px', color: 'var(--text-light)', marginTop: '4px', letterSpacing: '0.5px' }}>{t.progress}% abgeschlossen</div>
          </div>
        ))}
      </div>

      <DripfyFooter />
    </AppShell>
  );
}
