import type { ReactNode } from 'react';

/* ── Currency ────────────────────────────────────────────── */
export const fmtEur = (v: number) => v >= 1e6 ? `€${(v / 1e6).toFixed(1)}M` : v >= 1e3 ? `€${(v / 1e3).toFixed(0)}K` : `€${v}`;

/* ── Task Priority ───────────────────────────────────────── */
const PRIO_CLASS: Record<string, string> = { critical: 'pc', high: 'ph2', medium: 'pm2' };
const PRIO_LABEL: Record<string, string> = { critical: 'KRITISCH', high: 'HOCH', medium: 'MITTEL', low: 'NIEDRIG' };
export const priorityClass = (p: string) => PRIO_CLASS[p] || 'pm2';
export const priorityLabel = (p: string) => PRIO_LABEL[p] || p.toUpperCase();

/* ── Task Status ─────────────────────────────────────────── */
const STAT_CLASS: Record<string, string> = { done: 'sd', in_progress: 'sp', blocked: 'sbl' };
const STAT_LABEL: Record<string, string> = { done: 'Abgeschlossen', in_progress: 'In Bearbeitung', blocked: 'Blockiert', not_started: 'Nicht begonnen' };
export const statusClass = (s: string) => STAT_CLASS[s] || 'sw';
export const statusLabel = (s: string) => STAT_LABEL[s] || s;

/* ── Risk helpers ────────────────────────────────────────── */
const IMPACT_LABEL: Record<string, string> = { critical: 'Kritisch', high: 'Hoch', medium: 'Mittel', low: 'Niedrig' };
const PROB_LABEL: Record<string, string> = { high: 'Hoch', medium: 'Mittel', low: 'Niedrig' };
export const impactLabel = (s: string) => IMPACT_LABEL[s] || s;
export const probLabel = (s: string) => PROB_LABEL[s] || s;
export const riskBarClass = (i: string) => i === 'critical' ? 'rc' : i === 'high' ? 'rh' : 'rm';
export const riskStatusClass = (s: string) => s === 'active' ? 'ra' : s === 'mitigation' ? 'rmi' : 'rw';
export const riskStatusLabel = (s: string) => s === 'active' ? 'AKTIV' : s === 'watching' ? 'MONITOR' : s === 'mitigation' ? 'MINDERUNG' : s.toUpperCase();

/* ── Milestone icon ──────────────────────────────────────── */
export const msIcon = (s: 'done' | 'active' | 'pending') => s === 'done' ? '✓' : s === 'active' ? '◉' : '○';

/* ── Phase data ──────────────────────────────────────────── */
export const PHASE_NAMES: Record<number, string> = { 1: 'Gründung & Genehmigungen', 2: 'Umbau & Ausstattung', 3: 'Zertifizierung & Compliance', 4: 'Marketing & Launch', 5: 'Betrieb & Optimierung' };
export const PHASE_CLR: Record<number, string> = { 1: '#2F4F4F', 2: '#B87333', 3: '#4d7c7c', 4: '#8b6914', 5: '#5a8080' };

/* ── Time formatting ─────────────────────────────────────── */
export function formatTime(ts: string) {
  try {
    const d = new Date(ts), diff = Date.now() - d.getTime(), mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Gerade eben';
    if (mins < 60) return `Vor ${mins} Min.`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `Vor ${hrs} Std.`;
    const days = Math.floor(hrs / 24);
    if (days < 7) return `Vor ${days} Tag${days > 1 ? 'en' : ''}`;
    return d.toLocaleDateString('de-DE', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  } catch { return ts; }
}

/* ── Shared types ────────────────────────────────────────── */
export type ModalContent = { title: string; body: ReactNode } | null;
