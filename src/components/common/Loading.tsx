import React from 'react';
import { motion } from 'framer-motion';

interface LoadingProps {
  message?: string;
  progress?: number;
  theme?: 'light' | 'dark';
  size?: 'small' | 'medium' | 'large';
}

const Loading: React.FC<LoadingProps> = ({
  message = 'Loading...',
  progress,
  theme = 'light',
  size = 'medium'
}) => {
  const colors = {
    light: {
      text: 'text-ph-purple',
      background: 'bg-white',
      progress: 'bg-ph-purple',
      progressBg: 'bg-gray-200'
    },
    dark: {
      text: 'text-white',
      background: 'bg-ph-dark',
      progress: 'bg-ph-gold',
      progressBg: 'bg-gray-700'
    }
  };

  const sizes = {
    small: {
      container: 'p-4',
      spinner: 'w-6 h-6',
      text: 'text-sm',
      progressBar: 'h-1'
    },
    medium: {
      container: 'p-6',
      spinner: 'w-10 h-10',
      text: 'text-base',
      progressBar: 'h-2'
    },
    large: {
      container: 'p-8',
      spinner: 'w-16 h-16',
      text: 'text-lg',
      progressBar: 'h-3'
    }
  };

  const spinTransition = {
    repeat: Infinity,
    ease: "linear",
    duration: 1
  };

  return (
    <div className={`flex flex-col items-center justify-center ${sizes[size].container} ${colors[theme].background}`}>
      {/* Spinner */}
      <motion.div
        className={`${sizes[size].spinner} border-4 border-t-ph-gold border-ph-purple rounded-full`}
        animate={{ rotate: 360 }}
        transition={spinTransition}
      />
      
      {/* Message */}
      {message && (
        <motion.p 
          className={`mt-4 ${sizes[size].text} ${colors[theme].text} font-medium`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {message}
        </motion.p>
      )}
      
      {/* Progress Bar */}
      {typeof progress === 'number' && (
        <div className={`w-full max-w-xs mt-4 ${colors[theme].progressBg} rounded-full overflow-hidden ${sizes[size].progressBar}`}>
          <motion.div
            className={`${colors[theme].progress} h-full rounded-full`}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      )}
    </div>
  );
};

export const LoadingScreen: React.FC<LoadingProps & { fullScreen?: boolean }> = ({ 
  fullScreen = true,
  ...props 
}) => {
  return (
    <div className={`
      flex items-center justify-center
      ${fullScreen ? 'fixed inset-0 z-50' : 'w-full h-full min-h-[200px]'}
      bg-white bg-opacity-90 backdrop-blur-sm
    `}>
      <Loading {...props} />
    </div>
  );
};

export const LoadingOverlay: React.FC<LoadingProps & { show: boolean }> = ({
  show,
  ...props
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: show ? 1 : 0 }}
      exit={{ opacity: 0 }}
      className={`
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black bg-opacity-50 backdrop-blur-sm
        ${show ? '' : 'pointer-events-none'}
      `}
    >
      {show && <Loading {...props} theme="dark" />}
    </motion.div>
  );
};

export default Loading;