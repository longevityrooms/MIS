'use client';

import { useState } from 'react';
import { PROJECT_ANNOUNCEMENTS } from '@/lib/constants';
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

type ModalContent = { title: string; body: React.ReactNode } | null;

export default function AnnouncementsPage() {
  const [modal, setModal] = useState<ModalContent>(null);

  const openAnnouncement = (a: typeof PROJECT_ANNOUNCEMENTS[0]) => setModal({
    title: a.title,
    body: (
      <>
        <div className="detail-field"><span className="detail-label">Autor</span><span className="detail-value">{a.author}</span></div>
        <div className="detail-field"><span className="detail-label">Datum</span><span className="detail-value">{a.date}</span></div>
        <div className="detail-field"><span className="detail-label">Priorität</span>
          <span className="detail-value" style={{ color: a.priority === 'high' ? 'var(--bronze)' : 'var(--text)' }}>
            {a.priority === 'high' ? '● Hoch' : 'Normal'}
          </span>
        </div>
        <div className="detail-field"><span className="detail-label">Sichtbarkeit</span><span className="detail-value">{a.role === 'all' ? 'Alle Rollen' : a.role.toUpperCase()}</span></div>
        <div className="detail-section">
          <div className="detail-section-title">Inhalt</div>
          <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7 }}>{a.body}</div>
        </div>
      </>
    ),
  });

  return (
    <AppShell>
      <div className="glass-card">
        <div className="card-title">Ankündigungen &amp; Mitteilungen</div>
        {PROJECT_ANNOUNCEMENTS.map((a, i) => (
          <div key={i} className={`ann ${a.priority === 'high' ? 'ann-h' : 'ann-n'}`} data-clickable onClick={() => openAnnouncement(a)}>
            <div className="ann-ttl">{a.title}</div>
            <div className="ann-meta">
              {a.author} &middot; {a.date}
              {a.priority === 'high' && (
                <span style={{ color: 'var(--bronze)', fontWeight: 700, marginLeft: '6px' }}>● Priorität</span>
              )}
            </div>
            <div className="ann-body">{a.body}</div>
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
