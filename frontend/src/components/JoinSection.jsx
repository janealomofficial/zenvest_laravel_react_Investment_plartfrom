import React from "react";
import { useNavigate } from "react-router-dom";

const JoinSection = () => {
    const navigate = useNavigate();

    return (
        <section className="bg-gradient-to-b from-purple-600 to-black text-white py-24 rounded-t-3xl">
            <div className="max-w-3xl mx-auto text-center px-6">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    Join million of investors
                </h2>
                <p className="text-gray-300 mb-10 leading-relaxed">
                    Take charge of your financial future with Prisma's trusted investment
                    platform. Get started now and experience seamless growth and security.
                </p>

                {/* Registration Form */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    {/* <input
                        type="email"
                        placeholder="Email address"
                        required
                        className="w-full sm:w-96 px-5 py-3 rounded-full text-gray-800 focus:outline-none border border-gray-500 focus:border-purple-400 transition duration-300"
                    /> */}
                    <button
                        onClick={() => navigate("/register")}
                        className="w-full sm:w-auto bg-white text-black px-8 py-3 rounded-full hover:bg-purple-600 hover:text-white hover:shadow-[0_0_20px_rgba(168,85,247,0.6)] transition duration-300"
                    >
                        Register as Investor
                    </button>
                </div>
            </div>
        </section>
    );
};

export default JoinSection;
