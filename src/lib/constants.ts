import { Role } from './types';

export const ROLES: { value: Role; label: string; description: string; icon: string; badge: string; access: string }[] = [
  { value: 'PM', label: 'PM', description: 'Projektleiter', icon: '📋', badge: '#2F4F4F', access: 'Vollzugriff' },
  { value: 'Investor', label: 'Investor', description: 'Investor', icon: '💰', badge: '#B87333', access: 'Übersicht' },
  { value: 'MD', label: 'Medizin', description: 'Ärztliche Leitung', icon: '👔', badge: '#4d7c7c', access: 'Klinischer Zugang' },
  { value: 'Contractor', label: 'Auftragnehmer', description: 'Generalunternehmer', icon: '🔨', badge: '#8b6914', access: 'Bauzugang' },
  { value: 'Marketing', label: 'Marketing', description: 'Marketing-Direktorin', icon: '📢', badge: '#5a8080', access: 'Marketing-Zugang' },
];

export const DEMO_USERS: Record<string, { id: string; name: string; role: Role; title: string; avatar: string; color: string }> = {
  PM:         { id: 'pm',         name: 'Alex Müller',    role: 'PM',         title: 'Projektleiter',        avatar: 'AM', color: '#2F4F4F' },
  Investor:   { id: 'investor',   name: 'Robert Chen',    role: 'Investor',   title: 'Investor',             avatar: 'RC', color: '#B87333' },
  MD:         { id: 'md',         name: 'Dr. Sarah Kim',  role: 'MD',         title: 'Ärztliche Leitung',    avatar: 'SK', color: '#4d7c7c' },
  Contractor: { id: 'contractor', name: 'Mike Torres',    role: 'Contractor', title: 'Generalunternehmer',   avatar: 'MT', color: '#8b6914' },
  Marketing:  { id: 'marketing',  name: 'Lena Müller',    role: 'Marketing',  title: 'Marketing-Direktorin', avatar: 'LM', color: '#5a8080' },
};

export const NAV_ITEMS = [
  { href: '/dashboard',       label: 'Dashboard',        icon: '✦',  iconName: 'LayoutDashboard' },
  { href: '/projektzeitplan', label: 'Projektzeitplan',  icon: '▦',  iconName: 'CalendarRange' },
  { href: '/tasks',           label: 'Aufgaben',         icon: '◎',  iconName: 'CheckSquare' },
  { href: '/risks',           label: 'Risikoregister',   icon: '⚠',  iconName: 'AlertTriangle' },
  { href: '/budget',          label: 'Budget',           icon: '◈',  iconName: 'PieChart' },
  { href: '/announcements',   label: 'Ankündigungen',    icon: '◆',  iconName: 'Megaphone' },
  { href: '/documents',       label: 'Dokumente',        icon: '❑',  iconName: 'FileText' },
];

export const ROLE_NAV_ACCESS: Record<Role, string[]> = {
  PM: ['/dashboard', '/projektzeitplan', '/tasks', '/risks', '/budget', '/announcements', '/documents'],
  MD: ['/dashboard', '/projektzeitplan', '/tasks', '/risks', '/announcements', '/documents'],
  Investor: ['/dashboard', '/tasks', '/risks', '/budget', '/announcements', '/documents'],
  Contractor: ['/dashboard', '/projektzeitplan', '/tasks', '/announcements', '/documents'],
  Marketing: ['/dashboard', '/tasks', '/announcements', '/documents'],
};

export const PHASE_COLORS: Record<string, string> = {
  Planung: 'bg-forest/10 text-forest',
  Genehmigung: 'bg-bronze/12 text-bronze',
  Bau: 'bg-bronze-light/12 text-bronze',
  Ausstattung: 'bg-forest-muted/10 text-forest-muted',
  Eröffnung: 'bg-forest-light/12 text-forest-light',
};

export const PRIORITY_COLORS: Record<string, string> = {
  Hoch: 'bg-[rgba(192,57,43,0.12)] text-[#c0392b]',
  Mittel: 'bg-bronze/12 text-bronze',
  Niedrig: 'bg-forest/10 text-forest-light',
  Dringend: 'bg-[rgba(192,57,43,0.15)] text-[#c0392b]',
  Normal: 'bg-forest/10 text-forest',
};

