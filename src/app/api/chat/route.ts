import { NextRequest, NextResponse } from 'next/server';
import { CHAT_SYSTEM_PROMPTS } from '@/lib/constants';
import { Role, ChatMessage } from '@/lib/types';

const hasAnthropicKey = !!process.env.ANTHROPIC_API_KEY;

// Fallback responses with REAL project data from PM Plan, Equipment & Framework documents
const FALLBACK_RESPONSES: Record<string, string[]> = {
  PM: [
    'Das Projekt befindet sich in Woche 9 von 18. Phase 2 (Umbau & Beschaffung) ist aktiv mit 65% Fortschritt. Phase 1 (Strategie & Gründung) ist zu 100% abgeschlossen. Der Gesamtfortschritt liegt bei ca. 44%.',
    'Aktuell gibt es 11 aktive Risiken. Die kritischsten: Patientensicherheitsvorfall IV/HBOT (Kritisch/Niedrig — Crash Cart + AED beschaffen!), HBOT NFPA-99 Zulassungsverzögerung (Hoch/Mittel), Baubudget-Überschreitung (Mittel/Hoch), Gerätelieferverzögerungen (Mittel/Hoch).',
    'Das Budget beträgt €1,4M. Ausgegeben: €342K (24%). Gebunden: €285K. Verfügbar: €773K. Hauptposten: HBOT-Suite €280K, Personal €400K, Umbau €225K, Klinische Geräte Tier 1 €175K, IT €63K, Marketing €62K.',
    'Die nächsten kritischen Meilensteine: EMR live (W9), HBOT 240V Starkstrom fertig (W9), HBOT NFPA-99 Inspektion (W11), Gesundheitsamt Inspektion (W12), HBOT-Suite & Sechrist installiert (W12), Nutzungsgenehmigung (W13), Soft-Launch (W16), Große Eröffnung (W18).',
    'Blockierte/Kritische Aufgaben: Crash Cart + AED x2 noch nicht vollständig geliefert (KRITISCH — gesetzliche Pflicht vor erstem Patienten!). HBOT Installation wartet auf Raumfertigstellung. 6 Zulassungsprüfungen in Phase 3 ausstehend.',
    'Kontakte: Synlab (Referenzlabor), Limbach (Backup), TruDiagnostic (Epigenetik), Klösterl-Apotheke & Alte Apotheke (Rezeptur für NAD+, Peptide, HRT), Henry Schein / Hartmann (Verbrauchsmaterial). Sechrist Industries (HBOT-Kammern).',
  ],
  Investor: [
    'Projektstatus: GRÜN. Woche 9/18, Gesamtfortschritt 44%. Budget: €1,4M — €342K ausgegeben (24%), im Plan. Eröffnung in ca. 9 Wochen (W18). Alle Phase-1-Meilensteine erreicht.',
    'Hauptkostenpositionen: HBOT-Suite €280K (43% ausgegeben), Klinische Geräte €175K (54% ausgegeben), Umbau €225K (38% ausgegeben), Personal €400K (noch nicht begonnen), IT €63K (35% ausgegeben). Keine Budgetüberschreitungen.',
    'Geschäftsmodell: Physician-led Premium-Mitgliedschaft. Zielgruppe: Einkommensstarke Berufstätige & Führungskräfte (35-65), Frankfurt/Rhein-Main. 14 Diagnostik-Domänen + 12 Therapien. Tier-1 Launch am Tag 1, Tier-2/3 Expansion ab Monat 2-6. KPI-Ziel: 50+ Mitglieder nach 2 Monaten.',
    'Erledigte Meilensteine: GmbH-Gründung ✓, Steuernummer ✓, Mietvertrag Schiller Str. 31 ✓, Versicherung ✓, Ärztliche Leitung ✓, Umbau gestartet ✓, Tier-1-Geräte bestellt ✓, Lab-Partner unter Vertrag ✓, Apotheken aktiv ✓.',
  ],
  MD: [
    'Klinisches Leistungsspektrum: 14 Diagnostik-Domänen (Core Vitals, Biomarker/Epigenetik, Metabolisch, Kardiovaskulär, Körperkomposition, Hormonal, Inflammation, Darmgesundheit, Gehirn/Kognition, Schlaf, Haut, Ernährungsgenomik, Detox/Mitochondrien, Digital Twin).',
    'Therapien: HBOT (Sechrist 4100H x2, 2.0 ATA, 60-Sitzungen Longevity-Protokoll), Ozon (MAH, 10-Pass Zotzmann), ESWT (Swiss DolorClast), PRP (Harvest SmartPReP 2), IV-Therapie (NAD+ 250-1000mg, PC, Myers, Glutathion, ALA, High-Dose Vit C — G6PD-Screening!), Peptide (Klösterl/Alte Apotheke), PBM (Joovv Elite), PEMF (BEMER Pro), Thermal (Clearlight Sauna + Morozko Cold Plunge), Hormonoptimierung (Bioidentisch + GLP-1).',
    'HBOT-Protokoll (Shamir-Studie): 60 Sitzungen à 90 Min bei 2.0 ATA, 100% O2 → +20-38% Telomerlänge, -10-37% seneszente Zellen. Kammer nutzt Druckluft + integrierter O2-Konzentrator (kein externer O2-Tank). Baumwoll-only in der Kammer! BLS/ACLS-Pflicht für alle Mitarbeiter.',
    'Lab-Partner: Synlab (Referenz — Endokrinologie, Blutbild, Biochemie), Limbach Gruppe (Backup), TruDiagnostic (GrimAge + DunedinPACE Epigenetik-Clocks), Vibrant America (Darm-Zoomer, Umwelttoxine). POC: Afinion 2 (HbA1c, hs-CRP), Butterfly iQ+ (Ultraschall).',
    'NOTFALLAUSRÜSTUNG (KRITISCH): Crash Cart (Harloff 5-Schubladen) + AED x2 (Philips HeartStart FRx) + BVM + O2-Versorgung + Notfallmedikamente (Epinephrin, Diphenhydramin, Methylprednisolon). MUSS VOR ERSTEM PATIENTEN VOLLSTÄNDIG BESTÜCKT SEIN! BLS für alle, ACLS für MD/NP.',
    'Zulassungen in Bearbeitung: Gesundheitsamt Frankfurt Klinikinspektion (W12), Landesärztekammer Hessen Approbation/Berufserlaubnis (beantragt), BtM-Genehmigung (beantragt), DSGVO Abschluss + AVV-Verträge (W11), RiliBÄK-Akkreditierung (W10).',
  ],
  Contractor: [
    'Baustatus: Start W6, 65% fertig, Ziel Fertigstellung W13. HBOT-Suite NFPA-99-konform im Bau (kritischster Abschnitt). 240V/30A Starkstromleitung wird diese Woche fertiggestellt. IV-Suite Elektro-/Wasserinstallation bei 50%.',
    'Nächste Prioritäten: HBOT Starkstromleitung fertigstellen (W9), Kalt-Tauchbecken Wasserleitung + Abfluss (W9), Bau-Zwischeninspektion (W10), Sechrist-Techniker für Kammerinstallation (W12), Endabnahme & Übergabe (W13).',
    'Genehmigungen: Bauaufsichtsamt Frankfurt Baugenehmigung ✓, MEP-Plan ✓, HBOT NFPA-99 Ingenieursplan ✓. Ausstehend: NFPA-99 Brandschutzinspektion (W11), Gesundheitsamt-Inspektion (W12), Arbeitsschutz/Berufsgenossenschaft (W12), Brandschutz Branddirektion (W13), Nutzungsgenehmigung (W13).',
    'HBOT-Suite Anforderungen: NFPA-99 Health Care Facilities Code, 240V/30A Einzelleitung, spezielle Belüftung, O2-Sicherheitssysteme, Brandschutzsysteme, ABC-Trockenlöscher (Druckluft-Kammer, nicht reiner O2). Baumwoll-only Materialien in der Kammer.',
  ],
  Marketing: [
    'Launch-Strategie: Website-Livegang W17, Eröffnungsfeier W18, Digitale Kampagne ab W17. Budget: €62K (Digital €45K + Eröffnung €17K). Kanäle: SEO, Instagram, LinkedIn (Executives & Ärzte), PR & Presse, Influencer Health.',
    'Zielgruppe: Einkommensstarke Berufstätige & Führungskräfte (35-65), Frankfurt Innenstadt / Rhein-Main-Gebiet. Positionierung: Premium Longevity-Medizin, Facharzt-geführt, wissenschaftlich fundiert. Mitgliedschaftsmodell: Jahres-/Halbjahres-Premium.',
    'USPs für Kommunikation: HBOT Longevity-Protokoll (Telomerverlängerung +20%), Epigenetische Altersbestimmung (GrimAge/DunedinPACE — "Kennen Sie Ihr biologisches Alter?"), NAD+-IV-Therapie, 14 Diagnostik-Domänen + 12 Therapien, Digital Twin Dashboard, Physician-led Premium Experience.',
    'Content-Ideen: "Was ist biologisches Alter?" (SEO-Artikel), "HBOT & Telomere" (Instagram), "Longevity für Executives" (LinkedIn), Vorher/Nachher Biomarker-Stories, Dr. Sarah Kim Interview-Serie, Facility Tour Video für Eröffnung.',
  ],
};

