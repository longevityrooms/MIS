export type Role = 'PM' | 'Investor' | 'MD' | 'Contractor' | 'Marketing';

export interface Profile {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar_url?: string;
  created_at: string;
}

export type Phase = 'Planung' | 'Genehmigung' | 'Bau' | 'Ausstattung' | 'Eröffnung';
export type Priority = 'Hoch' | 'Mittel' | 'Niedrig';
export type TaskStatus = 'Offen' | 'In Bearbeitung' | 'Abgeschlossen' | 'Blockiert';

export interface Task {
  id: string;
  title: string;
  description?: string;
  owner?: string;
  owner_profile?: Profile;
  phase: Phase;
  priority: Priority;
  status: TaskStatus;
  progress: number;
  due_date?: string;
  created_at: string;
  updated_at: string;
}

export type RiskImpact = 'Hoch' | 'Mittel' | 'Niedrig';
export type RiskProbability = 'Hoch' | 'Mittel' | 'Niedrig';
export type RiskStatus = 'Offen' | 'Gemindert' | 'Geschlossen';

export interface Risk {
  id: string;
  title: string;
  description?: string;
  impact: RiskImpact;
  probability: RiskProbability;
  status: RiskStatus;
  mitigation?: string;
  owner?: string;
  owner_profile?: Profile;
  created_at: string;
  updated_at: string;
}

export interface BudgetCategory {
  id: string;
  name: string;
  budget: number;
  spent: number;
  color: string;
  created_at: string;
  updated_at: string;
}

export type AnnouncementPriority = 'Dringend' | 'Hoch' | 'Normal' | 'Niedrig';

export interface Announcement {
  id: string;
  title: string;
  body: string;
  author?: string;
  author_profile?: Profile;
  priority: AnnouncementPriority;
  role_visibility: Role[];
  created_at: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  size?: string;
  url?: string;
  uploaded_by?: string;
  access_roles: Role[];
  created_at: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
