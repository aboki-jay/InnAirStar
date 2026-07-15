import React, { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X } from 'lucide-react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const bgRef = useRef(null);
  const innoRef = useRef(null);
  const estherRef = useRef(null);
  const videoRef = useRef(null);
  const videoWrapperRef = useRef(null);
  const menuTl = useRef(null);
  const imageRefs = useRef({});

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHoveredLink, setActiveHoveredLink] = useState(null);

  const menuData = [
    {
      title: 'THE FIXTURE',
      id: 'the-fixture',
      target: '#fixture',
      images: [
        { src: '/assets/images/the-fixture-hover-innocent-1.png', alt: 'Left', className: 'w-[180px] md:w-[220px]', top: '50%', right: 'calc(100% + 16px)', xPercent: 0, yPercent: -50, rotate: -12, startY: 30 },
        { src: '/assets/images/the-fixture-hover-innocent-2.png', alt: 'Center', className: 'w-[200px] md:w-[240px]', bottom: '90%', left: '50%', xPercent: -50, yPercent: 0, rotate: -4, startY: 30 },
        { src: '/assets/images/the-fixture-hover-esther.png', alt: 'Right', className: 'w-[160px] md:w-[180px]', top: '50%', left: 'calc(100% + 16px)', xPercent: 0, yPercent: -50, rotate: 15, startY: 30 },
      ]
    },
    {
      title: 'OUR STORY',
      id: 'our-story',
      target: '#our-story',
      images: [
        { src: '/assets/images/our-story-hover-1.png', alt: 'Left', className: 'w-[180px] md:w-[200px]', top: '50%', right: 'calc(100% + 16px)', xPercent: 0, yPercent: -50, rotate: -10, startY: 30 },
        { src: '/assets/images/our-story-hover-2.png', alt: 'Center', className: 'w-[160px] md:w-[180px]', bottom: 'calc(100% + 4px)', left: '50%', xPercent: -50, yPercent: 0, rotate: 4, startY: 30 },
        { src: '/assets/images/our-story-hover-3.png', alt: 'Right', className: 'w-[180px] md:w-[220px]', top: '50%', left: 'calc(100% + 16px)', xPercent: 0, yPercent: -50, rotate: 8, startY: 30 },
      ]
    },
    {
      title: 'HOME GROUND',
      id: 'home-ground',
      target: '#home-ground',
      images: [
        { src: '/assets/images/home-ground-hover-1.png', alt: 'Left', className: 'w-[180px] md:w-[220px]', top: '50%', right: 'calc(100% + 16px)', xPercent: 0, yPercent: -50, rotate: -12, startY: 30 },
        { src: '/assets/images/home-ground-hover-2.png', alt: 'Center', className: 'w-[200px] md:w-[240px]', bottom: 'calc(100% + 4px)', left: '50%', xPercent: -50, yPercent: 0, rotate: 6, startY: 30 },
        { src: '/assets/images/home-ground-hover-3.png', alt: 'Right', className: 'w-[150px] md:w-[170px]', top: '50%', left: 'calc(100% + 16px)', xPercent: 0, yPercent: -50, rotate: -8, startY: 30 },
      ]
    },
    {
      title: 'MATCHDAY INFO',
      id: 'matchday-info',
      target: '#matchday-info',
      images: [
        { src: '/assets/images/matchday-info-hover-1.png', alt: 'Left', className: 'w-[180px] md:w-[200px]', top: '50%', right: 'calc(100% + 16px)', xPercent: 0, yPercent: -50, rotate: -15, startY: 30 },
        { src: '/assets/images/matchday-info-hover-2.png', alt: 'Bottom', className: 'w-[200px] md:w-[220px]', top: 'calc(100% + 8px)', left: '50%', xPercent: -50, yPercent: 0, rotate: -5, startY: -30 },
        { src: '/assets/images/matchday-info-hover-3.png', alt: 'Right', className: 'w-[180px] md:w-[220px]', top: '50%', left: 'calc(100% + 16px)', xPercent: 0, yPercent: -50, rotate: 10, startY: 30 },
      ]
    }
  ];

  useGSAP(() => {
    // 1. Background zooming out simulating a camera lens settling
    gsap.fromTo(bgRef.current,
      { scale: 1.1 },
      { scale: 1.0, duration: 3, ease: 'power2.out' }
    );

    // 2. Main entrance timeline for player cards
    const tl = gsap.timeline();

    // Innocent's card smoothly fades and scales in from the center
    tl.fromTo(innoRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out' },
      0.5
    );

    // Esther's card slides up elegantly from the bottom
    tl.fromTo(estherRef.current,
      { y: '30%', opacity: 0 },
      { y: '0%', opacity: 1, duration: 1.5, ease: 'power3.out' },
      0.8
    );

    // 3. Subtle holographic light sweep across both cards
    gsap.fromTo('.holo-sweep',
      { x: '-150%', skewX: -25 },
      { x: '250%', skewX: -25, duration: 2.2, ease: 'power1.inOut', stagger: 0.3, delay: 1.6 }
    );

    // --- NEW: Cinematic Scroll Sequence ---
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=200%',
        scrub: 1,
        pin: true,
        onUpdate: (self) => {
          if (self.progress > 0.5 && videoRef.current && videoRef.current.paused) {
            videoRef.current.play().catch(() => {});
          } else if (self.progress <= 0.5 && videoRef.current && !videoRef.current.paused) {
            videoRef.current.pause();
          }
        }
      }
    });

    // Phase 1: Slide Esther's card down out of the viewport
    scrollTl.fromTo(estherRef.current,
      { y: '0%', opacity: 1 },
      { y: '100vh', opacity: 0, ease: 'power2.inOut', duration: 1, immediateRender: false },
      0
    );

    // Phase 2: Scale Innocent's card up massively and blur
    scrollTl.fromTo(innoRef.current,
      { scale: 1, opacity: 1, filter: 'blur(0px)' },
      { scale: 5, opacity: 0, filter: 'blur(8px)', ease: 'power2.inOut', duration: 1, immediateRender: false },
      1
    );

    // Fade in the video wrapper
    scrollTl.fromTo(videoWrapperRef.current,
      { opacity: 0, scale: 0.3, borderRadius: '48px' },
      { opacity: 1, scale: 1, borderRadius: '0px', ease: 'power2.inOut', duration: 1 },
      1
    );

  });

  // Handle menu animations when opened
  useEffect(() => {
    if (menuOpen) {
      // 1. Initialize hover images state instantly
      menuData.forEach(item => {
        item.images.forEach((img, i) => {
          const el = imageRefs.current[`${item.id}-${i}`];
          if (el) {
            gsap.set(el, {
              opacity: 0,
              scale: 0.8,
              y: img.startY,
              xPercent: img.xPercent,
              yPercent: img.yPercent,
              rotate: 0
            });
          }
        });
      });

      // 2. Animate the menu items dropping in
      gsap.fromTo('.menu-item',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out' }
      );
      
      gsap.fromTo('.menu-bottom',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out', delay: 0.2 }
      );
    }
  }, [menuOpen]);

  const handleMouseEnter = (id) => {
    setActiveHoveredLink(id);
    const item = menuData.find(m => m.id === id);
    if (item) {
      item.images.forEach((img, i) => {
        const el = imageRefs.current[`${id}-${i}`];
        if (el) {
          gsap.killTweensOf(el);
          gsap.to(el, {
            opacity: 1,
            scale: 1,
            y: 0,
            rotate: img.rotate,
            duration: 0.6,
            ease: 'back.out(1.2)'
          });
        }
      });
    }
  };

  const handleMouseLeave = (id) => {
    setActiveHoveredLink(null);
    const item = menuData.find(m => m.id === id);
    if (item) {
      item.images.forEach((img, i) => {
        const el = imageRefs.current[`${id}-${i}`];
        if (el) {
          gsap.killTweensOf(el);
          gsap.to(el, {
            opacity: 0,
            scale: 0.8,
            y: img.startY,
            rotate: 0,
            duration: 0.4,
            ease: 'power2.out'
          });
        }
      });
    }
  };

  const handleNavClick = (e, target) => {
    e.preventDefault();
    setMenuOpen(false);

    // Wait slightly for the menu to fade out before scrolling
    setTimeout(() => {
      const smoother = ScrollSmoother.get();
      if (smoother) {
        smoother.scrollTo(target, true, "top top");
      } else {
        document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  const [portalTarget, setPortalTarget] = useState(null);

  useEffect(() => {
    setPortalTarget(document.body);
  }, []);

  return (
    <>
      {portalTarget && createPortal(
        <>
          {/* ----------------- GLOBAL NAVIGATION ----------------- */}
          <nav
            className="fixed top-0 left-0 w-full z-50 h-[120px] md:h-[160px] px-6 lg:px-12 flex items-center justify-between"
          >
            {/* Left: Top Navigation SVG */}
            <div className="flex-1 flex items-center justify-start z-50">
              <img
                src="/assets/svgs/top-navigation.svg"
                alt="Top Navigation"
                className="h-[90px] md:h-[110px] lg:h-[130px] w-auto object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
              />
            </div>

            {/* Center: Hamburger / X Menu Toggle */}
            <div className="absolute left-1/2 -translate-x-1/2 z-50 flex items-center justify-center">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className={`flex items-center justify-center transition-all duration-300 rounded-full w-12 h-12 ${menuOpen ? 'bg-white text-black shadow-lg' : 'bg-transparent text-white hover:bg-white/10'
                  }`}
              >
                {menuOpen ? <X size={24} strokeWidth={2} /> : <Menu size={32} strokeWidth={1.5} />}
              </button>
            </div>

            {/* Right: Fan Support Button */}
            <div className="flex-1 flex items-center justify-end z-50">
              <button className="bg-[#A67C00] hover:bg-[#8a6700] text-white/95 hover:text-white px-7 md:px-9 py-2.5 rounded-full font-medium tracking-wide text-sm transition-all shadow-[0_4px_14px_0_rgba(166,124,0,0.4)] hover:shadow-[0_6px_20px_rgba(166,124,0,0.3)] border border-[#C59B27]/40 backdrop-blur-sm">
                Fan support
              </button>
            </div>
          </nav>

          {/* ----------------- FULL-PAGE MENU OVERLAY ----------------- */}
          {menuOpen && (
            <div className="fixed inset-0 w-screen h-screen z-40 flex flex-col justify-center items-center p-10 animate-in fade-in duration-300">

            {/* Overlay Background */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/assets/images/field-bg.jpg')" }}
            />

            {/* Dark Vignette / Overlay filter to pop text */}
            <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-black/40 to-black/80" />

            {/* Menu Items */}
            <div className="relative z-30 py-16 inline-flex flex-col items-center justify-center gap-0">
              {menuData.map((item, index) => {
                const isActive = item.title === 'THE FIXTURE';
                const isHovered = activeHoveredLink === item.id;

                return (
                  <a
                    key={index}
                    href={item.target}
                    onClick={(e) => handleNavClick(e, item.target)}
                    onMouseEnter={() => handleMouseEnter(item.id)}
                    onMouseLeave={() => handleMouseLeave(item.id)}
                    className={`menu-item relative inline-block w-max text-[88px] font-proxima leading-[90px] tracking-[-0.01em] transition-colors uppercase m-0 p-0 ${
                      isHovered ? 'text-white/50' : 'text-white'
                    }`}
                  >
                    <span className="relative z-20 pointer-events-none">{item.title}</span>

                    {item.images.map((img, i) => (
                      <img
                        key={i}
                        ref={el => imageRefs.current[`${item.id}-${i}`] = el}
                        src={img.src}
                        alt={img.alt}
                        className={`absolute pointer-events-none object-contain z-10 ${img.className}`}
                        style={{
                          top: img.top,
                          bottom: img.bottom,
                          left: img.left,
                          right: img.right,
                        }}
                      />
                    ))}
                  </a>
                );
              })}
            </div>

            {/* Bottom Hashtag */}
            <div className="menu-bottom absolute bottom-10 text-white/70 font-proxima text-lg md:text-xl tracking-widest">
              #INNESTA2026
            </div>
            </div>
          )}
        </>,
        portalTarget
      )}

      <div id="fixture" ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#0A0A0A]">

      {/* ----------------- BACKGROUND LAYER ----------------- */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/images/stadium-empty.png')" }}
      />
      <div className="absolute inset-0 bg-black/20 mix-blend-multiply" />

      {/* ----------------- VIDEO REVEAL LAYER ----------------- */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
        <div ref={videoWrapperRef} className="absolute inset-0 w-full h-full overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,1)] pointer-events-auto bg-black opacity-0">
          <video
            ref={videoRef}
            src="/assets/videos/innocent-reveal.webm"
            className="w-full h-full object-cover"
            loop
            muted
            playsInline
            preload="auto"
          />
        </div>
      </div>

      {/* ----------------- HERO SECTION CARDS ----------------- */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-10">

        {/* Innocent's Card (Higher up, slightly scaled down, perfectly sharp) */}
        <div
          ref={innoRef}
          className="absolute left-1/2 -translate-x-1/2 top-[5%] md:top-[8%] z-10 opacity-0 pointer-events-auto"
        >
          <div className="relative drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]">
            <img
              src="/assets/images/innocent-card.png"
              alt="Innocent Player Card"
              className="w-[160px] md:w-[200px] lg:w-[220px] h-auto object-contain"
            />
            {/* Holographic sweep */}
            <div
              className="absolute inset-0 z-20 pointer-events-none"
              style={{
                WebkitMaskImage: `url('/assets/images/innocent-card.png')`,
                WebkitMaskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskImage: `url('/assets/images/innocent-card.png')`,
                maskSize: 'contain',
                maskRepeat: 'no-repeat',
                maskPosition: 'center'
              }}
            >
              <div className="holo-sweep absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent mix-blend-overlay" />
            </div>
          </div>
        </div>

        {/* Esther's Card (Foreground center, larger, perfectly sharp) */}
        <div
          ref={estherRef}
          className="absolute left-1/2 -translate-x-1/2 bottom-[2%] md:bottom-[0%] z-20 opacity-0 pointer-events-auto pb-4"
        >
          <div className="relative drop-shadow-[0_30px_50px_rgba(0,0,0,1)]">
            <img
              src="/assets/images/esther-card.png"
              alt="Esther Player Card"
              className="w-[280px] md:w-[350px] lg:w-[400px] h-auto object-contain"
            />
            {/* Holographic sweep */}
            <div
              className="absolute inset-0 z-20 pointer-events-none"
              style={{
                WebkitMaskImage: `url('/assets/images/esther-card.png')`,
                WebkitMaskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskImage: `url('/assets/images/esther-card.png')`,
                maskSize: 'contain',
                maskRepeat: 'no-repeat',
                maskPosition: 'center'
              }}
            >
              <div className="holo-sweep absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/60 to-transparent mix-blend-overlay" />
            </div>
          </div>
        </div>

      </div>

      </div>
    </>
  );
}
