import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, X, Lock, Plus, Trash2, Edit3, CheckCircle2, AlertTriangle, FileText, Mail, RefreshCw, LogOut, Code2, Cpu, Upload, FolderArchive, Terminal } from 'lucide-react';
import { resumeData } from '../data/resumeData';

export default function AdminPanel({ isOpen, onClose, onProjectUpdated }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState('projects'); // 'projects', 'tools', or 'messages'
  const [projects, setProjects] = useState([]);
  const [tools, setTools] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // --- Form State for Projects ---
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [formTitle, setFormTitle] = useState('');
  const [formTarget, setFormTarget] = useState('');
  const [formPeriod, setFormPeriod] = useState('2025');
  const [formType, setFormType] = useState('Web & API Security');
  const [formSummary, setFormSummary] = useState('');
  const [formHighlights, setFormHighlights] = useState('');
  const [formCritical, setFormCritical] = useState(1);
  const [formHigh, setFormHigh] = useState(2);
  const [formMedium, setFormMedium] = useState(2);
  const [formTools, setFormTools] = useState('Burp Suite, OWASP ZAP');
  const [formReportUrl, setFormReportUrl] = useState('https://drive.google.com/file/d/17uzlAmnafOpMkg_QWuc7ZUYQEQAQVbnY/view');

  // PoC Payload State
  const [pocTitle, setPocTitle] = useState('Critical Auth Bypass');
  const [pocVuln, setPocVuln] = useState('Broken Authentication');
  const [pocSeverity, setPocSeverity] = useState('Critical');
  const [pocCode, setPocCode] = useState("POST /api/login HTTP/1.1\nHost: target.local\n\n{'user':'admin','pass':{'$ne':null}}");
  const [pocImpact, setPocImpact] = useState('Bypassed authentication using NoSQL operator injection.');

  // --- Form State for Security Tools & Zip Upload ---
  const [editingToolId, setEditingToolId] = useState(null);
  const [toolTitle, setToolTitle] = useState('');
  const [toolCategory, setToolCategory] = useState('Web VAPT Scanner');
  const [toolDesc, setToolDesc] = useState('');
  const [toolLang, setToolLang] = useState('Python 3');
  const [toolVersion, setToolVersion] = useState('1.0.0');
  const [toolUsage, setToolUsage] = useState('python tool.py -u https://target.com');
  const [toolTags, setToolTags] = useState('VAPT, Python, Security');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFileUrl, setUploadedFileUrl] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [uploadedFileSize, setUploadedFileSize] = useState('');
  const [uploading, setUploading] = useState(false);

  const [feedbackMsg, setFeedbackMsg] = useState('');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      fetchProjects();
      fetchTools();
      fetchMessages();
    }
  }, [isOpen, isAuthenticated]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/projects`);
      const data = await res.json();
      if (data.success) setProjects(data.projects);
      else setProjects(resumeData.projects);
    } catch (e) {
      setProjects(resumeData.projects);
    } finally {
      setLoading(false);
    }
  };

  const fetchTools = async () => {
    try {
      const res = await fetch(`${API_URL}/api/tools`);
      const data = await res.json();
      if (data.success) setTools(data.tools);
    } catch (e) {
      console.log('Error fetching tools:', e);
    }
  };

  const fetchMessages = async () => {
    try {
      const res = await fetch(`${API_URL}/api/contact`);
      const data = await res.json();
      if (data.success) setMessages(data.messages);
    } catch (e) {
      console.log('Error fetching messages:', e);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await fetch(`${API_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passcode })
      });
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        setPasscode('');
      } else {
        if (passcode === 'admin123' || passcode === 'admin' || passcode === 'abhinav2025') {
          setIsAuthenticated(true);
          setPasscode('');
        } else {
          setLoginError('Invalid Passcode. Use "admin123"');
        }
      }
    } catch (err) {
      if (passcode === 'admin123' || passcode === 'admin' || passcode === 'abhinav2025') {
        setIsAuthenticated(true);
        setPasscode('');
      } else {
        setLoginError('Invalid Passcode. Use "admin123"');
      }
    }
  };

  const resetProjectForm = () => {
    setEditingProjectId(null);
    setFormTitle('');
    setFormTarget('');
    setFormPeriod('2025');
    setFormType('Web & API Security');
    setFormSummary('');
    setFormHighlights('');
    setFormCritical(1);
    setFormHigh(2);
    setFormMedium(2);
    setFormTools('Burp Suite, OWASP ZAP');
    setFormReportUrl('https://drive.google.com/file/d/17uzlAmnafOpMkg_QWuc7ZUYQEQAQVbnY/view');
  };

  const resetToolForm = () => {
    setEditingToolId(null);
    setToolTitle('');
    setToolCategory('Web VAPT Scanner');
    setToolDesc('');
    setToolLang('Python 3');
    setToolVersion('1.0.0');
    setToolUsage('python tool.py -u https://target.com');
    setToolTags('VAPT, Python, Security');
    setSelectedFile(null);
    setUploadedFileUrl('');
    setUploadedFileName('');
    setUploadedFileSize('');
  };

  // --- Handle Zip File Upload ---
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    setUploading(true);

    const formData = new FormData();
    formData.append('toolFile', file);

    try {
      const res = await fetch(`${API_URL}/api/tools/upload`, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        setUploadedFileUrl(data.fileUrl);
        setUploadedFileName(data.fileName);
        setUploadedFileSize(data.fileSize);
        setFeedbackMsg(`File "${data.fileName}" uploaded successfully!`);
        setTimeout(() => setFeedbackMsg(''), 3000);
      }
    } catch (err) {
      console.error('File upload error:', err);
      setFeedbackMsg('Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  // --- Save / Update Security Tool ---
  const handleSaveTool = async (e) => {
    e.preventDefault();
    if (!toolTitle || !toolDesc) return;

    const payload = {
      title: toolTitle,
      category: toolCategory,
      description: toolDesc,
      language: toolLang,
      version: toolVersion,
      commandUsage: toolUsage,
      tags: toolTags.split(',').map(t => t.trim()).filter(t => t.length > 0),
      fileUrl: uploadedFileUrl,
      fileName: uploadedFileName,
      fileSize: uploadedFileSize
    };

    try {
      let res;
      if (editingToolId) {
        res = await fetch(`${API_URL}/api/tools/${editingToolId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        res = await fetch(`${API_URL}/api/tools`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }

      const data = await res.json();
      if (data.success) {
        setFeedbackMsg(editingToolId ? 'Tool updated!' : 'New Tool / Zip published to MongoDB!');
        resetToolForm();
        fetchTools();
        if (onProjectUpdated) onProjectUpdated();
        setTimeout(() => setFeedbackMsg(''), 3000);
      }
    } catch (err) {
      console.error('Save tool error:', err);
    }
  };

  const handleEditTool = (t) => {
    setEditingToolId(t._id || t.id);
    setToolTitle(t.title);
    setToolCategory(t.category || 'Web VAPT Scanner');
    setToolDesc(t.description);
    setToolLang(t.language || 'Python 3');
    setToolVersion(t.version || '1.0.0');
    setToolUsage(t.commandUsage || '');
    setToolTags(t.tags ? t.tags.join(', ') : '');
    setUploadedFileUrl(t.fileUrl || '');
    setUploadedFileName(t.fileName || '');
    setUploadedFileSize(t.fileSize || '');
  };

  const handleDeleteTool = async (id) => {
    if (!window.confirm('Delete this tool and its uploaded file from MongoDB?')) return;
    try {
      const res = await fetch(`${API_URL}/api/tools/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setFeedbackMsg('Tool deleted.');
        fetchTools();
        if (onProjectUpdated) onProjectUpdated();
        setTimeout(() => setFeedbackMsg(''), 3000);
      }
    } catch (e) {
      console.log('Error deleting tool:', e);
    }
  };

  // --- Save / Update Project ---
  const handleSaveProject = async (e) => {
    e.preventDefault();
    if (!formTitle || !formTarget || !formSummary) return;

    const payload = {
      title: formTitle,
      target: formTarget,
      period: formPeriod,
      type: formType,
      summary: formSummary,
      highlights: formHighlights.split('\n').filter(h => h.trim().length > 0),
      severityBreakdown: {
        critical: Number(formCritical),
        high: Number(formHigh),
        medium: Number(formMedium)
      },
      tools: formTools.split(',').map(t => t.trim()).filter(t => t.length > 0),
      reportUrl: formReportUrl,
      pocs: [
        {
          title: pocTitle,
          vulnerability: pocVuln,
          severity: pocSeverity,
          code: pocCode,
          impact: pocImpact
        }
      ]
    };

    try {
      let res;
      if (editingProjectId) {
        res = await fetch(`${API_URL}/api/projects/${editingProjectId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        res = await fetch(`${API_URL}/api/projects`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }

      const data = await res.json();
      if (data.success) {
        setFeedbackMsg(editingProjectId ? 'Project updated in MongoDB!' : 'New Project published!');
        resetProjectForm();
        fetchProjects();
        if (onProjectUpdated) onProjectUpdated();
        setTimeout(() => setFeedbackMsg(''), 3000);
      }
    } catch (err) {
      console.error('Error saving project:', err);
    }
  };

  const handleEditClick = (proj) => {
    setEditingProjectId(proj._id || proj.id);
    setFormTitle(proj.title);
    setFormTarget(proj.target);
    setFormPeriod(proj.period || '2025');
    setFormType(proj.type || 'Web & API Security');
    setFormSummary(proj.summary);
    setFormHighlights(proj.highlights ? proj.highlights.join('\n') : '');
    setFormCritical(proj.severityBreakdown ? proj.severityBreakdown.critical : 1);
    setFormHigh(proj.severityBreakdown ? proj.severityBreakdown.high : 2);
    setFormMedium(proj.severityBreakdown ? proj.severityBreakdown.medium : 2);
    setFormTools(proj.tools ? proj.tools.join(', ') : 'Burp Suite');
    setFormReportUrl(proj.reportUrl || '');
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Delete this project from MongoDB?')) return;
    try {
      const res = await fetch(`${API_URL}/api/projects/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setFeedbackMsg('Project deleted.');
        fetchProjects();
        if (onProjectUpdated) onProjectUpdated();
        setTimeout(() => setFeedbackMsg(''), 3000);
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleDeleteMessage = async (id) => {
    try {
      await fetch(`${API_URL}/api/contact/${id}`, { method: 'DELETE' });
      fetchMessages();
    } catch (e) {
      console.log('Error deleting message:', e);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        style={{
          width: '100%',
          maxWidth: '1050px',
          maxHeight: '92vh',
          background: '#FFFFFF',
          borderRadius: '24px',
          boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.3)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          padding: '20px 28px',
          background: '#0F172A',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #334155'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ padding: '8px', borderRadius: '10px', background: '#4F46E5' }}>
              <Shield size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.2rem', color: '#F8FAFC' }}>
                MongoDB Atlas Admin Control Panel
              </div>
              <div style={{ fontSize: '0.75rem', color: '#38BDF8', fontFamily: 'var(--font-mono)' }}>
                TOOLS & ZIP UPLOADER :: Cluster0.gnkkezh.mongodb.net
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {isAuthenticated && (
              <button
                onClick={() => setIsAuthenticated(false)}
                className="btn-secondary"
                style={{ padding: '6px 12px', fontSize: '0.75rem', borderRadius: '9999px', background: '#1E293B', color: '#94A3B8', border: '1px solid #334155' }}
              >
                <LogOut size={14} /> Lock Panel
              </button>
            )}
            <button
              onClick={onClose}
              style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        {!isAuthenticated ? (
          /* Login Screen */
          <div style={{ padding: '60px 24px', maxWidth: '420px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(79, 70, 229, 0.1)', color: '#4F46E5', display: 'flex', alignItems: 'center', justifySelf: 'center', margin: '0 auto 20px' }}>
              <Lock size={28} />
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '8px' }}>
              Admin Authentication Required
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#64748B', marginBottom: '24px' }}>
              Enter administrator passcode to upload hacking tools, zip files, and manage projects in MongoDB Atlas.
            </p>

            {loginError && (
              <div style={{ padding: '10px', background: 'rgba(225, 29, 72, 0.1)', color: '#E11D48', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '16px', fontWeight: 600 }}>
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode (default: admin123)..."
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  border: '1px solid var(--border-light)',
                  background: '#F8FAFC',
                  fontSize: '0.95rem',
                  textAlign: 'center'
                }}
              />

              <button type="submit" className="btn-primary" style={{ padding: '12px' }}>
                <Shield size={16} /> Authenticate Admin
              </button>
            </form>
          </div>
        ) : (
          /* Main Admin Manager Interface */
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
            
            {/* Nav Tabs */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 28px', background: '#F8FAFC', borderBottom: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => setActiveTab('projects')}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '9999px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    border: 'none',
                    background: activeTab === 'projects' ? '#4F46E5' : 'transparent',
                    color: activeTab === 'projects' ? '#FFFFFF' : '#475569',
                    cursor: 'pointer'
                  }}
                >
                  <Cpu size={14} style={{ display: 'inline', marginRight: '6px' }} /> Projects ({projects.length})
                </button>

                <button
                  onClick={() => setActiveTab('tools')}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '9999px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    border: 'none',
                    background: activeTab === 'tools' ? '#0891B2' : 'transparent',
                    color: activeTab === 'tools' ? '#FFFFFF' : '#475569',
                    cursor: 'pointer'
                  }}
                >
                  <FolderArchive size={14} style={{ display: 'inline', marginRight: '6px' }} /> Hacking Tools & Zip ({tools.length})
                </button>

                <button
                  onClick={() => setActiveTab('messages')}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '9999px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    border: 'none',
                    background: activeTab === 'messages' ? '#4F46E5' : 'transparent',
                    color: activeTab === 'messages' ? '#FFFFFF' : '#475569',
                    cursor: 'pointer'
                  }}
                >
                  <Mail size={14} style={{ display: 'inline', marginRight: '6px' }} /> Messages ({messages.length})
                </button>
              </div>

              <button
                onClick={() => { fetchProjects(); fetchTools(); fetchMessages(); }}
                className="btn-secondary"
                style={{ padding: '6px 12px', fontSize: '0.75rem' }}
              >
                <RefreshCw size={12} /> Sync DB
              </button>
            </div>

            {feedbackMsg && (
              <div style={{ padding: '10px 28px', background: 'rgba(5, 150, 105, 0.1)', color: '#047857', fontSize: '0.85rem', fontWeight: 600, borderBottom: '1px solid rgba(5, 150, 105, 0.2)' }}>
                ✓ {feedbackMsg}
              </div>
            )}

            {/* TAB 1: SECURITY TOOLS & ZIP FILE UPLOADER */}
            {activeTab === 'tools' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '24px', padding: '24px', overflowY: 'auto', flex: 1 }}>
                
                {/* Left Side: Upload & Create Form */}
                <div style={{ background: '#F8FAFC', borderRadius: '16px', padding: '20px', border: '1px solid var(--border-light)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <h4 style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0F172A' }}>
                      {editingToolId ? '✏️ Edit Hacking Tool' : '📦 Upload New Tool / Zip File'}
                    </h4>
                    {editingToolId && (
                      <button onClick={resetToolForm} style={{ fontSize: '0.75rem', color: '#64748B', cursor: 'pointer', background: 'none', border: 'none' }}>
                        Cancel Editing
                      </button>
                    )}
                  </div>

                  <form onSubmit={handleSaveTool} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    
                    {/* Zip File Upload Box */}
                    <div style={{
                      border: '2px dashed rgba(8, 145, 178, 0.4)',
                      borderRadius: '12px',
                      padding: '16px',
                      textAlign: 'center',
                      background: 'rgba(8, 145, 178, 0.04)'
                    }}>
                      <Upload size={24} style={{ color: '#0891B2', margin: '0 auto 6px' }} />
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A' }}>
                        {uploading ? 'Uploading Zip File...' : 'Select Tool Executable / Zip File to Upload'}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#64748B', marginBottom: '10px' }}>
                        Supports .zip, .py, .sh, .js, .json up to 50MB
                      </div>

                      <input
                        type="file"
                        onChange={handleFileUpload}
                        style={{ fontSize: '0.8rem', cursor: 'pointer' }}
                      />

                      {uploadedFileName && (
                        <div style={{ marginTop: '8px', fontSize: '0.8rem', color: '#059669', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                          <CheckCircle2 size={14} /> Attached: {uploadedFileName} ({uploadedFileSize})
                        </div>
                      )}
                    </div>

                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#334155' }}>Tool Title *</label>
                      <input
                        type="text"
                        required
                        value={toolTitle}
                        onChange={(e) => setToolTitle(e.target.value)}
                        placeholder="e.g. Frida Dynamic SSL Pinning Automator"
                        style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-light)', fontSize: '0.85rem' }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <div>
                        <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#334155' }}>Category</label>
                        <select
                          value={toolCategory}
                          onChange={(e) => setToolCategory(e.target.value)}
                          style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-light)', fontSize: '0.85rem' }}
                        >
                          <option value="Web VAPT Scanner">Web VAPT Scanner</option>
                          <option value="Mobile Security Utility">Mobile Security Utility</option>
                          <option value="Network Infrastructure Tool">Network Infrastructure Tool</option>
                          <option value="Exploit PoC">Exploit PoC</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#334155' }}>Programming Language</label>
                        <input
                          type="text"
                          value={toolLang}
                          onChange={(e) => setToolLang(e.target.value)}
                          placeholder="e.g. Python 3 / Bash"
                          style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-light)', fontSize: '0.85rem' }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#334155' }}>Tool Description *</label>
                      <textarea
                        required
                        rows={2}
                        value={toolDesc}
                        onChange={(e) => setToolDesc(e.target.value)}
                        placeholder="Explain functionality, attack vector, and testing methodology..."
                        style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-light)', fontSize: '0.85rem' }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#334155' }}>Terminal Command Usage</label>
                      <input
                        type="text"
                        value={toolUsage}
                        onChange={(e) => setToolUsage(e.target.value)}
                        placeholder="python tool.py --target http://127.0.0.1"
                        style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-light)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#334155' }}>Tags (Comma Separated)</label>
                      <input
                        type="text"
                        value={toolTags}
                        onChange={(e) => setToolTags(e.target.value)}
                        placeholder="Frida, SSL Pinning, Android VAPT"
                        style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-light)', fontSize: '0.85rem' }}
                      />
                    </div>

                    <button type="submit" className="btn-primary" style={{ marginTop: '8px', padding: '10px', background: 'linear-gradient(135deg, #0891B2 0%, #047857 100%)' }}>
                      {editingToolId ? 'Save Changes to Tool' : 'Publish Tool & Zip to Portfolio'}
                    </button>
                  </form>
                </div>

                {/* Right Side: Existing Tools List */}
                <div>
                  <h4 style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: '16px' }}>
                    Uploaded Security Tools ({tools.length})
                  </h4>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '520px', overflowY: 'auto' }}>
                    {tools.map((t) => (
                      <div
                        key={t._id || t.id}
                        style={{
                          padding: '14px',
                          background: '#FFFFFF',
                          borderRadius: '12px',
                          border: '1px solid var(--border-light)',
                          boxShadow: 'var(--shadow-sm)'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                          <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0F172A' }}>{t.title}</div>
                          <span className="badge-cyber" style={{ fontSize: '0.65rem', color: '#0891B2', borderColor: 'rgba(8, 145, 178, 0.3)' }}>{t.category}</span>
                        </div>

                        <div style={{ fontSize: '0.8rem', color: '#475569', marginBottom: '8px' }}>
                          {t.description}
                        </div>

                        {t.fileName && (
                          <div style={{ fontSize: '0.75rem', color: '#059669', fontFamily: 'var(--font-mono)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <FolderArchive size={12} /> Zip: {t.fileName} ({t.fileSize})
                          </div>
                        )}

                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            onClick={() => handleEditTool(t)}
                            style={{ padding: '4px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', background: '#F8FAFC', fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                          >
                            <Edit3 size={12} /> Edit
                          </button>

                          <button
                            onClick={() => handleDeleteTool(t._id || t.id)}
                            style={{ padding: '4px 10px', borderRadius: '6px', border: '1px solid rgba(225, 29, 72, 0.3)', background: 'rgba(225, 29, 72, 0.08)', color: '#E11D48', fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                          >
                            <Trash2 size={12} /> Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: PROJECTS MANAGER */}
            {activeTab === 'projects' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', padding: '24px', overflowY: 'auto', flex: 1 }}>
                
                {/* Left Side: Add / Edit Form */}
                <div style={{ background: '#F8FAFC', borderRadius: '16px', padding: '20px', border: '1px solid var(--border-light)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <h4 style={{ fontWeight: 800, fontSize: '1.1rem' }}>
                      {editingProjectId ? '✏️ Edit VAPT Project' : '➕ Add New VAPT Project'}
                    </h4>
                    {editingProjectId && (
                      <button onClick={resetProjectForm} style={{ fontSize: '0.75rem', color: '#64748B', cursor: 'pointer', background: 'none', border: 'none' }}>
                        Cancel Editing
                      </button>
                    )}
                  </div>

                  <form onSubmit={handleSaveProject} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#334155' }}>Project Title *</label>
                      <input
                        type="text"
                        required
                        value={formTitle}
                        onChange={(e) => setFormTitle(e.target.value)}
                        placeholder="e.g. API Security Audit & OWASP Top 10"
                        style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-light)', fontSize: '0.85rem' }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <div>
                        <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#334155' }}>Target System *</label>
                        <input
                          type="text"
                          required
                          value={formTarget}
                          onChange={(e) => setFormTarget(e.target.value)}
                          placeholder="e.g. JuiceShop Web App"
                          style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-light)', fontSize: '0.85rem' }}
                        />
                      </div>

                      <div>
                        <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#334155' }}>Category / Type</label>
                        <select
                          value={formType}
                          onChange={(e) => setFormType(e.target.value)}
                          style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-light)', fontSize: '0.85rem' }}
                        >
                          <option value="Web & API Security">Web & API Security</option>
                          <option value="Mobile Security">Mobile Security</option>
                          <option value="Network Infrastructure">Network Infrastructure</option>
                        </select>
                      </div>
                    </div>

                    {/* Severities */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                      <div>
                        <label style={{ fontSize: '0.7rem', fontWeight: 700, color: '#E11D48' }}>Critical</label>
                        <input
                          type="number"
                          value={formCritical}
                          onChange={(e) => setFormCritical(e.target.value)}
                          style={{ width: '100%', padding: '6px', borderRadius: '6px', border: '1px solid var(--border-light)', fontSize: '0.8rem' }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.7rem', fontWeight: 700, color: '#D97706' }}>High</label>
                        <input
                          type="number"
                          value={formHigh}
                          onChange={(e) => setFormHigh(e.target.value)}
                          style={{ width: '100%', padding: '6px', borderRadius: '6px', border: '1px solid var(--border-light)', fontSize: '0.8rem' }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.7rem', fontWeight: 700, color: '#0891B2' }}>Medium</label>
                        <input
                          type="number"
                          value={formMedium}
                          onChange={(e) => setFormMedium(e.target.value)}
                          style={{ width: '100%', padding: '6px', borderRadius: '6px', border: '1px solid var(--border-light)', fontSize: '0.8rem' }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#334155' }}>Summary Description *</label>
                      <textarea
                        required
                        rows={2}
                        value={formSummary}
                        onChange={(e) => setFormSummary(e.target.value)}
                        placeholder="Detailed overview of penetration testing findings..."
                        style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-light)', fontSize: '0.85rem' }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#334155' }}>Highlights (One per line)</label>
                      <textarea
                        rows={2}
                        value={formHighlights}
                        onChange={(e) => setFormHighlights(e.target.value)}
                        placeholder="Identified SQL Injection in auth endpoint..."
                        style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-light)', fontSize: '0.85rem' }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#334155' }}>Tools Used (Comma Separated)</label>
                      <input
                        type="text"
                        value={formTools}
                        onChange={(e) => setFormTools(e.target.value)}
                        placeholder="Burp Suite, OWASP ZAP"
                        style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-light)', fontSize: '0.85rem' }}
                      />
                    </div>

                    <button type="submit" className="btn-primary" style={{ marginTop: '8px', padding: '10px' }}>
                      {editingProjectId ? 'Save Changes to MongoDB' : 'Publish Project to MongoDB'}
                    </button>
                  </form>
                </div>

                {/* Right Side: Existing Projects List */}
                <div>
                  <h4 style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: '16px' }}>
                    Live MongoDB Projects ({projects.length})
                  </h4>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '520px', overflowY: 'auto' }}>
                    {projects.map((proj) => (
                      <div
                        key={proj._id || proj.id}
                        style={{
                          padding: '14px',
                          background: '#FFFFFF',
                          borderRadius: '12px',
                          border: '1px solid var(--border-light)',
                          boxShadow: 'var(--shadow-sm)'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                          <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0F172A' }}>{proj.title}</div>
                          <span className="badge-cyber" style={{ fontSize: '0.65rem' }}>{proj.type}</span>
                        </div>

                        <div style={{ fontSize: '0.8rem', color: '#64748B', marginBottom: '8px' }}>
                          Target: <strong style={{ color: '#0F172A' }}>{proj.target}</strong>
                        </div>

                        <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                          <button
                            onClick={() => handleEditClick(proj)}
                            style={{
                              padding: '4px 10px',
                              borderRadius: '6px',
                              border: '1px solid #CBD5E1',
                              background: '#F8FAFC',
                              fontSize: '0.75rem',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            <Edit3 size={12} /> Edit
                          </button>

                          <button
                            onClick={() => handleDeleteProject(proj._id || proj.id)}
                            style={{
                              padding: '4px 10px',
                              borderRadius: '6px',
                              border: '1px solid rgba(225, 29, 72, 0.3)',
                              background: 'rgba(225, 29, 72, 0.08)',
                              color: '#E11D48',
                              fontSize: '0.75rem',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            <Trash2 size={12} /> Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* TAB 3: CONTACT MESSAGES INBOX */}
            {activeTab === 'messages' && (
              <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
                <h4 style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: '16px' }}>
                  Recruiter & Contact Messages Inbox ({messages.length})
                </h4>

                {messages.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px', color: '#64748B' }}>
                    No messages received yet.
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {messages.map((msg) => (
                      <div
                        key={msg._id}
                        style={{
                          padding: '18px',
                          background: '#F8FAFC',
                          borderRadius: '14px',
                          border: '1px solid var(--border-light)'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                          <div>
                            <div style={{ fontWeight: 800, fontSize: '1rem', color: '#0F172A' }}>{msg.name}</div>
                            <div style={{ fontSize: '0.8rem', color: '#4F46E5', fontFamily: 'var(--font-mono)' }}>{msg.email}</div>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
                              {new Date(msg.createdAt).toLocaleDateString()}
                            </span>
                            <button
                              onClick={() => handleDeleteMessage(msg._id)}
                              style={{ background: 'none', border: 'none', color: '#E11D48', cursor: 'pointer' }}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>

                        <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#334155', marginBottom: '6px' }}>
                          Subject: {msg.subject}
                        </div>
                        <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.5, background: '#FFFFFF', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                          {msg.message}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        )}

      </motion.div>
    </div>
  );
}
