import React from 'react';
import { LogOut } from 'lucide-react';

interface RoseGardenProps {
  onReset?: () => void;
}

const RoseGarden: React.FC<RoseGardenProps> = ({ onReset }) => {
  return (
    <div className="fixed inset-0 z-[60] overflow-hidden font-sans pointer-events-auto">
      
      <style>{`
        /* Flower Animation CSS - REFINED FLUIDITY EDITION */
        :root {
          --color-bg: linear-gradient(to top, #020005, #12000b); /* Deeper, richer night */
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
          animation: fade-in-night 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          z-index: -2; 
        }

        @keyframes fade-in-night {
          to { opacity: 1; }
        }

        /* NEBULA EFFECT */
        .nebula {
          position: fixed;
          top: 50%;
          left: 50%;
          width: 150vmax;
          height: 150vmax;
          background: radial-gradient(circle at center, rgba(120, 0, 30, 0.1), transparent 60%);
          transform: translate(-50%, -50%);
          mix-blend-mode: screen;
          animation: nebula-move 20s ease-in-out infinite alternate;
          pointer-events: none;
          z-index: -1;
          opacity: 0;
        }

        @keyframes nebula-move {
          0% { transform: translate(-50%, -50%) scale(1) rotate(0deg); opacity: 0; }
          100% { transform: translate(-50%, -50%) scale(1.1) rotate(5deg); opacity: 0.5; }
        }

        .moon {
          position: absolute;
          top: 8vh;
          right: 8vw;
          width: 12vmin;
          height: 12vmin;
          background: #fffcdd;
          border-radius: 50%;
          box-shadow: 0 0 20px #fffcdd, 0 0 60px #fffcdd, 0 0 100px rgba(255, 252, 221, 0.3);
          opacity: 0;
          animation: moon-rise 3s ease-out forwards 0.5s;
          z-index: 0;
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
          box-shadow: 0 0 5px rgba(255,255,255,0.8);
          animation: twinkle 4s infinite ease-in-out;
          z-index: 0;
        }
        /* Randomize stars */
        .star:nth-child(1) { top: 10%; left: 20%; width: 2px; height: 2px; animation-delay: 0s; }
        .star:nth-child(2) { top: 15%; left: 50%; width: 3px; height: 3px; animation-delay: 0.5s; }
        .star:nth-child(3) { top: 25%; left: 80%; width: 2px; height: 2px; animation-delay: 1s; }
        .star:nth-child(4) { top: 40%; left: 10%; width: 3px; height: 3px; animation-delay: 1.5s; }
        .star:nth-child(5) { top: 30%; left: 40%; width: 2px; height: 2px; animation-delay: 2s; }
        .star:nth-child(6) { top: 5%; left: 85%; width: 2px; height: 2px; animation-delay: 3s; }
        .star:nth-child(7) { top: 20%; left: 5%; width: 3px; height: 3px; animation-delay: 2.5s; }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 0.9; transform: scale(1.3); }
        }

        /* SHOOTING STARS */
        .shooting-star-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: -1; 
        }
        
        .shooting-star {
          position: absolute;
          height: 2px;
          background: linear-gradient(-45deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
          border-radius: 999px;
          filter: drop-shadow(0 0 6px rgba(255, 255, 255, 1));
          animation: tail 3000ms ease-in-out infinite, shooting 3000ms ease-in-out infinite;
          opacity: 0;
        }
        
        .shooting-star::before, .shooting-star::after {
          content: '';
          position: absolute;
          top: calc(50% - 1px);
          right: 0;
          height: 2px;
          background: linear-gradient(-45deg, rgba(0, 0, 255, 0), rgba(255, 255, 255, 1), rgba(0, 0, 255, 0));
          transform: translateX(50%) rotateZ(45deg);
          border-radius: 100%;
          animation: shining 3000ms ease-in-out infinite;
        }

        .shooting-star:nth-child(1) { top: 0; left: 50%; animation-delay: 2s; }
        .shooting-star:nth-child(2) { top: 10%; left: 70%; animation-delay: 4s; }
        .shooting-star:nth-child(3) { top: 0; left: 80%; animation-delay: 6.5s; }
        .shooting-star:nth-child(4) { top: 15%; left: 30%; animation-delay: 8s; }
        .shooting-star:nth-child(5) { top: 5%; left: 10%; animation-delay: 5s; }
        .shooting-star:nth-child(6) { top: 20%; left: 60%; animation-delay: 9s; }

        @keyframes tail {
          0% { width: 0; }
          30% { width: 100px; }
          100% { width: 0; }
        }

        @keyframes shooting {
          0% { transform: translateX(0) translateY(0) rotate(215deg); opacity: 1; }
          100% { transform: translateX(-300px) translateY(300px) rotate(215deg); opacity: 0; }
        }

        @keyframes shining {
          0% { width: 0; }
          50% { width: 30px; }
          100% { width: 0; }
        }

        /* BACKGROUND FIREFLIES (Free roaming) */
        .bg-firefly {
          position: absolute;
          width: 3px;
          height: 3px;
          background: #ffd700;
          border-radius: 50%;
          box-shadow: 0 0 8px #ffd700, 0 0 15px #ff8c00;
          opacity: 0;
          z-index: 1;
          animation: wandering-firefly 15s linear infinite;
        }
        
        .bg-firefly--1 { top: 80%; left: 10%; --move-x: 100px; --move-y: -100px; animation-delay: 1s; }
        .bg-firefly--2 { top: 60%; left: 90%; --move-x: -80px; --move-y: -120px; animation-delay: 3s; }
        .bg-firefly--3 { top: 40%; left: 20%; --move-x: 50px; --move-y: 100px; animation-delay: 5s; }
        .bg-firefly--4 { top: 90%; left: 50%; --move-x: -100px; --move-y: -50px; animation-delay: 0s; }
        .bg-firefly--5 { top: 30%; left: 80%; --move-x: -60px; --move-y: 60px; animation-delay: 7s; }

        @keyframes wandering-firefly {
          0% { opacity: 0; transform: translate(0, 0) scale(1); }
          20% { opacity: 0.8; }
          80% { opacity: 0.8; }
          100% { opacity: 0; transform: translate(var(--move-x), var(--move-y)) scale(0.5); }
        }

        /* Container for a single flower */
        .flower {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 50vmin;
          height: 100%; /* Occupy full height for calculation */
          z-index: 10;
          pointer-events: none;
        }

        /* Swaying motion */
        .flower--1 { animation: sway-1 5s ease-in-out infinite alternate; }
        .flower--2 { left: 20%; transform: translateX(-50%) scale(0.7); animation: sway-2 6s ease-in-out infinite alternate; }
        .flower--3 { left: 80%; transform: translateX(-50%) scale(0.6); animation: sway-3 5.5s ease-in-out infinite alternate; }

        /* FLOWER HEAD (Petals) */
        .flower__leafs {
          position: absolute;
          bottom: 55vmin; /* Match Stem Height */
          left: 50%;
          transform: translateX(-50%);
          width: 30vmin;
          height: 30vmin;
          z-index: 2;
          /* The Magic Pop Animation */
          animation: bloom-pop 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) backwards; 
        }
        
        /* Staggered blooming - wait for stem to grow */
        .flower--1 .flower__leafs { animation-delay: 1.5s; }
        .flower--2 .flower__leafs { animation-delay: 1.8s; }
        .flower--3 .flower__leafs { animation-delay: 2.1s; }

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
        
        /* Center petal */
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

        /* FLOWER STEM (Line) */
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
          /* Grow up animation */
          animation: grow-stem 2s cubic-bezier(0.4, 0, 0.2, 1) backwards;
        }

        .flower--1 .flower__line { animation-delay: 0.2s; }
        .flower--2 .flower__line { animation-delay: 0.5s; }
        .flower--3 .flower__line { animation-delay: 0.8s; }

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
        .flower__line__leaf--5 { top: 0; transform-origin: left; transform: rotate(70deg) rotateY(30deg) scale(0.6); animation-delay: 1.8s; }
        .flower__line__leaf--6 { top: -10%; left: -350%; transform-origin: right; transform: rotate(-70deg) rotateY(30deg) scale(0.6); animation-delay: 1.9s; }

        /* FIREFLIES (Attached to flower) */
        .flower__light {
          position: absolute;
          bottom: 0;
          width: 1vmin;
          height: 1vmin;
          background-color: #ffd700;
          border-radius: 50%;
          filter: blur(0.2vmin);
          opacity: 0;
          animation: float-lights 4s ease-in-out infinite;
          box-shadow: 0 0 10px #ffd700;
        }

        .flower__light--1 { left: -5vmin; animation-delay: 2.5s; }
        .flower__light--2 { left: 8vmin; animation-delay: 3s; }
        .flower__light--3 { left: -10vmin; animation-delay: 3.5s; }
        .flower__light--4 { left: 5vmin; animation-delay: 4s; }

        /* KEYFRAMES */
        @keyframes sway-1 { 0% { transform: translateX(-50%) rotate(1deg); } 100% { transform: translateX(-50%) rotate(-1deg); } }
        @keyframes sway-2 { 0% { transform: translateX(-50%) scale(0.7) rotate(2deg); } 100% { transform: translateX(-50%) scale(0.7) rotate(-2deg); } }
        @keyframes sway-3 { 0% { transform: translateX(-50%) scale(0.6) rotate(-1deg); } 100% { transform: translateX(-50%) scale(0.6) rotate(1deg); } }

        @keyframes grow-stem {
          0% { height: 0; }
          100% { height: 55vmin; }
        }

        @keyframes bloom-pop {
          0% { transform: translateX(-50%) scale(0); opacity: 0; }
          60% { transform: translateX(-50%) scale(1.1); opacity: 1; }
          100% { transform: translateX(-50%) scale(1); opacity: 1; }
        }

        @keyframes leaf-appear {
          0% { opacity: 0; transform: scale(0) rotate(0deg); }
          100% { opacity: 1; } /* Transform is handled by class specific rules, just fade/scale in */
        }

        @keyframes float-lights {
          0% { opacity: 0; transform: translateY(0) translateX(0); }
          25% { opacity: 0.8; transform: translateY(-15vmin) translateX(5vmin); }
          50% { opacity: 0; transform: translateY(-30vmin) translateX(-5vmin); }
          75% { opacity: 0; transform: translateY(0); }
          100% { opacity: 0; }
        }

        /* Grass Animation */
        .flower__grass {
          --c: #1a5c0d;
          position: absolute;
          bottom: 0;
          left: 50%;
          transform-origin: bottom center;
          z-index: 20;
          transform: translateX(-50%) scale(0);
          animation: grow-grass 1s ease-out forwards 0.5s;
        }
        
        .flower__grass--1 { left: 20%; animation-delay: 0.7s; }
        .flower__grass--2 { left: 80%; animation-delay: 0.9s; }

        @keyframes grow-grass {
          0% { transform: translateX(-50%) scale(0); }
          80% { transform: translateX(-50%) scale(1.1); }
          100% { transform: translateX(-50%) scale(1); }
        }

        .flower__grass__leaf {
          position: absolute;
          bottom: 0;
          width: 2vmin;
          height: 15vmin;
          background: linear-gradient(to top, transparent, var(--c));
          border-radius: 50% 50% 0 0;
        }
        
        .flower__grass__leaf--1 { transform: rotate(-15deg); height: 12vmin; left: -2vmin; }
        .flower__grass__leaf--2 { transform: rotate(15deg); height: 18vmin; left: 2vmin; }

      `}</style>

      {/* The Night Background */}
      <div className="night"></div>

      {/* Nebula Effect */}
      <div className="nebula"></div>

      {/* Shooting Stars Container */}
      <div className="shooting-star-container">
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
      </div>

      {/* Background Fireflies */}
      <div className="bg-firefly bg-firefly--1"></div>
      <div className="bg-firefly bg-firefly--2"></div>
      <div className="bg-firefly bg-firefly--3"></div>
      <div className="bg-firefly bg-firefly--4"></div>
      <div className="bg-firefly bg-firefly--5"></div>

      {/* Magnificent Moon */}
      <div className="moon"></div>

      {/* Twinkling Stars */}
      <div className="star"></div>
      <div className="star"></div>
      <div className="star"></div>
      <div className="star"></div>
      <div className="star"></div>
      <div className="star"></div>
      <div className="star"></div>

      {/* Flower 1 (Center) */}
      <div className="flower flower--1">
        <div className="flower__leafs">
          <div className="flower__leaf flower__leaf--1"></div>
          <div className="flower__leaf flower__leaf--2"></div>
          <div className="flower__leaf flower__leaf--3"></div>
          <div className="flower__leaf flower__leaf--4"></div>
          <div className="flower__white-circle"></div>
          <div className="flower__light flower__light--1"></div>
          <div className="flower__light flower__light--2"></div>
        </div>
        <div className="flower__line">
          <div className="flower__line__leaf flower__line__leaf--1"></div>
          <div className="flower__line__leaf flower__line__leaf--2"></div>
          <div className="flower__line__leaf flower__line__leaf--3"></div>
          <div className="flower__line__leaf flower__line__leaf--4"></div>
          <div className="flower__line__leaf flower__line__leaf--5"></div>
          <div className="flower__line__leaf flower__line__leaf--6"></div>
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
          <div className="flower__light flower__light--3"></div>
        </div>
        <div className="flower__line">
          <div className="flower__line__leaf flower__line__leaf--1"></div>
          <div className="flower__line__leaf flower__line__leaf--2"></div>
          <div className="flower__line__leaf flower__line__leaf--3"></div>
          <div className="flower__line__leaf flower__line__leaf--4"></div>
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
          <div className="flower__light flower__light--4"></div>
        </div>
        <div className="flower__line">
          <div className="flower__line__leaf flower__line__leaf--1"></div>
          <div className="flower__line__leaf flower__line__leaf--2"></div>
          <div className="flower__line__leaf flower__line__leaf--3"></div>
          <div className="flower__line__leaf flower__line__leaf--4"></div>
        </div>
      </div>

      {/* Decorative Grass at bottom */}
      <div className="flower__grass flower__grass--1">
         <div className="flower__grass__leaf flower__grass__leaf--1"></div>
         <div className="flower__grass__leaf flower__grass__leaf--2"></div>
      </div>
      <div className="flower__grass flower__grass--2">
         <div className="flower__grass__leaf flower__grass__leaf--1"></div>
         <div className="flower__grass__leaf flower__grass__leaf--2"></div>
      </div>

      {/* Exit Button */}
      {onReset && (
        <button 
          onClick={onReset}
          className="absolute bottom-8 right-8 z-[120] flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white/80 hover:bg-white/20 hover:text-white transition-all duration-300 font-serif tracking-widest uppercase text-xs cursor-pointer hover:shadow-lg hover:shadow-white/20"
        >
          <LogOut size={16} />
          Büyüyü Sonlandır
        </button>
      )}

    </div>
  );
};

export default RoseGarden;