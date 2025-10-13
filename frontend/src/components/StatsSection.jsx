import React from "react";

const StatsSection = () => {
    const stats = [
        { id: 1, value: "120%", label: "Avg. growth" },
        { id: 2, value: "450+", label: "Successful Projects" },
        { id: 3, value: "10k+", label: "Happy Investors" },
    ];

    return (
        <section className="relative bg-black text-white py-20 overflow-hidden">
            {/* Gradient Background */}
            <div className="absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-purple-700 to-black rounded-t-[3rem]"></div>

            {/* Content */}
            <div className="relative max-w-5xl mx-auto text-center">
                <p className="text-sm text-purple-400 uppercase tracking-widest mb-4">
                    Our Stats
                </p>
                <h2 className="text-3xl md:text-4xl font-bold mb-12">
                    The way you’ll grow with Prisma <br />
                    invest program
                </h2>

                {/* Stats Grid */}
                <div className="flex flex-col md:flex-row justify-center items-center gap-12">
                    {stats.map((stat) => (
                        <div key={stat.id} className="text-center">
                            <p className="text-4xl md:text-5xl font-bold text-white mb-2">
                                {stat.value}
                            </p>
                            <p className="text-gray-300 text-sm">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