function getFallbackResponse(role: Role, messages: ChatMessage[]): string {
  const lastMsg = messages[messages.length - 1]?.content?.toLowerCase() || '';
  const responses = FALLBACK_RESPONSES[role] || FALLBACK_RESPONSES.PM;

  // Keyword matching for intelligent responses
  if (lastMsg.includes('budget') || lastMsg.includes('kosten') || lastMsg.includes('geld') || lastMsg.includes('ausgabe') || lastMsg.includes('euro') || lastMsg.includes('finanz')) {
    return responses.find(r => r.includes('Budget') || r.includes('€') || r.includes('Kosten') || r.includes('ROI')) || responses[0];
  }
  if (lastMsg.includes('risiko') || lastMsg.includes('risiken') || lastMsg.includes('problem') || lastMsg.includes('gefahr')) {
    return responses.find(r => r.includes('Risik') || r.includes('kritisch') || r.includes('KRITISCH')) || responses[0];
  }
  if (lastMsg.includes('aufgabe') || lastMsg.includes('task') || lastMsg.includes('blockiert') || lastMsg.includes('todo')) {
    return responses.find(r => r.includes('Blockiert') || r.includes('Aufgabe') || r.includes('Priorität')) || responses[0];
  }
  if (lastMsg.includes('zeitplan') || lastMsg.includes('meilenstein') || lastMsg.includes('termin') || lastMsg.includes('wann') || lastMsg.includes('eröffnung')) {
    return responses.find(r => r.includes('Meilenstein') || r.includes('Woche') || r.includes('W18') || r.includes('Eröffnung')) || responses[0];
  }
  if (lastMsg.includes('hbot') || lastMsg.includes('druckkammer') || lastMsg.includes('hyperbar') || lastMsg.includes('sechrist')) {
    return responses.find(r => r.includes('HBOT') || r.includes('Sechrist') || r.includes('NFPA')) || responses[0];
  }
  if (lastMsg.includes('notfall') || lastMsg.includes('crash') || lastMsg.includes('aed') || lastMsg.includes('sicherheit')) {
    return responses.find(r => r.includes('NOTFALL') || r.includes('Crash') || r.includes('AED') || r.includes('Sicherheit')) || responses[0];
  }
  if (lastMsg.includes('labor') || lastMsg.includes('synlab') || lastMsg.includes('diagnostik') || lastMsg.includes('biomarker')) {
    return responses.find(r => r.includes('Synlab') || r.includes('Diagnostik') || r.includes('Lab') || r.includes('Biomarker')) || responses[0];
  }
  if (lastMsg.includes('therapie') || lastMsg.includes('behandlung') || lastMsg.includes('iv') || lastMsg.includes('nad') || lastMsg.includes('peptid')) {
    return responses.find(r => r.includes('Therapie') || r.includes('NAD') || r.includes('IV-Therapie') || r.includes('Peptide')) || responses[0];
  }
  if (lastMsg.includes('marketing') || lastMsg.includes('launch') || lastMsg.includes('kampagne') || lastMsg.includes('website') || lastMsg.includes('brand')) {
    return responses.find(r => r.includes('Launch') || r.includes('Marketing') || r.includes('Kampagne') || r.includes('USP')) || responses[0];
  }
  if (lastMsg.includes('bau') || lastMsg.includes('umbau') || lastMsg.includes('renovier') || lastMsg.includes('elektr') || lastMsg.includes('installation')) {
    return responses.find(r => r.includes('Bau') || r.includes('Umbau') || r.includes('Installation') || r.includes('fertig')) || responses[0];
  }
  if (lastMsg.includes('zulassung') || lastMsg.includes('lizenz') || lastMsg.includes('genehmigung') || lastMsg.includes('gesundheitsamt') || lastMsg.includes('dsgvo')) {
    return responses.find(r => r.includes('Zulassung') || r.includes('Genehmigung') || r.includes('DSGVO') || r.includes('Gesundheitsamt')) || responses[0];
  }
  if (lastMsg.includes('kontakt') || lastMsg.includes('partner') || lastMsg.includes('lieferant') || lastMsg.includes('apotheke')) {
    return responses.find(r => r.includes('Kontakt') || r.includes('Partner') || r.includes('Apotheke') || r.includes('Synlab')) || responses[0];
  }

  // Random response from pool
  return responses[Math.floor(Math.random() * responses.length)];
}

