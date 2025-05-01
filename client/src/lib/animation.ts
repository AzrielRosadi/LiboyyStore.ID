import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

/**
 * Initialize AOS (Animate On Scroll) library with default settings
 */
export const initAOS = () => {
  useEffect(() => {
    AOS.init({
      duration: 800, // animation duration in ms
      easing: 'ease-in-out',
      once: false, // whether animation should happen only once
      mirror: false, // whether elements should animate out while scrolling past them
      offset: 100, // offset (in px) from the original trigger point
      delay: 0, // delay animation
    });

    // Re-initialize AOS when window is resized
    window.addEventListener('resize', () => {
      AOS.refresh();
    });

    return () => {
      window.removeEventListener('resize', () => {
        AOS.refresh();
      });
    };
  }, []);
};

/**
 * Common animation variants for Framer Motion
 */
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};

export const slideInLeft = {
  hidden: { x: -100, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.5 } }
};

export const slideInRight = {
  hidden: { x: 100, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.5 } }
};

export const slideInUp = {
  hidden: { y: 100, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
};

export const slideInDown = {
  hidden: { y: -100, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
};

export const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } }
};

export const staggerChildren = {
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

/**
 * Animasi untuk loading
 */
export const loadingContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

export const loadingCircle = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      repeat: Infinity,
      repeatType: "reverse" as const,
      duration: 1
    },
  },
};

/**
 * Loading spinner animation
 */
export const spinTransition = {
  loop: Infinity,
  ease: "linear",
  duration: 1
};