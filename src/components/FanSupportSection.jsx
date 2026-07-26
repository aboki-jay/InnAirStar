import React, { useState } from 'react';

export default function FanSupportSection() {
    const [copiedIndex, setCopiedIndex] = useState(null);

    const handleCopy = (accountNumber, index) => {
        navigator.clipboard.writeText(accountNumber);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    const accounts = [
        {
            name: "Okochikwu Innocent",
            bank: "GT Bank",
            type: "USD",
            number: "0623524290"
        },
        {
            name: "Asojo Esther",
            bank: "Access Bank",
            type: "Naira",
            number: "0696585724"
        }
    ];

    return (
        <section id="fan-support" className="relative w-full min-h-screen bg-[#FDFBF7] md:bg-[#FCF6F0] py-16 px-6 md:px-0 flex items-center justify-center overflow-hidden">
            <div 
                className="relative w-full max-w-5xl md:max-w-[77.5rem] md:aspect-[31/23] md:rounded-[2rem] md:bg-[#FCF6F0] flex flex-col md:flex-row items-center justify-between md:justify-end py-8 md:py-0 md:pr-[8rem] bg-none md:bg-[url('/assets/images/transfer-gift-bg.png')] bg-contain bg-no-repeat bg-center md:overflow-hidden mx-auto"
            >
                {/* Content Container */}
                <div className="w-full md:w-[38.125rem] flex flex-col items-start md:items-end gap-8 md:gap-[0.75rem] z-10 bg-transparent p-0">
                    
                    {/* Header Copy */}
                    <div className="flex flex-col items-start md:items-end gap-4 md:gap-[0.75rem] w-full md:pb-12">
                        <h2 className="text-[#26483E] text-[1.97619rem] leading-[1.97619rem] tracking-[-0.01975rem] font-display font-normal text-left md:text-right md:text-[3rem] md:leading-[3rem] md:tracking-[-0.03rem] self-stretch">
                            The &apos;transfer&apos; window is officially open!
                        </h2>
                        <p className="text-[#26272C] text-[0.65875rem] leading-[0.98813rem] tracking-[-0.00656rem] font-display font-normal text-left md:text-right md:text-[1rem] md:leading-[1.5rem] md:tracking-[-0.01rem] self-stretch">
                            While your presence at our wedding is the greatest gift we could ask for, friends and family who would like to support our next adventure together can make a contribution below.
                        </p>
                        <p className="text-[#26272C] text-[0.65875rem] leading-[0.98813rem] tracking-[-0.00656rem] font-display font-normal text-left md:text-right md:text-[1rem] md:leading-[1.5rem] md:tracking-[-0.01rem] self-stretch">
                            Every gift is like a perfect assist, helping us reach our goals in married life.
                        </p>
                        <p className="text-[#26272C] text-[0.65875rem] leading-[0.98813rem] tracking-[-0.00656rem] font-display font-normal italic text-left md:text-right md:text-[1rem] md:leading-[1.5rem] md:tracking-[-0.01rem] self-stretch pt-1 md:pt-0">
                            Thank you for supporting our team.
                        </p>
                    </div>

                    {/* Bank Account Details Layout */}
                    <div className="w-full md:w-[23rem] flex flex-col gap-6 md:gap-[0.5rem] pt-6 md:pt-4 border-t border-gray-200/60 md:border-none md:items-start">
                        {accounts.map((acc, index) => (
                            <div key={index} className="flex flex-col gap-1 sm:gap-4 md:gap-[0.5rem] w-full py-2 md:py-0 border-b border-gray-100 last:border-none md:border-none mt-2 md:mt-4">
                                
                                {/* Row 1: Account Name */}
                                <div className="flex justify-between md:justify-end items-start md:items-center gap-1 md:gap-[1.125rem] self-stretch">
                                    <span className="flex-1 md:flex-none md:flex-grow md:basis-0 text-[#676A79] text-[1.25rem] leading-[1.5rem] tracking-[-0.0125rem] font-display font-normal text-left">
                                        Account name:
                                    </span>
                                    <span className="text-[#676A79] md:text-[#26272C] text-[1.25rem] leading-[1.5rem] tracking-[-0.0125rem] font-display font-normal md:font-medium text-right md:text-left">
                                        {acc.name}
                                    </span>
                                </div>

                                {/* Row 2: Bank Name */}
                                <div className="flex justify-between md:justify-end items-start md:items-center gap-1 md:gap-[1.125rem] self-stretch">
                                    <span className="flex-1 md:flex-none md:flex-grow md:basis-0 text-[#676A79] text-[1.25rem] leading-[1.5rem] tracking-[-0.0125rem] font-display font-normal text-left">
                                        Bank name:
                                    </span>
                                    <span className="text-[#676A79] md:text-[#26272C] text-[1.25rem] leading-[1.5rem] tracking-[-0.0125rem] font-display font-normal md:font-medium text-right md:text-left">
                                        {acc.bank} [{acc.type}]
                                    </span>
                                </div>

                                {/* Row 3: Account Number */}
                                <div className="flex justify-between md:justify-end items-start md:items-center gap-1 md:gap-[1.125rem] self-stretch">
                                    <span className="flex-1 md:flex-none md:flex-grow md:basis-0 text-[#676A79] text-[1.25rem] leading-[1.5rem] tracking-[-0.0125rem] font-display font-normal text-left">
                                        Account number:
                                    </span>
                                    <div className="flex items-center justify-end md:justify-start gap-2">
                                        <span className="text-[#676A79] md:text-[#26272C] text-[1.25rem] leading-[1.5rem] tracking-[-0.0125rem] font-display font-normal md:font-medium font-mono">
                                            {acc.number}
                                        </span>
                                        <button 
                                            onClick={() => handleCopy(acc.number, index)}
                                            className="px-3 py-1 bg-[#1A2E22] text-white text-xs font-semibold rounded-full hover:bg-black transition active:scale-[0.96]"
                                        >
                                            {copiedIndex === index ? 'Copied ✓' : 'Copy'}
                                        </button>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
