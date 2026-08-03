import { useEffect, useRef } from 'react';

export default function CyberCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let prefersReducedMotion = mediaQuery.matches;

    const handleMotionChange = (e) => {
      prefersReducedMotion = e.matches;
    };
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMotionChange);
    }

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const isMobile = window.innerWidth <= 768;
    const nodeCount = isMobile ? 14 : 32;
    const nodes = [];

    // Mouse tracker
    const mouse = {
      x: null,
      y: null,
      radius: 160
    };

    let targetFps = 60;
    let activityTimeout = null;
    let lastFrameTime = performance.now();

    const triggerFpsBoost = () => {
      targetFps = 60;
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      triggerFpsBoost();
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    // Subtle cybersecurity node palette
    const nodeColors = [
      'rgba(56, 189, 248, ',   // Soft Sky Blue
      'rgba(99, 102, 241, ',   // Electric Indigo
      'rgba(0, 240, 255, ',    // Subtle Cyan Glow
      'rgba(129, 140, 248, '   // Soft Violet Accent
    ];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * (prefersReducedMotion ? 0 : 0.25),
        vy: (Math.random() - 0.5) * (prefersReducedMotion ? 0 : 0.25),
        radius: Math.random() * 1.5 + 1.2,
        baseColor: nodeColors[i % nodeColors.length]
      });
    }

    const packets = [];

    const draw = (now) => {
      animationFrameId = requestAnimationFrame(draw);

      if (prefersReducedMotion) {
        // Draw single frame for reduced motion users
      } else {
        if (!now) now = performance.now();
        const elapsed = now - lastFrameTime;
        const interval = 1000 / targetFps;
        if (elapsed < interval - 1) return;
        lastFrameTime = now - (elapsed % interval);
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. SUBTLE TACTICAL SECURITY GRID
      const gridSize = isMobile ? 90 : 80;
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.025)';
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

      // 2. NODES & NETWORK CONNECTIONS
      const maxConnectDist = isMobile ? 110 : 140;

      nodes.forEach((node, i) => {
        if (!prefersReducedMotion) {
          node.x += node.vx;
          node.y += node.vy;

          if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
          if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

          // Gentle mouse proximity drift
          if (mouse.x !== null && mouse.y !== null) {
            const dx = mouse.x - node.x;
            const dy = mouse.y - node.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < mouse.radius) {
              const force = (mouse.radius - dist) / mouse.radius;
              node.x -= (dx / dist) * force * 0.8;
              node.y -= (dy / dist) * force * 0.8;
            }
          }
        }

        // Render network connection lines
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = other.x - node.x;
          const dy = other.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectDist) {
            const alpha = (1 - dist / maxConnectDist) * 0.12;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 0.65;
            ctx.stroke();

            // Very rare data pulse packet (only if motion allowed)
            if (!prefersReducedMotion && Math.random() < 0.0004 && packets.length < 8) {
              packets.push({
                x1: node.x,
                y1: node.y,
                x2: other.x,
                y2: other.y,
                progress: 0,
                speed: 0.008 + Math.random() * 0.008
              });
            }
          }
        }

        // Node Glowing Dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${node.baseColor}0.45)`;
        ctx.shadowColor = `${node.baseColor}0.5)`;
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // 3. LOW-OPACITY PACKET TRAVEL PULSES
      if (!prefersReducedMotion) {
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
          ctx.arc(currX, currY, 1.8, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(56, 189, 248, 0.65)';
          ctx.shadowColor = 'rgba(56, 189, 248, 0.5)';
          ctx.shadowBlur = 4;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // 4. DESKTOP CURSOR-FOLLOWING SUBTLE AMBIENT GLOW
      if (!isMobile && !prefersReducedMotion && mouse.x !== null && mouse.y !== null) {
        const glowGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 220);
        glowGrad.addColorStop(0, 'rgba(56, 189, 248, 0.07)');
        glowGrad.addColorStop(0.5, 'rgba(99, 102, 241, 0.025)');
        glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = glowGrad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (activityTimeout) clearTimeout(activityTimeout);
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleMotionChange);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
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
  );
}

