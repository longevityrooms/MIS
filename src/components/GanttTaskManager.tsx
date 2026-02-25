'use client';

import { useState } from 'react';
import { GANTT_ASSIGNEES } from '@/lib/constants';
import { GanttPhase, GanttTaskItem } from '@/lib/DataContext';

interface GanttTaskManagerProps {
  ganttData: GanttPhase[];
  onAddTask: (phaseIndex: number, task: GanttTaskItem) => void;
  onRemoveTask: (phaseIndex: number, taskIndex: number) => void;
}

const PHASE_NAMES = [
  'Phase 1 — Strategie & Gründung',
  'Phase 2 — Umbau & Beschaffung',
  'Phase 3 — Zulassung & Prüfungen',
  'Phase 4 — Schulung & Soft-Launch',
  'Phase 5 — Eröffnung & Wachstum',
];

function getAssignee(id: string) {
  return GANTT_ASSIGNEES.find(a => a.id === id);
}

export default function GanttTaskManager({ ganttData, onAddTask, onRemoveTask }: GanttTaskManagerProps) {
  const [taskName, setTaskName] = useState('');
  const [phase, setPhase] = useState(0);
  const [startWeek, setStartWeek] = useState(1);
  const [endWeek, setEndWeek] = useState(2);
  const [status, setStatus] = useState<'done' | 'active' | 'pending'>('pending');
  const [assignee, setAssignee] = useState('AH');
  const [description, setDescription] = useState('');

  const handleAdd = () => {
    if (!taskName.trim()) return;
    const active: number[] = [];
    for (let w = startWeek; w <= endWeek; w++) active.push(w);
    onAddTask(phase, { name: taskName.trim(), active, status, link: '/tasks', assignee, description: description.trim() || undefined });
    setTaskName('');
    setDescription('');
  };

  return (
    <div className="gantt-manager">
      <div className="gantt-manager-title">Aufgabe hinzufügen</div>

      <div className="gantt-add-form">
        <div className="gf-group" style={{ flex: 2, minWidth: 180 }}>
          <label className="gf-label">Aufgabenname</label>
          <input type="text" placeholder="Neue Aufgabe..." value={taskName} onChange={e => setTaskName(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAdd()} />
        </div>
        <div className="gf-group" style={{ minWidth: 160 }}>
          <label className="gf-label">Phase</label>
          <select value={phase} onChange={e => setPhase(Number(e.target.value))}>
            {ganttData.map((_, i) => <option key={i} value={i}>{PHASE_NAMES[i] || `Phase ${i + 1}`}</option>)}
          </select>
        </div>
        <div className="gf-group" style={{ minWidth: 100 }}>
          <label className="gf-label">Verantwortlich</label>
          <select value={assignee} onChange={e => setAssignee(e.target.value)}>
            {GANTT_ASSIGNEES.map(a => <option key={a.id} value={a.id}>{a.id} — {a.name}</option>)}
          </select>
        </div>
        <div className="gf-group" style={{ minWidth: 80 }}>
          <label className="gf-label">Start</label>
          <select value={startWeek} onChange={e => { const v = +e.target.value; setStartWeek(v); if (v > endWeek) setEndWeek(v); }}>
            {Array.from({ length: 18 }, (_, i) => i + 1).map(w => <option key={w} value={w}>W{w}</option>)}
          </select>
        </div>
        <div className="gf-group" style={{ minWidth: 80 }}>
          <label className="gf-label">Ende</label>
          <select value={endWeek} onChange={e => setEndWeek(+e.target.value)}>
            {Array.from({ length: 18 }, (_, i) => i + 1).filter(w => w >= startWeek).map(w => <option key={w} value={w}>W{w}</option>)}
          </select>
        </div>
        <div className="gf-group" style={{ minWidth: 120 }}>
          <label className="gf-label">Status</label>
          <select value={status} onChange={e => setStatus(e.target.value as 'done' | 'active' | 'pending')}>
            <option value="pending">Ausstehend</option><option value="active">In Bearbeitung</option><option value="done">Abgeschlossen</option>
          </select>
        </div>
      </div>

      <div style={{ marginTop: 8 }}>
        <div className="gf-group" style={{ width: '100%' }}>
          <label className="gf-label">Beschreibung</label>
          <textarea className="gf-textarea" placeholder="Detaillierte Aufgabenbeschreibung eingeben..." value={description} onChange={e => setDescription(e.target.value)} rows={2} />
        </div>
      </div>

      <div style={{ marginTop: 8, display: 'flex', justifyContent: 'flex-end' }}>
        <button className="gantt-add-btn" onClick={handleAdd}>+ Hinzufügen</button>
      </div>

      <div style={{ marginTop: 16 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--bronze)', marginBottom: 8 }}>
          Aufgaben verwalten
        </div>
        {ganttData.map((p, pi) => (
          <div key={pi} style={{ marginBottom: 8 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: p.color, marginBottom: 4 }}>{PHASE_NAMES[pi] || p.label}</div>
            {p.tasks.map((t, ti) => {
              const ai = t.assignee ? getAssignee(t.assignee) : null;
              return (
                <div key={ti} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0', fontSize: 12, color: 'var(--text)' }}>
                  <button className="gantt-remove-btn" onClick={() => onRemoveTask(pi, ti)} title="Aufgabe entfernen">✕</button>
                  {ai && (
                    <span className="gm-assignee" style={{ background: `${ai.color}18`, color: ai.color, border: `1px solid ${ai.color}30` }}>
                      {ai.id}
                    </span>
                  )}
                  <span style={{ flex: 1 }}>{t.name}</span>
                  <span style={{ fontSize: 10, color: 'var(--text-light)' }}>W{t.active[0]}–W{t.active[t.active.length - 1]}</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
