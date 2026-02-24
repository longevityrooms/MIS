'use client';

import { useState } from 'react';
import { GANTT_ASSIGNEES } from '@/lib/constants';

interface GanttTask {
  name: string;
  active: number[];
  status: 'done' | 'active' | 'pending';
  link: string;
  assignee?: string;
  description?: string;
}

interface GanttPhase {
  label: string;
  color: string;
  link: string;
  tasks: GanttTask[];
}

interface GanttTaskManagerProps {
  ganttData: GanttPhase[];
  onAddTask: (phaseIndex: number, task: GanttTask) => void;
  onRemoveTask: (phaseIndex: number, taskIndex: number) => void;
}

const PHASE_NAMES = [
  'Phase 1 — Strategie & Gründung',
  'Phase 2 — Umbau & Beschaffung',
  'Phase 3 — Zulassung & Prüfungen',
  'Phase 4 — Schulung & Soft-Launch',
  'Phase 5 — Eröffnung & Wachstum',
];

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

    onAddTask(phase, {
      name: taskName.trim(),
      active,
      status,
      link: '/tasks',
      assignee,
      description: description.trim() || undefined,
    });

    setTaskName('');
    setDescription('');
  };

  const getAssigneeName = (id: string) => {
    const a = GANTT_ASSIGNEES.find(x => x.id === id);
    return a ? a.id : id;
  };

  return (
    <div className="gantt-manager">
      <div className="gantt-manager-title">Aufgabe hinzufügen</div>

      <div className="gantt-add-form">
        <div className="gf-group" style={{ flex: 2, minWidth: '180px' }}>
          <label className="gf-label">Aufgabenname</label>
          <input
            type="text"
            placeholder="Neue Aufgabe..."
            value={taskName}
            onChange={e => setTaskName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAdd()}
          />
        </div>

        <div className="gf-group" style={{ minWidth: '160px' }}>
          <label className="gf-label">Phase</label>
          <select value={phase} onChange={e => setPhase(Number(e.target.value))}>
            {ganttData.map((_, i) => (
              <option key={i} value={i}>{PHASE_NAMES[i] || `Phase ${i + 1}`}</option>
            ))}
          </select>
        </div>

        <div className="gf-group" style={{ minWidth: '100px' }}>
          <label className="gf-label">Verantwortlich</label>
          <select value={assignee} onChange={e => setAssignee(e.target.value)}>
            {GANTT_ASSIGNEES.map(a => (
              <option key={a.id} value={a.id}>{a.id} — {a.name}</option>
            ))}
          </select>
        </div>

        <div className="gf-group" style={{ minWidth: '80px' }}>
          <label className="gf-label">Start</label>
          <select value={startWeek} onChange={e => {
            const v = Number(e.target.value);
            setStartWeek(v);
            if (v > endWeek) setEndWeek(v);
          }}>
            {Array.from({ length: 18 }, (_, i) => i + 1).map(w => (
              <option key={w} value={w}>W{w}</option>
            ))}
          </select>
        </div>

        <div className="gf-group" style={{ minWidth: '80px' }}>
          <label className="gf-label">Ende</label>
          <select value={endWeek} onChange={e => setEndWeek(Number(e.target.value))}>
            {Array.from({ length: 18 }, (_, i) => i + 1).filter(w => w >= startWeek).map(w => (
              <option key={w} value={w}>W{w}</option>
            ))}
          </select>
        </div>

        <div className="gf-group" style={{ minWidth: '120px' }}>
          <label className="gf-label">Status</label>
          <select value={status} onChange={e => setStatus(e.target.value as 'done' | 'active' | 'pending')}>
            <option value="pending">Ausstehend</option>
            <option value="active">In Bearbeitung</option>
            <option value="done">Abgeschlossen</option>
          </select>
        </div>
      </div>

      {/* Description textarea */}
      <div style={{ marginTop: '8px' }}>
        <div className="gf-group" style={{ width: '100%' }}>
          <label className="gf-label">Beschreibung</label>
          <textarea
            placeholder="Detaillierte Aufgabenbeschreibung eingeben..."
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={2}
            style={{
              width: '100%',
              padding: '8px 10px',
              borderRadius: '6px',
              border: '1px solid rgba(184,115,51,0.2)',
              background: 'rgba(245,230,211,0.3)',
              fontFamily: 'var(--f-body)',
              fontSize: '12px',
              color: 'var(--text)',
              resize: 'vertical',
              outline: 'none',
            }}
          />
        </div>
      </div>

      <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'flex-end' }}>
        <button className="gantt-add-btn" onClick={handleAdd}>
          + Hinzufügen
        </button>
      </div>

      {/* Existing tasks with remove buttons */}
      <div style={{ marginTop: '16px' }}>
        <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--bronze)', marginBottom: '8px' }}>
          Aufgaben verwalten
        </div>
        {ganttData.map((p, pi) => (
          <div key={pi} style={{ marginBottom: '8px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: p.color, marginBottom: '4px' }}>
              {PHASE_NAMES[pi] || p.label}
            </div>
            {p.tasks.map((t, ti) => (
              <div key={ti} style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '4px 0', fontSize: '12px', color: 'var(--text)',
              }}>
                <button
                  className="gantt-remove-btn"
                  onClick={() => onRemoveTask(pi, ti)}
                  title="Aufgabe entfernen"
                >✕</button>
                {t.assignee && (
                  <span style={{
                    fontSize: '9px', fontWeight: 700, padding: '1px 5px',
                    borderRadius: '3px', letterSpacing: '0.5px',
                    background: GANTT_ASSIGNEES.find(a => a.id === t.assignee)?.color ? `${GANTT_ASSIGNEES.find(a => a.id === t.assignee)!.color}18` : 'rgba(47,79,79,0.08)',
                    color: GANTT_ASSIGNEES.find(a => a.id === t.assignee)?.color || 'var(--text-muted)',
                    border: `1px solid ${GANTT_ASSIGNEES.find(a => a.id === t.assignee)?.color || '#ccc'}30`,
                  }}>
                    {getAssigneeName(t.assignee)}
                  </span>
                )}
                <span style={{ flex: 1 }}>{t.name}</span>
                <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>
                  W{t.active[0]}–W{t.active[t.active.length - 1]}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
