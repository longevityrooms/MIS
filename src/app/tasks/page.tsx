'use client';

import { useState } from 'react';
import AppShell from '@/components/AppShell';
import DetailModal from '@/components/DetailModal';
import { useData, TaskItem } from '@/lib/DataContext';

const priorityClass = (p: string) => { switch (p) { case 'critical': return 'pc'; case 'high': return 'ph2'; case 'medium': return 'pm2'; default: return 'pm2'; } };
const priorityLabel = (p: string) => { switch (p) { case 'critical': return 'KRITISCH'; case 'high': return 'HOCH'; case 'medium': return 'MITTEL'; default: return p.toUpperCase(); } };
const statusClass = (s: string) => { switch (s) { case 'done': return 'sd'; case 'in_progress': return 'sp'; case 'blocked': return 'sbl'; default: return 'sw'; } };
const statusLabel = (s: string) => { switch (s) { case 'done': return 'Abgeschlossen'; case 'in_progress': return 'In Bearbeitung'; case 'blocked': return 'Blockiert'; case 'not_started': return 'Nicht begonnen'; default: return s; } };

const EMPTY_TASK: TaskItem = { title: '', owner: 'pm', phase: 1, priority: 'medium' as const, status: 'not_started' as const, progress: 0, due: '' };

type ModalContent = { title: string; body: React.ReactNode } | null;

export default function TasksPage() {
  return <AppShell><TasksContent /></AppShell>;
}

