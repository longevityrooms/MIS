import { Role } from './types';

export const ROLES: { value: Role; label: string; description: string; icon: string; badge: string; access: string }[] = [
  { value: 'PM', label: 'PM', description: 'Projektleiter', icon: '📋', badge: '#2F4F4F', access: 'Vollzugriff' },
  { value: 'Investor', label: 'Investor', description: 'Investor', icon: '💰', badge: '#B87333', access: 'Übersicht' },
  { value: 'MD', label: 'Medizin', description: 'Ärztliche Leitung', icon: '👔', badge: '#4d7c7c', access: 'Klinischer Zugang' },
  { value: 'Contractor', label: 'Auftragnehmer', description: 'Generalunternehmer', icon: '🔨', badge: '#8b6914', access: 'Bauzugang' },
  { value: 'Marketing', label: 'Marketing', description: 'Marketing-Direktorin', icon: '📢', badge: '#5a8080', access: 'Marketing-Zugang' },
];

export const DEMO_USERS: Record<string, { id: string; name: string; role: Role; title: string; avatar: string; color: string }> = {
  PM:         { id: 'pm',         name: 'Dr. Abdullah Hasırıpı', role: 'PM',         title: 'Projektleiter',        avatar: 'AH', color: '#2F4F4F' },
  Investor:   { id: 'investor',   name: 'Robert Chen',           role: 'Investor',   title: 'Investor',             avatar: 'RC', color: '#B87333' },
  MD:         { id: 'md',         name: 'Dr. Sarah Kim',         role: 'MD',         title: 'Ärztliche Leitung',    avatar: 'SK', color: '#4d7c7c' },
  Contractor: { id: 'contractor', name: 'Mike Torres',           role: 'Contractor', title: 'Generalunternehmer',   avatar: 'MT', color: '#8b6914' },
  Marketing:  { id: 'marketing',  name: 'Lena Müller',           role: 'Marketing',  title: 'Marketing-Direktorin', avatar: 'LM', color: '#5a8080' },
};

export const NAV_ITEMS = [
  { href: '/dashboard',       label: 'Dashboard',        icon: '✦',  iconName: 'LayoutDashboard' },
  { href: '/projektzeitplan', label: 'Projektzeitplan',  icon: '▦',  iconName: 'CalendarRange' },
  { href: '/tasks',           label: 'Aufgaben',         icon: '◎',  iconName: 'CheckSquare' },
  { href: '/risks',           label: 'Risikoregister',   icon: '⚠',  iconName: 'AlertTriangle' },
  { href: '/budget',          label: 'Budget',           icon: '◈',  iconName: 'PieChart' },
  { href: '/announcements',   label: 'Ankündigungen',    icon: '◆',  iconName: 'Megaphone' },
  { href: '/documents',       label: 'Dokumente',        icon: '❑',  iconName: 'FileText' },
  { href: '/activity-log',    label: 'Aktivitätslog',    icon: '▤',  iconName: 'ClipboardList' },
];

export const ROLE_NAV_ACCESS: Record<Role, string[]> = {
  PM: ['/dashboard', '/projektzeitplan', '/tasks', '/risks', '/budget', '/announcements', '/documents', '/activity-log'],
  MD: ['/dashboard', '/projektzeitplan', '/tasks', '/risks', '/announcements', '/documents'],
  Investor: ['/dashboard', '/tasks', '/risks', '/budget', '/announcements', '/documents'],
  Contractor: ['/dashboard', '/projektzeitplan', '/tasks', '/announcements', '/documents'],
  Marketing: ['/dashboard', '/tasks', '/announcements', '/documents'],
};

// ── PROJECT PHASES ──────────────────────────────────────────
export const PHASES = [
  { id: 1, name: 'Strategie & Gründung',   weeks: 'W1–W4',   color: '#2F4F4F', progress: 100 },
  { id: 2, name: 'Umbau & Beschaffung',    weeks: 'W5–W12',  color: '#B87333', progress: 65 },
  { id: 3, name: 'Zulassung & Prüfungen',  weeks: 'W10–W16', color: '#4d7c7c', progress: 20 },
  { id: 4, name: 'Schulung & Soft-Launch',  weeks: 'W13–W17', color: '#8b6914', progress: 0 },
  { id: 5, name: 'Eröffnung & Wachstum',   weeks: 'W18+',    color: '#5a8080', progress: 0 },
];

// ── MILESTONES ──────────────────────────────────────────────
export const MILESTONES = [
  { title: 'GmbH-Gründung (Handelsregister Frankfurt)',          date: 'W1',  status: 'done' as const },
  { title: 'Steuernummer & USt-IdNr. erhalten',                 date: 'W1',  status: 'done' as const },
  { title: 'BSNR + LANR Antrag eingereicht',                    date: 'W2',  status: 'done' as const },
  { title: 'Mietvertrag Schiller Str. 31 unterzeichnet',        date: 'W3',  status: 'done' as const },
  { title: 'Berufshaftpflicht & Betriebsversicherung aktiv',    date: 'W3',  status: 'done' as const },
  { title: 'Ärztliche Leitung (Facharzt) eingestellt',          date: 'W5',  status: 'done' as const },
  { title: 'Umbau & Renovierung gestartet',                     date: 'W6',  status: 'done' as const },
  { title: 'Tier-1-Gerätebestellung aufgegeben',                date: 'W5',  status: 'done' as const },
  { title: 'Lab-Partner unter Vertrag (Synlab, Limbach, TruDiagnostic)', date: 'W6', status: 'done' as const },
  { title: 'Rezeptur-Apotheken aktiv (Klösterl, Alte Apotheke)', date: 'W5', status: 'done' as const },
  { title: 'EMR-System konfiguriert & live',                    date: 'W9',  status: 'active' as const },
  { title: 'HBOT 240V Starkstromleitung fertig',                date: 'W9',  status: 'active' as const },
  { title: 'HBOT-Suite fertiggestellt & Sechrist installiert',  date: 'W12', status: 'pending' as const },
  { title: 'HBOT NFPA-99 Brandschutzinspektion bestanden',     date: 'W11', status: 'pending' as const },
  { title: 'Gesundheitsamt Frankfurt Inspektion bestanden',     date: 'W12', status: 'pending' as const },
  { title: 'Nutzungsgenehmigung erteilt',                       date: 'W13', status: 'pending' as const },
  { title: 'Alle Zulassungen & Lizenzen erhalten',              date: 'W14', status: 'pending' as const },
  { title: 'Soft-Launch (10-20 Patienten)',                      date: 'W16', status: 'pending' as const },
  { title: 'Große Eröffnung & Medien-Launch',                   date: 'W18', status: 'pending' as const },
];

