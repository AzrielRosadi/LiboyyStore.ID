import React, { ButtonHTMLAttributes, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface RippleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'filled' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  withRipple?: boolean;
}

interface RippleEffect {
  x: number;
  y: number;
  id: number;
}

export function RippleButton({
  children,
  className,
  variant = 'default',
  size = 'md',
  color = 'primary',
  fullWidth = false,
  icon,
  iconPosition = 'left',
  withRipple = true,
  onClick,
  ...props
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<RippleEffect[]>([]);
  
  useEffect(() => {
    // Clean up ripples after animation completes
    const timeouts: NodeJS.Timeout[] = [];
    
    ripples.forEach((ripple) => {
      const timeout = setTimeout(() => {
        setRipples((prevRipples) => 
          prevRipples.filter((r) => r.id !== ripple.id)
        );
      }, 800); // match animation time
      
      timeouts.push(timeout);
    });
    
    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [ripples]);
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (withRipple) {
      const button = e.currentTarget;
      const rect = button.getBoundingClientRect();
      
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const id = Date.now();
      
      setRipples([...ripples, { x, y, id }]);
    }
    
    if (onClick) {
      onClick(e);
    }
  };

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

  return (
    <button
      className={cn(
        'relative font-medium rounded-lg transition-all duration-200 flex items-center justify-center overflow-hidden hover:scale-105 active:scale-95',
        getVariantClasses(),
        getSizeClasses(),
        fullWidth ? 'w-full' : '',
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {withRipple && ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute animate-ripple rounded-full bg-white/30"
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: 'translate(-50%, -50%)',
            width: '10px',
            height: '10px',
          }}
        />
      ))}

      {icon && iconPosition === 'left' && (
        <span className="mr-2 inline-flex">{icon}</span>
      )}

      <span>{children}</span>

      {icon && iconPosition === 'right' && (
        <span className="ml-2 inline-flex">{icon}</span>
      )}
    </button>
  );
}