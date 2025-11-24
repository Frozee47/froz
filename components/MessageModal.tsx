import React, { useEffect, useState, useRef } from 'react';
import { X, Copy, Flower2, PenTool, Sparkles, Feather } from 'lucide-react';

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  iconSvg?: string;
  onBloomRoses: () => void;
}

const MessageModal: React.FC<MessageModalProps> = ({ isOpen, onClose, message, iconSvg, onBloomRoses }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const textContainerRef = useRef<HTMLDivElement>(null);

  // Typewriter effect
  useEffect(() => {
    if (isOpen && message) {
      setDisplayedText('');
      setIsTypingComplete(false);
      let index = 0;
      const speed = 40; // Typing speed

      const timer = setInterval(() => {
        if (index < message.length) {
          setDisplayedText((prev) => prev + message.charAt(index));
          index++;
          // Auto scroll to bottom
          if (textContainerRef.current) {
            textContainerRef.current.scrollTop = textContainerRef.current.scrollHeight;
          }
        } else {
          clearInterval(timer);
          setIsTypingComplete(true);
        }
      }, speed);

      return () => clearInterval(timer);
    }
  }, [isOpen, message]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    const btn = document.getElementById('copy-btn');
    if(btn) {
       const originalText = btn.innerText;
       btn.innerText = "Kopyalandı ✨";
       setTimeout(() => btn.innerText = originalText, 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-700 perspective-[1000px]">
      
      {/* 1. Atmospheric Backdrop (Cosmic Void) */}
      <div 
        className="absolute inset-0 bg-[#020617]/90 backdrop-blur-xl transition-opacity duration-1000"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(88,28,135,0.15)_0%,rgba(0,0,0,0.95)_100%)]"></div>
        {/* Floating dust particles */}
        <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] animate-pulse"></div>
      </div>

      {/* 2. The Magical Scroll Container */}
      <div className="relative w-full max-w-4xl transform transition-all duration-1000 animate-scroll-open shadow-[0_0_100px_rgba(251,191,36,0.15)]">
        
        {/* Glow behind the scroll */}
        <div className="absolute -inset-4 bg-amber-500/10 blur-2xl rounded-[50%] opacity-50 animate-pulse"></div>

        {/* Paper Texture Background */}
        <div className="relative bg-[#fdfbf7] rounded-lg overflow-hidden min-h-[70vh] max-h-[85vh] flex flex-col shadow-2xl border border-amber-900/10">
           
           {/* Texture Layers */}
           <div className="absolute inset-0 opacity-50 bg-[url('https://www.transparenttextures.com/patterns/parchment.png')] mix-blend-multiply"></div>
           <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] mix-blend-overlay"></div>
           
           {/* Vignette (Burned Edges) */}
           <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(69,26,3,0.2)] pointer-events-none"></div>
           
           {/* God Rays (Light Beams) */}
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-white/40 to-transparent transform rotate-12 blur-3xl pointer-events-none mix-blend-overlay animate-sway"></div>

           {/* Ornamental Corner Frames */}
           <div className="absolute top-4 left-4 w-24 h-24 opacity-60 text-amber-900/40 pointer-events-none">
              <svg viewBox="0 0 100 100" fill="currentColor"><path d="M0 0 L40 0 Q 10 10 0 40 Z M5 5 L35 5 Q 10 10 5 35 Z"/></svg>
           </div>
           <div className="absolute top-4 right-4 w-24 h-24 opacity-60 text-amber-900/40 pointer-events-none transform rotate-90">
              <svg viewBox="0 0 100 100" fill="currentColor"><path d="M0 0 L40 0 Q 10 10 0 40 Z M5 5 L35 5 Q 10 10 5 35 Z"/></svg>
           </div>
           <div className="absolute bottom-4 left-4 w-24 h-24 opacity-60 text-amber-900/40 pointer-events-none transform -rotate-90">
              <svg viewBox="0 0 100 100" fill="currentColor"><path d="M0 0 L40 0 Q 10 10 0 40 Z M5 5 L35 5 Q 10 10 5 35 Z"/></svg>
           </div>
           <div className="absolute bottom-4 right-4 w-24 h-24 opacity-60 text-amber-900/40 pointer-events-none transform rotate-180">
              <svg viewBox="0 0 100 100" fill="currentColor"><path d="M0 0 L40 0 Q 10 10 0 40 Z M5 5 L35 5 Q 10 10 5 35 Z"/></svg>
           </div>

           {/* Close Button */}
           <button 
             onClick={onClose}
             className="absolute top-4 right-4 z-50 p-2 text-amber-900/40 hover:text-red-800 transition-colors hover:scale-110 transform duration-300"
           >
             <X size={32} />
           </button>

           {/* Content Area */}
           <div className="relative z-10 flex-1 flex flex-col p-8 md:p-16 overflow-hidden">
             
             {/* Header */}
             <div className="text-center mb-8 relative">
               {iconSvg && (
                 <div className="mx-auto w-20 h-20 text-amber-800/80 mb-4 animate-float opacity-80 drop-shadow-md">
                    <div 
                      className="w-full h-full svg-icon-wrapper" 
                      dangerouslySetInnerHTML={{ __html: iconSvg }} 
                    />
                 </div>
               )}
               <h3 className="text-3xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-amber-900 to-amber-950 drop-shadow-sm mb-2">
                 Ruhun Mimarına
               </h3>
               <div className="h-[2px] w-32 bg-gradient-to-r from-transparent via-amber-800/50 to-transparent mx-auto"></div>
             </div>

             {/* Scrolling Text Area */}
             <div 
                ref={textContainerRef}
                className="flex-1 overflow-y-auto custom-scrollbar px-2 relative"
             >
               <div className="prose prose-xl max-w-2xl mx-auto text-center">
                 <p className="font-hand text-2xl md:text-3xl leading-relaxed text-amber-950/90 whitespace-pre-wrap">
                   {displayedText}
                   {!isTypingComplete && <span className="inline-block w-2 h-8 bg-amber-800/50 ml-1 animate-pulse align-middle"></span>}
                 </p>
               </div>
             </div>

             {/* Animated Quill - Only shows while typing */}
             {!isTypingComplete && (
                <div className="absolute bottom-32 right-12 md:right-24 pointer-events-none z-20 hidden md:block animate-write">
                    <Feather size={64} className="text-amber-800 drop-shadow-xl transform -rotate-45" />
                    <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-amber-600 rounded-full blur-md animate-ping"></div>
                </div>
             )}

             {/* Action Footer */}
             <div className={`mt-8 flex flex-col items-center gap-6 transition-all duration-1000 ${isTypingComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
               
                {/* The Magic Button */}
                <button
                  onClick={onBloomRoses}
                  className="group relative px-10 py-4 overflow-hidden rounded-full shadow-[0_10px_20px_rgba(225,29,72,0.3)] hover:shadow-[0_15px_30px_rgba(225,29,72,0.5)] transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-rose-950 via-rose-800 to-rose-950 transition-all duration-300 group-hover:scale-110"></div>
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                  
                  {/* Shiny sweep effect */}
                  <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12 transition-all duration-1000 group-hover:left-full"></div>

                  <div className="relative flex items-center gap-3 font-serif italic text-xl text-rose-50 z-10">
                    <Flower2 size={24} className="text-rose-200 animate-pulse-slow" />
                    <span>Sana Güller Getirdim...</span>
                  </div>
                </button>

                <button
                  id="copy-btn"
                  onClick={handleCopy}
                  className="text-amber-900/50 hover:text-amber-900 text-sm font-serif tracking-widest uppercase flex items-center gap-2 transition-colors"
                >
                  <Copy size={14} /> Sakla
                </button>

             </div>

           </div>

           {/* Living Seal */}
           <div className="absolute bottom-8 right-8 z-20 transform rotate-[-15deg] group cursor-default hidden md:block">
              <div className="relative w-28 h-28 flex items-center justify-center">
                 {/* Wax blob shape */}
                 <div className="absolute inset-0 bg-gradient-to-br from-red-800 to-red-950 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] shadow-lg border-4 border-red-900/20 animate-morph"></div>
                 <div className="absolute inset-2 border-2 border-dashed border-red-200/20 rounded-full animate-spin-slow-reverse"></div>
                 
                 <div className="relative text-center transform rotate-[15deg]">
                    <PenTool size={32} className="text-red-100 mx-auto opacity-90 drop-shadow-md mb-1" />
                    <span className="block text-[0.65rem] text-red-100 font-serif tracking-[0.2em] uppercase opacity-90">24 Kasım</span>
                 </div>
                 
                 {/* Specular highlight */}
                 <div className="absolute top-4 left-6 w-8 h-4 bg-white opacity-20 rounded-full blur-[2px]"></div>
              </div>
           </div>

        </div>
      </div>
      
      <style>{`
        @keyframes scroll-open {
            from { transform: translateY(50px) scale(0.9); opacity: 0; }
            to { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes sway {
            0%, 100% { transform: rotate(12deg) translateX(0); }
            50% { transform: rotate(15deg) translateX(20px); }
        }
        @keyframes morph {
            0% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
            34% { border-radius: 70% 30% 50% 50% / 30% 30% 70% 70%; }
            67% { border-radius: 100% 60% 60% 100% / 100% 100% 60% 60%; }
            100% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
        }
        @keyframes write {
            0% { transform: translateX(0) translateY(0) rotate(-45deg); }
            25% { transform: translateX(5px) translateY(-5px) rotate(-40deg); }
            50% { transform: translateX(10px) translateY(0) rotate(-45deg); }
            75% { transform: translateX(5px) translateY(5px) rotate(-50deg); }
            100% { transform: translateX(0) translateY(0) rotate(-45deg); }
        }
        .animate-write {
            animation: write 1s infinite linear;
        }
        .animate-morph {
            animation: morph 8s ease-in-out infinite alternate;
        }
        .animate-pulse-slow {
            animation: pulse 3s infinite;
        }
        .animate-spin-slow-reverse {
            animation: spin 12s linear infinite reverse;
        }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(146, 64, 14, 0.2); border-radius: 10px; }
        .svg-icon-wrapper svg {
          width: 100%;
          height: 100%;
          display: block;
        }
      `}</style>
    </div>
  );
};

export default MessageModal;