// ── PROJECT TASKS (from PM Plan Master Checklist) ───────────
export const PROJECT_TASKS = [
  // PHASE 1 — Strategie & Gründung (alle erledigt)
  { title: 'GmbH-Gründung (Handelsregister Frankfurt)',        owner: 'pm',         phase: 1, priority: 'high' as const,     status: 'done' as const,        progress: 100, due: 'W1' },
  { title: 'Steuernummer & USt-IdNr. (Finanzamt Frankfurt)',   owner: 'pm',         phase: 1, priority: 'high' as const,     status: 'done' as const,        progress: 100, due: 'W1' },
  { title: 'BSNR + LANR Antrag eingereicht',                  owner: 'md',         phase: 1, priority: 'high' as const,     status: 'done' as const,        progress: 100, due: 'W2' },
  { title: 'Approbation/Berufserlaubnis (Landesärztekammer)',  owner: 'md',         phase: 1, priority: 'high' as const,     status: 'done' as const,        progress: 100, due: 'W2' },
  { title: 'BtM-Genehmigung (Bundesopiumstelle)',             owner: 'md',         phase: 1, priority: 'medium' as const,   status: 'done' as const,        progress: 100, due: 'W2' },
  { title: 'Berufshaftpflicht & Betriebsversicherung',        owner: 'pm',         phase: 1, priority: 'high' as const,     status: 'done' as const,        progress: 100, due: 'W2' },
  { title: 'DSGVO-Datenschutz-Danışman beauftragt',           owner: 'pm',         phase: 1, priority: 'medium' as const,   status: 'done' as const,        progress: 100, due: 'W3' },
  { title: 'Mietvertrag Schiller Str. 31 unterzeichnet',      owner: 'pm',         phase: 1, priority: 'high' as const,     status: 'done' as const,        progress: 100, due: 'W3' },
  { title: 'Finanzierung & Investitions-Genehmigung',         owner: 'pm',         phase: 1, priority: 'high' as const,     status: 'done' as const,        progress: 100, due: 'W2' },

  // PHASE 2A — Umbau & Mekan
  { title: 'Architekt Auswahl & Vertrag',                     owner: 'pm',         phase: 2, priority: 'high' as const,     status: 'done' as const,        progress: 100, due: 'W3' },
  { title: 'Innenarchitekt Auswahl',                          owner: 'pm',         phase: 2, priority: 'medium' as const,   status: 'done' as const,        progress: 100, due: 'W4' },
  { title: 'Generalunternehmer Ausschreibung & Auswahl',      owner: 'pm',         phase: 2, priority: 'high' as const,     status: 'done' as const,        progress: 100, due: 'W4' },
  { title: 'HBOT-Raum NFPA-99 Ingenieursplan genehmigt',     owner: 'contractor', phase: 2, priority: 'high' as const,     status: 'done' as const,        progress: 100, due: 'W5' },
  { title: 'Baugenehmigungen (Bauaufsichtsamt Frankfurt)',     owner: 'contractor', phase: 2, priority: 'high' as const,     status: 'done' as const,        progress: 100, due: 'W5' },
  { title: 'MEP-Plan genehmigt (Strom, HVAC, Wasser)',        owner: 'contractor', phase: 2, priority: 'high' as const,     status: 'done' as const,        progress: 100, due: 'W5' },
  { title: 'Umbau & Renovierung Hauptarbeiten',               owner: 'contractor', phase: 2, priority: 'high' as const,     status: 'in_progress' as const, progress: 65,  due: 'W12' },
  { title: 'HBOT 240V/30A Starkstromleitung',                 owner: 'contractor', phase: 2, priority: 'high' as const,     status: 'in_progress' as const, progress: 70,  due: 'W9' },
  { title: 'IV-Suite Elektro- & Wasserinstallation',          owner: 'contractor', phase: 2, priority: 'high' as const,     status: 'in_progress' as const, progress: 50,  due: 'W8' },
  { title: 'Kalt-Tauchbecken Wasserleitung & Abfluss',        owner: 'contractor', phase: 2, priority: 'medium' as const,   status: 'not_started' as const, progress: 0,   due: 'W9' },
  { title: 'Bau-Zwischeninspektion',                          owner: 'pm',         phase: 2, priority: 'high' as const,     status: 'not_started' as const, progress: 0,   due: 'W10' },
  { title: 'Bau Endkontrolle & Übergabe',                     owner: 'contractor', phase: 2, priority: 'high' as const,     status: 'not_started' as const, progress: 0,   due: 'W13' },
  { title: 'Reinigung, Möblierung, Dekoration',               owner: 'pm',         phase: 2, priority: 'medium' as const,   status: 'not_started' as const, progress: 0,   due: 'W14' },

  // PHASE 2B — Geräte Tier 1
  { title: 'Crash Cart + AED x2 — Bestellung & Lieferung',    owner: 'pm',         phase: 2, priority: 'critical' as const, status: 'in_progress' as const, progress: 60,  due: 'W5' },
  { title: 'Sechrist 4100H HBOT x2 — Bestellung (12-14W!)',   owner: 'pm',         phase: 2, priority: 'critical' as const, status: 'in_progress' as const, progress: 40,  due: 'W4' },
  { title: 'HBOT Installation & Zertifizierung (Sechrist)',    owner: 'pm',         phase: 2, priority: 'critical' as const, status: 'not_started' as const, progress: 0,   due: 'W12' },
  { title: 'InBody 970 — Bestellung, Lieferung, Aufstellung',  owner: 'pm',         phase: 2, priority: 'high' as const,     status: 'in_progress' as const, progress: 40,  due: 'W6' },
  { title: 'COSMED Quark CPET + Laufband',                    owner: 'pm',         phase: 2, priority: 'high' as const,     status: 'in_progress' as const, progress: 30,  due: 'W6' },
  { title: 'SphygmoCor XCEL (PWV-Gerät)',                     owner: 'pm',         phase: 2, priority: 'high' as const,     status: 'in_progress' as const, progress: 25,  due: 'W7' },
  { title: 'IV-Suite: 6 Liegen + Baxter Pumpen + Ständer',    owner: 'pm',         phase: 2, priority: 'high' as const,     status: 'not_started' as const, progress: 0,   due: 'W8' },
  { title: 'Alle Einweg-Verbrauchsmaterialien (Erstbestellung)', owner: 'pm',       phase: 2, priority: 'high' as const,     status: 'not_started' as const, progress: 0,   due: 'W10' },

  // PHASE 2C — Partner & Systeme
  { title: 'Synlab Klinik-Konto & Preisvereinbarung',         owner: 'md',         phase: 2, priority: 'high' as const,     status: 'done' as const,        progress: 100, due: 'W4' },
  { title: 'TruDiagnostic Epigenetik-Partnervertrag',         owner: 'md',         phase: 2, priority: 'high' as const,     status: 'done' as const,        progress: 100, due: 'W5' },
  { title: 'Klösterl-Apotheke Rezeptur-Vertrag + AVV',        owner: 'md',         phase: 2, priority: 'high' as const,     status: 'done' as const,        progress: 100, due: 'W4' },
  { title: 'EMR-System Auswahl & Vertrag',                    owner: 'pm',         phase: 2, priority: 'high' as const,     status: 'done' as const,        progress: 100, due: 'W4' },
  { title: 'EMR Installation, Konfiguration, Test',           owner: 'pm',         phase: 2, priority: 'high' as const,     status: 'in_progress' as const, progress: 55,  due: 'W8' },
  { title: 'Heads Up Health Dashboard Einrichtung',            owner: 'pm',         phase: 2, priority: 'medium' as const,   status: 'not_started' as const, progress: 0,   due: 'W9' },
  { title: 'Terra API / Wearable-Integration',                owner: 'pm',         phase: 2, priority: 'medium' as const,   status: 'not_started' as const, progress: 0,   due: 'W9' },
  { title: 'Website-Entwicklung & SEO',                       owner: 'marketing',  phase: 2, priority: 'medium' as const,   status: 'in_progress' as const, progress: 45,  due: 'W17' },

  // PHASE 3 — Zulassung & Uyumluluk
  { title: 'HBOT NFPA-99 Brandschutzinspektion',              owner: 'pm',         phase: 3, priority: 'critical' as const, status: 'not_started' as const, progress: 0,   due: 'W11' },
  { title: 'HBOT Klinische Nutzungserlaubnis',                owner: 'md',         phase: 3, priority: 'critical' as const, status: 'not_started' as const, progress: 0,   due: 'W12' },
  { title: 'Gesundheitsamt Frankfurt Klinikinspektion',        owner: 'md',         phase: 3, priority: 'high' as const,     status: 'not_started' as const, progress: 0,   due: 'W12' },
  { title: 'Arbeitsschutz-Prüfung (Berufsgenossenschaft)',    owner: 'pm',         phase: 3, priority: 'high' as const,     status: 'not_started' as const, progress: 0,   due: 'W12' },
  { title: 'Brandschutz-Zertifikat (Branddirektion Frankfurt)', owner: 'pm',       phase: 3, priority: 'high' as const,     status: 'not_started' as const, progress: 0,   due: 'W13' },
  { title: 'Nutzungsgenehmigung (Bauaufsichtsamt)',            owner: 'contractor', phase: 3, priority: 'high' as const,     status: 'not_started' as const, progress: 0,   due: 'W13' },
  { title: 'RiliBÄK-Akkreditierung (Landesärztekammer)',      owner: 'pm',         phase: 3, priority: 'medium' as const,   status: 'not_started' as const, progress: 0,   due: 'W10' },
  { title: 'Apothekenlizenz (Regierungspräsidium Darmstadt)',  owner: 'md',         phase: 3, priority: 'medium' as const,   status: 'not_started' as const, progress: 0,   due: 'W10' },
  { title: 'DSGVO Abschlussprüfung & alle AVV unterzeichnet', owner: 'pm',         phase: 3, priority: 'high' as const,     status: 'in_progress' as const, progress: 30,  due: 'W11' },

  // PHASE 4 — Schulung & Soft-Launch
  { title: 'Klinisches Personal BLS-Zertifizierung',          owner: 'pm',         phase: 4, priority: 'high' as const,     status: 'not_started' as const, progress: 0,   due: 'W14' },
  { title: 'MD + NP ACLS-Zertifizierung',                     owner: 'md',         phase: 4, priority: 'high' as const,     status: 'not_started' as const, progress: 0,   due: 'W14' },
  { title: 'HBOT-Bediener-Schulung (Sechrist-zertifiziert)',   owner: 'pm',         phase: 4, priority: 'high' as const,     status: 'not_started' as const, progress: 0,   due: 'W15' },
  { title: 'IV-Therapie Sicherheitsprotokoll + Notfall-Drill', owner: 'md',        phase: 4, priority: 'critical' as const, status: 'not_started' as const, progress: 0,   due: 'W14' },
  { title: 'EMR Benutzer-Schulung abgeschlossen',             owner: 'pm',         phase: 4, priority: 'high' as const,     status: 'not_started' as const, progress: 0,   due: 'W14' },
  { title: 'Crash Cart Endkontrolle & Medikamentenbestückung', owner: 'md',         phase: 4, priority: 'critical' as const, status: 'not_started' as const, progress: 0,   due: 'W14' },
  { title: 'Soft-Launch durchgeführt (10-20 Patienten)',       owner: 'pm',         phase: 4, priority: 'high' as const,     status: 'not_started' as const, progress: 0,   due: 'W16' },
  { title: 'Soft-Launch Analyse & Korrekturen',               owner: 'md',         phase: 4, priority: 'high' as const,     status: 'not_started' as const, progress: 0,   due: 'W17' },

  // PHASE 5 — Eröffnung & Wachstum
  { title: 'Offizielle Eröffnungsfeier & Medien-Launch',      owner: 'pm',         phase: 5, priority: 'high' as const,     status: 'not_started' as const, progress: 0,   due: 'W18' },
  { title: 'Digitale Marketingkampagne gestartet',             owner: 'marketing',  phase: 5, priority: 'high' as const,     status: 'not_started' as const, progress: 0,   due: 'W17' },
  { title: 'Mitgliedschaftsprogramm Registrierung aktiv',     owner: 'pm',         phase: 5, priority: 'high' as const,     status: 'not_started' as const, progress: 0,   due: 'W18' },
  { title: 'Tier-2-Geräte Aktivierung (PBM, PEMF, ESWT)',     owner: 'pm',         phase: 5, priority: 'medium' as const,   status: 'not_started' as const, progress: 0,   due: 'W20' },
  { title: 'Erster 30-Tage KPI-Bericht',                      owner: 'pm',         phase: 5, priority: 'medium' as const,   status: 'not_started' as const, progress: 0,   due: 'W22' },
];

