'use client';

import { PROJECT_ANNOUNCEMENTS } from '@/lib/constants';
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

export default function AnnouncementsPage() {
  return (
    <AppShell>
      <div className="glass-card">
        <div className="card-title">Ank&uuml;ndigungen &amp; Mitteilungen</div>
        {PROJECT_ANNOUNCEMENTS.map((a, i) => (
          <div key={i} className={`ann ${a.priority === 'high' ? 'ann-h' : 'ann-n'}`}>
            <div className="ann-ttl">{a.title}</div>
            <div className="ann-meta">
              {a.author} &middot; {a.date}
              {a.priority === 'high' && (
                <span style={{ color: 'var(--bronze)', fontWeight: 700, marginLeft: '6px' }}>&#9679; Priorit&auml;t</span>
              )}
            </div>
            <div className="ann-body">{a.body}</div>
          </div>
        ))}
      </div>

      <DripfyFooter />
    </AppShell>
  );
}
