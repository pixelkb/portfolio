import { useEffect, useRef, useState, memo } from 'react';
import {
  SiReact,
  SiJavascript,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiPostgresql,
  SiMongodb,
  SiCplusplus,
  SiC,
  SiGit,
  SiGithub,
  SiHtml5,
  SiCss,
  SiPostman,
  SiNextdotjs,
  SiTypescript
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  icon: React.ReactNode;
  glowColor: string;
}

const SqlIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 2C6.48 2 2 4.02 2 6.5s4.48 4.5 10 4.5 10-2.02 10-4.5S17.52 2 12 2zm0 13c-4.66 0-8.56-1.43-9.66-3.32V14.5c0 2.48 4.48 4.5 10 4.5s10-2.02 10-4.5v-2.82c-1.1 1.89-5 3.32-9.66 3.32zm0 6c-4.66 0-8.56-1.43-9.66-3.32v2.82c0 2.48 4.48 4.5 10 4.5s10-2.02 10-4.5v-2.82c-1.1 1.89-5 3.32-9.66 3.32z" />
  </svg>
);

const skills: Skill[] = [
  // Row 1
  { name: 'C', icon: <SiC />, glowColor: '#A8B9CC' },
  { name: 'C++', icon: <SiCplusplus />, glowColor: '#00599C' },
  { name: 'Python', icon: <SiPython />, glowColor: '#FFD166' },
  { name: 'JavaScript', icon: <SiJavascript />, glowColor: '#F7DF1E' },
  { name: 'TypeScript', icon: <SiTypescript />, glowColor: '#3178C6' },
  { name: 'HTML5', icon: <SiHtml5 />, glowColor: '#E34F26' },
  { name: 'CSS3', icon: <SiCss />, glowColor: '#1572B6' },
  { name: 'Next.js', icon: <SiNextdotjs />, glowColor: '#ffffff' },
  // Row 2
  { name: 'React', icon: <SiReact />, glowColor: '#00E5FF' },
  { name: 'Node.js', icon: <SiNodedotjs />, glowColor: '#339933' },
  { name: 'Express.js', icon: <SiExpress />, glowColor: '#ffffff' },
  { name: 'Tailwind CSS', icon: <SiTailwindcss />, glowColor: '#00E5FF' },
  { name: 'MongoDB', icon: <SiMongodb />, glowColor: '#47A248' },
  { name: 'PostgreSQL', icon: <SiPostgresql />, glowColor: '#3178C6' },
  // Row 3
  { name: 'SQL', icon: <SqlIcon />, glowColor: '#FF9900' },
  { name: 'Git', icon: <SiGit />, glowColor: '#F05032' },
  { name: 'GitHub', icon: <SiGithub />, glowColor: '#ffffff' },
  { name: 'VS Code', icon: <VscVscode />, glowColor: '#007ACC' },
  { name: 'Postman', icon: <SiPostman />, glowColor: '#FF6C37' },
];

const SkillCard = memo(({ skill, index }: { skill: Skill; index: number }) => {
  return (
    <div
      className="skill-card flex flex-col items-center justify-center bg-transparent border-0 p-1 cursor-pointer select-none w-full max-w-[130px]"
      style={{
        '--glow-color': skill.glowColor,
        '--index': index,
      } as React.CSSProperties}
    >
      {/* Float Animation & Scale Transition */}
      <div 
        className="float-icon flex items-center justify-center skill-card-icon-wrapper"
        style={{
          animationDelay: `${index * 0.15}s`,
        }}
      >
        <div className="icon-layer-idle">
          {skill.icon}
        </div>
        <div className="icon-layer-hover">
          {skill.icon}
        </div>
      </div>

      {/* Technology Name */}
      <span className="skill-card-text">
        {skill.name}
      </span>
    </div>
  );
});

