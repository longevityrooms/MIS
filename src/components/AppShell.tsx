'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Profile } from '@/lib/types';
import Header from './Header';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import ChatWidget from './ChatWidget';

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();

  useEffect(() => {
    async function loadProfile() {
      // Check for demo profile first
      const demoStr = localStorage.getItem('demo-profile');
      if (demoStr) {
        try {
          setProfile(JSON.parse(demoStr) as Profile);
          setLoading(false);
          return;
        } catch { /* fall through to supabase */ }
      }

      // Fall back to Supabase auth
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
        return;
      }

      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (data) {
        setProfile(data as Profile);
      }
      setLoading(false);
    }

    loadProfile();
  }, [router, supabase]);

  const handleLogout = async () => {
    localStorage.removeItem('demo-profile');
    document.cookie = 'demo-profile=; path=/; max-age=0';
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading) {
    return (
      <div id="app" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              border: '2px solid rgba(184,115,51,0.3)',
              borderTopColor: 'var(--bronze)',
              animation: 'pulse 1s linear infinite',
              margin: '0 auto 16px',
            }}
          />
          <p style={{ color: 'var(--text-light)', fontSize: '13px' }}>Laden...</p>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <>
      {/* Fixed background */}
      <div id="bg" />

      {/* App layout */}
      <div id="app">
        {/* Header / Topbar */}
        <Header
          userName={profile.name}
          userRole={profile.role}
          currentPath={pathname}
          onLogout={handleLogout}
        />

        {/* Body: Sidebar + Main + AI Panel */}
        <div id="body">
          <Sidebar role={profile.role} currentPath={pathname} />

          <div id="main">
            {children}
          </div>

          {/* AI Chat Panel */}
          <div id="ai-panel">
            <ChatWidget role={profile.role} />
          </div>
        </div>

        {/* Mobile bottom navigation */}
        <MobileNav role={profile.role} currentPath={pathname} />
      </div>
    </>
  );
}
