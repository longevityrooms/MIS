import { Profile, Task, Risk, BudgetCategory, Announcement, Document, Role } from './types';

export const DEMO_PROFILES: Record<Role, Profile> = {
  PM: {
    id: 'demo-pm',
    name: 'Anna Schmidt',
    email: 'anna@longevityrooms.de',
    role: 'PM',
    created_at: '2025-01-15T10:00:00Z',
  },
  Investor: {
    id: 'demo-investor',
    name: 'Dr. Klaus Weber',
    email: 'klaus@longevityrooms.de',
    role: 'Investor',
    created_at: '2025-01-15T10:00:00Z',
  },
  MD: {
    id: 'demo-md',
    name: 'Thomas Müller',
    email: 'thomas@longevityrooms.de',
    role: 'MD',
    created_at: '2025-01-15T10:00:00Z',
  },
  Contractor: {
    id: 'demo-contractor',
    name: 'Marco Bianchi',
    email: 'marco@longevityrooms.de',
    role: 'Contractor',
    created_at: '2025-01-15T10:00:00Z',
  },
  Marketing: {
    id: 'demo-marketing',
    name: 'Lisa Hoffmann',
    email: 'lisa@longevityrooms.de',
    role: 'Marketing',
    created_at: '2025-01-15T10:00:00Z',
  },
};

export const DEMO_TASKS: Task[] = [
  {
    id: 't1', title: 'Baugenehmigung einreichen', description: 'Alle Unterlagen beim Bauamt Frankfurt einreichen',
    phase: 'Genehmigung', priority: 'Hoch', status: 'Abgeschlossen', progress: 100,
    due_date: '2025-03-15', created_at: '2025-01-20T10:00:00Z', updated_at: '2025-03-10T14:00:00Z',
  },
  {
    id: 't2', title: 'Innenarchitekt beauftragen', description: 'Angebote vergleichen und Vertrag abschließen',
    phase: 'Planung', priority: 'Hoch', status: 'Abgeschlossen', progress: 100,
    due_date: '2025-02-28', created_at: '2025-01-22T09:00:00Z', updated_at: '2025-02-25T16:00:00Z',
  },
  {
    id: 't3', title: 'Rohbauarbeiten Erdgeschoss', description: 'Wände, Decken und Böden im EG',
    phase: 'Bau', priority: 'Hoch', status: 'In Bearbeitung', progress: 72,
    due_date: '2025-06-30', created_at: '2025-03-01T08:00:00Z', updated_at: '2025-05-20T11:00:00Z',
  },
  {
    id: 't4', title: 'Elektroinstallation planen', description: 'Leitungsführung und Verteiler für alle Etagen',
    phase: 'Bau', priority: 'Mittel', status: 'In Bearbeitung', progress: 45,
    due_date: '2025-07-15', created_at: '2025-03-10T10:00:00Z', updated_at: '2025-05-18T09:00:00Z',
  },
  {
    id: 't5', title: 'Wellness-Geräte bestellen', description: 'Kryotherapie, Infrarotkabine, Hyperbaric Chamber',
    phase: 'Ausstattung', priority: 'Hoch', status: 'Offen', progress: 10,
    due_date: '2025-08-01', created_at: '2025-04-01T10:00:00Z', updated_at: '2025-04-01T10:00:00Z',
  },
  {
    id: 't6', title: 'Sanitäranlagen installieren', description: 'Badezimmer und Spa-Bereich',
    phase: 'Bau', priority: 'Mittel', status: 'Offen', progress: 0,
    due_date: '2025-08-15', created_at: '2025-04-05T10:00:00Z', updated_at: '2025-04-05T10:00:00Z',
  },
  {
    id: 't7', title: 'Brandschutzkonzept umsetzen', description: 'Sprinkleranlage und Fluchtwege',
    phase: 'Bau', priority: 'Hoch', status: 'In Bearbeitung', progress: 60,
    due_date: '2025-07-01', created_at: '2025-03-15T10:00:00Z', updated_at: '2025-05-22T10:00:00Z',
  },
  {
    id: 't8', title: 'Marketingkampagne vorbereiten', description: 'Social Media, Website, PR für Eröffnung',
    phase: 'Eröffnung', priority: 'Mittel', status: 'Offen', progress: 15,
    due_date: '2025-09-01', created_at: '2025-04-10T10:00:00Z', updated_at: '2025-04-10T10:00:00Z',
  },
  {
    id: 't9', title: 'Personal rekrutieren', description: 'Therapeuten, Empfang, Reinigung',
    phase: 'Eröffnung', priority: 'Hoch', status: 'Offen', progress: 5,
    due_date: '2025-09-15', created_at: '2025-04-12T10:00:00Z', updated_at: '2025-04-12T10:00:00Z',
  },
  {
    id: 't10', title: 'Lüftung & Klimaanlage', description: 'HVAC-System für Wellness-Bereich',
    phase: 'Bau', priority: 'Mittel', status: 'Blockiert', progress: 20,
    due_date: '2025-07-30', created_at: '2025-03-20T10:00:00Z', updated_at: '2025-05-15T10:00:00Z',
  },
];

