import { motion } from 'framer-motion';
import { ShieldCheck, FileText, Cpu, CheckCircle2, Eye, Wrench } from 'lucide-react';

const GithubIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function ProjectCard({ project, index, onSelectPoC }) {
  const isGithubAvailable = project.githubUrl && project.githubUrl !== 'https://github.com/' && !project.githubUrl.includes('TODO');
  const isReportAvailable = Boolean(project.reportUrl);

  // Short Category Badge Mapping
  const getShortCategory = (type) => {
    if (!type) return 'SECURITY';
    const lower = type.toLowerCase();
    if (lower.includes('web')) return 'WEB VAPT';
    if (lower.includes('network')) return 'NETWORK VAPT';
    if (lower.includes('android')) return 'ANDROID VAPT';
    if (lower.includes('python')) return 'PYTHON';
    return type.toUpperCase();
  };

  const shortCategory = getShortCategory(project.type || project.category);
  const yearDisplay = project.period ? project.period.split('-')[0].trim() : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="glass-card"
      style={{
        padding: '28px',
        borderRadius: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        border: '1px solid var(--border-light)',
        height: '100%'
      }}
    >
      <div>
        {/* 1. Category Tag & Year */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span className="badge-cyber" style={{ fontSize: '0.72rem', padding: '4px 12px' }}>
              {shortCategory}
            </span>
            {project.featured && (
              <span
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--accent-cyan)',
                  background: 'rgba(56, 189, 248, 0.1)',
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                  padding: '3px 10px',
                  borderRadius: '9999px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  boxShadow: '0 0 10px rgba(56, 189, 248, 0.15)'
                }}
              >
                ★ FEATURED PROJECT
              </span>
            )}
          </div>
          {yearDisplay && (
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
              {yearDisplay}
            </span>
          )}
        </div>

        {/* 2. Project Title */}
        <h3 style={{ fontSize: '1.28rem', fontWeight: 800, marginBottom: '10px', lineHeight: 1.35, color: 'var(--text-primary)' }}>
          {project.title}
        </h3>

        {/* 3. Environment & Assessment Badge */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.75)',
          borderRadius: '10px',
          padding: '8px 12px',
          marginBottom: '14px',
          borderLeft: '3px solid var(--accent-cyan)',
          border: '1px solid rgba(56, 189, 248, 0.15)',
          fontSize: '0.82rem',
          color: 'var(--accent-cyan)',
          fontFamily: 'var(--font-mono)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <Cpu size={14} style={{ color: 'var(--accent-cyan)' }} />
          <span><strong>{project.environmentType || 'Controlled Lab Assessment'}</strong> • {project.target}</span>
        </div>

        {/* 4. Short Description */}
        <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '18px' }}>
          {project.summary}
        </p>

        {/* 5. TOOLS Badges Section */}
        {project.tools && project.tools.length > 0 && (
          <div style={{ marginBottom: '18px' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Wrench size={12} /> TOOLS
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {project.tools.map((tool, idx) => (
                <span
                  key={idx}
                  style={{
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 600,
                    padding: '3px 10px',
                    borderRadius: '6px',
                    background: 'rgba(56, 189, 248, 0.08)',
                    color: 'var(--text-secondary)',
                    border: '1px solid rgba(56, 189, 248, 0.2)'
                  }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 6. KEY WORK Highlights */}
        {(project.keyWork || project.highlights) && (
          <div style={{ marginBottom: '22px' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
              KEY WORK
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {(project.keyWork || project.highlights).slice(0, 3).map((item, idx) => (
                <li key={idx} style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'flex-start', gap: '6px', lineHeight: 1.45, fontFamily: 'var(--font-mono)' }}>
                  <span style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* 7. Action Buttons */}
      <div style={{ paddingTop: '16px', borderTop: '1px solid var(--border-light)', display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>

        {/* View Details Button */}
        <button
          onClick={() => onSelectPoC(project)}
          className="btn-primary"
          style={{ flex: 1, padding: '8px 14px', fontSize: '0.83rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
        >
          <Eye size={14} /> View Details
        </button>

        {/* GitHub Button (Rendered only if valid URL exists) */}
        {isGithubAvailable && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            style={{ padding: '8px 14px', fontSize: '0.83rem', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <GithubIcon size={14} /> GitHub
          </a>
        )}

        {/* Report PDF Button (Rendered only if valid Report URL exists) */}
        {isReportAvailable && (
          <a
            href={project.reportUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            style={{ padding: '8px 14px', fontSize: '0.83rem', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <FileText size={14} /> Report
          </a>
        )}

      </div>

    </motion.div>
  );
}

