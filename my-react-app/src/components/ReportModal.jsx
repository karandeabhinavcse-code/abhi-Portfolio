import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldAlert, Copy, Check, FileText, ExternalLink, Code2, AlertCircle } from 'lucide-react';

export default function ReportModal({ project, onClose }) {
  const [copiedIdx, setCopiedIdx] = useState(null);

  if (!project) return null;

  const handleCopyCode = (code, idx) => {
    navigator.clipboard.writeText(code);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        style={{
          width: '100%',
          maxWidth: '850px',
          maxHeight: '90vh',
          background: 'var(--bg-card-solid)',
          borderRadius: '24px',
          boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.35)',
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
              <span className="badge-cyber" style={{ fontSize: '0.7rem' }}>
                PoC Inspector & Remediation
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

        {/* Modal Body */}
        <div style={{ padding: '32px', overflowY: 'auto', flex: 1 }}>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
            {project.summary}
          </p>

          <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px', color: 'var(--text-primary)' }}>
            Documented Proof-of-Concepts (PoCs):
          </h4>

          {/* PoC Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {project.pocs.map((poc, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--bg-secondary)',
                  borderRadius: '16px',
                  border: '1px solid var(--border-light)',
                  padding: '20px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>
                    {poc.title}
                  </div>
                  <span
                    className={poc.severity === 'Critical' ? 'badge-rose' : 'badge-cyber'}
                    style={{ fontSize: '0.7rem' }}
                  >
                    {poc.severity} Severity
                  </span>
                </div>

                <div style={{ fontSize: '0.85rem', color: '#E11D48', fontWeight: 600, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <AlertCircle size={14} /> Vulnerability: {poc.vulnerability}
                </div>

                {/* Code Box */}
                <div style={{
                  background: '#0F172A',
                  borderRadius: '12px',
                  padding: '14px',
                  color: '#F8FAFC',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  position: 'relative',
                  marginBottom: '12px',
                  overflowX: 'auto'
                }}>
                  <div style={{ color: '#94A3B8', fontSize: '0.75rem', marginBottom: '4px' }}>
                    // Payload Code Snippet
                  </div>
                  <div style={{ color: '#38BDF8', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                    {poc.code}
                  </div>

                  <button
                    onClick={() => handleCopyCode(poc.code, idx)}
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
                    {copiedIdx === idx ? 'Copied' : 'Copy'}
                  </button>
                </div>

                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <strong style={{ color: 'var(--text-primary)' }}>Impact Analysis:</strong> {poc.impact}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div style={{
          padding: '20px 32px',
          background: 'var(--bg-secondary)',
          borderTop: '1px solid var(--border-light)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <button onClick={onClose} className="btn-secondary">
            Close Inspector
          </button>

          {project.reportUrl && (
            <a
              href={project.reportUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <FileText size={16} /> Open Full PDF Security Audit <ExternalLink size={14} />
            </a>
          )}
        </div>

      </motion.div>
    </div>
  );
}
