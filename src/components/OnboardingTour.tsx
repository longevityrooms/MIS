'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const STEPS = [
  { icon: 'logo', title: 'Willkommen im MIS-Portal', desc: 'Das Management-Informationssystem für Longevity Rooms Frankfurt. Hier verwalten Sie alle Aspekte des Projekts — von Aufgaben über Budget bis hin zu Dokumenten.' },
  { icon: '✦', title: 'Dashboard', desc: 'Ihre Übersichtsseite mit allen wichtigen KPIs: Projektfortschritt, Budget, offene Aufgaben und aktive Risiken. Klicken Sie auf jede Karte für Details.' },
  { icon: '▦', title: 'Projektzeitplan', desc: 'Der 18-Wochen-Gantt-Plan zeigt alle Phasen und Aufgaben. Im Bearbeitungsmodus können Sie Aufgaben hinzufügen und entfernen.' },
  { icon: '◎', title: 'Aufgaben & Risiken', desc: 'Verwalten Sie alle Projektaufgaben und das Risikoregister. Als PM können Sie Einträge hinzufügen, bearbeiten und löschen.' },
  { icon: '◈', title: 'Budget & Finanzen', desc: 'Überwachen Sie alle Budgetkategorien. Als PM können Sie Kategorien hinzufügen, Ausgaben aktualisieren und das Gesamtbudget anpassen.' },
  { icon: '◆', title: 'Ankündigungen & Dokumente', desc: 'Erstellen Sie Mitteilungen für alle Projektbeteiligten und verwalten Sie alle Projektdokumente an einem zentralen Ort.' },
  { icon: '▤', title: 'Aktivitätslog', desc: 'Alle Änderungen werden automatisch protokolliert. Der PM kann jede Aktion nachverfolgen — wer hat was, wann geändert.' },
  { icon: '●', title: 'KI-Assistent', desc: 'Auf der rechten Seite (oder per Knopf am unteren Rand auf Mobilgeräten) finden Sie den rollenspezifischen KI-Assistenten. Stellen Sie Fragen zum Projekt!' },
];

const LS_KEY = 'mis-onboarding-done';

export default function OnboardingTour() {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const done = localStorage.getItem(LS_KEY);
    if (!done) {
      // Delay slightly so the page renders first
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  const finish = () => {
    setVisible(false);
    localStorage.setItem(LS_KEY, 'true');
  };

  const next = () => {
    if (step < STEPS.length - 1) setStep(step + 1);
    else finish();
  };

  const prev = () => {
    if (step > 0) setStep(step - 1);
  };

  if (!visible) return null;

  const s = STEPS[step];

  return (
    <div className="onboarding-overlay" onClick={(e) => { if (e.target === e.currentTarget) finish(); }}>
      <div className="onboarding-card">
        <button className="onboarding-skip" onClick={finish}>Überspringen ✕</button>

        {s.icon === 'logo' ? (
          <div className="onboarding-logo">
            <Image src="/logo.png" alt="Longevity Rooms" width={180} height={70} style={{ objectFit: 'contain' }} priority />
          </div>
        ) : (
          <div className="onboarding-step-icon">
            <span style={{ color: '#fff', lineHeight: 1 }}>{s.icon}</span>
          </div>
        )}

        <div className="onboarding-step-title">{s.title}</div>
        <div className="onboarding-step-desc">{s.desc}</div>

        <div className="onboarding-dots">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`onboarding-dot ${i === step ? 'active' : ''}`}
              onClick={() => setStep(i)}
              style={{ cursor: 'pointer' }}
            />
          ))}
        </div>

        <div className="onboarding-nav">
          {step > 0 && (
            <button className="crud-btn crud-btn-cancel" onClick={prev}>← Zurück</button>
          )}
          <button className="crud-btn crud-btn-primary" onClick={next}>
            {step < STEPS.length - 1 ? 'Weiter →' : 'Loslegen!'}
          </button>
        </div>

        <div style={{ textAlign: 'center', marginTop: 12, fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.5px' }}>
          {step + 1} / {STEPS.length}
        </div>

        <div className="onboarding-dripfy">
          Powered by <a href="https://dripfy.app" target="_blank" rel="noopener noreferrer">DRIPFY.APP</a>
        </div>
      </div>
    </div>
  );
}
