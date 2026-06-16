import { useEffect, useRef } from 'react';
import { Github, ExternalLink, Check } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  subtitle: string;
  cardLabel: string;
  cardTitle: string;
  description: string;
  techStack: string[];
  features: string[];
  github?: string;
  liveDemo?: string;
  images: {
    main: string;
    sub: string;
  };
}

const projects: Project[] = [
  {
    title: 'Harvesta',
    subtitle: 'AgriTech • Full Stack • Marketplace',
    cardLabel: 'Harvesta Project',
    cardTitle: 'HARVESTA MARKETPLACE',
    description: 'A full-stack agricultural marketplace connecting farmers directly with buyers through live crop pricing and transparent bidding.',
    techStack: ['React', 'Node.js', 'Express.js', 'MongoDB', 'REST API'],
    features: [
      'Full-stack marketplace connecting farmers directly with buyers.',
      'Aggregates real-time crop prices from multiple regional APIs.',
      'Competitive bidding engine supporting concurrent bid submissions.',
      'Transparent auction system with server-side validation.'
    ],
    github: 'https://github.com/Dishi-Gautam/Harvesta',
    images: {
      main: '/harvesta_main_new.jpg',
      sub: '/harvesta_bids_new.png'
    }
  },
  {
    title: 'JIIT SmartSched',
    subtitle: 'Education • Scheduling • Full Stack',
    cardLabel: 'JIIT SmartSched Project',
    cardTitle: 'SMARTSCHED SCHEDULER',
    description: 'An intelligent timetable management platform that automatically generates conflict-free academic schedules.',
    techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'ExcelJS', 'JWT'],
    features: [
      'Secure JWT admin authentication.',
      'Automatic timetable generation using CSP algorithms.',
      'Detects venue clashes, teacher overlap, and batch conflicts.',
      'Smart scheduling for educational institutions.'
    ],
    github: 'https://github.com/YASH200530/smartsched',
    liveDemo: 'https://smartsched-eosin.vercel.app/',
    images: {
      main: '/smartsched_main_new.png',
      sub: '/smartsched_grid_new.png'
    }
  },
  {
    title: 'AgroVision',
    subtitle: 'AI • Computer Vision • Machine Learning',
    cardLabel: 'AgroVision Project',
    cardTitle: 'AGROVISION AI DIAGNOSTICS',
    description: 'AI-powered plant disease detection platform using deep learning and computer vision.',
    techStack: ['Python', 'TensorFlow', 'OpenCV', 'Flask', 'JWT', 'RBAC'],
    features: [
      'ML training and inference pipelines.',
      'Automated batch inference for 1000+ images.',
      'Client-side image processing reducing server load.',
      'Secure Role-Based Access Control for dataset operations.'
    ],
    github: 'https://github.com/YASH200530/Agro-Vision',
    liveDemo: 'https://agrovision-beige.vercel.app/',
    images: {
      main: '/agrovision_main_new.png',
      sub: '/agrovision_chart_new.png'
    }
  }
];

const BrowserMockup = ({ src, alt, className }: { src: string; alt: string; className: string }) => {
  return (
    <div className={`flex flex-col bg-white border border-gray-200/80 rounded-xl overflow-hidden shadow-2xl transition-all duration-500 hover:scale-[1.03] hover:z-30 group/mockup ${className}`}>
      {/* Browser Window Header */}
      <div className="h-6 border-b border-gray-200/80 bg-gray-50 flex items-center px-3 gap-1.5 shrink-0 select-none">
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
          <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
          <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 max-w-[120px] mx-auto h-3.5 bg-gray-200/60 rounded text-[7px] text-gray-400 flex items-center justify-center font-mono tracking-wide scale-90">
          localhost:3000
        </div>
      </div>
      {/* Image Content */}
      <div className="flex-1 overflow-hidden bg-gray-50 aspect-[16/10]">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/mockup:scale-105"
        />
      </div>
    </div>
  );
};

