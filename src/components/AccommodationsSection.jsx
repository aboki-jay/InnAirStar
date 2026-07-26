// Triggering HMR
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function AccommodationsSection() {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const cardsRef = useRef([]);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
                end: "top 25%",
                scrub: 1,
            }
        });

        // 1. Fade and slide in the header area
        tl.fromTo(headerRef.current, 
            { y: 40, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
        );

        // 2. Staggered reveal for the hotel cards
        tl.fromTo(cardsRef.current, 
            { y: 60, opacity: 0, scale: 0.96 }, 
            { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.2, ease: "power2.out" },
            0.1
        );
    }, { scope: sectionRef });

    return (
        <section 
            id="accommodations"
            ref={sectionRef} 
            className="w-full bg-white py-[7.4375rem] px-6 md:px-[6.25rem] flex justify-center items-center"
        >
            <div className="w-full max-w-7xl mx-auto flex flex-col gap-12">
                
                {/* Header Section */}
                <div 
                    ref={headerRef} 
                    className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-6"
                >
                    <h2 className="font-display font-normal text-black text-[2rem] leading-[2.125rem] tracking-[-0.06rem] md:text-[4rem] md:leading-[4.125rem] md:tracking-[-0.12rem]">
                        Where to Stay
                    </h2>
                    <p className="text-sm md:text-base text-gray-500 max-w-xs text-left md:text-right">
                        Here are our favorite nearby hotels just for our guests. We’d love for everyone to stay close, so grab your spot before rooms fill up!
                    </p>
                </div>

                {/* Cards Grid: Stacked on mobile, 3-column row on desktop */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                    {[
                        {
                            name: "AJ Hotel 1",
                            price: "₦25,000",
                            rating: "4.5",
                            address: "7 Arowojobe Street, off conoil bus stop Igando",
                            image: "/assets/images/hotel-1.jpg"
                        },
                        {
                            name: "Rockville shortlet",
                            price: "₦30,000",
                            rating: "4.5",
                            address: "Tresure close, Hand of Fire Bus stop, Igando Road, Lagos",
                            image: "/assets/images/hotel-2.webp"
                        },
                        {
                            name: "Kabis International Hotel",
                            price: "₦45,000",
                            rating: "4.5",
                            address: "1 Arowojobe street, college bus Igando lasu ojo road",
                            image: "/assets/images/hotel-3.jpg"
                        }
                    ].map((hotel, index) => (
                        <div 
                            key={index}
                            ref={el => cardsRef.current[index] = el}
                            className="flex flex-col items-start rounded-[1.5rem] border border-[#E9EAEC] bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                        >
                            {/* Thumbnail Container */}
                            <div 
                                className="h-[11.75rem] w-full bg-center bg-cover bg-no-repeat bg-[#222327]"
                                style={{ backgroundImage: `url('${hotel.image}')` }}
                            />

                            {/* Card Body */}
                            <div className="flex p-[0.875rem_1rem] flex-col items-start gap-[1rem] w-full bg-white">
                                
                                {/* Title & Price Row */}
                                <div className="w-full flex justify-between items-center">
                                    <h3 className="font-semibold text-black text-lg">{hotel.name}</h3>
                                    <div className="text-right">
                                        <span className="font-bold text-black text-base">{hotel.price}</span>
                                        <span className="text-xs text-gray-400">/night</span>
                                    </div>
                                </div>

                                {/* Rating & Address */}
                                <div className="w-full flex flex-col gap-1">
                                    <div className="flex items-center gap-1.5 text-xs text-gray-600">
                                        <div className="flex text-amber-500">★★★★★</div>
                                        <span className="font-medium text-gray-500">{hotel.rating}</span>
                                    </div>
                                    <p className="text-xs text-gray-400 leading-relaxed">
                                        {hotel.address}
                                    </p>
                                </div>

                                {/* Reservation Button */}
                                <a 
                                    href={`https://wa.me/2348081925198?text=${encodeURIComponent(`Hello Mercy can you make a reservation for ${hotel.name}`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full py-2.5 px-4 rounded-xl border border-[#E9EAEC] text-black font-medium text-sm text-center hover:bg-gray-50 transition active:scale-[0.96] mt-1 block"
                                >
                                    Make a Reservation
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
