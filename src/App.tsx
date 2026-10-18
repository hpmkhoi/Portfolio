import React, { useState } from 'react';
import SmoothScrollProvider from './components/SmoothScroll';
import GrainOverlay from './components/GrainOverlay';
import CustomCursor from './components/CustomCursor';
import MouseCoordinates from './components/MouseCoordinates';
import { DirectorViewfinderOverlay, DirectorToggleButton } from './components/DirectorMode';
import DraggableStickers from './components/DraggableStickers';
import Navbar from './components/Navbar';
import HeroSection from './sections/HeroSection';
import MarqueeSection from './sections/MarqueeSection';
import AboutSection from './sections/AboutSection';
import CaseStudiesSection from './sections/CaseStudiesSection';
import FooterSection from './sections/FooterSection';

const App: React.FC = () => {
  const [directorActive, setDirectorActive] = useState(false);

  const toggleDirector = () => {
    setDirectorActive((prev) => !prev);
  };

  return (
    <SmoothScrollProvider>
      <div className="relative min-h-screen bg-espresso bg-grid-drafting text-cream font-sans selection:bg-cream-gold selection:text-espresso overflow-x-hidden">
        {/* Illoca Fixed Viewport HUD: Live Coordinates */}
        <MouseCoordinates />

        {/* 35mm Analog Film Grain Texture Overlay */}
        <GrainOverlay />

        {/* Custom Follower Cursor & Hover Preview */}
        <CustomCursor />

        {/* Interactive Camera Director Viewfinder HUD */}
        <DirectorViewfinderOverlay active={directorActive} />
        <DirectorToggleButton active={directorActive} onToggle={toggleDirector} />

        {/* Physical Draggable Stickers */}
        <DraggableStickers />

        {/* Illoca Floating Pill Navbar */}
        <Navbar onToggleDirector={toggleDirector} isDirectorActive={directorActive} />

        {/* Main Editorial Sections */}
        <main className="relative z-10">
          <HeroSection />
          <MarqueeSection />
          <AboutSection />
          <CaseStudiesSection />
        </main>

        {/* Architectural Footer */}
        <FooterSection />
      </div>
    </SmoothScrollProvider>
  );
};

export default App;
