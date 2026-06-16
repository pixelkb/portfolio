'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const CursorGlow = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (typeof window === 'undefined') return null;

  return (
    <>
      {/* Large Glow Circle */}
      <motion.div
        className="fixed w-96 h-96 rounded-full pointer-events-none z-0"
        animate={{
          x: mousePosition.x - 192,
          y: mousePosition.y - 192,
          opacity: isVisible ? 0.15 : 0,
        }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 200,
          mass: 0.5,
        }}
        style={{
          background: 'radial-gradient(circle, rgba(123, 47, 247, 0.25) 0%, transparent 70%)',
        }}
      />

      {/* Small Cursor Dot */}
      <motion.div
        className="fixed w-3 h-3 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 400,
          mass: 0.1,
        }}
        style={{
          background: 'white',
        }}
      />
    </>
  );
};

export default CursorGlow;