export const STATUS_COLORS: Record<string, string> = {
  Offen: 'bg-forest/6 text-text-light',
  'In Bearbeitung': 'bg-bronze/12 text-bronze',
  Abgeschlossen: 'bg-forest/12 text-forest-light',
  Blockiert: 'bg-[rgba(192,57,43,0.12)] text-[#c0392b]',
  Gemindert: 'bg-bronze/12 text-bronze',
  Geschlossen: 'bg-forest/10 text-forest-light',
};

export const CHAT_SYSTEM_PROMPTS: Record<Role, string> = {
  PM: `Du bist der KI-Assistent für das MIS-Portal von Longevity Rooms Frankfurt, du sprichst mit Projektleiter Alex Müller. Du hast Zugang zu allen Projektdaten.\n\nPROJEKTSTATUS: Woche 9/18 · Phase 2 (Umbau & Beschaffung) zu 65% · Budget 342.000 €/1,2 Mio. € ausgegeben · HBOT-Suite Ziel W12 · KV-Antrag eingereicht (6-8 Wochen) · Blockiert: TÜV-Endzulassung Druckkammerraum · Kritisch: Notfallkoffer noch nicht beschafft · Risiken: Geräteverzögerungen, Baubudgetüberschreitung. Soft-Launch W16, Große Eröffnung W18.\n\nAntworte auf Deutsch. Sei präzise, direkt und weise proaktiv auf Probleme hin.`,
  Investor: `Du bist der KI-Assistent für das Investorenportal von Longevity Rooms Frankfurt, du sprichst mit Investor Robert Chen.\n\nTeile nur: Projekt ist zu 44% abgeschlossen (W9/18), Budget zu 28,5% ausgeschöpft (342.000 € von 1,2 Mio. €), Eröffnung in ca. 9 Wochen, Projektstatus GRÜN, abgeschlossene Meilensteine: GmbH-Gründung, Mietvertrag, Ärztin eingestellt, Umbau gestartet, Geräte bestellt.\n\nNICHT teilen: operative Details, klinische Protokolle, Personalinformationen, detaillierte Risikoübersicht. Antworte auf Deutsch mit Führungsklarheit.`,
  MD: `Du bist der klinische KI-Assistent für Longevity Rooms Frankfurt, du sprichst mit Ärztlicher Leiterin Dr. Sarah Kim.\n\nKLINISCHER KONTEXT: 14 Diagnostikbereiche · 12 Therapien (HBOT Sechrist 4100H x2 TÜV-konform, 2,0 ATA Longevity-Protokoll) · KV-Antrag eingereicht · NOTFALLKOFFER KRITISCH — noch nicht beschafft · Apotheken-Kooperation aktiv. Standort: Schiller Str. 31, 60313 Frankfurt am Main.\n\nBeantworte Fragen zu klinischen Protokollen, deutschen Zulassungsverfahren (KV, Gesundheitsamt, §93 SGB V), HBOT-Sicherheit, Gerätespezifikationen. Antworte auf Deutsch.`,
  Contractor: `Du bist der Bau-KI-Assistent für Longevity Rooms Frankfurt, du sprichst mit Generalunternehmer Mike Torres.\n\nBAUSTATUS: Start W6, 65% fertig · HBOT-Suite TÜV-konform, 3-Phasen-Anschluss erforderlich · MEP-Genehmigung erteilt · Ziel Fertigstellung W12 · Sechrist-Techniker kommt W12 · Blockiert: TÜV-Endabnahme Druckkammer (30% erledigt) · Kritisch: Kaltwasser-Badewanne Rohbau + IV-Suite Elektrik noch ausstehend. Standort: Schiller Str. 31, 60313 Frankfurt am Main.\n\nBeantworte Fragen zu Baufortschritt, TÜV-Anforderungen, technischen Spezifikationen, Bauplänen. Antworte auf Deutsch.`,
  Marketing: `Du bist der Marketing-KI-Assistent für Longevity Rooms Frankfurt, du sprichst mit Marketing-Direktorin Lena Müller.\n\nMARKETING-KONTEXT: Zielgruppe — Frankfurt Innenstadt / Rhein-Main-Gebiet, einkommensstarke Berufstätige & Führungskräfte (35-65) · Positionierung: Premium Longevity-Medizin, ärztlich geführt, wissenschaftlich fundiert · Launch W17-18 · Marketingbudget 75.000 € (noch nicht ausgegeben) · Website 45% fertig · Standort: Schiller Str. 31, 60313 Frankfurt am Main.\n\nBeantworte Fragen zu Launch-Strategie, digitalem Marketing, PR, Markenkommunikation, Mitgliedergewinnung. Keine Finanz- oder Klinikdetails. Antworte auf Deutsch.`,
};