// ── RISK REGISTER (from PM Plan Risk Matrix — 11 risks) ─────
export const PROJECT_RISKS = [
  { title: 'HBOT NFPA-99 Zulassungs-/Inspektionsverzögerung',   impact: 'high' as const,     prob: 'medium' as const, status: 'active' as const,     owner: 'PM',  mitigation: 'Erfahrener Auftragnehmer, frühzeitige Anträge, ECHM-Berater engagiert' },
  { title: 'Landesärztekammer Hessen Lizenzverzögerung',         impact: 'high' as const,     prob: 'low' as const,    status: 'active' as const,     owner: 'MD',  mitigation: 'Medizinischer Lizenzberater, vollständige Antragsunterlagen vorbereitet' },
  { title: 'Gerätelieferungsverzögerungen',                       impact: 'medium' as const,   prob: 'high' as const,   status: 'active' as const,     owner: 'PM',  mitigation: 'Frühzeitige Bestellung (W4-5), alternative Lieferantenliste erstellt' },
  { title: 'Rezeptur-Apotheke BfArM-Einschränkungen',            impact: 'high' as const,     prob: 'medium' as const, status: 'active' as const,     owner: 'MD',  mitigation: 'Mehrere Apotheken-Partner (Klösterl + Alte Apotheke), BfArM-Änderungen verfolgen' },
  { title: 'Baubudget-Überschreitung',                            impact: 'medium' as const,   prob: 'high' as const,   status: 'active' as const,     owner: 'PM',  mitigation: '20% Kontingenzreserve, Festpreisvertrag mit Generalunternehmer' },
  { title: 'Schlüsselpersonal (Facharzt) nicht gefunden',         impact: 'high' as const,     prob: 'medium' as const, status: 'watching' as const,   owner: 'PM',  mitigation: 'Frühzeitige Rekrutierung, Headhunter, Vertretungsarzt als Backup' },
  { title: 'DSGVO-/Datensicherheitsverletzung',                   impact: 'high' as const,     prob: 'low' as const,    status: 'active' as const,     owner: 'PM',  mitigation: 'DSGVO-konforme IT, Personalschulung, AVV-Verträge abgeschlossen' },
  { title: 'Patientensicherheitsvorfall (IV/HBOT)',               impact: 'critical' as const, prob: 'low' as const,    status: 'mitigation' as const, owner: 'MD',  mitigation: 'Crash Cart + AED, BLS/ACLS Pflicht, Notfall-Drill-Übungen, Sechrist-Zertifizierung' },
  { title: 'Langsame Patientengewinnung & Cashflow',              impact: 'medium' as const,   prob: 'medium' as const, status: 'active' as const,     owner: 'PM',  mitigation: '6 Monate Betriebskapital, Mitgliedschafts-Vorverkaufskampagne' },
  { title: 'GLP-1 Compounding Regulierungseinschränkung',         impact: 'medium' as const,   prob: 'high' as const,   status: 'watching' as const,   owner: 'MD',  mitigation: 'Markenmedikament-Protokoll vorbereitet, Patientenkommunikationsplan' },
  { title: 'Bauunternehmer-Verzögerung',                          impact: 'medium' as const,   prob: 'medium' as const, status: 'active' as const,     owner: 'PM',  mitigation: 'Vertragsstrafen-Klausel, wöchentliche Baustellenbesprechung' },
];

