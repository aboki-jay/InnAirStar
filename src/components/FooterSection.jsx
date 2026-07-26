import React from 'react';

export default function FooterSection() {
    return (
        <footer className="relative w-full flex flex-col items-center justify-center overflow-hidden bg-[#FDC4D7] p-4 md:p-12 lg:p-24 min-h-[50vh]">
            
            {/* Unified SVG Background & Content Wrapper */}
            <div className="relative w-full max-w-6xl mx-auto flex items-center justify-center">
                
                {/* Scalable Pitch & Frame Vector */}
                <img 
                    src="/assets/svgs/icon.svg" 
                    alt="Football Pitch Diagram" 
                    className="w-full h-auto drop-shadow-sm pointer-events-none"
                />

                {/* Absolutely Positioned Content Overlay */}
                <div className="absolute top-0 md:top-[2%] pt-[2%] w-[90%] flex flex-col items-center text-center z-10">
                    
                    {/* Handwritten Date Badge */}
                    <div className="w-full flex justify-start sm:justify-center sm:-ml-[20%] md:-ml-[25%] lg:-ml-[28%] mb-1 md:mb-0 lg:mb-2">
                        <span className="font-script text-[#FC4582] text-[4.5vw] sm:text-[3.5vw] md:text-[3rem] lg:text-[5rem] leading-none font-normal transform -rotate-2 tracking-wide uppercase">
                            November 21, 2026
                        </span>
                    </div>

                    {/* Main Thank You Headline */}
                    <h2 className="font-helvetica font-bold text-[#66997F] text-center uppercase text-[8vw] md:text-[7.5rem] leading-[1.38] md:leading-[10.4rem] w-full max-w-7xl -mt-1 md:-mt-4 lg:-mt-6">
                        THANK YOU FOR BEING A PART OF OUR STORY.
                    </h2>
                </div>

            </div>

            {/* Tiny Sign-off Banner */}
            <div className="w-full text-center mt-6 md:mt-12 pb-2 md:pb-0 z-10">
                <p className="text-sm md:text-base text-[#1A2E22] font-medium flex items-center justify-center gap-1.5 flex-wrap">
                    <span>With love and light ❤️💡 Dave-O</span>
                    <span className="text-[#1A2E22] opacity-40">•</span>
                    <a 
                        href="https://twitter.com/abokui" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="font-bold underline decoration-2 decoration-[#1A2E22]/30 hover:decoration-[#FC4582] hover:text-[#FC4582] transition-colors active:scale-[0.96] inline-block"
                    >
                        @abokui
                    </a>
                </p>
            </div>

        </footer>
    );
}
