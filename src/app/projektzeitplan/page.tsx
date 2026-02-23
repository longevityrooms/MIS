'use client';

import { useState } from 'react';
import AppShell from '@/components/AppShell';
import DetailModal from '@/components/DetailModal';
import GanttTaskManager from '@/components/GanttTaskManager';
import { GANTT_DATA } from '@/lib/constants';

const STATUS_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  done:    { label: 'Abgeschlossen', color: '#2F4F4F', bg: 'rgba(47,79,79,0.12)' },
  active:  { label: 'In Bearbeitung', color: '#B87333', bg: 'rgba(184,115,51,0.12)' },
  pending: { label: 'Ausstehend', color: '#888', bg: 'rgba(136,136,136,0.1)' },
};

const DripfyFooter = () => (
  <div style={{ textAlign: 'center', padding: '20px 0 4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
    <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg,transparent,rgba(184,115,51,0.2))' }} />
    <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text-muted)', fontFamily: 'var(--f-body)', whiteSpace: 'nowrap' }}>
      Powered by <a href="https://dripfy.app" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--bronze)', textDecoration: 'none' }}>DRIPFY.APP</a>
    </span>
    <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg,rgba(184,115,51,0.2),transparent)' }} />
  </div>
);

type ModalContent = { title: string; body: React.ReactNode } | null;

type GanttTask = {
  name: string;
  active: number[];
  status: 'done' | 'active' | 'pending';
  link: string;
};

type GanttPhase = {
  label: string;
  color: string;
  link: string;
  tasks: GanttTask[];
};

