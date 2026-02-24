'use client';

import { useState } from 'react';
import AppShell from '@/components/AppShell';
import { useData, ActivityLogEntry } from '@/lib/DataContext';

const ACTION_ICONS: Record<string, { icon: string; cls: string; label: string }> = {
  add:    { icon: '+', cls: 'log-icon-add', label: 'Hinzugefügt' },
  edit:   { icon: '✎', cls: 'log-icon-edit', label: 'Bearbeitet' },
  delete: { icon: '✕', cls: 'log-icon-delete', label: 'Gelöscht' },
};

const ENTITY_LABELS: Record<string, string> = {
  task: 'Aufgabe',
  risk: 'Risiko',
  budget: 'Budget',
  announcement: 'Ankündigung',
  document: 'Dokument',
  gantt: 'Projektzeitplan',
};

function formatTime(ts: string) {
  try {
    const d = new Date(ts);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Gerade eben';
    if (mins < 60) return `Vor ${mins} Min.`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `Vor ${hours} Std.`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `Vor ${days} Tag${days > 1 ? 'en' : ''}`;
    return d.toLocaleDateString('de-DE', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  } catch {
    return ts;
  }
}

export default function ActivityLogPage() {
  return <AppShell><ActivityLogContent /></AppShell>;
}

function ActivityLogContent() {
  const { activityLog } = useData();
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filtered = activityLog.filter(entry => {
    if (filter !== 'all' && entry.action !== filter) return false;
    if (search && !entry.entityTitle.toLowerCase().includes(search.toLowerCase()) && !entry.userName.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const totalCount = activityLog.length;
  const addCount = activityLog.filter(e => e.action === 'add').length;
  const editCount = activityLog.filter(e => e.action === 'edit').length;
  const deleteCount = activityLog.filter(e => e.action === 'delete').length;

  return (
    <>
      <div className="sec-hdr">
        <div className="sec-title">Aktivitätslog</div>
        <div className="ornament">◆ ◆ ◆</div>
      </div>

      <div className="grid4">
        <div className="stat" data-clickable onClick={() => setFilter('all')}>
          <div className="stat-lbl">Gesamt</div>
          <div className="stat-val">{totalCount}</div>
          <div className="stat-sub">Alle Aktionen</div>
        </div>
        <div className="stat" data-clickable onClick={() => setFilter('add')}>
          <div className="stat-lbl">Hinzugefügt</div>
          <div className="stat-val" style={{ color: 'var(--forest)' }}>{addCount}</div>
          <div className="stat-sub">Neue Einträge</div>
        </div>
        <div className="stat" data-clickable onClick={() => setFilter('edit')}>
          <div className="stat-lbl">Bearbeitet</div>
          <div className="stat-val" style={{ color: 'var(--bronze)' }}>{editCount}</div>
          <div className="stat-sub">Änderungen</div>
        </div>
        <div className="stat" data-clickable onClick={() => setFilter('delete')}>
          <div className="stat-lbl">Gelöscht</div>
          <div className="stat-val" style={{ color: '#c0392b' }}>{deleteCount}</div>
          <div className="stat-sub">Entfernte Einträge</div>
        </div>
      </div>

      {/* Filter bar */}
      <div className="glass-card" style={{ marginTop: 16, display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flex: 1, minWidth: 140, position: 'relative' }}>
          <input type="text" className="glass-input" placeholder="Suche in Aktivitäten..." value={search} onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', padding: '10px 14px 10px 36px', fontSize: 13 }} />
          <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 14, color: 'var(--text-muted)' }}>&#128269;</span>
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

      {/* Log entries */}
      <div className="glass-card" style={{ marginTop: 16 }}>
        <div className="card-title">Aktivitäten — {filtered.length} Einträge {filter !== 'all' && `(${ACTION_ICONS[filter]?.label})`}</div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)', fontSize: 13 }}>
            {totalCount === 0 ? 'Noch keine Aktivitäten vorhanden. Sobald Sie Änderungen vornehmen, werden diese hier protokolliert.' : 'Keine Einträge für diesen Filter.'}
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
