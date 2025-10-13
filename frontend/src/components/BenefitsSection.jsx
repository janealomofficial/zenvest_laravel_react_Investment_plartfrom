import React from "react";
import shieldIcon from "../assets/icon-shield.svg";
import chatIcon from "../assets/icon-chat.svg";
import globeIcon from "../assets/icon-globe.svg";




const benefits = [
    {
        id: 1,
        title: "All your assets are protected",
        description:
            "We prioritize security with advanced encryption and real-time monitoring, ensuring your investments remain safe and secure.",
        icon: shieldIcon,
    },
    {
        id: 2,
        title: "We are here to help",
        description:
            "Our expert support team is available to assist you at every step, providing guidance and insights to maximize your financial growth.",
        icon: chatIcon,
    },
    {
        id: 3,
        title: "Fully integrated",
        description:
            "Connect all your financial accounts in one seamless dashboard, allowing for effortless tracking and smarter investment decisions.",
        icon: globeIcon,
    },
];


const BenefitsSection = () => {
    return (
        <section className="bg-black text-white py-24 px-6 md:px-16">
            {/* Header */}
            <div className="max-w-5xl mx-auto text-center mb-16">
                <h4 className="text-sm tracking-widest text-purple-400 uppercase font-semibold">
                    Benefits
                </h4>
                <h2 className="text-4xl md:text-5xl font-bold mt-3 leading-tight">
                    Everything you need for secure <br /> investment
                </h2>
            </div>

            {/* Benefits Grid */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 text-center">
                {benefits.map((benefit) => (
                    <div
                        key={benefit.id}
                        className="flex flex-col items-center p-6 rounded-3xl bg-gradient-to-b from-gray-900/70 to-purple-900/30 hover:from-purple-800/40 hover:to-gray-900/70 transition-all duration-500 shadow-xl"
                    >
                        <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-2xl bg-gradient-to-b from-purple-700 to-purple-900 drop-shadow-[0_0_25px_rgba(168,85,247,0.5)]">
                            <img src={benefit.icon} alt={benefit.title} className="w-8 h-8 object-contain" />

                        </div>
                        <h3 className="text-lg font-semibold mb-3">{benefit.title}</h3>
                        <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
                            {benefit.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BenefitsSection;
