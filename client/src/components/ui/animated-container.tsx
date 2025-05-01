import React, { ReactNode, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedContainerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  animation?: 'fadeIn' | 'slideInUp' | 'slideInLeft' | 'slideInRight' | 'zoomIn' | 'bounce';
  once?: boolean;
  threshold?: number;
}

export function AnimatedContainer({
  children,
  className,
  delay = 0,
  duration = 0.5,
  animation = 'fadeIn',
  once = true,
  threshold = 0.3,
}: AnimatedContainerProps) {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else if (!once) {
      controls.start('hidden');
    }
  }, [isInView, controls, once]);

  const animations = {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { duration, delay, ease: 'easeOut' }
      }
    },
    slideInUp: {
      hidden: { opacity: 0, y: 50 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration, delay, ease: 'easeOut' }
      }
    },
    slideInLeft: {
      hidden: { opacity: 0, x: -50 },
      visible: { 
        opacity: 1, 
        x: 0,
        transition: { duration, delay, ease: 'easeOut' }
      }
    },
    slideInRight: {
      hidden: { opacity: 0, x: 50 },
      visible: { 
        opacity: 1, 
        x: 0,
        transition: { duration, delay, ease: 'easeOut' }
      }
    },
    zoomIn: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: { duration, delay, ease: 'easeOut' }
      }
    },
    bounce: {
      hidden: { opacity: 0, y: 50 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { 
          duration, 
          delay, 
          ease: 'easeOut',
          type: 'spring',
          stiffness: 300,
          damping: 15
        }
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial="hidden"
      animate={controls}
      variants={animations[animation]}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedImage({
  src,
  alt,
  className,
  delay = 0,
  duration = 0.5,
  animation = 'fadeIn',
  once = true,
  threshold = 0.3,
}: {
  src: string;
  alt: string;
  className?: string;
  delay?: number;
  duration?: number;
  animation?: 'fadeIn' | 'slideInUp' | 'slideInLeft' | 'slideInRight' | 'zoomIn' | 'bounce';
  once?: boolean;
  threshold?: number;
}) {
  return (
    <AnimatedContainer
      delay={delay}
      duration={duration}
      animation={animation}
      once={once}
      threshold={threshold}
      className={className}
    >
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </AnimatedContainer>
  );
}

export function AnimatedText({
  text,
  className,
  element = 'p',
  delay = 0,
  duration = 0.5,
  staggerChildren = 0.015,
  once = true,
  threshold = 0.3,
}: {
  text: string;
  className?: string;
  element?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span';
  delay?: number;
  duration?: number;
  staggerChildren?: number;
  once?: boolean;
  threshold?: number;
}) {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else if (!once) {
      controls.start('hidden');
    }
  }, [isInView, controls, once]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren,
        delayChildren: delay,
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: duration / 2,
      }
    }
  };

  const words = text.split(' ');
  
  const TagName = element as keyof JSX.IntrinsicElements;

  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <TagName className="inline">
        {words.map((word, i) => (
          <motion.span key={i} className="inline-block mr-1" variants={childVariants}>
            {word}
          </motion.span>
        ))}
      </TagName>
    </motion.div>
  );
}

export function FadeInStagger({
  children,
  className,
  delay = 0,
  staggerChildren = 0.1,
  once = true,
  threshold = 0.3,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  staggerChildren?: number;
  once?: boolean;
  threshold?: number;
}) {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else if (!once) {
      controls.start('hidden');
    }
  }, [isInView, controls, once]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren,
        delayChildren: delay,
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      {children}
    </motion.div>
  );
}

export const FadeInItem = motion.div;

// Preset variants for use with FadeInStagger and FadeInItem
export const fadeInItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};

export const zoomInItemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};

export const slideLeftItemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};

export const slideRightItemVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};