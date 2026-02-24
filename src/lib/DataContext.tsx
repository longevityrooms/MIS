'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Role } from './types';
import {
  PROJECT_TASKS, PROJECT_RISKS, PROJECT_BUDGET,
  PROJECT_ANNOUNCEMENTS, PROJECT_DOCUMENTS,
  GANTT_DATA, GANTT_ASSIGNEES,
} from './constants';

/* ── Types ─────────────────────────────────────────────── */
export interface TaskItem { title: string; owner: string; phase: number; priority: string; status: string; progress: number; due: string; }
export interface RiskItem { title: string; impact: string; prob: string; status: string; owner: string; mitigation: string; }
export interface BudgetCat { name: string; budget: number; spent: number; color: string; }
export type BudgetData = { total: number; spent: number; committed: number; cats: BudgetCat[] };
export interface AnnouncementItem { title: string; date: string; author: string; priority: string; body: string; role: string; }
export interface DocumentItem { name: string; type: string; date: string; size: string; access: string; isUploaded?: boolean; }
export type GanttPhase = { label: string; color: string; link: string; tasks: GanttTaskItem[] };
export type GanttTaskItem = { name: string; active: number[]; status: 'done' | 'active' | 'pending'; link: string; assignee?: string; description?: string };

export interface ActivityLogEntry {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  userRole: Role;
  action: 'add' | 'edit' | 'delete';
  entity: 'task' | 'risk' | 'budget' | 'announcement' | 'document' | 'gantt';
  entityTitle: string;
  details?: string;
}

interface CurrentUser { id: string; name: string; role: Role }

interface DataState {
  tasks: TaskItem[];
  risks: RiskItem[];
  budget: BudgetData;
  announcements: AnnouncementItem[];
  documents: DocumentItem[];
  ganttData: GanttPhase[];
  activityLog: ActivityLogEntry[];
}

interface DataContextValue extends DataState {
  currentUser: CurrentUser | null;
  // Tasks
  addTask(t: TaskItem): void;
  updateTask(i: number, u: Partial<TaskItem>): void;
  deleteTask(i: number): void;
  // Risks
  addRisk(r: RiskItem): void;
  updateRisk(i: number, u: Partial<RiskItem>): void;
  deleteRisk(i: number): void;
  // Budget
  updateBudgetTotals(u: Partial<Pick<BudgetData, 'total' | 'spent' | 'committed'>>): void;
  addBudgetCategory(c: BudgetCat): void;
  updateBudgetCategory(i: number, u: Partial<BudgetCat>): void;
  deleteBudgetCategory(i: number): void;
  // Announcements
  addAnnouncement(a: AnnouncementItem): void;
  updateAnnouncement(i: number, u: Partial<AnnouncementItem>): void;
  deleteAnnouncement(i: number): void;
  // Documents
  addDocument(d: DocumentItem): void;
  deleteDocument(i: number): void;
  // Gantt
  setGanttData(d: GanttPhase[]): void;
  // Helpers
  ganttAssignees: typeof GANTT_ASSIGNEES;
}

const DataContext = createContext<DataContextValue | null>(null);

const FALLBACK: DataContextValue = {
  tasks: [], risks: [], budget: { total: 0, spent: 0, committed: 0, cats: [] },
  announcements: [], documents: [], ganttData: [], activityLog: [],
  currentUser: null, ganttAssignees: GANTT_ASSIGNEES,
  addTask() {}, updateTask() {}, deleteTask() {},
  addRisk() {}, updateRisk() {}, deleteRisk() {},
  updateBudgetTotals() {}, addBudgetCategory() {}, updateBudgetCategory() {}, deleteBudgetCategory() {},
  addAnnouncement() {}, updateAnnouncement() {}, deleteAnnouncement() {},
  addDocument() {}, deleteDocument() {},
  setGanttData() {},
};

export function useData() {
  const ctx = useContext(DataContext);
  return ctx || FALLBACK;
}

/* ── Defaults from constants ─────────────────────────── */
function defaults(): DataState {
  return {
    tasks: PROJECT_TASKS.map(t => ({ ...t })),
    risks: PROJECT_RISKS.map(r => ({ ...r })),
    budget: { total: PROJECT_BUDGET.total, spent: PROJECT_BUDGET.spent, committed: PROJECT_BUDGET.committed, cats: PROJECT_BUDGET.cats.map(c => ({ ...c })) },
    announcements: PROJECT_ANNOUNCEMENTS.map(a => ({ ...a })),
    documents: PROJECT_DOCUMENTS.map(d => ({ ...d })),
    ganttData: GANTT_DATA.map(p => ({ ...p, tasks: p.tasks.map(t => ({ ...t })) })),
    activityLog: [],
  };
}

const LS_KEY = 'mis-data-v2';

function loadFromStorage(): DataState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) return JSON.parse(raw) as DataState;
  } catch { /* ignore */ }
  return null;
}

function saveToStorage(s: DataState) {
  if (typeof window === 'undefined') return;
  try {
    // Cap activity log at 500
    const capped = { ...s, activityLog: s.activityLog.slice(0, 500) };
    localStorage.setItem(LS_KEY, JSON.stringify(capped));
  } catch { /* ignore */ }
}

