import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  baseRadius: number;
  alpha: number;
  speedY: number;
  speedX: number;
  swaySpeed: number;
  swayDist: number;
  phase: number;
  color: string;
}

export const GoldParticles: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const colors = [
      'rgba(212, 175, 55, ',   // Classic Gold
      'rgba(243, 229, 171, ',  // Champagne Gold
      'rgba(224, 192, 122, ',  // Warm Gold
      'rgba(255, 236, 179, ',  // Bright Gold Light
      'rgba(184, 134, 11, ',   // Deep Antique Gold
    ];

    const particleCount = Math.min(45, Math.floor(width / 35));
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 0.8,
        baseRadius: Math.random() * 2.2 + 0.8,
        alpha: Math.random() * 0.65 + 0.25,
        speedY: -(Math.random() * 0.45 + 0.15),
        speedX: (Math.random() - 0.5) * 0.2,
        swaySpeed: Math.random() * 0.02 + 0.008,
        swayDist: Math.random() * 1.5 + 0.5,
        phase: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speedY;
        p.x += Math.sin(time * p.swaySpeed + p.phase) * p.swayDist + p.speedX;

        // Wrap around
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Draw soft glowing particle
        const pulse = 0.85 + Math.sin(time * 2 + p.phase) * 0.25;
        const currentAlpha = Math.max(0.05, Math.min(1, p.alpha * pulse));

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 2.5);
        grad.addColorStop(0, `${p.color}${currentAlpha})`);
        grad.addColorStop(0.4, `${p.color}${currentAlpha * 0.6})`);
        grad.addColorStop(1, `${p.color}0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Core sharp center
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha * 0.85})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 z-10 opacity-70 ${className}`}
      aria-hidden="true"
    />
  );
};
