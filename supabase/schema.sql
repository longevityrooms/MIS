-- Longevity Rooms Frankfurt MIS — Database Schema
-- Run this in Supabase SQL Editor

-- Enable Row Level Security on all tables

-- ============================================
-- PROFILES
-- ============================================
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  name text not null,
  email text not null,
  role text not null check (role in ('PM', 'Investor', 'MD', 'Contractor', 'Marketing')),
  avatar_url text,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users can read all profiles"
  on public.profiles for select
  to authenticated
  using (true);

create policy "Users can update own profile"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name, email, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.email,
    coalesce(new.raw_user_meta_data->>'role', 'Contractor')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================
-- TASKS
-- ============================================
create table public.tasks (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  owner uuid references public.profiles(id),
  phase text not null default 'Planung' check (phase in ('Planung', 'Genehmigung', 'Bau', 'Ausstattung', 'Eröffnung')),
  priority text not null default 'Mittel' check (priority in ('Hoch', 'Mittel', 'Niedrig')),
  status text not null default 'Offen' check (status in ('Offen', 'In Bearbeitung', 'Abgeschlossen', 'Blockiert')),
  progress integer default 0 check (progress >= 0 and progress <= 100),
  due_date date,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.tasks enable row level security;

create policy "Authenticated users can read tasks"
  on public.tasks for select to authenticated using (true);

create policy "PM and MD can insert tasks"
  on public.tasks for insert to authenticated
  with check (
    exists (select 1 from public.profiles where id = auth.uid() and role in ('PM', 'MD'))
  );

create policy "PM and MD can update tasks"
  on public.tasks for update to authenticated
  using (
    exists (select 1 from public.profiles where id = auth.uid() and role in ('PM', 'MD'))
    or owner = auth.uid()
  );

create policy "PM and MD can delete tasks"
  on public.tasks for delete to authenticated
  using (
    exists (select 1 from public.profiles where id = auth.uid() and role in ('PM', 'MD'))
  );

-- ============================================
-- RISKS
-- ============================================
create table public.risks (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  impact text not null default 'Mittel' check (impact in ('Hoch', 'Mittel', 'Niedrig')),
  probability text not null default 'Mittel' check (probability in ('Hoch', 'Mittel', 'Niedrig')),
  status text not null default 'Offen' check (status in ('Offen', 'Gemindert', 'Geschlossen')),
  mitigation text,
  owner uuid references public.profiles(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.risks enable row level security;

create policy "Authenticated users can read risks"
  on public.risks for select to authenticated using (true);

create policy "PM and MD can manage risks"
  on public.risks for all to authenticated
  using (
    exists (select 1 from public.profiles where id = auth.uid() and role in ('PM', 'MD'))
  );

-- ============================================
-- BUDGET CATEGORIES
-- ============================================
create table public.budget_categories (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  budget numeric not null default 0,
  spent numeric not null default 0,
  color text not null default '#2F4F4F',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.budget_categories enable row level security;

create policy "Authenticated users can read budget"
  on public.budget_categories for select to authenticated using (true);

create policy "PM, MD, Investor can manage budget"
  on public.budget_categories for all to authenticated
  using (
    exists (select 1 from public.profiles where id = auth.uid() and role in ('PM', 'MD', 'Investor'))
  );

-- ============================================
-- ANNOUNCEMENTS
-- ============================================
create table public.announcements (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  body text not null,
  author uuid references public.profiles(id),
  priority text not null default 'Normal' check (priority in ('Dringend', 'Hoch', 'Normal', 'Niedrig')),
  role_visibility text[] not null default '{PM,Investor,MD,Contractor,Marketing}',
  created_at timestamptz default now()
);

alter table public.announcements enable row level security;

create policy "Users can read announcements for their role"
  on public.announcements for select to authenticated
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid()
      and role = any(role_visibility)
    )
  );

create policy "PM, MD, Marketing can create announcements"
  on public.announcements for insert to authenticated
  with check (
    exists (select 1 from public.profiles where id = auth.uid() and role in ('PM', 'MD', 'Marketing'))
  );

-- ============================================
-- DOCUMENTS
-- ============================================
create table public.documents (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  type text not null default 'PDF',
  size text,
  url text,
  uploaded_by uuid references public.profiles(id),
  access_roles text[] not null default '{PM,Investor,MD,Contractor,Marketing}',
  created_at timestamptz default now()
);

alter table public.documents enable row level security;

create policy "Users can read documents for their role"
  on public.documents for select to authenticated
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid()
      and role = any(access_roles)
    )
  );

create policy "PM and MD can manage documents"
  on public.documents for all to authenticated
  using (
    exists (select 1 from public.profiles where id = auth.uid() and role in ('PM', 'MD'))
  );

