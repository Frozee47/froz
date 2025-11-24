import React, { useEffect, useRef } from 'react';
import { FloatingItem } from '../types';

const ICONS = ['📚', '✏️', '🎓', '🍎', '🌟', '📐', '🎨', '💡', '🌺'];

const CanvasBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const itemsRef = useRef<FloatingItem[]>([]);
  const requestRef = useRef<number>(0);

  const initItems = (width: number, height: number) => {
    const items: FloatingItem[] = [];
    const itemCount = Math.floor((width * height) / 25000); // Density based on screen size

    for (let i = 0; i < itemCount; i++) {
      items.push({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        speed: 0.2 + Math.random() * 0.5,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 0.5,
        scale: 0.5 + Math.random() * 1.5,
        icon: ICONS[Math.floor(Math.random() * ICONS.length)],
        opacity: 0.1 + Math.random() * 0.3,
      });
    }
    itemsRef.current = items;
  };

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    itemsRef.current.forEach((item) => {
      // Update position
      item.y -= item.speed;
      item.rotation += item.rotationSpeed;

      // Reset if off screen top
      if (item.y < -50) {
        item.y = canvas.height + 50;
        item.x = Math.random() * canvas.width;
      }

      // Draw
      ctx.save();
      ctx.translate(item.x, item.y);
      ctx.rotate((item.rotation * Math.PI) / 180);
      ctx.scale(item.scale, item.scale);
      ctx.globalAlpha = item.opacity;
      ctx.font = "24px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#FFFFFF"; // While emojis have their own color, this helps blending in some browsers
      ctx.fillText(item.icon, 0, 0);
      ctx.restore();
    });

    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initItems(window.innerWidth, window.innerHeight);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ background: 'linear-gradient(to bottom, #1a202c, #2d3748)' }}
    />
  );
};

export default CanvasBackground;
