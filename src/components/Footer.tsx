import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { Heart, Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = [
    { title: 'Home', href: 'welcome' },
    { title: 'About', href: 'about' },
    { title: 'Projects', href: 'projects' },
    { title: 'Contact', href: 'contact' },
  ];

  return (
    <footer className="relative py-12 border-t border-white/10 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-accent-500/5 to-transparent" />

      <div className="container-custom relative z-10">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <Link
              to="welcome"
              smooth={true}
              duration={500}
              className="inline-flex items-center gap-2 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-500 via-accent-600 to-accent-700 flex items-center justify-center text-white font-bold">
                KB
              </div>
              <span className="text-xl font-bold text-white">Kritika Bhatt</span>
            </Link>
            <p className="text-gray-400 mt-2">Full Stack Developer</p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <div className="flex flex-wrap justify-center gap-4">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  smooth={true}
                  duration={500}
                  className="text-gray-400 hover:text-accent-400 transition-colors cursor-pointer"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Social */}
          <div className="text-center md:text-right">
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="flex justify-center md:justify-end gap-3">
              <a
                href="https://github.com/pixelkb"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-accent-500/50 transition-all"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/kritikabhatt999"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-accent-500/50 transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:kritikabhatt999@gmail.com"
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-accent-500/50 transition-all"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-8">
          <p className="text-gray-500 text-sm flex items-center gap-1">
            Built with <Heart className="w-4 h-4 text-red-400 fill-red-400" /> using React,
            Tailwind CSS and Framer Motion
          </p>
          <p className="text-gray-500 text-sm">
            Copyright &copy; {currentYear} Kritika Bhatt. All rights reserved.
          </p>
        </div>
      </div>

      {/* Back to Top */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-gradient-to-br from-accent-500 to-accent-700 flex items-center justify-center text-white shadow-lg hover:shadow-xl hover:shadow-accent-500/25 transition-all z-50"
        style={{ boxShadow: '0 0 20px rgba(123, 47, 247, 0.3)' }}
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </footer>
  );
};

export default Footer;
