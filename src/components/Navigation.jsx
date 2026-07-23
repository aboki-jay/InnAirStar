import React, { useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const links = [
  "THE FIXTURE",
  "OUR STORY",
  "HOME GROUND",
  "MATCHDAY INFO",
  "FAN SUPPORT"
];

const Navigation = ({ isOpen, setMenuOpen }) => {
  const containerRef = useRef();
  const tl = useRef();

  useGSAP(() => {
    // Setup timeline
    tl.current = gsap.timeline({ paused: true })
      .to(containerRef.current, { autoAlpha: 1, duration: 0.5, ease: "power2.inOut" })
      .fromTo(".nav-link", 
        { y: 60, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.08, ease: "power2.out" },
        "-=0.3"
      );
  }, { scope: containerRef });

  // Toggle timeline playback based on isOpen state
  useEffect(() => {
    if (tl.current) {
      if (isOpen) {
        tl.current.play();
      } else {
        tl.current.reverse();
      }
    }
  }, [isOpen]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[100] w-full h-screen bg-[#0A0A0A] bg-cover bg-center bg-no-repeat flex flex-col justify-between p-4 md:p-12 invisible"
      style={{ backgroundImage: "url('/assets/images/field-bg.png')" }}
    >
      {/* Header Navigation */}
      <div className="flex justify-between items-center w-full">
        {/* Left SVG Badge */}
        <img 
          src="/assets/svgs/top-navigation.svg" 
          alt="Top Navigation" 
          className="h-16 sm:h-20 md:h-28 w-auto object-contain" 
        />

        {/* Right Close Button */}
        <button 
          onClick={() => setMenuOpen(false)}
          className="flex items-center justify-center text-white font-display font-extrabold uppercase bg-black/40 border border-white px-3 py-1.5 gap-2 text-sm sm:text-lg md:px-[16px] md:py-[12px] md:gap-[12px] rounded-full md:text-[34px] md:leading-[30px] backdrop-blur-md hover:bg-white hover:text-black transition-all shrink-0"
        >
          <span>CLOSE</span>
          <X className="w-4 h-4 sm:w-5 sm:h-5 md:w-[34px] md:h-[34px]" strokeWidth={3} />
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col items-center justify-center flex-grow">
        <ul className="flex flex-col items-center justify-center space-y-2 md:space-y-1">
          {links.map((link, index) => (
            <li key={index} className="overflow-hidden p-2">
              <a 
                href="#" 
                className="nav-link block text-white font-proxima uppercase text-[10vw] md:text-[110px] leading-[0.9] hover:text-black hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] transition-all duration-300"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer Tag */}
      <div className="flex justify-center items-end w-full pb-4">
        <span className="text-white font-display font-bold text-lg md:text-2xl uppercase tracking-widest opacity-80">
          #INNESTA2026
        </span>
      </div>
    </div>
  );
};

export default Navigation;
