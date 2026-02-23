'use client';

import { ROLES, DEMO_USERS, NAV_ITEMS } from '@/lib/constants';
import { Role } from '@/lib/types';

interface HeaderProps {
  userName: string;
  userRole: Role;
  currentPath: string;
  onLogout: () => void;
}

export default function Header({ userName, userRole, currentPath, onLogout }: HeaderProps) {
  // Find current page title from NAV_ITEMS
  const currentNav = NAV_ITEMS.find((item) => item.href === currentPath);
  const pageTitle = currentNav?.label || 'Dashboard';

  // Get role color from ROLES constant
  const roleInfo = ROLES.find((r) => r.value === userRole);
  const roleColor = roleInfo?.badge || '#2F4F4F';

  // Get role label
  const roleLabel = roleInfo?.label || userRole;

  // User avatar initial
  const avatarInitial = userName?.charAt(0) || '?';

  return (
    <div id="topbar">
      {/* Left side: Logo + brand + divider + page title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: 1, overflow: 'hidden' }}>
        <div className="top-logo" style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img
            src="/logo.png"
            alt="Longevity Rooms"
            style={{
              height: '32px',
              width: 'auto',
              objectFit: 'contain',
              filter: 'brightness(0.85) contrast(1.1)',
            }}
          />
        </div>

        <div style={{ width: '1px', height: '28px', background: 'rgba(184,115,51,0.2)', flexShrink: 0 }} />

        <div className="top-center" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0 }}>
          {pageTitle}
        </div>
      </div>

      {/* Right side: Week pill + status pill + user info + logout */}
      <div className="top-right" style={{ flexShrink: 0 }}>
        <span className="wk-pill">Woche 9 / 18</span>
        <span className="rag-pill">● Im Plan</span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div className="u-av-sm" style={{ background: roleColor }}>
            {avatarInitial}
          </div>
          <div>
            <div className="u-name-sm">{userName}</div>
            <div
              className="u-role-pill"
              style={{
                background: `${roleColor}18`,
                color: roleColor,
                border: `1px solid ${roleColor}33`,
              }}
            >
              {roleLabel}
            </div>
          </div>
        </div>

        <button className="logout-btn" onClick={onLogout}>
          Abmelden
        </button>
      </div>
    </div>
  );
}
