import { motion } from 'framer-motion';
import { loadingContainer, loadingCircle, spinTransition } from '@/lib/animation';

interface LoadingProps {
  type?: 'spinner' | 'dots';
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export function Loading({ type = 'spinner', size = 'md', text }: LoadingProps) {
  const sizeClass = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const containerClass = {
    sm: 'space-x-1',
    md: 'space-x-2',
    lg: 'space-x-3'
  };

  const circleSize = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2.5 h-2.5',
    lg: 'w-4 h-4'
  };

  if (type === 'dots') {
    return (
      <div className="flex flex-col items-center justify-center">
        <motion.div
          className={`flex ${containerClass[size]}`}
          variants={loadingContainer}
          initial="hidden"
          animate="show"
        >
          {[1, 2, 3].map((_, index) => (
            <motion.div
              key={index}
              className={`${circleSize[size]} rounded-full bg-primary`}
              variants={loadingCircle}
            />
          ))}
        </motion.div>
        {text && <p className="mt-2 text-sm text-gray-600">{text}</p>}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <motion.div
        className={`${sizeClass[size]} border-4 border-gray-200 border-t-primary rounded-full`}
        animate={{ rotate: 360 }}
        transition={spinTransition}
      />
      {text && <p className="mt-2 text-sm text-gray-600">{text}</p>}
    </div>
  );
}