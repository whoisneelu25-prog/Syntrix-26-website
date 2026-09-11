import React, { useEffect, useRef } from 'react';

interface StarFieldProps {
  density?: number;
  speed?: number;
  interactive?: boolean;
}

interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  twinkleSpeed: number;
  depth: number;
}

interface Comet {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  alpha: number;
  active: boolean;
}

export const StarField: React.FC<StarFieldProps> = ({
  density = 150,
  speed = 0.2,
  interactive = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

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

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      mouseRef.current.targetX = (e.clientX - width / 2) * 0.03;
      mouseRef.current.targetY = (e.clientY - height / 2) * 0.03;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Initialize stars
    const stars: Star[] = [];
    const count = Math.min(density, Math.floor((width * height) / 8000));
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.8 + 0.4,
        alpha: Math.random() * 0.8 + 0.2,
        baseAlpha: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.03 + 0.005,
        depth: Math.random() * 2 + 0.5,
      });
    }

    // Comets
    const comets: Comet[] = [];
    const spawnComet = () => {
      comets.push({
        x: Math.random() * width * 1.2 - width * 0.1,
        y: -20,
        length: Math.random() * 120 + 80,
        speed: Math.random() * 8 + 6,
        angle: (Math.PI / 4) + (Math.random() * 0.2 - 0.1),
        alpha: 1,
        active: true,
      });
    };

    let cometTimer = setInterval(() => {
      if (Math.random() > 0.4) {
        spawnComet();
      }
    }, 4500);

    // Render loop
    let tick = 0;
    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse parallax
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Draw stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Twinkle
        star.alpha = star.baseAlpha + Math.sin(tick * star.twinkleSpeed) * 0.3;
        star.alpha = Math.max(0.1, Math.min(1, star.alpha));

        // Parallax drift
        const renderX = (star.x + mouseRef.current.x * star.depth + width) % width;
        const renderY = (star.y + mouseRef.current.y * star.depth + (tick * speed * star.depth * 0.2)) % height;

        ctx.fillStyle = i % 8 === 0 ? `rgba(0, 240, 255, ${star.alpha})` : i % 12 === 0 ? `rgba(168, 85, 247, ${star.alpha})` : `rgba(255, 255, 255, ${star.alpha})`;
        ctx.beginPath();
        ctx.arc(renderX, renderY, star.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw comets
      for (let i = comets.length - 1; i >= 0; i--) {
        const c = comets[i];
        if (!c.active) {
          comets.splice(i, 1);
          continue;
        }

        c.x += Math.cos(c.angle) * c.speed;
        c.y += Math.sin(c.angle) * c.speed;
        c.alpha -= 0.008;

        if (c.y > height + 100 || c.x > width + 100 || c.alpha <= 0) {
          c.active = false;
          continue;
        }

        const tailX = c.x - Math.cos(c.angle) * c.length;
        const tailY = c.y - Math.sin(c.angle) * c.length;

        const grad = ctx.createLinearGradient(tailX, tailY, c.x, c.y);
        grad.addColorStop(0, 'rgba(0, 240, 255, 0)');
        grad.addColorStop(0.7, `rgba(56, 189, 248, ${c.alpha * 0.6})`);
        grad.addColorStop(1, `rgba(255, 255, 255, ${c.alpha})`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(c.x, c.y);
        ctx.stroke();

        // Comet head glow
        ctx.fillStyle = `rgba(255, 255, 255, ${c.alpha})`;
        ctx.beginPath();
        ctx.arc(c.x, c.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(cometTimer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [density, speed, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-85"
      style={{ willChange: 'transform' }}
    />
  );
};
