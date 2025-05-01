import React, { ButtonHTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'filled' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  animationType?: 'subtle' | 'expand' | 'bounce' | 'pulse' | 'shine';
  withRipple?: boolean;
}

export function AnimatedButton({
  children,
  className,
  variant = 'default',
  size = 'md',
  color = 'primary',
  fullWidth = false,
  icon,
  iconPosition = 'left',
  animationType = 'subtle',
  withRipple = false,
  ...props
}: AnimatedButtonProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case 'filled':
        return `bg-${color} text-white shadow-md hover:shadow-lg`;
      case 'outline':
        return `border-2 border-${color} text-${color} bg-transparent hover:bg-${color}/10`;
      case 'ghost':
        return `bg-transparent text-${color} hover:bg-${color}/10`;
      case 'link':
        return `bg-transparent text-${color} underline hover:bg-transparent p-0`;
      default:
        return `bg-${color} text-white shadow-sm hover:shadow-md`;
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'py-1.5 px-3 text-sm';
      case 'lg':
        return 'py-3 px-6 text-lg';
      default:
        return 'py-2 px-4 text-base';
    }
  };

  const getButtonAnimation = () => {
    switch (animationType) {
      case 'expand':
        return {
          whileHover: { scale: 1.05 },
          whileTap: { scale: 0.95 }
        };
      case 'bounce':
        return {
          whileHover: { y: -3 },
          whileTap: { y: 1 }
        };
      case 'pulse':
        return {
          whileHover: {
            scale: [1, 1.03, 1],
            transition: {
              duration: 0.6,
              repeat: Infinity,
              repeatType: "loop" as const
            }
          },
          whileTap: { scale: 0.95 }
        };
      case 'shine':
        return {
          whileHover: {},  // Handled with CSS for this effect
          whileTap: { scale: 0.95 }
        };
      default:
        return {
          whileHover: { scale: 1.02 },
          whileTap: { scale: 0.98 }
        };
    }
  };

  const buttonAnimation = getButtonAnimation();

  return (
    <motion.button
      className={cn(
        'relative font-medium rounded-lg transition-all duration-200 flex items-center justify-center overflow-hidden',
        getVariantClasses(),
        getSizeClasses(),
        fullWidth ? 'w-full' : '',
        animationType === 'shine' ? 'group' : '',
        className
      )}
      whileHover={buttonAnimation.whileHover}
      whileTap={buttonAnimation.whileTap}
      {...props}
    >
      {animationType === 'shine' && (
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shine" />
      )}

      {withRipple && (
        <span className="absolute inset-0 w-full h-full bg-white/30 rounded-lg opacity-0 pointer-events-none animate-ripple" />
      )}

      {icon && iconPosition === 'left' && (
        <span className="mr-2 inline-flex">{icon}</span>
      )}

      <span>{children}</span>

      {icon && iconPosition === 'right' && (
        <span className="ml-2 inline-flex">{icon}</span>
      )}
    </motion.button>
  );
}