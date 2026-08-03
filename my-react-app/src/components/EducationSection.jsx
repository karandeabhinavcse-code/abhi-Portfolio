import { motion } from 'framer-motion';
import { GraduationCap, Calendar, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';
import { resumeData } from '../data/resumeData';

export default function EducationSection() {
  return (
    <section id="education" style={{ padding: '70px 24px', maxWidth: '1280px', margin: '0 auto' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <div className="section-connector-line" />
        <span className="section-number-tag">
          05 // ACADEMIC & CONTINUOUS LEARNING
        </span>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>
          Education & <span className="text-gradient">Continuous Learning</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '650px', margin: '10px auto 0', fontSize: '1.05rem' }}>
          Formal academic coursework in Computer Applications combined with targeted continuous learning in cybersecurity topics.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '32px' }}>
        
        {/* Education Details Card */}
        {resumeData.education.map((edu, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="glass-card"
            style={{ padding: '32px', borderRadius: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{
                  padding: '10px',
                  borderRadius: '12px',
                  background: 'rgba(8, 145, 178, 0.1)',
                  color: 'var(--accent-cyan)',
                  border: '1px solid rgba(8, 145, 178, 0.25)'
                }}>
                  <GraduationCap size={24} />
                </div>
                <span className="badge-emerald" style={{ fontSize: '0.75rem' }}>
                  <Calendar size={12} /> {edu.period}
                </span>
              </div>

              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
                {edu.degree}
              </h3>

              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--accent-cyan)', marginBottom: '8px' }}>
                {edu.institution}
              </div>

              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '16px' }}>
                Status: <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{edu.status}</span>
              </div>

              <div style={{
                background: 'var(--bg-secondary)',
                borderRadius: '12px',
                padding: '14px',
                border: '1px solid var(--border-light)'
              }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <BookOpen size={14} style={{ color: 'var(--accent-cyan)' }} /> Relevant Coursework:
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                  {edu.coursework}
                </p>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Section 9: Currently Learning Sub-Card */}
        <motion.div
          id="learning"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="glass-card"
          style={{ padding: '28px', borderRadius: '24px', background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.04) 0%, rgba(8, 145, 178, 0.04) 100%)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ padding: '8px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.1)', color: '#F59E0B' }}>
              <Sparkles size={20} />
            </div>
            <div>
              <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Currently Learning & Expanding
              </h4>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Active growth topics and practical lab practice
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
            {resumeData.currentlyLearning.map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: '10px 14px',
                  borderRadius: '10px',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-light)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px'
                }}
              >
                <CheckCircle2 size={16} style={{ color: '#F59E0B', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>

    </section>
  );
}