function TasksContent() {
  const { tasks, addTask, updateTask, deleteTask, currentUser } = useData();
  const [modal, setModal] = useState<ModalContent>(null);
  const [showForm, setShowForm] = useState(false);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [form, setForm] = useState<TaskItem>({ ...EMPTY_TASK });

  const isPM = currentUser?.role?.toUpperCase() === 'PM';

  const notStarted = tasks.filter(t => t.status === 'not_started').length;
  const inProgress = tasks.filter(t => t.status === 'in_progress').length;
  const critical = tasks.filter(t => t.priority === 'critical').length;
  const done = tasks.filter(t => t.status === 'done').length;

  const startAdd = () => { setForm({ ...EMPTY_TASK }); setEditIdx(null); setShowForm(true); };
  const startEdit = (i: number) => { setForm({ ...tasks[i] }); setEditIdx(i); setShowForm(true); setModal(null); };
  const handleSave = () => {
    if (!form.title.trim()) return;
    if (editIdx !== null) updateTask(editIdx, form);
    else addTask(form);
    setShowForm(false); setEditIdx(null);
  };
  const handleDelete = (i: number) => { deleteTask(i); setModal(null); };

  const openTask = (t: TaskItem, i: number) => setModal({
    title: t.title,
    body: (
      <>
        <div className="detail-field"><span className="detail-label">Phase</span><span className="detail-value">Phase {t.phase}</span></div>
        <div className="detail-field"><span className="detail-label">Priorität</span><span className="detail-value"><span className={`pb-badge ${priorityClass(t.priority)}`}>{priorityLabel(t.priority)}</span></span></div>
        <div className="detail-field"><span className="detail-label">Status</span><span className="detail-value"><span className={`sb ${statusClass(t.status)}`}>{statusLabel(t.status)}</span></span></div>
        <div className="detail-field"><span className="detail-label">Fällig</span><span className="detail-value">{t.due}</span></div>
        <div className="detail-field"><span className="detail-label">Verantwortlich</span><span className="detail-value">{t.owner?.toUpperCase()}</span></div>
        <div className="detail-field"><span className="detail-label">Fortschritt</span><span className="detail-value">{t.progress}%</span></div>
        <div className="pb" style={{ height: 6, margin: '8px 0 0' }}><div className="pb-fill" style={{ width: `${t.progress}%`, background: 'var(--forest)', height: 6 }} /></div>
        {isPM && (
          <div className="crud-actions" style={{ marginTop: 16 }}>
            <button className="crud-btn crud-btn-edit" onClick={() => startEdit(i)}>✎ Bearbeiten</button>
            <button className="crud-btn crud-btn-delete" onClick={() => handleDelete(i)}>✕ Löschen</button>
          </div>
        )}
      </>
    ),
  });

  const openFiltered = (label: string, filtered: TaskItem[]) => {
    setModal({
      title: `${label} (${filtered.length})`,
      body: filtered.length === 0 ? (
        <div style={{ fontSize: 13, color: 'var(--text-muted)', textAlign: 'center', padding: '20px 0' }}>Keine Aufgaben in dieser Kategorie.</div>
      ) : (
        <>
          {filtered.map((t, idx) => {
            const realIdx = tasks.indexOf(t);
            return (
              <div key={idx} style={{ padding: '10px 0', borderBottom: '1px solid rgba(184,115,51,0.08)', cursor: 'pointer' }}
                onClick={() => openTask(t, realIdx)}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', flex: 1, minWidth: 0 }}>{t.title}</div>
                  <span className={`pb-badge ${priorityClass(t.priority)}`} style={{ flexShrink: 0 }}>{priorityLabel(t.priority)}</span>
                </div>
                <div style={{ fontSize: 10, color: 'var(--text-light)', marginTop: 3 }}>
                  Phase {t.phase} · {statusLabel(t.status)} · Fällig {t.due} · {t.progress}%
                </div>
                <div className="pb" style={{ height: 3, marginTop: 4 }}><div className="pb-fill" style={{ width: `${t.progress}%`, background: 'var(--forest)', height: 3 }} /></div>
              </div>
            );
          })}
        </>
      ),
    });
  };

  const statCards = [
    { label: 'Nicht begonnen', val: notStarted, filter: () => tasks.filter(t => t.status === 'not_started') },
    { label: 'In Bearbeitung', val: inProgress, filter: () => tasks.filter(t => t.status === 'in_progress') },
    { label: 'Kritisch', val: critical, filter: () => tasks.filter(t => t.priority === 'critical') },
    { label: 'Abgeschlossen', val: done, filter: () => tasks.filter(t => t.status === 'done') },
  ];

  return (
    <>
      <div className="sec-hdr">
        <div className="sec-title">Aufgaben</div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {isPM && <button className="crud-btn crud-btn-primary" onClick={startAdd}>+ Neue Aufgabe</button>}
          <div className="ornament">◆ ◆ ◆</div>
        </div>
      </div>

      <div className="grid4">
        {statCards.map(s => (
          <div key={s.label} className="stat" data-clickable onClick={() => openFiltered(s.label, s.filter())}><div className="stat-lbl">{s.label}</div><div className="stat-val">{s.val}</div><div className="stat-sub">Aufgaben</div></div>
        ))}
      </div>

      {/* Add/Edit Form */}
      {showForm && isPM && (
        <div className="glass-card" style={{ marginTop: 16 }}>
          <div className="card-title">{editIdx !== null ? 'Aufgabe bearbeiten' : 'Neue Aufgabe'}</div>
          <div className="crud-form">
            <div><label>Titel</label><input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Aufgabenname..." /></div>
            <div className="crud-form-row">
              <div><label>Phase</label><select value={form.phase} onChange={e => setForm(f => ({ ...f, phase: +e.target.value }))}>
                {[1,2,3,4,5].map(p => <option key={p} value={p}>Phase {p}</option>)}
              </select></div>
              <div><label>Priorität</label><select value={form.priority} onChange={e => setForm(f => ({ ...f, priority: e.target.value as TaskItem['priority'] }))}>
                <option value="critical">Kritisch</option><option value="high">Hoch</option><option value="medium">Mittel</option><option value="low">Niedrig</option>
              </select></div>
            </div>
            <div className="crud-form-row">
              <div><label>Status</label><select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as TaskItem['status'] }))}>
                <option value="not_started">Nicht begonnen</option><option value="in_progress">In Bearbeitung</option><option value="done">Abgeschlossen</option><option value="blocked">Blockiert</option>
              </select></div>
              <div><label>Fällig</label><input value={form.due} onChange={e => setForm(f => ({ ...f, due: e.target.value }))} placeholder="z.B. W12" /></div>
            </div>
            <div className="crud-form-row">
              <div><label>Verantwortlich</label><input value={form.owner || ''} onChange={e => setForm(f => ({ ...f, owner: e.target.value }))} placeholder="z.B. pm, md" /></div>
              <div><label>Fortschritt (%)</label><input type="number" min="0" max="100" value={form.progress} onChange={e => setForm(f => ({ ...f, progress: +e.target.value }))} /></div>
            </div>
            <div className="crud-actions">
              <button className="crud-btn crud-btn-cancel" onClick={() => { setShowForm(false); setEditIdx(null); }}>Abbrechen</button>
              <button className="crud-btn crud-btn-save" onClick={handleSave}>✓ Speichern</button>
            </div>
          </div>
        </div>
      )}

      <div className="glass-card" style={{ marginTop: 16 }}>
        <div className="card-title">Aufgabenliste — {tasks.length} Aufgaben</div>
        {tasks.map((t, i) => (
          <div key={i} className="task" data-clickable onClick={() => openTask(t, i)}>
            <div className="task-hdr">
              <div className="task-ttl">{t.title}</div>
              <span className={`pb-badge ${priorityClass(t.priority)}`}>{priorityLabel(t.priority)}</span>
              <span className={`sb ${statusClass(t.status)}`}>{statusLabel(t.status)}</span>
            </div>
            <div className="task-meta"><span>Fällig: {t.due}</span><span>· Phase {t.phase}</span></div>
            <div className="pb" style={{ height: 4 }}><div className="pb-fill" style={{ width: `${t.progress}%`, background: 'var(--forest)', height: 4 }} /></div>
            <div style={{ fontSize: 10, color: 'var(--text-light)', marginTop: 4 }}>{t.progress}% abgeschlossen</div>
          </div>
        ))}
      </div>

      <div className="dripfy-footer" style={{ marginTop: 16 }}>Powered by <a href="https://dripfy.app" target="_blank" rel="noopener noreferrer">DRIPFY.APP</a></div>
      <DetailModal open={!!modal} onClose={() => setModal(null)} title={modal?.title || ''}>{modal?.body}</DetailModal>
    </>
  );
}
