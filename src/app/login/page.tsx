'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DEMO_USERS, ROLES } from '@/lib/constants';
import { Role } from '@/lib/types';

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    if (!selectedRole) return;
    setLoading(true);
    const user = DEMO_USERS[selectedRole as Role];
    const profile = { id: user.id, name: user.name, role: selectedRole as Role };
    localStorage.setItem('demo-profile', JSON.stringify(profile));
    document.cookie = `demo-profile=${selectedRole}; path=/; max-age=86400`;
    router.push('/dashboard');
  };

  return (
    <div id="login">
      <div className="login-wrap">
        <div className="login-logo" style={{ flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <img
            src="/logo.png"
            alt="Longevity Rooms"
            style={{
              width: '220px',
              height: 'auto',
              objectFit: 'contain',
              filter: 'brightness(0.85) contrast(1.1)',
            }}
          />
          <div className="login-brand-sub">Management-Informationssystem</div>
        </div>

        <div className="login-title">Willkommen</div>
        <div style={{ fontFamily: 'var(--f-head)', fontSize: '14px', color: 'var(--bronze)', letterSpacing: '1px', marginBottom: '16px', fontStyle: 'italic' }}>
          Regenerative Medizin · Schiller Str. 31, Frankfurt am Main
        </div>
        <div className="login-divider" />

        <div style={{ fontSize: '13px', color: 'var(--text-light)', marginBottom: '20px', lineHeight: 1.6 }}>
          Wählen Sie Ihre Rolle, um auf Ihr personalisiertes Portal zuzugreifen. Jede Rolle bietet maßgeschneiderte Daten und KI-Unterstützung.
        </div>

        <div className="role-grid">
          {Object.entries(DEMO_USERS).map(([key, u]) => {
            const roleInfo = ROLES.find(r => r.value === key);
            return (
              <button
                key={key}
                className={`rbtn${selectedRole === key ? ' sel' : ''}`}
                onClick={() => setSelectedRole(key)}
              >
                <div className="r-av" style={{ background: u.color }}>{u.avatar}</div>
                <div className="r-nm">{u.name}</div>
                <div className="r-ti">{u.title}</div>
              </button>
            );
          })}
        </div>

        <button
          className="login-btn"
          onClick={handleLogin}
          disabled={!selectedRole || loading}
        >
          {loading ? 'Bitte warten...' : 'Portal betreten \u00A0→'}
        </button>

        <div className="login-divider" style={{ marginTop: '18px' }} />
        <div className="login-note">Sicheres Portal · Demo-Umgebung · Keine echten Patientendaten</div>

        <div className="dripfy-badge">
          <span className="dripfy-dot" />
          Powered by <a href="https://dripfy.app" target="_blank" rel="noopener noreferrer">DRIPFY.APP</a>
          <span className="dripfy-dot" />
        </div>
      </div>
    </div>
  );
}