/* ── Provider ──────────────────────────────────────────── */
export function DataProvider({ children, user }: { children: ReactNode; user: CurrentUser | null }) {
  const [state, setState] = useState<DataState>(() => loadFromStorage() || defaults());

  // Save on every change
  useEffect(() => { saveToStorage(state); }, [state]);

  const log = useCallback((action: ActivityLogEntry['action'], entity: ActivityLogEntry['entity'], entityTitle: string, details?: string) => {
    if (!user) return;
    const entry: ActivityLogEntry = {
      id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      timestamp: new Date().toISOString(),
      userId: user.id,
      userName: user.name,
      userRole: user.role,
      action, entity, entityTitle,
      details,
    };
    setState(prev => ({ ...prev, activityLog: [entry, ...prev.activityLog] }));
  }, [user]);

  /* Tasks */
  const addTask = useCallback((t: TaskItem) => {
    setState(p => ({ ...p, tasks: [...p.tasks, t] }));
    log('add', 'task', t.title);
  }, [log]);
  const updateTask = useCallback((i: number, u: Partial<TaskItem>) => {
    setState(p => {
      const arr = [...p.tasks]; const old = arr[i];
      arr[i] = { ...old, ...u } as TaskItem;
      return { ...p, tasks: arr };
    });
    setState(p => p); // trigger save
    log('edit', 'task', state.tasks[i]?.title || '');
  }, [log, state.tasks]);
  const deleteTask = useCallback((i: number) => {
    const title = state.tasks[i]?.title || '';
    setState(p => ({ ...p, tasks: p.tasks.filter((_, idx) => idx !== i) }));
    log('delete', 'task', title);
  }, [log, state.tasks]);

  /* Risks */
  const addRisk = useCallback((r: RiskItem) => {
    setState(p => ({ ...p, risks: [...p.risks, r] }));
    log('add', 'risk', r.title);
  }, [log]);
  const updateRisk = useCallback((i: number, u: Partial<RiskItem>) => {
    const title = state.risks[i]?.title || '';
    setState(p => {
      const arr = [...p.risks]; arr[i] = { ...arr[i], ...u } as RiskItem;
      return { ...p, risks: arr };
    });
    log('edit', 'risk', title);
  }, [log, state.risks]);
  const deleteRisk = useCallback((i: number) => {
    const title = state.risks[i]?.title || '';
    setState(p => ({ ...p, risks: p.risks.filter((_, idx) => idx !== i) }));
    log('delete', 'risk', title);
  }, [log, state.risks]);

  /* Budget */
  const updateBudgetTotals = useCallback((u: Partial<Pick<BudgetData, 'total' | 'spent' | 'committed'>>) => {
    setState(p => ({ ...p, budget: { ...p.budget, ...u } }));
    log('edit', 'budget', 'Gesamtbudget');
  }, [log]);
  const addBudgetCategory = useCallback((c: BudgetCat) => {
    setState(p => ({ ...p, budget: { ...p.budget, cats: [...p.budget.cats, c] } }));
    log('add', 'budget', c.name);
  }, [log]);
  const updateBudgetCategory = useCallback((i: number, u: Partial<BudgetCat>) => {
    const name = state.budget.cats[i]?.name || '';
    setState(p => {
      const cats = [...p.budget.cats]; cats[i] = { ...cats[i], ...u } as BudgetCat;
      return { ...p, budget: { ...p.budget, cats } };
    });
    log('edit', 'budget', name);
  }, [log, state.budget.cats]);
  const deleteBudgetCategory = useCallback((i: number) => {
    const name = state.budget.cats[i]?.name || '';
    setState(p => ({ ...p, budget: { ...p.budget, cats: p.budget.cats.filter((_, idx) => idx !== i) } }));
    log('delete', 'budget', name);
  }, [log, state.budget.cats]);

  /* Announcements */
  const addAnnouncement = useCallback((a: AnnouncementItem) => {
    setState(p => ({ ...p, announcements: [a, ...p.announcements] }));
    log('add', 'announcement', a.title);
  }, [log]);
  const updateAnnouncement = useCallback((i: number, u: Partial<AnnouncementItem>) => {
    const title = state.announcements[i]?.title || '';
    setState(p => {
      const arr = [...p.announcements]; arr[i] = { ...arr[i], ...u } as AnnouncementItem;
      return { ...p, announcements: arr };
    });
    log('edit', 'announcement', title);
  }, [log, state.announcements]);
  const deleteAnnouncement = useCallback((i: number) => {
    const title = state.announcements[i]?.title || '';
    setState(p => ({ ...p, announcements: p.announcements.filter((_, idx) => idx !== i) }));
    log('delete', 'announcement', title);
  }, [log, state.announcements]);

  /* Documents */
  const addDocument = useCallback((d: DocumentItem) => {
    setState(p => ({ ...p, documents: [d, ...p.documents] }));
    log('add', 'document', d.name);
  }, [log]);
  const deleteDocument = useCallback((i: number) => {
    const name = state.documents[i]?.name || '';
    setState(p => ({ ...p, documents: p.documents.filter((_, idx) => idx !== i) }));
    log('delete', 'document', name);
  }, [log, state.documents]);

  /* Gantt */
  const setGanttData = useCallback((d: GanttPhase[]) => {
    setState(p => ({ ...p, ganttData: d }));
    log('edit', 'gantt', 'Projektzeitplan');
  }, [log]);

  const value: DataContextValue = {
    ...state,
    currentUser: user,
    addTask, updateTask, deleteTask,
    addRisk, updateRisk, deleteRisk,
    updateBudgetTotals, addBudgetCategory, updateBudgetCategory, deleteBudgetCategory,
    addAnnouncement, updateAnnouncement, deleteAnnouncement,
    addDocument, deleteDocument,
    setGanttData,
    ganttAssignees: GANTT_ASSIGNEES,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
