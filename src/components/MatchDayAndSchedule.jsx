import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function MatchDayAndSchedule() {
    const sectionRef = useRef(null);
    
    // Match Day Refs
    const maskRef = useRef(null);
    const matchDayTextRef = useRef(null);
    
    // Schedule Refs
    const scheduleOverlayRef = useRef(null);
    const scheduleHeadingRef = useRef(null);
    const scheduleCardsRef = useRef([]);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "bottom bottom",
                scrub: 1, 
                pin: true,
            }
        });

        // --- PHASE 1: MATCH DAY TRANSITION ---

        // 1. Scale up the stamp mask to reveal the full stadium
        tl.to(maskRef.current, {
            "--mask-size": "5000px",
            ease: "power2.inOut",
            duration: 1
        }, 0);

        // 2. Smooth ease-in animation for the live match day typography reveal
        tl.fromTo(matchDayTextRef.current,
            { opacity: 0, y: 35, scale: 0.96 },
            { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power2.out" },
            0.6
        );

        // --- PHASE 2: SEAMLESS TRANSITION TO SCHEDULE ---

        // 3. Fade out Match Day text
        tl.to(matchDayTextRef.current, {
            opacity: 0,
            y: -35,
            duration: 0.5,
            ease: "power2.in"
        }, 1.8);

        // 4. Fade in the Schedule soft overlay
        tl.to(scheduleOverlayRef.current, {
            opacity: 1,
            duration: 0.5,
            ease: "power2.inOut"
        }, 1.8);

        // 5. Fade and slide in the Schedule heading
        tl.fromTo(scheduleHeadingRef.current, 
            { y: 50, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
            2.1
        );

        // 6. Staggered slide and fade in for the schedule cards
        tl.fromTo(scheduleCardsRef.current, 
            { y: 80, opacity: 0, scale: 0.95 }, 
            { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: "power2.out" },
            2.3
        );
        
        // Add a small buffer at the end of the timeline so it doesn't immediately unpin
        tl.to({}, { duration: 0.5 });
        
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="relative h-[600vh] bg-[#F5F3EF]">
            {/* Single Pinned Container */}
            <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
                
                {/* 1. MATCH DAY BACKGROUND & MASK */}
                <div
                    className="absolute inset-0 flex items-center justify-center z-10 max-md:drop-shadow-none drop-shadow-stamp"
                >
                    <div
                        ref={maskRef}
                        className="w-full h-full bg-center bg-cover bg-no-repeat bg-white"
                        style={{
                            backgroundImage: "url('/assets/images/match-stadium-bg.jpg')",
                            WebkitMaskImage: "url('/assets/svgs/stamp-mask.svg')",
                            maskImage: "url('/assets/svgs/stamp-mask.svg')",
                            WebkitMaskPosition: "center",
                            maskPosition: "center",
                            WebkitMaskRepeat: "no-repeat",
                            maskRepeat: "no-repeat",
                            WebkitMaskSize: "var(--mask-size, 280px)",
                            maskSize: "var(--mask-size, 280px)",
                            "--mask-size": "280px",
                            willChange: "mask-size, -webkit-mask-size, transform"
                        }}
                    />
                </div>

                {/* 2. MATCH DAY TYPOGRAPHY */}
                <div
                    ref={matchDayTextRef}
                    className="absolute inset-0 flex flex-col justify-start items-start pt-[55%] sm:pt-[50%] md:pt-[22%] pl-[8%] md:pl-[12%] opacity-0 pointer-events-none z-20 select-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.25)]"
                >
                    <h1
                        className="font-helvetica-cnblk text-[#ADEBB3] uppercase leading-[0.80] text-[4.5rem] sm:text-[7.5rem] md:text-[12.5rem]"
                        style={{ letterSpacing: '10%' }}
                    >
                        MATCH<br />DAY
                    </h1>
                    <p
                        className="font-reddit-mono text-black mt-2 text-[1.1rem] sm:text-[1.6rem] md:text-[2.5rem]"
                        style={{ letterSpacing: '-8%' }}
                    >
                        21 NOV 2026 | 11:00 AM
                    </p>
                </div>

                {/* 3. SCHEDULE OVERLAY & CONTENT */}
                <div 
                    ref={scheduleOverlayRef}
                    className="absolute inset-0 bg-white/40 backdrop-blur-[1px] z-30 opacity-0 pointer-events-none" 
                />

                <div className="relative z-40 w-full max-w-6xl mx-auto flex flex-col items-center px-6 md:px-12 pointer-events-none">
                    <div className="flex flex-col items-start w-fit">
                        <h2 
                            ref={scheduleHeadingRef} 
                            className="font-display font-normal text-black mb-10 text-[2.375rem] leading-[2.875rem] tracking-[-0.07125rem] md:text-[64px] md:leading-[66px] md:tracking-[-1.92px] opacity-0"
                        >
                            Schedule
                        </h2>

                        <div className="flex flex-col md:flex-row items-start justify-start gap-6 w-full">
                        {[
                            {
                                title: "Church Wedding",
                                time: "11:00 AM",
                                tagType: "Church venue",
                                address: "Foursquare church, 15 Majeobaje street, Igando, Lagos.",
                                accentColor: "#ADEBB3"
                            },
                            {
                                title: "Engagement",
                                time: "1:00 PM",
                                tagType: "Engagement venue",
                                address: "Imperial event place, KM10, Lasu-Igando Road, O'Mark Bus stop, Igando, Lagos.",
                                accentColor: "#E8A2C1"
                            },
                            {
                                title: "Reception",
                                time: "2:30 PM",
                                tagType: "Reception venue",
                                address: "Reception follows immediately in the same venue.",
                                accentColor: "#E8A2C1"
                            }
                        ].map((item, index) => (
                            <div 
                                key={index}
                                ref={el => scheduleCardsRef.current[index] = el}
                                className="w-full max-w-[333px] p-[12px] flex flex-col items-start gap-[10px] rounded-[16px] border border-dashed border-[#DEDFE3] bg-white shadow-[0_4px_8px_0_rgba(25,24,27,0.08)] opacity-0 pointer-events-auto"
                            >
                                <div className="w-full flex justify-between items-center text-sm text-gray-500 border-b border-gray-100 pb-2">
                                    <span className="font-medium text-black">{item.title}</span>
                                    <span className="font-semibold text-black">{item.time}</span>
                                </div>
                                <div className="w-full flex flex-col gap-1">
                                    <div className="flex items-center gap-2">
                                        <div className="w-1 h-3 rounded-full" style={{ backgroundColor: item.accentColor }} />
                                        <span className="text-xs text-gray-400 uppercase tracking-wider">{item.tagType}</span>
                                    </div>
                                    <p className="text-sm text-black font-normal leading-snug">
                                        {item.address}
                                    </p>
                                </div>
                            </div>
                        ))}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
