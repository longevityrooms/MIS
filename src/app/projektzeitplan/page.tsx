'use client';

import { useState } from 'react';
import AppShell from '@/components/AppShell';
import DetailModal from '@/components/DetailModal';
import GanttTaskManager from '@/components/GanttTaskManager';
import { useData, GanttPhase, GanttTaskItem } from '@/lib/DataContext';

const STATUS_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  done:    { label: 'Abgeschlossen', color: '#2F4F4F', bg: 'rgba(47,79,79,0.12)' },
  active:  { label: 'In Bearbeitung', color: '#B87333', bg: 'rgba(184,115,51,0.12)' },
  pending: { label: 'Ausstehend', color: '#888', bg: 'rgba(136,136,136,0.1)' },
};

type ModalContent = { title: string; body: React.ReactNode } | null;

function getAssigneeInfo(id?: string) {
  const { GANTT_ASSIGNEES } = require('@/lib/constants');
  if (!id) return null;
  return GANTT_ASSIGNEES.find((a: { id: string }) => a.id === id) || null;
}

function AssigneeBadge({ id, size = 'sm' }: { id?: string; size?: 'sm' | 'md' }) {
  const info = getAssigneeInfo(id);
  if (!info) return null;
  const isMd = size === 'md';
  return (
    <span title={`${info.name} (${info.role})`} style={{
      fontSize: isMd ? '10px' : '9px', fontWeight: 700, padding: isMd ? '2px 7px' : '1px 5px',
      borderRadius: '4px', letterSpacing: '0.5px',
      background: `${info.color}15`, color: info.color, border: `1px solid ${info.color}30`,
      whiteSpace: 'nowrap', fontFamily: 'var(--f-body)',
    }}>{info.id}</span>
  );
}

export default function ProjektzeitplanPage() {
  return <AppShell><ProjektzeitplanContent /></AppShell>;
}

