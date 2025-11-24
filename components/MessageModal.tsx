import React from 'react';
import { X, Copy, Flower2, PenTool } from 'lucide-react';

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  iconSvg?: string;
  onBloomRoses: () => void;
}

const MessageModal: React.FC<MessageModalProps> = ({ isOpen, onClose, message, iconSvg, onBloomRoses }) => {
  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    // Simple feedback
    const btn = document.getElementById('copy-btn');
    if(btn) {
       const originalText = btn.innerText;
       btn.innerText = "Kopyalandı ✨";
       setTimeout(() => btn.innerText = originalText, 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-700">
      
      {/* 1. Atmospheric Backdrop (Dark room with spotlight feel) */}
      <div 
        className="absolute inset-0 bg-[#0f172a]/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.4)_0%,rgba(0,0,0,0.95)_100%)]"></div>
      </div>

      {/* 2. The Letter Container (Vintage Parchment Style) */}
      <div className="relative w-full max-w-3xl transform transition-all scale-100 shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-fade-in-up">
        
        {/* Paper Texture Background */}
        <div className="absolute inset-0 bg-[#fdfbf7] rounded-sm transform rotate-0 overflow-hidden">
           {/* Subtle Noise/Paper Texture */}
           <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/parchment.png')] mix-blend-multiply"></div>
           <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/crinkle-paper.png')]"></div>
           {/* Aged Edges Vignette */}
           <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(139,69,19,0.15)] pointer-events-none"></div>
        </div>

        {/* Ornamental Border (Gold Frame) */}
        <div className="absolute inset-3 border-double border-4 border-amber-900/20 pointer-events-none rounded-sm"></div>
        <div className="absolute inset-4 border border-amber-900/10 pointer-events-none rounded-sm"></div>

        {/* Corner Flourishes (SVG Decorations) */}
        <div className="absolute top-6 left-6 w-16 h-16 opacity-40 text-amber-800 pointer-events-none">
           <svg viewBox="0 0 100 100" fill="currentColor"><path d="M0 0v50c0 27.6 22.4 50 50 50V50c0-27.6-22.4-50-50-50z"/></svg>
        </div>
        <div className="absolute top-6 right-6 w-16 h-16 opacity-40 text-amber-800 pointer-events-none rotate-90">
           <svg viewBox="0 0 100 100" fill="currentColor"><path d="M0 0v50c0 27.6 22.4 50 50 50V50c0-27.6-22.4-50-50-50z"/></svg>
        </div>
        <div className="absolute bottom-6 left-6 w-16 h-16 opacity-40 text-amber-800 pointer-events-none -rotate-90">
           <svg viewBox="0 0 100 100" fill="currentColor"><path d="M0 0v50c0 27.6 22.4 50 50 50V50c0-27.6-22.4-50-50-50z"/></svg>
        </div>
        <div className="absolute bottom-6 right-6 w-16 h-16 opacity-40 text-amber-800 pointer-events-none rotate-180">
           <svg viewBox="0 0 100 100" fill="currentColor"><path d="M0 0v50c0 27.6 22.4 50 50 50V50c0-27.6-22.4-50-50-50z"/></svg>
        </div>

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 z-50 p-2 text-amber-900/50 hover:text-red-700 transition-colors"
        >
          <X size={28} />
        </button>

        {/* Content Area */}
        <div className="relative z-10 p-12 md:p-16 flex flex-col items-center text-center max-h-[85vh] overflow-y-auto custom-scrollbar">
          
          {/* Theme Icon - Dynamically Generated */}
          {iconSvg && (
            <div className="mb-6 w-24 h-24 text-amber-800/60 opacity-80 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
               <div 
                 className="w-full h-full svg-icon-wrapper" 
                 dangerouslySetInnerHTML={{ __html: iconSvg }} 
               />
            </div>
          )}

          {/* Header */}
          <div className="mb-8 relative">
            <span className="block text-amber-700/60 font-serif text-sm tracking-[0.3em] uppercase mb-2">Özel Nüsha</span>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-amber-950 drop-shadow-sm leading-tight">
              Ruhun Mimarına
            </h3>
            <div className="mt-4 w-24 h-1 bg-gradient-to-r from-transparent via-amber-700/40 to-transparent mx-auto"></div>
          </div>

          {/* Body Text */}
          <div className="prose prose-xl max-w-2xl mb-10">
            <p className="font-hand text-2xl md:text-3xl leading-loose text-slate-800 whitespace-pre-wrap first-letter:text-5xl first-letter:font-serif first-letter:text-amber-800 first-letter:float-left first-letter:mr-2">
              {message}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col items-center gap-6 w-full relative z-20">
            
            {/* The Magic Button */}
            <button
              onClick={onBloomRoses}
              className="group relative px-8 py-4 bg-gradient-to-r from-rose-900 to-red-800 text-rose-50 rounded-full shadow-lg hover:shadow-rose-900/40 transform hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-rose-700"
            >
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
              <span className="absolute w-full h-full bg-white opacity-0 left-0 top-0 group-hover:opacity-10 transition-opacity duration-300"></span>
              <div className="flex items-center gap-3 font-serif italic text-lg relative z-10">
                <Flower2 size={22} className="text-rose-200 animate-pulse" />
                <span>Sana Güller Getirdim...</span>
              </div>
            </button>

            {/* Secondary Actions */}
            <div className="flex gap-4 mt-2">
              <button
                id="copy-btn"
                onClick={handleCopy}
                className="flex items-center gap-2 px-5 py-2 text-amber-900/70 hover:text-amber-900 hover:bg-amber-900/5 rounded-lg transition-colors font-serif text-sm border border-transparent hover:border-amber-900/10"
              >
                <Copy size={16} />
                <span className="uppercase tracking-widest text-xs font-bold">Sakla</span>
              </button>
            </div>
          </div>

          {/* Wax Seal Signature */}
          <div className="mt-12 md:absolute md:bottom-12 md:right-12 transform rotate-[-10deg] group cursor-default">
             <div className="relative w-24 h-24 bg-red-900 rounded-full shadow-[2px_4px_6px_rgba(0,0,0,0.4)] flex items-center justify-center border-4 border-red-800/50">
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-red-950/30 opacity-70"></div>
                <div className="text-center transform rotate-[10deg]">
                  <PenTool size={28} className="text-red-200 mx-auto opacity-80 mb-1" />
                  <span className="block text-[0.6rem] text-red-100 font-serif tracking-widest uppercase opacity-90">24 Kasım</span>
                </div>
                {/* Wax highlight */}
                <div className="absolute top-2 left-4 w-6 h-3 bg-white opacity-10 rounded-full blur-[2px]"></div>
             </div>
          </div>

        </div>
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(120, 53, 15, 0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(120, 53, 15, 0.4); }
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