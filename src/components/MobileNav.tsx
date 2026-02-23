'use client';

import Link from 'next/link';
import { Role } from '@/lib/types';
import { NAV_ITEMS, ROLE_NAV_ACCESS, PROJECT_RISKS } from '@/lib/constants';

interface MobileNavProps {
  role: Role;
  currentPath: string;
}

export default function MobileNav({ role, currentPath }: MobileNavProps) {
  const accessibleRoutes = ROLE_NAV_ACCESS[role] || [];
  const filteredNav = NAV_ITEMS.filter((item) => accessibleRoutes.includes(item.href)).slice(0, 5);
  const activeRiskCount = PROJECT_RISKS.filter((r) => r.status === 'active').length;

  return (
    <div id="mobile-nav">
      <div className="mob-nav-inner">
        {filteredNav.map((item) => {
          const isActive = currentPath === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`mob-nav-item${isActive ? ' active' : ''}`}
            >
              <span className="mob-nav-icon">{item.icon}</span>
              <span className="mob-nav-lbl">{item.label.split(' ')[0]}</span>
              {item.href === '/risks' && activeRiskCount > 0 && (
                <span className="mob-nav-badge">{activeRiskCount}</span>
              )}
            </Link>
          );
        })}
      </div>
      <div
        style={{
          textAlign: 'center',
          padding: '4px 0 0',
          fontSize: '9px',
          color: 'var(--text-muted)',
          fontFamily: 'var(--f-body)',
          letterSpacing: '1px',
          fontWeight: 700,
        }}
      >
        Powered by{' '}
        <a
          href="https://dripfy.app"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--bronze)', textDecoration: 'none' }}
        >
          DRIPFY.APP
        </a>
      </div>
    </div>
  );
}
