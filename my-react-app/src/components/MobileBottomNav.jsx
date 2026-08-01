import React from 'react';
import { motion } from 'framer-motion';
import { User, Terminal, Code2, ShieldCheck, Mail } from 'lucide-react';
import { usePlatform } from '../context/PlatformContext';

export default function MobileBottomNav({ onOpenTerminal }) {
  const { activePlatform, isMobileViewport } = usePlatform();

  if (!isMobileViewport) return null;

  const navItems = [
    { id: 'about', label: 'About', icon: User },
    { id: 'terminal', label: 'Terminal', icon: Terminal, action: onOpenTerminal },
    { id: 'skills', label: 'Skills', icon: Code2 },
    { id: 'projects', label: 'Audits', icon: ShieldCheck },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  if (activePlatform === 'ios') {
    return (
      <div
        style={{
          position: 'fixed',
          bottom: '12px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'calc(100% - 24px)',
          maxWidth: '500px',
          zIndex: 999,
          pointerEvents: 'auto'
        }}
      >
        {/* iOS Glass Floating Bottom Dock */}
        <div
          style={{
            background: 'rgba(15, 23, 42, 0.88)',
            backdropFilter: 'blur(28px) saturate(190%)',
            WebkitBackdropFilter: 'blur(28px) saturate(190%)',
            border: '1px solid rgba(255, 255, 255, 0.16)',
            borderRadius: '26px',
            boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.1)',
            padding: '8px 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            gap: '4px'
          }}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
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
                  padding: '6px 8px',
                  borderRadius: '16px',
                  minWidth: '54px',
                  WebkitTapHighlightColor: 'transparent'
                }}
              >
                <div
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    background: item.id === 'terminal' ? 'linear-gradient(135deg, #4F46E5 0%, #00F0FF 100%)' : 'rgba(255, 255, 255, 0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: item.id === 'terminal' ? '#FFFFFF' : 'var(--accent-cyan)',
                    boxShadow: item.id === 'terminal' ? '0 4px 12px rgba(79, 70, 229, 0.4)' : 'none'
                  }}
                >
                  <Icon size={16} />
                </div>
                <span style={{ fontSize: '0.65rem', fontWeight: 600, fontFamily: '-apple-system, sans-serif' }}>
                  {item.label}
                </span>
              </a>
            );
          })}
        </div>

        {/* iOS Home Bar Indicator */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '6px' }}>
          <div style={{ width: '120px', height: '4px', background: 'rgba(255, 255, 255, 0.4)', borderRadius: '9999px' }} />
        </div>
      </div>
    );
  }

  // Android Material Design 3 Bottom Navigation Bar with FAB
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        zIndex: 999,
        pointerEvents: 'auto'
      }}
    >
      {/* Material Floating Action Button (FAB) */}
      <div style={{ position: 'absolute', top: '-28px', right: '20px', zIndex: 1000 }}>
        <motion.button
          onClick={onOpenTerminal}
          whileTap={{ scale: 0.9 }}
          style={{
            width: '54px',
            height: '54px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #00FF9D 0%, #00F0FF 100%)',
            border: 'none',
            color: '#050811',
            boxShadow: '0 8px 24px rgba(0, 255, 157, 0.4), 0 0 16px rgba(0, 240, 255, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
          title="Launch VAPT Terminal"
        >
          <Terminal size={22} />
        </motion.button>
      </div>

      {/* Material 3 Bottom Nav Bar */}
      <div
        style={{
          background: '#111827',
          borderTop: '1px solid rgba(56, 189, 248, 0.2)',
          padding: '8px 12px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          boxShadow: '0 -10px 30px rgba(0, 0, 0, 0.6)'
        }}
      >
        {navItems.filter(item => item.id !== 'terminal').map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                textDecoration: 'none',
                color: 'var(--text-primary)',
                minWidth: '60px'
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '28px',
                  borderRadius: '14px',
                  background: 'rgba(56, 189, 248, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-cyan)'
                }}
              >
                <Icon size={16} />
              </div>
              <span style={{ fontSize: '0.7rem', fontWeight: 600, fontFamily: '"Roboto", sans-serif' }}>
                {item.label}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
