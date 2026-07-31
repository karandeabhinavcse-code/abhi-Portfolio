import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldAlert, Network, Smartphone, Wrench, CheckCircle2,
  Database, Code2, Layers, Server, FileCode, KeyRound, Cpu,
  Globe, Binary, Shield, GitFork, Lock, Search, Terminal,
  FolderSearch, Unlock, Radio, Radar, TerminalSquare, FileText, ShieldCheck, Cloud
} from 'lucide-react';
import { resumeData } from '../data/resumeData';

const iconMap = {
  ShieldAlert, Network, Smartphone, Wrench, CheckCircle2,
  Database, Code2, Layers, Server, FileCode, KeyRound, Cpu,
  Globe, Binary, Shield, GitFork, Lock, Search, Terminal,
  FolderSearch, Unlock, Radio, Radar, TerminalSquare, FileText, ShieldCheck, Cloud
};

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState('all');

  const categories = resumeData.skillCategories;

  const filteredCategories = activeTab === 'all'
    ? categories
    : categories.filter(cat => cat.id === activeTab);

  return (
    <section id="skills" style={{ padding: '70px 24px', maxWidth: '1280px', margin: '0 auto' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <span className="badge-cyber" style={{ marginBottom: '12px' }}>
          <ShieldAlert size={14} /> Core Expertise & Arsenal
        </span>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>
          Technical Skills & <span className="text-gradient">Security Matrix</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '650px', margin: '10px auto 0', fontSize: '1.05rem' }}>
          Hands-on proficiency across Web VAPT (OWASP 2025), Android Security, CCNA Networking Protocols, and Security Audit Reporting.
        </p>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
        <button
          onClick={() => setActiveTab('all')}
          style={{
            padding: '10px 20px',
            borderRadius: '9999px',
            fontSize: '0.875rem',
            fontWeight: 700,
            fontFamily: 'var(--font-mono)',
            border: activeTab === 'all' ? 'none' : '1px solid var(--border-light)',
            background: activeTab === 'all' ? 'linear-gradient(135deg, #00F0FF 0%, #00FF9D 100%)' : 'var(--bg-card-solid)',
            color: activeTab === 'all' ? '#050811' : 'var(--text-secondary)',
            boxShadow: activeTab === 'all' ? '0 4px 18px rgba(0, 240, 255, 0.4)' : 'var(--shadow-sm)',
            cursor: 'pointer',
            transition: 'all 0.25s ease'
          }}
        >
          All Skills Matrix
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            style={{
              padding: '10px 20px',
              borderRadius: '9999px',
              fontSize: '0.875rem',
              fontWeight: 700,
              fontFamily: 'var(--font-mono)',
              border: activeTab === cat.id ? 'none' : '1px solid var(--border-light)',
              background: activeTab === cat.id ? 'linear-gradient(135deg, #00F0FF 0%, #00FF9D 100%)' : 'var(--bg-card-solid)',
              color: activeTab === cat.id ? '#050811' : 'var(--text-secondary)',
              boxShadow: activeTab === cat.id ? '0 4px 18px rgba(0, 240, 255, 0.4)' : 'var(--shadow-sm)',
              cursor: 'pointer',
              transition: 'all 0.25s ease'
            }}
          >
            {cat.title}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '32px' }}>
        {filteredCategories.map((cat, catIdx) => {
          const CategoryIcon = iconMap[cat.icon] || Shield;

          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIdx * 0.1 }}
              className="glass-card"
              style={{ padding: '28px', borderRadius: '20px' }}
            >
              {/* Category Card Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: 'rgba(79, 70, 229, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-primary)',
                  border: '1px solid var(--border-accent)'
                }}>
                  <CategoryIcon size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>{cat.title}</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{cat.description}</p>
                </div>
              </div>

              {/* Skills Progress Bars */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '20px' }}>
                {cat.skills.map((skill, sIdx) => {
                  const SkillIcon = iconMap[skill.icon] || CheckCircle2;

                  return (
                    <div key={sIdx}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                          <SkillIcon size={16} style={{ color: 'var(--accent-primary)' }} />
                          <span>{skill.name}</span>
                        </div>
                        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)' }}>
                          {skill.level}%
                        </span>
                      </div>

                      {/* Progress Bar Container */}
                      <div style={{
                        width: '100%',
                        height: '8px',
                        background: 'var(--bg-secondary)',
                        borderRadius: '9999px',
                        overflow: 'hidden'
                      }}>
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: 'easeOut', delay: sIdx * 0.05 }}
                          style={{
                            height: '100%',
                            background: 'linear-gradient(90deg, #4F46E5 0%, #0891B2 100%)',
                            borderRadius: '9999px'
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

            </motion.div>
          );
        })}
      </div>

    </section>
  );
}
