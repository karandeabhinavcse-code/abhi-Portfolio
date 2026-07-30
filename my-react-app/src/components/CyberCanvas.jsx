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

    // Nodes setup
    const nodeCount = Math.floor(Math.min(window.innerWidth / 22, 55));
    const nodes = [];

    let mouse = {
      x: null,
      y: null,
      radius: 200
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2.5 + 1.5,
        baseColor: i % 3 === 0 ? 'rgba(79, 70, 229, ' : i % 3 === 1 ? 'rgba(8, 145, 178, ' : 'rgba(5, 150, 105, '
      });
    }

    // Floating Matrix code rain streams in background
    const chars = '01VAPTCCNASEC101001010101SYS01010101';
    const streamColumns = Math.floor(canvas.width / 45);
    const rainDrops = [];
    for (let i = 0; i < streamColumns; i++) {
      rainDrops[i] = Math.random() * -100;
    }

    // Security Radar Scan Angle
    let radarAngle = 0;

    const packets = [];

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Grid Lines
      const gridSize = 65;
      ctx.strokeStyle = 'rgba(203, 213, 225, 0.35)';
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

      // Draw Matrix Code Rain
      ctx.fillStyle = 'rgba(8, 145, 178, 0.12)';
      ctx.font = '10px "JetBrains Mono", monospace';
      for (let i = 0; i < rainDrops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * 45;
        const y = rainDrops[i] * 18;

        if (y > 0 && y < canvas.height) {
          ctx.fillText(char, x, y);
        }

        if (y > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }

      // Draw Security Radar Scan Beam at Center Top
      radarAngle += 0.008;
      const radarCenterX = canvas.width * 0.85;
      const radarCenterY = canvas.height * 0.18;
      const radarRadius = 140;

      ctx.beginPath();
      ctx.arc(radarCenterX, radarCenterY, radarRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(79, 70, 229, 0.08)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Radar Sweep Cone
      ctx.beginPath();
      ctx.moveTo(radarCenterX, radarCenterY);
      ctx.arc(radarCenterX, radarCenterY, radarRadius, radarAngle, radarAngle + 0.4);
      ctx.closePath();
      const sweepGrad = ctx.createRadialGradient(radarCenterX, radarCenterY, 5, radarCenterX, radarCenterY, radarRadius);
      sweepGrad.addColorStop(0, 'rgba(79, 70, 229, 0.15)');
      sweepGrad.addColorStop(1, 'rgba(79, 70, 229, 0)');
      ctx.fillStyle = sweepGrad;
      ctx.fill();

      // Update & Draw Nodes
      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Mouse interaction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            node.x -= (dx / dist) * force * 1.8;
            node.y -= (dy / dist) * force * 1.8;
          }
        }

        // Draw node connections
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = other.x - node.x;
          const dy = other.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            const alpha = (1 - dist / 140) * 0.28;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();

            // Spawn packet
            if (Math.random() < 0.001 && packets.length < 18) {
              packets.push({
                x1: node.x,
                y1: node.y,
                x2: other.x,
                y2: other.y,
                progress: 0,
                speed: 0.02 + Math.random() * 0.025
              });
            }
          }
        }

        // Draw Node Dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${node.baseColor} 0.65)`;
        ctx.fill();
      });

      // Update & Draw Packets
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
        ctx.arc(currX, currY, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(8, 145, 178, 0.95)';
        ctx.shadowColor = 'rgba(8, 145, 178, 0.7)';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
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
