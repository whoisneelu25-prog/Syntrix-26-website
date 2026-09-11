import React from 'react';

interface HUDPanelProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  code?: string;
  glowColor?: 'cyan' | 'purple' | 'magenta';
  variant?: 'default' | 'terminal' | 'clean';
}

export const HUDPanel: React.FC<HUDPanelProps> = ({
  children,
  className = '',
  title,
  code,
  glowColor = 'cyan',
  variant = 'default',
}) => {
  const borderColors = {
    cyan: 'border-cyan-500/30 hover:border-cyan-400/60 shadow-[0_4px_24px_rgba(0,240,255,0.07)]',
    purple: 'border-purple-500/30 hover:border-purple-400/60 shadow-[0_4px_24px_rgba(168,85,247,0.07)]',
    magenta: 'border-rose-500/30 hover:border-rose-400/60 shadow-[0_4px_24px_rgba(244,63,94,0.07)]',
  };

  const cornerColors = {
    cyan: 'border-cyan-400',
    purple: 'border-purple-400',
    magenta: 'border-rose-400',
  };

  return (
    <div
      className={`relative backdrop-blur-md bg-space-900/80 rounded-xl border transition-all duration-300 ${borderColors[glowColor]} ${className}`}
    >
      {/* Corner Bracket Accents */}
      <div className={`absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 ${cornerColors[glowColor]} rounded-tl-sm pointer-events-none`} />
      <div className={`absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 ${cornerColors[glowColor]} rounded-tr-sm pointer-events-none`} />
      <div className={`absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b-2 border-l-2 ${cornerColors[glowColor]} rounded-bl-sm pointer-events-none`} />
      <div className={`absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b-2 border-r-2 ${cornerColors[glowColor]} rounded-br-sm pointer-events-none`} />

      {/* Terminal Header Bar if title or code provided */}
      {(title || code) && (
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-cyan-500/20 bg-space-950/60 rounded-t-xl">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            {title && (
              <span className="font-orbitron text-xs tracking-wider font-semibold uppercase text-cyan-300">
                {title}
              </span>
            )}
          </div>
          {code && (
            <span className="font-mono text-[10px] tracking-widest text-slate-400 bg-space-850 px-2 py-0.5 rounded border border-white/10">
              {code}
            </span>
          )}
        </div>
      )}

      {/* Content */}
      <div className={variant === 'clean' ? '' : 'p-5 sm:p-6'}>
        {children}
      </div>
    </div>
  );
};
