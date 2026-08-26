import React, { useEffect, useRef, memo } from "react";

const GOLD_COLOR = "201, 163, 78";

function BackgroundStars() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Respect user motion preferences
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Retina / High-DPI screen scaling
    const setupCanvasScale = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    setupCanvasScale();

    // Dynamic resize handler
    const handleResize = () => {
      if (!canvas) return;
      setupCanvasScale();
    };
    window.addEventListener("resize", handleResize);

    // Initialise particles with responsive density (mobile optimization)
    const isMobile = width < 768;
    const particleCount = isMobile ? 22 : 45;
    const maxDistance = isMobile ? 90 : 120;
    
    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      alpha: number;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle connections & update positions
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        // Strict boundary clamping and bounce
        if (p1.x < 0) {
          p1.x = 0;
          p1.vx *= -1;
        } else if (p1.x > width) {
          p1.x = width;
          p1.vx *= -1;
        }

        if (p1.y < 0) {
          p1.y = 0;
          p1.vy *= -1;
        } else if (p1.y > height) {
          p1.y = height;
          p1.vy *= -1;
        }

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${GOLD_COLOR}, ${p1.alpha})`;
        ctx.fill();

        // Draw connecting lines with proximity falloff
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < maxDistance) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            const lineAlpha = (1 - dist / maxDistance) * 0.12;
            ctx.strokeStyle = `rgba(${GOLD_COLOR}, ${lineAlpha})`;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-60"
      id="particles-js"
    />
  );
}

export default memo(BackgroundStars);
