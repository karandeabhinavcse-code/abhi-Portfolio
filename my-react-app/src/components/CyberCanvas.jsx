import { useEffect, useRef } from 'react';

export default function CyberCanvas() {
  const canvasRef = useRef(null);

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
    const densityFactor = 45;
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

    // Dynamic 60 to 120 FPS adaptive target throttle & activity tracker
    let targetFps = 60;
    let activityTimeout = null;
    let lastFrameTime = performance.now();

    const triggerDynamicFpsBoost = () => {
      targetFps = 120;
      if (activityTimeout) clearTimeout(activityTimeout);
      activityTimeout = setTimeout(() => {
        targetFps = 60;
      }, 1500);
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      triggerDynamicFpsBoost();
    };

    const handleScroll = () => {
      triggerDynamicFpsBoost();
    };

    const handleTouch = () => {
      triggerDynamicFpsBoost();
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleClick = (e) => {
      triggerDynamicFpsBoost();
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 5,
        maxRadius: 160,
        alpha: 0.85
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('touchmove', handleTouch, { passive: true });
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

    // Main Canvas Dynamic 60-120 FPS Render Loop
    const draw = (now) => {
      animationFrameId = requestAnimationFrame(draw);

      if (!now) now = performance.now();
      const elapsed = now - lastFrameTime;
      const interval = 1000 / targetFps;

      if (elapsed < interval - 1) return;

      lastFrameTime = now - (elapsed % interval);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. DRAW TACTICAL GRID LINES
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

      // 2. DRAW MATRIX DIGITAL RAIN
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

      // 3. DRAW TACTICAL SECURITY RADAR (Top Right Corner)
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

      // 4. DRAW MOUSE CLICK RIPPLES
      if (ripples.length > 0) {
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
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (activityTimeout) clearTimeout(activityTimeout);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchmove', handleTouch);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
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