// ── BUDGET (from PM Plan Budget Table — Estimates in €) ─────
export const PROJECT_BUDGET = {
  total: 1400000,
  spent: 342000,
  committed: 285000,
  cats: [
    { name: 'HBOT-Geräte & Suite',            budget: 280000, spent: 120000, color: '#2F4F4F' },
    { name: 'Klinische Geräte Tier 1',        budget: 175000, spent: 95000,  color: '#B87333' },
    { name: 'Klinische Geräte Tier 2',        budget: 68000,  spent: 0,      color: '#4d7c7c' },
    { name: 'Umbau & Renovierung',            budget: 225000, spent: 85000,  color: '#c0392b' },
    { name: 'IT-Infrastruktur & Software',    budget: 63000,  spent: 22000,  color: '#8b6914' },
    { name: 'Personal (6 Monate)',            budget: 400000, spent: 0,      color: '#5a8080' },
    { name: 'Verbrauchsmaterial (6 Monate)',   budget: 45000,  spent: 0,      color: '#a0522d' },
    { name: 'Zulassung, Recht & Versicherung', budget: 60000,  spent: 20000,  color: '#4d6c6c' },
    { name: 'Marketing & Eröffnung',          budget: 62000,  spent: 0,      color: '#c49a6c' },
    { name: 'Miete (6 Monate)',               budget: 90000,  spent: 0,      color: '#6b8e8e' },
  ],
};

