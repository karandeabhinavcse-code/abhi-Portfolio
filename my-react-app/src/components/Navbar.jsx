import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, FileText, Menu, X, Sun, Moon, KeyRound, ShieldCheck, LogOut } from 'lucide-react';
import { resumeData } from '../data/resumeData';

export default function Navbar({ onOpenTerminal, isAdminAuthenticated, adminEmail, onOpenLogin, onOpenDashboard, onLogout }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [hoveredSection, setHoveredSection] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);

      const sections = ['hero', 'about', 'skills', 'projects', 'certifications', 'education', 'contact'];
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
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: scrolled ? '6px' : '12px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'min(98%, 1280px)',
        zIndex: 100,
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <div
        style={{
          background: scrolled ? 'var(--nav-pill-scrolled-bg)' : 'var(--nav-pill-bg)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          border: scrolled ? '1px solid var(--nav-scrolled-border)' : '1px solid var(--nav-pill-border)',
          borderRadius: '9999px',
          boxShadow: scrolled
            ? '0 12px 32px -6px rgba(79, 70, 229, 0.16), 0 4px 12px rgba(15, 23, 42, 0.04)'
            : '0 6px 20px -4px rgba(15, 23, 42, 0.06)',
          padding: '6px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          boxSizing: 'border-box'
        }}
      >

        {/* Brand Logo */}
        <motion.a
          href="#hero"
          whileHover={{ scale: 1.03 }}
          style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flexShrink: 0
          }}
        >
          <div
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '9999px',
              background: 'linear-gradient(135deg, #4F46E5 0%, #0891B2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              boxShadow: '0 3px 10px rgba(79, 70, 229, 0.35)'
            }}
          >
            <Shield size={17} />
          </div>
          <span style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-primary)', lineHeight: 1 }}>
            Abhinav<span style={{ color: '#4F46E5' }}>.Sec</span>
          </span>
        </motion.a>

        {/* Desktop Nav Links */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '4px',
            background: 'var(--nav-inner-bg)',
            padding: '4px 6px',
            borderRadius: '9999px',
            border: '1px solid var(--nav-pill-border)'
          }}
          className="desktop-nav"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            const isHovered = hoveredSection === item.id;

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setActiveSection(item.id)}
                onMouseEnter={() => setHoveredSection(item.id)}
                onMouseLeave={() => setHoveredSection(null)}
                style={{
                  textDecoration: 'none',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  color: isActive ? 'var(--accent-cyan)' : isHovered ? 'var(--text-primary)' : 'var(--text-muted)',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                  display: 'inline-block',
                  zIndex: 1,
                  cursor: 'pointer'
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'var(--bg-card-solid)',
                      borderRadius: '9999px',
                      boxShadow: '0 2px 8px rgba(79, 70, 229, 0.18)',
                      border: '1px solid rgba(79, 70, 229, 0.25)',
                      zIndex: -1
                    }}
                  />
                )}

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
                      borderRadius: '9999px',
                      zIndex: -1
                    }}
                  />
                )}

                <span style={{ position: 'relative', zIndex: 2 }}>{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>

          {/* Light / Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '34px',
              height: '34px',
              borderRadius: '9999px',
              background: theme === 'dark' ? 'rgba(99, 102, 241, 0.15)' : 'rgba(245, 158, 11, 0.15)',
              color: theme === 'dark' ? '#818CF8' : '#D97706',
              border: theme === 'dark' ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid rgba(245, 158, 11, 0.3)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Theme`}
          >
            {theme === 'light' ? <Moon size={15} /> : <Sun size={15} />}
          </button>

          {/* Download Resume Link */}
          <a
            href={resumeData.personalInfo.reportUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary nav-resume-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              borderRadius: '9999px',
              padding: '6px 14px',
              fontSize: '0.8rem',
              fontWeight: 700,
              textDecoration: 'none'
            }}
          >
            <FileText size={14} />
            <span>Resume</span>
          </a>

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

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
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
              gap: '4px'
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
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  padding: '10px 14px',
                  borderRadius: '12px',
                  color: activeSection === item.id ? '#4F46E5' : 'var(--text-secondary)',
                  background: activeSection === item.id ? 'rgba(79, 70, 229, 0.08)' : 'transparent',
                  display: 'block'
                }}
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 900px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-hamburger {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
