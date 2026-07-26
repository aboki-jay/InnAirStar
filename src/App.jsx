import React, { useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import Hero from './components/Hero';
import Navigation from './components/Navigation';
import RoadToFinal from './components/RoadToFinal';
import CircularGallery from './components/CircularGallery';
import MatchDayAndSchedule from './components/MatchDayAndSchedule';
import AccommodationsSection from './components/AccommodationsSection';
import TopNav from './components/TopNav';

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

function App() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  useGSAP(() => {
    ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1.5,
      effects: true
    });
  });

  return (
    <>
      {/* Portal root for fixed elements like navigation */}
      <div id="portal-root" className="relative z-50">
        <TopNav setMenuOpen={setMenuOpen} />
        <Navigation isOpen={isMenuOpen} setMenuOpen={setMenuOpen} />
      </div>
      
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main className="w-full bg-[#0A0A0A]">
            <Hero setMenuOpen={setMenuOpen} />
            <RoadToFinal />
            <CircularGallery />
            <MatchDayAndSchedule />
            <AccommodationsSection />
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
