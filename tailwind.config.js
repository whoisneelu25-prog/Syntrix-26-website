/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          950: '#02040a',
          900: '#050816',
          850: '#080d24',
          800: '#0c1333',
          700: '#141d4b',
          600: '#1e2b6c',
        },
        neon: {
          cyan: '#00f0ff',
          'cyan-glow': 'rgba(0, 240, 255, 0.4)',
          blue: '#2563eb',
          'blue-bright': '#38bdf8',
          purple: '#8b5cf6',
          'purple-glow': 'rgba(139, 92, 246, 0.4)',
          magenta: '#f43f5e',
          pink: '#ec4899',
          green: '#10b981',
          amber: '#f59e0b',
        }
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        russo: ['"Russo One"', 'sans-serif'],
        chakra: ['"Chakra Petch"', 'sans-serif'],
        rajdhani: ['Rajdhani', 'sans-serif'],
        cinzel: ['Cinzel', 'serif'],
        space: ['"Space Grotesk"', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'neon-cyan': '0 0 15px rgba(0, 240, 255, 0.5), 0 0 30px rgba(0, 240, 255, 0.2)',
        'neon-purple': '0 0 15px rgba(139, 92, 246, 0.5), 0 0 30px rgba(139, 92, 246, 0.2)',
        'neon-magenta': '0 0 15px rgba(244, 63, 94, 0.5), 0 0 30px rgba(244, 63, 94, 0.2)',
        'hud-card': '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 0 0 1px rgba(0, 240, 255, 0.15)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'radar-sweep': 'radarSweep 4s linear infinite',
        'scanline': 'scanline 8s linear infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-14px) rotate(2deg)' },
        },
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.9' },
        },
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
