'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Profile } from '@/lib/types';
import Header from './Header';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import ChatWidget from './ChatWidget';
import { DataProvider } from '@/lib/DataContext';
import OnboardingTour from './OnboardingTour';

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [showMobileChat, setShowMobileChat] = useState(false);
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

  // Close mobile chat on route change
  useEffect(() => {
    setShowMobileChat(false);
  }, [pathname]);

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
          <div className="app-spinner" />
          <p style={{ color: 'var(--text-light)', fontSize: '13px' }}>Laden...</p>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  const currentUser = { id: profile.id, name: profile.name, role: profile.role };

  return (
    <DataProvider user={currentUser}>
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

          {/* Desktop AI Chat Panel */}
          <div id="ai-panel">
            <ChatWidget role={profile.role} />
          </div>
        </div>

        {/* Mobile bottom navigation */}
        <MobileNav role={profile.role} currentPath={pathname} />

        {/* Mobile AI Chat FAB button */}
        <button
          className="mob-ai-fab"
          onClick={() => setShowMobileChat(true)}
          aria-label="KI-Assistent öffnen"
        >
          <span style={{ lineHeight: 1 }}>&#9679;</span>
          <div className="fab-badge" />
        </button>

        {/* Mobile AI Chat Overlay */}
        <div
          className={`mob-ai-overlay${showMobileChat ? ' open' : ''}`}
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowMobileChat(false);
          }}
        >
          <div className="mob-ai-panel">
            <div className="mob-ai-handle" />
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '4px 18px 10px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="ai-dot" />
                <span className="ai-title">KI-Assistent</span>
              </div>
              <button onClick={() => setShowMobileChat(false)} className="mob-chat-close">
                Schließen
              </button>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <ChatWidget role={profile.role} />
            </div>
          </div>
        </div>

        {/* Onboarding Tour */}
        <OnboardingTour />
      </div>
    </DataProvider>
  );
}