// ── ANNOUNCEMENTS ───────────────────────────────────────────
export const PROJECT_ANNOUNCEMENTS = [
  { title: 'HBOT-Suite Umbau im Zeitplan 🏗️',        date: 'Vor 2 Tagen',  author: 'PM', priority: 'high' as const,   body: 'Die NFPA-99-konforme HBOT-Suite ist zu 65% fertig. 240V/30A Starkstromleitung wird diese Woche abgeschlossen. Sechrist-Techniker für Kammerinstallation in W12 bestätigt. NFPA-99 Brandschutzinspektion geplant für W11.', role: 'all' },
  { title: 'Tier-1-Geräte: Bestellstatus Update',     date: 'Vor 4 Tagen',  author: 'PM', priority: 'high' as const,   body: 'Sechrist 4100H x2 HBOT-Kammern bestellt (Lieferzeit 12-14 Wochen). InBody 970, COSMED Quark CPET, SphygmoCor XCEL — alle Bestellungen bestätigt. Liefertermine W10-W12. Henry Schein Rahmenvertrag für Verbrauchsmaterial in Verhandlung.', role: 'pm,md,contractor' },
  { title: 'Lab-Partner & Apotheken aktiv ✅',          date: 'Vor 1 Woche',  author: 'MD', priority: 'normal' as const, body: 'Synlab (Referenzlabor), Limbach Gruppe (Backup), TruDiagnostic (Epigenetik — GrimAge, DunedinPACE) unter Vertrag. Klösterl-Apotheke & Alte Apotheke Rezeptur-Kooperationen mit AVV aktiv. Peptid- & NAD+-Versorgung gesichert.', role: 'pm,md' },
  { title: 'Q2 Investorenbericht verfügbar 📊',         date: 'Vor 1 Woche',  author: 'PM', priority: 'normal' as const, body: 'Budget zu 24% ausgeschöpft (€342K von €1,4M). Projekt im Zeitplan. Alle Phase-1-Meilensteine erreicht. Phase 2 bei 65%. Hauptausgaben: HBOT-Suite, klinische Geräte, Umbau. Keine Budgetüberschreitungen. Eröffnungsziel: Woche 18.', role: 'investor,pm' },
  { title: 'Klinisches Framework: 14 Diagnostik + 12 Therapien', date: 'Vor 1 Woche', author: 'MD', priority: 'high' as const, body: '14 Diagnostik-Domänen definiert: Core Vitals bis Digital Twin. 12 Therapiekategorien: HBOT (Shamir-Protokoll), Ozon (MAH/10-Pass), IV-Therapie (NAD+, PC, Myers), PRP, Peptide, PBM, PEMF, Thermal, Hormonoptimierung, Ästhetik, Mind-Body. Tier-1-Launch am Tag 1, Tier-2/3 ab Monat 2-6.', role: 'pm,md' },
  { title: 'Notfallausrüstung: KRITISCHER Status ⚠️',  date: 'Vor 2 Wochen', author: 'MD', priority: 'high' as const,   body: 'Crash Cart + AED x2 (Philips HeartStart) noch nicht vollständig geliefert. Dies ist gesetzlich vorgeschrieben vor dem ersten Patienten! Bestellung läuft, Lieferung W10 erwartet. Alle klinischen Mitarbeiter müssen BLS/ACLS zertifiziert sein.', role: 'pm,md,contractor' },
  { title: 'DSGVO-Compliance in Bearbeitung 🔒',       date: 'Vor 2 Wochen', author: 'PM', priority: 'normal' as const, body: 'DSGVO-Berater beauftragt. Datenschutzkonzept wird erstellt. AVV-Verträge mit allen Partnern (Synlab, Limbach, TruDiagnostic, EMR-Anbieter, Terra API) in Bearbeitung. Ziel: Abschluss bis W11.', role: 'pm,md' },
  { title: 'Marketing-Strategie: Launch-Planung 🚀',    date: 'Vor 3 Wochen', author: 'Marketing', priority: 'normal' as const, body: 'Zielgruppe definiert: Einkommensstarke Berufstätige & Führungskräfte (35-65) Frankfurt/Rhein-Main. Website-Entwicklung zu 45%. SEO-Strategie erstellt. Launch-Kampagne für W17-18 geplant. Eröffnungsevent-Budget: €17.500.', role: 'pm,marketing' },
];