export async function POST(request: NextRequest) {
  try {
    const { messages, userRole } = (await request.json()) as {
      messages: ChatMessage[];
      userRole: Role;
    };

    if (!messages || !userRole) {
      return NextResponse.json(
        { error: 'Fehlende Parameter' },
        { status: 400 }
      );
    }

    // If Anthropic API key is available, use real AI
    if (hasAnthropicKey) {
      try {
        const Anthropic = (await import('@anthropic-ai/sdk')).default;
        const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

        const systemPrompt = CHAT_SYSTEM_PROMPTS[userRole] || CHAT_SYSTEM_PROMPTS.PM;

        const response = await anthropic.messages.create({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1024,
          system: systemPrompt,
          messages: messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        });

        const textContent = response.content.find((c) => c.type === 'text');
        const responseText = textContent ? textContent.text : 'Keine Antwort erhalten.';

        return NextResponse.json({ response: responseText });
      } catch (apiError) {
        console.error('Anthropic API error, falling back:', apiError);
        // Fall through to fallback
      }
    }

    // Fallback: smart pre-built responses with real project data
    const fallbackResponse = getFallbackResponse(userRole, messages);
    return NextResponse.json({ response: fallbackResponse });

  } catch (error: unknown) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Interner Serverfehler' },
      { status: 500 }
    );
  }
}
