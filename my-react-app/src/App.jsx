import { useState } from 'react';
import CyberCanvas from './components/CyberCanvas';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import VaptTerminal from './components/VaptTerminal';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import SecurityToolsSection from './components/SecurityToolsSection';
import CyberNewsSection from './components/CyberNewsSection';
import UploadSection from './components/UploadSection';
import NetworkVisualizer from './components/NetworkVisualizer';
import ExperienceSection from './components/ExperienceSection';
import CertificationsSection from './components/CertificationsSection';
import ReportModal from './components/ReportModal';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
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

        {/* Glassmorphism Header Navbar */}
        <Navbar
          onOpenTerminal={() => setTerminalModalOpen(true)}
          isAdminAuthenticated={isAdminAuthenticated}
          adminEmail={adminEmail}
          onOpenLogin={() => setLoginModalOpen(true)}
          onOpenDashboard={() => setDashboardModalOpen(true)}
          onLogout={handleLogout}
        />

        {/* Main Content Area */}
        <main>
          {/* Hero Section */}
          <Hero onOpenTerminal={() => setTerminalModalOpen(true)} />

          {/* Technical Skills & OWASP Matrix */}
          <SkillsSection />

          {/* Audit Projects & Penetration Testing Reports */}
          <ProjectsSection
            onSelectPoC={(proj) => setSelectedPoCProject(proj)}
            refreshTrigger={refreshTrigger}
          />

          {/* Custom Hacking & Security Tools Section */}
          <SecurityToolsSection refreshTrigger={refreshTrigger} />

          {/* Daily Cyber Security & Hacking News Feed */}
          <CyberNewsSection refreshTrigger={refreshTrigger} />

          {/* Open Upload Project, Tool & Resume Visitor Hub */}
          <UploadSection
            onUploadSuccess={() => setRefreshTrigger(prev => prev + 1)}
            isAdminAuthenticated={isAdminAuthenticated}
            adminEmail={adminEmail}
            onOpenLogin={() => setLoginModalOpen(true)}
            onOpenDashboard={() => setDashboardModalOpen(true)}
            onLogout={handleLogout}
          />

          {/* CCNA Network Protocol Topology Simulator */}
          <NetworkVisualizer />

          {/* VAPT Experience Timeline & BCA Education */}
          <ExperienceSection />

          {/* Verified Certifications & Credentials */}
          <CertificationsSection />

          {/* Direct Contact & PDF Audit Link */}
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />

        {/* Mobile Bottom Dock / Navigation Rail */}
        <MobileBottomNav onOpenTerminal={() => setTerminalModalOpen(true)} />

        {/* Terminal Modal Triggered from Header/Hero/BottomNav */}
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

        {/* Admin Submissions Dashboard Modal */}
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
