import React, { useEffect, useState } from 'react';

interface CinematicIntroProps {
  ready: boolean;
  onComplete: () => void;
}

const CinematicIntro: React.FC<CinematicIntroProps> = ({ ready, onComplete }) => {
  const [stage, setStage] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [waitingMode, setWaitingMode] = useState(false);

  // "Ruhun Mimarı" Senaryosu
  const sentences = [
    "Her şey bir kıvılcımla başlar...",
    "Kaosun ortasında bir pusula belirir...",
    "Ruhumun haritasını çizen o el...",
    "Ve karanlığı şekillendiren o ses...",
    "Şimdi eserine bakma vakti."
  ];

  useEffect(() => {
    const durationPerSentence = 3000; 

    const interval = setInterval(() => {
      setStage((prev) => {
        // If we are at the last sentence
        if (prev >= sentences.length - 1) {
          clearInterval(interval);
          setWaitingMode(true); // Animation part finished, now we wait for 'ready'
          return prev;
        }
        return prev + 1;
      });
    }, durationPerSentence);

    return () => clearInterval(interval);
  }, [sentences.length]);

  // Watcher for Exit Condition
  useEffect(() => {
    // Exit ONLY if animation is in waiting mode (finished sentences) AND API is ready
    if (waitingMode && ready) {
       // Allow a small delay for the user to read the last sentence or the waiting message
       const exitTimeout = setTimeout(() => {
         setOpacity(0);
         setTimeout(() => {
           onComplete();
         }, 1500); // Fade out duration
       }, 1000);
       return () => clearTimeout(exitTimeout);
    }
  }, [waitingMode, ready, onComplete]);

  return (
    <div 
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black transition-opacity duration-1000 overflow-hidden"
      style={{ opacity: opacity }}
    >
      {/* Background: Deep Cosmos & Gold Dust */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1e1b4b_0%,_#000000_100%)] opacity-80"></div>
        <div className="gold-dust"></div>
        <div className="gold-dust-2"></div>
      </div>

      <style>{`
        /* Gold Dust Particles Animation */
        .gold-dust, .gold-dust-2 {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            radial-gradient(1px 1px at 10% 10%, #ffd700, transparent),
            radial-gradient(1px 1px at 20% 30%, #fff, transparent),
            radial-gradient(2px 2px at 30% 70%, #ffdf80, transparent),
            radial-gradient(1px 1px at 40% 40%, #fff, transparent),
            radial-gradient(2px 2px at 60% 10%, #ffd700, transparent),
            radial-gradient(1px 1px at 80% 50%, #fff, transparent),
            radial-gradient(2px 2px at 90% 80%, #ffdf80, transparent);
          background-size: 300px 300px;
          opacity: 0.6;
          animation: floatDust 20s linear infinite;
        }

        .gold-dust-2 {
          background-size: 400px 400px;
          animation: floatDust 30s linear infinite reverse;
          opacity: 0.4;
        }
        
        @keyframes floatDust {
          from { transform: translateY(0); }
          to { transform: translateY(-100%); }
        }

        .cinematic-text {
          text-shadow: 0 0 10px rgba(255, 215, 0, 0.3), 0 0 20px rgba(255, 215, 0, 0.1);
        }
        
        .pulse-text {
          animation: pulse-glow 2s infinite ease-in-out;
        }
        
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; transform: scale(0.95); }
          50% { opacity: 1; transform: scale(1.05); }
        }
      `}</style>

      {/* Text Container */}
      <div className="relative z-10 max-w-5xl px-8 text-center h-40 flex items-center justify-center">
        {/* Main Sentences */}
        {sentences.map((text, index) => (
          <p
            key={index}
            className={`
              absolute w-full
              text-3xl md:text-6xl font-serif text-yellow-50 cinematic-text tracking-widest leading-tight
              transition-all duration-[1500ms] ease-in-out
              ${index === stage && !waitingMode ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}
            `}
          >
            {text}
          </p>
        ))}

        {/* Waiting Message (Shown if animation finished but API not ready) */}
        {waitingMode && !ready && (
           <p className="absolute w-full text-2xl md:text-4xl font-serif text-yellow-200/80 tracking-[0.2em] pulse-text">
             İlham perileri fısıldıyor...
           </p>
        )}
      </div>

      {/* Elegant Progress Line */}
      <div className="absolute bottom-20 w-64 h-[1px] bg-white/10 rounded-full overflow-hidden">
         <div 
           className="h-full bg-gradient-to-r from-transparent via-gold-accent to-transparent shadow-[0_0_10px_#ffd700]"
           style={{ 
             width: '100%', 
             animation: `shimmerProgress ${sentences.length * 3}s linear forwards` 
           }}
         ></div>
      </div>
      <style>{`
        @keyframes shimmerProgress {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(0%); }
        }
      `}</style>
    </div>
  );
};

export default CinematicIntro;