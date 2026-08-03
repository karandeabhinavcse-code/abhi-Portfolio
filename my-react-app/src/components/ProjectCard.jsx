import { motion } from 'framer-motion';
import { ShieldAlert, ExternalLink, CheckCircle2, FileText, Terminal, Cpu, Info } from 'lucide-react';

const GithubIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function ProjectCard({ project, index, onSelectPoC }) {
  const isGithubAvailable = project.githubUrl && project.githubUrl !== 'https://github.com/' && !project.githubUrl.includes('TODO');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="glass-card"
      style={{
        padding: '32px',
        borderRadius: '24px',
        display: 'flex',
        flexDirection: 'column',
        justify: 'space-between',
        border: '1px solid var(--border-light)'
      }}
    >
      <div>
        {/* Category Badge & Period */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <span className="badge-cyber" style={{ fontSize: '0.75rem' }}>
            {project.type}
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            {project.period}
          </span>
        </div>

        {/* Title */}
        <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '8px', lineHeight: 1.3, color: 'var(--text-primary)' }}>
          {project.title}
        </h3>

        {/* Target Environment */}
        <div style={{ fontSize: '0.85rem', color: 'var(--accent-primary)', fontWeight: 600, fontFamily: 'var(--font-mono)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Cpu size={14} /> Environment: {project.target}
        </div>

        {/* Objective */}
        {project.objective && (
          <div style={{
            background: 'var(--bg-secondary)',
            borderRadius: '10px',
            padding: '10px 14px',
            marginBottom: '16px',
            borderLeft: '3px solid var(--accent-primary)',
            fontSize: '0.85rem',
            color: 'var(--text-secondary)'
          }}>
            <strong style={{ color: 'var(--text-primary)' }}>Objective: </strong>
            {project.objective}
          </div>
        )}

        {/* Short Summary Description */}
        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
          {project.summary}
        </p>

        {/* Key Work Performed Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>
              Key Assessment Work:
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {project.highlights.map((item, idx) => (
                <li key={idx} style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'flex-start', gap: '8px', lineHeight: 1.5 }}>
                  <CheckCircle2 size={15} style={{ color: '#10B981', flexShrink: 0, marginTop: '3px' }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tools / Technologies Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
          {project.tools.map((tool, idx) => (
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
              {tool}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Action Buttons */}
      <div style={{ paddingTop: '20px', borderTop: '1px solid var(--border-light)', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        
        {/* Inspect PoC Payloads Button */}
        {project.pocs && project.pocs.length > 0 && (
          <button
            onClick={() => onSelectPoC(project)}
            className="btn-secondary"
            style={{ flex: 1, padding: '9px 14px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
          >
            <Terminal size={15} style={{ color: '#4F46E5' }} /> View PoCs ({project.pocs.length})
          </button>
        )}

        {/* View Report PDF */}
        {project.reportUrl ? (
          <a
            href={project.reportUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ padding: '9px 14px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <FileText size={15} /> View Report
          </a>
        ) : (
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Info size={13} /> Report Available on Request
          </span>
        )}

        {/* GitHub Button */}
        {isGithubAvailable ? (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            style={{ padding: '9px 14px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <GithubIcon size={15} /> Code
          </a>
        ) : (
          <span
            title="GitHub Repository link will be updated soon"
            style={{
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
              padding: '6px 10px',
              borderRadius: '6px',
              border: '1px dashed var(--border-light)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <GithubIcon size={13} /> [Repo TODO]
          </span>
        )}
      </div>

    </motion.div>
  );
}
