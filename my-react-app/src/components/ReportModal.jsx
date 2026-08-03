import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Copy, Check, FileText, ExternalLink, ShieldAlert, Cpu, Wrench, BookOpen, AlertTriangle, CheckCircle2 } from 'lucide-react';

const GithubIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function ReportModal({ project, onClose }) {
  const [copiedIdx, setCopiedIdx] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const isGithubAvailable = project.githubUrl && project.githubUrl !== 'https://github.com/' && !project.githubUrl.includes('TODO');
  const isReportAvailable = Boolean(project.reportUrl);

  const handleCopyCode = (code, idx) => {
    navigator.clipboard.writeText(code);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const getSeverityBadgeClass = (sev) => {
    if (!sev) return 'badge-cyber';
    const s = sev.toUpperCase();
    if (s === 'CRITICAL' || s === 'HIGH') return 'badge-rose';
    if (s === 'MEDIUM') return 'badge-cyber';
    return 'badge-emerald';
  };

  const findingsList = project.findings || (project.pocs || []).map(p => ({
    name: p.title || p.vulnerability,
    severity: (p.severity || 'MEDIUM').toUpperCase(),
    category: p.vulnerability || 'Security Audit',
    description: p.impact || 'Identified during controlled security lab testing.',
    evidence: p.code,
    impact: p.impact,
    remediation: 'Apply context-appropriate input validation, parameterized queries, and defensive access controls.'
  }));

  const keyWorkItems = project.keyWork || project.highlights || [];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        style={{
          width: '100%',
          maxWidth: '920px',
          maxHeight: '90vh',
          background: 'var(--bg-card-solid)',
          borderRadius: '24px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 30px rgba(56, 189, 248, 0.15)',
          border: '1px solid var(--border-light)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div style={{
          padding: '24px 32px',
          background: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="badge-cyber" style={{ fontSize: '0.72rem' }}>
                <ShieldAlert size={12} /> PROJECT DETAIL & SECURITY INSPECTOR
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                {project.period}
              </span>
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {project.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'var(--bg-card-solid)',
              border: '1px solid var(--border-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-muted)'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div style={{ padding: '32px', overflowY: 'auto', flex: 1 }}>
          
          {/* Environment & Target Scope */}
          <div style={{
            background: 'rgba(15, 23, 42, 0.65)',
            borderRadius: '16px',
            border: '1px solid var(--border-light)',
            padding: '20px',
            marginBottom: '24px'
          }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', fontWeight: 700, fontFamily: 'var(--font-mono)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Cpu size={15} /> ENVIRONMENT & TARGET SCOPE
            </div>
            <div style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
              {project.environmentType || 'Controlled Lab Assessment'} — <span style={{ color: 'var(--accent-cyan)' }}>{project.target}</span>
            </div>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {project.summary || project.objective}
            </p>
          </div>

          {/* Testing Methodology */}
          {project.methodology && (
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
                METHODOLOGY & ASSESSMENT WORKFLOW
              </h4>
              <div style={{
                background: 'var(--bg-secondary)',
                borderRadius: '12px',
                padding: '14px 18px',
                border: '1px solid var(--border-light)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                color: 'var(--accent-cyan)'
              }}>
                {project.methodology}
              </div>
            </div>
          )}

          {/* Tools Used Badges */}
          {project.tools && project.tools.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Wrench size={14} /> TOOLS USED
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {project.tools.map((t, idx) => (
                  <span key={idx} style={{
                    fontSize: '0.8rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 600,
                    padding: '4px 12px',
                    borderRadius: '8px',
                    background: 'rgba(56, 189, 248, 0.08)',
                    color: 'var(--accent-cyan)',
                    border: '1px solid rgba(56, 189, 248, 0.25)'
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Key Work Items */}
          {keyWorkItems && keyWorkItems.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
                KEY WORK ACTIVITIES
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {keyWorkItems.map((item, idx) => (
                  <li key={idx} style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-mono)' }}>
                    <span style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Key Findings / Vulnerabilities */}
          {findingsList && findingsList.length > 0 && (
            <div style={{ marginBottom: '28px' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertTriangle size={16} style={{ color: '#FB7185' }} /> Documented Security Findings ({findingsList.length})
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {findingsList.map((finding, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: 'var(--bg-secondary)',
                      borderRadius: '16px',
                      border: '1px solid var(--border-light)',
                      padding: '20px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                      <div style={{ fontWeight: 700, fontSize: '1.02rem', color: 'var(--text-primary)' }}>
                        {finding.name}
                      </div>
                      <span className={getSeverityBadgeClass(finding.severity)} style={{ fontSize: '0.72rem' }}>
                        {finding.severity} SEVERITY
                      </span>
                    </div>

                    <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '12px' }}>
                      {finding.description}
                    </div>

                    {/* Evidence Payload Code Box */}
                    {finding.evidence && (
                      <div style={{
                        background: '#0B0F19',
                        borderRadius: '12px',
                        padding: '14px',
                        color: '#F8FAFC',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.83rem',
                        position: 'relative',
                        marginBottom: '12px',
                        overflowX: 'auto',
                        border: '1px solid rgba(56, 189, 248, 0.15)'
                      }}>
                        <div style={{ color: '#94A3B8', fontSize: '0.73rem', marginBottom: '6px' }}>
                          // Technical Evidence / Payload Snippet
                        </div>
                        <div style={{ color: '#38BDF8', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                          {finding.evidence}
                        </div>

                        <button
                          onClick={() => handleCopyCode(finding.evidence, idx)}
                          style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            background: '#1E293B',
                            border: '1px solid #334155',
                            color: copiedIdx === idx ? '#10B981' : '#94A3B8',
                            borderRadius: '6px',
                            padding: '4px 8px',
                            fontSize: '0.7rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          {copiedIdx === idx ? <Check size={12} /> : <Copy size={12} />}
                          {copiedIdx === idx ? 'Copied' : 'Copy Payload'}
                        </button>
                      </div>
                    )}

                    {finding.impact && (
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                        <strong style={{ color: 'var(--text-primary)' }}>Impact: </strong>{finding.impact}
                      </div>
                    )}

                    {finding.remediation && (
                      <div style={{ fontSize: '0.85rem', color: '#34D399', background: 'rgba(52, 211, 153, 0.08)', padding: '8px 12px', borderRadius: '8px', border: '1px solid rgba(52, 211, 153, 0.2)' }}>
                        <strong>Remediation Advice: </strong>{finding.remediation}
                      </div>
                    )}

                  </div>
                ))}
              </div>
            </div>
          )}

          {/* What I Learned */}
          {project.whatILearned && (
            <div style={{
              background: 'rgba(99, 102, 241, 0.08)',
              borderRadius: '16px',
              padding: '20px',
              border: '1px solid rgba(99, 102, 241, 0.25)'
            }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <BookOpen size={15} /> WHAT I LEARNED
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {project.whatILearned}
              </p>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div style={{
          padding: '20px 32px',
          background: 'var(--bg-secondary)',
          borderTop: '1px solid var(--border-light)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <button onClick={onClose} className="btn-secondary">
            Close
          </button>

          <div style={{ display: 'flex', gap: '10px' }}>
            {isGithubAvailable && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ padding: '9px 16px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <GithubIcon size={15} /> GitHub
              </a>
            )}

            {isReportAvailable && (
              <a
                href={project.reportUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ padding: '9px 16px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <FileText size={15} /> Report <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>

      </motion.div>

      {/* Lightbox Preview Modal if image selected */}
      {previewImage && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.85)',
            zIndex: 1100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setPreviewImage(null)}
        >
          <img src={previewImage} alt="Evidence Preview" style={{ maxWidth: '90%', maxHeight: '90%', borderRadius: '12px' }} />
        </div>
      )}

    </div>
  );
}


