import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LoadingProps {
  onLoadingComplete: () => void;
}

const Loading = ({ onLoadingComplete }: LoadingProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onLoadingComplete, 400);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      {/* Logo */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 mb-8"
      >
        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-accent-500 via-accent-600 to-accent-700 flex items-center justify-center text-3xl font-bold text-white shadow-2xl glow">
          KB
        </div>
      </motion.div>

      {/* Name */}
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-3xl md:text-4xl font-bold gradient-text-animated mb-2 relative z-10"
      >
        Kritika Bhatt
      </motion.h1>

      {/* Title */}
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-gray-400 text-lg mb-10 relative z-10"
      >
        Full Stack Developer
      </motion.p>

      {/* Progress Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="relative z-10 w-48 md:w-64"
      >
        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-accent-500 via-accent-600 to-accent-700 rounded-full"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.05 }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-gray-600 text-xs">Loading...</span>
          <span className="text-accent-500 text-xs font-semibold">{progress}%</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Loading;
