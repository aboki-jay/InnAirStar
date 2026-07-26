import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function MatchDayTransition() {
    const sectionRef = useRef(null);
    const maskRef = useRef(null);
    const textRef = useRef(null);

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

        // 1. Scale up the stamp mask to reveal the full stadium
        tl.to(maskRef.current, {
            "--mask-size": "5000px",
            ease: "power2.inOut",
            duration: 1
        }, 0);

        // 2. Smooth ease-in animation for the live match day typography reveal
        tl.fromTo(textRef.current,
            {
                opacity: 0,
                y: 35,
                scale: 0.96
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                ease: "power2.out"
            },
            "-=0.3"
        );
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="relative h-[300vh] bg-[#F5F3EF]">
            {/* Pinned Container */}
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

                {/* Absolute Centering Wrapper with Drop Shadow */}
                <div
                    className="absolute inset-0 flex items-center justify-center z-10"
                    style={{
                        filter: "drop-shadow(0px 20px 30px rgba(0, 0, 0, 0.25)) drop-shadow(0px 8px 12px rgba(0, 0, 0, 0.15)) drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.1))"
                    }}
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
                            "--mask-size": "280px"
                        }}
                    />
                </div>

                {/* Live Typography Overlay with Shifted Padding & Contrast Drop Shadow */}
                <div
                    ref={textRef}
                    className="absolute inset-0 flex flex-col justify-start items-start pt-[55%] sm:pt-[50%] md:pt-[22%] pl-[8%] md:pl-[12%] opacity-0 pointer-events-none z-20 select-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.25)]"
                >
                    {/* MATCH DAY Text */}
                    <h1
                        className="font-helvetica-cnblk text-[#ADEBB3] uppercase leading-[0.80] text-[4.5rem] sm:text-[7.5rem] md:text-[12.5rem]"
                        style={{
                            letterSpacing: '10%'
                        }}
                    >
                        MATCH<br />DAY
                    </h1>

                    {/* Date and Time Text */}
                    <p
                        className="font-reddit-mono text-black mt-2 text-[1.1rem] sm:text-[1.6rem] md:text-[2.5rem]"
                        style={{
                            letterSpacing: '-8%'
                        }}
                    >
                        21 NOV 2026 | 11:00 AM
                    </p>
                </div>

            </div>
        </section>
    );
}