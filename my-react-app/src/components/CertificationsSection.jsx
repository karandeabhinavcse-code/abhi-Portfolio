import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, Copy, Check, Network, Code, Smartphone, Cpu, Cloud, Lock, ExternalLink } from 'lucide-react';
import { resumeData } from '../data/resumeData';

const iconMap = {
  Network, ShieldCheck, Code, Smartphone, Cpu, Cloud, Lock
};

export default function CertificationsSection() {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopyCert = (id) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="certifications" style={{ padding: '70px 24px', maxWidth: '1280px', margin: '0 auto' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <div className="section-connector-line" />
        <span className="section-number-tag">
          04 // VERIFIED CREDENTIALS
        </span>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>
          Certifications & <span className="text-gradient">Course Completions</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '650px', margin: '10px auto 0', fontSize: '1.05rem' }}>
          Certified training & coursework completed with Cisco Networking Academy, EC-Council, and Cybervault Security Academy.
        </p>
      </div>

      {/* Certifications Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {resumeData.certifications.map((cert, idx) => {
          const CertIcon = iconMap[cert.icon] || Award;
          const isCopied = copiedId === cert.certNumber;
          const hasCredentialUrl = cert.credentialUrl && cert.credentialUrl !== '#' && !cert.credentialUrl.includes('TODO');

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="glass-card"
              style={{ padding: '24px', borderRadius: '18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <div>
                {/* Header Icon & Date Pill */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: 'rgba(79, 70, 229, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-primary)',
                    border: '1px solid rgba(79, 70, 229, 0.25)'
                  }}>
                    <CertIcon size={22} />
                  </div>

                  <span className="badge-cyber" style={{ fontSize: '0.75rem' }}>
                    {cert.completionDate}
                  </span>
                </div>

                {/* Title & Issuer */}
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-primary)' }}>
                  {cert.title}
                </h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--accent-primary)', fontWeight: 600, marginBottom: '16px' }}>
                  {cert.issuer}
                </div>
              </div>

              {/* Footer: Cert Number & Action */}
              <div style={{
                paddingTop: '14px',
                borderTop: '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  ID: <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{cert.certNumber}</span>
                </div>

                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  {/* Copy ID Button */}
                  <button
                    onClick={() => handleCopyCert(cert.certNumber)}
                    style={{
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-light)',
                      borderRadius: '6px',
                      padding: '4px 10px',
                      fontSize: '0.75rem',
                      color: isCopied ? '#10B981' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontWeight: 600
                    }}
                    title="Copy Credential ID"
                  >
                    {isCopied ? <Check size={12} /> : <Copy size={12} />}
                    {isCopied ? 'Copied' : 'Copy ID'}
                  </button>

                  {/* View Credential Button (ONLY displayed if link exists) */}
                  {hasCredentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                      style={{ padding: '4px 10px', fontSize: '0.75rem', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      View <ExternalLink size={11} />
                    </a>
                  )}
                </div>
              </div>

            </motion.div>
          );
        })}
      </div>

    </section>
  );
}