const ProjectRow = ({ project, index }: { project: Project; index: number }) => {
  const isCardLeft = index % 2 === 0;
  
  const rowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Showcase card: slides upward + scale 0.95 -> 1 with easeOutExpo
      gsap.fromTo(
        cardRef.current,
        { y: 100, scale: 0.95, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          ease: 'power4.out', // Equivalent to easeOutExpo
          duration: 1.5,
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // 2. Project title: slides from left
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            ease: 'power4.out',
            duration: 1.2,
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Subtitle animation
      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: 'power4.out',
            duration: 1.2,
            delay: 0.1,
            scrollTrigger: {
              trigger: subtitleRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 3. Tech stack pills: stagger animation
      if (pillsRef.current) {
        const pills = pillsRef.current.children;
        gsap.fromTo(
          pills,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            stagger: 0.06,
            ease: 'power4.out',
            duration: 0.8,
            scrollTrigger: {
              trigger: pillsRef.current,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 4. Description & features: fade upward
      if (descRef.current) {
        gsap.fromTo(
          descRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: 'power4.out',
            duration: 1.2,
            scrollTrigger: {
              trigger: descRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Bottom Links
      if (linksRef.current) {
        gsap.fromTo(
          linksRef.current,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: 'power4.out',
            duration: 1.2,
            delay: 0.2,
            scrollTrigger: {
              trigger: linksRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, rowRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rowRef}
      className="py-10 md:py-14 border-b border-white/[0.05] last:border-0"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center w-full">
        
        {/* Left Column: Showcase Card */}
        <div
          ref={cardRef}
          className={`lg:col-span-7 order-2 ${
            isCardLeft ? 'lg:order-1' : 'lg:order-2'
          } w-full`}
        >
          <div className="bg-white text-black rounded-[2rem] shadow-[0_24px_50px_rgba(0,0,0,0.15)] flex flex-col md:flex-row border-t-[8px] border-accent-500 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-15px_rgba(168,85,247,0.25)] group relative min-h-[480px] md:min-h-[420px]">
            
            {/* Features Checklist Panel */}
            <div className="w-full md:w-[48%] p-8 md:p-10 flex flex-col justify-between select-none">
              <div>
                <span className="text-[10px] font-black tracking-[0.2em] text-gray-400 uppercase mb-2 block">
                  {project.cardLabel}
                </span>
                <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 leading-tight mb-8">
                  {project.cardTitle}
                </h3>
                
                <div className="space-y-4">
                  <span className="text-[11px] font-black tracking-wider text-gray-900 uppercase block mb-3">
                    FEATURES
                  </span>
                  <ul className="space-y-3">
                    {project.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs font-semibold text-gray-600 leading-relaxed">
                        <span className="w-4.5 h-4.5 rounded-full bg-accent-50 flex items-center justify-center shrink-0 mt-0.5 border border-accent-100">
                          <Check className="w-3 h-3 text-accent-600 stroke-[3]" />
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Overlapping Mockup Screenshots Panel */}
            <div className="w-full md:w-[52%] relative min-h-[320px] md:min-h-auto bg-[#fafafa] border-l border-gray-100/50 flex items-center justify-center p-6 md:p-8 overflow-hidden rounded-r-[2rem]">
              <div className="absolute inset-0 bg-gradient-to-tr from-gray-50 via-white to-gray-50/50 pointer-events-none" />
              <div className="relative w-full h-[240px] md:h-[300px]">
                {/* Main Mockup (top left) */}
                <BrowserMockup
                  src={project.images.main}
                  alt={`${project.title} Main Screenshot`}
                  className="w-[78%] absolute top-2 left-2 z-10"
                />
                
                {/* Sub Mockup (bottom right, overlapping) */}
                <BrowserMockup
                  src={project.images.sub}
                  alt={`${project.title} Dashboard Details`}
                  className="w-[78%] absolute bottom-2 right-2 z-20"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Project Details */}
        <div
          className={`lg:col-span-5 order-1 ${
            isCardLeft ? 'lg:order-2' : 'lg:order-1'
          } flex flex-col justify-center`}
        >
          {/* Huge Typography Title */}
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-[4rem] font-black tracking-tighter leading-none text-white mb-2 uppercase select-none"
          >
            {project.title}
          </h2>

          {/* Subtitle Accent */}
          <div
            ref={subtitleRef}
            className="text-[12px] md:text-sm font-extrabold text-[#22c55e] tracking-widest mb-6 uppercase"
          >
            {project.subtitle}
          </div>

          {/* Tech stack pills (Glassmorphism style) */}
          <div ref={pillsRef} className="flex flex-wrap gap-2 mb-8">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-4 py-1.5 text-xs font-semibold rounded-full bg-white/[0.04] text-gray-300 border border-white/10 hover:border-accent-500/40 hover:bg-white/[0.08] transition-all duration-300"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Translucent Glassmorphism Description Card */}
          <div
            ref={descRef}
            className="bg-white/[0.03] backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] mb-8 transition-colors duration-300 hover:bg-white/[0.05]"
          >
            <p className="text-gray-300 text-sm md:text-base leading-relaxed font-medium">
              {project.description}
            </p>
          </div>

          {/* Bottom Icons (glow on hover) */}
          <div ref={linksRef} className="flex items-center gap-6 select-none">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                title="View GitHub Repository"
                className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 flex items-center justify-center w-12 h-12 rounded-full border border-white/10 hover:border-accent-500/50 hover:bg-accent-500/10 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)]"
              >
                <Github className="w-5 h-5" />
              </a>
            )}
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                title="View Live Demo"
                className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 flex items-center justify-center w-12 h-12 rounded-full border border-white/10 hover:border-accent-500/50 hover:bg-accent-500/10 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)]"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const label = headerRef.current?.querySelector('.label');
      const heading = headerRef.current?.querySelector('.heading');
      const subtitle = headerRef.current?.querySelector('.subtitle');

      // Small label entrance
      if (label) {
        gsap.fromTo(
          label,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: 'power4.out',
            duration: 1.2,
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
            },
          }
        );
      }

      // Large Heading entrance
      if (heading) {
        gsap.fromTo(
          heading,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: 'power4.out',
            duration: 1.4,
            delay: 0.1,
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
            },
          }
        );
      }

      // Subtitle entrance
      if (subtitle) {
        gsap.fromTo(
          subtitle,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: 'power4.out',
            duration: 1.4,
            delay: 0.2,
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="pt-8 pb-6 md:pt-10 md:pb-8 relative overflow-hidden bg-black"
    >
      {/* Background Decorative Blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="blob blob-2" style={{ opacity: 0.04, top: '25%' }} />
        <div className="blob blob-3" style={{ opacity: 0.06, bottom: '20%' }} />
      </div>

      <div className="container-custom relative z-10">
        
        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col items-start text-left mb-2 md:mb-3 w-full">
          
          {/* Category Subtitle Label */}
          <div className="flex items-center gap-2 label mb-6">
            <span className="w-8 h-[2px] bg-accent-500" />
            <span className="text-[11px] font-black tracking-[0.3em] text-accent-400 uppercase">
              PROJECTS
            </span>
          </div>

          {/* Large Typographic Heading */}
          <h2 className="font-black tracking-tighter leading-none uppercase select-none text-white text-5xl md:text-7xl lg:text-[6vw] heading">
            THINGS <span className="heading-purple-glow">I'VE BUILT</span>
          </h2>

        </div>

        {/* Projects List */}
        <div className="flex flex-col gap-0">
          {projects.map((project, index) => (
            <ProjectRow key={project.title} project={project} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;
