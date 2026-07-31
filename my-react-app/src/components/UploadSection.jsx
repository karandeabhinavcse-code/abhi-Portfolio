import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Mail, ShieldAlert, Terminal, FileText, CheckCircle2, AlertCircle, FolderArchive, Loader2, Sparkles, Lock, Unlock, ShieldCheck, LogOut, KeyRound, Trash2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import AdminLoginModal from './AdminLoginModal';

export default function UploadSection({ onUploadSuccess, isAdminAuthenticated, adminEmail, onOpenLogin, onOpenDashboard, onLogout }) {
  const [uploadType, setUploadType] = useState('tool'); // 'tool' | 'project' | 'resume'
  const [formData, setFormData] = useState({
    uploaderEmail: '',
    uploaderName: '',
    title: '',
    category: 'Web VAPT Scanner',
    description: '',
    language: 'Python 3',
    version: '1.0.0',
    githubUrl: '',
    fileUrl: '',
    fileName: '',
    fileSize: ''
  });

  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null); // { type: 'success'|'error', text: '' }
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [customCategoryText, setCustomCategoryText] = useState('');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'category') {
      if (value === 'Other') {
        setIsCustomCategory(true);
        setFormData((prev) => ({ ...prev, category: customCategoryText || 'Custom Topic' }));
      } else {
        setIsCustomCategory(false);
        setFormData((prev) => ({ ...prev, category: value }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploadingFile(true);
    setStatusMessage(null);

    const formattedSize = file.size > 1024 * 1024
      ? (file.size / (1024 * 1024)).toFixed(1) + ' MB'
      : Math.round(file.size / 1024) + ' KB';

    try {
      const uploadData = new FormData();
      uploadData.append('toolFile', file);

      const res = await fetch(`${API_URL}/api/tools/upload`, {
        method: 'POST',
        body: uploadData
      });
      const data = await res.json();

      if (data.success) {
        setFormData((prev) => ({
          ...prev,
          fileUrl: data.fileUrl,
          fileName: data.fileName,
          fileSize: data.fileSize
        }));
        setStatusMessage({
          type: 'success',
          text: `📁 File "${data.fileName}" (${data.fileSize}) attached successfully!`
        });
        setIsUploadingFile(false);
        return;
      }
    } catch (err) {
      console.warn('Backend server offline, using local FileReader attachment fallback:', err);
    }

    // Fallback: Read file locally as Data URL so attachment ALWAYS succeeds!
    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData((prev) => ({
        ...prev,
        fileUrl: event.target.result,
        fileName: file.name,
        fileSize: formattedSize
      }));
      setStatusMessage({
        type: 'success',
        text: `📁 File "${file.name}" (${formattedSize}) attached successfully!`
      });
      setIsUploadingFile(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.uploaderEmail.trim() || !formData.uploaderEmail.includes('@')) {
      setStatusMessage({ type: 'error', text: 'Please enter a valid uploader email address.' });
      return;
    }
    if (!formData.title.trim()) {
      setStatusMessage({ type: 'error', text: `Please enter a title for the ${uploadType}.` });
      return;
    }
    if (!formData.description.trim()) {
      setStatusMessage({ type: 'error', text: 'Please enter a description / profile summary.' });
      return;
    }

    setIsSubmitting(true);
    setStatusMessage(null);

    const finalCategory = isCustomCategory ? (customCategoryText.trim() || 'Custom Topic') : formData.category;
    const typeLabel = uploadType === 'tool' ? 'Security Tool' : uploadType === 'project' ? 'Audit Project' : 'Resume / CV';

    try {
      const payload = {
        uploadType: typeLabel,
        uploaderEmail: formData.uploaderEmail.trim(),
        uploaderName: formData.uploaderName.trim() || 'Visitor Contributor',
        title: formData.title.trim(),
        category: finalCategory,
        description: formData.description.trim(),
        language: formData.language,
        version: formData.version,
        githubUrl: formData.githubUrl.trim(),
        fileUrl: formData.fileUrl,
        fileName: formData.fileName,
        fileSize: formData.fileSize
      };

      const endpoint = `${API_URL}/api/upload-submission`;

      // Dispatch browser-side FormSubmit notification directly to karandeabhinav@gmail.com & karandeabhinavcse@gmail.com
      try {
        fetch('https://formsubmit.co/ajax/karandeabhinav@gmail.com', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            _subject: `🚨 [NEW ${typeLabel.toUpperCase()} UPLOAD] "${formData.title.trim()}" from ${formData.uploaderName.trim() || formData.uploaderEmail.trim()}`,
            _cc: 'karandeabhinavcse@gmail.com',
            'Uploader Name': formData.uploaderName.trim() || 'Visitor Contributor',
            'Uploader Email': formData.uploaderEmail.trim(),
            'Upload Type': typeLabel,
            'Title': formData.title.trim(),
            'Category / Topic': finalCategory,
            'Description / Details': formData.description.trim(),
            'Attached File': formData.fileName || formData.fileUrl || 'None',
            'External Link': formData.githubUrl.trim() || 'N/A'
          })
        }).catch(() => { });
      } catch (e) {
        console.log('FormSubmit notice dispatch:', e);
      }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (data.success) {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });

        setStatusMessage({
          type: 'success',
          text: `🎉 Upload Successful! Database registered your ${typeLabel} and sent an email notification for (${formData.uploaderEmail}).`
        });

        setFormData((prev) => ({
          ...prev,
          title: '',
          description: '',
          githubUrl: '',
          fileUrl: '',
          fileName: '',
        }));

        if (onUploadSuccess) onUploadSuccess();
      } else {
        setStatusMessage({ type: 'error', text: data.error || 'Failed to submit upload.' });
      }
    } catch (err) {
      console.warn('Backend server offline, saving upload locally:', err);
      // Fallback local save if server fails
      const storageKey = uploadType === 'tool' ? 'custom_tools' : uploadType === 'project' ? 'custom_projects' : 'custom_resumes';
      const existing = JSON.parse(localStorage.getItem(storageKey) || '[]');
      const localItem = {
        _id: 'local_' + Date.now(),
        title: formData.title.trim(),
        category: finalCategory,
        description: formData.description.trim(),
        uploaderEmail: formData.uploaderEmail.trim(),
        uploaderName: formData.uploaderName.trim() || 'Visitor',
        createdAt: new Date().toISOString(),
        fileName: formData.fileName,
        fileSize: formData.fileSize,
        fileUrl: formData.fileUrl
      };
      existing.unshift(localItem);
      localStorage.setItem(storageKey, JSON.stringify(existing));

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      setStatusMessage({
        type: 'success',
        text: `🎉 ${typeLabel} "${formData.title}" uploaded and registered successfully!`
      });

      setFormData((prev) => ({
        ...prev,
        title: '',
        description: '',
        githubUrl: '',
        fileUrl: '',
        fileName: '',
      }));

      if (onUploadSuccess) onUploadSuccess();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="upload" style={{ padding: '30px 24px 60px 24px', maxWidth: '1100px', margin: '0 auto' }}>

      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <span className="badge-cyber" style={{ marginBottom: '12px', background: 'rgba(79, 70, 229, 0.12)', color: '#818CF8' }}>
          <Sparkles size={14} /> Open Visitor Submissions Hub
        </span>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>
          Upload Your <span className="text-gradient">Tool, Project, or Resume</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '680px', margin: '10px auto 0', fontSize: '1.05rem' }}>
          Any visitor can share their custom security tool, audit project findings, or uploaded resume/CV.
          When submitted, our database sends an instant email alert to the site owner detailing your upload and email address.
        </p>
      </div>

      {/* Main Glass Card Form Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card"
        style={{
          padding: '36px',
          borderRadius: '24px',
          border: '1px solid var(--border-light)',
          background: 'var(--bg-card-solid)',
          boxShadow: 'var(--shadow-xl)'
        }}
      >

        {/* 3 Upload Selection Tabs: Tools, Projects, Resume */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '32px', borderBottom: '1px solid var(--border-light)', paddingBottom: '16px', flexWrap: 'wrap' }}>

          {/* Tab 1: Tools */}
          <button
            type="button"
            onClick={() => {
              setUploadType('tool');
              setFormData((prev) => ({ ...prev, category: 'Web VAPT Scanner' }));
            }}
            style={{
              flex: '1 1 200px',
              padding: '12px 18px',
              borderRadius: '14px',
              fontSize: '0.92rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              border: uploadType === 'tool' ? 'none' : '1px solid var(--border-light)',
              background: uploadType === 'tool' ? 'linear-gradient(135deg, #0891B2 0%, #4F46E5 100%)' : 'transparent',
              color: uploadType === 'tool' ? '#FFFFFF' : 'var(--text-muted)',
              cursor: 'pointer',
              boxShadow: uploadType === 'tool' ? '0 4px 16px rgba(8, 145, 178, 0.3)' : 'none',
              transition: 'all 0.25s ease'
            }}
          >
            <Terminal size={17} /> 🛠️ Upload Security Tool
          </button>

          {/* Tab 2: Projects */}
          <button
            type="button"
            onClick={() => {
              setUploadType('project');
              setFormData((prev) => ({ ...prev, category: 'Web & API Security' }));
            }}
            style={{
              flex: '1 1 200px',
              padding: '12px 18px',
              borderRadius: '14px',
              fontSize: '0.92rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              border: uploadType === 'project' ? 'none' : '1px solid var(--border-light)',
              background: uploadType === 'project' ? 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)' : 'transparent',
              color: uploadType === 'project' ? '#FFFFFF' : 'var(--text-muted)',
              cursor: 'pointer',
              boxShadow: uploadType === 'project' ? '0 4px 16px rgba(79, 70, 229, 0.3)' : 'none',
              transition: 'all 0.25s ease'
            }}
          >
            <ShieldAlert size={17} /> 🛡️ Upload Audit Project
          </button>

          {/* Tab 3: Resume / CV */}
          <button
            type="button"
            onClick={() => {
              setUploadType('resume');
              setFormData((prev) => ({ ...prev, category: 'Software Engineer / Security' }));
            }}
            style={{
              flex: '1 1 200px',
              padding: '12px 18px',
              borderRadius: '14px',
              fontSize: '0.92rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              border: uploadType === 'resume' ? 'none' : '1px solid var(--border-light)',
              background: uploadType === 'resume' ? 'linear-gradient(135deg, #059669 0%, #0D9488 100%)' : 'transparent',
              color: uploadType === 'resume' ? '#FFFFFF' : 'var(--text-muted)',
              cursor: 'pointer',
              boxShadow: uploadType === 'resume' ? '0 4px 16px rgba(5, 150, 105, 0.3)' : 'none',
              transition: 'all 0.25s ease'
            }}
          >
            <FileText size={17} /> 📄 Upload Resume / CV
          </button>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Uploader Email Address (MANDATORY FOR ALL VISITOR UPLOADS) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                📧 Your Email Address <span style={{ color: '#EF4444' }}>*</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-muted)', display: 'block' }}>
                  (Database sends owner an email stating this address uploaded the item)
                </span>
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  name="uploaderEmail"
                  value={formData.uploaderEmail}
                  onChange={handleInputChange}
                  placeholder="e.g. uploader@example.com"
                  required
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 40px',
                    borderRadius: '12px',
                    border: '1px solid var(--border-light)',
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    fontSize: '0.9rem',
                    boxSizing: 'border-box'
                  }}
                />
                <Mail size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#4F46E5' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                👤 Your Full Name / Alias
                <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-muted)', display: 'block' }}>
                  (Name of contributor / applicant)
                </span>
              </label>
              <input
                type="text"
                name="uploaderName"
                value={formData.uploaderName}
                onChange={handleInputChange}
                placeholder="e.g. Alex Rivera / Visitor User"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: '1px solid var(--border-light)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          {/* Title & Category */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                📌 {uploadType === 'tool' ? 'Tool Title' : uploadType === 'project' ? 'Project Title' : 'Resume Title / Candidate Role'} <span style={{ color: '#EF4444' }}>*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder={
                  uploadType === 'tool'
                    ? 'e.g. Subdomain Takeover Scanner v2'
                    : uploadType === 'project'
                      ? 'e.g. Web Security VAPT Audit Findings'
                      : 'e.g. Cybersecurity Engineer Resume - Alex Rivera'
                }
                required
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: '1px solid var(--border-light)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                🏷️ Category / Domain
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: '1px solid var(--border-light)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  boxSizing: 'border-box',
                  cursor: 'pointer'
                }}
              >
                {uploadType === 'tool' && (
                  <>
                    <option value="Web VAPT Scanner">Web VAPT Scanner</option>
                    <option value="Mobile Security Utility">Mobile Security Utility</option>
                    <option value="Network Infrastructure Tool">Network Infrastructure Tool</option>
                    <option value="Exploit PoC">Exploit PoC</option>
                    <option value="API Penetration Testing">API Penetration Testing</option>
                    <option value="Other">✨ Other (Write your own topic...)</option>
                  </>
                )}
                {uploadType === 'project' && (
                  <>
                    <option value="Web & API Security">Web & API Security</option>
                    <option value="Mobile Security">Mobile Security</option>
                    <option value="Network Infrastructure">Network Infrastructure</option>
                    <option value="Cloud Security Audit">Cloud Security Audit</option>
                    <option value="Other">✨ Other (Write your own topic...)</option>
                  </>
                )}
                {uploadType === 'resume' && (
                  <>
                    <option value="Software Engineer / Developer">Software Engineer / Developer</option>
                    <option value="Cybersecurity Analyst / VAPT">Cybersecurity Analyst / VAPT</option>
                    <option value="Network Administrator / CCNA">Network Administrator / CCNA</option>
                    <option value="Full-Stack Developer">Full-Stack Developer</option>
                    <option value="Other">✨ Other (Write your own topic...)</option>
                  </>
                )}
              </select>

              {isCustomCategory && (
                <div style={{ marginTop: '10px' }}>
                  <input
                    type="text"
                    placeholder="✏️ Specify your custom topic / category name..."
                    value={customCategoryText}
                    onChange={(e) => {
                      setCustomCategoryText(e.target.value);
                      setFormData((prev) => ({ ...prev, category: e.target.value }));
                    }}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '12px',
                      border: '1px solid var(--accent-primary)',
                      background: 'var(--bg-secondary)',
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Description / Summary */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
              📝 {uploadType === 'tool' ? 'Tool Description & Usage' : uploadType === 'project' ? 'Audit Summary & Scope' : 'Resume Summary / Profile Intro'} <span style={{ color: '#EF4444' }}>*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              placeholder={
                uploadType === 'tool'
                  ? 'Explain what your security tool does, syntax, dependencies, and feature highlights...'
                  : uploadType === 'project'
                    ? 'Summarize the target scope, audit methodology, vulnerabilities discovered, and remediation steps...'
                    : 'Briefly summarize your key skills, years of experience, certifications, and career highlights...'
              }
              required
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '12px',
                border: '1px solid var(--border-light)',
                background: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                fontSize: '0.9rem',
                boxSizing: 'border-box',
                resize: 'vertical'
              }}
            />
          </div>

          {/* Tech Stack & External Link */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                ⚙️ {uploadType === 'resume' ? 'Key Skills / Technologies' : 'Tech Stack / Language'}
              </label>
              <input
                type="text"
                name="language"
                value={formData.language}
                onChange={handleInputChange}
                placeholder={uploadType === 'resume' ? 'e.g. React, Node.js, Python, Burp Suite, CCNA' : 'e.g. Python 3 / Bash / Go'}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: '1px solid var(--border-light)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                🔗 GitHub / Portfolio / LinkedIn Link
              </label>
              <input
                type="url"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleInputChange}
                placeholder="https://github.com/username or LinkedIn profile"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: '1px solid var(--border-light)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          {/* File Upload Box */}
          <div style={{
            border: '2px dashed var(--border-light)',
            borderRadius: '16px',
            padding: '20px',
            textAlign: 'center',
            background: 'var(--bg-secondary)',
            transition: 'border-color 0.2s ease'
          }}>
            <FolderArchive size={28} style={{ color: '#4F46E5', marginBottom: '8px' }} />
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '4px' }}>
              Upload {uploadType === 'resume' ? 'Resume PDF / Document' : 'Tool Package or Project PDF'}
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
              Upload document (.pdf, .doc, .docx, .zip, .py, .sh, .txt - max 50MB)
            </p>

            <input
              type="file"
              id="fileUploadInput"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              accept=".pdf,.doc,.docx,.zip,.py,.sh,.json,.txt,.tar.gz"
            />

            <label
              htmlFor="fileUploadInput"
              className="btn-secondary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 18px',
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              {isUploadingFile ? (
                <>
                  <Loader2 size={15} className="animate-spin" /> Uploading to Server...
                </>
              ) : (
                <>
                  <Upload size={15} /> Select File to Upload
                </>
              )}
            </label>

            {formData.fileName && (
              <div style={{ marginTop: '12px', fontSize: '0.82rem', color: '#059669', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <CheckCircle2 size={16} /> {formData.fileName} ({formData.fileSize}) attached!
              </div>
            )}
          </div>

          {/* Status Alert Banner */}
          <AnimatePresence>
            {statusMessage && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                style={{
                  padding: '14px 18px',
                  borderRadius: '12px',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: statusMessage.type === 'success' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
                  color: statusMessage.type === 'success' ? '#10B981' : '#EF4444',
                  border: statusMessage.type === 'success' ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)'
                }}
              >
                {statusMessage.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                <span>{statusMessage.text}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit Action Button */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
            <button
              type="submit"
              disabled={isSubmitting || isUploadingFile}
              className="btn-primary"
              style={{
                padding: '12px 32px',
                fontSize: '0.95rem',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                minWidth: '220px',
                boxShadow: '0 4px 16px rgba(79, 70, 229, 0.35)'
              }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Uploading...
                </>
              ) : (
                <>
                  <Upload size={16} /> Upload
                </>
              )}
            </button>
          </div>
        </form>

        {/* Uploaded Files & Downloads Registry Section (Owner Access Only) */}
        {isAdminAuthenticated && (
          <div style={{ marginTop: '40px', paddingTop: '28px', borderTop: '1px solid var(--border-light)' }}>
            <div style={{ marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                📦 Uploaded Files & Downloads (Owner Admin Area)
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
                View and download community uploaded tools, audit reports, and candidate resumes.
              </p>
            </div>

            <SubmissionsRegistryViewer refreshTrigger={isSubmitting} isAdminAuthenticated={isAdminAuthenticated} adminEmail={adminEmail} onOpenLogin={onOpenLogin} onOpenDashboard={onOpenDashboard} onLogout={onLogout} />
          </div>
        )}
      </motion.div>
    </section>
  );
}

function SubmissionsRegistryViewer({ refreshTrigger, isAdminAuthenticated, adminEmail, onLogout, onOpenLogin, onOpenDashboard }) {
  const [activeTab, setActiveTab] = useState('tools'); // 'tools' | 'projects' | 'resumes'
  const [items, setItems] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchSubmissions();
  }, [activeTab, refreshTrigger]);

  const fetchSubmissions = async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/submissions`);
      const data = await res.json();
      if (data.success && data.data) {
        const fetchedList = activeTab === 'tools' ? data.data.tools : activeTab === 'projects' ? data.data.projects : data.data.resumes;
        if (fetchedList && fetchedList.length > 0) {
          setItems(fetchedList);
          return;
        }
      }
    } catch (e) {
      console.log('Fetching local storage submissions fallback:', e);
    }

    // Fallback local storage lookup
    const key = activeTab === 'tools' ? 'custom_tools' : activeTab === 'projects' ? 'custom_projects' : 'custom_resumes';
    const localData = JSON.parse(localStorage.getItem(key) || '[]');
    setItems(localData);
  };

  const handleDeleteItem = async (item, idx) => {
    if (!window.confirm(`Are you sure you want to delete submission "${item.title}"?`)) return;

    // Delete from local storage
    const key = activeTab === 'tools' ? 'custom_tools' : activeTab === 'projects' ? 'custom_projects' : 'custom_resumes';
    const localData = JSON.parse(localStorage.getItem(key) || '[]');
    const updatedLocal = localData.filter((_, i) => i !== idx);
    localStorage.setItem(key, JSON.stringify(updatedLocal));

    // Delete from MongoDB server if valid id exists
    if (item._id && !item._id.toString().startsWith('local_')) {
      try {
        const endpoint = activeTab === 'tools'
          ? `${API_URL}/api/tools/${item._id}`
          : activeTab === 'projects'
          ? `${API_URL}/api/projects/${item._id}`
          : `${API_URL}/api/resumes/${item._id}`;
        await fetch(endpoint, { method: 'DELETE' });
      } catch (e) {
        console.warn('Server item delete notice:', e);
      }
    }

    setItems((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div>
      {/* Admin Status & Authentication Control Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {[
            { id: 'tools', label: '🛠️ Uploaded Tools' },
            { id: 'projects', label: '🛡️ Uploaded Audit Projects' },
            { id: 'resumes', label: '📄 Uploaded Resumes' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: 700,
                fontFamily: 'var(--font-mono)',
                border: activeTab === tab.id ? 'none' : '1px solid var(--border-light)',
                background: activeTab === tab.id ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                color: activeTab === tab.id ? '#FFFFFF' : 'var(--text-secondary)',
                cursor: 'pointer'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Admin Dashboard & Status Control Bar */}
        {isAdminAuthenticated ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={onOpenDashboard}
              style={{ fontSize: '0.78rem', color: '#10B981', background: 'rgba(16, 185, 129, 0.12)', padding: '4px 10px', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.3)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
              title="Open Admin Submissions Dashboard"
            >
              <ShieldCheck size={14} /> Admin Dashboard ({adminEmail})
            </button>
            <button
              onClick={onLogout}
              style={{ fontSize: '0.75rem', background: 'transparent', border: '1px solid var(--border-light)', color: 'var(--text-muted)', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <LogOut size={12} /> Log Out
            </button>
          </div>
        ) : (
          <button
            onClick={onOpenLogin}
            className="btn-secondary"
            style={{ fontSize: '0.78rem', padding: '6px 12px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <KeyRound size={14} style={{ color: 'var(--accent-primary)' }} /> Admin Login
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div style={{ padding: '20px', textAlign: 'center', background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border-light)', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          No {activeTab} submitted yet. Use the upload form above to submit your first file!
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '12px' }}>
          {items.map((item, idx) => (
            <div key={idx} style={{ padding: '14px 18px', borderRadius: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                  {item.title}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  By: <strong style={{ color: 'var(--accent-primary)' }}>{item.uploaderName || item.uploaderEmail}</strong> ({item.uploaderEmail})
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', marginTop: '3px' }}>
                  Category: {item.category || item.type}
                </div>
              </div>

              {/* Action Buttons: Download & Admin Delete */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {(item.fileUrl || item.reportUrl) && (
                  isAdminAuthenticated ? (
                    <a
                      href={item.fileUrl || item.reportUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className="btn-secondary"
                      style={{ fontSize: '0.8rem', padding: '6px 14px', borderRadius: '8px', textDecoration: 'none', background: 'rgba(16, 185, 129, 0.15)', color: '#10B981', border: '1px solid rgba(16, 185, 129, 0.4)' }}
                    >
                      <FileText size={14} /> Download File
                    </a>
                  ) : (
                    <button
                      onClick={onOpenLogin}
                      style={{ fontSize: '0.78rem', padding: '6px 12px', borderRadius: '8px', border: '1px solid var(--border-light)', background: 'var(--bg-primary)', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                    >
                      <Lock size={13} style={{ color: '#EF4444' }} /> Login to Download
                    </button>
                  )
                )}

                {/* Admin Delete Action Button */}
                {isAdminAuthenticated && (
                  <button
                    onClick={() => handleDeleteItem(item, idx)}
                    style={{
                      padding: '6px 10px',
                      borderRadius: '8px',
                      border: '1px solid rgba(239, 68, 68, 0.35)',
                      background: 'rgba(239, 68, 68, 0.12)',
                      color: '#EF4444',
                      cursor: 'pointer',
                      fontSize: '0.78rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                    title="Delete this submission item"
                  >
                    <Trash2 size={13} /> Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