-- ============================================
-- SEED DATA
-- ============================================

-- Budget categories
insert into public.budget_categories (name, budget, spent, color) values
  ('Bau & Renovierung', 850000, 425000, '#2F4F4F'),
  ('Ausstattung & Möbel', 320000, 96000, '#B87333'),
  ('Technologie & IT', 180000, 72000, '#3D6363'),
  ('Marketing & Branding', 150000, 45000, '#D4945A'),
  ('Genehmigungen & Recht', 95000, 76000, '#8B5A2B'),
  ('Personal & Schulung', 200000, 40000, '#1E3333');

-- Sample tasks
insert into public.tasks (title, phase, priority, status, progress, due_date) values
  ('Baugenehmigung einholen', 'Genehmigung', 'Hoch', 'Abgeschlossen', 100, '2024-06-15'),
  ('Innenarchitektur finalisieren', 'Planung', 'Hoch', 'In Bearbeitung', 75, '2024-07-01'),
  ('Elektrische Installation', 'Bau', 'Hoch', 'In Bearbeitung', 40, '2024-08-15'),
  ('Wellnessgeräte bestellen', 'Ausstattung', 'Mittel', 'Offen', 0, '2024-09-01'),
  ('Website & Buchungssystem', 'Ausstattung', 'Mittel', 'Offen', 10, '2024-09-15'),
  ('Personalrekrutierung starten', 'Eröffnung', 'Mittel', 'Offen', 0, '2024-10-01'),
  ('Brandschutzprüfung', 'Genehmigung', 'Hoch', 'In Bearbeitung', 60, '2024-07-20'),
  ('Marketingkampagne planen', 'Eröffnung', 'Niedrig', 'Offen', 5, '2024-10-15');

-- Sample risks
insert into public.risks (title, description, impact, probability, status, mitigation) values
  ('Bauverzögerung durch Lieferengpässe', 'Materiallieferungen könnten sich verzögern', 'Hoch', 'Mittel', 'Offen', 'Alternative Lieferanten identifizieren'),
  ('Budgetüberschreitung Bau', 'Baukosten könnten das Budget überschreiten', 'Hoch', 'Mittel', 'Gemindert', 'Puffer von 15% eingeplant'),
  ('Genehmigungsverzögerung', 'Behördliche Genehmigungen dauern länger als geplant', 'Mittel', 'Niedrig', 'Geschlossen', 'Frühzeitige Antragsstellung'),
  ('Fachkräftemangel', 'Schwierigkeiten qualifiziertes Personal zu finden', 'Mittel', 'Hoch', 'Offen', 'Recruiting-Agentur beauftragen'),
  ('Technologieintegration', 'IT-Systeme lassen sich nicht nahtlos integrieren', 'Niedrig', 'Mittel', 'Offen', 'Proof of Concept vor Vollimplementierung');

-- Sample announcements
insert into public.announcements (title, body, priority, role_visibility) values
  ('Projektfortschritt Q3 Update', 'Die Bauphase schreitet planmäßig voran. Alle Meilensteine für Q3 sind im Zeitplan.', 'Normal', '{PM,Investor,MD,Contractor,Marketing}'),
  ('Neue Sicherheitsrichtlinien auf der Baustelle', 'Ab sofort gelten verschärfte Sicherheitsvorschriften. Alle Auftragnehmer müssen die neuen Richtlinien einhalten.', 'Hoch', '{PM,MD,Contractor}'),
  ('Investoren-Meeting am 15. März', 'Das nächste Investoren-Update findet am 15. März um 14:00 Uhr statt. Bitte bestätigen Sie Ihre Teilnahme.', 'Dringend', '{PM,Investor,MD}');

-- Sample documents
insert into public.documents (name, type, size, access_roles) values
  ('Bauplan_EG_v3.pdf', 'PDF', '4.2 MB', '{PM,MD,Contractor}'),
  ('Finanzplanung_2024.xlsx', 'XLSX', '1.8 MB', '{PM,Investor,MD}'),
  ('Marketingkonzept_Final.pdf', 'PDF', '6.1 MB', '{PM,MD,Marketing}'),
  ('Brandschutzgutachten.pdf', 'PDF', '2.3 MB', '{PM,MD,Contractor}'),
  ('Personalplan_Eröffnung.docx', 'DOCX', '890 KB', '{PM,MD}'),
  ('Mietvertrag_Entwurf.pdf', 'PDF', '1.2 MB', '{PM,Investor,MD}'),
  ('Technische_Spezifikationen.pdf', 'PDF', '3.7 MB', '{PM,MD,Contractor}'),
  ('Markenrichtlinien_LR.pdf', 'PDF', '5.4 MB', '{PM,MD,Marketing}');
