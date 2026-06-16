import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Hero from './Hero';
import Skills from './Skills';

const ScrollTransition = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  // Track the scroll progress over the first 100vh of the container's scroll.
  // "start start": when the top of container/trigger hits the top of viewport.
  // "end start": when the bottom of the trigger hits the top of viewport (exactly 100vh of scroll).
  const { scrollYProgress } = useScroll({
    target: triggerRef,
    offset: ['start start', 'end start'],
  });

  // Scale down from 1 to 0.98
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.98]);
  
  // Fade opacity from 1 to 0.7
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.7]);
  
  // Blur effect from 0px to 2px
  const blurVal = useTransform(scrollYProgress, [0, 1], [0, 2]);
  const filter = useTransform(blurVal, (v) => `blur(${v}px)`);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Scroll trigger zone - exactly 100vh tall to drive the progress */}
      <div
        ref={triggerRef}
        className="absolute top-0 left-0 w-full h-screen pointer-events-none z-0"
      />

      {/* Pinned Hero Section (About Me) - scrollable internally if it overflows */}
      <motion.div
        style={{ scale, filter, opacity }}
        className="sticky top-0 h-screen w-full z-10 overflow-y-auto no-scrollbar bg-black"
      >
        <Hero />
      </motion.div>

      {/* Overlapping Skills Section (Tech Arsenal) */}
      <div className="relative z-20 shadow-[0_-30px_60px_rgba(0,0,0,0.8)] bg-black border-t border-white/5">
        <Skills />
      </div>
    </div>
  );
};

export default ScrollTransition;
