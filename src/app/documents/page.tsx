'use client';

import { useState, useRef } from 'react';
import { PROJECT_DOCUMENTS } from '@/lib/constants';
import AppShell from '@/components/AppShell';
import DetailModal from '@/components/DetailModal';

const iconClass: Record<string, string> = {
  pdf: 'dp', docx: 'dd', xlsx: 'dx', pptx: 'dpp',
};
const iconEmoji: Record<string, string> = {
  pdf: '\u{1F4C4}', docx: '\u{1F4DD}', xlsx: '\u{1F4CA}', pptx: '\u{1F4CB}',
};

interface UploadedFile {
  name: string;
  size: string;
  type: string;
  date: string;
  access: string;
  category: string;
}

const ACCESS_OPTIONS = ['Alle Rollen', 'PM', 'Investor', 'MD', 'Contractor', 'Marketing'];
const CATEGORY_OPTIONS = ['Allgemein', 'Vertrag', 'Genehmigung', 'Finanzen', 'Medizin', 'Marketing', 'Technisch'];

const DripfyFooter = () => (
  <div style={{ textAlign: 'center', padding: '20px 0 4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
    <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg,transparent,rgba(184,115,51,0.2))' }} />
    <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text-muted)', fontFamily: 'var(--f-body)', whiteSpace: 'nowrap' }}>
      Powered by <a href="https://dripfy.app" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--bronze)', textDecoration: 'none' }}>DRIPFY.APP</a>
    </span>
    <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg,rgba(184,115,51,0.2),transparent)' }} />
  </div>
);

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
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [showUpload, setShowUpload] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [uploadSettings, setUploadSettings] = useState({ access: 'Alle Rollen', category: 'Allgemein' });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('Alle');
  const [modal, setModal] = useState<ModalContent>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const allDocs = [
    ...uploadedFiles.map(f => ({ ...f, isUploaded: true })),
    ...PROJECT_DOCUMENTS.map(d => ({ ...d, isUploaded: false, access: 'Alle Rollen', category: 'Allgemein' })),
  ];

  const filteredDocs = allDocs.filter(doc => {
    const matchSearch = !searchTerm || doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = filterCategory === 'Alle' || doc.category === filterCategory;
    return matchSearch && matchCategory;
  });

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const newFiles: UploadedFile[] = Array.from(files).map(file => ({
      name: file.name,
      size: formatFileSize(file.size),
      type: getFileExtension(file.name),
      date: new Date().toLocaleDateString('de-DE', { day: '2-digit', month: 'short', year: 'numeric' }),
      access: uploadSettings.access,
      category: uploadSettings.category,
    }));
    setUploadedFiles(prev => [...newFiles, ...prev]);
    setShowUpload(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeUploaded = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const openDoc = (doc: { name: string; type: string; date: string; size: string; access: string; category: string; isUploaded: boolean }) => {
    setModal({
      title: doc.name,
      body: (
        <>
          <div className="detail-field"><span className="detail-label">Typ</span><span className="detail-value">{doc.type.toUpperCase()}</span></div>
          <div className="detail-field"><span className="detail-label">Datum</span><span className="detail-value">{doc.date}</span></div>
          <div className="detail-field"><span className="detail-label">Größe</span><span className="detail-value">{doc.size}</span></div>
          <div className="detail-field"><span className="detail-label">Zugriff</span><span className="detail-value">{doc.access}</span></div>
          <div className="detail-field"><span className="detail-label">Kategorie</span><span className="detail-value">{doc.category}</span></div>
          {doc.isUploaded && (
            <div className="detail-field"><span className="detail-label">Quelle</span><span className="detail-value" style={{ color: 'var(--forest)' }}>Hochgeladen</span></div>
          )}
        </>
      ),
    });
  };

  return (
    <AppShell>
      {/* Toolbar: Upload + Search + Filter */}
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <button
          onClick={() => setShowUpload(!showUpload)}
          style={{
            width: '100%', padding: '12px 20px', borderRadius: '12px', cursor: 'pointer',
            background: showUpload
              ? 'rgba(47,79,79,0.12)'
              : 'linear-gradient(135deg, var(--forest), var(--forest2))',
            border: showUpload ? '1px solid rgba(47,79,79,0.25)' : 'none',
            color: showUpload ? 'var(--forest)' : 'var(--cream)',
            fontSize: '13px', fontWeight: 700,
            fontFamily: 'var(--f-body)', letterSpacing: '1px', textTransform: 'uppercase',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            boxShadow: showUpload ? 'none' : '0 4px 16px rgba(47,79,79,0.3), inset 0 1px 0 rgba(255,255,255,0.15)',
            transition: 'all 0.2s',
          }}
        >
          <span style={{ fontSize: '18px' }}>{showUpload ? '\u2715' : '+'}</span>
          {showUpload ? 'Abbrechen' : 'Datei hochladen'}
        </button>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: 1, minWidth: '140px', position: 'relative' }}>
            <input
              type="text"
              className="glass-input"
              placeholder="Dokument suchen..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '10px 14px 10px 36px', fontSize: '13px' }}
            />
            <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '14px', color: 'var(--text-muted)' }}>&#128269;</span>
          </div>

          <select
            className="glass-input"
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value)}
            style={{ padding: '10px 14px', fontSize: '12px', minWidth: '130px', cursor: 'pointer' }}
          >
            <option value="Alle">Alle Kategorien</option>
            {CATEGORY_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Upload Panel */}
      {showUpload && (
        <div className="glass-card" style={{ position: 'relative' }}>
          <div className="card-title">Datei hochladen</div>

          <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '140px' }}>
              <label style={{ fontSize: '10px', fontWeight: 700, color: 'var(--bronze)', letterSpacing: '1.5px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                Zugriff
              </label>
              <select
                className="glass-input"
                value={uploadSettings.access}
                onChange={e => setUploadSettings(s => ({ ...s, access: e.target.value }))}
                style={{ width: '100%', padding: '8px 12px', fontSize: '12px', cursor: 'pointer' }}
              >
                {ACCESS_OPTIONS.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div style={{ flex: 1, minWidth: '140px' }}>
              <label style={{ fontSize: '10px', fontWeight: 700, color: 'var(--bronze)', letterSpacing: '1.5px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                Kategorie
              </label>
              <select
                className="glass-input"
                value={uploadSettings.category}
                onChange={e => setUploadSettings(s => ({ ...s, category: e.target.value }))}
                style={{ width: '100%', padding: '8px 12px', fontSize: '12px', cursor: 'pointer' }}
              >
                {CATEGORY_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div
            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            style={{
              border: `2px dashed ${dragOver ? 'var(--bronze)' : 'rgba(184,115,51,0.3)'}`,
              borderRadius: '16px', padding: '36px 24px', textAlign: 'center',
              cursor: 'pointer', transition: 'all 0.2s',
              background: dragOver ? 'rgba(184,115,51,0.08)' : 'rgba(250,244,236,0.3)',
            }}
          >
            <div style={{ fontSize: '36px', marginBottom: '12px', opacity: 0.6 }}>&#128193;</div>
            <div style={{ fontFamily: 'var(--f-head)', fontSize: '16px', color: 'var(--forest)', marginBottom: '6px' }}>
              {dragOver ? 'Datei hier ablegen' : 'Dateien hierhin ziehen'}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-light)' }}>
              oder <span style={{ color: 'var(--bronze)', fontWeight: 700 }}>klicken</span> zum Ausw&auml;hlen
            </div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '8px' }}>
              PDF, DOCX, XLSX, PPTX, JPG, PNG &mdash; Max. 25MB
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.docx,.xlsx,.pptx,.jpg,.jpeg,.png,.csv"
            onChange={e => handleFiles(e.target.files)}
            style={{ display: 'none' }}
          />

          <button
            onClick={() => setShowUpload(false)}
            style={{
              position: 'absolute', top: '16px', right: '18px',
              background: 'none', border: 'none', fontSize: '18px',
              color: 'var(--text-light)', cursor: 'pointer', padding: '4px',
            }}
          >
            &#10005;
          </button>
        </div>
      )}

      {/* Document List */}
      <div className="glass-card">
        <div className="card-title">
          Dokumente &amp; Ressourcen &mdash; {filteredDocs.length} Dateien
          {searchTerm && <span style={{ fontWeight: 400, fontSize: '10px', marginLeft: '8px', color: 'var(--text-light)' }}>Suche: &ldquo;{searchTerm}&rdquo;</span>}
        </div>

        {filteredDocs.map((doc, i) => {
          const ext = doc.type;
          const isUploaded = doc.isUploaded;
          const uploadedIndex = isUploaded ? uploadedFiles.findIndex(f => f.name === doc.name) : -1;

          return (
            <div key={`${doc.name}-${i}`} className="doc" data-clickable onClick={() => openDoc(doc)} style={{ position: 'relative' }}>
              <div className={`d-icon ${iconClass[ext] || 'dp'}`}>
                {iconEmoji[ext] || '\u{1F4C4}'}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="d-name" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{doc.name}</span>
                  {isUploaded && (
                    <span style={{
                      fontSize: '8px', padding: '2px 6px', borderRadius: '4px',
                      background: 'rgba(47,79,79,0.12)', color: 'var(--forest2)',
                      border: '1px solid rgba(47,79,79,0.2)', fontWeight: 700,
                      letterSpacing: '0.5px', textTransform: 'uppercase', flexShrink: 0,
                    }}>
                      Neu
                    </span>
                  )}
                </div>
                <div className="d-meta" style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <span>{doc.date} &middot; {ext.toUpperCase()}</span>
                  {doc.category !== 'Allgemein' && (
                    <span style={{
                      fontSize: '9px', padding: '1px 6px', borderRadius: '4px',
                      background: 'rgba(184,115,51,0.1)', color: 'var(--bronze)',
                      border: '1px solid rgba(184,115,51,0.15)', fontWeight: 600,
                    }}>
                      {doc.category}
                    </span>
                  )}
                  {doc.access !== 'Alle Rollen' && (
                    <span style={{
                      fontSize: '9px', padding: '1px 6px', borderRadius: '4px',
                      background: 'rgba(47,79,79,0.08)', color: 'var(--forest2)',
                      border: '1px solid rgba(47,79,79,0.12)', fontWeight: 600,
                    }}>
                      &#128274; {doc.access}
                    </span>
                  )}
                </div>
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-light)', flexShrink: 0 }}>{doc.size}</div>

              {isUploaded && uploadedIndex >= 0 ? (
                <button
                  onClick={(e) => { e.stopPropagation(); removeUploaded(uploadedIndex); }}
                  style={{
                    background: 'rgba(192,57,43,0.1)', border: '1px solid rgba(192,57,43,0.2)',
                    color: '#c0392b', borderRadius: '8px', padding: '4px 8px',
                    cursor: 'pointer', fontSize: '10px', fontWeight: 700,
                    marginLeft: '8px', flexShrink: 0, fontFamily: 'var(--f-body)',
                  }}
                  title="Entfernen"
                >
                  &#10005;
                </button>
              ) : (
                <div style={{ fontSize: '16px', color: 'var(--bronze)', marginLeft: '12px', flexShrink: 0 }}>&darr;</div>
              )}
            </div>
          );
        })}

        {filteredDocs.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)', fontSize: '13px' }}>
            Keine Dokumente gefunden.
          </div>
        )}
      </div>

      <DripfyFooter />

      <DetailModal open={!!modal} onClose={() => setModal(null)} title={modal?.title || ''}>
        {modal?.body}
      </DetailModal>
    </AppShell>
  );
}
