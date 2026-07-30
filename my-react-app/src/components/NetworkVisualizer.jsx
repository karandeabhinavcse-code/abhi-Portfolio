import { useState } from 'react';
import { motion } from 'framer-motion';
import { Network, Server, Router, Shield, Cpu, Activity, Play, CheckCircle2, ArrowRight, Layers, Lock } from 'lucide-react';

export default function NetworkVisualizer() {
  const [activeTab, setActiveTab] = useState('ospf');
  const [isSimulating, setIsSimulating] = useState(false);
  const [logs, setLogs] = useState([
    '[SYSTEM] CCNA Network Topology Engine Initialized.',
    '[INFO] VLAN 10 (Management), VLAN 20 (Guest) Active.'
  ]);

  const handleSimulate = (mode) => {
    setIsSimulating(true);
    let newLogs = [];

    if (mode === 'ospf') {
      newLogs = [
        '[+] Sending OSPF Hello packets on Interface g0/0/0...',
        '[+] Neighbor 10.0.0.2 state changed: INIT -> 2WAY -> FULL (DR)',
        '[✓] OSPF Link-State Database (LSDB) synchronized across Area 0.',
        '[✓] Routing table updated with 192.168.10.0/24 metric 10.'
      ];
    } else if (mode === 'vlan') {
      newLogs = [
        '[+] Testing 802.1Q VLAN Trunking on Switch SW-Core-01...',
        '[+] VLAN 10 (192.168.10.0/24) -> Admin Subnet: Allowed',
        '[!] VLAN 20 (192.168.20.0/24) -> Guest Subnet: Isolated via ACL',
        '[✓] Inter-VLAN Router-on-a-Stick subinterfaces verified.'
      ];
    } else {
      newLogs = [
        '[+] Auditing Firewall Extended Access Control List 101...',
        '[!] Testing ICMP Ping from Guest 192.168.20.5 -> Admin 192.168.10.10...',
        '[DENIED] Rule 10: access-list 101 deny ip 192.168.20.0 0.0.0.255 192.168.10.0',
        '[✓] Firewall successfully blocked unauthorized subnet traversal.'
      ];
    }

    setLogs(prev => [...prev, ...newLogs]);
    setTimeout(() => setIsSimulating(false), 1200);
  };

  return (
    <section id="network" style={{ padding: '90px 24px', maxWidth: '1280px', margin: '0 auto' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <span className="badge-cyber" style={{ marginBottom: '12px' }}>
          <Network size={14} /> CCNA Architecture Interactive Demo
        </span>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>
          Network Protocol & <span className="text-gradient">Topology Simulator</span>
        </h2>
        <p style={{ color: '#64748B', maxWidth: '650px', margin: '10px auto 0', fontSize: '1.05rem' }}>
          Interactive visualization of Abhinav's CCNA routing, VLAN trunking, subnets, and Firewall ACL rule enforcement.
        </p>
      </div>

      {/* Main Container */}
      <div className="glass-card" style={{ padding: '32px', borderRadius: '24px' }}>
        
        {/* Control Mode Tabs */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '28px', flexWrap: 'wrap', borderBottom: '1px solid var(--border-light)', paddingBottom: '16px' }}>
          <button
            onClick={() => { setActiveTab('ospf'); handleSimulate('ospf'); }}
            className={activeTab === 'ospf' ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
          >
            <Activity size={16} /> OSPF Area 0 Convergence
          </button>

          <button
            onClick={() => { setActiveTab('vlan'); handleSimulate('vlan'); }}
            className={activeTab === 'vlan' ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
          >
            <Layers size={16} /> VLAN 802.1Q Subnetting
          </button>

          <button
            onClick={() => { setActiveTab('acl'); handleSimulate('acl'); }}
            className={activeTab === 'acl' ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
          >
            <Lock size={16} /> Firewall ACL Inspection
          </button>
        </div>

        {/* Visual Diagram Canvas Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '20px',
          alignItems: 'center',
          textAlign: 'center',
          padding: '24px',
          background: 'var(--bg-secondary)',
          borderRadius: '16px',
          border: '1px solid var(--border-light)',
          position: 'relative',
          marginBottom: '28px'
        }}>
          {/* Node 1: Admin PC */}
          <div style={{ padding: '16px', background: 'var(--bg-card-solid)', borderRadius: '12px', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
            <Cpu size={32} style={{ color: 'var(--accent-primary)', margin: '0 auto 8px' }} />
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>VLAN 10 Admin</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>192.168.10.5/24</div>
          </div>

          <div style={{ color: 'var(--accent-primary)', fontWeight: 800, fontSize: '1.2rem' }}>
            <ArrowRight size={24} className={isSimulating ? 'animate-pulse-slow' : ''} />
          </div>

          {/* Node 2: Core Switch */}
          <div style={{ padding: '16px', background: 'var(--bg-card-solid)', borderRadius: '12px', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
            <Server size={32} style={{ color: 'var(--accent-cyan)', margin: '0 auto 8px' }} />
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>SW-Core-01</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>Trunk 802.1Q</div>
          </div>

          <div style={{ color: 'var(--accent-primary)', fontWeight: 800, fontSize: '1.2rem' }}>
            <ArrowRight size={24} className={isSimulating ? 'animate-pulse-slow' : ''} />
          </div>

          {/* Node 3: Router R1 */}
          <div style={{ padding: '16px', background: 'var(--bg-card-solid)', borderRadius: '12px', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
            <Router size={32} style={{ color: 'var(--accent-emerald)', margin: '0 auto 8px' }} />
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>Router R1</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>OSPF Area 0</div>
          </div>

          <div style={{ color: 'var(--accent-primary)', fontWeight: 800, fontSize: '1.2rem' }}>
            <ArrowRight size={24} className={isSimulating ? 'animate-pulse-slow' : ''} />
          </div>

          {/* Node 4: Firewall ASA */}
          <div style={{ padding: '16px', background: 'var(--bg-card-solid)', borderRadius: '12px', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
            <Shield size={32} style={{ color: 'var(--accent-rose)', margin: '0 auto 8px' }} />
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>FW-ACL-101</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>Subnet Firewall</div>
          </div>
        </div>

        {/* Live Network Logs */}
        <div style={{
          background: '#0F172A',
          borderRadius: '14px',
          padding: '18px',
          color: '#34D399',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.85rem',
          maxHeight: '160px',
          overflowY: 'auto',
          lineHeight: 1.6
        }}>
          {logs.slice(-5).map((log, i) => (
            <div key={i} style={{ color: log.includes('[!]') || log.includes('[DENIED]') ? '#F43F5E' : log.includes('[✓]') ? '#34D399' : '#38BDF8' }}>
              {log}
            </div>
          ))}
        </div>

      </div>

    </section>
  );
}
