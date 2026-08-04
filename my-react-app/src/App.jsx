import { useState } from 'react';
import CyberCanvas from './components/CyberCanvas';
import Navbar from './components/Navbar';
import ScrollMotionController from './components/ScrollMotionController';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import CertificationsSection from './components/CertificationsSection';
import EducationSection from './components/EducationSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import VaptTerminal from './components/VaptTerminal';
import ReportModal from './components/ReportModal';
import AdminLoginModal from './components/AdminLoginModal';
import AdminDashboardModal from './components/AdminDashboardModal';
import MobileBottomNav from './components/MobileBottomNav';
import { PlatformProvider } from './context/PlatformContext';

export default function App() {
  const [terminalModalOpen, setTerminalModalOpen] = useState(false);
  const [selectedPoCProject, setSelectedPoCProject] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return sessionStorage.getItem('admin_authenticated') === 'true';
  });
  const [adminEmail, setAdminEmail] = useState(() => {
    return sessionStorage.getItem('admin_email') || '';
  });
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [dashboardModalOpen, setDashboardModalOpen] = useState(false);

  const handleLoginSuccess = (email) => {
    setIsAdminAuthenticated(true);
    setAdminEmail(email);
    setDashboardModalOpen(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_authenticated');
    sessionStorage.removeItem('admin_email');
    setIsAdminAuthenticated(false);
    setAdminEmail('');
    setDashboardModalOpen(false);
  };

  return (
    <PlatformProvider>
      <div style={{ position: 'relative', minHeight: '100vh', background: 'var(--bg-primary)' }}>
        {/* Background Interactive Cyber Canvas */}
        <CyberCanvas />

        {/* Scroll Motion & Parallax Controller */}
        <ScrollMotionController />

        {/* Floating Navbar */}
        <Navbar
          onOpenTerminal={() => setTerminalModalOpen(true)}
          isAdminAuthenticated={isAdminAuthenticated}
          adminEmail={adminEmail}
          onOpenLogin={() => setLoginModalOpen(true)}
          onOpenDashboard={() => setDashboardModalOpen(true)}
          onLogout={handleLogout}
        />

        {/* Main Content Area in exact requested order */}
        <main>
          {/* 1. Hero Section */}
          <Hero onOpenTerminal={() => setTerminalModalOpen(true)} />

          {/* 2. About Me Section */}
          <AboutSection />

          {/* 3. Skills Matrix */}
          <SkillsSection />

          {/* 4. Projects Portfolio (Placed before Certs & Education as requested) */}
          <ProjectsSection
            onSelectPoC={(proj) => setSelectedPoCProject(proj)}
            refreshTrigger={refreshTrigger}
          />

          {/* 5. Certifications Section */}
          <CertificationsSection />

          {/* 6. Education & Currently Learning */}
          <EducationSection />

          {/* 7. Contact Section */}
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />

        {/* Mobile Bottom Navigation Bar */}
        <MobileBottomNav onOpenTerminal={() => setTerminalModalOpen(true)} />

        {/* Terminal Modal Triggered from Hero / BottomNav */}
        <VaptTerminal
          isModal={true}
          isOpen={terminalModalOpen}
          onClose={() => setTerminalModalOpen(false)}
        />

        {/* PoC Payload Inspector Modal */}
        {selectedPoCProject && (
          <ReportModal
            project={selectedPoCProject}
            onClose={() => setSelectedPoCProject(null)}
          />
        )}

        {/* Admin Login Modal */}
        <AdminLoginModal
          isOpen={loginModalOpen}
          onClose={() => setLoginModalOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />

        {/* Admin Dashboard Modal */}
        <AdminDashboardModal
          isOpen={dashboardModalOpen}
          onClose={() => setDashboardModalOpen(false)}
          adminEmail={adminEmail}
          onLogout={handleLogout}
        />
      </div>
    </PlatformProvider>
  );
}
