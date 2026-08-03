import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle2, Copy, Check, FileText, ExternalLink, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { resumeData } from '../data/resumeData';

const GithubIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [copiedField, setCopiedField] = useState(null);
  const [isSending, setIsSending] = useState(false);

  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSending(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
    } catch (err) {
      console.warn('Backend API notification (fallback enabled):', err);
    } finally {
      setIsSending(false);
    }

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log('Confetti effect:', e);
    }

    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitted(false);
    }, 4000);
  };

  return (
    <section id="contact" style={{ padding: '70px 24px', maxWidth: '1280px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <div className="section-connector-line" />
        <span className="section-number-tag">
          06 // ENGAGEMENT & CONTACT
        </span>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>
          Contact & <span className="text-gradient">Professional Connect</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '650px', margin: '10px auto 0', fontSize: '1.05rem' }}>
          Looking for a Cybersecurity Intern, VAPT Trainee, or Network Security enthusiast? Reach out directly via email or message.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '40px' }}>

        {/* Left Column: Direct Contact Details & Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

          <div className="glass-card" style={{ padding: '28px', borderRadius: '20px' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '20px', color: 'var(--text-primary)' }}>
              Direct Contact Details
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

              {/* Email */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px', background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ padding: '10px', borderRadius: '10px', background: 'rgba(79, 70, 229, 0.1)', color: 'var(--accent-primary)' }}>
                    <Mail size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>EMAIL ADDRESS</div>
                    <a href={`mailto:${resumeData.personalInfo.email}`} style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', textDecoration: 'none', fontFamily: 'var(--font-mono)' }}>
                      {resumeData.personalInfo.email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(resumeData.personalInfo.email, 'email')}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: copiedField === 'email' ? '#10B981' : 'var(--text-muted)' }}
                  title="Copy Email"
                >
                  {copiedField === 'email' ? <Check size={18} /> : <Copy size={18} />}
                </button>
              </div>

              {/* Location */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                <div style={{ padding: '10px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.1)', color: '#10B981' }}>
                  <MapPin size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>LOCATION</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {resumeData.personalInfo.location}
                  </div>
                </div>
              </div>

              {/* Social Profiles */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '4px' }}>
                <a
                  href={resumeData.personalInfo.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '12px',
                    borderRadius: '12px',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-light)',
                    color: 'var(--text-primary)',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    textDecoration: 'none'
                  }}
                >
                  <GithubIcon size={18} /> GitHub Profile
                </a>

                <a
                  href={resumeData.personalInfo.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '12px',
                    borderRadius: '12px',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-light)',
                    color: 'var(--accent-primary)',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    textDecoration: 'none'
                  }}
                >
                  <LinkedinIcon size={18} /> LinkedIn Profile
                </a>
              </div>

            </div>
          </div>

          {/* Quick PDF Resume Link Box */}
          <div className="glass-card" style={{ padding: '24px', borderRadius: '20px', background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.05) 0%, rgba(8, 145, 178, 0.05) 100%)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <ShieldCheck size={20} style={{ color: 'var(--accent-primary)' }} />
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>Download Resume PDF</h4>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              Obtain Abhinav Karande's full single-page cybersecurity resume.
            </p>
            <a
              href={resumeData.personalInfo.reportUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ width: '100%' }}
            >
              <FileText size={16} /> Open & Download Resume PDF <ExternalLink size={14} />
            </a>
          </div>

        </div>

        {/* Right Column: Contact Form */}
        <div className="glass-card" style={{ padding: '32px', borderRadius: '24px' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '8px', color: 'var(--text-primary)' }}>
            Send a Direct Message
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
            Fill in your message and I will get back to you promptly.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                padding: '32px',
                textAlign: 'center',
                background: 'rgba(16, 185, 129, 0.1)',
                borderRadius: '16px',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                color: '#10B981'
              }}
            >
              <CheckCircle2 size={48} style={{ margin: '0 auto 16px' }} />
              <h4 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '8px' }}>
                Message Sent Successfully!
              </h4>
              <p style={{ fontSize: '0.9rem' }}>
                Thank you for reaching out. I will respond to your message shortly.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Recruiter Name"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    border: '1px solid var(--border-light)',
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    fontSize: '0.95rem'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your.email@company.com"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    border: '1px solid var(--border-light)',
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    fontSize: '0.95rem'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                  Subject
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="VAPT Internship / Hiring Opportunity"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    border: '1px solid var(--border-light)',
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    fontSize: '0.95rem'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                  Message *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Type your message here..."
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    border: '1px solid var(--border-light)',
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    fontSize: '0.95rem',
                    resize: 'vertical'
                  }}
                />
              </div>

              <button type="submit" disabled={isSending} className="btn-primary" style={{ width: '100%', padding: '13px', opacity: isSending ? 0.7 : 1 }}>
                <Send size={17} /> {isSending ? 'Sending Message...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>

      </div>

    </section>
  );
}
