import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, ExternalLink, CheckCircle2, FileText, Terminal, Cpu } from 'lucide-react';
import { resumeData } from '../data/resumeData';

export default function ProjectsSection({ onSelectPoC, refreshTrigger }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [projectsList, setProjectsList] = useState(resumeData.projects);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const fetchProjects = useCallback(async () => {
    let baseProjects = resumeData.projects;
    try {
      const res = await fetch(`${API_URL}/api/projects`);
      const data = await res.json();
      if (data.success && data.projects.length > 0) {
        baseProjects = data.projects;
      }
    } catch (e) {
      console.log('Using default resume projects:', e);
    }

    const localProjects = JSON.parse(localStorage.getItem('custom_projects') || '[]');
    const combined = [...localProjects];
    baseProjects.forEach(bp => {
      if (!combined.some(cp => (cp._id && cp._id === bp._id) || (cp.id && cp.id === bp.id) || cp.title === bp.title)) {
        combined.push(bp);
      }
    });
    setProjectsList(combined);
  }, [API_URL]);

  useEffect(() => {
    fetchProjects();
  }, [refreshTrigger, fetchProjects]);

  const defaultCategories = ['All', 'Web & API Security', 'Mobile Security', 'Network Infrastructure'];
  const categories = Array.from(new Set(['All', ...defaultCategories.slice(1), ...projectsList.map(p => p.type || p.category).filter(Boolean)]));

  const filteredProjects = selectedCategory === 'All'
    ? projectsList
    : projectsList.filter(p => (p.type || p.category) === selectedCategory);

  return (
    <section id="projects" style={{ padding: '70px 24px', maxWidth: '1280px', margin: '0 auto' }}>
      
      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <span className="badge-cyber" style={{ marginBottom: '12px' }}>
          <ShieldAlert size={14} /> Penetration Testing Portfolio
        </span>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>
          VAPT & Security <span className="text-gradient">Audit Projects</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '650px', margin: '10px auto 0', fontSize: '1.05rem' }}>
          Real-world security assessments, manual exploitation PoCs, OWASP Top 10 (2025) audits, and network vulnerability documentation.
        </p>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '32px' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '8px 18px',
              borderRadius: '9999px',
              fontSize: '0.85rem',
              fontWeight: 600,
              border: selectedCategory === cat ? 'none' : '1px solid var(--border-light)',
              background: selectedCategory === cat ? 'linear-gradient(135deg, #4F46E5 0%, #3730A3 100%)' : 'var(--bg-card-solid)',
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

      {/* Projects Cards Container */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '32px' }}>
        {filteredProjects.map((proj, pIdx) => (
          <motion.div
            key={proj.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: pIdx * 0.1 }}
            className="glass-card"
            style={{ padding: '32px', borderRadius: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <div>
              {/* Type Badge & Severity Count */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span className="badge-cyber" style={{ fontSize: '0.75rem' }}>
                  {proj.type}
                </span>

                {/* Severity Breakdown Pills */}
                <div style={{ display: 'flex', gap: '6px' }}>
                  {proj.severityBreakdown.critical > 0 && (
                    <span className="badge-rose" style={{ padding: '2px 8px', fontSize: '0.7rem' }}>
                      {proj.severityBreakdown.critical} Critical
                    </span>
                  )}
                  {proj.severityBreakdown.high > 0 && (
                    <span style={{ padding: '2px 8px', borderRadius: '9999px', fontSize: '0.7rem', fontWeight: 600, background: 'rgba(245, 158, 11, 0.1)', color: '#D97706', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                      {proj.severityBreakdown.high} High
                    </span>
                  )}
                </div>
              </div>

              {/* Title & Target */}
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '8px', lineHeight: 1.3, color: 'var(--text-primary)' }}>
                {proj.title}
              </h3>

              <div style={{ fontSize: '0.85rem', color: 'var(--accent-primary)', fontWeight: 600, fontFamily: 'var(--font-mono)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Cpu size={14} /> Target: {proj.target}
              </div>

              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
                {proj.summary}
              </p>

              {/* Bullet Key Highlights */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>
                  Audit Highlights:
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {proj.highlights.map((item, idx) => (
                    <li key={idx} style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <CheckCircle2 size={16} style={{ color: '#059669', flexShrink: 0, marginTop: '2px' }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tools Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
                {proj.tools.map((t, idx) => (
                  <span
                    key={idx}
                    style={{
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 600,
                      padding: '4px 10px',
                      borderRadius: '6px',
                      background: 'var(--bg-secondary)',
                      color: 'var(--text-secondary)',
                      border: '1px solid var(--border-light)'
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div style={{ paddingTop: '20px', borderTop: '1px solid var(--border-light)', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              
              {/* Inspect PoC Button */}
              {proj.pocs && proj.pocs.length > 0 && (
                <button
                  onClick={() => onSelectPoC(proj)}
                  className="btn-secondary"
                  style={{ flex: 1, padding: '10px 16px', fontSize: '0.875rem' }}
                >
                  <Terminal size={16} style={{ color: '#4F46E5' }} /> Inspect PoC Payloads ({proj.pocs.length})
                </button>
              )}

              {/* View Full Report PDF Link */}
              {proj.reportUrl && (
                <a
                  href={proj.reportUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ padding: '10px 16px', fontSize: '0.875rem' }}
                >
                  <FileText size={16} /> View Audit Report <ExternalLink size={14} />
                </a>
              )}
            </div>

          </motion.div>
        ))}
      </div>

    </section>
  );
}
