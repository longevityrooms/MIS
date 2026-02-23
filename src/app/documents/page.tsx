'use client';

import { PROJECT_DOCUMENTS } from '@/lib/constants';
import AppShell from '@/components/AppShell';

const iconClass: Record<string, string> = {
  pdf: 'dp',
  docx: 'dd',
  xlsx: 'dx',
  pptx: 'dpp',
};

const iconEmoji: Record<string, string> = {
  pdf: '\u{1F4C4}',
  docx: '\u{1F4DD}',
  xlsx: '\u{1F4CA}',
  pptx: '\u{1F4CB}',
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

export default function DocumentsPage() {
  return (
    <AppShell>
      <div className="glass-card">
        <div className="card-title">Dokumente &amp; Ressourcen &mdash; {PROJECT_DOCUMENTS.length} Dateien zug&auml;nglich</div>
        {PROJECT_DOCUMENTS.map((doc, i) => (
          <div key={i} className="doc">
            <div className={`d-icon ${iconClass[doc.type] || 'dp'}`}>
              {iconEmoji[doc.type] || '\u{1F4C4}'}
            </div>
            <div style={{ flex: 1 }}>
              <div className="d-name">{doc.name}</div>
              <div className="d-meta">{doc.date} &middot; {doc.type.toUpperCase()}</div>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-light)' }}>{doc.size}</div>
            <div style={{ fontSize: '16px', color: 'var(--bronze)', marginLeft: '12px' }}>&darr;</div>
          </div>
        ))}
      </div>

      <DripfyFooter />
    </AppShell>
  );
}
