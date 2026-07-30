import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, Copy, Check, ExternalLink, Network, Code, Smartphone, Cpu, Cloud, Lock } from 'lucide-react';
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
    <section id="certifications" style={{ padding: '90px 24px', maxWidth: '1280px', margin: '0 auto' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '56px' }}>
        <span className="badge-cyber" style={{ marginBottom: '12px' }}>
          <Award size={14} /> Verified Credentials & Licenses
        </span>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>
          Certifications & <span className="text-gradient">Accreditations</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '650px', margin: '10px auto 0', fontSize: '1.05rem' }}>
          Certified credentials from Cisco Networking Academy, EC-Council, and Cybervault Pune.
        </p>
      </div>

      {/* Certifications Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {resumeData.certifications.map((cert, idx) => {
          const CertIcon = iconMap[cert.icon] || Award;
          const isCopied = copiedId === cert.certNumber;

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
                {/* Header Icon & Status Pill */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: `${cert.badgeColor}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: cert.badgeColor,
                    border: `1px solid ${cert.badgeColor}30`
                  }}>
                    <CertIcon size={22} />
                  </div>

                  <span
                    className={cert.status === 'Ongoing' ? 'badge-rose' : 'badge-emerald'}
                    style={{ fontSize: '0.7rem' }}
                  >
                    {cert.status}
                  </span>
                </div>

                {/* Title & Issuer */}
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-primary)' }}>
                  {cert.title}
                </h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '16px' }}>
                  {cert.issuer}
                </div>
              </div>

              {/* Footer: Cert Number & Copy Action */}
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

                <button
                  onClick={() => handleCopyCert(cert.certNumber)}
                  style={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-light)',
                    borderRadius: '6px',
                    padding: '4px 10px',
                    fontSize: '0.75rem',
                    color: isCopied ? '#059669' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontWeight: 600
                  }}
                  title="Copy Certificate ID"
                >
                  {isCopied ? <Check size={12} /> : <Copy size={12} />}
                  {isCopied ? 'Copied' : 'Copy ID'}
                </button>
              </div>

            </motion.div>
          );
        })}
      </div>

    </section>
  );
}