export const CHAT_CHIPS: Record<Role, string[]> = {
  PM:         ['Welche Aufgaben verzögern sich?', 'Wichtigstes Risiko?', 'Budgetstatus?', 'HBOT-Suite Zeitplan?'],
  Investor:   ['Läuft das Projekt nach Plan?', 'Budgetübersicht?', 'Wann ist die Eröffnung?', 'Gibt es große Risiken?'],
  MD:         ['HBOT-Protokolldetails?', 'KV-Zulassungsprozess?', 'Notfallkoffer-Anforderungen?', 'Apotheken-Status?'],
  Contractor: ['HBOT-Suite Anforderungen?', 'TÜV-Normen?', 'Prioritäten diese Woche?', 'MEP-Status?'],
  Marketing:  ['Launch-Strategie Ideen?', 'Zielgruppe definieren?', 'Eröffnungsveranstaltung?', 'Markentonalität?'],
};

// ── PROJECT DATA ─────────────────────────────────────────────
export const PHASES = [
  { id: 1, name: 'Strategie & Gründung',   weeks: 'W1–W4',  color: '#2F4F4F', progress: 100 },
  { id: 2, name: 'Umbau & Beschaffung',    weeks: 'W5–W12', color: '#B87333', progress: 65 },
  { id: 3, name: 'Zulassung & Prüfungen',  weeks: 'W10–W16', color: '#4d7c7c', progress: 20 },
  { id: 4, name: 'Schulung & Soft-Launch',  weeks: 'W13–W17', color: '#8b6914', progress: 0 },
  { id: 5, name: 'Eröffnung & Wachstum',   weeks: 'W18+',   color: '#5a8080', progress: 0 },
];

export const MILESTONES = [
  { title: 'GmbH-Gründung & Rechtstruktur',             date: 'W1',  status: 'done' as const },
  { title: 'Mietvertrag Schiller Str. 31 unterzeichnet', date: 'W3',  status: 'done' as const },
  { title: 'Ärztliche Leitung eingestellt',              date: 'W5',  status: 'done' as const },
  { title: 'Umbau gestartet',                            date: 'W6',  status: 'done' as const },
  { title: 'Tier-1-Gerätebestellung aufgegeben',         date: 'W7',  status: 'done' as const },
  { title: 'KIS-System live geschaltet',                 date: 'W9',  status: 'active' as const },
  { title: 'HBOT-Suite fertiggestellt',                  date: 'W12', status: 'pending' as const },
  { title: 'Kassenärztliche Zulassung erteilt',          date: 'W13', status: 'pending' as const },
  { title: 'Brandschutz-Abnahme bestanden',              date: 'W13', status: 'pending' as const },
  { title: 'Soft-Launch',                                date: 'W16', status: 'pending' as const },
  { title: 'Große Eröffnung',                            date: 'W18', status: 'pending' as const },
];

export const PROJECT_TASKS = [
  { title: 'HBOT-Suite Elektroinstallation',      owner: 'contractor', phase: 2, priority: 'high' as const,     status: 'in_progress' as const, progress: 70, due: 'W9' },
  { title: 'InBody 970 Lieferung & Aufstellung',  owner: 'pm',         phase: 2, priority: 'high' as const,     status: 'in_progress' as const, progress: 40, due: 'W10' },
  { title: 'KIS-Systemkonfiguration',             owner: 'md',         phase: 2, priority: 'high' as const,     status: 'in_progress' as const, progress: 55, due: 'W9' },
  { title: 'Labcorp-Partnerschaftsvertrag',       owner: 'md',         phase: 2, priority: 'medium' as const,   status: 'done' as const,        progress: 100, due: 'W7' },
  { title: 'Apotheken-Kooperationsvertrag',       owner: 'pm',         phase: 2, priority: 'high' as const,     status: 'in_progress' as const, progress: 80, due: 'W9' },
  { title: 'HBOT-Druckkammerraum TÜV-Zulassung', owner: 'contractor', phase: 2, priority: 'high' as const,     status: 'blocked' as const,     progress: 30, due: 'W10' },
  { title: 'Website-Entwicklung',                 owner: 'marketing',  phase: 2, priority: 'medium' as const,   status: 'in_progress' as const, progress: 45, due: 'W12' },
  { title: 'Kassenärztliche Vereinigung Antrag',  owner: 'md',         phase: 3, priority: 'high' as const,     status: 'in_progress' as const, progress: 60, due: 'W11' },
  { title: 'Betriebserlaubnis Gesundheitsamt',    owner: 'pm',         phase: 3, priority: 'medium' as const,   status: 'not_started' as const, progress: 0,  due: 'W10' },
  { title: 'Notfallkoffer Beschaffung & Bestückung', owner: 'md',      phase: 2, priority: 'critical' as const, status: 'not_started' as const, progress: 0,  due: 'W11' },
];

