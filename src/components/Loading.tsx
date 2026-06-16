import { useEffect, useState } from 'react';
import './Loading.css';

interface LoadingProps {
  onLoadingComplete: () => void;
}

const Loading = ({ onLoadingComplete }: LoadingProps) => {
  const [percent, setPercent] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Simulate rapid progress from 0% to 100% in under 1 second
  useEffect(() => {
    let currentPercent = 0;
    const interval = setInterval(() => {
      const rand = Math.floor(Math.random() * 8) + 3; // increments of 3-10%
      currentPercent = Math.min(currentPercent + rand, 100);
      setPercent(currentPercent);
      if (currentPercent >= 100) {
        clearInterval(interval);
      }
    }, 35);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // Handle completion sequence when progress hits 100
  useEffect(() => {
    if (percent >= 100) {
      const timer1 = setTimeout(() => {
        setLoaded(true);
        const timer2 = setTimeout(() => {
          setIsLoaded(true);
        }, 1000);
        return () => clearTimeout(timer2);
      }, 600);
      return () => clearTimeout(timer1);
    }
  }, [percent]);

  // Handle Dynamic entrance module import and triggers transition exit
  useEffect(() => {
    if (isLoaded) {
      import('./utils/initialFX').then((module) => {
        setClicked(true);
        setTimeout(() => {
          if (module && module.initialFX) {
            module.initialFX();
          }
          onLoadingComplete();
        }, 900);
      }).catch((err) => {
        console.warn('Failed to load initialFX module, falling back to complete:', err);
        setClicked(true);
        setTimeout(onLoadingComplete, 900);
      });
    }
  }, [isLoaded, onLoadingComplete]);

  // Update mouse position CSS variables on container for hover glows
  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty('--mouse-x', `${x}px`);
    target.style.setProperty('--mouse-y', `${y}px`);
  }

  return (
    <>
      <div className="loading-header">
        <a href="/#" className="cursor-pointer" data-cursor="disable">
          <div className="w-10 h-10 rounded-full bg-black border border-accent-500/50 flex items-center justify-center text-lg font-bold text-white shadow-lg">
            KB
          </div>
        </a>
        <div className={`loaderGame ${clicked ? 'loader-out' : ''}`}>
          <div className="loaderGame-container">
            <div className="loaderGame-in">
              {[...Array(27)].map((_, index) => (
                <div className="loaderGame-line" key={index}></div>
              ))}
            </div>
            <div className="loaderGame-ball"></div>
          </div>
        </div>
      </div>
      <div className="loading-screen">
        <div className="loading-marquee">
          <span>&nbsp; Software Engineer &nbsp;&bull;&nbsp; Full Stack Developer &nbsp;&bull;&nbsp; Creative Coder &nbsp;&bull;&nbsp; Software Engineer &nbsp;&bull;&nbsp; Full Stack Developer &nbsp;&bull;&nbsp; Creative Coder &nbsp;</span>
        </div>
        <div 
          className={`loading-wrap ${clicked ? 'loading-clicked' : ''}`} 
          onMouseMove={handleMouseMove}
        >
          <div className="loading-hover"></div>
          <div className={`loading-button ${loaded ? 'loading-complete' : ''}`}>
            <div className="loading-container">
              <div className="loading-content">
                <div className="loading-content-in">
                  Loading <span>{percent}%</span>
                </div>
              </div>
              <div className="loading-box"></div>
            </div>
            <div className="loading-content2">
              <span>Welcome</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;