SkillCard.displayName = 'SkillCard';

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      const label = headerRef.current?.querySelector('.label');
      const tech = headerRef.current?.querySelector('.tech');
      const arsenal = headerRef.current?.querySelector('.arsenal');
      const subtitle = headerRef.current?.querySelector('.subtitle');
      
      if (label) {
        gsap.fromTo(label,
          { y: -20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: 'power4.out',
            duration: 1,
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
            }
          }
        );
      }

      if (tech && arsenal) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
          }
        });

        tl.fromTo(tech,
          { x: -50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, ease: 'power1.out' }
        );

        tl.fromTo(arsenal,
          { x: 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, ease: 'power1.out' },
          '<' // Starts simultaneously with tech
        );

        // Subtle glow pulse after entry animation completes
        tl.to(arsenal, {
          filter: 'drop-shadow(0 0 25px rgba(123,47,247,0.65))',
          duration: 0.8,
          yoyo: true,
          repeat: 3,
          ease: 'power1.inOut'
        });
      }

      if (subtitle) {
        gsap.fromTo(subtitle,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: 'power4.out',
            duration: 1.2,
            delay: 0.3,
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
            }
          }
        );
      }
    }, sectionRef);

    // requestAnimationFrame scroll watcher
    let isChecking = false;
    const handleScroll = () => {
      if (!isChecking) {
        isChecking = true;
        requestAnimationFrame(() => {
          if (!gridRef.current) {
            isChecking = false;
            return;
          }
          const rect = gridRef.current.getBoundingClientRect();
          const triggerPoint = window.innerHeight * 0.85;
          if (rect.top < triggerPoint) {
            setHasEntered(true);
            window.removeEventListener('scroll', handleScroll);
          } else {
            isChecking = false;
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      ctx.revert();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="h-screen min-h-[650px] lg:min-h-[720px] flex flex-col justify-center relative overflow-hidden bg-black select-none py-10 lg:py-0"
    >
      <style>{`
        /* GPU-accelerated base states for cards */
        .skill-card {
          opacity: 0;
          transform: translate3d(0, 20px, 0);
          will-change: transform, opacity;
          backface-visibility: hidden;
          transform-style: preserve-3d;
        }

        /* Scroll-triggered active state with stagger */
        .skills-grid.animate-in .skill-card {
          opacity: 1;
          transform: translate3d(0, 0, 0);
          transition: opacity 600ms cubic-bezier(0.22, 1, 0.36, 1),
                      transform 600ms cubic-bezier(0.22, 1, 0.36, 1);
          transition-delay: calc(var(--index) * 50ms);
        }

        /* Float animation with GPU support */
        @keyframes floatIcon {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(0, -3px, 0); }
        }

        .float-icon {
          animation: floatIcon 5s ease-in-out infinite;
          will-change: transform;
        }

        .skill-card-icon-wrapper {
          position: relative;
          width: 3rem;
          height: 3rem;
          transition: transform 250ms ease-out;
          will-change: transform;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
        }
        @media (min-width: 768px) {
          .skill-card-icon-wrapper {
            width: 3.5rem;
            height: 3.5rem;
          }
        }
        @media (min-width: 1024px) {
          .skill-card-icon-wrapper {
            width: 4rem;
            height: 4rem;
          }
        }

        /* Icon layers absolute overlap for performance cross-fade */
        .icon-layer-idle,
        .icon-layer-hover {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.2rem;
          will-change: opacity;
          backface-visibility: hidden;
          transform: translateZ(0);
        }
        @media (min-width: 768px) {
          .icon-layer-idle, .icon-layer-hover {
            font-size: 2.8rem;
          }
        }
        @media (min-width: 1024px) {
          .icon-layer-idle, .icon-layer-hover {
            font-size: 3.2rem;
          }
        }

        .icon-layer-idle {
          filter: grayscale(100%);
          opacity: 0.7;
          transition: opacity 250ms ease-out;
        }

        .icon-layer-hover {
          opacity: 0;
          /* Soft glow matching technology color */
          filter: drop-shadow(0 0 10px var(--glow-color));
          transition: opacity 250ms ease-out;
        }

        /* Hover effects */
        .skill-card:hover .skill-card-icon-wrapper {
          transform: scale(1.08) translate3d(0, 0, 0);
        }

        .skill-card:hover .icon-layer-idle {
          opacity: 0;
        }

        .skill-card:hover .icon-layer-hover {
          opacity: 1;
        }

        /* Technology Name styling */
        .skill-card-text {
          margin-top: 0.75rem;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          user-select: none;
          color: #737373;
          transition: color 250ms ease-out, text-shadow 250ms ease-out;
          will-change: color, text-shadow;
          backface-visibility: hidden;
          transform: translateZ(0);
        }
        @media (min-width: 768px) {
          .skill-card-text {
            font-size: 0.75rem;
          }
        }

        .skill-card:hover .skill-card-text {
          color: #ffffff;
          text-shadow: 0 0 8px var(--glow-color);
        }
      `}</style>

      {/* Grain/Noise texture overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-30 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Subtle grid lines background overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] z-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Ambient purple/blue radial glow background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[45vh] bg-[#7B2FF7]/8 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[85vh] bg-gradient-to-br from-[#A855F7]/3 via-transparent to-[#00E5FF]/3 rounded-full blur-[165px]" />
      </div>

      <div className="container-custom relative z-10 w-full flex flex-col justify-center items-center px-4 md:px-8">
        
        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col items-center justify-center text-center mb-8 lg:mb-12 select-none w-full max-w-4xl mx-auto">
          
          {/* Large Typographic Heading */}
          <h2 className="font-black uppercase tracking-tighter select-none leading-none title mb-[20px] text-5xl md:text-6xl lg:text-[4.5rem] flex items-center justify-center gap-4">
            <span className="tech text-[#F5F5F5] inline-block">TECH</span>
            <span className="arsenal heading-purple-glow">
              ARSENAL
            </span>
          </h2>

          {/* Subtitle */}
          <div className="flex items-center justify-center gap-4 subtitle w-full max-w-xl mx-auto mt-2">
            <span className="h-[1px] w-12 md:w-16 bg-[#7B2FF7] opacity-70" />
            <p className="text-[10px] md:text-[11px] font-mono tracking-[0.25em] text-gray-400 uppercase whitespace-nowrap">
              TECH STACK I'VE WORKED WITH...
            </p>
            <span className="h-[1px] w-12 md:w-16 bg-[#7B2FF7] opacity-70" />
          </div>

        </div>

        {/* 3-Row Responsive Grid */}
        <div 
          ref={gridRef}
          className={`grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-y-8 gap-x-6 lg:gap-y-12 lg:gap-x-10 justify-items-center items-center w-full max-w-6xl skills-grid ${hasEntered ? 'animate-in' : ''}`}
        >
          {skills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;
