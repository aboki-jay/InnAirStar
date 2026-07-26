import TimelinePath from './TimelinePath';
import FirstWhistle from './FirstWhistle';
import OpeningPlay from './OpeningPlay';
import TheFinal from './TheFinal';

const RoadToFinal = () => {
    return (
        // The main container needs to be relative and have enough height to contain the SVG.
        // It should also have an id if we are navigating to it via an anchor link in the one-pager menu!
        <section id="our-story" className="relative w-full overflow-hidden bg-[#ADEBB3]"> 
            
            {/* The SVG Path - Positioned absolutely in the background so it flows down the page */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
                <TimelinePath />
            </div>

            {/* The Timeline Components - Stacked on top of the path */}
            {/* We wrap them in a relative container with z-10 so they are clickable and visible over the path */}
            <div className="relative z-10 pt-20 pb-12">
                
                {/* Section Header */}
                <div className="text-center w-full max-w-7xl mx-auto px-4 pt-10">
                    <p className="font-mono tracking-widest text-white/80 uppercase text-sm md:text-xl mb-2">OUR STORY</p>
                    <h2 className="font-display font-black text-[#C467A3] text-5xl md:text-7xl lg:text-8xl tracking-normal uppercase">ROAD TO THE FINAL</h2>
                </div>

                {/* Milestone 1 */}
                <FirstWhistle />

                {/* Milestone 2 */}
                <OpeningPlay />

                {/* Milestone 3 */}
                <TheFinal />

            </div>
            
        </section>
    );
};

export default RoadToFinal;