// ── DOCUMENTS ───────────────────────────────────────────────
export const PROJECT_DOCUMENTS = [
  { name: 'Projektmanagementplan v1.0 (18-Wochen Masterplan)',    type: 'pdf',  date: '22. Feb 2026', size: '2,4 MB', access: 'pm,investor,md' },
  { name: 'Klinisches Framework 2026 (14 Diagnostik + 12 Therapien)', type: 'pdf', date: '22. Feb 2026', size: '4,8 MB', access: 'pm,md' },
  { name: 'Geräte- & Beschaffungsliste (15 Kategorien)',          type: 'xlsx', date: '20. Feb 2026', size: '3,2 MB', access: 'pm,md,contractor' },
  { name: 'Gantt-Plan: 18-Wochen Projektzeitplan',               type: 'pdf',  date: '20. Feb 2026', size: '890 KB', access: 'pm,investor,md,contractor' },
  { name: 'Master-Checkliste (Faza 1-5, alle Aufgaben)',         type: 'xlsx', date: '20. Feb 2026', size: '1,5 MB', access: 'pm,md' },
  { name: 'Risikomatrix & Mitigationsplan',                      type: 'pdf',  date: '18. Feb 2026', size: '680 KB', access: 'pm,investor,md' },
  { name: 'Budget & Kostenübersicht (€900K–€1,5M)',              type: 'xlsx', date: '15. Feb 2026', size: '1,1 MB', access: 'pm,investor' },
  { name: 'HBOT NFPA-99 Technischer Plan',                       type: 'pdf',  date: '10. Feb 2026', size: '3,2 MB', access: 'pm,contractor' },
  { name: 'HBOT Sechrist 4100H Spezifikationen',                 type: 'pdf',  date: '10. Feb 2026', size: '2,8 MB', access: 'pm,md,contractor' },
  { name: 'Synlab Referenzlabor-Vereinbarung',                   type: 'pdf',  date: '8. Feb 2026',  size: '1,2 MB', access: 'pm,md' },
  { name: 'TruDiagnostic Epigenetik-Partnervertrag',             type: 'pdf',  date: '8. Feb 2026',  size: '950 KB', access: 'pm,md' },
  { name: 'Klösterl-Apotheke Rezeptur-Vertrag + AVV',            type: 'pdf',  date: '6. Feb 2026',  size: '1,8 MB', access: 'pm,md' },
  { name: 'KV-Zulassungspaket (Kassenärztliche Vereinigung)',     type: 'pdf',  date: '5. Feb 2026',  size: '4,5 MB', access: 'pm,md' },
  { name: 'DSGVO-Datenschutzkonzept (Entwurf)',                   type: 'pdf',  date: '5. Feb 2026',  size: '2,1 MB', access: 'pm,md' },
  { name: 'Berufshaftpflicht & Versicherungspolice',              type: 'pdf',  date: '3. Feb 2026',  size: '3,4 MB', access: 'pm,investor' },
  { name: 'GmbH-Gründungsurkunde (Handelsregister)',              type: 'pdf',  date: '1. Feb 2026',  size: '1,5 MB', access: 'pm,investor,md' },
  { name: 'Mietvertrag Schiller Str. 31',                        type: 'pdf',  date: '1. Feb 2026',  size: '2,0 MB', access: 'pm,investor' },
  { name: 'Marketing-Strategieplan & Launch-Konzept',             type: 'pptx', date: '28. Jan 2026', size: '5,1 MB', access: 'pm,marketing' },
  { name: 'Kontakt- & Lieferantenverzeichnis',                    type: 'xlsx', date: '25. Jan 2026', size: '420 KB', access: 'pm,md,contractor,marketing' },
  { name: 'Haftalık Durum Raporu Vorlage',                        type: 'docx', date: '20. Jan 2026', size: '380 KB', access: 'pm' },
  { name: 'KPI-Dashboard Vorlage (Projekt + Operativ)',           type: 'xlsx', date: '20. Jan 2026', size: '560 KB', access: 'pm,investor' },
  { name: 'Patientenprotokoll-Leitfaden v0.1',                    type: 'docx', date: '15. Jan 2026', size: '2,0 MB', access: 'pm,md' },
];

// ── GANTT DATA (from PM Plan 18-Week Timeline) ─────────────
export const GANTT_ASSIGNEES = [
  { id: 'AH', name: 'Dr. Abdullah Hasırıpı', role: 'PM', color: '#2F4F4F' },
  { id: 'SK', name: 'Dr. Sarah Kim', role: 'MD', color: '#4d7c7c' },
  { id: 'MT', name: 'Mike Torres', role: 'GU', color: '#8b6914' },
  { id: 'RC', name: 'Robert Chen', role: 'INV', color: '#B87333' },
  { id: 'LM', name: 'Lena Müller', role: 'MKT', color: '#5a8080' },
];

