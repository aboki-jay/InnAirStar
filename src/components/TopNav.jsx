import React from 'react';
import { Plus } from 'lucide-react';

const TopNav = ({ setMenuOpen }) => {
  return (
    <div className="fixed top-0 left-0 right-0 flex justify-between items-start z-[60] w-full p-4 md:p-12 pointer-events-none">
      <img 
        src="/assets/svgs/top-navigation.svg" 
        alt="Top Navigation" 
        className="h-16 sm:h-20 md:h-28 w-auto object-contain pointer-events-auto drop-shadow-md" 
      />
      <button 
        onClick={() => setMenuOpen(true)}
        className="flex items-center justify-center text-white font-display font-extrabold uppercase bg-black/40 border border-white px-3 py-1.5 gap-2 text-sm sm:text-lg md:px-[16px] md:py-[12px] md:gap-[12px] rounded-full md:text-[34px] md:leading-[30px] backdrop-blur-md hover:bg-white hover:text-black transition-all shrink-0 pointer-events-auto"
      >
        <span>MENU</span>
        <Plus className="w-4 h-4 sm:w-5 sm:h-5 md:w-[34px] md:h-[34px]" strokeWidth={3} />
      </button>
    </div>
  );
};

export default TopNav;
