import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, Play, CornerDownLeft, Shield, Sparkles, Copy, Check } from 'lucide-react';
import { resumeData } from '../data/resumeData';

export default function VaptTerminal({ isOpen, onClose, isModal = false }) {
  const [history, setHistory] = useState([
    {
      type: 'system',
      text: '=== ABHINAV KARANDE VAPT SECURITY TERMINAL v2.5 ===\nType "help" or click sample commands below to run live security audits and PoC verifications.'
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [copiedIndex, setCopiedIndex] = useState(null);
  const terminalEndRef = useRef(null);

  const quickCommands = [
    'whoami',
    'scan --target gin-juice',
    'cert --verify',
    'skills',
    'contact',
    'help'
  ];

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmdStr) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    // Add prompt entry
    const newEntries = [...history, { type: 'user', text: `$ ${cmdStr}` }];

    if (trimmed === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    let response = '';

    if (trimmed === 'help') {
      response = `AVAILABLE COMMANDS:
  whoami                    : Displays Abhinav's bio & specialization
  scan --target gin-juice   : Runs simulated OWASP Top 10 (2025) VAPT audit
  cert --verify             : Validates CCNA & EC-Council credentials
  skills                    : Lists Web VAPT, Android VAPT & CCNA skills
  contact                   : Displays direct contact details & location
  clear                     : Clears terminal history`;
    } else {
      const match = resumeData.terminalCommands.find(c => c.cmd.toLowerCase() === trimmed);
      if (match) {
        response = match.output;
      } else if (trimmed.startsWith('scan')) {
        response = `[+] Initiating Web VAPT scan on ${cmdStr.split(' ')[2] || 'target'}...\n[!] Discovered Critical Vulnerabilities:\n  - CSTI Payload executed successfully\n  - SQL Injection in /api/v1/auth\n  - SSRF in metadata fetcher\n[✓] Detailed report available in Audit Projects section.`;
      } else {
        response = `Command not recognized: "${cmdStr}". Type "help" for a list of available commands.`;
      }
    }

    newEntries.push({ type: 'output', text: response });
    setHistory(newEntries);
    setInputVal('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCommand(inputVal);
  };

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const terminalBody = (
    <div style={{
      background: '#0F172A',
      borderRadius: '16px',
      border: '1px solid #334155',
      boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.4)',
      overflow: 'hidden',
      fontFamily: 'var(--font-mono)'
    }}>
      {/* Terminal Titlebar */}
      <div style={{
        background: '#1E293B',
        padding: '12px 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #334155'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#EF4444' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#F59E0B' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10B981' }} />
          <span style={{ fontSize: '0.85rem', color: '#94A3B8', marginLeft: '8px', fontWeight: 600 }}>
            bash - abhinav@vapt-console:~
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '0.75rem', color: '#38BDF8', background: 'rgba(56, 189, 248, 0.1)', padding: '2px 8px', borderRadius: '4px' }}>
            OWASP 2025 ACTIVE
          </span>
          {isModal && (
            <button
              onClick={onClose}
              style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Quick Command Pills */}
      <div style={{
        background: '#0F172A',
        padding: '10px 18px',
        borderBottom: '1px solid #1E293B',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        flexWrap: 'wrap'
      }}>
        <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Quick Run:</span>
        {quickCommands.map((cmd) => (
          <button
            key={cmd}
            onClick={() => handleCommand(cmd)}
            style={{
              background: '#1E293B',
              border: '1px solid #334155',
              color: '#38BDF8',
              borderRadius: '6px',
              padding: '3px 10px',
              fontSize: '0.75rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Terminal Content Screen */}
      <div style={{
        padding: '20px',
        minHeight: '280px',
        maxHeight: '420px',
        overflowY: 'auto',
        fontSize: '0.875rem',
        lineHeight: 1.6
      }}>
        {history.map((item, idx) => (
          <div key={idx} style={{ marginBottom: '12px', position: 'relative' }}>
            {item.type === 'user' ? (
              <div style={{ color: '#38BDF8', fontWeight: 600 }}>{item.text}</div>
            ) : item.type === 'system' ? (
              <div style={{ color: '#A7F3D0', whiteSpace: 'pre-wrap' }}>{item.text}</div>
            ) : (
              <div style={{ color: '#E2E8F0', whiteSpace: 'pre-wrap', position: 'relative' }}>
                {item.text}
                <button
                  onClick={() => handleCopy(item.text, idx)}
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    background: '#1E293B',
                    border: '1px solid #334155',
                    color: '#94A3B8',
                    borderRadius: '4px',
                    padding: '2px 6px',
                    fontSize: '0.7rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  {copiedIndex === idx ? <Check size={12} style={{ color: '#10B981' }} /> : <Copy size={12} />}
                  {copiedIndex === idx ? 'Copied' : 'Copy'}
                </button>
              </div>
            )}
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Input Line Form */}
      <form
        onSubmit={handleSubmit}
        style={{
          padding: '12px 18px',
          background: '#1E293B',
          borderTop: '1px solid #334155',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}
      >
        <span style={{ color: '#10B981', fontWeight: 700 }}>abhinav@sec:~$</span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Type command (e.g. scan --target gin-juice)..."
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#F8FAFC',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.9rem'
          }}
        />
        <button
          type="submit"
          style={{
            background: '#4F46E5',
            border: 'none',
            color: '#FFFFFF',
            borderRadius: '6px',
            padding: '6px 12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <CornerDownLeft size={14} /> Run
        </button>
      </form>
    </div>
  );

  if (isModal) {
    if (!isOpen) return null;
    return (
      <div className="modal-overlay" onClick={onClose}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          style={{ width: '100%', maxWidth: '800px' }}
          onClick={(e) => e.stopPropagation()}
        >
          {terminalBody}
        </motion.div>
      </div>
    );
  }

  return (
    <section id="terminal" style={{ padding: '80px 24px', maxWidth: '1280px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <span className="badge-cyber" style={{ marginBottom: '12px' }}>
          <TerminalIcon size={14} /> Live Interactive Simulator
        </span>
        <h2 style={{ fontSize: '2.25rem', fontWeight: 800 }}>
          VAPT Security Audit <span className="text-gradient">Console</span>
        </h2>
        <p style={{ color: '#64748B', maxWidth: '600px', margin: '8px auto 0' }}>
          Execute interactive commands to inspect PoC exploits, scan OWASP Top 10 vulnerabilities, and verify networking certifications.
        </p>
      </div>
      {terminalBody}
    </section>
  );
}
