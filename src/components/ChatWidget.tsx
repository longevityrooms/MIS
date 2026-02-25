'use client';

import { useState, useRef, useEffect } from 'react';
import { ChatMessage, Role } from '@/lib/types';
import { ROLES, DEMO_USERS } from '@/lib/constants';
import { CHAT_CHIPS } from '@/lib/chat-prompts';

interface ChatWidgetProps {
  role: Role;
}

export default function ChatWidget({ role }: ChatWidgetProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chips = CHAT_CHIPS[role] || [];
  const roleInfo = ROLES.find(r => r.value === role);
  const user = DEMO_USERS[role];
  const firstName = user?.name?.split(' ')[0] || '';

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text?: string) => {
    const msg = text || input.trim();
    if (!msg || loading) return;

    const userMessage: ChatMessage = { role: 'user', content: msg };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          userRole: role,
        }),
      });

      const data = await res.json();

      if (data.error) {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: 'Entschuldigung, es gab einen Fehler. Bitte versuchen Sie es erneut.' },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: data.response },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Verbindungsfehler. Bitte versuchen Sie es erneut.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div id="ai-header">
        <span className="ai-dot" />
        <span className="ai-title">KI-Assistent</span>
        <div className="ai-ctx">{roleInfo?.label || role} · {roleInfo?.access || 'Zugang'}</div>
      </div>

      <div id="ai-messages">
        {messages.length === 0 && (
          <div className="msg msg-ai">
            Willkommen, {firstName}. Ich bin Ihr KI-Assistent für Longevity Rooms Frankfurt — hier um Ihnen mit auf Ihre Rolle zugeschnittener Unterstützung zu helfen. Wie kann ich Ihnen heute helfen?
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`msg ${msg.role === 'user' ? 'msg-user' : 'msg-ai'}`}
          >
            {msg.content}
          </div>
        ))}

        {loading && (
          <div className="msg msg-ai" style={{ display: 'flex', gap: '4px', padding: '12px 16px' }}>
            <span className="chat-dot" /><span className="chat-dot" /><span className="chat-dot" />
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div id="ai-input-area">
        <div className="ai-wrap">
          <textarea
            className="ai-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Fragen Sie mich alles..."
            rows={1}
            disabled={loading}
          />
          <button
            className="ai-send"
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
          >
            ↑
          </button>
        </div>
        <div className="ai-chips">
          {chips.map((c) => (
            <button key={c} className="chip" onClick={() => sendMessage(c)}>{c}</button>
          ))}
        </div>
        <div style={{ marginTop: '10px', textAlign: 'center' }} className="dripfy-inline">
          Powered by <a href="https://dripfy.app" target="_blank" rel="noopener noreferrer" style={{ marginLeft: '4px' }}>DRIPFY.APP</a>
        </div>
      </div>
    </>
  );
}
