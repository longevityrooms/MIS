'use client';

import AppShell from '@/components/AppShell';
import { GANTT_DATA } from '@/lib/constants';

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

  return (
    <AppShell>
    <div className="glass-card">
      <div className="card-title">Projektplan — 18-Wochen-Masterplan</div>
      <div className="gantt-wrap">
        <table className="gtbl">
          <thead>
            <tr>
              <th>AUFGABE</th>
              {weeks.map(w => (
                <th key={w}>W{w}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {GANTT_DATA.map((phase, pi) => (
              <PhaseGroup key={pi} phase={phase} weeks={weeks} />
            ))}
          </tbody>
        </table>
      </div>
      <DripfyFooter />
    </div>
    </AppShell>
  );
}

function PhaseGroup({ phase, weeks }: { phase: typeof GANTT_DATA[0]; weeks: number[] }) {
  return (
    <>
      <tr className="gph">
        <td colSpan={19}>{phase.label}</td>
      </tr>
      {phase.tasks.map((task, ti) => (
        <tr key={ti}>
          <td>{task.name}</td>
          {weeks.map(w =>
            task.active.includes(w) ? (
              <td key={w} style={{ padding: '2px' }}>
                <div
                  className="gc"
                  style={{
                    background: `${phase.color}30`,
                    border: `1px solid ${phase.color}70`,
                  }}
                />
              </td>
            ) : (
              <td key={w} />
            )
          )}
        </tr>
      ))}
    </>
  );
}
