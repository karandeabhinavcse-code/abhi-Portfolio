import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, FileText, Menu, X, Sun, Moon, Upload, KeyRound, ShieldCheck, LogOut, Lock } from 'lucide-react';
import { resumeData } from '../data/resumeData';
import MobileStatusBar from './MobileStatusBar';
import { usePlatform } from '../context/PlatformContext';

export default function Navbar({ onOpenTerminal, isAdminAuthenticated, adminEmail, onOpenLogin, onOpenDashboard, onLogout }) {
  const { isMobileViewport } = usePlatform();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
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

      const sections = ['about', 'terminal', 'skills', 'projects', 'tools', 'upload', 'network', 'experience', 'certifications', 'contact'];
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
    { id: 'upload', label: 'Upload' },
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
        width: 'min(99%, 1280px)',
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
          padding: '4px 8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '6px',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          boxSizing: 'border-box'
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
            gap: '6px',
            flexShrink: 0,
            whiteSpace: 'nowrap'
          }}
          className="brand-logo-link"
        >
          <div
            style={{
              width: '30px',
              height: '30px',
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
            <Shield size={16} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}>
            <span style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--text-primary)', lineHeight: 1, whiteSpace: 'nowrap' }}>
              Abhinav<span style={{ color: '#4F46E5' }}>.Sec</span>
            </span>
          </div>
        </motion.a>

        {/* Desktop Nav Items - Single Line Guarantees */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '1px',
            background: 'var(--nav-inner-bg)',
            padding: '2px 4px',
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
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  padding: '4px 8px',
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', flexShrink: 0, whiteSpace: 'nowrap' }}>

          {/* Light / Dark Mode Theme Switcher */}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.08, y: -1 }}
            whileTap={{ scale: 0.92 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '30px',
              height: '30px',
              borderRadius: '9999px',
              background: theme === 'dark' ? 'rgba(99, 102, 241, 0.2)' : 'rgba(245, 158, 11, 0.15)',
              color: theme === 'dark' ? '#818CF8' : '#D97706',
              border: theme === 'dark' ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid rgba(245, 158, 11, 0.35)',
              cursor: 'pointer',
              boxShadow: theme === 'dark' ? '0 0 10px rgba(99, 102, 241, 0.3)' : '0 2px 6px rgba(245, 158, 11, 0.2)',
              transition: 'all 0.25s ease'
            }}
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Theme`}
          >
            {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
          </motion.button>

          {/* Public Visitor Upload Trigger */}
          <motion.a
            href="#upload"
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.96 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              borderRadius: '9999px',
              padding: '5px 11px',
              fontSize: '0.74rem',
              fontWeight: 700,
              background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.15) 0%, rgba(8, 145, 178, 0.15) 100%)',
              color: 'var(--accent-primary)',
              border: '1px solid rgba(79, 70, 229, 0.3)',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(79, 70, 229, 0.15)',
              textDecoration: 'none',
              whiteSpace: 'nowrap'
            }}
            title="Upload Your Tool, Project, or Resume"
          >
            <Upload size={12} />
            <span>Upload (+)</span>
          </motion.a>

          {/* Admin Status & Dashboard Trigger Button */}
          {isAdminAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <button
                onClick={onOpenDashboard}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  borderRadius: '9999px',
                  padding: '4px 9px',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  background: 'rgba(16, 185, 129, 0.15)',
                  color: '#10B981',
                  border: '1px solid rgba(16, 185, 129, 0.4)',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer'
                }}
                title={`Open Admin Dashboard (${adminEmail})`}
              >
                <ShieldCheck size={12} />
                <span>Admin</span>
              </button>
              <button
                onClick={onLogout}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: '3px',
                  display: 'flex',
                  alignItems: 'center'
                }}
                title="Log Out of Admin"
              >
                <LogOut size={12} />
              </button>
            </div>
          ) : (
            <motion.button
              onClick={onOpenLogin}
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.96 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                borderRadius: '9999px',
                padding: '5px 11px',
                fontSize: '0.74rem',
                fontWeight: 700,
                background: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-light)',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
              title="Admin Login to View & Manage Submissions"
            >
              <KeyRound size={12} style={{ color: 'var(--accent-primary)' }} />
              <span>Login</span>
            </motion.button>
          )}

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
