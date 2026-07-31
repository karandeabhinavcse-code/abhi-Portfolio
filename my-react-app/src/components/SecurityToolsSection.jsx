import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Download, ExternalLink, Code2, ShieldAlert, Cpu, Sparkles, FolderArchive, FileCode } from 'lucide-react';

export default function SecurityToolsSection({ refreshTrigger }) {
  const [toolsList, setToolsList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchTools();
  }, [refreshTrigger]);

  const fetchTools = async () => {
    let baseTools = [];
    try {
      const res = await fetch(`${API_URL}/api/tools`);
      const data = await res.json();
      if (data.success && data.tools) {
        baseTools = data.tools;
      }
    } catch (e) {
      console.log('Error fetching security tools:', e);
    }

    const localTools = JSON.parse(localStorage.getItem('custom_tools') || '[]');
    const combined = [...localTools];
    baseTools.forEach(bt => {
      if (!combined.some(ct => (ct._id && ct._id === bt._id) || (ct.id && ct.id === bt.id) || ct.title === bt.title)) {
        combined.push(bt);
      }
    });
    setToolsList(combined);
  };

  const categories = ['All', 'Web VAPT Scanner', 'Mobile Security Utility', 'Network Infrastructure Tool', 'Exploit PoC'];

  const filteredTools = selectedCategory === 'All'
    ? toolsList
    : toolsList.filter(t => t.category === selectedCategory);

  return (
    <section id="tools" style={{ padding: '90px 24px', maxWidth: '1280px', margin: '0 auto' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <span className="badge-cyber" style={{ marginBottom: '12px' }}>
          <Terminal size={14} /> Custom Security Arsenal
        </span>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>
          Custom Hacking Tools & <span className="text-gradient">Exploit Utilities</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '650px', margin: '10px auto 0', fontSize: '1.05rem' }}>
          Custom penetration testing scripts, Frida hooks, template scanners, and network security utilities authored by Abhinav Karande.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '40px' }}>
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
              background: selectedCategory === cat ? 'linear-gradient(135deg, #0891B2 0%, #4F46E5 100%)' : 'var(--bg-card-solid)',
              color: selectedCategory === cat ? '#FFFFFF' : 'var(--text-secondary)',
              boxShadow: selectedCategory === cat ? '0 4px 14px rgba(8, 145, 178, 0.3)' : 'var(--shadow-sm)',
              cursor: 'pointer',
              transition: 'all 0.25s ease'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tools Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
        {filteredTools.map((tool, idx) => (
          <motion.div
            key={tool._id || idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            className="glass-card"
            style={{ padding: '28px', borderRadius: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <div>
              {/* Category Badge & Version */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <span className="badge-cyber" style={{ fontSize: '0.75rem', background: 'rgba(8, 145, 178, 0.1)', color: 'var(--accent-cyan)', borderColor: 'rgba(8, 145, 178, 0.25)' }}>
                  {tool.category}
                </span>

                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-muted)' }}>
                  v{tool.version || '1.0.0'}
                </span>
              </div>

              {/* Title & Language */}
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '6px', color: 'var(--text-primary)' }}>
                {tool.title}
              </h3>
              <div style={{ fontSize: '0.85rem', color: 'var(--accent-primary)', fontWeight: 600, fontFamily: 'var(--font-mono)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Code2 size={14} /> Language: {tool.language}
              </div>

              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
                {tool.description}
              </p>

              {/* Command Usage Box */}
              {tool.commandUsage && (
                <div style={{
                  background: '#0F172A',
                  borderRadius: '10px',
                  padding: '12px',
                  color: '#38BDF8',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  marginBottom: '20px',
                  overflowX: 'auto',
                  border: '1px solid #1E293B'
                }}>
                  <div style={{ color: '#94A3B8', fontSize: '0.7rem', marginBottom: '2px' }}>$ Usage Terminal Command:</div>
                  <code>{tool.commandUsage}</code>
                </div>
              )}

              {/* Tags */}
              {tool.tags && tool.tags.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                  {tool.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      style={{
                        fontSize: '0.72rem',
                        fontFamily: 'var(--font-mono)',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        background: 'var(--bg-secondary)',
                        color: 'var(--text-secondary)',
                        border: '1px solid var(--border-light)'
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Actions: Download Zip & Documentation */}
            <div style={{
              paddingTop: '16px',
              borderTop: '1px solid var(--border-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '10px'
            }}>
              {tool.fileUrl ? (
                <a
                  href={tool.fileUrl}
                  download={tool.fileName || 'tool.zip'}
                  className="btn-primary"
                  style={{ width: '100%', padding: '10px', fontSize: '0.85rem' }}
                >
                  <FolderArchive size={16} /> Download Tool Zip ({tool.fileSize || 'Package'})
                </a>
              ) : (
                <button
                  disabled
                  className="btn-secondary"
                  style={{ width: '100%', padding: '10px', fontSize: '0.85rem', opacity: 0.7 }}
                >
                  <FileCode size={16} /> Source Code Archived
                </button>
              )}
            </div>

          </motion.div>
        ))}
      </div>

    </section>
  );
}