export const GANTT_DATA = [
  { label: 'PHASE 1 — Strategie & Gründung (W1–W4)', color: '#2F4F4F', link: '/tasks', tasks: [
    { name: 'GmbH-Gründung & Rechtsstruktur',              active: [1,2],       status: 'done' as const, link: '/documents',
      assignee: 'AH', description: 'Longevity Rooms GmbH Handelsregister-Eintragung beim Amtsgericht Frankfurt. Gesellschaftsvertrag, Notartermin, Stammkapital €25.000 Einzahlung. Gewerbeanmeldung Stadt Frankfurt.' },
    { name: 'BSNR, LANR, Approbation Anträge',             active: [2,3,4],     status: 'done' as const, link: '/documents',
      assignee: 'SK', description: 'Betriebsstättennummer (BSNR) bei KV Hessen beantragt. Lebenslange Arztnummer (LANR) für Dr. Kim. Approbationsanerkennung Landesärztekammer Hessen. Facharztzulassung Innere Medizin.' },
    { name: 'Mietvertrag Schiller Str. 31',                 active: [2,3],       status: 'done' as const, link: '/documents',
      assignee: 'AH', description: 'Gewerbemietvertrag über 320m² Erdgeschoss + Keller. 10-Jahre-Laufzeit mit 2×5J Verlängerungsoption. Sonderkündigungsrecht bei Nicht-Erteilung der Betriebsgenehmigung. Umbauklausel inkl. HBOT-Suite-Spezifikation.' },
    { name: 'Architekt, Innenarchitekt, GU Auswahl',       active: [3,4],       status: 'done' as const, link: '/tasks',
      assignee: 'AH', description: 'Ausschreibung und Vergabe Architekturplanung (Umbau Praxis + HBOT-Suite). Innenarchitekt für Longevity-Ambiente-Konzept. Generalunternehmer-Auswahl per 3er-Shortlist. Verträge mit Festpreisklausel + Konventionalstrafe.' },
    { name: 'Facharzt & PA/Fachpfleger Einstellung',       active: [3,4,5],     status: 'done' as const, link: '/tasks',
      assignee: 'SK', description: 'Stellenausschreibung Facharzt Innere Medizin (Teilzeit/Vollzeit). Physician Assistant mit HBOT-Erfahrung. Fachpflegekraft für IV-Therapie + klinische Diagnostik. Arbeitsverträge, Berufserlaubnis-Prüfung.' },
    { name: 'Versicherung & Compliance-Berater',           active: [2,3],       status: 'done' as const, link: '/documents',
      assignee: 'AH', description: 'Berufshaftpflichtversicherung Praxis (€5M Deckung). Betriebshaftpflicht inkl. HBOT-Risiko. Compliance-Berater für Medizinprodukte-Verordnung (MDR). DSGVO-Erstberatung und Datenschutzkonzept.' },
    { name: 'Budget & Finanzierungsgenehmigung',           active: [2,3],       status: 'done' as const, link: '/budget',
      assignee: 'RC', description: 'Gesamtbudget €1,4M Freigabe durch Investorenrunde. Mittelverwendungsplan: Umbau €225K, Geräte €523K, Personal €400K, IT €63K. Meilenstein-basierte Auszahlung. Quartals-Reporting an Investoren.' },
  ]},
  { label: 'PHASE 2 — Umbau & Beschaffung (W5–W12)', color: '#B87333', link: '/tasks', tasks: [
    { name: 'Umbau & Renovierung Hauptarbeiten',            active: [6,7,8,9,10,11,12,13], status: 'active' as const, link: '/tasks',
      assignee: 'MT', description: 'Entkernung Erdgeschoss 320m². Neue Raumaufteilung: Empfang, 3 Behandlungsräume, HBOT-Suite (verstärkte Decke + Belüftung), IV-Raum, Labor, Lager. Sanitärinstallation, Elektrik 240V/30A für HBOT, HVAC-System.' },
    { name: 'HBOT-Suite NFPA-99 Bau',                      active: [6,7,8,9,10,11,12],     status: 'active' as const, link: '/risks',
      assignee: 'MT', description: 'NFPA-99 konforme Druckkammer-Suite: verstärkte Bodenplatte (Tragfähigkeit 800kg/m²), Sauerstoff-Verrohrung, Not-Entlüftung, Brandmeldeanlage Klasse A, ESD-Boden, 240V/30A Starkstromanschluss. TÜV-Baubegleitung.' },
    { name: 'Tier-1 Gerätebestellungen',                    active: [4,5,6,7],               status: 'done' as const,   link: '/budget',
      assignee: 'AH', description: 'Sechrist 4100H HBOT x2 bestellt (12-14W Lieferzeit). Crash Cart + AED x2. InBody 970 Körperkompositionsanalyse. COSMED Quark CPET Laufband. SphygmoCor XCEL PWV-Gerät. Gesamtwert €280K.' },
    { name: 'Gerätelieferung & Installation',               active: [8,9,10,11,12],          status: 'active' as const, link: '/tasks',
      assignee: 'AH', description: 'Sechrist HBOT Anlieferung + Aufstellung (Spezialtransport). Sechrist-Techniker vor Ort für Installation und Ersteinrichtung. InBody, COSMED, SphygmoCor Kalibrierung. Abnahmeprotokolle + CE-Konformitätserklärung.' },
    { name: 'IV-Infusionssuite Aufbau',                     active: [8,9,10],                status: 'active' as const, link: '/tasks',
      assignee: 'SK', description: 'IV-Therapie-Raum: 4 Infusionsliegen, Vitamincocktail-Zubereitungsstation, Kühlschrank pharmazeutisch (2-8°C), Notfall-Ausrüstung. Rezeptur-Apotheke Klösterl Kooperation für individuelle Infusionen.' },
    { name: 'EMR & IT-Infrastruktur',                       active: [4,5,6,7,8,9],           status: 'active' as const, link: '/tasks',
      assignee: 'AH', description: 'Elektronische Patientenakte (EMR) Setup + Konfiguration. Praxis-WLAN (WPA3 Enterprise), VLAN-Segmentierung Medizingeräte. Server-Rack, USV, automatisches Backup. Telematikinfrastruktur (TI) Anbindung. KIM-Dienst.' },
    { name: 'Lab & Apotheken-Verträge',                     active: [4,5,6],                 status: 'done' as const,   link: '/documents',
      assignee: 'SK', description: 'Laborkooperation MVZ Frankfurt (Blutbild, Hormone, Vitamine, Genetik). Rezeptur-Apotheke Klösterl München (IV-Mischungen). Alte Apotheke Frankfurt (Notfall-Medikamente). Rahmenverträge + Lieferzeiten.' },
  ]},
  { label: 'PHASE 3 — Zulassung & Prüfungen (W10–W16)', color: '#4d7c7c', link: '/risks', tasks: [
    { name: 'HBOT NFPA-99 Brandschutzinspektion',          active: [11,12,13],   status: 'pending' as const, link: '/risks',
      assignee: 'MT', description: 'NFPA-99 Zertifizierung durch Brandsachverständigen. Prüfung Sauerstoff-Leitungen, Not-Abschaltung, Brandmeldeanlage, Fluchtwegebeschilderung, Feuerlöscher (CO₂). Mängelprotokoll + Nachprüfung falls erforderlich.' },
    { name: 'Gesundheitsamt Frankfurt Inspektion',          active: [12,13,14],   status: 'pending' as const, link: '/risks',
      assignee: 'SK', description: 'Betriebserlaubnis-Antrag Gesundheitsamt Frankfurt. Vor-Ort-Begehung: Hygieneplan, Sterilisation, Abfallentsorgung (LAGA), Raumlufttechnik, Patientenfluss. Infektionsschutzgesetz-Nachweis.' },
    { name: 'Arbeitsschutz & Berufsgenossenschaft',        active: [12,13],      status: 'pending' as const, link: '/risks',
      assignee: 'AH', description: 'Gefährdungsbeurteilung nach ArbSchG: Sauerstoff-Exposition, Druckkammer-Risiken, Nadelstichverletzung. BG-Anmeldung (BGW). Arbeitsmedizinische Vorsorge G26 (Atemschutz) für HBOT-Personal.' },
    { name: 'Brandschutz & Nutzungsgenehmigung',           active: [13,14],      status: 'pending' as const, link: '/risks',
      assignee: 'MT', description: 'Brandschutzkonzept gemäß HBO Hessen. Nutzungsänderung Bauaufsichtsamt Frankfurt: Büro→Praxis mit HBOT. Fluchtwegeplan, Feuerwehr-Zufahrt. Auflagen-Erfüllung Bauordnungsamt.' },
    { name: 'Apothekenlizenz (RP Darmstadt)',               active: [10,11,12],   status: 'pending' as const, link: '/documents',
      assignee: 'SK', description: 'Praxiseigene Rezeptur-Genehmigung beim Regierungspräsidium Darmstadt. Nachweis pharmazeutischer Sachkenntnis, Hygieneplan Rezeptur, Kühlketten-Dokumentation. Kontrolle durch Pharmazieinspektor.' },
    { name: 'RiliBÄK Akkreditierung',                      active: [10,11,12],   status: 'pending' as const, link: '/documents',
      assignee: 'SK', description: 'Richtlinie der Bundesärztekammer zur Qualitätssicherung labormedizinischer Untersuchungen. Interne Qualitätskontrolle (IQK) + Externe Qualitätssicherung (EQS). Ringversuche anmelden.' },
    { name: 'DSGVO Abschluss & AVV-Verträge',              active: [11,12,13],   status: 'pending' as const, link: '/documents',
      assignee: 'AH', description: 'Datenschutz-Folgenabschätzung (DSFA) für Patientendaten. Auftragsverarbeitungsverträge (AVV) mit EMR-Anbieter, Labor, Cloud-Dienste. Verarbeitungsverzeichnis Art. 30 DSGVO. Datenschutzbeauftragter bestellt.' },
  ]},
  { label: 'PHASE 4 — Schulung & Soft-Launch (W13–W17)', color: '#8b6914', link: '/tasks', tasks: [
    { name: 'BLS/ACLS Zertifizierungen',                   active: [13,14],      status: 'pending' as const, link: '/tasks',
      assignee: 'SK', description: 'Basic Life Support (BLS) + Advanced Cardiovascular Life Support (ACLS) Zertifizierung für alle klinischen Mitarbeiter. AHA-zertifizierter Kursanbieter. Jährliche Auffrischung einplanen.' },
    { name: 'HBOT Bediener-Schulung (Sechrist)',            active: [14,15],      status: 'pending' as const, link: '/tasks',
      assignee: 'SK', description: 'Sechrist 4100H Bediener-Zertifizierung durch Herstellertrainer (2 Tage). Druckkammer-Protokolle, Notfall-Dekompression, Sauerstoff-Toxizität-Erkennung. Dokumentation Schulungsnachweise.' },
    { name: 'EMR & Protokoll-Schulungen',                   active: [14,15],      status: 'pending' as const, link: '/tasks',
      assignee: 'AH', description: 'EMR-System Anwenderschulung für Ärzte + Pflege (Patientenaufnahme, Dokumentation, Abrechnung). Behandlungsprotokolle: HBOT (tATA-Tabellen), IV-Therapie, Diagnostik-Workflows. SOPs im System hinterlegt.' },
    { name: 'Notfall-Drills & Simulationen',                active: [14,15],      status: 'pending' as const, link: '/tasks',
      assignee: 'SK', description: 'Notfallsimulationen: Druckkammer-Notfall (Feuer, Dekompression), Anaphylaxie IV-Therapie, Herzstillstand, Evakuierung. Crash Cart Check (wöchentlich). Dokumentation + Nachbesprechung. Min. 2 Drills pro Szenario.' },
    { name: 'Soft-Launch (10-20 Patienten)',                active: [16],         status: 'pending' as const, link: '/announcements',
      assignee: 'AH', description: 'Kontrollierter Probebetrieb mit 10-20 Patienten (Einladungsbasis). Alle Therapien testen: HBOT, IV-Infusion, Diagnostik. Feedback-Bögen, Prozessoptimierung, Timing-Analyse. Go/No-Go Entscheidung Woche 17.' },
    { name: 'Analyse & Korrekturen',                        active: [17],         status: 'pending' as const, link: '/tasks',
      assignee: 'AH', description: 'Auswertung Soft-Launch: Patientenzufriedenheit, Wartezeiten, Workflow-Engpässe, technische Probleme. Korrekturen implementieren: Personalplanung, Behandlungszeiten, IT-Anpassungen. Final Go für Eröffnung.' },
  ]},
  { label: 'PHASE 5 — Eröffnung & Wachstum (W18+)', color: '#5a8080', link: '/announcements', tasks: [
    { name: 'Offizielle Eröffnung & Medien-Launch',        active: [18],         status: 'pending' as const, link: '/announcements',
      assignee: 'LM', description: 'Grand Opening Event: Presse, lokale Ärzte, Investoren, VIP-Patienten. Führungen durch HBOT-Suite. Pressemitteilung (FAZ, FR, Gesundheitsmagazine). Social Media Launch (Instagram, LinkedIn). Fotograf + Videograph.' },
    { name: 'Marketingkampagne & PR',                       active: [17,18],      status: 'pending' as const, link: '/announcements',
      assignee: 'LM', description: 'Google Ads + Social Media Kampagne (Zielgruppe: 35-65J, Frankfurt + 30km). Kooperation lokale Fitness-Studios + Hotels. Ärzte-Netzwerk Überweisungen. Content: Blog, Newsletter, Testimonials. Budget: €20K/Monat.' },
    { name: 'Tier-2 Geräte Aktivierung (PBM, PEMF)',       active: [17,18],      status: 'pending' as const, link: '/budget',
      assignee: 'AH', description: 'Photobiomodulation (PBM) NovoTHOR Ganzkörper-Lichttherapie. PEMF (Pulsed Electromagnetic Field) iMRS Prime. Aufstellung, Kalibrierung, Personaleinweisung. Behandlungsprotokolle erstellen. Preisliste aktualisieren.' },
    { name: 'Mitgliedschaftsprogramm aktiv',                active: [18],         status: 'pending' as const, link: '/tasks',
      assignee: 'LM', description: 'Longevity-Mitgliedschaft 3 Stufen: Essential (€299/M), Premium (€599/M), Elite (€999/M). Inklusivleistungen: HBOT-Sitzungen, IV-Therapie, Diagnostik-Panels. Vertragssystem, Abrechnungsintegration EMR. Ziel: 50 Mitglieder M1.' },
  ]},
];
