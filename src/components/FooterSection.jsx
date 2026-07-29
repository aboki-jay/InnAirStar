export default function FooterSection() {
    return (
        <footer 
            className="relative w-full flex flex-col justify-end items-center bg-cover bg-center text-center overflow-hidden pt-[13.625rem] pr-[0.8125rem] pb-[1rem] pl-[0.75rem] md:pt-[10.625rem] md:px-[2.8125rem] md:pb-[0.875rem]"
            style={{ backgroundImage: "url('/assets/images/footer-grass-bg.png')" }}
        >
            {/* Dark Overlay for Optimal Text Contrast */}
            <div className="absolute inset-0 bg-[#111111] opacity-[0.07] md:opacity-20 pointer-events-none" />

            {/* Main Thank You Typography */}
            <div className="w-full max-w-[84.375rem] mx-auto flex flex-col items-center justify-center gap-2 z-10 flex-shrink-0">
                <h2 className="font-helvetica font-black text-[#33CC66] uppercase text-[14vw] leading-[0.95] sm:text-[5.26313rem] sm:leading-[0.9] tracking-tight md:text-[14.26313rem] md:leading-none md:tracking-[-0.14263rem] flex flex-col items-center">
                    <span className="whitespace-nowrap">THANK YOU</span>
                    <span className="whitespace-nowrap">FOR BEING</span>
                </h2>
                <span className="font-script text-[#F881A9] text-center text-[10.5vw] leading-none sm:text-[5.51313rem] sm:leading-[4.9375rem] tracking-tight md:text-[11.76313rem] md:leading-none md:tracking-[-0.11763rem] whitespace-nowrap mt-1 md:mt-2">
                    A PART OF OUR STORY
                </span>
            </div>

            {/* Subtle Sign-off Banner */}
            <div className="w-full text-center z-10 pt-16 md:pt-12 pb-2">
                <p className="text-xs md:text-sm text-white/90 font-medium flex items-center justify-center gap-1.5 flex-wrap drop-shadow-sm">
                    <span>With love and light ❤️💡 Dave-O</span>
                    <span className="text-white/60">•</span>
                    <a 
                        href="https://twitter.com/abokui" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="font-semibold underline hover:text-[#F881A9] transition-colors"
                    >
                        @abokui
                    </a>
                </p>
            </div>
        </footer>
    );
}
