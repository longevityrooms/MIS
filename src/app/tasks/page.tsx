'use client';

import { useState } from 'react';
import { PROJECT_TASKS } from '@/lib/constants';
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

type ModalContent = { title: string; body: React.ReactNode } | null;

export default function TasksPage() {
  const [modal, setModal] = useState<ModalContent>(null);
  const tasks = PROJECT_TASKS;

  const notStarted = tasks.filter(t => t.status === 'not_started').length;
  const inProgress = tasks.filter(t => t.status === 'in_progress').length;
  const critical = tasks.filter(t => t.priority === 'critical').length;
  const done = tasks.filter(t => t.status === 'done').length;

  const openStatDetail = (label: string, filterFn: (t: typeof tasks[0]) => boolean) => {
    const filtered = tasks.filter(filterFn);
    setModal({
      title: `${label} (${filtered.length})`,
      body: (
        <>
          {filtered.map((t, i) => (
            <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid rgba(184,115,51,0.08)' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{t.title}</div>
              <div style={{ fontSize: 10, color: 'var(--text-light)', marginTop: 2 }}>
                Phase {t.phase} · {priorityLabel(t.priority)} · Fällig {t.due}
              </div>
              <div className="pb" style={{ height: 3, marginTop: 4 }}>
                <div className="pb-fill" style={{ width: `${t.progress}%`, background: 'var(--forest)', height: 3 }} />
              </div>
            </div>
          ))}
          {filtered.length === 0 && <div style={{ fontSize: 12, color: 'var(--text-light)', padding: '16px 0' }}>Keine Aufgaben</div>}
        </>
      ),
    });
  };

  const openTask = (t: typeof tasks[0]) => setModal({
    title: t.title,
    body: (
      <>
        <div className="detail-field"><span className="detail-label">Phase</span><span className="detail-value">Phase {t.phase}</span></div>
        <div className="detail-field"><span className="detail-label">Priorität</span><span className="detail-value"><span className={`pb-badge ${priorityClass(t.priority)}`}>{priorityLabel(t.priority)}</span></span></div>
        <div className="detail-field"><span className="detail-label">Status</span><span className="detail-value"><span className={`sb ${statusClass(t.status)}`}>{statusLabel(t.status)}</span></span></div>
        <div className="detail-field"><span className="detail-label">Fällig</span><span className="detail-value">{t.due}</span></div>
        <div className="detail-field"><span className="detail-label">Verantwortlich</span><span className="detail-value">{t.owner?.toUpperCase()}</span></div>
        <div className="detail-field"><span className="detail-label">Fortschritt</span><span className="detail-value">{t.progress}%</span></div>
        <div className="pb" style={{ height: 6, margin: '8px 0 0' }}>
          <div className="pb-fill" style={{ width: `${t.progress}%`, background: 'var(--forest)', height: 6 }} />
        </div>
      </>
    ),
  });

  const statCards = [
    { label: 'Nicht begonnen', val: notStarted, filter: (t: typeof tasks[0]) => t.status === 'not_started' },
    { label: 'In Bearbeitung', val: inProgress, filter: (t: typeof tasks[0]) => t.status === 'in_progress' },
    { label: 'Kritisch', val: critical, filter: (t: typeof tasks[0]) => t.priority === 'critical' },
    { label: 'Abgeschlossen', val: done, filter: (t: typeof tasks[0]) => t.status === 'done' },
  ];

  return (
    <AppShell>
      <div className="sec-hdr">
        <div className="sec-title">Aufgaben</div>
        <div className="ornament">◆ ◆ ◆</div>
      </div>

      <div className="grid4">
        {statCards.map((s) => (
          <div key={s.label} className="stat" data-clickable onClick={() => openStatDetail(s.label, s.filter)}>
            <div className="stat-lbl">{s.label}</div>
            <div className="stat-val">{s.val}</div>
            <div className="stat-sub">Aufgaben</div>
          </div>
        ))}
      </div>

      <div className="glass-card" style={{ marginTop: '16px' }}>
        <div className="card-title">Aufgabenliste</div>
        {tasks.map((t, i) => (
          <div key={i} className="task" data-clickable onClick={() => openTask(t)}>
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

      <DetailModal open={!!modal} onClose={() => setModal(null)} title={modal?.title || ''}>
        {modal?.body}
      </DetailModal>
    </AppShell>
  );
}
