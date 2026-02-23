import { NextRequest, NextResponse } from 'next/server';
import { CHAT_SYSTEM_PROMPTS } from '@/lib/constants';
import { Role, ChatMessage } from '@/lib/types';

const hasAnthropicKey = !!process.env.ANTHROPIC_API_KEY;

// Fallback responses when no API key is configured
const FALLBACK_RESPONSES: Record<string, string[]> = {
  PM: [
    'Das Projekt befindet sich in Woche 9 von 18. Phase 2 (Umbau & Beschaffung) ist aktiv mit 65% Fortschritt. Der Gesamtfortschritt liegt bei 37%.',
    'Aktuell gibt es 3 aktive Risiken: KV-Zulassungsverzögerung (kritisch), HBOT-Lieferverzögerung (hoch), und IT-Integrationsfehler (mittel). Die KV-Zulassung ist der kritischste Punkt.',
    'Das Budget ist zu 28% ausgeschöpft ($342K von $1.2M). Die größten Posten sind Bau ($180K) und Medizinische Geräte ($85K). Wir liegen im Rahmen des geplanten Budgets.',
    'Zwei Aufgaben sind blockiert: Die HBOT-Druckkammer TÜV-Abnahme wartet auf den Abschluss des Umbaus, und die KV-Zulassung benötigt die ärztliche Leitung.',
    'Die nächsten Meilensteine sind: KIS-System live (W9), HBOT-Suite fertiggestellt (W12), und Kassenärztliche Zulassung (W13). Der KIS Go-Live steht diese Woche an.',
  ],
  Investor: [
    'Der ROI-Zeitplan liegt bei 18-24 Monaten nach Eröffnung. Das aktuelle Budget von $1.2M ist zu 28% verbraucht und im Plan. Break-even wird für Q3 2027 erwartet.',
    'Die Hauptkostenpositionen sind: Bau/Renovierung ($400K Budget, $180K ausgegeben), Medizinische Geräte ($350K Budget, $85K ausgegeben), und Technologie ($120K Budget, $42K ausgegeben).',
    'Der Gesamtfortschritt liegt bei 37%. Phase 1 ist abgeschlossen (100%), Phase 2 läuft (65%). Die Eröffnung ist für Woche 18 geplant und wir liegen im Zeitplan.',
  ],
  MD: [
    'Die medizinische Infrastruktur ist im Aufbau. Die HBOT-Suite wird TÜV-konform eingerichtet (Phase 2), die KV-Zulassung ist für W12-13 geplant. Die BLS/ILS-Zertifizierungen starten in W14.',
    'Die ärztliche Leitung wurde in W5 eingestellt. Die nächsten klinischen Meilensteine sind: KIS-System Go-Live (W9), HBOT-Druckkammer TÜV-Abnahme (W11-13), und Kassenärztliche Zulassung (W13).',
  ],
  Contractor: [
    'Der Umbau in der Schiller Str. 31 läuft planmäßig. Aktuelle Phase: Umbau & Renovierung (W6-W13). Die HBOT-Suite wird TÜV-konform ausgebaut. Brandschutz & Baugenehmigung sind für W12-14 geplant.',
    'Die Tier-1-Gerätebestellung ist abgeschlossen. Der Architektenvertrag ist unterschrieben. Die nächsten Aufgaben: KIS & IT-Infrastruktur fertigstellen, HBOT-Druckkammer TÜV-Abnahme vorbereiten.',
  ],
  Marketing: [
    'Der Soft-Launch ist für W16-17 geplant, die Große Eröffnung für W18. Die Markenidentität ist fertiggestellt. Der aktuelle Fokus liegt auf der Vorbereitung der Launch-Kampagne.',
    'Die Ankündigungen werden über das MIS-Portal verteilt. Aktuelle Highlights: Mietvertrag unterschrieben, ärztliche Leitung eingestellt, Umbau im Zeitplan.',
  ],
};

function getFallbackResponse(role: Role, messages: ChatMessage[]): string {
  const lastMsg = messages[messages.length - 1]?.content?.toLowerCase() || '';
  const responses = FALLBACK_RESPONSES[role] || FALLBACK_RESPONSES.PM;

  // Try to match keywords
  if (lastMsg.includes('budget') || lastMsg.includes('kosten') || lastMsg.includes('geld')) {
    return responses.find(r => r.includes('Budget') || r.includes('Kosten') || r.includes('ROI')) || responses[0];
  }
  if (lastMsg.includes('risiko') || lastMsg.includes('risiken') || lastMsg.includes('problem')) {
    return responses.find(r => r.includes('Risik') || r.includes('kritisch')) || responses[0];
  }
  if (lastMsg.includes('aufgabe') || lastMsg.includes('task') || lastMsg.includes('blockiert')) {
    return responses.find(r => r.includes('blockiert') || r.includes('Aufgabe')) || responses[0];
  }
  if (lastMsg.includes('zeitplan') || lastMsg.includes('meilenstein') || lastMsg.includes('termin')) {
    return responses.find(r => r.includes('Meilenstein') || r.includes('Woche')) || responses[0];
  }

  // Random response
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

    // Fallback: smart pre-built responses
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
