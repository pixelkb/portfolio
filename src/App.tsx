import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Loading from './components/Loading';
import Navbar from './components/Navbar';
import Intro from './components/Intro';
import MarqueeDivider from './components/MarqueeDivider';
import ScrollTransition from './components/ScrollTransition';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';
import ScrollProgress from './components/ScrollProgress';
import CursorGlow from './components/CursorGlow';
import Sidebars from './components/Sidebars';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [isHeroComplete, setIsHeroComplete] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setTimeout(() => setShowContent(true), 100);
  };

  return (
    <div className="relative bg-black min-h-screen">
      {/* Custom Cursor - Only on desktop */}
      <div className="hidden md:block">
        <CursorGlow />
      </div>

      {/* Loading Screen */}
      <AnimatePresence mode="wait">
        {isLoading && <Loading onLoadingComplete={handleLoadingComplete} />}
      </AnimatePresence>

      {/* Main Content */}
      {showContent && (
        <>
          {/* Scroll Progress Bar */}
          <ScrollProgress />

          {/* Navbar */}
          <Navbar />

          {/* Fixed Site-Wide Social & Email Sidebars */}
          <Sidebars isVisible={isHeroComplete} />

          {/* Main Content */}
          <main>
            <Intro onHeroComplete={() => setIsHeroComplete(true)} />
            <MarqueeDivider />
            <ScrollTransition />
            <Projects />
            <Contact />
          </main>

          {/* Footer */}
          <Footer />

          {/* Floating Action Buttons */}
          <FloatingButtons />
        </>
      )}
    </div>
  );
}

export default App;
