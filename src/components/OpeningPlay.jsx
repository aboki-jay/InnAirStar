import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const OpeningPlay = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        const clusters = containerRef.current.querySelectorAll('.op-cluster');

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
                        end: "bottom 15%",
                        toggleActions: "play reverse play reverse",
                    }
                });
            });
            ScrollTrigger.refresh();
        }, 100);

        return () => clearTimeout(timer);
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="relative w-full max-w-6xl mx-auto min-h-screen py-24 md:py-32 px-4 md:px-8 z-10 flex flex-col gap-32 md:h-[1800px] md:block mt-20">

            {/* Cluster 1: Soccer Field (Center Top) */}
            <div className="op-cluster relative md:absolute md:top-10 md:left-[35%] flex flex-col items-center z-20">
                <div className="relative w-[85vw] max-w-[22rem] md:w-[22rem]">
                    <img
                        src="/assets/images/group-12.png"
                        alt="Soccer Field"
                        className="w-full h-auto object-contain"
                    />
                </div>
                <p className="font-script text-xl md:text-2xl text-black leading-tight max-w-[320px] mt-4 text-center">
                    THE GAME TRULY KICKED OFF IN THE MOST UNEXPECTED WAY. ESTHER NEEDED A DOCUMENT... AND CALLED OUT "INNOCENT'S NAME" IN A GROUP CHAT THAT RARELY SAW HIS PRESENCE.
                </p>
            </div>

            {/* Cluster 2: WhatsApp (Left Middle) */}
            <div className="op-cluster relative md:absolute md:top-[600px] md:left-[5%] flex flex-col items-center md:items-start z-20">
                <p className="font-script text-xl md:text-2xl text-black leading-tight max-w-[300px] mb-4 md:absolute md:-top-24 md:-left-10 text-center md:text-left">
                    CURIOUS, HE MADE A MOVE — A QUIET DM:<br />
                    "WHY ARE YOU SCREAMING MY NAME LIKE THAT?"
                </p>
                <div className="relative w-[85vw] max-w-[22rem] md:w-[22rem]">
                    <img
                        src="/assets/images/group-13.png"
                        alt="WhatsApp DM"
                        className="w-full h-auto object-contain"
                    />
                </div>
            </div>

            {/* Cluster 3: Chat Bubbles (Right Bottom) */}
            <div className="op-cluster relative md:absolute md:top-[1100px] md:right-[5%] flex flex-col items-center md:items-start z-20">
                <p className="font-script text-xl md:text-2xl text-black leading-tight max-w-[350px] mb-4 md:absolute md:-top-48 md:-left-20 text-center md:text-left">
                    THAT SIMPLE MOMENT BECAME THE FIRST PASS OF A LONG, BEAUTIFUL PLAY. MESSAGES TURNED INTO CONVERSATIONS. CONVERSATIONS TURNED INTO FRIENDSHIP. AND BEFORE LONG, TWO INDIVIDUALS REALIZED THEY WEREN'T JUST PLAYING ON THE SAME FIELD, THEY WERE BUILDING A TEAM.
                </p>
                <div className="relative w-[85vw] max-w-[22rem] md:w-[22rem]">
                    <img
                        src="/assets/images/group-14.png"
                        alt="Chat Bubbles"
                        className="w-full h-auto object-contain"
                    />
                </div>
            </div>

            {/* Title at the bottom of the milestone */}
            <div className="op-cluster relative md:absolute md:top-[1600px] md:left-[5%] text-center md:text-left z-20">
                <h2 className="font-display font-normal text-4xl md:text-6xl text-black/80 leading-none tracking-tight uppercase">
                    OPENING <br className="hidden md:block" /> PLAY
                </h2>
                <p className="font-mono text-sm md:text-base tracking-widest text-black/50 uppercase mt-4">
                    HOW IT ALL STARTED
                </p>
            </div>

        </div>
    );
};

export default OpeningPlay;
