import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, Copy, Check, FileText, ExternalLink, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { resumeData } from '../data/resumeData';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSending(true);

    try {
      // Post message payload to MongoDB backend API
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

    // Trigger confetti celebration
    try {
      confetti({
        particleCount: 85,
        spread: 75,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log('Confetti effect:', e);
    }

    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitted(false);
    }, 4500);
  };

  return (
    <section id="contact" style={{ padding: '90px 24px', maxWidth: '1280px', margin: '0 auto' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '56px' }}>
        <span className="badge-cyber" style={{ marginBottom: '12px' }}>
          <Mail size={14} /> Get In Touch
        </span>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>
          Initiate <span className="text-gradient">Security Consultation</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '650px', margin: '10px auto 0', fontSize: '1.05rem' }}>
          Looking for an Application Security Specialist, VAPT Auditor, or CCNA Network Engineer? Reach out directly.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '40px' }}>
        
        {/* Left Column: Direct Contact Info Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div className="glass-card" style={{ padding: '28px', borderRadius: '20px' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '20px', color: 'var(--text-primary)' }}>
              Direct Contact Details
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              
              {/* Email */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px', background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ padding: '10px', borderRadius: '10px', background: 'rgba(79, 70, 229, 0.1)', color: 'var(--accent-primary)' }}>
                    <Mail size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>EMAIL ADDRESS</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                      {resumeData.personalInfo.email}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(resumeData.personalInfo.email, 'email')}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: copiedField === 'email' ? '#059669' : 'var(--text-muted)' }}
                >
                  {copiedField === 'email' ? <Check size={18} /> : <Copy size={18} />}
                </button>
              </div>

              {/* Phone */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px', background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ padding: '10px', borderRadius: '10px', background: 'rgba(8, 145, 178, 0.1)', color: 'var(--accent-cyan)' }}>
                    <Phone size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>PHONE NUMBER</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                      {resumeData.personalInfo.phone}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(resumeData.personalInfo.phone, 'phone')}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: copiedField === 'phone' ? '#059669' : 'var(--text-muted)' }}
                >
                  {copiedField === 'phone' ? <Check size={18} /> : <Copy size={18} />}
                </button>
              </div>

              {/* Location */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                <div style={{ padding: '10px', borderRadius: '10px', background: 'rgba(5, 150, 105, 0.1)', color: '#059669' }}>
                  <MapPin size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>LOCATION</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {resumeData.personalInfo.location}
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Quick PDF Report Download Box */}
          <div className="glass-card" style={{ padding: '24px', borderRadius: '20px', background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.05) 0%, rgba(8, 145, 178, 0.05) 100%)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <ShieldCheck size={20} style={{ color: 'var(--accent-primary)' }} />
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>Security Audit Documentation</h4>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              Access the complete PDF audit report & resume hosted on Google Drive.
            </p>
            <a
              href={resumeData.personalInfo.reportUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ width: '100%' }}
            >
              <FileText size={16} /> Download Resume & Audit PDF <ExternalLink size={14} />
            </a>
          </div>

        </div>

        {/* Right Column: Contact Form */}
        <div className="glass-card" style={{ padding: '32px', borderRadius: '24px' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '8px', color: 'var(--text-primary)' }}>
            Send a Direct Message
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
            Fill in your query and Abhinav will respond promptly.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                padding: '32px',
                textAlign: 'center',
                background: 'rgba(5, 150, 105, 0.1)',
                borderRadius: '16px',
                border: '1px solid rgba(5, 150, 105, 0.3)',
                color: '#047857'
              }}
            >
              <CheckCircle2 size={48} style={{ margin: '0 auto 16px' }} />
              <h4 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '8px' }}>
                Message Transmitted Successfully!
              </h4>
              <p style={{ fontSize: '0.9rem' }}>
                Thank you for reaching out. Abhinav will get back to you shortly.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. John Doe"
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
                  placeholder="john@company.com"
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
                  placeholder="VAPT Security Audit / Hiring Inquiry"
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
                  placeholder="Type your message details here..."
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

              <button type="submit" className="btn-primary" style={{ width: '100%', padding: '14px' }}>
                <Send size={18} /> Transmit Message
              </button>
            </form>
          )}
        </div>

      </div>

    </section>
  );
}
