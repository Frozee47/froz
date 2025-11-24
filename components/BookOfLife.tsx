
import React from 'react';

const BookOfLife: React.FC = () => {
  return (
    <div className="relative w-80 h-80 md:w-96 md:h-96 mx-auto mb-12 perspective-container">
      <style>{`
        .perspective-container {
            perspective: 1200px;
        }

        /* 3D FLOATING BOOK */
        .book-wrapper {
            transform-style: preserve-3d;
            animation: floatAndRotate 8s ease-in-out infinite;
        }
        @keyframes floatAndRotate {
            0%, 100% { transform: translateY(0) rotateX(20deg) rotateY(0deg); }
            50% { transform: translateY(-20px) rotateX(25deg) rotateY(5deg); }
        }

        /* MAGIC RINGS ANIMATION */
        .magic-ring {
            position: absolute;
            left: 50%;
            top: 50%;
            border: 2px dashed rgba(251, 191, 36, 0.3);
            border-radius: 50%;
            transform: translate(-50%, -50%) rotateX(70deg);
            box-shadow: 0 0 20px rgba(251, 191, 36, 0.1);
            pointer-events: none;
        }
        .ring-1 { width: 300px; height: 300px; animation: spinRing 20s linear infinite; }
        .ring-2 { width: 220px; height: 220px; border-color: rgba(255, 255, 255, 0.2); animation: spinRing 15s linear infinite reverse; }
        .ring-3 { width: 140px; height: 140px; border-style: dotted; animation: spinRing 10s linear infinite; }

        @keyframes spinRing {
            0% { transform: translate(-50%, -50%) rotateX(70deg) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotateX(70deg) rotate(360deg); }
        }

        /* TREE DRAWING ANIMATION */
        .tree-path {
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
            animation: drawTree 4s ease-out forwards 0.5s;
        }
        @keyframes drawTree {
            to { stroke-dashoffset: 0; }
        }

        /* GLOWING PARTICLES */
        .glowing-orb {
            filter: blur(2px);
            animation: pulseOrb 2s infinite alternate;
        }
        @keyframes pulseOrb {
            0% { r: 2; opacity: 0.5; }
            100% { r: 4; opacity: 1; fill: #fff; }
        }

        /* LIGHT BEAMS */
        .beam {
            position: absolute;
            bottom: 50%;
            left: 50%;
            width: 4px;
            height: 0;
            background: linear-gradient(to top, rgba(253, 224, 71, 0.8), transparent);
            transform-origin: bottom center;
            opacity: 0;
            animation: shootBeam 3s infinite ease-out;
        }
        @keyframes shootBeam {
            0% { height: 0; opacity: 1; transform: translateX(-50%) rotate(var(--r)); }
            100% { height: 150px; opacity: 0; transform: translateX(-50%) rotate(var(--r)); }
        }
      `}</style>

      {/* Magic Rings floating around the base */}
      <div className="absolute inset-0 z-0">
          <div className="magic-ring ring-1"></div>
          <div className="magic-ring ring-2"></div>
          <div className="magic-ring ring-3"></div>
      </div>

      <div className="book-wrapper w-full h-full relative flex items-end justify-center z-10">
        
        {/* LIGHT BEAMS EMANATING */}
        <div className="beam" style={{'--r': '-20deg'} as React.CSSProperties}></div>
        <div className="beam" style={{'--r': '0deg', animationDelay: '1s'} as React.CSSProperties}></div>
        <div className="beam" style={{'--r': '20deg', animationDelay: '0.5s'} as React.CSSProperties}></div>

        {/* THE MAGNIFICENT TREE */}
        <div className="absolute bottom-16 z-20 w-64 h-72">
            <svg viewBox="0 0 200 240" className="w-full h-full drop-shadow-[0_0_20px_rgba(234,179,8,0.6)]">
                <defs>
                    <linearGradient id="treeGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                        <stop offset="0%" stopColor="#854d0e" />
                        <stop offset="50%" stopColor="#ca8a04" />
                        <stop offset="100%" stopColor="#fef08a" />
                    </linearGradient>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                        <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </defs>

                {/* Main Trunk - Drawn dynamically */}
                <g stroke="url(#treeGrad)" strokeWidth="3" fill="none" strokeLinecap="round" filter="url(#glow)">
                    {/* Center Trunk */}
                    <path className="tree-path" d="M100 220 Q 100 180 100 150 Q 100 100 100 80" />
                    
                    {/* Left Branches */}
                    <path className="tree-path" d="M100 150 Q 80 140 60 130 Q 40 120 30 100" />
                    <path className="tree-path" d="M60 130 Q 50 150 40 160" />
                    <path className="tree-path" d="M100 110 Q 70 90 60 60" />

                    {/* Right Branches */}
                    <path className="tree-path" d="M100 150 Q 120 140 140 130 Q 160 120 170 100" />
                    <path className="tree-path" d="M140 130 Q 150 150 160 160" />
                    <path className="tree-path" d="M100 110 Q 130 90 140 60" />
                    
                    {/* Top Branches */}
                    <path className="tree-path" d="M100 80 Q 80 50 70 30" />
                    <path className="tree-path" d="M100 80 Q 120 50 130 30" />
                </g>

                {/* Leaves / Knowledge Orbs */}
                <g fill="#fde047">
                    <circle cx="30" cy="100" r="3" className="glowing-orb" style={{animationDelay: '1s'}} />
                    <circle cx="40" cy="160" r="2" className="glowing-orb" style={{animationDelay: '1.2s'}} />
                    <circle cx="60" cy="60" r="4" className="glowing-orb" style={{animationDelay: '1.4s'}} />
                    <circle cx="70" cy="30" r="3" className="glowing-orb" style={{animationDelay: '1.6s'}} />
                    <circle cx="100" cy="20" r="5" className="glowing-orb" style={{animationDelay: '1.8s'}} />
                    <circle cx="130" cy="30" r="3" className="glowing-orb" style={{animationDelay: '2.0s'}} />
                    <circle cx="140" cy="60" r="4" className="glowing-orb" style={{animationDelay: '2.2s'}} />
                    <circle cx="170" cy="100" r="3" className="glowing-orb" style={{animationDelay: '2.4s'}} />
                    <circle cx="160" cy="160" r="2" className="glowing-orb" style={{animationDelay: '2.6s'}} />
                    
                    {/* Random sparkles */}
                    <circle cx="100" cy="100" r="1" className="glowing-orb" style={{animationDelay: '0.5s'}} />
                    <circle cx="120" cy="80" r="1" className="glowing-orb" style={{animationDelay: '0.8s'}} />
                </g>
            </svg>
        </div>

        {/* THE BOOK (Stylized 3D) */}
        <div className="relative z-30 w-56 h-16">
           {/* Book Base (Shadow) */}
           <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-4 bg-black/40 blur-md rounded-full"></div>
           
           {/* Cover (Leather Look) */}
           <div className="absolute bottom-2 left-0 w-full h-8 bg-[#451a03] rounded-md shadow-lg flex items-center justify-center border-t border-[#78350f]">
              <div className="w-full h-full border-2 border-dashed border-[#92400e] opacity-50 rounded-md"></div>
           </div>

           {/* Pages (Open) */}
           <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-64 h-16 flex justify-center perspective-[500px]">
              {/* Left Page Group */}
              <div className="relative w-32 h-full origin-right transform rotateY(15deg)">
                 <div className="absolute inset-0 bg-[#fef3c7] rounded-l-lg border-l border-gray-300 shadow-inner"></div>
                 <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10"></div>
              </div>
              
              {/* Right Page Group */}
              <div className="relative w-32 h-full origin-left transform rotateY(-15deg)">
                 <div className="absolute inset-0 bg-[#fef3c7] rounded-r-lg border-r border-gray-300 shadow-inner"></div>
                 <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/10"></div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default BookOfLife;
