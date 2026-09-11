import React from 'react';

export const NebulaBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Deep Space Base */}
      <div className="absolute inset-0 bg-[#030614]" />

      {/* Cyberpunk Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.07]" 
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 240, 255, 0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(139, 92, 246, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at 50% 50%, black 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 50%, black 40%, transparent 80%)',
        }}
      />

      {/* Cyan Nebula Cluster - Top Left */}
      <div 
        className="absolute -top-[15%] -left-[10%] w-[55vw] h-[55vw] rounded-full opacity-35 blur-[120px] animate-pulse-slow"
        style={{
          background: 'radial-gradient(circle, rgba(0, 240, 255, 0.45) 0%, rgba(37, 99, 235, 0.25) 50%, transparent 70%)',
        }}
      />

      {/* Deep Ultraviolet Nebula - Center Right */}
      <div 
        className="absolute top-[25%] -right-[15%] w-[60vw] h-[60vw] rounded-full opacity-30 blur-[140px] animate-pulse-slow"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.45) 0%, rgba(124, 58, 237, 0.2) 50%, transparent 75%)',
          animationDelay: '2s',
        }}
      />

      {/* Neon Magenta Cosmic Dust - Bottom Center */}
      <div 
        className="absolute -bottom-[20%] left-[20%] w-[65vw] h-[50vw] rounded-full opacity-25 blur-[130px]"
        style={{
          background: 'radial-gradient(circle, rgba(244, 63, 94, 0.35) 0%, rgba(139, 92, 246, 0.15) 55%, transparent 70%)',
        }}
      />

      {/* Distant Glowing Planet with Rings */}
      <div className="absolute top-[12%] right-[8%] opacity-40 hidden md:block">
        <div className="relative w-28 h-28">
          {/* Planet Sphere */}
          <div 
            className="w-full h-full rounded-full border border-cyan-500/30"
            style={{
              background: 'radial-gradient(circle at 30% 30%, #38bdf8 0%, #1e1b4b 60%, #030712 100%)',
              boxShadow: 'inset -8px -8px 20px rgba(0,0,0,0.8), 0 0 25px rgba(56, 189, 248, 0.35)',
            }}
          />
          {/* Planet Ring */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-12 rounded-full border border-cyan-400/40 pointer-events-none"
            style={{
              transform: 'translate(-50%, -50%) rotate(-25deg)',
              boxShadow: '0 0 12px rgba(0, 240, 255, 0.3)',
            }}
          />
        </div>
      </div>

      {/* Vignette border */}
      <div className="absolute inset-0 bg-radial-vignette opacity-80" />
    </div>
  );
};
