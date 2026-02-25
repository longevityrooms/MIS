'use client';

import { useState } from 'react';
import AppShell from '@/components/AppShell';
import { useData } from '@/lib/DataContext';
import { formatTime } from '@/lib/ui';

const ACTION_ICONS: Record<string, { icon: string; cls: string; label: string }> = {
  add: { icon: '+', cls: 'log-icon-add', label: 'Hinzugefügt' },
  edit: { icon: '✎', cls: 'log-icon-edit', label: 'Bearbeitet' },
  delete: { icon: '✕', cls: 'log-icon-delete', label: 'Gelöscht' },
};

const ENTITY_LABELS: Record<string, string> = {
  task: 'Aufgabe', risk: 'Risiko', budget: 'Budget', announcement: 'Ankündigung', document: 'Dokument', gantt: 'Projektzeitplan',
};

export default function ActivityLogPage() {
  return <AppShell><ActivityLogContent /></AppShell>;
}

function ActivityLogContent() {
  const { activityLog } = useData();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = activityLog.filter(e => {
    if (filter !== 'all' && e.action !== filter) return false;
    if (search) { const q = search.toLowerCase(); return e.entityTitle.toLowerCase().includes(q) || e.userName.toLowerCase().includes(q); }
    return true;
  });

  const counts = { total: activityLog.length, add: activityLog.filter(e => e.action === 'add').length, edit: activityLog.filter(e => e.action === 'edit').length, delete: activityLog.filter(e => e.action === 'delete').length };

  return (
    <>
      <div className="sec-hdr"><div className="sec-title">Aktivitätslog</div><div className="ornament">◆ ◆ ◆</div></div>

      <div className="grid4">
        {[
          { key: 'all', label: 'Gesamt', val: counts.total, sub: 'Alle Aktionen' },
          { key: 'add', label: 'Hinzugefügt', val: counts.add, sub: 'Neue Einträge', color: 'var(--forest)' },
          { key: 'edit', label: 'Bearbeitet', val: counts.edit, sub: 'Änderungen', color: 'var(--bronze)' },
          { key: 'delete', label: 'Gelöscht', val: counts.delete, sub: 'Entfernte Einträge', color: '#c0392b' },
        ].map(s => (
          <div key={s.key} className="stat" data-clickable onClick={() => setFilter(s.key)}>
            <div className="stat-lbl">{s.label}</div>
            <div className="stat-val" style={s.color ? { color: s.color } : undefined}>{s.val}</div>
            <div className="stat-sub">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="glass-card" style={{ marginTop: 16, display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
        <div className="doc-search-wrap" style={{ flex: 1, minWidth: 140 }}>
          <input type="text" className="glass-input doc-search" placeholder="Suche in Aktivitäten..." value={search} onChange={e => setSearch(e.target.value)} />
          <span className="doc-search-icon">&#128269;</span>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {['all', 'add', 'edit', 'delete'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className="crud-btn" style={{
              background: filter === f ? 'var(--forest)' : 'rgba(47,79,79,0.08)',
              color: filter === f ? '#fff' : 'var(--forest)',
              border: `1px solid ${filter === f ? 'var(--forest)' : 'rgba(47,79,79,0.2)'}`,
            }}>
              {f === 'all' ? 'Alle' : ACTION_ICONS[f]?.label || f}
            </button>
          ))}
        </div>
      </div>

      <div className="glass-card" style={{ marginTop: 16 }}>
        <div className="card-title">Aktivitäten — {filtered.length} Einträge {filter !== 'all' && `(${ACTION_ICONS[filter]?.label})`}</div>
        {filtered.length === 0 && (
          <div className="empty-state">
            {counts.total === 0 ? 'Noch keine Aktivitäten vorhanden. Sobald Sie Änderungen vornehmen, werden diese hier protokolliert.' : 'Keine Einträge für diesen Filter.'}
          </div>
        )}
        {filtered.map((entry, i) => {
          const ai = ACTION_ICONS[entry.action] || ACTION_ICONS.edit;
          const el = ENTITY_LABELS[entry.entity] || entry.entity;
          return (
            <div key={entry.id || i} className="log-entry">
              <div className={`log-icon ${ai.cls}`}>{ai.icon}</div>
              <div className="log-text">
                <div className="log-title">
                  <strong>{entry.userName}</strong>{' '}
                  <span style={{ color: 'var(--text-light)' }}>hat</span>{' '}
                  <span style={{ color: entry.action === 'delete' ? '#c0392b' : entry.action === 'add' ? 'var(--forest)' : 'var(--bronze)', fontWeight: 600 }}>
                    {el} {ai.label.toLowerCase()}
                  </span>
                </div>
                <div className="log-meta">
                  <span style={{ fontWeight: 600 }}>{entry.entityTitle}</span>
                  {entry.details && <span> · {entry.details}</span>}
                </div>
              </div>
              <div className="log-time">{formatTime(entry.timestamp)}</div>
            </div>
          );
        })}
      </div>

      <div className="dripfy-footer" style={{ marginTop: 16 }}>Powered by <a href="https://dripfy.app" target="_blank" rel="noopener noreferrer">DRIPFY.APP</a></div>
    </>
  );
}
