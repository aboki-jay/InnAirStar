import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// 1. Data Structure (15 Images Only)
const galleryImages = Array.from({ length: 15 }, (_, i) => `circle-${i + 1}.jpg`);

const CircularGallery = () => {
    const sectionRef = useRef(null);
    const wheelRef = useRef(null);
    const portraitRef = useRef(null);
    const textRef = useRef(null);

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile(); // Check on initial mount
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useGSAP(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Reset initial states
        gsap.set([wheelRef.current, portraitRef.current], { scale: 0.55, opacity: 0 });
        gsap.set(textRef.current, { opacity: 0 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 60%",
                toggleActions: "play none none none",
            }
        });

        if (prefersReducedMotion) {
            tl.to([wheelRef.current, portraitRef.current, textRef.current], { scale: 1, opacity: 1, duration: 0 });
        } else {
            // 1. Watermark fades in
            tl.to(textRef.current, { opacity: 1, duration: 0.4 });

            // 2. Load-in pop reveal for both the wheel and portrait
            tl.to([wheelRef.current, portraitRef.current], {
                scale: 1,
                opacity: 1,
                duration: 1.1,
                ease: "back.out(1.7)",
                stagger: 0.1
            }, 0.3);

            // 3. Infinite Spin ONLY for the outer wheel
            tl.add(() => {
                gsap.to(wheelRef.current, {
                    rotation: 360,
                    duration: 90,
                    repeat: -1,
                    ease: "none"
                });
            }, "+=0");
        }
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="relative w-full min-h-screen md:min-h-[1100px] py-20 md:py-0 overflow-hidden bg-[#F5F3EF] flex items-center justify-center">

            {/* 2. Background Watermark Layer - Positioned absolutely dead center */}
            <div ref={textRef} className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 overflow-hidden z-0">
                <div className="absolute font-vultures text-[15vw] md:text-[15.625rem] text-[#CECECE] leading-none whitespace-nowrap -rotate-6 select-none flex gap-6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span>innocent</span>
                    <span>and</span>
                    <span>esther</span>
                    <span>#InnyAirstar2026</span>
                </div>
            </div>

            {/* Desktop-Only Bottom Gradient Overlay */}
            <div className="hidden md:block absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#F5F3EF] via-[#F5F3EF]/90 to-transparent z-40 pointer-events-none" />

            {/* 3. Rotating Outer Gallery */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[1000px] md:h-[1000px] z-20 pointer-events-none">
                <div ref={wheelRef} className="relative w-full h-full pointer-events-auto">
                    {galleryImages.map((src, index) => {
                        const totalImages = galleryImages.length;

                        // Trigonometry Math (Responsive radius)
                        const angle = (index * 2 * Math.PI) / totalImages;
                        const radius = isMobile ? 180 : 450;
                        const x = Math.cos(angle) * radius;
                        const y = Math.sin(angle) * radius;

                        return (
                            <img
                                key={`${src}-${index}`}
                                src={`/assets/images/${src}`}
                                alt={`Gallery image ${index + 1}`}
                                className="absolute rounded-[1rem] object-cover shadow-sm transition-transform duration-300 hover:scale-[1.5] cursor-pointer"
                                style={{
                                    width: isMobile ? '60px' : '100px',
                                    height: isMobile ? '60px' : '100px',
                                    left: `calc(50% + ${x}px)`,
                                    top: `calc(50% + ${y}px)`,
                                    transform: 'translate(-50%, -50%)'
                                }}
                            />
                        );
                    })}
                </div>
            </div>

            {/* 4. Static Inner Portrait - Scaled for Vignette focal point */}
            <div ref={portraitRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center z-30">
                {/* Scaled container */}
                <div className="relative group flex items-center justify-center w-[90px] h-[90px] md:w-[130px] md:h-[130px] transition-all duration-300">
                    <img
                        src="/assets/images/inner-circle.png"
                        alt="Center Portrait"
                        className="w-full h-full object-cover rounded-full shadow-2xl"
                    />
                    {/* Vignette Shadow Overlay */}
                    <div className="absolute inset-0 rounded-full shadow-[inset_0_0_15px_rgba(0,0,0,0.3)] pointer-events-none" />
                </div>
                <div className="absolute top-[115%] flex flex-col items-center justify-center mt-4 text-center whitespace-nowrap">
                    <p className="font-helvetica font-bold text-[9px] md:text-xs text-[#4A4A4A] tracking-[0.2em] uppercase">
                        A perfect match
                    </p>
                    <p className="font-vultures text-2xl md:text-5xl text-black mt-1">
                        Inny&amp;airstar
                    </p>
                </div>
            </div>

        </section>
    );
};

export default CircularGallery;