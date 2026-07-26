import React, { useRef, useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

const linksConfig = [
  {
    text: "THE FIXTURE",
    href: "#hero",
    images: [
      { src: "/assets/images/the-fixture-hover-esther.png", position: "top-[20%] left-[15%] -translate-y-1/2 -rotate-6 hidden md:block" },
      { src: "/assets/images/the-fixture-hover-innocent-1.png", position: "top-[10%] left-1/2 -translate-x-1/2 rotate-3 hidden md:block" },
      { src: "/assets/images/the-fixture-hover-innocent-2.png", position: "top-[20%] right-[15%] -translate-y-1/2 rotate-6 hidden md:block" }
    ]
  },
  {
    text: "OUR STORY",
    href: "#our-story",
    images: [
      { src: "/assets/images/our-story-hover-1.png", position: "top-[35%] left-[20%] -rotate-12 hidden md:block" },
      { src: "/assets/images/our-story-hover-2.png", position: "top-[30%] left-1/2 -translate-x-1/2 rotate-6 hidden md:block" },
      { src: "/assets/images/our-story-hover-3.png", position: "top-[35%] right-[20%] rotate-12 hidden md:block" }
    ]
  },
  {
    text: "HOME GROUND",
    href: "#accommodations",
    images: [
      { src: "/assets/images/home-ground-hover-1.png", position: "top-[60%] left-[15%] rotate-6 hidden md:block" },
      { src: "/assets/images/home-ground-hover-2.png", position: "top-[55%] left-1/2 -translate-x-1/2 -rotate-3 hidden md:block" },
      { src: "/assets/images/home-ground-hover-3.png", position: "top-[60%] right-[15%] -rotate-12 hidden md:block" }
    ]
  },
  {
    text: "MATCHDAY INFO",
    href: "#matchday",
    images: [
      { src: "/assets/images/matchday-info-hover-1.png", position: "bottom-[15%] left-[20%] -rotate-6 hidden md:block" },
      { src: "/assets/images/matchday-info-hover-2.png", position: "bottom-[5%] left-1/2 -translate-x-1/2 rotate-3 hidden md:block" },
      { src: "/assets/images/matchday-info-hover-3.png", position: "bottom-[15%] right-[20%] rotate-6 hidden md:block" }
    ]
  },
  {
    text: "FAN SUPPORT",
    href: "#",
    images: []
  }
];

const Navigation = ({ isOpen, setMenuOpen }) => {
  const containerRef = useRef();
  const tl = useRef();
  const [hoveredIndex, setHoveredIndex] = useState(null);

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

  // Handle Image Animations
  useGSAP(() => {
    if (hoveredIndex !== null) {
      gsap.to(`.hover-img-${hoveredIndex}`, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        stagger: 0.05,
        ease: "back.out(1.5)"
      });
    }
    
    // Hide all images not currently hovered
    gsap.to(`.hover-img:not(.hover-img-${hoveredIndex})`, {
      opacity: 0,
      scale: 0.8,
      duration: 0.3,
      ease: "power2.inOut"
    });
  }, { dependencies: [hoveredIndex], scope: containerRef });

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    if (!href || href === "#") return;
    
    // Start closing the menu
    setMenuOpen(false);

    // Wait for the closing animation to finish before scrolling to the section
    setTimeout(() => {
      const smoother = ScrollSmoother.get();
      if (smoother) {
        smoother.scrollTo(href, true, "top top");
      } else {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 400); // 400ms delay matches the menu close transition
  };

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[100] w-full h-screen bg-[#0A0A0A] bg-cover bg-center bg-no-repeat flex flex-col justify-between p-4 md:p-12 invisible"
      style={{ backgroundImage: "url('/assets/images/field-bg.png')" }}
    >
      {/* Pre-rendered Floating Images */}
      <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
        {linksConfig.map((link, idx) => (
          link.images.map((img, i) => (
            <img
              key={`${idx}-${i}`}
              src={img.src}
              alt=""
              className={`hover-img hover-img-${idx} absolute w-40 md:w-56 lg:w-72 object-contain opacity-0 scale-90 ${img.position}`}
            />
          ))
        ))}
      </div>

      {/* Header Navigation */}
      <div className="flex justify-between items-center relative z-20 w-full">
        <img 
          src="/assets/svgs/top-navigation.svg" 
          alt="Top Navigation" 
          className="h-16 sm:h-20 md:h-28 w-auto object-contain" 
        />
        <button 
          onClick={() => setMenuOpen(false)}
          className="flex items-center justify-center text-white font-display font-extrabold uppercase bg-black/40 border border-white px-3 py-1.5 gap-2 text-sm sm:text-lg md:px-[16px] md:py-[12px] md:gap-[12px] rounded-full md:text-[34px] md:leading-[30px] backdrop-blur-md hover:bg-white hover:text-black transition-all shrink-0"
        >
          <span>CLOSE</span>
          <X className="w-4 h-4 sm:w-5 sm:h-5 md:w-[34px] md:h-[34px]" strokeWidth={3} />
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col items-center justify-center relative z-10 flex-grow">
        <ul className="flex flex-col items-center justify-center space-y-1">
          {linksConfig.map((link, index) => {
            // First item is considered the active page for now
            const isActive = index === 0;
            const textColor = isActive ? 'text-[#A7A9B4]' : 'text-white';

            return (
              <li key={index} className="overflow-hidden">
                <a 
                  href={link.href || "#"} 
                  onClick={(e) => handleLinkClick(e, link.href)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`nav-link block font-proxima uppercase text-[10vw] md:text-[110px] leading-[0.9] transition-colors duration-300 cursor-pointer ${textColor}`}
                >
                  {link.text}
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Footer Tag */}
      <div className="flex justify-center items-end relative z-10 w-full pb-4">
        <span className="text-white font-display font-bold text-lg md:text-2xl uppercase tracking-widest opacity-80">
          #INNESTA2026
        </span>
      </div>
    </div>
  );
};

export default Navigation;
