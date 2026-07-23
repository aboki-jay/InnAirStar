import { forwardRef, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const TimelinePath = forwardRef((props, externalRef) => {
    const svgRef = useRef(null);
    const pathRef = useRef(null);

    useGSAP(() => {
        const path = pathRef.current;
        if (!path) return;

        // Delay the ScrollTrigger creation slightly to ensure ScrollSmoother in App.jsx has initialized first!
        const timer = setTimeout(() => {
            const length = path.getTotalLength();
            
            // Initial setup to hide the line completely
            gsap.set(path, {
                strokeDasharray: length,
                strokeDashoffset: length
            });

            // Animate drawing the line on scroll
            gsap.to(path, {
                strokeDashoffset: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: svgRef.current,
                    start: "top center", // start drawing when it enters the viewport
                    end: "bottom 90%", // finish drawing near the bottom
                    scrub: 1, // smooth scrubbing
                }
            });
            
            ScrollTrigger.refresh();
        }, 100);

        return () => clearTimeout(timer);
    }, { scope: svgRef });

    return (
        <svg
            ref={svgRef}
            width="889"
            height="4416"
            viewBox="0 0 889 4416"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[889px] h-full z-0"
            {...props}
        >
            <path
                ref={(node) => {
                    pathRef.current = node;
                    if (typeof externalRef === 'function') {
                        externalRef(node);
                    } else if (externalRef) {
                        externalRef.current = node;
                    }
                }}
                d="M563.289 12.0039C563.289 12.0039 581.716 92.068 563.289 136.004C544.861 179.94 414.759 124.575 293.289 136.004C165.313 148.045 12.7295 172.349 65.2991 260.004C117.869 347.658 245.299 260.004 245.299 260.004C245.299 260.004 423.505 302.742 427.299 390.004C430.849 471.665 272.757 456.528 279.299 538.004C285.374 613.667 233.289 692.004 427.299 664.004C621.308 636.004 811.242 377.061 847.299 512.004C883.356 646.946 706.715 679.101 627.299 794.004C541.238 918.519 227.289 940.004 279.299 1136C331.162 1331.45 14.0452 1275.32 65.2988 1486C116.552 1696.68 660.718 1311.97 765.289 1372C869.859 1432.04 819.839 1528.06 859.299 1642C898.758 1755.95 -50.7111 1936 15.2885 2042C81.2881 2148 189.288 1974 237.289 2078C285.29 2182 182.453 2274.96 237.289 2354C292.125 2433.04 310.365 2353.99 415.299 2354C520.233 2354.01 857.605 2105.73 859.299 2244C860.992 2382.28 508.026 2375.68 433.289 2490C358.553 2604.33 401.434 2719.4 321.289 2830C241.144 2940.6 160.264 3109.55 183.289 3220C206.314 3330.46 253.773 3226.86 363.289 3254C472.805 3281.15 715.289 3044 715.289 3204C715.289 3364 841.298 3134.66 875.299 3204C909.3 3273.35 357.299 3298 677.299 3444C997.299 3590 37.2887 4094 161.289 3708C285.289 3322 213.298 4036 631.299 3966C1049.3 3896 679.637 4055.48 631.299 4168C582.961 4280.53 11.2983 4526 213.299 4246C415.299 3966 543.588 4242.45 601.299 4394C628.815 4466.27 628.815 4519.74 601.299 4592"
                vectorEffect="non-scaling-stroke"
                className="stroke-[48px] md:stroke-[80px]"
                stroke="white"
                strokeLinecap="round"
            />
        </svg>
    );
});

export default TimelinePath;