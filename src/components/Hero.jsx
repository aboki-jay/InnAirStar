import React from 'react';
import { Plus } from 'lucide-react';

const Hero = ({ setMenuOpen }) => {
  return (
    <div id="hero" className="min-h-screen w-full relative overflow-hidden flex flex-col justify-between p-4 md:p-12 bg-[url('/assets/images/homepage-bg.jpg')] bg-cover bg-center bg-no-repeat">
      
      {/* Spacer to maintain flex layout since nav is fixed */}
      <div className="h-16 sm:h-20 md:h-28 w-full shrink-0"></div>

      {/* Hero Title */}
      <div className="flex flex-col items-center justify-center my-auto py-8 z-10 w-full">
        <h1 className="font-display font-black text-white uppercase text-[8vw] sm:text-[10vw] md:text-[120px] leading-[0.85] md:leading-[100px] tracking-normal text-center flex flex-col items-center">
          {/* Row 1 */}
          <div className="whitespace-nowrap flex items-center justify-center tracking-normal">
            <img 
              src="/assets/images/esther-pill-homepage.png" 
              alt="Esther" 
              className="inline-block h-[6vw] sm:h-[8vw] md:h-24 w-auto align-middle mx-1 sm:mx-2 md:mx-4 object-contain"
            />
            <span className="text-white tracking-normal">ESTHER</span>
          </div>
          {/* Row 2 */}
          <div className="whitespace-nowrap mt-1 sm:mt-2 md:mt-4 flex items-center justify-center">
            <span className="text-white font-extralight text-[8vw] sm:text-[10vw] md:text-[120px]">AND</span>
            <span className="text-white tracking-normal ml-2 sm:ml-3 md:ml-6">INNOCENT</span>
            <img 
              src="/assets/images/innocent-pill-homepage.png" 
              alt="Innocent" 
              className="inline-block h-[6vw] sm:h-[8vw] md:h-24 w-auto align-middle mx-1 sm:mx-2 md:mx-4 object-contain"
            />
          </div>
        </h1>
      </div>

      {/* Editorial Footer Layout */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 sm:gap-6 z-10 w-full mt-8 md:mt-0">
        {/* Left Column */}
        <div className="flex flex-col text-white">
          <span className="text-white font-mono uppercase text-sm sm:text-lg md:text-[28px] leading-tight md:leading-[26px]">
            A PERFECT MATCH
          </span>
          <span className="text-white font-script text-xl sm:text-2xl md:text-[50px] md:leading-[47px] drop-shadow-lg">
            1 FIELD, 2 HEARTS AND A PARTNERSHIP 2 4EVA
          </span>
        </div>

        {/* Right Column */}
        <div className="flex flex-col text-white text-left md:text-right w-full md:w-auto mt-4 md:mt-0">
          <span className="text-white font-mono font-bold text-2xl sm:text-3xl md:text-[3rem] md:leading-[2.4375rem] md:tracking-[-0.03rem] uppercase">SATURDAY 21</span>
          <span className="text-white font-mono font-bold text-2xl sm:text-3xl md:text-[3rem] md:leading-[2.4375rem] md:tracking-[-0.03rem] uppercase">NOVEMBER 2026</span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