export const PROJECT_RISKS = [
  { title: 'HBOT-Druckkammer TÜV-Verzögerung',    impact: 'high' as const,     prob: 'medium' as const, status: 'active' as const,     owner: 'PM' },
  { title: 'KV-Zulassung Verzögerung',             impact: 'high' as const,     prob: 'low' as const,    status: 'active' as const,     owner: 'MD' },
  { title: 'Gerätlieferungsverzögerungen',          impact: 'medium' as const,   prob: 'high' as const,   status: 'watching' as const,   owner: 'PM' },
  { title: 'Apotheken-Kooperation Regularien',      impact: 'high' as const,     prob: 'medium' as const, status: 'watching' as const,   owner: 'MD' },
  { title: 'Baubudget-Überschreitung',              impact: 'medium' as const,   prob: 'high' as const,   status: 'active' as const,     owner: 'PM' },
  { title: 'Patientensicherheitsvorfall (IV/HBOT)', impact: 'critical' as const, prob: 'low' as const,    status: 'mitigation' as const, owner: 'MD' },
];

export const PROJECT_BUDGET = {
  total: 1200000,
  spent: 342000,
  committed: 285000,
  cats: [
    { name: 'HBOT-Geräte & Suite',      budget: 280000, spent: 120000, color: '#2F4F4F' },
    { name: 'Klinische Geräte Tier 1',  budget: 220000, spent: 95000,  color: '#B87333' },
    { name: 'Umbau & Renovierung',      budget: 250000, spent: 85000,  color: '#4d7c7c' },
    { name: 'IT & Software',            budget: 80000,  spent: 22000,  color: '#8b6914' },
    { name: 'Personal (6 Monate)',      budget: 250000, spent: 0,      color: '#c0392b' },
    { name: 'Zulassung & Rechtskosten', budget: 45000,  spent: 20000,  color: '#5a8080' },
    { name: 'Marketing & Eröffnung',    budget: 75000,  spent: 0,      color: '#a0522d' },
  ],
};

export const PROJECT_ANNOUNCEMENTS = [
  { title: 'HBOT-Suite Umbau läuft 🏗️',       date: 'Vor 3 Tagen',  author: 'PM', priority: 'high' as const,   body: 'Das Sechrist-Team ist Montag eingetroffen. Die TÜV-konforme Elektroinstallation für den HBOT-Raum wurde genehmigt. Geplante Fertigstellung: Woche 12.', role: 'all' },
  { title: 'InBody 970 Bestellung bestätigt',   date: 'Vor 5 Tagen',  author: 'PM', priority: 'normal' as const, body: 'Vereinbarung mit InBody Deutschland unterzeichnet. Liefertermin Woche 10. Schulung dauert 2 Tage.', role: 'all' },
  { title: 'KV-Zulassungsantrag eingereicht',   date: 'Vor 1 Woche',  author: 'MD', priority: 'high' as const,   body: 'Dr. Kim hat alle Unterlagen vervollständigt und bei der Kassenärztlichen Vereinigung eingereicht. Bearbeitungszeit: ca. 6–8 Wochen.', role: 'pm,md,investor' },
  { title: 'Q2 Investorenbericht verfügbar',     date: 'Vor 2 Wochen', author: 'PM', priority: 'normal' as const, body: 'Der detaillierte Finanzbericht und die Projektstatuszusammenfassung für das letzte Quartal sind im Dokumentenbereich verfügbar.', role: 'investor,pm' },
  { title: 'Apotheken-Partnerschaft bestätigt',  date: 'Vor 2 Wochen', author: 'MD', priority: 'normal' as const, body: 'Kooperationsvertrag mit Compounding-Apotheke unterzeichnet. Peptid- & NAD+-Versorgungsprotokoll ist aktiv.', role: 'pm,md' },
];

