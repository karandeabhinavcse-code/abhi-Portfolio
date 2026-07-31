import { useEffect, useRef, useState } from 'react';
import { Sliders, Cpu, Activity, Zap, Eye, X, Check } from 'lucide-react';

export default function CyberCanvas() {
  const canvasRef = useRef(null);

  // Background modes: 'full' | 'matrix' | 'nodes' | 'stealth'
  const [bgMode, setBgMode] = useState(() => localStorage.getItem('cyber_bg_mode') || 'full');
  
  // Feature toggles
  const [showMatrix, setShowMatrix] = useState(() => localStorage.getItem('cyber_bg_matrix') !== 'false');
  const [showGrid, setShowGrid] = useState(() => localStorage.getItem('cyber_bg_grid') !== 'false');
  const [showRadar, setShowRadar] = useState(() => localStorage.getItem('cyber_bg_radar') !== 'false');
  const [showRipples, setShowRipples] = useState(() => localStorage.getItem('cyber_bg_ripples') !== 'false');

  const [hudOpen, setHudOpen] = useState(false);

  // Save options
  const changeMode = (mode) => {
    setBgMode(mode);
    localStorage.setItem('cyber_bg_mode', mode);
  };

  const toggleFeature = (setter, key, val) => {
    setter(val);
    localStorage.setItem(key, val);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Dynamic node density based on screen width
    const densityFactor = bgMode === 'stealth' ? 18 : bgMode === 'nodes' ? 65 : 45;
    const nodeCount = Math.floor(Math.min(canvas.width / 24, densityFactor));
    const nodes = [];

    // Mouse tracker
    const mouse = {
      x: null,
      y: null,
      radius: 180
    };

    // Ripples array for click shockwaves
    const ripples = [];

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleClick = (e) => {
      if (!showRipples) return;
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 5,
        maxRadius: 160,
        alpha: 0.85
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleClick);

    // Colors pool
    const nodeColors = [
      'rgba(0, 240, 255, ',   // Neon Cyan
      'rgba(0, 255, 157, ',   // Neon Emerald
      'rgba(56, 189, 248, ',  // Sky Cyber Blue
      'rgba(168, 85, 247, '   // Cyber Purple
    ];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1.2,
        baseColor: nodeColors[i % nodeColors.length]
      });
    }

    // Matrix Rain Data
    const matrixChars = '010101VAPT0101ETHICAL01SEC101EXPLOIT01CCNA101PORT221044301';
    const streamColumns = Math.floor(canvas.width / 42);
    const rainDrops = [];
    for (let i = 0; i < streamColumns; i++) {
      rainDrops[i] = Math.random() * -80;
    }

    // Radar scan beam variable
    let radarAngle = 0;
    const packets = [];

    // Main Canvas Render Loop
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const renderMatrix = (bgMode === 'full' || bgMode === 'matrix') && showMatrix;
      const renderNodes = bgMode === 'full' || bgMode === 'nodes';
      const renderTacticalGrid = showGrid && bgMode !== 'stealth';
      const renderRadar = showRadar && bgMode === 'full';

      // 1. DRAW TACTICAL GRID LINES
      if (renderTacticalGrid) {
        const gridSize = 70;
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.05)';
        ctx.lineWidth = 0.5;

        for (let x = 0; x < canvas.width; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
          ctx.stroke();
        }
        for (let y = 0; y < canvas.height; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();
        }
      }

      // 2. DRAW MATRIX DIGITAL RAIN
      if (renderMatrix) {
        ctx.font = '10px "JetBrains Mono", monospace';
        for (let i = 0; i < rainDrops.length; i++) {
          const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
          const x = i * 42;
          const y = rainDrops[i] * 20;

          if (y > 0 && y < canvas.height) {
            const isHead = Math.random() > 0.88;
            ctx.fillStyle = isHead ? 'rgba(0, 240, 255, 0.75)' : 'rgba(0, 255, 157, 0.16)';
            ctx.fillText(char, x, y);
          }

          if (y > canvas.height && Math.random() > 0.975) {
            rainDrops[i] = 0;
          }
          rainDrops[i]++;
        }
      }

      // 3. DRAW TACTICAL SECURITY RADAR (Top Right Corner)
      if (renderRadar) {
        radarAngle += 0.007;
        const radarX = canvas.width * 0.88;
        const radarY = canvas.height * 0.16;
        const radarR = 130;

        ctx.beginPath();
        ctx.arc(radarX, radarY, radarR, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.1)';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(radarX, radarY);
        ctx.arc(radarX, radarY, radarR, radarAngle, radarAngle + 0.35);
        ctx.closePath();
        const sweepGrad = ctx.createRadialGradient(radarX, radarY, 5, radarX, radarY, radarR);
        sweepGrad.addColorStop(0, 'rgba(0, 240, 255, 0.18)');
        sweepGrad.addColorStop(1, 'rgba(0, 240, 255, 0)');
        ctx.fillStyle = sweepGrad;
        ctx.fill();
      }

      // 4. DRAW MOUSE CLICK RIPPLES
      if (showRipples && ripples.length > 0) {
        for (let r = ripples.length - 1; r >= 0; r--) {
          const rip = ripples[r];
          rip.radius += 2.5;
          rip.alpha *= 0.96;

          if (rip.alpha <= 0.01 || rip.radius >= rip.maxRadius) {
            ripples.splice(r, 1);
            continue;
          }

          ctx.beginPath();
          ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0, 240, 255, ${rip.alpha * 0.6})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(rip.x, rip.y, rip.radius * 0.6, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0, 255, 157, ${rip.alpha * 0.4})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // 5. UPDATE & DRAW NODES AND MESH FILAMENTS
      if (renderNodes) {
        nodes.forEach((node, i) => {
          node.x += node.vx;
          node.y += node.vy;

          if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
          if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

          // Mouse magnetic repulsion forcefield
          if (mouse.x !== null && mouse.y !== null) {
            const dx = mouse.x - node.x;
            const dy = mouse.y - node.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < mouse.radius) {
              const force = (mouse.radius - dist) / mouse.radius;
              node.x -= (dx / dist) * force * 2.2;
              node.y -= (dy / dist) * force * 2.2;
            }
          }

          // Render node network connections
          for (let j = i + 1; j < nodes.length; j++) {
            const other = nodes[j];
            const dx = other.x - node.x;
            const dy = other.y - node.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 135) {
              const alpha = (1 - dist / 135) * 0.22;
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(other.x, other.y);
              ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
              ctx.lineWidth = 0.75;
              ctx.stroke();

              // Spawn active data packet
              if (Math.random() < 0.0008 && packets.length < 15) {
                packets.push({
                  x1: node.x,
                  y1: node.y,
                  x2: other.x,
                  y2: other.y,
                  progress: 0,
                  speed: 0.02 + Math.random() * 0.02
                });
              }
            }
          }

          // Node Dot render
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          ctx.fillStyle = `${node.baseColor} 0.8)`;
          ctx.fill();
        });

        // Packets travel animation
        for (let p = packets.length - 1; p >= 0; p--) {
          const pkt = packets[p];
          pkt.progress += pkt.speed;

          if (pkt.progress >= 1) {
            packets.splice(p, 1);
            continue;
          }

          const currX = pkt.x1 + (pkt.x2 - pkt.x1) * pkt.progress;
          const currY = pkt.y1 + (pkt.y2 - pkt.y1) * pkt.progress;

          ctx.beginPath();
          ctx.arc(currX, currY, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(0, 255, 157, 0.95)';
          ctx.shadowColor = 'rgba(0, 255, 157, 0.8)';
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
    };
  }, [bgMode, showMatrix, showGrid, showRadar, showRipples]);

  return (
    <>
      {/* Background HTML5 Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* Floating Cyber HUD Controller Trigger Button (Bottom-Right) */}
      <div
        style={{
          position: 'fixed',
          bottom: '22px',
          right: '22px',
          zIndex: 99
        }}
      >
        <button
          onClick={() => setHudOpen(!hudOpen)}
          style={{
            background: 'rgba(11, 17, 32, 0.88)',
            border: '1px solid rgba(0, 240, 255, 0.35)',
            color: '#00F0FF',
            padding: '8px 14px',
            borderRadius: '9999px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.8rem',
            fontFamily: 'var(--font-mono)',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5), 0 0 15px rgba(0, 240, 255, 0.2)',
            transition: 'all 0.25s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#00FF9D';
            e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 255, 157, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.35)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5), 0 0 15px rgba(0, 240, 255, 0.2)';
          }}
          title="Customize Site Cyber Background"
        >
          <Sliders size={14} />
          <span>BG SYSTEM</span>
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#00FF9D',
              boxShadow: '0 0 8px #00FF9D'
            }}
          />
        </button>

        {/* Cyber HUD Customization Panel Dropdown Modal */}
        {hudOpen && (
          <div
            style={{
              position: 'absolute',
              bottom: '50px',
              right: 0,
              width: '280px',
              background: 'rgba(7, 12, 23, 0.95)',
              border: '1px solid rgba(0, 240, 255, 0.4)',
              borderRadius: '16px',
              padding: '16px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 240, 255, 0.15)',
              backdropFilter: 'blur(20px)',
              color: '#F0F6FC',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.85rem'
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', borderBottom: '1px solid rgba(0, 240, 255, 0.15)', paddingBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#00F0FF', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                <Cpu size={16} />
                <span>CYBER CANVAS FX</span>
              </div>
              <button
                onClick={() => setHudOpen(false)}
                style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Presets Mode Selector */}
            <div style={{ marginBottom: '14px' }}>
              <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginBottom: '8px', fontFamily: 'var(--font-mono)' }}>
                BACKGROUND PRESET
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                {[
                  { id: 'full', label: 'Full Cyber', icon: Activity },
                  { id: 'matrix', label: 'Matrix Rain', icon: Zap },
                  { id: 'nodes', label: 'Network Net', icon: Cpu },
                  { id: 'stealth', label: 'Stealth Void', icon: Eye }
                ].map((mode) => {
                  const Icon = mode.icon;
                  const active = bgMode === mode.id;
                  return (
                    <button
                      key={mode.id}
                      onClick={() => changeMode(mode.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 10px',
                        borderRadius: '8px',
                        background: active ? 'rgba(0, 240, 255, 0.18)' : 'rgba(18, 28, 48, 0.6)',
                        border: active ? '1px solid #00F0FF' : '1px solid rgba(255, 255, 255, 0.08)',
                        color: active ? '#00F0FF' : '#94A3B8',
                        cursor: 'pointer',
                        fontSize: '0.75rem',
                        fontWeight: active ? 600 : 400,
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <Icon size={12} />
                      <span>{mode.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Feature Toggles */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '0.75rem', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>
                INTERACTIVE LAYERS
              </div>

              {[
                { label: 'Matrix Code Stream', state: showMatrix, setter: setShowMatrix, key: 'cyber_bg_matrix' },
                { label: 'Tactical Grid Lines', state: showGrid, setter: setShowGrid, key: 'cyber_bg_grid' },
                { label: 'Security Radar Scan', state: showRadar, setter: setShowRadar, key: 'cyber_bg_radar' },
                { label: 'Click Energy Ripples', state: showRipples, setter: setShowRipples, key: 'cyber_bg_ripples' }
              ].map((item) => (
                <div
                  key={item.key}
                  onClick={() => toggleFeature(item.setter, item.key, !item.state)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '6px 10px',
                    borderRadius: '6px',
                    background: 'rgba(13, 20, 36, 0.7)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    cursor: 'pointer',
                    fontSize: '0.78rem'
                  }}
                >
                  <span style={{ color: '#E2E8F0' }}>{item.label}</span>
                  <div
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '4px',
                      background: item.state ? 'rgba(0, 255, 157, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                      border: item.state ? '1px solid #00FF9D' : '1px solid rgba(255, 255, 255, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#00FF9D'
                    }}
                  >
                    {item.state && <Check size={12} />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
