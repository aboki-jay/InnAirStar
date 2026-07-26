import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function ScheduleSection() {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);
    const headingRef = useRef(null);
    const cardsRef = useRef([]);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "bottom bottom",
                scrub: 1, // Smoothly ties the animation directly to the user's scroll
                pin: true, // Pins the section so the background stays locked while cards transition in
            }
        });

        // 1. Fade and slide in the heading
        tl.fromTo(headingRef.current, 
            { y: 50, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
            0
        );

        // 2. Staggered slide and fade in for the schedule cards
        tl.fromTo(cardsRef.current, 
            { y: 80, opacity: 0, scale: 0.95 }, 
            { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: "power2.out" },
            0.1
        );
    }, { scope: sectionRef });

    return (
        <section 
            ref={sectionRef} 
            className="relative w-full h-[300vh] bg-[#F5F3EF]"
        >
            {/* Sticky Pinned Viewport Container */}
            <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-center bg-cover bg-no-repeat px-6 md:px-12"
                 style={{ backgroundImage: "url('/assets/images/match-stadium-bg.jpg')" }}
            >
                {/* Optional soft overlay to ensure crisp contrast against the bright sky */}
                <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] z-0" />

                {/* Content Wrapper */}
                <div ref={contentRef} className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center">
                    
                    {/* Section Heading */}
                    <h2 
                        ref={headingRef} 
                        className="font-display font-normal text-black mb-10 text-[2.375rem] leading-[2.875rem] tracking-[-0.07125rem] md:text-[64px] md:leading-[66px] md:tracking-[-1.92px]"
                    >
                        Schedule
                    </h2>

                    {/* Cards Container: Stacked on mobile, horizontal row on desktop */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full">
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
                                ref={el => cardsRef.current[index] = el}
                                className="w-full max-w-[333px] p-[12px] flex flex-col items-start gap-[10px] rounded-[16px] border border-dashed border-[#DEDFE3] bg-white shadow-[0_4px_8px_0_rgba(25,24,27,0.08)]"
                            >
                                {/* Card Header: Title & Time */}
                                <div className="w-full flex justify-between items-center text-sm text-gray-500 border-b border-gray-100 pb-2">
                                    <span className="font-medium text-black">{item.title}</span>
                                    <span className="font-semibold text-black">{item.time}</span>
                                </div>

                                {/* Card Body with Accent Indicator */}
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
        </section>
    );
}
