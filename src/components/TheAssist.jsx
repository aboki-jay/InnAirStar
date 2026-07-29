import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const TheAssist = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        const clusters = containerRef.current.querySelectorAll('.ta-cluster');

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

            {/* Cluster 1: Player (Left Side) */}
            <div className="ta-cluster relative md:absolute md:top-10 md:left-[10%] flex flex-col items-center md:items-start z-20">
                <div className="relative w-[85vw] max-w-[22rem] md:w-[22rem]">
                    <img
                        src="/assets/images/group-15.png"
                        alt="Football Player Celebrating"
                        className="w-full h-auto object-contain"
                    />
                </div>
                <p className="font-helvetica text-lg md:text-xl text-black leading-relaxed max-w-[280px] mt-4 text-center md:text-left font-medium">
                    Sometimes, in football and in life, you need an assist.
                </p>
            </div>

            {/* Cluster 2: NCCF (Center) */}
            <div className="ta-cluster relative md:absolute md:top-[600px] md:left-[35%] flex flex-col items-center md:items-start z-20">
                <div className="relative w-[85vw] max-w-[22rem] md:w-[22rem]">
                    <img
                        src="/assets/images/group-16.png"
                        alt="NCCF Logo and Church"
                        className="w-full h-auto object-contain"
                    />
                </div>
                <p className="font-helvetica text-lg md:text-xl text-black leading-relaxed max-w-[350px] mt-4 md:absolute md:-top-32 md:-right-10 text-center md:text-left font-medium">
                    One day, Esther came to charge her phone at the NCCF house. At the same time, a key player entered the game. He mentioned casually:<br />
                    "There's a new corper in your school... you should come meet her."
                </p>
            </div>

            {/* Cluster 3: Goal (Right Bottom) */}
            <div className="ta-cluster relative md:absolute md:top-[1100px] md:right-[5%] flex flex-col items-center md:items-start z-20">
                <div className="relative w-[85vw] max-w-[22rem] md:w-[22rem]">
                    <img
                        src="/assets/images/group-17.png"
                        alt="Football Goal"
                        className="w-full h-auto object-contain"
                    />
                </div>
                <p className="font-helvetica text-lg md:text-xl text-black leading-relaxed max-w-[320px] mt-4 md:absolute md:-bottom-24 md:-left-10 text-center md:text-left font-medium">
                    That introduction became the perfect assist. From that day, the ball never left their possession.
                </p>
            </div>



        </div>
    );
};

export default TheAssist;
