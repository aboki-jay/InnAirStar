import React from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import Hero from './components/Hero';

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

function App() {
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
      <div id="portal-root" className="relative z-50"></div>
      
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main className="w-full bg-[#0A0A0A]">
            <Hero />
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