export default function ProjektzeitplanPage() {
  const weeks = Array.from({ length: 18 }, (_, i) => i + 1);
  const currentWeek = 9;
  const [editMode, setEditMode] = useState(false);
  const [modal, setModal] = useState<ModalContent>(null);
  const [ganttData, setGanttData] = useState<GanttPhase[]>(() =>
    GANTT_DATA.map(p => ({ ...p, tasks: p.tasks.map(t => ({ ...t })) }))
  );

  const handleAddTask = (phaseIndex: number, task: GanttTask) => {
    setGanttData(prev => {
      const copy = prev.map(p => ({ ...p, tasks: [...p.tasks] }));
      copy[phaseIndex].tasks.push(task);
      return copy;
    });
  };

  const handleRemoveTask = (phaseIndex: number, taskIndex: number) => {
    setGanttData(prev => {
      const copy = prev.map(p => ({ ...p, tasks: [...p.tasks] }));
      copy[phaseIndex].tasks.splice(taskIndex, 1);
      return copy;
    });
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
            {phase.tasks.map((t, i) => (
              <div key={i} style={{ padding: '6px 0', borderBottom: '1px solid rgba(184,115,51,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: STATUS_LABELS[t.status]?.color || '#888' }} />
                  <span style={{ fontSize: 12, color: 'var(--text)' }}>{t.name}</span>
                </div>
                <span style={{ fontSize: 10, color: 'var(--text-light)' }}>W{t.active[0]}–W{t.active[t.active.length - 1]}</span>
              </div>
            ))}
          </div>
        </>
      ),
    });
  };

  const openTaskDetail = (task: GanttTask, phase: GanttPhase) => {
    const statusInfo = STATUS_LABELS[task.status];
    setModal({
      title: task.name,
      body: (
        <>
          <div className="detail-field"><span className="detail-label">Phase</span><span className="detail-value" style={{ color: phase.color }}>{phase.label}</span></div>
          <div className="detail-field"><span className="detail-label">Status</span>
            <span className="detail-value" style={{ color: statusInfo?.color }}>
              {statusInfo?.label}
            </span>
          </div>
          <div className="detail-field"><span className="detail-label">Zeitraum</span><span className="detail-value">W{task.active[0]} – W{task.active[task.active.length - 1]}</span></div>
          <div className="detail-field"><span className="detail-label">Dauer</span><span className="detail-value">{task.active.length} Woche{task.active.length > 1 ? 'n' : ''}</span></div>
          <div className="detail-section">
            <div className="detail-section-title">Aktive Wochen</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {task.active.map(w => (
                <span key={w} className="week-chip active">W{w}</span>
              ))}
            </div>
          </div>
        </>
      ),
    });
  };

  return (
    <AppShell>
      <div className="glass-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div className="card-title" style={{ marginBottom: 0 }}>Projektplan — 18-Wochen-Masterplan</div>
          <button
            className={`edit-toggle ${editMode ? 'active' : ''}`}
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? '✓ Fertig' : '✎ Bearbeiten'}
          </button>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          {Object.entries(STATUS_LABELS).map(([key, s]) => (
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontFamily: 'var(--f-body)' }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: s.color }} />
              <span style={{ color: 'var(--text-muted)' }}>{s.label}</span>
            </div>
          ))}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontFamily: 'var(--f-body)', marginLeft: 'auto' }}>
            <div style={{ width: 2, height: 14, background: 'rgba(192,57,43,0.6)' }} />
            <span style={{ color: 'var(--text-muted)' }}>Aktuelle Woche (W{currentWeek})</span>
          </div>
        </div>

        <div className="gantt-wrap">
          <table className="gtbl">
            <thead>
              <tr>
                <th>AUFGABE</th>
                {weeks.map(w => (
                  <th key={w} style={{
                    position: 'relative',
                    color: w === currentWeek ? '#c0392b' : undefined,
                    fontWeight: w === currentWeek ? 700 : undefined,
                  }}>
                    W{w}
                    {w === currentWeek && (
                      <div style={{
                        position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
                        width: '2px', height: '6px', background: 'rgba(192,57,43,0.6)', borderRadius: '1px',
                      }} />
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ganttData.map((phase, pi) => (
                <PhaseGroup
                  key={pi}
                  phase={phase}
                  weeks={weeks}
                  currentWeek={currentWeek}
                  editMode={editMode}
                  onPhaseClick={() => openPhaseDetail(phase)}
                  onTaskClick={(task) => openTaskDetail(task, phase)}
                  onRemoveTask={(taskIndex) => handleRemoveTask(pi, taskIndex)}
                />
              ))}
            </tbody>
          </table>
        </div>
        <DripfyFooter />
      </div>

      {/* Task Manager Panel (visible in edit mode) */}
      {editMode && (
        <GanttTaskManager
          ganttData={ganttData}
          onAddTask={handleAddTask}
          onRemoveTask={handleRemoveTask}
        />
      )}

      <DetailModal open={!!modal} onClose={() => setModal(null)} title={modal?.title || ''}>
        {modal?.body}
      </DetailModal>
    </AppShell>
  );
}

function PhaseGroup({ phase, weeks, currentWeek, editMode, onPhaseClick, onTaskClick, onRemoveTask }: {
  phase: GanttPhase;
  weeks: number[];
  currentWeek: number;
  editMode: boolean;
  onPhaseClick: () => void;
  onTaskClick: (task: GanttTask) => void;
  onRemoveTask: (taskIndex: number) => void;
}) {
  return (
    <>
      <tr className="gph" onClick={onPhaseClick} style={{ cursor: 'pointer' }} title={`${phase.label} → Details anzeigen`}>
        <td colSpan={19} style={{ position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>{phase.label}</span>
            <span style={{ fontSize: '11px', opacity: 0.6, fontWeight: 400, letterSpacing: '0.5px' }}>
              Klicken für Details →
            </span>
          </div>
        </td>
      </tr>

      {phase.tasks.map((task, ti) => (
        <TaskRow
          key={ti}
          task={task}
          phase={phase}
          weeks={weeks}
          currentWeek={currentWeek}
          editMode={editMode}
          onTaskClick={() => onTaskClick(task)}
          onRemove={() => onRemoveTask(ti)}
        />
      ))}
    </>
  );
}

function TaskRow({ task, phase, weeks, currentWeek, editMode, onTaskClick, onRemove }: {
  task: GanttTask;
  phase: GanttPhase;
  weeks: number[];
  currentWeek: number;
  editMode: boolean;
  onTaskClick: () => void;
  onRemove: () => void;
}) {
  const [hoveredWeek, setHoveredWeek] = useState<number | null>(null);
  const [isRowHovered, setIsRowHovered] = useState(false);
  const statusInfo = STATUS_LABELS[task.status];

  return (
    <tr
      onMouseEnter={() => setIsRowHovered(true)}
      onMouseLeave={() => { setIsRowHovered(false); setHoveredWeek(null); }}
      style={{
        transition: 'background 0.15s',
        background: isRowHovered ? 'rgba(184,115,51,0.04)' : 'transparent',
      }}
    >
      <td
        onClick={onTaskClick}
        style={{
          cursor: 'pointer',
          position: 'relative',
          transition: 'color 0.15s',
          color: isRowHovered ? 'var(--forest)' : undefined,
          fontWeight: isRowHovered ? 500 : undefined,
        }}
        title={`${task.name} → ${statusInfo.label}`}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {editMode && (
            <button
              className="gantt-remove-btn"
              onClick={(e) => { e.stopPropagation(); onRemove(); }}
              title="Aufgabe entfernen"
              style={{ width: 18, height: 18, fontSize: 10 }}
            >✕</button>
          )}
          <div style={{
            width: 7, height: 7, borderRadius: '50%',
            background: statusInfo.color,
            flexShrink: 0,
            boxShadow: task.status === 'active' ? `0 0 6px ${statusInfo.color}50` : 'none',
          }} />
          <span>{task.name}</span>
          {isRowHovered && !editMode && (
            <span style={{ fontSize: '10px', color: 'var(--bronze)', marginLeft: 'auto', whiteSpace: 'nowrap', opacity: 0.7 }}>→</span>
          )}
        </div>
      </td>

      {weeks.map(w => {
        const isActive = task.active.includes(w);
        const isCurrentWeek = w === currentWeek;
        const isCellHovered = hoveredWeek === w && isActive;

        return (
          <td
            key={w}
            style={{
              padding: isActive ? '2px' : undefined,
              cursor: isActive ? 'pointer' : 'default',
              position: 'relative',
              borderLeft: isCurrentWeek ? '2px solid rgba(192,57,43,0.2)' : undefined,
            }}
            onClick={() => isActive && onTaskClick()}
            onMouseEnter={() => isActive && setHoveredWeek(w)}
            onMouseLeave={() => setHoveredWeek(null)}
            title={isActive ? `${task.name} · W${w} — ${statusInfo.label}` : undefined}
          >
            {isActive && (
              <div
                className="gc"
                style={{
                  background: isCellHovered ? `${phase.color}55` : `${phase.color}30`,
                  border: `1px solid ${isCellHovered ? phase.color : `${phase.color}70`}`,
                  transform: isCellHovered ? 'scale(1.15)' : 'scale(1)',
                  transition: 'all 0.15s ease',
                  borderRadius: '3px',
                  position: 'relative',
                  zIndex: isCellHovered ? 2 : 1,
                }}
              />
            )}

            {isCellHovered && (
              <div style={{
                position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)',
                background: 'var(--forest)', color: '#fff', padding: '4px 8px',
                borderRadius: '4px', fontSize: '10px', fontFamily: 'var(--f-body)',
                whiteSpace: 'nowrap', zIndex: 100, pointerEvents: 'none',
                boxShadow: 'var(--shadow-sm)', marginBottom: '4px',
              }}>
                W{w} · {statusInfo.label}
                <div style={{
                  position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
                  width: 0, height: 0,
                  borderLeft: '4px solid transparent', borderRight: '4px solid transparent',
                  borderTop: '4px solid var(--forest)',
                }} />
              </div>
            )}
          </td>
        );
      })}
    </tr>
  );
}
