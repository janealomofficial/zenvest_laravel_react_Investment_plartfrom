import React from "react";
import featureImg from "../assets/feature-shield.png"; // your new purple shield image

const FeatureSectionTwo = () => {
    return (
        <section className="bg-black text-white py-24 px-6 md:px-16">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">

                {/* --- Left Image --- */}
                <div className="md:w-1/2 flex justify-center">
                    <img
                        src={featureImg}
                        alt="Protection strategy illustration"
                        className="w-[400px] md:w-[450px] object-contain drop-shadow-[0_0_40px_rgba(168,85,247,0.4)]"
                    />
                </div>

                {/* --- Right Content --- */}
                <div className="md:w-1/2 space-y-6">
                    <h4 className="text-sm tracking-widest text-purple-400 uppercase font-semibold">
                        Protection
                    </h4>

                    <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                        Get directions on the <br />
                        road to <span className="text-purple-400">success</span>
                    </h2>

                    <p className="text-gray-300 text-lg leading-relaxed">
                        Navigate financial decisions with confidence. Leverage strategic
                        insights to maximize opportunities and mitigate risks for sustainable
                        portfolio growth.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default FeatureSectionTwo;
