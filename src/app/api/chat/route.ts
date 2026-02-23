import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { CHAT_SYSTEM_PROMPTS } from '@/lib/constants';
import { Role, ChatMessage } from '@/lib/types';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

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

    const systemPrompt =
      CHAT_SYSTEM_PROMPTS[userRole] || CHAT_SYSTEM_PROMPTS.PM;

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
  } catch (error: unknown) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Interner Serverfehler' },
      { status: 500 }
    );
  }
}
