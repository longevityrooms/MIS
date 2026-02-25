'use client';

import { useState, useRef } from 'react';
import AppShell from '@/components/AppShell';
import DetailModal from '@/components/DetailModal';
import { useData, DocumentItem } from '@/lib/DataContext';
import { ModalContent } from '@/lib/ui';

const ICON_CLASS: Record<string, string> = { pdf: 'dp', docx: 'dd', xlsx: 'dx', pptx: 'dpp' };
const ICON_EMOJI: Record<string, string> = { pdf: '\u{1F4C4}', docx: '\u{1F4DD}', xlsx: '\u{1F4CA}', pptx: '\u{1F4CB}' };
const ACCESS_OPTS = ['Alle Rollen', 'PM', 'Investor', 'MD', 'Contractor', 'Marketing'];
const CATEGORY_OPTS = ['Allgemein', 'Vertrag', 'Genehmigung', 'Finanzen', 'Medizin', 'Marketing', 'Technisch'];

const fmtSize = (b: number) => b < 1024 ? b + ' B' : b < 1048576 ? (b / 1024).toFixed(1) + ' KB' : (b / 1048576).toFixed(1) + ' MB';
const getExt = (n: string) => n.split('.').pop()?.toLowerCase() || 'pdf';

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
  const fileRef = useRef<HTMLInputElement>(null);

  const isPM = currentUser?.role?.toUpperCase() === 'PM';
  const filtered = documents.filter(d => !searchTerm || d.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    Array.from(files).forEach(f => {
      addDocument({ name: f.name, size: fmtSize(f.size), type: getExt(f.name), date: new Date().toLocaleDateString('de-DE', { day: '2-digit', month: 'short', year: 'numeric' }), access: uploadSettings.access, isUploaded: true });
    });
    setShowUpload(false);
  };

  const openDoc = (doc: DocumentItem, i: number) => setModal({
    title: doc.name,
    body: (
      <>
        <div className="detail-field"><span className="detail-label">Typ</span><span className="detail-value">{doc.type.toUpperCase()}</span></div>
        <div className="detail-field"><span className="detail-label">Datum</span><span className="detail-value">{doc.date}</span></div>
        <div className="detail-field"><span className="detail-label">Größe</span><span className="detail-value">{doc.size}</span></div>
        <div className="detail-field"><span className="detail-label">Zugriff</span><span className="detail-value">{doc.access}</span></div>
        {doc.isUploaded && <div className="detail-field"><span className="detail-label">Quelle</span><span className="detail-value" style={{ color: 'var(--forest)' }}>Hochgeladen</span></div>}
        {isPM && (
          <div className="crud-actions" style={{ marginTop: 16 }}>
            <button className="crud-btn crud-btn-delete" onClick={() => { deleteDocument(i); setModal(null); }}>✕ Löschen</button>
          </div>
        )}
      </>
    ),
  });

  return (
    <>
      <div className="sec-hdr"><div className="sec-title">Dokumente</div><div className="ornament">◆ ◆ ◆</div></div>

      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {isPM && (
          <button onClick={() => setShowUpload(!showUpload)} className={`doc-upload-btn ${showUpload ? 'active' : ''}`}>
            <span style={{ fontSize: 18 }}>{showUpload ? '\u2715' : '+'}</span>
            {showUpload ? 'Abbrechen' : 'Datei hochladen'}
          </button>
        )}
        <div className="doc-search-wrap">
          <input type="text" className="glass-input doc-search" placeholder="Dokument suchen..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          <span className="doc-search-icon">&#128269;</span>
        </div>
      </div>

      {showUpload && isPM && (
        <div className="glass-card" style={{ marginTop: 16 }}>
          <div className="card-title">Datei hochladen</div>
          <div className="crud-form-row" style={{ marginBottom: 16 }}>
            <div>
              <label className="doc-label">Zugriff</label>
              <select className="glass-input" value={uploadSettings.access} onChange={e => setUploadSettings(s => ({ ...s, access: e.target.value }))} style={{ width: '100%', padding: '8px 12px', fontSize: 12 }}>
                {ACCESS_OPTS.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label className="doc-label">Kategorie</label>
              <select className="glass-input" value={uploadSettings.category} onChange={e => setUploadSettings(s => ({ ...s, category: e.target.value }))} style={{ width: '100%', padding: '8px 12px', fontSize: 12 }}>
                {CATEGORY_OPTS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className={`doc-dropzone ${dragOver ? 'active' : ''}`}
            onDragOver={e => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)}
            onDrop={e => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
            onClick={() => fileRef.current?.click()}>
            <div style={{ fontSize: 36, marginBottom: 12, opacity: 0.6 }}>&#128193;</div>
            <div className="doc-dropzone-title">{dragOver ? 'Datei hier ablegen' : 'Dateien hierhin ziehen'}</div>
            <div className="doc-dropzone-sub">oder <span className="doc-dropzone-link">klicken</span> zum Auswählen</div>
          </div>
          <input ref={fileRef} type="file" multiple accept=".pdf,.docx,.xlsx,.pptx,.jpg,.jpeg,.png,.csv" onChange={e => handleFiles(e.target.files)} style={{ display: 'none' }} />
        </div>
      )}

      <div className="glass-card" style={{ marginTop: 16 }}>
        <div className="card-title">Dokumente &amp; Ressourcen — {filtered.length} Dateien</div>
        {filtered.map((doc, i) => {
          const ext = doc.type;
          const idx = documents.indexOf(doc);
          return (
            <div key={i} className="doc" data-clickable onClick={() => openDoc(doc, idx)}>
              <div className={`d-icon ${ICON_CLASS[ext] || 'dp'}`}>{ICON_EMOJI[ext] || '\u{1F4C4}'}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="d-name">
                  <span className="d-name-text">{doc.name}</span>
                  {doc.isUploaded && <span className="d-new-badge">Neu</span>}
                </div>
                <div className="d-meta">{doc.date} &middot; {ext.toUpperCase()}</div>
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-light)', flexShrink: 0 }}>{doc.size}</div>
            </div>
          );
        })}
        {filtered.length === 0 && <div className="empty-state">Keine Dokumente gefunden.</div>}
      </div>

      <div className="dripfy-footer" style={{ marginTop: 16 }}>Powered by <a href="https://dripfy.app" target="_blank" rel="noopener noreferrer">DRIPFY.APP</a></div>
      <DetailModal open={!!modal} onClose={() => setModal(null)} title={modal?.title || ''}>{modal?.body}</DetailModal>
    </>
  );
}
