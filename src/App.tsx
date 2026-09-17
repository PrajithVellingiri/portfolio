import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Sections
import LoadingScreen from './sections/LoadingScreen';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import GitHub from './sections/GitHub';
import Timeline from './sections/Timeline';
import Services from './sections/Services';
import SocialLinks from './sections/SocialLinks';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

// Components
import Navbar from './components/Navbar';
import ScanlineOverlay from './components/ScanlineOverlay';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    // Small delay before showing content to let loading screen fade
    setTimeout(() => setShowContent(true), 100);
  };

  // Prevent scroll during loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoading]);

  return (
    <div className="relative min-h-screen bg-cyber-black text-cyber-text">
      {/* Global overlays */}
      <ScanlineOverlay />

      {/* Loading Screen */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen key="loading" onComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Fixed Navigation */}
            <Navbar />

            {/* Sections */}
            <main>
              <Hero />
              <About />
              <Skills />
              <Projects />
              <GitHub />
              <Timeline />
              <Services />
              <SocialLinks />
              <Contact />
            </main>

            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
