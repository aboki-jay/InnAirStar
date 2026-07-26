import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const TheWinningGoal = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        const clusters = containerRef.current.querySelectorAll('.twg-cluster');

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

    return (
        <div ref={containerRef} className="relative w-full max-w-6xl mx-auto min-h-screen py-24 md:py-32 px-4 md:px-8 z-10 flex flex-col gap-16 md:h-[1800px] md:block mt-20">

            {/* Cluster 1: Tactic Board (Center Top) */}
            <div className="twg-cluster relative md:absolute md:top-10 md:left-[45%] flex flex-col items-center z-20">
                <div className="relative w-[85vw] max-w-[22rem] md:w-[22rem]">
                    <img
                        src="/assets/images/group-19.png"
                        alt="Tactic Board"
                        className="w-full h-auto object-contain"
                    />
                </div>
            </div>

            {/* Cluster 2: Contract/Signature (Left Middle) */}
            <div className="twg-cluster relative md:absolute md:top-[300px] md:left-[10%] flex flex-col items-center md:items-start z-20">
                <p className="font-helvetica text-lg md:text-xl text-black leading-relaxed max-w-[320px] mb-4 text-center md:text-left font-medium">
                    No grand surprise. No dramatic stadium roar. Just something even more powerful. Agreement.<br /><br />
                    "We've waited. We're ready."<br /><br />
                    That mutual "yes" was the winning goal. Calm, certain, and unstoppable.
                </p>
                <div className="relative w-[85vw] max-w-[22rem] md:w-[22rem]">
                    <img
                        src="/assets/images/group-18.png"
                        alt="Signature Contract"
                        className="w-full h-auto object-contain"
                    />
                </div>
            </div>

            {/* Cluster 3: Players (Right Bottom) */}
            <div className="twg-cluster relative md:absolute md:top-[900px] md:right-[5%] flex flex-col items-center md:items-start z-20">
                <p className="font-helvetica text-lg md:text-xl text-black leading-relaxed max-w-[280px] mb-4 text-center md:text-left font-medium">
                    Great teams don't rush the final shot. They build patiently.
                </p>
                <div className="relative w-[85vw] max-w-[22rem] md:w-[22rem]">
                    <img
                        src="/assets/images/group-20.png"
                        alt="Players Building Up"
                        className="w-full h-auto object-contain"
                    />
                </div>
            </div>

            {/* Title at the bottom of the milestone */}
            <div className="twg-cluster relative md:absolute md:top-[1600px] md:left-[10%] text-center md:text-left z-20">
                <h2 className="font-display font-normal text-4xl md:text-6xl text-black/80 leading-none tracking-tight uppercase">
                    THE <br className="hidden md:block" /> WINNING GOAL
                </h2>
                <p className="font-mono text-sm md:text-base tracking-widest text-black/50 uppercase mt-4">
                    THE PROPOSAL
                </p>
            </div>

        </div>
    );
};

export default TheWinningGoal;