function ProjektzeitplanContent() {
  const { ganttData, setGanttData } = useData();
  const weeks = Array.from({ length: 18 }, (_, i) => i + 1);
  const currentWeek = 9;
  const [editMode, setEditMode] = useState(false);
  const [modal, setModal] = useState<ModalContent>(null);

  const handleAddTask = (phaseIndex: number, task: GanttTaskItem) => {
    const copy = ganttData.map(p => ({ ...p, tasks: [...p.tasks] }));
    copy[phaseIndex].tasks.push(task);
    setGanttData(copy);
  };

  const handleRemoveTask = (phaseIndex: number, taskIndex: number) => {
    const copy = ganttData.map(p => ({ ...p, tasks: [...p.tasks] }));
    copy[phaseIndex].tasks.splice(taskIndex, 1);
    setGanttData(copy);
  };

  const openPhaseDetail = (phase: GanttPhase) => {
    const doneCount = phase.tasks.filter(t => t.status === 'done').length;
    const activeCount = phase.tasks.filter(t => t.status === 'active').length;
    const pendingCount = phase.tasks.filter(t => t.status === 'pending').length;
    setModal({
      title: phase.label,
      body: (
        <>
          <div className="detail-field"><span className="detail-label">Gesamt Aufgaben</span><span className="detail-value">{phase.tasks.length}</span></div>
          <div className="detail-field"><span className="detail-label">Abgeschlossen</span><span className="detail-value" style={{ color: 'var(--forest)' }}>{doneCount}</span></div>
          <div className="detail-field"><span className="detail-label">In Bearbeitung</span><span className="detail-value" style={{ color: 'var(--bronze)' }}>{activeCount}</span></div>
          <div className="detail-field"><span className="detail-label">Ausstehend</span><span className="detail-value">{pendingCount}</span></div>
          <div className="detail-section">
            <div className="detail-section-title">Aufgaben</div>
            {phase.tasks.map((t, i) => {
              const assigneeInfo = getAssigneeInfo(t.assignee);
              return (
                <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid rgba(184,115,51,0.06)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1, minWidth: 0 }}>
                      <div style={{ width: 7, height: 7, borderRadius: '50%', background: STATUS_LABELS[t.status]?.color || '#888', flexShrink: 0 }} />
                      <span style={{ fontSize: 12, color: 'var(--text)', fontWeight: 500 }}>{t.name}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                      {assigneeInfo && <AssigneeBadge id={t.assignee} />}
                      <span style={{ fontSize: 10, color: 'var(--text-light)' }}>W{t.active[0]}–W{t.active[t.active.length - 1]}</span>
                    </div>
                  </div>
                  {t.description && (
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 3, paddingLeft: 13, lineHeight: '1.4' }}>
                      {t.description.length > 80 ? t.description.substring(0, 80) + '…' : t.description}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      ),
    });
  };

  const openTaskDetail = (task: GanttTaskItem, phase: GanttPhase) => {
    const statusInfo = STATUS_LABELS[task.status];
    const assigneeInfo = getAssigneeInfo(task.assignee);
    setModal({
      title: task.name,
      body: (
        <>
          <div className="detail-field"><span className="detail-label">Phase</span><span className="detail-value" style={{ color: phase.color }}>{phase.label}</span></div>
          <div className="detail-field"><span className="detail-label">Status</span>
            <span className="detail-value"><span style={{ display: 'inline-block', padding: '2px 10px', borderRadius: 12, fontSize: 11, fontWeight: 600, background: statusInfo?.bg, color: statusInfo?.color }}>{statusInfo?.label}</span></span>
          </div>
          {assigneeInfo && (
            <div className="detail-field">
              <span className="detail-label">Verantwortlich</span>
              <span className="detail-value">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${assigneeInfo.color}18`, color: assigneeInfo.color, fontSize: 10, fontWeight: 700, border: `1.5px solid ${assigneeInfo.color}40`, fontFamily: 'var(--f-body)' }}>{assigneeInfo.id}</div>
                  <div><div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)' }}>{assigneeInfo.name}</div><div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{assigneeInfo.role}</div></div>
                </div>
              </span>
            </div>
          )}
          <div className="detail-field"><span className="detail-label">Zeitraum</span><span className="detail-value">W{task.active[0]} – W{task.active[task.active.length - 1]}</span></div>
          <div className="detail-field"><span className="detail-label">Dauer</span><span className="detail-value">{task.active.length} Woche{task.active.length > 1 ? 'n' : ''}</span></div>
          {task.description && (
            <div className="detail-section">
              <div className="detail-section-title">Beschreibung</div>
              <div style={{ fontSize: 12, lineHeight: '1.6', color: 'var(--text)', padding: '10px 12px', borderRadius: 8, background: 'rgba(245,230,211,0.3)', border: '1px solid rgba(184,115,51,0.08)' }}>{task.description}</div>
            </div>
          )}
          <div className="detail-section">
            <div className="detail-section-title">Aktive Wochen</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {task.active.map(w => (<span key={w} className="week-chip active">W{w}</span>))}
            </div>
          </div>
        </>
      ),
    });
  };

  return (
    <>
      <div className="glass-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div className="card-title" style={{ marginBottom: 0 }}>Projektplan — 18-Wochen-Masterplan</div>
          <button className={`edit-toggle ${editMode ? 'active' : ''}`} onClick={() => setEditMode(!editMode)}>
            {editMode ? '✓ Fertig' : '✎ Bearbeiten'}
          </button>
        </div>

        <div style={{ display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
          {Object.entries(STATUS_LABELS).map(([key, s]) => (
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontFamily: 'var(--f-body)' }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: s.color }} /><span style={{ color: 'var(--text-muted)' }}>{s.label}</span>
            </div>
          ))}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontFamily: 'var(--f-body)', marginLeft: 'auto' }}>
            <div style={{ width: 2, height: 14, background: 'rgba(192,57,43,0.6)' }} /><span style={{ color: 'var(--text-muted)' }}>Aktuelle Woche (W{currentWeek})</span>
          </div>
        </div>

        <div className="gantt-wrap">
          <table className="gtbl">
            <thead>
              <tr>
                <th>AUFGABE</th>
                {weeks.map(w => (
                  <th key={w} style={{ position: 'relative', color: w === currentWeek ? '#c0392b' : undefined, fontWeight: w === currentWeek ? 700 : undefined }}>
                    W{w}
                    {w === currentWeek && (<div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 2, height: 6, background: 'rgba(192,57,43,0.6)', borderRadius: 1 }} />)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ganttData.map((phase, pi) => (
                <PhaseGroup key={pi} phase={phase} weeks={weeks} currentWeek={currentWeek} editMode={editMode}
                  onPhaseClick={() => openPhaseDetail(phase)} onTaskClick={(task) => openTaskDetail(task, phase)} onRemoveTask={(taskIndex) => handleRemoveTask(pi, taskIndex)} />
              ))}
            </tbody>
          </table>
        </div>
        <div className="dripfy-footer">Powered by <a href="https://dripfy.app" target="_blank" rel="noopener noreferrer">DRIPFY.APP</a></div>
      </div>

      {editMode && (<GanttTaskManager ganttData={ganttData} onAddTask={handleAddTask} onRemoveTask={handleRemoveTask} />)}
      <DetailModal open={!!modal} onClose={() => setModal(null)} title={modal?.title || ''}>{modal?.body}</DetailModal>
    </>
  );
}

function PhaseGroup({ phase, weeks, currentWeek, editMode, onPhaseClick, onTaskClick, onRemoveTask }: {
  phase: GanttPhase; weeks: number[]; currentWeek: number; editMode: boolean;
  onPhaseClick: () => void; onTaskClick: (task: GanttTaskItem) => void; onRemoveTask: (taskIndex: number) => void;
}) {
  return (
    <>
      <tr className="gph" onClick={onPhaseClick} style={{ cursor: 'pointer' }} title={`${phase.label} → Details anzeigen`}>
        <td colSpan={19}><div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}><span>{phase.label}</span><span style={{ fontSize: 11, opacity: 0.6, fontWeight: 400, letterSpacing: '0.5px' }}>Klicken für Details →</span></div></td>
      </tr>
      {phase.tasks.map((task, ti) => (
        <TaskRow key={ti} task={task} phase={phase} weeks={weeks} currentWeek={currentWeek} editMode={editMode} onTaskClick={() => onTaskClick(task)} onRemove={() => onRemoveTask(ti)} />
      ))}
    </>
  );
}

function TaskRow({ task, phase, weeks, currentWeek, editMode, onTaskClick, onRemove }: {
  task: GanttTaskItem; phase: GanttPhase; weeks: number[]; currentWeek: number; editMode: boolean; onTaskClick: () => void; onRemove: () => void;
}) {
  const [hoveredWeek, setHoveredWeek] = useState<number | null>(null);
  const [isRowHovered, setIsRowHovered] = useState(false);
  const statusInfo = STATUS_LABELS[task.status];

  return (
    <tr onMouseEnter={() => setIsRowHovered(true)} onMouseLeave={() => { setIsRowHovered(false); setHoveredWeek(null); }}
      style={{ transition: 'background 0.15s', background: isRowHovered ? 'rgba(184,115,51,0.04)' : 'transparent' }}>
      <td onClick={onTaskClick} style={{ cursor: 'pointer', transition: 'color 0.15s', color: isRowHovered ? 'var(--forest)' : undefined, fontWeight: isRowHovered ? 500 : undefined }} title={`${task.name} → ${statusInfo?.label}`}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {editMode && (<button className="gantt-remove-btn" onClick={(e) => { e.stopPropagation(); onRemove(); }} title="Aufgabe entfernen" style={{ width: 18, height: 18, fontSize: 10 }}>✕</button>)}
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: statusInfo?.color, flexShrink: 0, boxShadow: task.status === 'active' ? `0 0 6px ${statusInfo?.color}50` : 'none' }} />
          <span>{task.name}</span>
          {task.assignee && (<AssigneeBadge id={task.assignee} />)}
          {isRowHovered && !editMode && (<span style={{ fontSize: 10, color: 'var(--bronze)', marginLeft: 'auto', whiteSpace: 'nowrap', opacity: 0.7 }}>→</span>)}
        </div>
      </td>
      {weeks.map(w => {
        const isActive = task.active.includes(w);
        const isCurrentWeek = w === currentWeek;
        const isCellHovered = hoveredWeek === w && isActive;
        return (
          <td key={w} style={{ padding: isActive ? '2px' : undefined, cursor: isActive ? 'pointer' : 'default', position: 'relative', borderLeft: isCurrentWeek ? '2px solid rgba(192,57,43,0.2)' : undefined }}
            onClick={() => isActive && onTaskClick()} onMouseEnter={() => isActive && setHoveredWeek(w)} onMouseLeave={() => setHoveredWeek(null)} title={isActive ? `${task.name} · W${w}` : undefined}>
            {isActive && (
              <div className="gc" style={{ background: isCellHovered ? `${phase.color}55` : `${phase.color}30`, border: `1px solid ${isCellHovered ? phase.color : `${phase.color}70`}`, transform: isCellHovered ? 'scale(1.15)' : 'scale(1)', transition: 'all 0.15s ease', borderRadius: 3, position: 'relative', zIndex: isCellHovered ? 2 : 1 }} />
            )}
            {isCellHovered && (
              <div style={{ position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)', background: 'var(--forest)', color: '#fff', padding: '4px 8px', borderRadius: 4, fontSize: 10, fontFamily: 'var(--f-body)', whiteSpace: 'nowrap', zIndex: 100, pointerEvents: 'none', boxShadow: 'var(--shadow-sm)', marginBottom: 4 }}>
                W{w} · {statusInfo?.label}
              </div>
            )}
          </td>
        );
      })}
    </tr>
  );
}
