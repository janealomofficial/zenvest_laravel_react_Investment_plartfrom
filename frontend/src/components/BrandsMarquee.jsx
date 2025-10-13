import React from "react";

const BrandsMarquee = () => {
    const brands = [
        "Growth",
        "Quisque",
        "Pulvinar",
        "Security",
        "Capital",
        "Equity",
        "Strategy",
        "Liquidity",
    ];

    return (
        <section className="bg-black text-white py-10 overflow-hidden relative">
            <div className="flex whitespace-nowrap animate-marquee">
                {brands.map((brand, index) => (
                    <div
                        key={index}
                        className="text-4xl font-bold mx-10 opacity-80 hover:opacity-100 transition-opacity duration-300"
                    >
                        {brand}
                    </div>
                ))}
                {/* Duplicate the set for seamless loop */}
                {brands.map((brand, index) => (
                    <div
                        key={`duplicate-${index}`}
                        className="text-4xl font-bold mx-10 opacity-80 hover:opacity-100 transition-opacity duration-300"
                    >
                        {brand}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BrandsMarquee;
