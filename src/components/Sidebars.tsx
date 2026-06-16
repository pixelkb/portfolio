import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import { useEffect, useState } from 'react';

interface SidebarsProps {
  isVisible: boolean;
}

const Sidebars = ({ isVisible }: SidebarsProps) => {
  const [showSidebars, setShowSidebars] = useState(true);

  // Hide sidebars when scrolling near the footer to prevent overlapping
  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrollPos = window.scrollY;
      
      // Mute/hide sidebars when within 180px of the footer
      const threshold = docHeight - windowHeight - 180;
      setShowSidebars(scrollPos < threshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once initially
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const shouldBeVisible = isVisible && showSidebars;

  return (
    <>
      {/* Left Fixed Sidebar - Social Links */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{
          opacity: shouldBeVisible ? 0.5 : 0,
          x: shouldBeVisible ? 0 : -30,
          pointerEvents: shouldBeVisible ? 'auto' : 'none',
        }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed left-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-8 z-50 group/sidebar"
      >
        <div className="flex flex-col gap-6">
          <motion.a
            href="https://github.com/pixelkb"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -4, scale: 1.15 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            className="text-gray-400 hover:text-[#7B2FF7] hover:drop-shadow-[0_0_8px_rgba(123,47,247,0.8)] transition-colors duration-300"
          >
            <Github className="w-5 h-5" />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/kritikabhatt999"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -4, scale: 1.15 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            className="text-gray-400 hover:text-[#7B2FF7] hover:drop-shadow-[0_0_8px_rgba(123,47,247,0.8)] transition-colors duration-300"
          >
            <Linkedin className="w-5 h-5" />
          </motion.a>
          <motion.a
            href="mailto:kritikabhatt999@gmail.com"
            whileHover={{ y: -4, scale: 1.15 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            className="text-gray-400 hover:text-[#7B2FF7] hover:drop-shadow-[0_0_8px_rgba(123,47,247,0.8)] transition-colors duration-300"
          >
            <Mail className="w-5 h-5" />
          </motion.a>
        </div>

        {/* Vertical Line */}
        <div className="w-px h-28 bg-gradient-to-b from-gray-600/50 via-gray-600 to-transparent transition-all duration-300 group-hover/sidebar:bg-[#7B2FF7]/40" />
      </motion.div>

      {/* Right Fixed Sidebar - Vertical Email */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{
          opacity: shouldBeVisible ? 0.5 : 0,
          x: shouldBeVisible ? 0 : 30,
          pointerEvents: shouldBeVisible ? 'auto' : 'none',
        }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed right-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-8 z-50 group/sidebar"
      >
        <motion.a
          href="mailto:kritikabhatt999@gmail.com"
          whileHover={{ y: -4 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          className="font-mono text-[11px] tracking-[0.25em] text-gray-400 hover:text-[#7B2FF7] hover:drop-shadow-[0_0_8px_rgba(123,47,247,0.8)] transition-colors duration-300 select-all"
          style={{ writingMode: 'vertical-rl' }}
        >
          kritikabhatt999@gmail.com
        </motion.a>

        {/* Vertical Line */}
        <div className="w-px h-28 bg-gradient-to-b from-gray-600/50 via-gray-600 to-transparent transition-all duration-300 group-hover/sidebar:bg-[#7B2FF7]/40" />
      </motion.div>
    </>
  );
};

export default Sidebars;
