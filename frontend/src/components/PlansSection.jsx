import React from "react";
import plan1 from "../assets/plan1.png"; // Prisma Treasure Plan
import plan2 from "../assets/plan2.png"; // Prisma Crypto Plan
import plan3 from "../assets/plan3.png"; // Prisma Investments Plan

const plans = [
    {
        id: 1,
        title: "ZenVest Premium Plan",
        image: plan1,
    },
    {
        id: 2,
        title: "ZenVest Small business Plan",
        image: plan2,
    },
    {
        id: 3,
        title: "ZenVest Investments Plan",
        image: plan3,
    },
];

const PlansSection = () => {
    return (
        <section className="bg-black text-white py-24 px-6 md:px-16">
            <div className="max-w-6xl mx-auto text-center mb-16">
                <h4 className="text-sm tracking-widest text-purple-400 uppercase font-semibold">
                    Solutions
                </h4>
                <h2 className="text-4xl md:text-5xl font-bold mt-3">
                    Plans that help you run <br /> finance and grow
                </h2>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                {plans.map((plan) => (
                    <div
                        key={plan.id}
                        className="bg-gradient-to-b from-gray-900 to-purple-800/40 rounded-3xl p-8 flex flex-col items-center text-center shadow-xl hover:scale-105 transition-transform duration-500 ease-out"
                    >
                        <img
                            src={plan.image}
                            alt={plan.title}
                            className="w-56 h-56 object-contain mb-6 drop-shadow-[0_0_40px_rgba(168,85,247,0.5)]"
                        />
                        <h3 className="text-lg font-semibold">{plan.title}</h3>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PlansSection;