export const DEMO_RISKS: Risk[] = [
  {
    id: 'r1', title: 'Lieferverzögerung Wellness-Geräte',
    description: 'Importierte Geräte könnten durch Zoll verzögert werden',
    impact: 'Hoch', probability: 'Mittel', status: 'Offen',
    mitigation: 'Alternative Lieferanten identifiziert, Frühbestellung eingeplant',
    owner: 'Anna Schmidt',
    created_at: '2025-02-10T10:00:00Z', updated_at: '2025-05-01T10:00:00Z',
  },
  {
    id: 'r2', title: 'Baukostenüberschreitung',
    description: 'Materialpreise könnten über Budget steigen',
    impact: 'Hoch', probability: 'Hoch', status: 'Offen',
    mitigation: 'Festpreisverträge mit Hauptlieferanten, 10% Puffer eingeplant',
    owner: 'Thomas Müller',
    created_at: '2025-02-15T10:00:00Z', updated_at: '2025-05-10T10:00:00Z',
  },
  {
    id: 'r3', title: 'Genehmigungsverzögerung Brandschutz',
    description: 'Brandschutzabnahme könnte sich verzögern',
    impact: 'Mittel', probability: 'Niedrig', status: 'Gemindert',
    mitigation: 'Frühzeitige Abstimmung mit Feuerwehr erfolgt',
    owner: 'Marco Bianchi',
    created_at: '2025-03-01T10:00:00Z', updated_at: '2025-04-20T10:00:00Z',
  },
  {
    id: 'r4', title: 'Fachkräftemangel Therapeuten',
    description: 'Qualifizierte Longevity-Therapeuten schwer zu finden',
    impact: 'Mittel', probability: 'Hoch', status: 'Offen',
    mitigation: 'Kooperation mit Ausbildungsinstituten, attraktives Gehaltspaket',
    owner: 'Lisa Hoffmann',
    created_at: '2025-03-10T10:00:00Z', updated_at: '2025-05-05T10:00:00Z',
  },
  {
    id: 'r5', title: 'Lärmbelästigung Nachbarn',
    description: 'Bauarbeiten könnten Beschwerden auslösen',
    impact: 'Niedrig', probability: 'Mittel', status: 'Geschlossen',
    mitigation: 'Lärmschutzmaßnahmen umgesetzt, Nachbarn informiert',
    owner: 'Anna Schmidt',
    created_at: '2025-02-20T10:00:00Z', updated_at: '2025-04-01T10:00:00Z',
  },
];

export const DEMO_BUDGET: BudgetCategory[] = [
  { id: 'b1', name: 'Bauarbeiten', budget: 850000, spent: 520000, color: '#2F4F4F', created_at: '2025-01-01T00:00:00Z', updated_at: '2025-05-20T00:00:00Z' },
  { id: 'b2', name: 'Ausstattung & Geräte', budget: 420000, spent: 85000, color: '#B87333', created_at: '2025-01-01T00:00:00Z', updated_at: '2025-05-20T00:00:00Z' },
  { id: 'b3', name: 'Innenarchitektur', budget: 180000, spent: 145000, color: '#3a6363', created_at: '2025-01-01T00:00:00Z', updated_at: '2025-05-20T00:00:00Z' },
  { id: 'b4', name: 'Genehmigungen & Recht', budget: 65000, spent: 52000, color: '#c98840', created_at: '2025-01-01T00:00:00Z', updated_at: '2025-05-20T00:00:00Z' },
  { id: 'b5', name: 'Marketing & Branding', budget: 95000, spent: 28000, color: '#4d7c7c', created_at: '2025-01-01T00:00:00Z', updated_at: '2025-05-20T00:00:00Z' },
  { id: 'b6', name: 'Personal & Schulung', budget: 120000, spent: 15000, color: '#6b8f8f', created_at: '2025-01-01T00:00:00Z', updated_at: '2025-05-20T00:00:00Z' },
  { id: 'b7', name: 'Reserve & Sonstiges', budget: 70000, spent: 12000, color: '#9ab0b0', created_at: '2025-01-01T00:00:00Z', updated_at: '2025-05-20T00:00:00Z' },
];

