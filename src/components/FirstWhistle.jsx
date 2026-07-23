import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const FirstWhistle = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        const clusters = containerRef.current.querySelectorAll('.fw-cluster');

        // Delay slightly to ensure ScrollSmoother is active before ScrollTriggers are computed
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
                        start: "top 85%", // Trigger when the top of the cluster hits 85% of the viewport (closer to bottom)
                        end: "bottom 15%", // Trigger leave when bottom of cluster leaves the top 15%
                        toggleActions: "play reverse play reverse",
                    }
                });
            });
            ScrollTrigger.refresh();
        }, 100);

        return () => clearTimeout(timer);
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="relative w-full max-w-6xl mx-auto min-h-screen py-24 md:py-32 px-4 md:px-8 z-10 flex flex-col gap-32 md:h-[1700px] md:block">

            {/* Cluster 1 (Left Side) */}
            <div className="fw-cluster relative md:absolute md:top-48 md:left-[10%] flex flex-col items-center md:items-start z-20">
                <div className="relative w-[85vw] max-w-[22rem] md:w-[22rem]">
                    <img
                        src="/assets/images/group-9.png"
                        alt="NYSC Camp"
                        className="w-full h-auto object-contain"
                    />
                </div>
                <p className="font-script text-xl md:text-2xl text-black leading-tight max-w-[280px] mt-4 text-center md:text-left">
                    AS CORPS MEMBERS, WE STEPPED ONTO THE SAME FIELD OF LIFE, UNAWARE THAT FATE HAD SCHEDULED THE MOST BEAUTIFUL GAME OF ALL, US.
                </p>
            </div>

            {/* Cluster 2 (Center) */}
            <div className="fw-cluster relative md:absolute md:top-[600px] md:left-[45%] flex flex-col items-center md:items-start z-20">
                <p className="font-script text-xl md:text-2xl text-black leading-tight max-w-[320px] mb-4 md:absolute md:-top-16 md:-left-16 md:w-[350px] text-center md:text-left">
                    AMONG CROWDS AND ROUTINES, TWO PATHS SLOWLY ALIGNED. IT DIDN'T FEEL LIKE MUCH AT FIRST, JUST ANOTHER PLAYER ON THE PITCH — BUT DESTINY HAD ALREADY MARKED US FOR THE SAME TEAM.
                </p>
                <div className="relative w-[80vw] max-w-[20rem] md:w-80">
                    <img
                        src="/assets/images/group-10.png"
                        alt="Boots"
                        className="w-full h-auto object-contain"
                    />
                </div>
            </div>

            {/* Cluster 3 (Bottom Right) */}
            <div className="fw-cluster relative md:absolute md:top-[1100px] md:right-[5%] flex flex-col items-center md:items-start z-20">
                <div className="relative w-[85vw] max-w-[22rem] md:w-[22rem]">
                    <img
                        src="/assets/images/group-11.png"
                        alt="Town Landscape"
                        className="w-full h-auto object-contain"
                    />
                </div>
                <p className="font-script text-xl md:text-2xl text-black leading-tight max-w-[280px] mt-4 md:absolute md:-bottom-16 md:right-0 md:text-right text-center">
                    EVERY GREAT MATCH BEGINS WITH A WHISTLE... AND OURS SOUNDED IN 2019, IN THE QUIET TOWN OF T AS CORPS MEMBERS.
                </p>
            </div>

            {/* Title at the bottom of the milestone */}
            <div className="fw-cluster relative md:absolute md:top-[1450px] md:left-[10%] text-center md:text-left z-20">
                <h2 className="font-display font-normal text-4xl md:text-6xl text-black/80 leading-none tracking-tight uppercase">
                    FIRST <br className="hidden md:block" /> WHISTLE
                </h2>
                <p className="font-mono text-sm md:text-base tracking-widest text-black/50 uppercase mt-4">
                    HOW WE FIRST MET
                </p>
            </div>

        </div>
    );
};

export default FirstWhistle;
