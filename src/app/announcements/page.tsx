'use client';

import { useState } from 'react';
import AppShell from '@/components/AppShell';
import DetailModal from '@/components/DetailModal';
import { useData, AnnouncementItem } from '@/lib/DataContext';
import { ModalContent } from '@/lib/ui';

const EMPTY_ANN: AnnouncementItem = { title: '', date: 'Gerade eben', author: 'PM', priority: 'normal', body: '', role: 'all' };

export default function AnnouncementsPage() {
  return <AppShell><AnnouncementsContent /></AppShell>;
}

function AnnouncementsContent() {
  const { announcements, addAnnouncement, updateAnnouncement, deleteAnnouncement, currentUser } = useData();
  const [modal, setModal] = useState<ModalContent>(null);
  const [showForm, setShowForm] = useState(false);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [form, setForm] = useState<AnnouncementItem>({ ...EMPTY_ANN });

  const isPM = currentUser?.role?.toUpperCase() === 'PM';

  const startAdd = () => { setForm({ ...EMPTY_ANN, author: currentUser?.name || 'PM', date: new Date().toLocaleDateString('de-DE', { day: '2-digit', month: 'short', year: 'numeric' }) }); setEditIdx(null); setShowForm(true); };
  const startEdit = (i: number) => { setForm({ ...announcements[i] }); setEditIdx(i); setShowForm(true); setModal(null); };
  const handleSave = () => {
    if (!form.title.trim() || !form.body.trim()) return;
    if (editIdx !== null) updateAnnouncement(editIdx, form); else addAnnouncement(form);
    setShowForm(false); setEditIdx(null);
  };
  const handleDelete = (i: number) => { deleteAnnouncement(i); setModal(null); };

  const openAnn = (a: AnnouncementItem, i: number) => setModal({
    title: a.title,
    body: (
      <>
        <div className="detail-field"><span className="detail-label">Autor</span><span className="detail-value">{a.author}</span></div>
        <div className="detail-field"><span className="detail-label">Datum</span><span className="detail-value">{a.date}</span></div>
        <div className="detail-field"><span className="detail-label">Priorität</span><span className="detail-value" style={{ color: a.priority === 'high' ? 'var(--bronze)' : 'var(--text)' }}>{a.priority === 'high' ? '● Hoch' : 'Normal'}</span></div>
        <div className="detail-field"><span className="detail-label">Sichtbarkeit</span><span className="detail-value">{a.role === 'all' ? 'Alle Rollen' : a.role.toUpperCase()}</span></div>
        <div className="detail-section">
          <div className="detail-section-title">Inhalt</div>
          <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7 }}>{a.body}</div>
        </div>
        {isPM && (
          <div className="crud-actions" style={{ marginTop: 16 }}>
            <button className="crud-btn crud-btn-edit" onClick={() => startEdit(i)}>✎ Bearbeiten</button>
            <button className="crud-btn crud-btn-delete" onClick={() => handleDelete(i)}>✕ Löschen</button>
          </div>
        )}
      </>
    ),
  });

  return (
    <>
      <div className="sec-hdr">
        <div className="sec-title">Ankündigungen</div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {isPM && <button className="crud-btn crud-btn-primary" onClick={startAdd}>+ Neue Ankündigung</button>}
          <div className="ornament">◆ ◆ ◆</div>
        </div>
      </div>

      {showForm && isPM && (
        <div className="glass-card">
          <div className="card-title">{editIdx !== null ? 'Ankündigung bearbeiten' : 'Neue Ankündigung'}</div>
          <div className="crud-form">
            <div><label>Titel</label><input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Betreff..." /></div>
            <div className="crud-form-row">
              <div><label>Priorität</label><select value={form.priority} onChange={e => setForm(f => ({ ...f, priority: e.target.value }))}>
                <option value="high">Hoch</option><option value="normal">Normal</option>
              </select></div>
              <div><label>Sichtbarkeit</label><select value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))}>
                <option value="all">Alle Rollen</option><option value="pm">Nur PM</option><option value="pm,md">PM + MD</option><option value="pm,investor">PM + Investor</option><option value="pm,md,contractor">PM + MD + Auftragnehmer</option><option value="pm,marketing">PM + Marketing</option>
              </select></div>
            </div>
            <div><label>Inhalt</label><textarea value={form.body} onChange={e => setForm(f => ({ ...f, body: e.target.value }))} placeholder="Nachricht..." style={{ minHeight: 100 }} /></div>
            <div className="crud-actions">
              <button className="crud-btn crud-btn-cancel" onClick={() => { setShowForm(false); setEditIdx(null); }}>Abbrechen</button>
              <button className="crud-btn crud-btn-save" onClick={handleSave}>✓ Speichern</button>
            </div>
          </div>
        </div>
      )}

      <div className="glass-card" style={{ marginTop: showForm ? 16 : 0 }}>
        <div className="card-title">Ankündigungen &amp; Mitteilungen — {announcements.length}</div>
        {announcements.map((a, i) => (
          <div key={i} className={`ann ${a.priority === 'high' ? 'ann-h' : 'ann-n'}`} data-clickable onClick={() => openAnn(a, i)}>
            <div className="ann-ttl">{a.title}</div>
            <div className="ann-meta">
              {a.author} &middot; {a.date}
              {a.priority === 'high' && (<span style={{ color: 'var(--bronze)', fontWeight: 700, marginLeft: 6 }}>● Priorität</span>)}
            </div>
            <div className="ann-body">{a.body}</div>
          </div>
        ))}
        {announcements.length === 0 && <div className="empty-state">Keine Ankündigungen vorhanden.</div>}
      </div>

      <div className="dripfy-footer" style={{ marginTop: 16 }}>Powered by <a href="https://dripfy.app" target="_blank" rel="noopener noreferrer">DRIPFY.APP</a></div>
      <DetailModal open={!!modal} onClose={() => setModal(null)} title={modal?.title || ''}>{modal?.body}</DetailModal>
    </>
  );
}
