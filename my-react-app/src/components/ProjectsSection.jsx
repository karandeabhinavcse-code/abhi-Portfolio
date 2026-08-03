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

  const defaultCategories = ['All', 'Web Application VAPT', 'Network Vulnerability Assessment', 'Android Application Security Assessment', 'Python Security Project'];
  const categories = Array.from(new Set(['All', ...defaultCategories.slice(1), ...projectsList.map(p => p.type || p.category).filter(Boolean)]));

  const filteredProjects = selectedCategory === 'All'
    ? projectsList
    : projectsList.filter(p => (p.type || p.category) === selectedCategory);

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

      {/* Filter Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '8px 16px',
              borderRadius: '9999px',
              fontSize: '0.85rem',
              fontWeight: 600,
              fontFamily: 'var(--font-mono)',
              border: selectedCategory === cat ? 'none' : '1px solid var(--border-light)',
              background: selectedCategory === cat ? 'linear-gradient(135deg, #4F46E5 0%, #0891B2 100%)' : 'var(--bg-card-solid)',
              color: selectedCategory === cat ? '#FFFFFF' : 'var(--text-secondary)',
              boxShadow: selectedCategory === cat ? '0 4px 14px rgba(79, 70, 229, 0.3)' : 'var(--shadow-sm)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {cat}
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
