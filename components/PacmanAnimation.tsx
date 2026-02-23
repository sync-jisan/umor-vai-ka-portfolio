import React from 'react';

const PacmanAnimation: React.FC = () => {
  return (
    <div className="w-full h-24 overflow-hidden absolute bottom-0 left-0 pointer-events-none select-none z-0 opacity-80" aria-hidden="true">
      <style>{`
        @keyframes moveRight {
          0% { transform: translateX(-20vw); }
          100% { transform: translateX(120vw); }
        }
        @keyframes chompTop {
          0% { transform: rotate(-45deg); }
          50% { transform: rotate(0deg); }
          100% { transform: rotate(-45deg); }
        }
        @keyframes chompBottom {
          0% { transform: rotate(45deg); }
          50% { transform: rotate(0deg); }
          100% { transform: rotate(45deg); }
        }
        .chase-scene {
            position: absolute;
            left: 0;
            bottom: 20px; /* Adjust vertical position */
            display: flex;
            align-items: center;
            gap: 60px; /* Distance between pacman and ghost */
            animation: moveRight 15s linear infinite;
        }
      `}</style>
      
      <div className="chase-scene">
        {/* Ghost (Red) - Leading (Right side) */}
        <div className="relative w-8 h-8 order-2">
            <div className="w-full h-full bg-red-500 rounded-t-full relative animate-bounce" style={{ animationDuration: '0.6s' }}>
                {/* Eyes */}
                <div className="absolute top-2 left-1.5 w-2.5 h-2.5 bg-white rounded-full flex items-center justify-center">
                    <div className="w-1 h-1 bg-blue-600 rounded-full translate-x-0.5"></div>
                </div>
                <div className="absolute top-2 right-1.5 w-2.5 h-2.5 bg-white rounded-full flex items-center justify-center">
                    <div className="w-1 h-1 bg-blue-600 rounded-full translate-x-0.5"></div>
                </div>
                {/* Legs */}
                <div className="absolute -bottom-1 w-full flex justify-between px-0.5">
                     <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                     <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                     <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                </div>
            </div>
        </div>

        {/* Pacman (Yellow) - Chasing (Left side) */}
        <div className="relative w-8 h-8 order-1">
            <div className="w-full h-full relative">
                {/* Top Half */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-yellow-400 rounded-t-full origin-bottom" style={{ animation: 'chompTop 0.25s infinite' }}></div>
                {/* Bottom Half */}
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-yellow-400 rounded-b-full origin-top" style={{ animation: 'chompBottom 0.25s infinite' }}></div>
            </div>
        </div>
        
        {/* Dots being eaten */}
        <div className="absolute right-full flex gap-8 mr-8 order-0">
             <div className="w-2 h-2 bg-brand-primary/30 rounded-full"></div>
             <div className="w-2 h-2 bg-brand-primary/30 rounded-full"></div>
             <div className="w-2 h-2 bg-brand-primary/30 rounded-full"></div>
        </div>
      </div>

    </div>
  );
};

export default PacmanAnimation;
