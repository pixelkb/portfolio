import { motion, Variants } from 'framer-motion';
import { Link } from 'react-scroll';
import { Github, Linkedin, Mail, Download, ExternalLink, ChevronDown, Briefcase, ArrowUpRight } from 'lucide-react';

const MotionLink = motion(Link);

const Hero = () => {

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  return (
    <section id="about" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(rgba(76, 29, 149, 0.03) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(76, 29, 149, 0.03) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />

        {/* Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent-500/40 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            }}
            animate={{
              y: [null, -20, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div
        className="container-custom relative z-10 w-full"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 pt-20 lg:pt-0">
          {/* Left Side - Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 lg:flex-[1.2] text-center lg:text-left w-full"
          >
            {/* Category Subtitle */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2 mb-6 justify-center lg:justify-start"
            >
              <span className="w-8 h-[2px] bg-accent-500" />
              <span className="text-[11px] font-black tracking-[0.3em] text-accent-400 uppercase">
                ABOUT ME
              </span>
            </motion.div>

            {/* Massive Awwwards-style Typography */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter leading-[0.85] uppercase mb-5 flex flex-col items-center lg:items-start select-none"
            >
              <span className="text-white">SOFTWARE</span>
              <span className="heading-purple-glow">ENGINEER</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={itemVariants}
              className="text-gray-400 text-sm md:text-base font-bold tracking-wide mb-4 justify-center lg:justify-start flex items-center"
            >
              In Progress :)
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-gray-300 text-sm md:text-base max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed text-center lg:text-left font-medium"
            >
              I'm a Full Stack Developer passionate about building scalable web applications, AI-powered products, and real-time systems. Currently studying Computer Science at Jaypee Institute of Information Technology, I love learning new technologies and creating impactful software.
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8"
            >
              <MotionLink
                to="projects"
                smooth={true}
                duration={500}
                offset={-80}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-accent-500 via-accent-600 to-accent-700 rounded-xl text-white font-semibold shadow-lg flex items-center gap-2 cursor-pointer text-sm sm:text-base whitespace-nowrap"
              >
                View Projects
                <ExternalLink className="w-4 h-4" />
              </MotionLink>

              <motion.a
                href="/resume.jpg"
                download="Kritika_Bhatt_Resume.jpg"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2.5 sm:px-6 sm:py-3 border border-accent-500/50 rounded-xl text-accent-300 font-semibold flex items-center gap-2 hover:bg-accent-500/10 hover:border-accent-500 transition-all cursor-pointer text-sm sm:text-base whitespace-nowrap"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </motion.a>

              <MotionLink
                to="contact"
                smooth={true}
                duration={500}
                offset={-80}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2.5 sm:px-6 sm:py-3 bg-white/5 border border-white/10 rounded-xl text-white font-semibold flex items-center gap-2 hover:bg-white/10 transition-all cursor-pointer text-sm sm:text-base whitespace-nowrap"
              >
                <Briefcase className="w-4 h-4" />
                Hire Me
              </MotionLink>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              variants={itemVariants}
              className="flex gap-4 justify-center lg:justify-start"
            >
              <a
                href="https://github.com/pixelkb"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-accent-500/50 hover:bg-accent-500/10 transition-all"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/kritikabhatt999"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-accent-500/50 hover:bg-accent-500/10 transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:kritikabhatt999@gmail.com"
                className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-accent-500/50 hover:bg-accent-500/10 transition-all"
              >
                <Mail className="w-5 h-5" />
              </a>
            </motion.div>
          </motion.div>

          {/* Right Side - Status Card & Wrap */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex-1 lg:flex-[0.8] w-full flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-md bg-[#0d0d0c] border border-[#1f1f1e] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] group hover:border-accent-500/20 transition-all duration-300">
              {/* Photo & Status Container */}
              <div className="relative h-64 md:h-72 w-full overflow-hidden">
                <img
                  src="/profile.jpg"
                  alt="Kritika Bhatt"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-all duration-700 ease-in-out"
                />
                
                {/* Overlay Gradient for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none" />

                {/* Arrow Icon in Top Right */}
                <div className="absolute top-4 right-4 text-accent-400 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 pointer-events-none">
                  <ArrowUpRight className="w-7 h-7 stroke-[1.5]" />
                </div>

                {/* Overlaid Status Details */}
                <div className="absolute bottom-5 left-5 right-5 pointer-events-none">
                  <div className="text-[10px] font-black tracking-[0.25em] text-accent-400 mb-1.5 uppercase">
                    CURRENT STATUS
                  </div>
                  <div className="flex flex-col gap-1 text-[15px] md:text-[17px] font-extrabold tracking-wide leading-snug">
                    <span className="text-white drop-shadow">Final-Year Student @ JIIT</span>
                    <span className="text-gray-400 drop-shadow">Web Developer & Freelancer</span>
                  </div>
                </div>
              </div>

              {/* Journey Details */}
              <div className="p-6 md:p-7">
                <h3 className="text-sm font-black tracking-[0.15em] text-white uppercase mb-3.5 select-none">
                  THE JOURNEY SO FAR
                </h3>
                <p className="text-gray-400 text-[12.5px] leading-relaxed mb-6 font-medium">
                  A journey dedicated to mastering data structures, algorithms, and core programming fundamentals while building modern full-stack applications. From backend architecture and databases to real-time systems and intuitive web interfaces, the focus has remained on writing efficient, scalable, and maintainable software with purpose.
                </p>
                <ul className="flex flex-col gap-3 text-[12.5px] font-semibold">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-500 mt-2 flex-shrink-0" />
                    <p className="text-gray-300">
                      <span className="text-accent-400 font-bold mr-1.5">BUILD IT.</span>
                      Craft robust and scalable solutions with clean architecture.
                    </p>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-500 mt-2 flex-shrink-0" />
                    <p className="text-gray-300">
                      <span className="text-accent-400 font-bold mr-1.5">REFINE IT.</span>
                      Optimize performance, accessibility, and every user interaction.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <Link to="skills" smooth={true} duration={500} offset={-80}>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center cursor-pointer"
          >
            <span className="text-gray-500 text-sm mb-2">Scroll Down</span>
            <ChevronDown className="w-5 h-5 text-accent-500" />
          </motion.div>
        </Link>
      </motion.div>
    </section>
  );
};

export default Hero;
