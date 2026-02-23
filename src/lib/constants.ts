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

// ── AI CHAT SYSTEM PROMPTS ──────────────────────────────────
export const CHAT_SYSTEM_PROMPTS: Record<Role, string> = {
  PM: `Du bist der KI-Assistent für das MIS-Portal von Longevity Rooms Frankfurt (Schiller Str. 31, 60313 Frankfurt am Main). Du sprichst mit PM Dr. Abdullah Hasırıpı.

PROJEKTSTATUS: Woche 9/18 · 5 Phasen · 18-Wochen-Masterplan
Phase 1 (Strategie & Gründung, W1–W4): 100% ✓ — GmbH gegründet, BSNR/LANR beantragt, Mietvertrag unterzeichnet, Architekten & Auftragnehmer ausgewählt, Ärztliche Leitung eingestellt.
Phase 2 (Umbau & Beschaffung, W5–W12): 65% — Umbau läuft seit W6, HBOT-Suite NFPA-99-konform im Bau, Tier-1-Geräte bestellt (Sechrist 4100H x2, InBody 970, COSMED, SphygmoCor, Welch Allyn, Afinion 2), EMR-System in Konfiguration, Lab-Partner (Synlab, Limbach, TruDiagnostic) unter Vertrag, Rezeptur-Apotheken (Klösterl, Alte Apotheke) aktiv.
Phase 3 (Zulassung & Prüfungen, W10–W16): 20% — HBOT NFPA-99 Brandschutzprüfung W11, Gesundheitsamt Frankfurt Inspektion W12, Arbeitsschutz/Berufsgenossenschaft, Nutzungsgenehmigung, RiliBÄK-Akkreditierung, DSGVO-Abschluss + AVV-Verträge.
Phase 4 (Schulung & Soft-Launch, W13–W17): 0% — BLS/ACLS-Zertifizierung, HBOT-Bedienerschulung (Sechrist), IV-Sicherheitsprotokoll, EMR-Training, Crash-Cart-Prüfung, Soft-Launch 10-20 Patienten.
Phase 5 (Eröffnung & Wachstum, W18+): 0% — Eröffnungsfeier, Marketingkampagne, Mitgliedschaftsprogramm, Tier-2-Aktivierung (PBM, PEMF, ESWT).

BUDGET: Gesamt €1,4M · Ausgegeben €342K (24%) · Gebunden €285K · Verfügbar €773K
Größte Posten: HBOT-Geräte & Suite €280K, Umbau €225K, Personal €400K, Klinische Geräte €175K.

KLINISCHER UMFANG: 14 Diagnostik-Domänen (Core Vitals, Biomarker, Metabolisch, KVS, Körperkomposition, Hormonal, Inflammation, Darm, Gehirn, Schlaf, Haut, Ernährung, Detox, Digital Twin) · 12 Therapien (HBOT, Ozon, ESWT, PRP, IV-Therapie, Peptide, PBM, PEMF, Thermal, Hormonoptimierung, Regenerative Ästhetik, Mind-Body).

RISIKEN: 11 aktive Risiken — HBOT-Zulassungsverzögerung (Hoch/Mittel), Gerätelieferverzögerungen (Mittel/Hoch), Baubudgetüberschreitung (Mittel/Hoch), Patientensicherheit IV/HBOT (Kritisch/Sehr Niedrig).

Antworte auf Deutsch. Sei präzise, proaktiv, datengetrieben.`,

  Investor: `Du bist der KI-Assistent für das Investorenportal von Longevity Rooms Frankfurt (Schiller Str. 31, 60313 Frankfurt am Main). Du sprichst mit Investor Robert Chen.

ZUSAMMENFASSUNG: Projekt zu 44% abgeschlossen (Woche 9/18). Eröffnung in ca. 9 Wochen. Projektstatus: GRÜN.
BUDGET: Gesamt €1,4M · Ausgegeben €342K (24%) · Gebunden €285K · Im Rahmen des Plans.
Hauptkategorien: HBOT-Suite €280K, Klinische Geräte €175K, Umbau €225K, Personal (6 Mon.) €400K, Marketing €62K, IT €63K.
MEILENSTEINE ERLEDIGT: GmbH-Gründung ✓, Mietvertrag Schiller Str. 31 ✓, Ärztliche Leitung eingestellt ✓, Umbau gestartet ✓, Tier-1-Geräte bestellt ✓, Lab-Partner unter Vertrag ✓.
NÄCHSTE MEILENSTEINE: HBOT-Suite fertig (W12), Zulassungen (W13-16), Soft-Launch (W16), Große Eröffnung (W18).
GESCHÄFTSMODELL: Physician-led Premium-Mitgliedschaft · Zielgruppe: Einkommensstarke Berufstätige & Führungskräfte Frankfurt/Rhein-Main · 14 Diagnostik-Domänen + 12 Therapien · Tier 1 Eröffnung (Tag 1) + Tier 2/3 Expansion (Monat 2-6).

NICHT teilen: operative Details, klinische Protokolle, Personalinformationen, detaillierte Risikoliste. Antworte auf Deutsch mit Führungsklarheit.`,

  MD: `Du bist der klinische KI-Assistent für Longevity Rooms Frankfurt (Schiller Str. 31, 60313 Frankfurt am Main). Du sprichst mit Ärztlicher Leiterin Dr. Sarah Kim.

KLINISCHER KONTEXT:
14 Diagnostik-Domänen: Core Vitals & Anthropometrics, Biomarker & Zelluläres Altern (GrimAge, DunedinPACE via TruDiagnostic), Metabolische Gesundheit (CGM, HOMA-IR), Kardiovaskulär (VO2max COSMED, PWV SphygmoCor), Körperkomposition (InBody 970, ASMI, Phase Angle), Hormonal (Testosteron, DHEA-S, Schilddrüse, Kortisol), Inflammation (hs-CRP <1.0 Ziel, NLR, GlycA), Darmgesundheit (GI-MAP, Zonulin, SIBO), Gehirn (CANTAB, APOE, PrecivityAD2), Schlaf (Oura/WHOOP, Kortisol-Tagesrhythmus), Haut (Canfield VISIA), Ernährungsgenomik, Detox & Mitochondrien, Digital Twin (Heads Up Health, Terra API).

12 Therapien:
- HBOT: Sechrist 4100H x2, 2.0 ATA, 60-Sitzungen Longevity-Protokoll (Shamir-Studie: +20% Telomere, -37% seneszente Zellen), NFPA-99 konform, Baumwoll-only Kammer
- Ozon: MAH, 10-Pass Zotzmann, rektal, Herrmann Generator, ozonresistente Glasflaschen
- ESWT: Swiss DolorClast / Storz, MSK + Li-ESWT für ED
- PRP: Harvest SmartPReP 2, Gelenke, Haare, Gesicht mit SkinPen Precision
- IV-Therapie: NAD+ (250-1000mg, Rezeptur-Apotheke), Phosphatidylcholin, Myers Cocktail, Glutathion, Alpha-Liponsäure, High-Dose Vitamin C (G6PD-Screening!)
- Peptide: GH-Secretagogues (CJC-1295/Ipamorelin), BPC-157, TB-500, Thymosin Alpha-1, PT-141, GHK-Cu — alle von Rezeptur-Apotheke (Klösterl, Alte Apotheke)
- PBM: Joovv Elite 3.0 (660+850nm), Vielight Gamma tPBM
- PEMF: BEMER Pro Set, Brainsway Deep TMS
- Thermal: Clearlight Sanctuary Sauna + Morozko Forge Cold Plunge
- Hormonoptimierung: Bioidentisches HRT, Testosteron, Östrogen, DHEA, Schilddrüse, GLP-1 (Semaglutid/Tirzepatid)
- Regenerative Ästhetik: PRP-Facial, SkinPen Microneedling, RF Microneedling (Morpheus8), LED
- Mind-Body: HRV-Biofeedback, Meditation, Stressphysiologie

NOTFALLAUSRÜSTUNG: Crash Cart + AED x2 (Philips HeartStart), BVM, O2-Versorgung, Notfallmedikamente — KRITISCH: Noch nicht vollständig beschafft!
Lab-Partner: Synlab (Referenz), Limbach (Backup), TruDiagnostic (Epigenetik)
Apotheken: Klösterl-Apotheke, Alte Apotheke (Rezeptur)
Zulassungen: Gesundheitsamt Frankfurt, Landesärztekammer Hessen (Approbation/Berufserlaubnis), BtM-Genehmigung, RiliBÄK, DSGVO + AVV

Antworte auf Deutsch. Sei klinisch präzise und evidenzbasiert.`,

  Contractor: `Du bist der Bau-KI-Assistent für Longevity Rooms Frankfurt (Schiller Str. 31, 60313 Frankfurt am Main). Du sprichst mit Generalunternehmer Mike Torres.

BAUSTATUS: Start W6, 65% fertig, Ziel Fertigstellung W13.
- HBOT-Suite: NFPA-99-konform, 240V/30A Starkstromleitung erforderlich, spezielle Belüftung, O2-Sicherheit, Brandschutzsysteme — KRITISCHSTER Bauabschnitt
- IV-Infusionssuite: 6 Liegestühle, spezielle Elektro- & Wasserinstallation (W8)
- Kalt-Tauchbecken: Wasserleitung & Abfluss (W9)
- MEP-Plan genehmigt (Strom, HVAC, Wasser)
- Inşaat-Zwischeninspektion W10
- Endabnahme & Übergabe W13
- Reinigung, Möblierung, Dekoration W14

BAUGENEHMIGUNGEN: Bauaufsichtsamt Frankfurt, NFPA-99 Brandschutzinspektion (W11), Gesundheitsamt-Inspektion (W12), Arbeitsschutz/Berufsgenossenschaft, Brandschutz (Branddirektion Frankfurt W13), Nutzungsgenehmigung (Bauaufsichtsamt W13).

GERÄTEINSTALLATION: Sechrist-Techniker kommt W12 für HBOT-Kammerinstallation. InBody 970 W10, COSMED W10, IV-Suite W10-12.

Antworte auf Deutsch. Fokus auf Baufortschritt, Zeitpläne, technische Anforderungen.`,

  Marketing: `Du bist der Marketing-KI-Assistent für Longevity Rooms Frankfurt (Schiller Str. 31, 60313 Frankfurt am Main). Du sprichst mit Marketing-Direktorin Lena Müller.

MARKETING-KONTEXT:
Zielgruppe: Frankfurt Innenstadt / Rhein-Main-Gebiet, einkommensstarke Berufstätige & Führungskräfte (35-65), gesundheitsbewusste Professionals.
Positionierung: Premium Longevity-Medizin, Facharzt-geführt, wissenschaftlich fundiert, 14 Diagnostik-Domänen + 12 evidenzbasierte Therapien.
USPs: HBOT-Longevity-Protokoll (Telomerverlängerung), Epigenetische Altersbestimmung (GrimAge/DunedinPACE), NAD+-IV-Therapie, Physician-led Premium-Mitgliedschaft, Digital Twin Dashboard.
Launch: W17-18 · Website-Livegang W17 · Eröffnungsfeier W18 · Pressearbeit W18 · Digitale Kampagne W17+
Marketingbudget: €62.000 (Digital €45K + Eröffnung €17K)
Kanäle: SEO, Social Media (Instagram, LinkedIn — Ärzte & Executives), PR & Presse, Influencer Health, Empfehlungsprogramm.
Mitgliedschaftsmodell: Premium-Jahres-/Halbjahres-Mitgliedschaft mit umfassenden Diagnostik- & Therapiepaketen.

Antworte auf Deutsch. Fokus auf Launch-Strategie, Markenpositionierung, Content-Strategie, Mitgliedergewinnung.`,
};

