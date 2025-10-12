import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
    return (
        <section className="relative h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 via-black to-black text-white text-center px-6">
            <div className="max-w-4xl">
                <div>
                    <h1 className="text-9xl md:text-9xl font-extrabold leading-tight mb-6">ZenVest</h1>
                </div>
                <h1 className="text-5xl md:text-5xl font-extrabold leading-tight mb-6">
                    One place for all your{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                        investing
                    </span>
                </h1>
                <p className="text- text-gray-300 mb-10">
                    Manage your investments with precision. Get real-time insights,<br /> optimize your portfolio,
                    and grow your wealth — all in one place.
                </p>

                {/* Register Now Button */}
                <Link
                    to="/register"
                    className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-purple-400 hover:text-white transition-all duration-300"
                >
                    Register Now
                </Link>
            </div>
        </section>
    );
};

export default HeroSection;
