import React from "react";

const AboutSection = () => {
    return (
        <section className="bg-black text-white py-24 px-6 md:px-16">
            <div className="max-w-5xl mx-auto">
                {/* Section Title */}
                <h3 className="text-sm tracking-widest text-purple-400 uppercase font-semibold mb-6">
                    About
                </h3>

                {/* Main Text */}
                <h2 className="text-3xl md:text-5xl font-bold leading-snug">
                    Make <span className="text-purple-400">informed</span> decisions with{" "}
                    <span className="text-purple-400">real-time data</span> and expert
                    insights.
                </h2>

                <p className="mt-6 text-lg text-gray-300 leading-relaxed">
                    Our <span className="text-purple-400 font-semibold">smart investment strategies</span>{" "}
                    help you optimize portfolio performance and grow your wealth with precision.
                    At <span className="text-purple-400 font-semibold">Prisma</span>, we believe that
                    transparency, intelligence, and innovation create sustainable success.
                </p>
            </div>
        </section>
    );
};

export default AboutSection;