export const PROJECT_DOCUMENTS = [
  { name: 'Projektmanagementplan v1.0',          type: 'pdf',  date: '22. Feb 2026', size: '2,4 MB', access: 'pm,investor,md' },
  { name: 'Klinisches Rahmenkonzept',            type: 'docx', date: '20. Feb 2026', size: '1,8 MB', access: 'pm,md' },
  { name: 'Geräte- & Beschaffungsliste',         type: 'xlsx', date: '20. Feb 2026', size: '890 KB', access: 'pm,md,contractor' },
  { name: 'Q2 Finanzbericht',                    type: 'pdf',  date: '15. Feb 2026', size: '1,1 MB', access: 'pm,investor' },
  { name: 'HBOT-Raum Technischer Plan',          type: 'pdf',  date: '10. Feb 2026', size: '3,2 MB', access: 'pm,contractor' },
  { name: 'KV-Zulassungspaket',                  type: 'pdf',  date: '8. Feb 2026',  size: '4,5 MB', access: 'pm,md' },
  { name: 'Marketing-Strategieplan',             type: 'pptx', date: '5. Feb 2026',  size: '5,1 MB', access: 'pm,marketing' },
  { name: 'Patientenprotokoll-Leitfaden v0.1',   type: 'docx', date: '1. Feb 2026',  size: '2,0 MB', access: 'pm,md' },
];

export const GANTT_DATA = [
  { label: 'PHASE 1 — Strategie & Gründung', color: '#2F4F4F', link: '/tasks', tasks: [
    { name: 'GmbH-Gründung & Rechtsstruktur', active: [1,2], status: 'done' as const, link: '/documents' },
    { name: 'Gesundheitsamt-Anmeldung', active: [2,3,4], status: 'done' as const, link: '/documents' },
    { name: 'Mietvertrag Schiller Str. 31', active: [2,3], status: 'done' as const, link: '/documents' },
    { name: 'Architekt & Auftragnehmer', active: [3,4,5], status: 'done' as const, link: '/tasks' },
    { name: 'Ärztliche Leitung Einstellung', active: [3,4,5,6], status: 'done' as const, link: '/tasks' },
  ]},
  { label: 'PHASE 2 — Umbau & Beschaffung', color: '#B87333', link: '/tasks', tasks: [
    { name: 'Umbau & Renovierung', active: [6,7,8,9,10,11,12,13], status: 'active' as const, link: '/tasks' },
    { name: 'HBOT-Suite TÜV-konform', active: [6,7,8,9,10,11,12], status: 'active' as const, link: '/risks' },
    { name: 'Tier-1-Gerätebestellung', active: [5,6,7], status: 'done' as const, link: '/budget' },
    { name: 'KIS & IT-Infrastruktur', active: [5,6,7,8,9], status: 'active' as const, link: '/tasks' },
    { name: 'Labor & Apothekenverträge', active: [4,5,6], status: 'done' as const, link: '/documents' },
  ]},
  { label: 'PHASE 3 — Zulassung & Prüfungen', color: '#4d7c7c', link: '/risks', tasks: [
    { name: 'HBOT-Druckkammer TÜV-Abnahme', active: [11,12,13], status: 'pending' as const, link: '/risks' },
    { name: 'KV-Zulassung', active: [12,13], status: 'pending' as const, link: '/documents' },
    { name: 'Brandschutz & Baugenehmigung', active: [12,13,14], status: 'pending' as const, link: '/risks' },
  ]},
  { label: 'PHASE 4 — Schulung & Soft-Launch', color: '#8b6914', link: '/tasks', tasks: [
    { name: 'BLS/ILS-Zertifizierungen', active: [14,15], status: 'pending' as const, link: '/tasks' },
    { name: 'HBOT-Bedienerschulung', active: [14,15,16], status: 'pending' as const, link: '/tasks' },
    { name: 'Soft-Launch', active: [16,17], status: 'pending' as const, link: '/announcements' },
  ]},
  { label: 'PHASE 5 — Große Eröffnung', color: '#5a8080', link: '/announcements', tasks: [
    { name: 'Große Eröffnung', active: [18], status: 'pending' as const, link: '/announcements' },
    { name: 'Tier-2-Aktivierung', active: [17,18], status: 'pending' as const, link: '/budget' },
  ]},
];
