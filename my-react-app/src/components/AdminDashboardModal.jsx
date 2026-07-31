import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, X, FileText, Trash2, LogOut, Download, Mail, User, Clock, Package } from 'lucide-react';

export default function AdminDashboardModal({ isOpen, onClose, adminEmail, onLogout }) {
  const [activeTab, setActiveTab] = useState('tools'); // 'tools' | 'projects' | 'resumes'
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    if (isOpen) {
      fetchSubmissions();
    }
  }, [isOpen, activeTab]);

  const fetchSubmissions = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/admin/submissions`);
      const data = await res.json();
      if (data.success && data.data) {
        const fetchedList = activeTab === 'tools' ? data.data.tools : activeTab === 'projects' ? data.data.projects : data.data.resumes;
        if (fetchedList && fetchedList.length > 0) {
          setItems(fetchedList);
          setIsLoading(false);
          return;
        }
      }
    } catch (e) {
      console.log('Fetching local storage fallback:', e);
    }

    // Local storage lookup
    const key = activeTab === 'tools' ? 'custom_tools' : activeTab === 'projects' ? 'custom_projects' : 'custom_resumes';
    const localData = JSON.parse(localStorage.getItem(key) || '[]');
    setItems(localData);
    setIsLoading(false);
  };

  const handleDeleteItem = async (item, idx) => {
    if (!window.confirm(`Are you sure you want to delete "${item.title}" submitted by ${item.uploaderEmail}?`)) return;

    // Delete from localStorage
    const key = activeTab === 'tools' ? 'custom_tools' : activeTab === 'projects' ? 'custom_projects' : 'custom_resumes';
    const localData = JSON.parse(localStorage.getItem(key) || '[]');
    const updatedLocal = localData.filter((_, i) => i !== idx);
    localStorage.setItem(key, JSON.stringify(updatedLocal));

    // Delete from MongoDB server if valid id
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

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(5, 10, 24, 0.8)',
          backdropFilter: 'blur(12px)',
          padding: '16px'
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            width: '100%',
            maxWidth: '780px',
            maxHeight: '90vh',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-light)',
            borderRadius: '24px',
            padding: '24px',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6)',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Header Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', pb: '16px', borderBottom: '1px solid var(--border-light)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)'
                }}
              >
                <ShieldCheck size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  Admin Submissions Dashboard
                </h3>
                <p style={{ fontSize: '0.78rem', color: '#10B981', margin: '2px 0 0 0', fontWeight: 600 }}>
                  Logged in as: {adminEmail}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={onLogout}
                style={{
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  border: '1px solid var(--border-light)',
                  background: 'var(--bg-primary)',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <LogOut size={13} /> Log Out
              </button>
              <button
                onClick={onClose}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: '6px'
                }}
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Submissions Tab Controls */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
            {[
              { id: 'tools', label: '🛠️ Uploaded Tools' },
              { id: 'projects', label: '🛡️ Uploaded Audit Projects' },
              { id: 'resumes', label: '📄 Uploaded Resumes' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '10px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  fontFamily: 'var(--font-mono)',
                  border: activeTab === tab.id ? 'none' : '1px solid var(--border-light)',
                  background: activeTab === tab.id ? 'var(--accent-primary)' : 'var(--bg-primary)',
                  color: activeTab === tab.id ? '#FFFFFF' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Submissions List Container */}
          <div style={{ flex: 1, overflowY: 'auto', paddingRight: '4px', display: 'grid', gap: '12px' }}>
            {isLoading ? (
              <div style={{ padding: '30px', textAlign: 'center', color: 'var(--text-muted)' }}>
                Loading submissions...
              </div>
            ) : items.length === 0 ? (
              <div style={{ padding: '40px 20px', textAlign: 'center', background: 'var(--bg-primary)', borderRadius: '16px', border: '1px solid var(--border-light)', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                <Package size={32} style={{ marginBottom: '8px', opacity: 0.5 }} />
                <div>No {activeTab} submitted by visitors yet.</div>
              </div>
            ) : (
              items.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '16px 20px',
                    borderRadius: '16px',
                    background: 'var(--bg-primary)',
                    border: '1px solid var(--border-light)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                    <div>
                      <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                        {item.title}
                      </h4>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <User size={12} style={{ color: 'var(--accent-primary)' }} />
                          <strong style={{ color: 'var(--text-primary)' }}>{item.uploaderName || 'Visitor'}</strong>
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Mail size={12} style={{ color: '#38BDF8' }} />
                          <a href={`mailto:${item.uploaderEmail}`} style={{ color: '#38BDF8', textDecoration: 'underline' }}>{item.uploaderEmail}</a>
                        </span>
                        {item.createdAt && (
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Clock size={12} />
                            {new Date(item.createdAt).toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>

                    <span style={{ fontSize: '0.75rem', fontWeight: 700, background: 'rgba(168, 85, 247, 0.15)', color: '#A855F7', padding: '3px 9px', borderRadius: '6px', border: '1px solid rgba(168, 85, 247, 0.3)' }}>
                      Category: {item.category || item.type || 'General'}
                    </span>
                  </div>

                  {/* Description Box */}
                  {item.description && (
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', background: 'var(--bg-secondary)', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border-light)', lineHeight: 1.4 }}>
                      {item.description}
                    </div>
                  )}

                  {/* Admin Actions Toolbar */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px', marginTop: '4px', paddingTop: '8px', borderTop: '1px solid var(--border-light)' }}>
                    {(item.fileUrl || item.reportUrl) && (
                      <a
                        href={item.fileUrl || item.reportUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        className="btn-secondary"
                        style={{
                          fontSize: '0.78rem',
                          padding: '6px 14px',
                          borderRadius: '8px',
                          textDecoration: 'none',
                          background: 'rgba(16, 185, 129, 0.15)',
                          color: '#10B981',
                          border: '1px solid rgba(16, 185, 129, 0.4)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <Download size={13} /> Download File
                      </a>
                    )}

                    <button
                      onClick={() => handleDeleteItem(item, idx)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '8px',
                        border: '1px solid rgba(239, 68, 68, 0.4)',
                        background: 'rgba(239, 68, 68, 0.15)',
                        color: '#EF4444',
                        cursor: 'pointer',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                      title="Delete submission permanently"
                    >
                      <Trash2 size={13} /> Delete Submission
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
