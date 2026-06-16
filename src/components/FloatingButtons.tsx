import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Download, Mail, Briefcase, X, ChevronUp } from 'lucide-react';

const FloatingButtons = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Show scroll to top after scrolling
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const buttons = [
    {
      icon: <Download className="w-5 h-5" />,
      label: 'Download Resume',
      href: '/resumee.pdf',
      download: 'Kritika_Bhatt_Resume.pdf',
      gradient: 'from-accent-500 to-accent-700',
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: 'Email Me',
      href: 'mailto:kritikabhatt999@gmail.com',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: <Briefcase className="w-5 h-5" />,
      label: 'Hire Me',
      href: '#contact',
      gradient: 'from-accent-600 to-accent-800',
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col-reverse gap-3">
        {/* Main Toggle Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-accent-500 to-accent-700 flex items-center justify-center text-white shadow-lg"
          style={{ boxShadow: '0 0 25px rgba(123, 47, 247, 0.4)' }}
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? <X className="w-6 h-6" /> : <ChevronUp className="w-6 h-6" />}
          </motion.div>
        </motion.button>

        {/* Action Buttons */}
        <AnimatePresence>
          {isOpen && (
            <div className="flex flex-col gap-3">
              {buttons.map((button, index) => (
                <motion.a
                  key={button.label}
                  href={button.href}
                  download={button.download}
                  target={button.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.8 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  className={`flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r ${button.gradient} text-white font-medium shadow-lg whitespace-nowrap`}
                >
                  {button.icon}
                  <span className="text-sm">{button.label}</span>
                </motion.a>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll to Top - Separate from FAB */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full bg-gradient-to-br from-accent-500 to-accent-700 flex items-center justify-center text-white shadow-lg"
            style={{ boxShadow: '0 0 20px rgba(123, 47, 247, 0.3)' }}
          >
            <ChevronUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingButtons;