export const DEMO_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'a1', title: 'Meilenstein erreicht: Rohbau 70% fertig',
    body: 'Wir freuen uns mitteilen zu können, dass der Rohbau im Erdgeschoss zu 70% abgeschlossen ist. Die Arbeiten liegen im Zeitplan. Nächste Woche beginnen die Arbeiten im 1. OG.',
    priority: 'Hoch', role_visibility: ['PM', 'Investor', 'MD', 'Contractor', 'Marketing'],
    created_at: '2025-05-20T09:00:00Z',
  },
  {
    id: 'a2', title: 'Investorentreffen am 15. Juni',
    body: 'Das nächste Investorentreffen findet am 15. Juni um 14:00 Uhr vor Ort statt. Bitte bestätigen Sie Ihre Teilnahme bis zum 10. Juni.',
    priority: 'Normal', role_visibility: ['Investor', 'MD', 'PM'],
    created_at: '2025-05-18T14:00:00Z',
  },
  {
    id: 'a3', title: 'Neue Marketingstrategie genehmigt',
    body: 'Die überarbeitete Marketingstrategie für die Eröffnungskampagne wurde vom Management genehmigt. Details werden in der nächsten Teambesprechung besprochen.',
    priority: 'Normal', role_visibility: ['Marketing', 'PM', 'MD'],
    created_at: '2025-05-15T11:00:00Z',
  },
  {
    id: 'a4', title: 'Sicherheitshinweis: Baustelle',
    body: 'Ab sofort ist das Tragen von Schutzhelmen und Sicherheitsschuhen auf der gesamten Baustelle Pflicht. Bitte beachten Sie die markierten Wege.',
    priority: 'Dringend', role_visibility: ['Contractor', 'PM', 'MD'],
    created_at: '2025-05-12T08:00:00Z',
  },
];

export const DEMO_DOCUMENTS: Document[] = [
  { id: 'd1', name: 'Bauantrag_Frankfurt_2025.pdf', type: 'PDF', size: '2.4 MB', access_roles: ['PM', 'MD', 'Investor'], created_at: '2025-01-20T10:00:00Z' },
  { id: 'd2', name: 'Grundriss_EG_v3.pdf', type: 'PDF', size: '8.1 MB', access_roles: ['PM', 'MD', 'Contractor'], created_at: '2025-02-05T10:00:00Z' },
  { id: 'd3', name: 'Budget_Planung_Q1.xlsx', type: 'XLSX', size: '340 KB', access_roles: ['PM', 'MD', 'Investor'], created_at: '2025-01-15T10:00:00Z' },
  { id: 'd4', name: 'Innenarchitektur_Konzept.pdf', type: 'PDF', size: '15.2 MB', access_roles: ['PM', 'MD', 'Contractor', 'Marketing'], created_at: '2025-02-28T10:00:00Z' },
  { id: 'd5', name: 'Brandschutzkonzept.pdf', type: 'PDF', size: '4.7 MB', access_roles: ['PM', 'MD', 'Contractor'], created_at: '2025-03-10T10:00:00Z' },
  { id: 'd6', name: 'Marketingplan_2025.docx', type: 'DOCX', size: '1.8 MB', access_roles: ['PM', 'MD', 'Marketing'], created_at: '2025-04-01T10:00:00Z' },
  { id: 'd7', name: 'Geräteliste_Wellness.xlsx', type: 'XLSX', size: '520 KB', access_roles: ['PM', 'MD', 'Contractor', 'Investor'], created_at: '2025-04-10T10:00:00Z' },
  { id: 'd8', name: 'Mietvertrag_Schillerstr31.pdf', type: 'PDF', size: '890 KB', access_roles: ['PM', 'MD', 'Investor'], created_at: '2025-01-10T10:00:00Z' },
];
