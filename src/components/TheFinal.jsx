import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const TheFinal = () => {
    const containerRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);
    const [showHover, setShowHover] = useState(false);

    // Detect mobile and handle the 15-second hover toggle
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (!isMobile) return;
        const interval = setInterval(() => {
            setShowHover(prev => !prev);
        }, 15000);
        return () => clearInterval(interval);
    }, [isMobile]);

    // GSAP ScrollTrigger
    useGSAP(() => {
        const clusters = containerRef.current.querySelectorAll('.tf-cluster');

        const timer = setTimeout(() => {
            gsap.set(clusters, { opacity: 0, y: 50 });

            clusters.forEach((cluster) => {
                gsap.to(cluster, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: cluster,
                        start: "top 85%",
                        end: "bottom top",
                        toggleActions: "play none none reverse",
                    }
                });
            });
            ScrollTrigger.refresh();
        }, 100);

        return () => clearTimeout(timer);
    }, { scope: containerRef });

    // CSS classes for the hover logic
    const defaultOpacityClasses = isMobile ? (showHover ? 'opacity-0' : 'opacity-100') : 'opacity-100 group-hover:opacity-0';
    const hoverOpacityClasses = isMobile ? (showHover ? 'opacity-100' : 'opacity-0') : 'opacity-0 group-hover:opacity-100';

    return (
        <div ref={containerRef} className="relative w-full max-w-6xl mx-auto min-h-[50vh] pt-4 pb-24 md:py-32 px-4 md:px-8 z-10 flex flex-col gap-16 md:h-[1200px] md:block mt-8 md:mt-20 mb-32">

            {/* Main Center Cluster for Polaroids and Text */}
            <div className="tf-cluster relative md:absolute md:top-10 md:left-[10%] w-full md:w-[80%] flex flex-col items-center z-20">
                
                {/* Image Composition */}
                <div className="relative w-full max-w-[800px] aspect-square md:aspect-video flex items-center justify-center">
                    
                    {/* Deco layer (Stickers and Signs) */}
                    <img 
                        src="/assets/images/group-21.png" 
                        alt="Decorations" 
                        className="absolute inset-0 w-full h-full object-contain z-30 pointer-events-none" 
                    />
                    
                    {/* Innocent Card (Left) */}
                    <div className="absolute left-[5%] md:left-[15%] top-[10%] w-[45%] md:w-[35%] group z-20 cursor-pointer -rotate-6 md:-rotate-12">
                        <img 
                            src="/assets/images/innocent-default-state.png"
                            alt="Innocent Default"
                            className={`w-full h-auto transition-opacity duration-1000 ${defaultOpacityClasses}`}
                        />
                        <img 
                            src="/assets/images/innocent-hover-state.png"
                            alt="Innocent Hover"
                            className={`absolute top-0 left-0 w-full h-auto transition-opacity duration-1000 ${hoverOpacityClasses}`}
                        />
                    </div>

                    {/* Esther Card (Right) */}
                    <div className="absolute right-[5%] md:right-[15%] top-[15%] w-[45%] md:w-[35%] group z-20 cursor-pointer rotate-6 md:rotate-12">
                        <img 
                            src="/assets/images/esther-default-state.png"
                            alt="Esther Default"
                            className={`w-full h-auto transition-opacity duration-1000 ${defaultOpacityClasses}`}
                        />
                        <img 
                            src="/assets/images/esther-hover-state.png"
                            alt="Esther Hover"
                            className={`absolute top-0 left-0 w-full h-auto transition-opacity duration-1000 ${hoverOpacityClasses}`}
                        />
                    </div>
                </div>

                <p className="font-helvetica text-lg md:text-2xl text-black leading-relaxed max-w-[600px] mt-6 text-center font-bold uppercase tracking-wider">
                    And now, the final match isn't an ending, it's the beginning of a lifetime league.
                </p>
            </div>

            {/* Title at the bottom of the milestone */}
            <div className="tf-cluster relative md:absolute md:top-[800px] md:left-[10%] text-center md:text-left z-20">
                <h2 className="font-display font-normal text-4xl md:text-6xl text-black/80 leading-none tracking-tight uppercase">
                    THE <br className="hidden md:block" /> FINAL
                </h2>
                <p className="font-mono text-sm md:text-base tracking-widest text-black/50 uppercase mt-4">
                    THE WEDDING
                </p>
            </div>

        </div>
    );
};

export default TheFinal;
