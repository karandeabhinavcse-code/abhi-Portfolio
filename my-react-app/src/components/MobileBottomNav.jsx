import React from 'react';
import { User, Terminal, Code2, ShieldCheck, Mail } from 'lucide-react';
import { usePlatform } from '../context/PlatformContext';

export default function MobileBottomNav({ onOpenTerminal }) {
  const { isMobileViewport } = usePlatform();

  if (!isMobileViewport) return null;

  const navItems = [
    { id: 'about', label: 'About', icon: User, href: '#about' },
    { id: 'terminal', label: 'Terminal', icon: Terminal, action: onOpenTerminal },
    { id: 'skills', label: 'Skills', icon: Code2, href: '#skills' },
    { id: 'projects', label: 'Audits', icon: ShieldCheck, href: '#projects' },
    { id: 'contact', label: 'Contact', icon: Mail, href: '#contact' }
  ];

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '12px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 24px)',
        maxWidth: '480px',
        zIndex: 999,
        pointerEvents: 'auto'
      }}
    >
      {/* Sleek Ultra-Glass Floating Bottom Dock */}
      <div
        style={{
          background: 'rgba(15, 23, 42, 0.90)',
          backdropFilter: 'blur(28px) saturate(190%)',
          WebkitBackdropFilter: 'blur(28px) saturate(190%)',
          border: '1px solid rgba(255, 255, 255, 0.14)',
          borderRadius: '24px',
          boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.08)',
          padding: '8px 12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          gap: '4px'
        }}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isTerminal = item.id === 'terminal';

          return (
            <a
              key={item.id}
              href={item.href || '#'}
              onClick={(e) => {
                if (item.action) {
                  e.preventDefault();
                  item.action();
                }
              }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '3px',
                textDecoration: 'none',
                color: 'var(--text-primary)',
                padding: '4px 6px',
                borderRadius: '16px',
                flex: 1,
                minWidth: 0,
                WebkitTapHighlightColor: 'transparent'
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '12px',
                  background: isTerminal
                    ? 'linear-gradient(135deg, #4F46E5 0%, #0891B2 100%)'
                    : 'rgba(255, 255, 255, 0.05)',
                  border: isTerminal
                    ? '1px solid rgba(8, 145, 178, 0.5)'
                    : '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isTerminal ? '#FFFFFF' : 'var(--accent-cyan)',
                  boxShadow: isTerminal ? '0 4px 12px rgba(79, 70, 229, 0.35)' : 'none',
                  transition: 'transform 0.2s ease'
                }}
              >
                <Icon size={17} />
              </div>
              <span
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 600,
                  color: isTerminal ? '#00F0FF' : 'var(--text-secondary)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {item.label}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}

