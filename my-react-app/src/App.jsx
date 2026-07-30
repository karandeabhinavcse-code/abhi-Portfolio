import { useState } from 'react';
import CyberCanvas from './components/CyberCanvas';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import VaptTerminal from './components/VaptTerminal';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import SecurityToolsSection from './components/SecurityToolsSection';
import NetworkVisualizer from './components/NetworkVisualizer';
import ExperienceSection from './components/ExperienceSection';
import CertificationsSection from './components/CertificationsSection';
import ReportModal from './components/ReportModal';
import AdminPanel from './components/AdminPanel';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
  const [terminalModalOpen, setTerminalModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [selectedPoCProject, setSelectedPoCProject] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Background Interactive Cyber Canvas */}
      <CyberCanvas />

      {/* Glassmorphism Header Navbar */}
      <Navbar
        onOpenTerminal={() => setTerminalModalOpen(true)}
        onOpenAdmin={() => setAdminModalOpen(true)}
      />

      {/* Main Content Area */}
      <main>
        {/* Hero Section */}
        <Hero onOpenTerminal={() => setTerminalModalOpen(true)} />

        {/* Embedded Interactive VAPT Security CLI Console */}
        <VaptTerminal />

        {/* Technical Skills & OWASP Matrix */}
        <SkillsSection />

        {/* Audit Projects & Penetration Testing Reports */}
        <ProjectsSection
          onSelectPoC={(proj) => setSelectedPoCProject(proj)}
          refreshTrigger={refreshTrigger}
        />

        {/* Custom Hacking & Security Tools Section */}
        <SecurityToolsSection refreshTrigger={refreshTrigger} />

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

      {/* Terminal Modal Triggered from Header/Hero */}
      <VaptTerminal
        isModal={true}
        isOpen={terminalModalOpen}
        onClose={() => setTerminalModalOpen(false)}
      />

      {/* Full-Stack MongoDB Atlas Admin Panel */}
      <AdminPanel
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        onProjectUpdated={() => setRefreshTrigger(prev => prev + 1)}
      />

      {/* PoC Payload Inspector Modal */}
      {selectedPoCProject && (
        <ReportModal
          project={selectedPoCProject}
          onClose={() => setSelectedPoCProject(null)}
        />
      )}
    </div>
  );
}
