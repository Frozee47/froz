import React, { useEffect, useRef } from 'react';
import { LogOut } from 'lucide-react';

interface RoseGardenProps {
  onReset?: () => void;
}

const RoseGarden: React.FC<RoseGardenProps> = ({ onReset }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // --- FIREWORKS LOGIC ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles: Particle[] = [];
    const rockets: Rocket[] = [];
    let frameCount = 0;
    
    class Rocket {
      x: number;
      y: number;
      vy: number;
      color: string;
      exploded: boolean;
      type: 'heart' | 'normal';

      constructor() {
        this.x = Math.random() * width;
        this.y = height;
        // Launch higher to explode in the sky
        this.vy = -(Math.random() * 4 + 14); 
        // Golden, Red, Pink, Purple hues
        const hues = [340, 350, 0, 10, 45, 280];
        const hue = hues[Math.floor(Math.random() * hues.length)];
        this.color = `hsl(${hue}, 100%, 70%)`;
        this.exploded = false;
        this.type = Math.random() > 0.3 ? 'heart' : 'normal';
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        // Trail effect
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y + 15);
        ctx.strokeStyle = `rgba(255, 255, 255, 0.4)`;
        ctx.stroke();
      }

      update() {
        this.y += this.vy;
        this.vy += 0.2; // Gravity

        // Explode when slowing down
        if (this.vy >= -1 && !this.exploded) {
          this.exploded = true;
          createExplosion(this.x, this.y, this.color, this.type);
        }
      }
    }

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;
      decay: number;
      size: number;

      constructor(x: number, y: number, color: string, velocityX: number, velocityY: number) {
        this.x = x;
        this.y = y;
        this.vx = velocityX;
        this.vy = velocityY;
        this.alpha = 1;
        this.color = color;
        this.decay = Math.random() * 0.015 + 0.005;
        this.size = Math.random() * 2 + 1;
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.restore();
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.05; // Gravity
        this.vx *= 0.96; // Friction
        this.vy *= 0.96;
        this.alpha -= this.decay;
      }
    }

    function createExplosion(x: number, y: number, color: string, type: 'heart' | 'normal') {
      
      if (type === 'heart') {
        // Heart Shape Calculation
        const particleCount = 80;
        for (let i = 0; i < particleCount; i++) {
          const angle = (Math.PI * 2 * i) / particleCount;
          
          // Heart formula parametric equations
          // x = 16sin^3(t)
          // y = 13cos(t) - 5cos(2t) - 2cos(3t) - cos(4t)
          
          const force = Math.random() * 1.5 + 1;
          const vx = (16 * Math.pow(Math.sin(angle), 3)) * (force / 20);
          // Flip Y because canvas Y is down
          const vy = -(13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle)) * (force / 20);

          particles.push(new Particle(x, y, color, vx, vy));
        }
      } else {
        // Normal spherical explosion
        for (let i = 0; i < 50; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 5 + 2;
          const vx = Math.cos(angle) * speed;
          const vy = Math.sin(angle) * speed;
          particles.push(new Particle(x, y, color, vx, vy));
        }
      }
      
      // Sparkles (Glitter)
      for(let i=0; i<20; i++) {
         const angle = Math.random() * Math.PI * 2;
         const v = Math.random() * 3;
         particles.push(new Particle(x, y, '#FFFFFF', Math.cos(angle)*v, Math.sin(angle)*v));
      }
    }

    function animate() {
      if (!ctx) return;
      frameCount++;
      
      // Light trail effect (longer trails)
      ctx.fillStyle = 'rgba(2, 0, 5, 0.2)'; 
      ctx.fillRect(0, 0, width, height);

      // Rocket spawn logic
      // Start slow, then increase intensity after 2 seconds (approx 120 frames)
      let spawnChance = 0.02;
      if (frameCount > 150) spawnChance = 0.05; // More intense after flowers start blooming
      if (frameCount > 300) spawnChance = 0.08; // Grand finale

      if (Math.random() < spawnChance) {
        rockets.push(new Rocket());
      }

      // Update Rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        rockets[i].update();
        rockets[i].draw();
        if (rockets[i].exploded) {
          rockets.splice(i, 1);
        }
      }

      // Update Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].alpha <= 0) {
          particles.splice(i, 1);
        }
      }

      requestAnimationFrame(animate);
    }

    const animationId = requestAnimationFrame(animate);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden font-sans pointer-events-auto">
      
      <style>{`
        /* --- CORE COLORS & GRADIENTS --- */
        :root {
          --color-bg: linear-gradient(to top, #020005, #0f0c29, #302b63, #24243e);
          --stem-color: linear-gradient(to left, rgba(0,0,0,0.5), transparent, rgba(255,255,255,0.1)), linear-gradient(to top, transparent 5%, #08240b, #1a5c0d);
          --flower-core: #8a0319;
          --flower-light: #ff0a37;
        }

        .night {
          position: fixed;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background-image: var(--color-bg);
          opacity: 0;
          animation: fade-in-night 2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          z-index: -2; 
        }

        @keyframes fade-in-night {
          to { opacity: 1; }
        }

        /* --- FIREWORKS CANVAS --- */
        #fireworks-canvas {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1; /* Behind flowers but in front of moon */
            pointer-events: none;
        }

        /* --- SKY LANTERNS (DILEK FENERLERI) --- */
        .lantern-container {
            position: absolute;
            bottom: -50px;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
        }

        .lantern {
            position: absolute;
            background: linear-gradient(to top, #ff9a9e 0%, #fecfef 99%, #fecfef 100%);
            width: 20px;
            height: 30px;
            border-radius: 5px 5px 10px 10px;
            opacity: 0.8;
            box-shadow: 0 0 10px #ff9a9e, 0 0 20px #ff6a00;
            animation: floatUp linear forwards;
        }
        
        .lantern::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 20%;
            width: 60%;
            height: 2px;
            background: #ffaa00;
            box-shadow: 0 0 4px #ffaa00;
        }

        @keyframes floatUp {
            0% { transform: translateY(0) scale(0.5) rotate(0deg); opacity: 0; }
            10% { opacity: 0.9; }
            100% { transform: translateY(-120vh) scale(1) rotate(5deg); opacity: 0; }
        }

        /* --- CELESTIAL ELEMENTS --- */
        .moon {
          position: absolute;
          top: 10vh;
          right: 10vw;
          width: 15vmin;
          height: 15vmin;
          background: radial-gradient(circle at 30% 30%, #fffef0, #fcf6ba);
          border-radius: 50%;
          box-shadow: 0 0 40px #fcf6ba, 0 0 100px rgba(255, 252, 221, 0.4);
          opacity: 0;
          animation: moon-rise 3s ease-out forwards 0.5s;
          z-index: 0;
        }
        
        /* Moon crater details */
        .moon::before {
            content: '';
            position: absolute;
            top: 20%;
            left: 25%;
            width: 15%;
            height: 15%;
            background: rgba(200, 200, 180, 0.2);
            border-radius: 50%;
        }
        .moon::after {
            content: '';
            position: absolute;
            top: 60%;
            left: 65%;
            width: 25%;
            height: 20%;
            background: rgba(200, 200, 180, 0.15);
            border-radius: 50%;
            transform: rotate(-45deg);
        }

        @keyframes moon-rise {
          from { opacity: 0; transform: translateY(50px) scale(0.8); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .star {
          position: absolute;
          background: white;
          border-radius: 50%;
          opacity: 0;
          box-shadow: 0 0 8px rgba(255,255,255,0.9);
          animation: twinkle 4s infinite ease-in-out;
          z-index: 0;
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.4); box-shadow: 0 0 12px white; }
        }

        /* --- FLOWER ANIMATIONS --- */
        .flower {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 50vmin;
          height: 100%;
          z-index: 10;
          pointer-events: none;
        }

        .flower--1 { animation: sway-1 5s ease-in-out infinite alternate; }
        .flower--2 { left: 15%; transform: translateX(-50%) scale(0.7); animation: sway-2 6s ease-in-out infinite alternate; }
        .flower--3 { left: 85%; transform: translateX(-50%) scale(0.65); animation: sway-3 5.5s ease-in-out infinite alternate; }
        /* Extra Flowers */
        .flower--4 { left: 35%; transform: translateX(-50%) scale(0.5); z-index: 9; animation: sway-2 7s ease-in-out infinite alternate; filter: brightness(0.8); }
        .flower--5 { left: 65%; transform: translateX(-50%) scale(0.45); z-index: 9; animation: sway-3 6.5s ease-in-out infinite alternate; filter: brightness(0.8); }

        .flower__leafs {
          position: absolute;
          bottom: 55vmin;
          left: 50%;
          transform: translateX(-50%);
          width: 30vmin;
          height: 30vmin;
          z-index: 2;
          animation: bloom-pop 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) backwards; 
        }
        
        /* Staggered blooming */
        .flower--1 .flower__leafs { animation-delay: 1.5s; }
        .flower--2 .flower__leafs { animation-delay: 1.8s; }
        .flower--3 .flower__leafs { animation-delay: 2.1s; }
        .flower--4 .flower__leafs { animation-delay: 2.3s; }
        .flower--5 .flower__leafs { animation-delay: 2.5s; }

        .flower__leaf {
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 8vmin;
          height: 11vmin;
          border-radius: 51% 49% 47% 53% / 44% 45% 55% 69%;
          background-color: var(--flower-core);
          background-image: linear-gradient(to top, var(--flower-core), var(--flower-light));
          transform-origin: bottom center;
          opacity: 0.95;
          box-shadow: inset 0 0 2vmin rgba(255, 255, 255, 0.1), 0 0 10px rgba(138, 3, 25, 0.5);
        }

        .flower__leaf--1 { transform: translate(-10%, 1%) rotateY(40deg) rotateX(-50deg); }
        .flower__leaf--2 { transform: translate(-50%, -4%) rotateX(40deg); }
        .flower__leaf--3 { transform: translate(-90%, 0%) rotateY(45deg) rotateX(50deg); }
        
        .flower__leaf--4 { 
          width: 8vmin; 
          height: 8vmin; 
          transform-origin: bottom left; 
          border-radius: 4vmin 10vmin 4vmin 4vmin; 
          transform: translate(0%, 18%) rotateX(70deg) rotate(-43deg); 
          background-image: linear-gradient(to top, #660213, #ff2e55);
          z-index: 1; 
          opacity: 1;
          box-shadow: 0 0 10px rgba(255, 46, 85, 0.3);
        }

        .flower__white-circle {
          position: absolute;
          left: -3.5vmin;
          top: -3vmin;
          width: 9vmin;
          height: 4vmin;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.1);
          filter: blur(5px);
        }

        .flower__line {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 2vmin;
          height: 55vmin;
          background-image: var(--stem-color);
          border-radius: 4vmin;
          z-index: 1;
          transform-origin: bottom center;
          animation: grow-stem 2s cubic-bezier(0.4, 0, 0.2, 1) backwards;
        }

        .flower--1 .flower__line { animation-delay: 0.2s; }
        .flower--2 .flower__line { animation-delay: 0.5s; }
        .flower--3 .flower__line { animation-delay: 0.8s; }
        .flower--4 .flower__line { animation-delay: 1.0s; }
        .flower--5 .flower__line { animation-delay: 1.2s; }

        .flower__line__leaf {
          position: absolute;
          width: 7vmin;
          height: 9vmin;
          border-top-right-radius: 9vmin;
          border-bottom-left-radius: 9vmin;
          background-image: linear-gradient(to top, rgba(20, 68, 37, 0.8), #38b000);
          box-shadow: 0 0 5px rgba(56, 176, 0, 0.2);
          opacity: 0;
          animation: leaf-appear 1s ease-out forwards;
        }
        
        .flower__line__leaf--1 { top: 20%; left: 90%; transform: rotate(70deg) rotateY(30deg); animation-delay: 0.8s; }
        .flower__line__leaf--2 { top: 45%; left: 90%; transform: rotate(70deg) rotateY(30deg); animation-delay: 1.0s; }
        .flower__line__leaf--3 { top: 50%; left: -350%; transform: rotate(-70deg) rotateY(30deg); animation-delay: 1.2s; }
        .flower__line__leaf--4 { top: 40%; left: -350%; transform: rotate(-70deg) rotateY(30deg); animation-delay: 1.1s; }

        /* Animation Keyframes */
        @keyframes sway-1 { 0% { transform: translateX(-50%) rotate(1deg); } 100% { transform: translateX(-50%) rotate(-1deg); } }
        @keyframes sway-2 { 0% { transform: translateX(-50%) scale(0.7) rotate(2deg); } 100% { transform: translateX(-50%) scale(0.7) rotate(-2deg); } }
        @keyframes sway-3 { 0% { transform: translateX(-50%) scale(0.6) rotate(-1deg); } 100% { transform: translateX(-50%) scale(0.6) rotate(1deg); } }
        @keyframes grow-stem { 0% { height: 0; } 100% { height: 55vmin; } }
        @keyframes bloom-pop { 0% { transform: translateX(-50%) scale(0); opacity: 0; } 60% { transform: translateX(-50%) scale(1.1); opacity: 1; } 100% { transform: translateX(-50%) scale(1); opacity: 1; } }
        @keyframes leaf-appear { 0% { opacity: 0; transform: scale(0); } 100% { opacity: 1; } }

        /* --- FINAL MESSAGE TEXT --- */
        .thank-you-text {
            position: absolute;
            top: 25%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            opacity: 0;
            animation: fade-text 2s ease-out forwards 4s;
            z-index: 5;
            width: 100%;
        }
        @keyframes fade-text {
            to { opacity: 1; top: 20%; }
        }

      `}</style>

      {/* The Night Background */}
      <div className="night"></div>
      
      {/* Fireworks Canvas Overlay */}
      <canvas ref={canvasRef} id="fireworks-canvas" />

      {/* Sky Lanterns (Generated via code for randomization) */}
      <div className="lantern-container">
         {Array.from({ length: 15 }).map((_, i) => (
             <div 
                key={i} 
                className="lantern"
                style={{
                    left: `${Math.random() * 100}%`,
                    animationDuration: `${15 + Math.random() * 20}s`,
                    animationDelay: `${Math.random() * 5}s`,
                    transform: `scale(${0.5 + Math.random() * 0.5})`
                }}
             />
         ))}
      </div>

      {/* Magnificent Moon */}
      <div className="moon"></div>

      {/* Stars (Increased count) */}
      {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
                top: `${Math.random() * 60}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 3}px`,
                height: `${Math.random() * 3}px`,
                animationDelay: `${Math.random() * 4}s`
            }}
          />
      ))}

      {/* Thank You Message in the Sky */}
      <div className="thank-you-text font-serif text-white/90 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
          <h2 className="text-3xl md:text-5xl font-bold mb-2 tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 to-yellow-500">Teşekkürler</h2>
          <p className="text-lg font-hand text-yellow-100/80">Işığınız hiç sönmesin...</p>
      </div>

      {/* Flower 1 (Center) */}
      <div className="flower flower--1">
        <div className="flower__leafs">
          <div className="flower__leaf flower__leaf--1"></div>
          <div className="flower__leaf flower__leaf--2"></div>
          <div className="flower__leaf flower__leaf--3"></div>
          <div className="flower__leaf flower__leaf--4"></div>
          <div className="flower__white-circle"></div>
        </div>
        <div className="flower__line">
          <div className="flower__line__leaf flower__line__leaf--1"></div>
          <div className="flower__line__leaf flower__line__leaf--2"></div>
        </div>
      </div>

      {/* Flower 2 (Left) */}
      <div className="flower flower--2">
        <div className="flower__leafs">
          <div className="flower__leaf flower__leaf--1"></div>
          <div className="flower__leaf flower__leaf--2"></div>
          <div className="flower__leaf flower__leaf--3"></div>
          <div className="flower__leaf flower__leaf--4"></div>
          <div className="flower__white-circle"></div>
        </div>
        <div className="flower__line">
          <div className="flower__line__leaf flower__line__leaf--1"></div>
          <div className="flower__line__leaf flower__line__leaf--3"></div>
        </div>
      </div>

      {/* Flower 3 (Right) */}
      <div className="flower flower--3">
        <div className="flower__leafs">
          <div className="flower__leaf flower__leaf--1"></div>
          <div className="flower__leaf flower__leaf--2"></div>
          <div className="flower__leaf flower__leaf--3"></div>
          <div className="flower__leaf flower__leaf--4"></div>
          <div className="flower__white-circle"></div>
        </div>
        <div className="flower__line">
           <div className="flower__line__leaf flower__line__leaf--2"></div>
           <div className="flower__line__leaf flower__line__leaf--4"></div>
        </div>
      </div>
      
      {/* Flower 4 (Back Left) */}
      <div className="flower flower--4">
        <div className="flower__leafs">
          <div className="flower__leaf flower__leaf--1"></div>
          <div className="flower__leaf flower__leaf--2"></div>
          <div className="flower__leaf flower__leaf--4"></div>
        </div>
        <div className="flower__line">
           <div className="flower__line__leaf flower__line__leaf--1"></div>
        </div>
      </div>

       {/* Flower 5 (Back Right) */}
       <div className="flower flower--5">
        <div className="flower__leafs">
          <div className="flower__leaf flower__leaf--1"></div>
          <div className="flower__leaf flower__leaf--2"></div>
          <div className="flower__leaf flower__leaf--4"></div>
        </div>
        <div className="flower__line">
           <div className="flower__line__leaf flower__line__leaf--3"></div>
        </div>
      </div>

      {/* Exit Button */}
      {onReset && (
        <button 
          onClick={onReset}
          className="absolute bottom-8 right-8 z-[120] flex items-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-white/60 hover:bg-white/10 hover:text-white transition-all duration-300 font-serif tracking-widest uppercase text-xs cursor-pointer hover:shadow-lg hover:shadow-white/10 group"
        >
          <LogOut size={14} className="group-hover:-translate-x-1 transition-transform" />
          Büyüyü Sonlandır
        </button>
      )}

    </div>
  );
};

export default RoseGarden;