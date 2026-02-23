'use client';

import { ReactNode, useEffect } from 'react';

interface DetailModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export default function DetailModal({ open, onClose, title, children }: DetailModalProps) {
  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (open) window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div className={`detail-overlay ${open ? 'open' : ''}`} onClick={onClose} />

      {/* Panel */}
      <div className={`detail-panel ${open ? 'open' : ''}`}>
        {/* Mobile drag handle */}
        <div className="detail-handle"><div className="detail-handle-bar" /></div>

        {/* Header */}
        <div className="detail-header">
          <div className="detail-title">{title}</div>
          <button className="detail-close" onClick={onClose} aria-label="Schließen">✕</button>
        </div>

        {/* Scrollable body */}
        <div className="detail-body">
          {children}
        </div>
      </div>
    </>
  );
}
