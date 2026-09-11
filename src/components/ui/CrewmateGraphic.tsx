import React from 'react';

interface CrewmateGraphicProps {
  color?: 'cyan' | 'purple' | 'red' | 'emerald' | 'amber';
  size?: number;
  isFloating?: boolean;
  hasJetpackFlames?: boolean;
  className?: string;
  glow?: boolean;
}

export const CrewmateGraphic: React.FC<CrewmateGraphicProps> = ({
  color = 'cyan',
  size = 120,
  isFloating = true,
  hasJetpackFlames = true,
  className = '',
  glow = true,
}) => {
  // Theme color maps matching poster identity
  const colorMaps = {
    cyan: {
      primary: '#00f0ff',
      primaryDark: '#0284c7',
      shadow: '#0369a1',
      glow: 'rgba(0, 240, 255, 0.6)',
      visorStart: '#7dd3fc',
      visorEnd: '#0284c7',
    },
    purple: {
      primary: '#a855f7',
      primaryDark: '#7e22ce',
      shadow: '#581c87',
      glow: 'rgba(168, 85, 247, 0.6)',
      visorStart: '#c084fc',
      visorEnd: '#6b21a8',
    },
    red: {
      primary: '#f43f5e',
      primaryDark: '#be123c',
      shadow: '#881337',
      glow: 'rgba(244, 63, 94, 0.6)',
      visorStart: '#fda4af',
      visorEnd: '#be123c',
    },
    emerald: {
      primary: '#10b981',
      primaryDark: '#047857',
      shadow: '#064e3b',
      glow: 'rgba(16, 185, 129, 0.6)',
      visorStart: '#6ee7b7',
      visorEnd: '#047857',
    },
    amber: {
      primary: '#f59e0b',
      primaryDark: '#b45309',
      shadow: '#78350f',
      glow: 'rgba(245, 158, 11, 0.6)',
      visorStart: '#fcd34d',
      visorEnd: '#b45309',
    },
  };

  const reactId = React.useId();
  const scheme = colorMaps[color];
  const uniqueId = `crew-${color}-${reactId.replace(/:/g, '')}`;

  return (
    <div
      className={`relative inline-block ${isFloating ? 'animate-float' : ''} ${className}`}
      style={{ width: size, height: size * 1.15 }}
    >
      <svg
        viewBox="0 0 160 184"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
        style={{
          filter: glow ? `drop-shadow(0 0 16px ${scheme.glow})` : undefined,
        }}
      >
        <defs>
          {/* Suit Gradient */}
          <linearGradient id={`suit-${uniqueId}`} x1="30%" y1="10%" x2="90%" y2="100%">
            <stop offset="0%" stopColor={scheme.primary} />
            <stop offset="65%" stopColor={scheme.primaryDark} />
            <stop offset="100%" stopColor={scheme.shadow} />
          </linearGradient>

          {/* Visor Glass Gradient */}
          <linearGradient id={`visor-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="25%" stopColor={scheme.visorStart} />
            <stop offset="75%" stopColor={scheme.visorEnd} />
            <stop offset="100%" stopColor="#082f49" />
          </linearGradient>

          {/* Jetpack Plasma Flame */}
          <linearGradient id={`flame-${uniqueId}`} x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#00f0ff" />
            <stop offset="60%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>

        {/* JETPACK THRUSTER FLAME */}
        {hasJetpackFlames && (
          <g className="animate-pulse">
            <path
              d="M 28 115 Q 22 145 16 155 Q 32 145 36 115 Z"
              fill={`url(#flame-${uniqueId})`}
              opacity="0.85"
            />
            <path
              d="M 26 115 Q 22 135 20 142 Q 30 135 32 115 Z"
              fill="#ffffff"
              opacity="0.9"
            />
          </g>
        )}

        {/* BACKPACK / OXYGEN TANK */}
        <rect
          x="16"
          y="56"
          width="26"
          height="65"
          rx="12"
          fill={scheme.primaryDark}
          stroke="#0b112c"
          strokeWidth="6"
        />

        {/* MAIN SUIT BODY */}
        <path
          d="
            M 68 28
            C 105 28 126 50 126 88
            C 126 120 124 140 124 140
            L 102 140
            C 100 130 96 118 90 118
            C 84 118 80 130 78 140
            L 52 140
            C 52 140 46 112 46 88
            C 46 50 56 28 68 28 Z
          "
          fill={`url(#suit-${uniqueId})`}
          stroke="#0b112c"
          strokeWidth="7"
          strokeLinejoin="round"
        />

        {/* LEFT LEG */}
        <rect
          x="50"
          y="132"
          width="26"
          height="32"
          rx="12"
          fill={scheme.primaryDark}
          stroke="#0b112c"
          strokeWidth="6"
        />

        {/* RIGHT LEG */}
        <rect
          x="100"
          y="132"
          width="26"
          height="32"
          rx="12"
          fill={scheme.shadow}
          stroke="#0b112c"
          strokeWidth="6"
        />

        {/* SHADOW CREASE */}
        <path
          d="M 52 124 C 64 135 94 135 118 120"
          stroke={scheme.shadow}
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* VISOR (Large Futuristic Face Glass) */}
        <ellipse
          cx="102"
          cy="74"
          rx="36"
          ry="24"
          fill={`url(#visor-${uniqueId})`}
          stroke="#0b112c"
          strokeWidth="6"
        />

        {/* VISOR GLINT / REFLECTION HIGHLIGHT */}
        <path
          d="M 82 66 C 88 60 112 58 124 64 C 114 62 94 64 88 72 Z"
          fill="#ffffff"
          opacity="0.85"
        />
        <circle cx="82" cy="74" r="3.5" fill="#ffffff" opacity="0.9" />

        {/* HUD SCAN LINES IN VISOR */}
        <line
          x1="86"
          y1="76"
          x2="118"
          y2="76"
          stroke="#00f0ff"
          strokeWidth="1.2"
          strokeDasharray="3 2"
          opacity="0.75"
        />
        <line
          x1="90"
          y1="82"
          x2="114"
          y2="82"
          stroke="#00f0ff"
          strokeWidth="1.2"
          strokeDasharray="2 2"
          opacity="0.5"
        />

        {/* MISSION BADGE ON CHEST */}
        <circle cx="66" cy="98" r="5" fill="#00f0ff" />
        <path d="M 64 98 L 68 98 M 66 96 L 66 100" stroke="#050816" strokeWidth="1.5" />
      </svg>
    </div>
  );
};
