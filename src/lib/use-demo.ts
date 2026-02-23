'use client';

export function isDemoMode(): boolean {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem('demo-profile');
}
