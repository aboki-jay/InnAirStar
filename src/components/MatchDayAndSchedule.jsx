import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function MatchDayAndSchedule() {
    const sectionRef = useRef(null);
    const maskRef = useRef(null);
    const matchDayRef = useRef(null);
    const scheduleRef = useRef(null);
    const cardsRef = useRef([]);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "+=1500", // Tightened scroll distance to eliminate dead space
                scrub: 1,
                pin: true,
                anticipatePin: 1
            }
        });

        // 1. Stamp expansion (Happens immediately on scroll start)
        tl.to(maskRef.current, {
            "--mask-size": "5000px",
            ease: "power2.inOut",
            duration: 0.8
        }, 0);

        // 2. Match Day text entry
        tl.fromTo(matchDayRef.current,
            { opacity: 0, y: 25, scale: 0.98 },
            { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power2.out" },
            0.2
        );

        // 3. Quick transition: Fade out Match Day & Fade in Schedule cards seamlessly over the same background
        tl.to(matchDayRef.current, {
            opacity: 0,
            y: -20,
            duration: 0.3,
            ease: "power2.in"
        }, 0.9);

        tl.fromTo(scheduleRef.current,
            { opacity: 0, pointerEvents: "none" },
            { opacity: 1, pointerEvents: "auto", duration: 0.3 },
            1.1
        );

        tl.fromTo(cardsRef.current,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" },
            1.1
        );

    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="relative h-screen w-full bg-[#F5F3EF] overflow-hidden">
            <div className="absolute inset-0 h-full w-full flex items-center justify-center overflow-hidden">

                {/* Persistent Stadium Background with Stamp Mask */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
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
                            "--mask-size": "280px"
                        }}
                    />
                </div>

                {/* Layer 1: Match Day Typography */}
                <div
                    ref={matchDayRef}
                    className="absolute inset-0 flex flex-col justify-start items-start pt-[55%] sm:pt-[18%] md:pt-[12%] pl-[8%] md:pl-[12%] opacity-0 z-20 select-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.25)] pointer-events-none"
                >
                    <h1 className="font-helvetica-cnblk text-[#ADEBB3] uppercase leading-none text-[4.5rem] sm:text-[7.5rem] md:text-[12.5rem]" style={{ letterSpacing: '10%' }}>
                        MATCH<br />DAY
                    </h1>
                    <p className="font-reddit-mono text-black mt-2 text-[1.1rem] sm:text-[1.6rem] md:text-[2.5rem]" style={{ letterSpacing: '-8%' }}>
                        21 NOV 2026 | 11:00 AM
                    </p>
                </div>

                {/* Layer 2: Schedule Cards Overlay */}
                <div
                    ref={scheduleRef}
                    className="absolute inset-0 flex flex-col items-center justify-center px-6 md:px-12 opacity-0 z-30 pointer-events-none"
                >
                    <div className="flex flex-col items-start w-fit">
                        <h2 className="font-display font-normal text-black mb-10 text-[2.375rem] leading-[2.875rem] tracking-[-0.07125rem] md:text-[64px] md:leading-[66px] md:tracking-[-1.92px]">
                            Schedule
                        </h2>
                        <div className="flex flex-col md:flex-row items-start justify-start gap-6 w-full max-w-6xl">
                            {[
                                { title: "Church Wedding", time: "11:00 AM", tagType: "Church venue", address: "Foursquare church, 15 Majeobaje street, Igando, Lagos.", accentColor: "#ADEBB3" },
                                { title: "Engagement", time: "1:00 PM", tagType: "Engagement venue", address: "Imperial event place, KM10, Lasu-Igando Road, O'Mark Bus stop, Igando, Lagos.", accentColor: "#E8A2C1" },
                                { title: "Reception", time: "2:30 PM", tagType: "Reception venue", address: "Reception follows immediately in the same venue.", accentColor: "#E8A2C1" }
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    ref={el => cardsRef.current[index] = el}
                                    className="w-full max-w-[333px] p-[12px] flex flex-col items-start gap-[10px] rounded-[16px] border border-dashed border-[#DEDFE3] bg-white shadow-[0_4px_8px_0_rgba(25,24,27,0.08)]"
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
                                        <p className="text-sm text-black font-normal leading-snug">{item.address}</p>
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