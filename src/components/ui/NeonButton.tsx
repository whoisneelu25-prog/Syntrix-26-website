import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { soundEngine } from '../../lib/soundEffects';

interface NeonButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: React.ReactNode;
  variant?: 'cyan' | 'purple' | 'magenta' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  glow?: boolean;
  href?: string;
  target?: string;
  rel?: string;
}

export const NeonButton: React.FC<NeonButtonProps> = ({
  children,
  variant = 'cyan',
  size = 'md',
  icon,
  iconPosition = 'left',
  glow = true,
  href,
  target,
  rel,
  className = '',
  onClick,
  onMouseEnter,
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs tracking-wide gap-2 rounded-xl shrink-0',
    md: 'px-5 py-2.5 text-sm tracking-wide gap-2 rounded-xl shrink-0',
    lg: 'px-7 py-3.5 text-base tracking-widest font-bold gap-2.5 rounded-xl shrink-0',
  };

  const variantClasses = {
    cyan: `bg-cyan-400 text-space-950 font-bold border border-cyan-300 hover:bg-cyan-300 ${
      glow ? 'shadow-[0_0_20px_rgba(0,240,255,0.45)] hover:shadow-[0_0_28px_rgba(0,240,255,0.7)]' : ''
    }`,
    purple: `bg-purple-600 text-white font-semibold border border-purple-400 hover:bg-purple-500 ${
      glow ? 'shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_28px_rgba(168,85,247,0.65)]' : ''
    }`,
    magenta: `bg-rose-600 text-white font-bold border border-rose-400 hover:bg-rose-500 ${
      glow ? 'shadow-[0_0_20px_rgba(244,63,94,0.45)] hover:shadow-[0_0_28px_rgba(244,63,94,0.7)]' : ''
    }`,
    outline: 'bg-space-900/60 text-cyan-400 border border-cyan-400/50 hover:border-cyan-300 hover:bg-cyan-950/40 hover:text-cyan-200 shadow-[0_0_12px_rgba(0,240,255,0.15)]',
    ghost: 'bg-transparent text-slate-300 hover:text-cyan-400 hover:bg-white/5 border border-transparent hover:border-white/10',
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    soundEngine.playBlip(750);
    if (onMouseEnter) onMouseEnter(e);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    soundEngine.playConfirm();
    if (onClick) onClick(e);
  };

  const buttonContent = (
    <>
      {icon && iconPosition === 'left' && <span className="inline-flex items-center justify-center shrink-0">{icon}</span>}
      <span className="relative z-10 whitespace-nowrap uppercase font-orbitron leading-none">{children}</span>
      {icon && iconPosition === 'right' && <span className="inline-flex items-center justify-center shrink-0">{icon}</span>}
    </>
  );

  const baseClasses = `inline-flex items-center justify-center font-medium transition-colors cursor-pointer select-none relative overflow-hidden group ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={baseClasses}
        onMouseEnter={() => soundEngine.playBlip(750)}
        onClick={() => soundEngine.playConfirm()}
      >
        {buttonContent}
      </a>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.025 }}
      whileTap={{ scale: 0.96 }}
      className={baseClasses}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      {...props}
    >
      {buttonContent}
    </motion.button>
  );
};
