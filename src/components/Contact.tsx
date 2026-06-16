import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Loader2, Copy, Check, Linkedin, Github, Instagram, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);



const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade upward the entire section container
      gsap.fromTo(sectionRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          }
        }
      );

      // Standardized heading animations (scroll-triggered dynamic slide-in & glow pulse)
      const letsWordEl = headerRef.current?.querySelector('.lets-title-word');
      const connectWordEl = headerRef.current?.querySelector('.connect-title-word');
      const subtitleEl = headerRef.current?.querySelector('.subtitle');

      if (letsWordEl && connectWordEl) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 95%',   // Starts as heading enters viewport bottom
            end: 'top 65%',     // Fully assembled at 65% height
            scrub: 1,           // Reversible scroll-locked smoothing
          }
        });

        tl.fromTo(letsWordEl,
          { x: -100, opacity: 0 },
          { x: 0, opacity: 1, ease: 'power3.out' }
        );

        tl.fromTo(connectWordEl,
          { 
            x: 100, 
            opacity: 0,
            filter: 'drop-shadow(0 0 10px rgba(168, 85, 247, 0.15))'
          },
          { 
            x: 0, 
            opacity: 1,
            filter: 'drop-shadow(0 0 15px rgba(168, 85, 247, 0.35))',
            ease: 'power3.out'
          },
          '<'
        );

        // Cinematic pulse flash when words meet at the end of the scroll range
        tl.to(connectWordEl, {
          filter: 'drop-shadow(0 0 35px rgba(168, 85, 247, 0.95))',
          ease: 'power1.inOut',
          duration: 0.4
        });

        tl.to(connectWordEl, {
          filter: 'drop-shadow(0 0 15px rgba(168, 85, 247, 0.35))',
          ease: 'power1.inOut',
          duration: 0.4
        });
      }

      if (subtitleEl) {
        gsap.fromTo(subtitleEl,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 90%',
              end: 'top 60%',
              scrub: 1,
            }
          }
        );
      }

      // Inputs fade up sequentially
      gsap.fromTo('.input-field',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-form-container',
            start: 'top 85%',
          }
        }
      );

      // Social icons fade up sequentially
      gsap.fromTo('.social-btn',
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.socials-grid',
            start: 'top 90%',
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Front-end validation
    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !message || !emailRegex.test(email)) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
      return;
    }

    setIsSubmitting(true);
    setStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleCopyEmail = () => {
    const email = 'kritikabhatt999@gmail.com';
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email)
        .then(() => {
          setShowToast(true);
          setTimeout(() => setShowToast(false), 3000);
        })
        .catch((err) => {
          console.warn('Navigator clipboard copy failed, trying fallback:', err);
          fallbackCopyText(email);
        });
    } else {
      fallbackCopyText(email);
    }
  };

  const fallbackCopyText = (text: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    textArea.style.top = "-9999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      const successful = document.execCommand('copy');
      if (successful) {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      } else {
        console.error('Fallback copy command returned false');
      }
    } catch (err) {
      console.error('Fallback copy failed', err);
    }
    document.body.removeChild(textArea);
  };

  const socialButtons = [
    { name: 'LINKEDIN', url: 'https://www.linkedin.com/in/kritikabhatt999', icon: <Linkedin className="w-4 h-4 transition-transform group-hover:rotate-12 duration-300" /> },
    { name: 'GITHUB', url: 'https://github.com/pixelkb', icon: <Github className="w-4 h-4 transition-transform group-hover:rotate-12 duration-300" /> },
  ];

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="relative overflow-hidden bg-black pt-10 pb-20 lg:pt-14 lg:pb-32"
    >
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

      {/* Soft purple radial glow background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[40%] left-[20%] w-[60vw] h-[50vh] bg-[#7C3AED]/6 rounded-full blur-[140px]" />
        <div className="absolute top-[60%] right-[10%] w-[50vw] h-[60vh] bg-gradient-to-br from-[#8B5CF6]/4 to-transparent rounded-full blur-[160px]" />
      </div>

      <div className="container-custom relative z-10 w-full">
        
        {/* Centered Heading */}
        <div ref={headerRef} className="flex flex-col items-center justify-center text-center mb-16 lg:mb-20 select-none w-full max-w-4xl mx-auto">
          
          <h2 className="font-black uppercase tracking-tighter select-none leading-none mb-[20px] text-5xl md:text-6xl lg:text-[4.5rem] flex items-center justify-center gap-4">
            <span className="lets-title-word text-[#F5F5F5] inline-block">LET'S</span>
            <span className="connect-title-word heading-purple-glow">
              CONNECT!!
            </span>
          </h2>

          {/* Subtitle */}
          <div className="flex items-center justify-center gap-4 subtitle w-full max-w-xl mx-auto mt-2">
            <span className="h-[1px] w-12 md:w-16 bg-[#7C3AED] opacity-70" />
            <p className="text-[10px] md:text-[11px] font-mono tracking-[0.25em] text-gray-400 uppercase whitespace-nowrap">
              GET IN TOUCH WITH ME...
            </p>
            <span className="h-[1px] w-12 md:w-16 bg-[#7C3AED] opacity-70" />
          </div>

        </div>

        {/* Grid layout */}
        <div className="grid lg:grid-cols-[4fr_6fr] gap-16 lg:gap-24 items-start">
          
          {/* LEFT PANEL */}
          <div className="flex flex-col h-full justify-between select-none">
            <div>

              {/* Email Address with Copy-to-Clipboard */}
              <div className="flex items-center gap-3 mb-16 max-w-full">
                <span className="text-white text-base md:text-lg lg:text-xl xl:text-2xl font-bold tracking-tight break-all">
                  kritikabhatt999@gmail.com
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="flex-shrink-0 p-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-gray-400 hover:text-white"
                  title="Copy email to clipboard"
                >
                  <Copy className="w-4.5 h-4.5" />
                </button>
              </div>

              {/* Socials section */}
              <div className="text-[11px] font-mono tracking-[0.25em] text-gray-500 uppercase mb-4">
                SOCIALS
              </div>

              <div className="socials-grid grid grid-cols-2 gap-3 max-w-sm mb-16 lg:mb-24">
                {socialButtons.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    className="social-btn group flex items-center gap-3 px-5 py-3.5 rounded-full bg-white/[0.03] border border-white/10 text-gray-400 hover:text-white transition-all duration-300 hover:border-accent-400/40 hover:bg-accent-500/5 hover:shadow-[0_0_15px_rgba(139,92,246,0.2)]"
                  >
                    <div className="text-gray-400 group-hover:text-accent-400 transition-colors">
                      {social.icon}
                    </div>
                    <span className="text-xs font-bold tracking-widest font-mono">{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Bottom Quote */}
            <p className="text-gray-500 text-xs font-mono tracking-wider pt-4 select-none italic">
              "Great ideas start with a conversation."
            </p>
          </div>

          {/* RIGHT PANEL - Floating Form */}
          <div className="contact-form-container p-8 lg:p-12">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Your Name */}
              <div className="input-field relative w-full group">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="What's your name?"
                  className="w-full bg-transparent py-5 text-white placeholder-neutral-600 focus:outline-none transition-colors duration-300 text-base md:text-lg border-b border-neutral-800 focus:border-neutral-700"
                />
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-300 via-accent-500 to-accent-700 scale-x-0 group-focus-within:scale-x-100 origin-left transition-transform duration-300 pointer-events-none shadow-[0_0_12px_#8b5cf6]" />
              </div>

              {/* Your Email */}
              <div className="input-field relative w-full group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Your email address"
                  className="w-full bg-transparent py-5 text-white placeholder-neutral-600 focus:outline-none transition-colors duration-300 text-base md:text-lg border-b border-neutral-800 focus:border-neutral-700"
                />
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-300 via-accent-500 to-accent-700 scale-x-0 group-focus-within:scale-x-100 origin-left transition-transform duration-300 pointer-events-none shadow-[0_0_12px_#8b5cf6]" />
              </div>




              {/* Your Message */}
              <div className="input-field relative w-full group">
                <input
                  type="text"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  placeholder="Write your message here"
                  className="w-full bg-transparent py-5 text-white placeholder-neutral-600 focus:outline-none transition-colors duration-300 text-base md:text-lg border-b border-neutral-800 focus:border-neutral-700"
                />
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-300 via-accent-500 to-accent-700 scale-x-0 group-focus-within:scale-x-100 origin-left transition-transform duration-300 pointer-events-none shadow-[0_0_12px_#8b5cf6]" />
              </div>

              {/* Submit Button */}
              <div className="input-field pt-4 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative px-8 py-4 bg-black border border-accent-500 text-white font-bold rounded-full overflow-hidden flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] active:scale-95 animate-pulse-glow disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin text-accent-400" />
                      <span>SENDING...</span>
                    </>
                  ) : (
                    <>
                      <span>SEND MESSAGE</span>
                      <div className="relative overflow-hidden w-5 h-5 flex items-center justify-center">
                        <ArrowRight className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-6" />
                        <ArrowRight className="w-5 h-5 absolute -left-6 transform transition-transform duration-300 group-hover:translate-x-6 text-accent-300" />
                      </div>
                    </>
                  )}
                </button>
              </div>

              {/* Status Feedback messages */}
              {status === 'success' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-green-400 font-semibold mt-4"
                >
                  ✅ Message sent successfully! I'll get back to you soon.
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-red-500 font-semibold mt-4"
                >
                  ❌ Failed to send message. Please try again.
                </motion.p>
              )}
            </form>
          </div>

        </div>
      </div>

      {/* Copy Email Floating Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 flex items-center gap-2.5 px-5 py-3.5 bg-black border border-green-500/30 rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.8)] text-green-400 text-sm font-semibold select-none"
            style={{
              boxShadow: '0 0 20px rgba(34, 197, 94, 0.15)'
            }}
          >
            <Check className="w-4 h-4 stroke-[2.5]" />
            <span>Email Copied!</span>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default Contact;
