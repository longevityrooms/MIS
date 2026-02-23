'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Role } from '@/lib/types';
import { NAV_ITEMS, ROLE_NAV_ACCESS, PROJECT_RISKS } from '@/lib/constants';

interface SidebarProps {
  role: Role;
  currentPath: string;
}

export default function Sidebar({ role, currentPath }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const accessibleRoutes = ROLE_NAV_ACCESS[role] || [];
  const filteredNav = NAV_ITEMS.filter((item) => accessibleRoutes.includes(item.href));
  const activeRiskCount = PROJECT_RISKS.filter((r) => r.status === 'active').length;

  return (
    <div
      id="sidebar"
      className={isOpen ? 'open' : ''}
      style={{ width: isOpen ? 220 : 52 }}
    >
      {/* Toggle button */}
      <button
        id="sb-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Sidebar schließen' : 'Sidebar öffnen'}
      >
        {isOpen ? '\u2715' : '\u2630'}
      </button>

      {/* Navigation section */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        {isOpen && <div className="nav-section-lbl">Navigation</div>}

        <nav>
          {filteredNav.map((item) => {
            const isActive = currentPath === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-item${isActive ? ' active' : ''}`}
              >
                <span className="nav-icon">{item.icon}</span>
                {isOpen && <span className="nav-lbl">{item.label}</span>}
                {isOpen && item.href === '/risks' && activeRiskCount > 0 && (
                  <span className="nav-badge">{activeRiskCount}</span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer */}
      <div className="dripfy-footer">
        {isOpen ? (
          <>
            Powered by<br />
            <a href="https://dripfy.app" target="_blank" rel="noopener noreferrer">
              DRIPFY.APP
            </a>
          </>
        ) : (
          <a href="https://dripfy.app" target="_blank" rel="noopener noreferrer" title="DRIPFY.APP">
            D
          </a>
        )}
      </div>
    </div>
  );
}
