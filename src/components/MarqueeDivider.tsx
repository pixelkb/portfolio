import { motion } from 'framer-motion';

const MarqueeDivider = () => {
  const phrases = [
    'CODE IT',
    'DESIGN IT',
    'SHIP IT',
    'CREATIVE ENGINEER',
    'MERN STACK',
    'FULL STACK DEVELOPER',
    'PROBLEM SOLVER',
    'INNOVATE',
  ];

  // Repeat the array to ensure seamless infinite looping width
  const content = [...phrases, ...phrases, ...phrases, ...phrases];

  return (
    <div className="relative w-full overflow-hidden bg-accent-500 py-3.5 md:py-4 select-none border-y border-black/10 z-20 flex items-center">
      <motion.div
        animate={{ x: [0, '-50%'] }}
        transition={{
          ease: 'linear',
          duration: 25,
          repeat: Infinity,
        }}
        className="flex whitespace-nowrap gap-8 shrink-0 pr-8"
      >
        {content.map((text, idx) => (
          <span
            key={idx}
            className="flex items-center gap-8 text-black text-xs md:text-sm font-black tracking-[0.2em] font-mono"
          >
            <span>{text}</span>
            <span className="w-2 h-2 rounded-full bg-black/60 shrink-0" />
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default MarqueeDivider;
