import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, FileText, Menu, X, Terminal, Sun, Moon, Palette, Check } from 'lucide-react';
import { resumeData } from '../data/resumeData';

export default function Navbar({ onOpenTerminal, onOpenAdmin }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [hoveredSection, setHoveredSection] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  const themePresets = [
    { id: 'cyber', name: 'Cyber Neon', color1: '#00F0FF', color2: '#00FF9D', bg: '#030712' },
    { id: 'violet', name: 'Violet Dusk', color1: '#A855F7', color2: '#EC4899', bg: '#080414' },
    { id: 'emerald', name: 'Emerald Matrix', color1: '#34D399', color2: '#10B981', bg: '#02120C' },
    { id: 'ocean', name: 'Ocean Sapphire', color1: '#38BDF8', color2: '#2DD4BF', bg: '#030C1A' },
    { id: 'sunset', name: 'Sunset Amber', color1: '#FF9E00', color2: '#FF2E63', bg: '#12070B' },
    { id: 'light', name: 'Pristine Light', color1: '#4F46E5', color2: '#0284C7', bg: '#F8FAFC' }
  ];

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'cyber' : 'light'));
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);

      const sections = ['about', 'terminal', 'skills', 'projects', 'tools', 'network', 'experience', 'certifications', 'contact'];
      const scrollPos = window.scrollY + 180;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'terminal', label: 'VAPT Lab' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Audits' },
    { id: 'tools', label: 'Tools' },
    { id: 'network', label: 'CCNA' },
    { id: 'experience', label: 'Experience' },
    { id: 'certifications', label: 'Certs' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: scrolled ? '6px' : '12px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'min(96%, 1180px)',
        zIndex: 100,
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {/* Streamlined Motion-Blur Floating Pill Header Container */}
      <div
        style={{
          background: scrolled ? 'var(--nav-pill-scrolled-bg)' : 'var(--nav-pill-bg)',
          backdropFilter: 'blur(28px) saturate(180%)',
          WebkitBackdropFilter: 'blur(28px) saturate(180%)',
          border: scrolled ? '1px solid var(--nav-scrolled-border)' : '1px solid var(--nav-pill-border)',
          borderRadius: '9999px',
          boxShadow: scrolled
            ? '0 12px 32px -6px rgba(79, 70, 229, 0.16), 0 4px 12px rgba(15, 23, 42, 0.04)'
            : '0 6px 20px -4px rgba(15, 23, 42, 0.06)',
          padding: '5px 12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          boxSizing: 'border-box',
          overflow: 'hidden'
        }}
      >
        
        {/* Brand Logo - Single Line Clean Pill */}
        <motion.a
          href="#about"
          whileHover={{ scale: 1.04, y: -1 }}
          style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flexShrink: 0,
            whiteSpace: 'nowrap'
          }}
          className="brand-logo-link"
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '9999px',
              background: 'linear-gradient(135deg, #4F46E5 0%, #0891B2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              boxShadow: '0 3px 8px rgba(79, 70, 229, 0.3)',
              transition: 'transform 0.3s ease'
            }}
            className="logo-icon-pill"
          >
            <Shield size={17} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
            <span style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1, whiteSpace: 'nowrap' }}>
              Abhinav<span style={{ color: '#4F46E5' }}>.Sec</span>
            </span>
            <span className="brand-subtext" style={{ fontSize: '0.62rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 700, whiteSpace: 'nowrap', background: 'var(--bg-secondary)', padding: '2px 7px', borderRadius: '9999px' }}>
              VAPT & CCNA
            </span>
          </div>
        </motion.a>

        {/* Desktop Nav Items - Single Line Guarantees */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '2px',
            background: 'var(--nav-inner-bg)',
            padding: '3px 6px',
            borderRadius: '9999px',
            border: '1px solid var(--nav-pill-border)',
            whiteSpace: 'nowrap'
          }}
          className="desktop-nav"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            const isHovered = hoveredSection === item.id;

            return (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setActiveSection(item.id)}
                onMouseEnter={() => setHoveredSection(item.id)}
                onMouseLeave={() => setHoveredSection(null)}
                whileHover={{ y: -1, scale: 1.04 }}
                style={{
                  textDecoration: 'none',
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  padding: '5px 10px',
                  borderRadius: '9999px',
                  color: isActive ? '#4F46E5' : isHovered ? 'var(--text-primary)' : 'var(--text-muted)',
                  transition: 'color 0.2s ease',
                  position: 'relative',
                  display: 'inline-block',
                  zIndex: 1,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                {/* Active Sliding Pill Background */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'var(--bg-card-solid)',
                      borderRadius: '9999px',
                      boxShadow: '0 2px 8px rgba(79, 70, 229, 0.18), 0 1px 3px rgba(0, 0, 0, 0.05)',
                      border: '1px solid rgba(79, 70, 229, 0.25)',
                      zIndex: -1
                    }}
                  />
                )}

                {/* Hover Soft Glow Pill Background with Motion Blur */}
                {!isActive && isHovered && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'var(--bg-card)',
                      backdropFilter: 'blur(12px)',
                      borderRadius: '9999px',
                      zIndex: -1
                    }}
                  />
                )}

                <span style={{ position: 'relative', zIndex: 2, whiteSpace: 'nowrap' }}>{item.label}</span>
              </motion.a>
            );
          })}
        </nav>

        {/* Action Buttons Container */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0, whiteSpace: 'nowrap' }}>
          
          {/* Aesthetic Color Palette Switcher Trigger */}
          <div style={{ position: 'relative' }}>
            <motion.button
              onClick={() => setThemeMenuOpen(prev => !prev)}
              whileHover={{ scale: 1.08, y: -1 }}
              whileTap={{ scale: 0.92 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
                borderRadius: '9999px',
                background: 'rgba(0, 240, 255, 0.12)',
                color: 'var(--accent-cyan)',
                border: '1px solid var(--border-light)',
                cursor: 'pointer',
                boxShadow: '0 0 12px rgba(0, 240, 255, 0.2)',
                transition: 'all 0.25s ease'
              }}
              title="Select Aesthetic Color Theme"
            >
              <Palette size={15} />
            </motion.button>

            {/* Aesthetic Theme Selection Popover Menu */}
            <AnimatePresence>
              {themeMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.18 }}
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 12px)',
                    right: '-10px',
                    width: '270px',
                    background: 'var(--bg-card)',
                    backdropFilter: 'blur(24px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                    border: '1px solid var(--border-accent)',
                    borderRadius: '16px',
                    boxShadow: 'var(--shadow-lg)',
                    padding: '14px',
                    zIndex: 200
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', paddingBottom: '8px', borderBottom: '1px solid var(--border-light)' }}>
                    <span style={{ fontSize: '0.74rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Aesthetic Color Themes
                    </span>
                    <button
                      onClick={() => setThemeMenuOpen(false)}
                      style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                    >
                      <X size={14} />
                    </button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    {themePresets.map((preset) => {
                      const isSelected = theme === preset.id || (theme === 'dark' && preset.id === 'cyber');
                      return (
                        <button
                          key={preset.id}
                          onClick={() => {
                            setTheme(preset.id);
                            setThemeMenuOpen(false);
                          }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '8px 10px',
                            borderRadius: '10px',
                            background: isSelected ? 'rgba(0, 240, 255, 0.14)' : 'rgba(255, 255, 255, 0.03)',
                            border: isSelected ? '1px solid var(--accent-cyan)' : '1px solid var(--border-light)',
                            color: 'var(--text-primary)',
                            cursor: 'pointer',
                            fontSize: '0.74rem',
                            fontWeight: isSelected ? 700 : 500,
                            transition: 'all 0.2s ease',
                            textAlign: 'left'
                          }}
                        >
                          <div
                            style={{
                              width: '14px',
                              height: '14px',
                              borderRadius: '9999px',
                              background: `linear-gradient(135deg, ${preset.color1} 0%, ${preset.color2} 100%)`,
                              boxShadow: `0 0 6px ${preset.color1}90`,
                              flexShrink: 0
                            }}
                          />
                          <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{preset.name}</span>
                          {isSelected && <Check size={12} style={{ color: 'var(--accent-cyan)' }} />}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Light / Dark Quick Switcher */}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.08, y: -1 }}
            whileTap={{ scale: 0.92 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              borderRadius: '9999px',
              background: theme === 'light' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(99, 102, 241, 0.2)',
              color: theme === 'light' ? '#D97706' : '#818CF8',
              border: theme === 'light' ? '1px solid rgba(245, 158, 11, 0.35)' : '1px solid rgba(99, 102, 241, 0.4)',
              cursor: 'pointer',
              boxShadow: theme === 'light' ? '0 2px 6px rgba(245, 158, 11, 0.2)' : '0 0 10px rgba(99, 102, 241, 0.3)',
              transition: 'all 0.25s ease'
            }}
            title={`Toggle Theme Mode (${theme})`}
          >
            {theme === 'light' ? <Moon size={15} /> : <Sun size={15} />}
          </motion.button>

          {/* Admin Panel Trigger */}
          <motion.button
            onClick={onOpenAdmin}
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.96 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              borderRadius: '9999px',
              padding: '6px 12px',
              fontSize: '0.75rem',
              fontWeight: 700,
              background: 'rgba(79, 70, 229, 0.1)',
              color: '#4F46E5',
              border: '1px solid rgba(79, 70, 229, 0.25)',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(79, 70, 229, 0.12)',
              whiteSpace: 'nowrap'
            }}
            title="Open Security Admin Gateway"
          >
            <Shield size={13} />
            <span>Admin</span>
          </motion.button>

          {/* Download Resume / View PDF */}
          <motion.a
            href={resumeData.personalInfo.reportUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.96 }}
            className="btn-primary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              borderRadius: '9999px',
              padding: '6px 13px',
              fontSize: '0.75rem',
              fontWeight: 700,
              whiteSpace: 'nowrap'
            }}
          >
            <FileText size={13} />
            <span className="btn-resume-text">Resume</span>
          </motion.a>

          {/* Quick Terminal Trigger - END SIDE BUTTON */}
          <motion.button
            onClick={onOpenTerminal}
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.96 }}
            className="btn-cyber"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              borderRadius: '9999px',
              padding: '6px 13px',
              fontSize: '0.75rem',
              whiteSpace: 'nowrap'
            }}
            title="Launch Interactive Security Terminal"
          >
            <Terminal size={13} />
            <span className="btn-terminal-text" style={{ whiteSpace: 'nowrap' }}>Audit CLI</span>
          </motion.button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '34px',
              height: '34px',
              borderRadius: '9999px',
              border: '1px solid var(--border-light)',
              background: 'var(--bg-card-solid)',
              color: 'var(--text-primary)',
              cursor: 'pointer'
            }}
            className="mobile-hamburger"
          >
            {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            style={{
              marginTop: '8px',
              background: 'var(--bg-card-solid)',
              backdropFilter: 'blur(24px)',
              borderRadius: '20px',
              padding: '16px',
              border: '1px solid var(--border-light)',
              boxShadow: '0 20px 40px -10px rgba(15, 23, 42, 0.15)',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}
          >
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => {
                  setActiveSection(item.id);
                  setMobileMenuOpen(false);
                }}
                style={{
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  padding: '10px 14px',
                  borderRadius: '12px',
                  color: activeSection === item.id ? '#4F46E5' : 'var(--text-secondary)',
                  background: activeSection === item.id ? 'rgba(79, 70, 229, 0.08)' : 'transparent',
                  display: 'block',
                  whiteSpace: 'nowrap'
                }}
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 960px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-hamburger {
            display: none !important;
          }
        }
        @media (max-width: 540px) {
          .brand-subtext, .btn-resume-text {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
