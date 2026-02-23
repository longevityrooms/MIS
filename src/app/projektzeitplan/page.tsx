'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AppShell from '@/components/AppShell';
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

export default function ProjektzeitplanPage() {
  const weeks = Array.from({ length: 18 }, (_, i) => i + 1);
  const currentWeek = 9;

  return (
    <AppShell>
    <div className="glass-card">
      <div className="card-title">Projektplan — 18-Wochen-Masterplan</div>

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
            {GANTT_DATA.map((phase, pi) => (
              <PhaseGroup key={pi} phase={phase} weeks={weeks} currentWeek={currentWeek} />
            ))}
          </tbody>
        </table>
      </div>
      <DripfyFooter />
    </div>
    </AppShell>
  );
}

function PhaseGroup({ phase, weeks, currentWeek }: { phase: typeof GANTT_DATA[0]; weeks: number[]; currentWeek: number }) {
  const router = useRouter();

  return (
    <>
      {/* Phase header — clickable */}
      <tr
        className="gph"
        onClick={() => router.push(phase.link)}
        style={{ cursor: 'pointer' }}
        title={`${phase.label} → Details anzeigen`}
      >
        <td colSpan={19} style={{ position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>{phase.label}</span>
            <span style={{ fontSize: '11px', opacity: 0.6, fontWeight: 400, letterSpacing: '0.5px' }}>
              Klicken für Details →
            </span>
          </div>
        </td>
      </tr>

      {/* Task rows — each row clickable */}
      {phase.tasks.map((task, ti) => (
        <TaskRow key={ti} task={task} phase={phase} weeks={weeks} currentWeek={currentWeek} />
      ))}
    </>
  );
}

function TaskRow({ task, phase, weeks, currentWeek }: {
  task: typeof GANTT_DATA[0]['tasks'][0];
  phase: typeof GANTT_DATA[0];
  weeks: number[];
  currentWeek: number;
}) {
  const router = useRouter();
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
      {/* Task name cell — clickable */}
      <td
        onClick={() => router.push(task.link)}
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
          {/* Status dot */}
          <div style={{
            width: 7, height: 7, borderRadius: '50%',
            background: statusInfo.color,
            flexShrink: 0,
            boxShadow: task.status === 'active' ? `0 0 6px ${statusInfo.color}50` : 'none',
          }} />
          <span>{task.name}</span>
          {isRowHovered && (
            <span style={{ fontSize: '10px', color: 'var(--bronze)', marginLeft: 'auto', whiteSpace: 'nowrap', opacity: 0.7 }}>
              →
            </span>
          )}
        </div>
      </td>

      {/* Week cells — clickable on active ones */}
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
            onClick={() => isActive && router.push(task.link)}
            onMouseEnter={() => isActive && setHoveredWeek(w)}
            onMouseLeave={() => setHoveredWeek(null)}
            title={isActive ? `${task.name} · W${w} — ${statusInfo.label}` : undefined}
          >
            {isActive && (
              <div
                className="gc"
                style={{
                  background: isCellHovered
                    ? `${phase.color}55`
                    : `${phase.color}30`,
                  border: `1px solid ${isCellHovered ? phase.color : `${phase.color}70`}`,
                  transform: isCellHovered ? 'scale(1.15)' : 'scale(1)',
                  transition: 'all 0.15s ease',
                  borderRadius: '3px',
                  position: 'relative',
                  zIndex: isCellHovered ? 2 : 1,
                }}
              />
            )}

            {/* Tooltip on hover */}
            {isCellHovered && (
              <div style={{
                position: 'absolute',
                bottom: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'var(--forest)',
                color: '#fff',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '10px',
                fontFamily: 'var(--f-body)',
                whiteSpace: 'nowrap',
                zIndex: 100,
                pointerEvents: 'none',
                boxShadow: 'var(--shadow-sm)',
                marginBottom: '4px',
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