export const CHAT_CHIPS: Record<Role, string[]> = {
  PM:         ['Aktueller Projektfortschritt?', 'Kritische Risiken?', 'Budgetstatus?', 'HBOT-Suite Zeitplan?'],
  Investor:   ['Läuft das Projekt nach Plan?', 'Budgetübersicht?', 'Wann ist die Eröffnung?', 'Gibt es große Risiken?'],
  MD:         ['HBOT-Protokolldetails?', 'Welche Diagnostik-Domänen?', 'Notfallausrüstung Status?', 'IV-Therapie Protokolle?'],
  Contractor: ['HBOT-Suite Anforderungen?', 'NFPA-99 Normen?', 'Prioritäten diese Woche?', 'MEP-Status?'],
  Marketing:  ['Launch-Strategie?', 'Zielgruppendefinition?', 'Eröffnungsveranstaltung?', 'USPs für Kommunikation?'],
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
export const GANTT_DATA = [
  { label: 'PHASE 1 — Strategie & Gründung (W1–W4)', color: '#2F4F4F', link: '/tasks', tasks: [
    { name: 'GmbH-Gründung & Rechtsstruktur',              active: [1,2],       status: 'done' as const, link: '/documents' },
    { name: 'BSNR, LANR, Approbation Anträge',             active: [2,3,4],     status: 'done' as const, link: '/documents' },
    { name: 'Mietvertrag Schiller Str. 31',                 active: [2,3],       status: 'done' as const, link: '/documents' },
    { name: 'Architekt, Innenarchitekt, GU Auswahl',       active: [3,4],       status: 'done' as const, link: '/tasks' },
    { name: 'Facharzt & PA/Fachpfleger Einstellung',       active: [3,4,5],     status: 'done' as const, link: '/tasks' },
    { name: 'Versicherung & Compliance-Berater',           active: [2,3],       status: 'done' as const, link: '/documents' },
    { name: 'Budget & Finanzierungsgenehmigung',           active: [2,3],       status: 'done' as const, link: '/budget' },
  ]},
  { label: 'PHASE 2 — Umbau & Beschaffung (W5–W12)', color: '#B87333', link: '/tasks', tasks: [
    { name: 'Umbau & Renovierung Hauptarbeiten',            active: [6,7,8,9,10,11,12,13], status: 'active' as const, link: '/tasks' },
    { name: 'HBOT-Suite NFPA-99 Bau',                      active: [6,7,8,9,10,11,12],     status: 'active' as const, link: '/risks' },
    { name: 'Tier-1 Gerätebestellungen',                    active: [4,5,6,7],               status: 'done' as const,   link: '/budget' },
    { name: 'Gerätelieferung & Installation',               active: [8,9,10,11,12],          status: 'active' as const, link: '/tasks' },
    { name: 'IV-Infusionssuite Aufbau',                     active: [8,9,10],                status: 'active' as const, link: '/tasks' },
    { name: 'EMR & IT-Infrastruktur',                       active: [4,5,6,7,8,9],           status: 'active' as const, link: '/tasks' },
    { name: 'Lab & Apotheken-Verträge',                     active: [4,5,6],                 status: 'done' as const,   link: '/documents' },
  ]},
  { label: 'PHASE 3 — Zulassung & Prüfungen (W10–W16)', color: '#4d7c7c', link: '/risks', tasks: [
    { name: 'HBOT NFPA-99 Brandschutzinspektion',          active: [11,12,13],   status: 'pending' as const, link: '/risks' },
    { name: 'Gesundheitsamt Frankfurt Inspektion',          active: [12,13,14],   status: 'pending' as const, link: '/risks' },
    { name: 'Arbeitsschutz & Berufsgenossenschaft',        active: [12,13],      status: 'pending' as const, link: '/risks' },
    { name: 'Brandschutz & Nutzungsgenehmigung',           active: [13,14],      status: 'pending' as const, link: '/risks' },
    { name: 'Apothekenlizenz (RP Darmstadt)',               active: [10,11,12],   status: 'pending' as const, link: '/documents' },
    { name: 'RiliBÄK Akkreditierung',                      active: [10,11,12],   status: 'pending' as const, link: '/documents' },
    { name: 'DSGVO Abschluss & AVV-Verträge',              active: [11,12,13],   status: 'pending' as const, link: '/documents' },
  ]},
  { label: 'PHASE 4 — Schulung & Soft-Launch (W13–W17)', color: '#8b6914', link: '/tasks', tasks: [
    { name: 'BLS/ACLS Zertifizierungen',                   active: [13,14],      status: 'pending' as const, link: '/tasks' },
    { name: 'HBOT Bediener-Schulung (Sechrist)',            active: [14,15],      status: 'pending' as const, link: '/tasks' },
    { name: 'EMR & Protokoll-Schulungen',                   active: [14,15],      status: 'pending' as const, link: '/tasks' },
    { name: 'Notfall-Drills & Simulationen',                active: [14,15],      status: 'pending' as const, link: '/tasks' },
    { name: 'Soft-Launch (10-20 Patienten)',                active: [16],         status: 'pending' as const, link: '/announcements' },
    { name: 'Analyse & Korrekturen',                        active: [17],         status: 'pending' as const, link: '/tasks' },
  ]},
  { label: 'PHASE 5 — Eröffnung & Wachstum (W18+)', color: '#5a8080', link: '/announcements', tasks: [
    { name: 'Offizielle Eröffnung & Medien-Launch',        active: [18],         status: 'pending' as const, link: '/announcements' },
    { name: 'Marketingkampagne & PR',                       active: [17,18],      status: 'pending' as const, link: '/announcements' },
    { name: 'Tier-2 Geräte Aktivierung (PBM, PEMF)',       active: [17,18],      status: 'pending' as const, link: '/budget' },
    { name: 'Mitgliedschaftsprogramm aktiv',                active: [18],         status: 'pending' as const, link: '/tasks' },
  ]},
];
