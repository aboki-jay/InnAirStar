import React, { useState, useEffect } from 'react';

const TARGET_DATE = new Date('2026-11-21T00:00:00');

export default function CountdownSection() {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const calculateTime = () => {
            const now = new Date();
            const difference = TARGET_DATE - now;

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / (1000 * 60)) % 60);
                const seconds = Math.floor((difference / 1000) % 60);

                setTimeLeft({ days, hours, minutes, seconds });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        calculateTime();
        const timer = setInterval(calculateTime, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <section className="w-full flex items-center justify-center bg-[#FFF] py-16 md:py-0 md:h-[46.875rem] md:px-[2.18519rem] overflow-hidden">
            <div className="w-full max-w-7xl mx-auto flex items-start justify-center gap-1 sm:gap-4 md:gap-[1.80344rem] text-[#1F1C1C]">
                
                {/* Days */}
                <div className="flex flex-col items-center">
                    <span className="tabular-nums font-display font-black text-[12vw] leading-none sm:text-7xl md:text-[10.70794rem] md:leading-[9.13744rem] md:tracking-[-0.22844rem]">
                        {String(timeLeft.days).padStart(2, '0')}
                    </span>
                    <span className="font-display font-black uppercase text-[2.5vw] sm:text-xl md:text-[1.80344rem] md:leading-[2.16413rem] mt-2 md:mt-0 tracking-widest md:tracking-normal">
                        Days
                    </span>
                </div>

                {/* Colon */}
                <span className="font-display font-black text-[12vw] leading-none sm:text-7xl md:text-[10.70794rem] md:leading-[9.13744rem] md:tracking-[-0.22844rem]">
                    :
                </span>

                {/* Hours */}
                <div className="flex flex-col items-center">
                    <span className="tabular-nums font-display font-black text-[12vw] leading-none sm:text-7xl md:text-[10.70794rem] md:leading-[9.13744rem] md:tracking-[-0.22844rem]">
                        {String(timeLeft.hours).padStart(2, '0')}
                    </span>
                    <span className="font-display font-black uppercase text-[2.5vw] sm:text-xl md:text-[1.80344rem] md:leading-[2.16413rem] mt-2 md:mt-0 tracking-widest md:tracking-normal">
                        Hours
                    </span>
                </div>

                {/* Colon */}
                <span className="font-display font-black text-[12vw] leading-none sm:text-7xl md:text-[10.70794rem] md:leading-[9.13744rem] md:tracking-[-0.22844rem]">
                    :
                </span>

                {/* Minutes */}
                <div className="flex flex-col items-center">
                    <span className="font-display font-black text-[12vw] leading-none sm:text-7xl md:text-[10.70794rem] md:leading-[9.13744rem] md:tracking-[-0.22844rem]">
                        {String(timeLeft.minutes).padStart(2, '0')}
                    </span>
                    <span className="font-display font-black uppercase text-[2.5vw] sm:text-xl md:text-[1.80344rem] md:leading-[2.16413rem] mt-2 md:mt-0 tracking-widest md:tracking-normal">
                        Minutes
                    </span>
                </div>

                {/* Colon */}
                <span className="font-display font-black text-[12vw] leading-none sm:text-7xl md:text-[10.70794rem] md:leading-[9.13744rem] md:tracking-[-0.22844rem]">
                    :
                </span>

                {/* Seconds */}
                <div className="flex flex-col items-center">
                    <span className="font-display font-black text-[12vw] leading-none sm:text-7xl md:text-[10.70794rem] md:leading-[9.13744rem] md:tracking-[-0.22844rem]">
                        {String(timeLeft.seconds).padStart(2, '0')}
                    </span>
                    <span className="font-display font-black uppercase text-[2.5vw] sm:text-xl md:text-[1.80344rem] md:leading-[2.16413rem] mt-2 md:mt-0 tracking-widest md:tracking-normal">
                        Seconds
                    </span>
                </div>

            </div>
        </section>
    );
}
