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
  id: string; timestamp: string; userId: string; userName: string; userRole: Role;
  action: 'add' | 'edit' | 'delete';
  entity: 'task' | 'risk' | 'budget' | 'announcement' | 'document' | 'gantt';
  entityTitle: string; details?: string;
}

interface CurrentUser { id: string; name: string; role: Role }

interface DataState {
  tasks: TaskItem[]; risks: RiskItem[]; budget: BudgetData;
  announcements: AnnouncementItem[]; documents: DocumentItem[];
  ganttData: GanttPhase[]; activityLog: ActivityLogEntry[];
}

interface DataContextValue extends DataState {
  currentUser: CurrentUser | null;
  addTask(t: TaskItem): void; updateTask(i: number, u: Partial<TaskItem>): void; deleteTask(i: number): void;
  addRisk(r: RiskItem): void; updateRisk(i: number, u: Partial<RiskItem>): void; deleteRisk(i: number): void;
  updateBudgetTotals(u: Partial<Pick<BudgetData, 'total' | 'spent' | 'committed'>>): void;
  addBudgetCategory(c: BudgetCat): void; updateBudgetCategory(i: number, u: Partial<BudgetCat>): void; deleteBudgetCategory(i: number): void;
  addAnnouncement(a: AnnouncementItem): void; updateAnnouncement(i: number, u: Partial<AnnouncementItem>): void; deleteAnnouncement(i: number): void;
  addDocument(d: DocumentItem): void; deleteDocument(i: number): void;
  setGanttData(d: GanttPhase[]): void;
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

export function useData() { return useContext(DataContext) || FALLBACK; }

/* ── Defaults ──────────────────────────────────────────── */
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

function loadLS(): DataState | null {
  if (typeof window === 'undefined') return null;
  try { const r = localStorage.getItem(LS_KEY); return r ? JSON.parse(r) : null; } catch { return null; }
}

function saveLS(s: DataState) {
  if (typeof window === 'undefined') return;
  try { localStorage.setItem(LS_KEY, JSON.stringify({ ...s, activityLog: s.activityLog.slice(0, 500) })); } catch { /* */ }
}

/* ── Provider ──────────────────────────────────────────── */
export function DataProvider({ children, user }: { children: ReactNode; user: CurrentUser | null }) {
  const [state, setState] = useState<DataState>(() => loadLS() || defaults());
  useEffect(() => { saveLS(state); }, [state]);

  const log = useCallback((action: ActivityLogEntry['action'], entity: ActivityLogEntry['entity'], entityTitle: string, details?: string) => {
    if (!user) return;
    const entry: ActivityLogEntry = {
      id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      timestamp: new Date().toISOString(), userId: user.id, userName: user.name, userRole: user.role,
      action, entity, entityTitle, details,
    };
    setState(p => ({ ...p, activityLog: [entry, ...p.activityLog] }));
  }, [user]);

  /* Generic array CRUD helpers */
  type ArrKey = 'tasks' | 'risks' | 'announcements' | 'documents';

  const addItem = useCallback(<T,>(key: ArrKey, item: T, entity: ActivityLogEntry['entity'], title: string, prepend = false) => {
    setState(p => ({ ...p, [key]: prepend ? [item, ...p[key]] : [...p[key], item] }));
    log('add', entity, title);
  }, [log]);

  const updateItem = useCallback(<T,>(key: ArrKey, i: number, u: Partial<T>, entity: ActivityLogEntry['entity']) => {
    setState(p => {
      const arr = [...p[key]] as unknown as T[];
      const rec = arr[i] as unknown as Record<string, unknown>;
      const title = ((rec?.title ?? rec?.name) || '') as string;
      arr[i] = { ...arr[i], ...u } as T;
      log('edit', entity, title);
      return { ...p, [key]: arr };
    });
  }, [log]);

  const deleteItem = useCallback((key: ArrKey, i: number, entity: ActivityLogEntry['entity']) => {
    setState(p => {
      const arr = p[key] as unknown as Record<string, unknown>[];
      const title = (arr[i]?.title ?? arr[i]?.name ?? '') as string;
      log('delete', entity, title);
      return { ...p, [key]: arr.filter((_, idx) => idx !== i) };
    });
  }, [log]);

  /* Tasks */
  const addTask = useCallback((t: TaskItem) => addItem('tasks', t, 'task', t.title), [addItem]);
  const updateTask = useCallback((i: number, u: Partial<TaskItem>) => updateItem<TaskItem>('tasks', i, u, 'task'), [updateItem]);
  const deleteTask = useCallback((i: number) => deleteItem('tasks', i, 'task'), [deleteItem]);

  /* Risks */
  const addRisk = useCallback((r: RiskItem) => addItem('risks', r, 'risk', r.title), [addItem]);
  const updateRisk = useCallback((i: number, u: Partial<RiskItem>) => updateItem<RiskItem>('risks', i, u, 'risk'), [updateItem]);
  const deleteRisk = useCallback((i: number) => deleteItem('risks', i, 'risk'), [deleteItem]);

  /* Announcements */
  const addAnnouncement = useCallback((a: AnnouncementItem) => addItem('announcements', a, 'announcement', a.title, true), [addItem]);
  const updateAnnouncement = useCallback((i: number, u: Partial<AnnouncementItem>) => updateItem<AnnouncementItem>('announcements', i, u, 'announcement'), [updateItem]);
  const deleteAnnouncement = useCallback((i: number) => deleteItem('announcements', i, 'announcement'), [deleteItem]);

  /* Documents */
  const addDocument = useCallback((d: DocumentItem) => addItem('documents', d, 'document', d.name, true), [addItem]);
  const deleteDocument = useCallback((i: number) => deleteItem('documents', i, 'document'), [deleteItem]);

  /* Budget (non-generic — nested structure) */
  const updateBudgetTotals = useCallback((u: Partial<Pick<BudgetData, 'total' | 'spent' | 'committed'>>) => {
    setState(p => ({ ...p, budget: { ...p.budget, ...u } }));
    log('edit', 'budget', 'Gesamtbudget');
  }, [log]);
  const addBudgetCategory = useCallback((c: BudgetCat) => {
    setState(p => ({ ...p, budget: { ...p.budget, cats: [...p.budget.cats, c] } }));
    log('add', 'budget', c.name);
  }, [log]);
  const updateBudgetCategory = useCallback((i: number, u: Partial<BudgetCat>) => {
    setState(p => {
      const cats = [...p.budget.cats];
      log('edit', 'budget', cats[i]?.name || '');
      cats[i] = { ...cats[i], ...u } as BudgetCat;
      return { ...p, budget: { ...p.budget, cats } };
    });
  }, [log]);
  const deleteBudgetCategory = useCallback((i: number) => {
    setState(p => {
      log('delete', 'budget', p.budget.cats[i]?.name || '');
      return { ...p, budget: { ...p.budget, cats: p.budget.cats.filter((_, idx) => idx !== i) } };
    });
  }, [log]);

  /* Gantt */
  const setGanttData = useCallback((d: GanttPhase[]) => {
    setState(p => ({ ...p, ganttData: d }));
    log('edit', 'gantt', 'Projektzeitplan');
  }, [log]);

  const value: DataContextValue = {
    ...state, currentUser: user,
    addTask, updateTask, deleteTask,
    addRisk, updateRisk, deleteRisk,
    updateBudgetTotals, addBudgetCategory, updateBudgetCategory, deleteBudgetCategory,
    addAnnouncement, updateAnnouncement, deleteAnnouncement,
    addDocument, deleteDocument,
    setGanttData, ganttAssignees: GANTT_ASSIGNEES,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
