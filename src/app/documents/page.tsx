'use client';

import { useState, useRef } from 'react';
import AppShell from '@/components/AppShell';
import DetailModal from '@/components/DetailModal';
import { useData, DocumentItem } from '@/lib/DataContext';

const iconClass: Record<string, string> = { pdf: 'dp', docx: 'dd', xlsx: 'dx', pptx: 'dpp' };
const iconEmoji: Record<string, string> = { pdf: '\u{1F4C4}', docx: '\u{1F4DD}', xlsx: '\u{1F4CA}', pptx: '\u{1F4CB}' };

const ACCESS_OPTIONS = ['Alle Rollen', 'PM', 'Investor', 'MD', 'Contractor', 'Marketing'];
const CATEGORY_OPTIONS = ['Allgemein', 'Vertrag', 'Genehmigung', 'Finanzen', 'Medizin', 'Marketing', 'Technisch'];

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function getFileExtension(name: string): string {
  return name.split('.').pop()?.toLowerCase() || 'pdf';
}

type ModalContent = { title: string; body: React.ReactNode } | null;

export default function DocumentsPage() {
  return <AppShell><DocumentsContent /></AppShell>;
}

function DocumentsContent() {
  const { documents, addDocument, deleteDocument, currentUser } = useData();
  const [showUpload, setShowUpload] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [uploadSettings, setUploadSettings] = useState({ access: 'Alle Rollen', category: 'Allgemein' });
  const [searchTerm, setSearchTerm] = useState('');
  const [modal, setModal] = useState<ModalContent>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isPM = currentUser?.role?.toUpperCase() === 'PM';

  const filteredDocs = documents.filter(doc => {
    if (!searchTerm) return true;
    return doc.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    Array.from(files).forEach(file => {
      const doc: DocumentItem = {
        name: file.name,
        size: formatFileSize(file.size),
        type: getFileExtension(file.name),
        date: new Date().toLocaleDateString('de-DE', { day: '2-digit', month: 'short', year: 'numeric' }),
        access: uploadSettings.access,
        isUploaded: true,
      };
      addDocument(doc);
    });
    setShowUpload(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const openDoc = (doc: DocumentItem, i: number) => {
    setModal({
      title: doc.name,
      body: (
        <>
          <div className="detail-field"><span className="detail-label">Typ</span><span className="detail-value">{doc.type.toUpperCase()}</span></div>
          <div className="detail-field"><span className="detail-label">Datum</span><span className="detail-value">{doc.date}</span></div>
          <div className="detail-field"><span className="detail-label">Größe</span><span className="detail-value">{doc.size}</span></div>
          <div className="detail-field"><span className="detail-label">Zugriff</span><span className="detail-value">{doc.access}</span></div>
          {doc.isUploaded && (<div className="detail-field"><span className="detail-label">Quelle</span><span className="detail-value" style={{ color: 'var(--forest)' }}>Hochgeladen</span></div>)}
          {isPM && (
            <div className="crud-actions" style={{ marginTop: 16 }}>
              <button className="crud-btn crud-btn-delete" onClick={() => { deleteDocument(i); setModal(null); }}>✕ Löschen</button>
            </div>
          )}
        </>
      ),
    });
  };

  return (
    <>
      <div className="sec-hdr">
        <div className="sec-title">Dokumente</div>
        <div className="ornament">◆ ◆ ◆</div>
      </div>

      {/* Toolbar */}
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {isPM && (
          <button onClick={() => setShowUpload(!showUpload)} style={{
            width: '100%', padding: '12px 20px', borderRadius: 12, cursor: 'pointer',
            background: showUpload ? 'rgba(47,79,79,0.12)' : 'linear-gradient(135deg, var(--forest), var(--forest2))',
            border: showUpload ? '1px solid rgba(47,79,79,0.25)' : 'none',
            color: showUpload ? 'var(--forest)' : 'var(--cream)',
            fontSize: 13, fontWeight: 700, fontFamily: 'var(--f-body)', letterSpacing: '1px', textTransform: 'uppercase',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            boxShadow: showUpload ? 'none' : '0 4px 16px rgba(47,79,79,0.3)',
            transition: 'all 0.2s',
          }}>
            <span style={{ fontSize: 18 }}>{showUpload ? '\u2715' : '+'}</span>
            {showUpload ? 'Abbrechen' : 'Datei hochladen'}
          </button>
        )}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: 1, minWidth: 140, position: 'relative' }}>
            <input type="text" className="glass-input" placeholder="Dokument suchen..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '10px 14px 10px 36px', fontSize: 13 }} />
            <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 14, color: 'var(--text-muted)' }}>&#128269;</span>
          </div>
        </div>
      </div>

      {/* Upload Panel */}
      {showUpload && isPM && (
        <div className="glass-card" style={{ position: 'relative', marginTop: 16 }}>
          <div className="card-title">Datei hochladen</div>
          <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 140 }}>
              <label style={{ fontSize: 10, fontWeight: 700, color: 'var(--bronze)', letterSpacing: '1.5px', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Zugriff</label>
              <select className="glass-input" value={uploadSettings.access} onChange={e => setUploadSettings(s => ({ ...s, access: e.target.value }))}
                style={{ width: '100%', padding: '8px 12px', fontSize: 12, cursor: 'pointer' }}>
                {ACCESS_OPTIONS.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div style={{ flex: 1, minWidth: 140 }}>
              <label style={{ fontSize: 10, fontWeight: 700, color: 'var(--bronze)', letterSpacing: '1.5px', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Kategorie</label>
              <select className="glass-input" value={uploadSettings.category} onChange={e => setUploadSettings(s => ({ ...s, category: e.target.value }))}
                style={{ width: '100%', padding: '8px 12px', fontSize: 12, cursor: 'pointer' }}>
                {CATEGORY_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div onDragOver={e => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)} onDrop={handleDrop} onClick={() => fileInputRef.current?.click()}
            style={{
              border: `2px dashed ${dragOver ? 'var(--bronze)' : 'rgba(184,115,51,0.3)'}`, borderRadius: 16, padding: '36px 24px', textAlign: 'center',
              cursor: 'pointer', transition: 'all 0.2s', background: dragOver ? 'rgba(184,115,51,0.08)' : 'rgba(250,244,236,0.3)',
            }}>
            <div style={{ fontSize: 36, marginBottom: 12, opacity: 0.6 }}>&#128193;</div>
            <div style={{ fontFamily: 'var(--f-head)', fontSize: 16, color: 'var(--forest)', marginBottom: 6 }}>{dragOver ? 'Datei hier ablegen' : 'Dateien hierhin ziehen'}</div>
            <div style={{ fontSize: 12, color: 'var(--text-light)' }}>oder <span style={{ color: 'var(--bronze)', fontWeight: 700 }}>klicken</span> zum Auswählen</div>
          </div>
          <input ref={fileInputRef} type="file" multiple accept=".pdf,.docx,.xlsx,.pptx,.jpg,.jpeg,.png,.csv" onChange={e => handleFiles(e.target.files)} style={{ display: 'none' }} />
        </div>
      )}

      {/* Document List */}
      <div className="glass-card" style={{ marginTop: 16 }}>
        <div className="card-title">Dokumente &amp; Ressourcen — {filteredDocs.length} Dateien</div>
        {filteredDocs.map((doc, i) => {
          const ext = doc.type;
          const actualIdx = documents.indexOf(doc);
          return (
            <div key={i} className="doc" data-clickable onClick={() => openDoc(doc, actualIdx)} style={{ position: 'relative' }}>
              <div className={`d-icon ${iconClass[ext] || 'dp'}`}>{iconEmoji[ext] || '\u{1F4C4}'}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="d-name" style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{doc.name}</span>
                  {doc.isUploaded && (
                    <span style={{ fontSize: 8, padding: '2px 6px', borderRadius: 4, background: 'rgba(47,79,79,0.12)', color: 'var(--forest2)', border: '1px solid rgba(47,79,79,0.2)', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase', flexShrink: 0 }}>Neu</span>
                  )}
                </div>
                <div className="d-meta">{doc.date} &middot; {ext.toUpperCase()}</div>
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-light)', flexShrink: 0 }}>{doc.size}</div>
            </div>
          );
        })}
        {filteredDocs.length === 0 && (<div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)', fontSize: 13 }}>Keine Dokumente gefunden.</div>)}
      </div>

      <div className="dripfy-footer" style={{ marginTop: 16 }}>Powered by <a href="https://dripfy.app" target="_blank" rel="noopener noreferrer">DRIPFY.APP</a></div>
      <DetailModal open={!!modal} onClose={() => setModal(null)} title={modal?.title || ''}>{modal?.body}</DetailModal>
    </>
  );
}
