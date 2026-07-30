import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, MapPin, Calendar, CheckCircle2, ShieldCheck, Award } from 'lucide-react';
import { resumeData } from '../data/resumeData';

export default function ExperienceSection() {
  return (
    <section id="experience" style={{ padding: '90px 24px', maxWidth: '1280px', margin: '0 auto' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '56px' }}>
        <span className="badge-cyber" style={{ marginBottom: '12px' }}>
          <Briefcase size={14} /> Practical Journey & Education
        </span>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>
          Experience & <span className="text-gradient">Academic Background</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '650px', margin: '10px auto 0', fontSize: '1.05rem' }}>
          Hands-on security training at Cybervault Pune combined with specialized BCA coursework in Networking and Systems.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '40px' }}>
        
        {/* Left Column: Experience */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <div style={{ padding: '8px', borderRadius: '10px', background: 'rgba(79, 70, 229, 0.1)', color: 'var(--accent-primary)' }}>
              <Briefcase size={20} />
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>VAPT & Security Training</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {resumeData.experience.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass-card"
                style={{ padding: '28px', borderRadius: '20px' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
                  <div>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>{exp.role}</h4>
                    <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--accent-primary)', marginTop: '2px' }}>
                      {exp.organization}
                    </div>
                  </div>
                  <span className="badge-cyber" style={{ fontSize: '0.75rem' }}>
                    <Calendar size={12} /> {exp.period}
                  </span>
                </div>

                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '16px' }}>
                  <MapPin size={14} /> {exp.location}
                </div>

                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {exp.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'flex-start', gap: '8px', lineHeight: 1.6 }}>
                      <CheckCircle2 size={16} style={{ color: '#059669', flexShrink: 0, marginTop: '3px' }} />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Education */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <div style={{ padding: '8px', borderRadius: '10px', background: 'rgba(8, 145, 178, 0.1)', color: 'var(--accent-cyan)' }}>
              <GraduationCap size={20} />
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>Academic Credentials</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {resumeData.education.map((edu, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass-card"
                style={{ padding: '28px', borderRadius: '20px' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
                  <div>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>{edu.degree}</h4>
                    <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--accent-cyan)', marginTop: '2px' }}>
                      {edu.specialization}
                    </div>
                  </div>
                  <span className="badge-emerald" style={{ fontSize: '0.75rem' }}>
                    <Calendar size={12} /> {edu.period}
                  </span>
                </div>

                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>
                  {edu.institution}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '12px' }}>
                  <MapPin size={14} /> {edu.location}
                </div>

                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {edu.highlights}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

    </section>
  );
}
