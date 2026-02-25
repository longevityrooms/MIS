'use client';

import { useState, useMemo } from 'react';
import AppShell from '@/components/AppShell';
import DetailModal from '@/components/DetailModal';
import { useData, TaskItem } from '@/lib/DataContext';
import { priorityClass, priorityLabel, statusClass, statusLabel, PHASE_NAMES, PHASE_CLR } from '@/lib/ui';

const EMPTY_TASK: TaskItem = { title: '', owner: 'pm', phase: 1, priority: 'medium', status: 'not_started', progress: 0, due: '' };

type ModalView =
  | { type: 'none' }
  | { type: 'filtered'; label: string; filterKey: string; items: TaskItem[] }
  | { type: 'detail'; task: TaskItem; idx: number; returnTo?: { label: string; filterKey: string } };

export default function TasksPage() {
  return <AppShell><TasksContent /></AppShell>;
}

function TasksContent() {
  const { tasks, addTask, updateTask, deleteTask, currentUser } = useData();
  const [view, setView] = useState<ModalView>({ type: 'none' });
  const [showForm, setShowForm] = useState(false);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [form, setForm] = useState<TaskItem>({ ...EMPTY_TASK });
  const [search, setSearch] = useState('');
  const [collapsedPhases, setCollapsedPhases] = useState<Record<number, boolean>>({});
  const [sortBy, setSortBy] = useState<'phase' | 'priority' | 'status'>('phase');

  const isPM = currentUser?.role?.toUpperCase() === 'PM';

  const counts = useMemo(() => ({
    notStarted: tasks.filter(t => t.status === 'not_started').length,
    inProgress: tasks.filter(t => t.status === 'in_progress').length,
    critical: tasks.filter(t => t.priority === 'critical').length,
    done: tasks.filter(t => t.status === 'done').length,
  }), [tasks]);

  const startAdd = () => { setForm({ ...EMPTY_TASK }); setEditIdx(null); setShowForm(true); };
  const startEdit = (i: number) => { setForm({ ...tasks[i] }); setEditIdx(i); setShowForm(true); setView({ type: 'none' }); };
  const handleSave = () => {
    if (!form.title.trim()) return;
    if (editIdx !== null) updateTask(editIdx, form); else addTask(form);
    setShowForm(false); setEditIdx(null);
  };
  const handleDelete = (i: number) => { deleteTask(i); setView({ type: 'none' }); };

  const filters: Record<string, () => TaskItem[]> = {
    'Nicht begonnen': () => tasks.filter(t => t.status === 'not_started'),
    'In Bearbeitung': () => tasks.filter(t => t.status === 'in_progress'),
    'Kritisch': () => tasks.filter(t => t.priority === 'critical'),
    'Abgeschlossen': () => tasks.filter(t => t.status === 'done'),
  };

  const openFiltered = (label: string) => setView({ type: 'filtered', label, filterKey: label, items: filters[label]() });
  const openTask = (t: TaskItem, i: number, returnTo?: { label: string; filterKey: string }) => setView({ type: 'detail', task: t, idx: i, returnTo });

  const goBack = () => {
    if (view.type === 'detail' && view.returnTo) {
      const { label, filterKey } = view.returnTo;
      setView({ type: 'filtered', label, filterKey, items: filters[filterKey]() });
    } else setView({ type: 'none' });
  };

  const groupByPhase = (list: TaskItem[]) => {
    const g: Record<number, TaskItem[]> = {};
    list.forEach(t => { (g[t.phase] ??= []).push(t); });
    return Object.entries(g).sort(([a], [b]) => +a - +b).map(([p, items]) => ({ phase: +p, items }));
  };

  const filteredTasks = useMemo(() => {
    if (!search.trim()) return tasks;
    const q = search.toLowerCase();
    return tasks.filter(t => t.title.toLowerCase().includes(q) || statusLabel(t.status).toLowerCase().includes(q) || priorityLabel(t.priority).toLowerCase().includes(q));
  }, [tasks, search]);

  const groupedTasks = useMemo(() => groupByPhase(filteredTasks), [filteredTasks]);

  const prioOrder: Record<string, number> = { critical: 0, high: 1, medium: 2, low: 3 };
  const sortTasks = (items: TaskItem[]) => {
    if (sortBy === 'priority') return [...items].sort((a, b) => (prioOrder[a.priority] || 3) - (prioOrder[b.priority] || 3));
    if (sortBy === 'status') return [...items].sort((a, b) => a.status.localeCompare(b.status));
    return items;
  };

  const phaseProgress = (items: TaskItem[]) => items.length ? Math.round(items.reduce((s, t) => s + (t.progress || 0), 0) / items.length) : 0;

  const statCards = [
    { label: 'Nicht begonnen', val: counts.notStarted, color: 'var(--text-light)' },
    { label: 'In Bearbeitung', val: counts.inProgress, color: 'var(--bronze)' },
    { label: 'Kritisch', val: counts.critical, color: '#c0392b' },
    { label: 'Abgeschlossen', val: counts.done, color: 'var(--forest)' },
  ];

  const buildFilteredModal = () => {
    if (view.type !== 'filtered') return null;
    const { items, label } = view;
    const groups = groupByPhase(items);
    return (
      <>
        <div className="tfl-summary">
          <span className="tfl-summary-count">{items.length} Aufgaben</span>
          <span className="tfl-summary-progress">⌀ {phaseProgress(items)}% Fortschritt</span>
        </div>
        {items.length === 0 ? (
          <div className="tfl-empty">Keine Aufgaben in dieser Kategorie.</div>
        ) : groups.map(({ phase, items: pi }) => (
          <div key={phase} className="tfl-phase-group">
            <div className="tfl-phase-header" style={{ '--phase-color': PHASE_CLR[phase] || '#2F4F4F' } as React.CSSProperties}>
              <div className="tfl-phase-dot" />
              <div className="tfl-phase-info">
                <span className="tfl-phase-name">Phase {phase}</span>
                <span className="tfl-phase-desc">{PHASE_NAMES[phase] || ''}</span>
              </div>
              <span className="tfl-phase-count">{pi.length}</span>
            </div>
            {pi.map((t, idx) => {
              const ri = tasks.indexOf(t);
              return (
                <div key={idx} className="tfl-task-row" onClick={() => openTask(t, ri, { label, filterKey: view.filterKey })}>
                  <div className="tfl-task-main">
                    <div className="tfl-task-title">{t.title}</div>
                    <span className={`pb-badge ${priorityClass(t.priority)}`}>{priorityLabel(t.priority)}</span>
                  </div>
                  <div className="tfl-task-meta"><span>Fällig {t.due}</span><span>·</span><span>{t.owner?.toUpperCase()}</span></div>
                  <div className="tfl-task-progress">
                    <div className="tfl-task-progress-bar"><div className="tfl-task-progress-fill" style={{ width: `${t.progress}%` }} /></div>
                    <span className="tfl-task-progress-text">{t.progress}%</span>
                  </div>
                  <div className="tfl-task-arrow">›</div>
                </div>
              );
            })}
          </div>
        ))}
      </>
    );
  };

  const buildDetailModal = () => {
    if (view.type !== 'detail') return null;
    const { task: t, idx: i, returnTo } = view;
    return (
      <>
        {returnTo && <button className="tfl-back-btn" onClick={e => { e.stopPropagation(); goBack(); }}>← {returnTo.label}</button>}
        <div className="detail-field"><span className="detail-label">Phase</span><span className="detail-value">Phase {t.phase} — {PHASE_NAMES[t.phase] || ''}</span></div>
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
    );
  };

  const modalOpen = view.type !== 'none';
  const modalTitle = view.type === 'filtered' ? `${view.label} (${view.items.length})` : view.type === 'detail' ? view.task.title : '';

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
          <div key={s.label} className="stat" data-clickable onClick={() => openFiltered(s.label)}>
            <div className="stat-lbl">{s.label}</div>
            <div className="stat-val" style={{ color: s.color }}>{s.val}</div>
            <div className="stat-sub">Aufgaben</div>
          </div>
        ))}
      </div>

      {showForm && isPM && (
        <div className="glass-card" style={{ marginTop: 16 }}>
          <div className="card-title">{editIdx !== null ? 'Aufgabe bearbeiten' : 'Neue Aufgabe'}</div>
          <div className="crud-form">
            <div><label>Titel</label><input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Aufgabenname..." /></div>
            <div className="crud-form-row">
              <div><label>Phase</label><select value={form.phase} onChange={e => setForm(f => ({ ...f, phase: +e.target.value }))}>
                {[1,2,3,4,5].map(p => <option key={p} value={p}>Phase {p} — {PHASE_NAMES[p]}</option>)}
              </select></div>
              <div><label>Priorität</label><select value={form.priority} onChange={e => setForm(f => ({ ...f, priority: e.target.value }))}>
                <option value="critical">Kritisch</option><option value="high">Hoch</option><option value="medium">Mittel</option><option value="low">Niedrig</option>
              </select></div>
            </div>
            <div className="crud-form-row">
              <div><label>Status</label><select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
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
        <div className="tfl-list-header">
          <div className="card-title" style={{ margin: 0 }}>Aufgabenliste — {filteredTasks.length} Aufgaben</div>
          <div className="tfl-controls">
            <div className="tfl-search-wrap">
              <span className="tfl-search-icon">⌕</span>
              <input className="tfl-search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Suchen..." />
              {search && <button className="tfl-search-clear" onClick={() => setSearch('')}>✕</button>}
            </div>
            <div className="tfl-sort-pills">
              {([['phase', 'Phase'], ['priority', 'Priorität'], ['status', 'Status']] as const).map(([key, label]) => (
                <button key={key} className={`tfl-sort-pill ${sortBy === key ? 'active' : ''}`} onClick={() => setSortBy(key)}>{label}</button>
              ))}
            </div>
          </div>
        </div>

        {groupedTasks.map(({ phase, items }) => {
          const collapsed = collapsedPhases[phase];
          const sorted = sortTasks(items);
          const prog = phaseProgress(items);
          const doneCount = items.filter(t => t.status === 'done').length;
          return (
            <div key={phase} className="tfl-main-phase">
              <div className="tfl-main-phase-header" onClick={() => setCollapsedPhases(p => ({ ...p, [phase]: !p[phase] }))} style={{ '--phase-color': PHASE_CLR[phase] || '#2F4F4F' } as React.CSSProperties}>
                <div className="tfl-main-phase-left">
                  <span className={`tfl-chevron ${collapsed ? '' : 'open'}`}>›</span>
                  <div className="tfl-main-phase-dot" />
                  <div className="tfl-main-phase-info">
                    <span className="tfl-main-phase-label">Phase {phase}</span>
                    <span className="tfl-main-phase-name">{PHASE_NAMES[phase] || ''}</span>
                  </div>
                </div>
                <div className="tfl-main-phase-right">
                  <span className="tfl-main-phase-stats">{doneCount}/{items.length}</span>
                  <div className="tfl-main-phase-progress"><div className="tfl-main-phase-progress-fill" style={{ width: `${prog}%`, background: PHASE_CLR[phase] }} /></div>
                  <span className="tfl-main-phase-pct">{prog}%</span>
                </div>
              </div>
              {!collapsed && (
                <div className="tfl-main-tasks">
                  {sorted.map(t => {
                    const ri = tasks.indexOf(t);
                    return (
                      <div key={ri} className="task tfl-main-task" data-clickable onClick={() => openTask(t, ri)}>
                        <div className="tfl-main-task-row1">
                          <div className="tfl-main-task-title">{t.title}</div>
                          <div className="tfl-main-task-badges">
                            <span className={`pb-badge ${priorityClass(t.priority)}`}>{priorityLabel(t.priority)}</span>
                            <span className={`sb ${statusClass(t.status)}`}>{statusLabel(t.status)}</span>
                          </div>
                        </div>
                        <div className="tfl-main-task-row2">
                          <span className="tfl-main-task-meta">Fällig: {t.due}</span>
                          {t.owner && <span className="tfl-main-task-owner">{t.owner.toUpperCase()}</span>}
                        </div>
                        <div className="tfl-main-task-row3">
                          <div className="pb" style={{ height: 4, flex: 1 }}><div className="pb-fill" style={{ width: `${t.progress}%`, background: PHASE_CLR[phase], height: 4 }} /></div>
                          <span className="tfl-main-task-pct">{t.progress}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {filteredTasks.length === 0 && <div className="tfl-empty" style={{ padding: '32px 0' }}>Keine Aufgaben gefunden für &quot;{search}&quot;</div>}
      </div>

      <div className="dripfy-footer" style={{ marginTop: 16 }}>Powered by <a href="https://dripfy.app" target="_blank" rel="noopener noreferrer">DRIPFY.APP</a></div>
      <DetailModal open={modalOpen} onClose={() => setView({ type: 'none' })} title={modalTitle}>
        {view.type === 'filtered' ? buildFilteredModal() : buildDetailModal()}
      </DetailModal>
    </>
  );
}
