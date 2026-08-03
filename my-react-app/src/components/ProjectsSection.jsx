import { useState, useEffect, useCallback } from 'react';
import { ShieldAlert } from 'lucide-react';
import { resumeData } from '../data/resumeData';
import ProjectCard from './ProjectCard';

export default function ProjectsSection({ onSelectPoC, refreshTrigger }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [projectsList, setProjectsList] = useState(resumeData.projects);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/projects`);
      const data = await res.json();
      if (data.success && data.projects && data.projects.length > 0) {
        const officialProjects = data.projects.filter(p => !p.isUserUpload);
        setProjectsList(officialProjects.length > 0 ? officialProjects : resumeData.projects);
        return;
      }
    } catch (e) {
      console.log('Using default resume projects:', e);
    }
    setProjectsList(resumeData.projects);
  }, [API_URL]);

  useEffect(() => {
    fetchProjects();
  }, [refreshTrigger, fetchProjects]);

  const filterTabs = [
    { id: 'All', label: 'All' },
    { id: 'Web VAPT', label: 'Web VAPT', matches: ['web application vapt', 'web vapt'] },
    { id: 'Network VAPT', label: 'Network VAPT', matches: ['network vulnerability assessment', 'network vapt'] },
    { id: 'Android VAPT', label: 'Android VAPT', matches: ['android application security assessment', 'android vapt'] },
    { id: 'Python', label: 'Python', matches: ['python security project', 'python'] }
  ];

  const filteredProjects = selectedCategory === 'All'
    ? projectsList
    : projectsList.filter(p => {
        const typeStr = (p.type || p.category || '').toLowerCase();
        const activeTab = filterTabs.find(t => t.id === selectedCategory);
        if (!activeTab || !activeTab.matches) return true;
        return activeTab.matches.some(m => typeStr.includes(m));
      });

  return (
    <section id="projects" style={{ padding: '70px 24px', maxWidth: '1280px', margin: '0 auto' }}>
      
      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <div className="section-connector-line" />
        <span className="section-number-tag">
          03 // SECURITY PROJECTS & AUDITS
        </span>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>
          Projects & <span className="text-gradient">Security Audits</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '650px', margin: '10px auto 0', fontSize: '1.05rem' }}>
          Practical vulnerability assessments, network reconnaissance labs, Android security audits, and Python security utilities conducted in controlled testing environments.
        </p>
      </div>

      {/* Short Filter Tabs Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          overflowX: 'auto',
          paddingBottom: '8px',
          marginBottom: '32px',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedCategory(tab.id)}
            style={{
              padding: '8px 18px',
              borderRadius: '9999px',
              fontSize: '0.85rem',
              fontWeight: 700,
              fontFamily: 'var(--font-mono)',
              border: selectedCategory === tab.id ? '1px solid var(--accent-cyan)' : '1px solid var(--border-light)',
              background: selectedCategory === tab.id ? 'rgba(56, 189, 248, 0.15)' : 'var(--bg-card-solid)',
              color: selectedCategory === tab.id ? 'var(--accent-cyan)' : 'var(--text-secondary)',
              boxShadow: selectedCategory === tab.id ? '0 0 16px rgba(56, 189, 248, 0.25)' : 'var(--shadow-sm)',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              transition: 'all 0.2s ease'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Project Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '32px' }}>
        {filteredProjects.map((proj, pIdx) => (
          <ProjectCard
            key={proj.id || pIdx}
            project={proj}
            index={pIdx}
            onSelectPoC={onSelectPoC}
          />
        ))}
      </div>

    </section>
  );
}
