import React from "react";
import featureImg from "../assets/feature-growth.png"; // use your 3D purple bar chart image

const FeatureSectionThree = () => {
    return (
        <section id="features" className="bg-black text-white py-24 px-6 md:px-16">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">

                {/* --- Left Content --- */}
                <div className="md:w-1/2 space-y-6">
                    <h4 className="text-sm tracking-widest text-purple-400 uppercase font-semibold">
                        Growth
                    </h4>

                    <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                        The modern capital <br />
                        platform for <span className="text-purple-400">growth</span>
                    </h2>

                    <p className="text-gray-300 text-lg leading-relaxed">
                        A dynamic solution for scalable investments. Secure, efficient, and
                        designed to drive sustainable financial success through real-time
                        insights and strategic growth planning.
                    </p>
                </div>

                {/* --- Right Image --- */}
                <div className="md:w-1/2 flex justify-center">
                    <img
                        src={featureImg}
                        alt="Growth strategy illustration"
                        className="w-[400px] md:w-[450px] object-contain drop-shadow-[0_0_40px_rgba(168,85,247,0.4)]"
                    />
                </div>
            </div>
        </section>
    );
};

export default FeatureSectionThree;
