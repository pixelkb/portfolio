import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

interface IntroProps {
  onHeroComplete?: () => void;
}

const Intro = ({ onHeroComplete }: IntroProps) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);

  // Generate floating background particles on mount
  useEffect(() => {
    const generated = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1, // 1px to 3px
      duration: Math.random() * 10 + 8, // 8s to 18s
      delay: Math.random() * 5,
    }));
    setParticles(generated);

    // Call onHeroComplete after the animations are mostly finished (1.6s)
    const timer = setTimeout(() => {
      if (onHeroComplete) {
        onHeroComplete();
      }
    }, 1600);

    return () => clearTimeout(timer);
  }, [onHeroComplete]);

  // Global mousemove handler for subtle parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const y = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      id="welcome"
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#050505] text-white py-20 select-none font-sans"
    >
      {/* 1. Grain/Noise texture overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-30 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* 2. Background neon gradient blobs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Neon Purple top-left */}
        <motion.div
          animate={{
            x: mousePos.x * 30,
            y: mousePos.y * 30,
            scale: [1, 1.05, 1],
          }}
          transition={{
            x: { type: "spring", stiffness: 25, damping: 15 },
            y: { type: "spring", stiffness: 25, damping: 15 },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute -top-[10%] -left-[10%] w-[500px] h-[500px] bg-[#7B2FF7]/10 rounded-full blur-[120px]"
        />

        {/* Neon Yellow center */}
        <motion.div
          animate={{
            x: mousePos.x * -20,
            y: mousePos.y * -20,
            scale: [1, 1.1, 1],
          }}
          transition={{
            x: { type: "spring", stiffness: 20, damping: 12 },
            y: { type: "spring", stiffness: 20, damping: 12 },
            scale: { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }
          }}
          className="absolute top-[30%] left-[25%] w-[450px] h-[450px] bg-[#FFD166]/5 rounded-full blur-[130px]"
        />

        {/* Neon Cyan bottom-right */}
        <motion.div
          animate={{
            x: mousePos.x * 25,
            y: mousePos.y * -25,
            scale: [1, 1.08, 1],
          }}
          transition={{
            x: { type: "spring", stiffness: 30, damping: 18 },
            y: { type: "spring", stiffness: 30, damping: 18 },
            scale: { duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }
          }}
          className="absolute -bottom-[10%] -right-[10%] w-[550px] h-[550px] bg-[#00F5D4]/8 rounded-full blur-[140px]"
        />

        {/* Subtle grid overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ delay: 0.2, duration: 1.0 }}
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            maskImage: 'radial-gradient(circle, black, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(circle, black, transparent 80%)',
          }}
        />

        {/* Floating background particles */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-white/10"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
              delay: p.delay,
            }}
          />
        ))}
      </div>

      {/* Main Center Content Container */}
      <div className="container-custom w-full relative flex flex-col items-center justify-center z-20 px-4 sm:px-6">
        
        {/* Floating Profile glass badge at the top */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: [0, -4, 0] }}
          transition={{ 
            opacity: { delay: 0.6, duration: 0.8, ease: "easeOut" },
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
          className="flex items-center bg-[#0d0d0c]/70 backdrop-blur-xl border border-white/10 rounded-full px-5 py-2.5 mb-10 shadow-[0_12px_30px_rgba(0,0,0,0.5)] cursor-pointer select-none hover:scale-105 hover:border-[#7B2FF7]/30 hover:shadow-[0_12px_30px_rgba(123,47,247,0.15)] transition-all duration-300"
        >
          <span className="text-white font-sans text-sm font-semibold tracking-wide flex items-center gap-1.5">
            👩🏻‍💻 Hello, I'm Kritika
          </span>
        </motion.div>

        {/* Main Title Container */}
        <div className="relative w-full max-w-5xl flex flex-col items-center justify-center mb-10">
          
          {/* Desktop/Mouse Parallax Wrapper */}
          <motion.div 
            animate={{
              x: mousePos.x * 15,
              y: mousePos.y * 15,
            }}
            transition={{ type: "spring", stiffness: 40, damping: 15 }}
            className="w-full flex flex-col items-center justify-center relative"
          >
            {/* Line 1: FULL STACK + Location */}
            <div className="relative w-full flex items-center justify-center">
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                className="font-black uppercase tracking-tighter text-center select-none text-[#7B2FF7] drop-shadow-[0_0_20px_rgba(123,47,247,0.25)] leading-[0.85] w-full"
                style={{ fontSize: "clamp(2.5rem, 8.5vw, 6.8rem)" }}
              >
                FULL STACK
              </motion.h1>

              {/* Location Tag - Desktop Only */}
              <motion.div
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-right hidden lg:block select-none pointer-events-none"
              >
                <span className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest leading-none">// Based in</span>
                <span className="block text-sm font-sans font-extrabold text-white tracking-wide mt-1.5 leading-none">India 🇮🇳</span>
              </motion.div>
            </div>

            {/* Line 2: WEB DEVELOPER */}
            <div className="relative w-full flex items-center justify-center">
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.8, ease: "easeOut" }}
                className="font-black uppercase tracking-tighter text-center select-none text-[#FFD166] drop-shadow-[0_0_20px_rgba(255,209,102,0.25)] leading-[0.85] w-full"
                style={{ fontSize: "clamp(2.5rem, 8.5vw, 6.8rem)" }}
              >
                WEB DEVELOPER
              </motion.h1>
            </div>

            {/* Line 3: & CODER. */}
            <div className="relative w-full flex items-center justify-center">
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                className="font-black uppercase tracking-tighter text-center select-none text-[#00F5D4] drop-shadow-[0_0_20px_rgba(0,245,212,0.25)] leading-[0.85] w-full"
                style={{ fontSize: "clamp(2.5rem, 8.5vw, 6.8rem)" }}
              >
                & CODER.
              </motion.h1>
            </div>
          </motion.div>

          {/* Desktop Floating Badges (Composition aligned around typography) */}
          <div className="hidden md:block absolute inset-0 pointer-events-none z-30">
            
            {/* 1. Final Year Student (Top Left) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                x: mousePos.x * -18, 
                y: mousePos.y * -18 
              }}
              transition={{ 
                opacity: { delay: 0.6, duration: 0.6 },
                scale: { delay: 0.6, duration: 0.6 },
                x: { type: "spring", stiffness: 35, damping: 15 },
                y: { type: "spring", stiffness: 35, damping: 15 }
              }}
              style={{ left: '6%', top: '10%' }}
              className="absolute pointer-events-auto"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ 
                  y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
                }}
                whileHover={{ scale: 1.05 }}
                className="bg-[#0e0e0e]/80 border border-white/10 hover:border-[#7B2FF7]/30 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-mono text-white flex items-center gap-2 shadow-[0_8px_25px_rgba(0,0,0,0.5)] cursor-default select-none transition-colors duration-300"
              >
                <span className="w-2 h-2 rounded-full bg-[#7B2FF7] shadow-[0_0_8px_#7B2FF7]" />
                Final Year Student
              </motion.div>
            </motion.div>

            {/* 2. Freelancer (Top Right Parallel) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                x: mousePos.x * 18, 
                y: mousePos.y * -18 
              }}
              transition={{ 
                opacity: { delay: 0.65, duration: 0.6 },
                scale: { delay: 0.65, duration: 0.6 },
                x: { type: "spring", stiffness: 35, damping: 15 },
                y: { type: "spring", stiffness: 35, damping: 15 }
              }}
              style={{ right: '6%', top: '10%' }}
              className="absolute pointer-events-auto"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ 
                  y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
                }}
                whileHover={{ scale: 1.05 }}
                className="bg-[#0e0e0e]/80 border border-white/10 hover:border-[#00F5D4]/30 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-mono text-white flex items-center gap-2 shadow-[0_8px_25px_rgba(0,0,0,0.5)] cursor-default select-none transition-colors duration-300"
              >
                <span className="w-2 h-2 rounded-full bg-[#00F5D4] shadow-[0_0_8px_#00F5D4]" />
                Freelancer
              </motion.div>
            </motion.div>


            {/* 5. Open Source (Middle Right, next to line 3) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                x: mousePos.x * -15, 
                y: mousePos.y * 30 
              }}
              transition={{ 
                opacity: { delay: 0.8, duration: 0.6 },
                scale: { delay: 0.8, duration: 0.6 },
                x: { type: "spring", stiffness: 28, damping: 14 },
                y: { type: "spring", stiffness: 28, damping: 14 }
              }}
              style={{ right: '14%', top: '70%' }}
              className="absolute pointer-events-auto"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ 
                  y: { duration: 4.6, repeat: Infinity, ease: "easeInOut", delay: 0.7 }
                }}
                whileHover={{ scale: 1.05 }}
                className="bg-[#0e0e0e]/80 border border-white/10 hover:border-[#00F5D4]/30 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-mono text-white flex items-center gap-2 shadow-[0_8px_25px_rgba(0,0,0,0.5)] cursor-default select-none transition-colors duration-300"
              >
                <span className="w-2 h-2 rounded-full bg-[#00F5D4] shadow-[0_0_8px_#00F5D4]" />
                Open Source
              </motion.div>
            </motion.div>

            {/* 6. Tech Enthusiast + Mouse Cursor shape (Bottom Left) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                x: mousePos.x * -25, 
                y: mousePos.y * 25 
              }}
              transition={{ 
                opacity: { delay: 0.85, duration: 0.6 },
                scale: { delay: 0.85, duration: 0.6 },
                x: { type: "spring", stiffness: 35, damping: 16 },
                y: { type: "spring", stiffness: 35, damping: 16 }
              }}
              style={{ left: '6%', bottom: '5%' }}
              className="absolute flex items-start gap-1 pointer-events-auto"
            >
              <div className="flex items-start gap-1.5">
                {/* SVG Cursor Pointer pointing towards the badge */}
                <svg className="w-5 h-5 text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)] fill-current transform rotate-[18deg] mt-3" viewBox="0 0 24 24">
                  <path d="M7 2l12 11.2-5.8.8 4 6.8-2.6 1.5-4-6.8-3.6 3.7z" />
                </svg>

                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ 
                    y: { duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }
                  }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-[#0e0e0e]/80 border border-white/10 hover:border-[#00F5D4]/30 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-mono text-white flex items-center gap-2 shadow-[0_8px_25px_rgba(0,0,0,0.5)] cursor-default select-none transition-colors duration-300"
                >
                  <span className="w-2 h-2 rounded-full bg-[#00F5D4] shadow-[0_0_8px_#00F5D4]" />
                  Tech Enthusiast
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Mobile-Only Badges Wrapper (Flex layout to fit small screens neatly) */}
        <div className="flex md:hidden flex-wrap justify-center gap-2.5 max-w-md mb-8 select-none">
          <span className="bg-[#0e0e0e]/80 border border-white/10 px-3 py-1 rounded-full text-xs font-mono text-white flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7B2FF7]" />
            Final Year Student
          </span>
          <span className="bg-[#0e0e0e]/80 border border-white/10 px-3 py-1 rounded-full text-xs font-mono text-white flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F5D4]" />
            Freelancer
          </span>
          <span className="bg-[#0e0e0e]/80 border border-white/10 px-3 py-1 rounded-full text-xs font-mono text-white flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F5D4]" />
            Open Source
          </span>
          <span className="bg-[#0e0e0e]/80 border border-white/10 px-3 py-1 rounded-full text-xs font-mono text-white flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F5D4]" />
            Tech Enthusiast
          </span>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl text-gray-400 font-sans text-center text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed mb-12 select-none"
        >
          Building scalable web applications that blend{" "}
          <span className="text-[#7B2FF7] font-extrabold drop-shadow-[0_0_12px_rgba(123,47,247,0.4)]">performance</span>,{" "}
          <span className="text-[#FFD166] font-extrabold drop-shadow-[0_0_12px_rgba(255,209,102,0.4)]">creativity</span>, and{" "}
          <span className="text-[#00F5D4] font-extrabold drop-shadow-[0_0_12px_rgba(0,245,212,0.4)]">exceptional user experiences</span>.
        </motion.p>

        {/* Floating Arrow down button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="relative z-30 flex flex-col items-center justify-center cursor-pointer"
        >
          <Link
            to="contact"
            smooth={true}
            duration={800}
            offset={-80}
            className="flex items-center justify-center border border-[#7B2FF7] text-[#7B2FF7] bg-[#7B2FF7]/5 hover:bg-[#7B2FF7]/15 hover:text-white px-9 py-4 rounded-none font-mono text-xs sm:text-sm tracking-[0.25em] uppercase transition-all duration-300 shadow-[0_0_15px_rgba(123,47,247,0.08)] hover:shadow-[0_0_30px_rgba(123,47,247,0.35)] hover:border-white"
          >
            Get In Touch
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default Intro;
