import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldAlert, Network, Smartphone, Wrench, Code2, Server,
  CheckCircle2, Cpu, Globe, Lock, Search, Terminal, Radio
} from 'lucide-react';
import { resumeData } from '../data/resumeData';

const iconMap = {
  ShieldAlert,
  Network,
  Smartphone,
  Wrench,
  Code2,
  Server
};

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState('all');

  const categories = resumeData.skillCategories;

  const filteredCategories = activeTab === 'all'
    ? categories
    : categories.filter(cat => cat.id === activeTab);

  return (
    <section id="skills" style={{ padding: '70px 24px', maxWidth: '1280px', margin: '0 auto' }}>
      
      {/* Technical Section Connector & Header */}
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <div className="section-connector-line" />
        <span className="section-number-tag">
          02 // TECHNICAL SKILLS
        </span>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>
          Technical <span className="text-gradient">Skills Matrix</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '650px', margin: '10px auto 0', fontSize: '1.05rem' }}>
          Categorized technical skills across Web Security, Network Security, Android Security, Penetration Testing tools, Scripting, and Environments.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
        <button
          onClick={() => setActiveTab('all')}
          style={{
            padding: '8px 18px',
            borderRadius: '9999px',
            fontSize: '0.85rem',
            fontWeight: 700,
            fontFamily: 'var(--font-mono)',
            border: activeTab === 'all' ? 'none' : '1px solid var(--border-light)',
            background: activeTab === 'all' ? 'linear-gradient(135deg, #4F46E5 0%, #0891B2 100%)' : 'var(--bg-card-solid)',
            color: activeTab === 'all' ? '#FFFFFF' : 'var(--text-secondary)',
            boxShadow: activeTab === 'all' ? '0 4px 14px rgba(79, 70, 229, 0.3)' : 'var(--shadow-sm)',
            cursor: 'pointer',
            transition: 'all 0.25s ease'
          }}
        >
          All Categories
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            style={{
              padding: '8px 18px',
              borderRadius: '9999px',
              fontSize: '0.85rem',
              fontWeight: 700,
              fontFamily: 'var(--font-mono)',
              border: activeTab === cat.id ? 'none' : '1px solid var(--border-light)',
              background: activeTab === cat.id ? 'linear-gradient(135deg, #4F46E5 0%, #0891B2 100%)' : 'var(--bg-card-solid)',
              color: activeTab === cat.id ? '#FFFFFF' : 'var(--text-secondary)',
              boxShadow: activeTab === cat.id ? '0 4px 14px rgba(79, 70, 229, 0.3)' : 'var(--shadow-sm)',
              cursor: 'pointer',
              transition: 'all 0.25s ease'
            }}
          >
            {cat.title}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '28px' }}>
        {filteredCategories.map((cat, catIdx) => {
          const CategoryIcon = iconMap[cat.icon] || ShieldAlert;

          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: catIdx * 0.08 }}
              className="glass-card"
              style={{ padding: '28px', borderRadius: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <div>
                {/* Category Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: 'rgba(79, 70, 229, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-primary)',
                    border: '1px solid rgba(79, 70, 229, 0.25)',
                    flexShrink: 0
                  }}>
                    <CategoryIcon size={22} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>{cat.title}</h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{cat.description}</p>
                  </div>
                </div>

                {/* Skill Badges/Tags Container */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '18px' }}>
                  {cat.skills.map((skillName, sIdx) => (
                    <span
                      key={sIdx}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        padding: '6px 12px',
                        borderRadius: '10px',
                        background: 'var(--bg-secondary)',
                        color: 'var(--text-primary)',
                        border: '1px solid var(--border-light)',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <CheckCircle2 size={13} style={{ color: '#10B981' }} />
                      {skillName}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

    </section>
  );
}
