import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="w-full fixed top-0 left-0 bg-black/60 backdrop-blur-md text-white z-50 shadow-md">
            <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
                {/* Logo */}
                <div className="text-2xl font-bold tracking-wide">
                    <span className="text-white">ZenVest</span>
                </div>

                {/* Navigation Links */}
                <nav className="hidden md:flex space-x-8 text-sm font-medium">
                    <a href="#about" className="hover:text-purple-400 transition">
                        About
                    </a>
                    <a href="#features" className="hover:text-purple-400 transition">
                        Features
                    </a>
                    <a href="#solutions" className="hover:text-purple-400 transition">
                        Solutions
                    </a>
                    <a href="#benefits" className="hover:text-purple-400 transition">
                        Benefits
                    </a>
                    <a href="#blog" className="hover:text-purple-400 transition">
                        Blog
                    </a>
                    <a href="#faq" className="hover:text-purple-400 transition">
                        FAQ
                    </a>
                </nav>

                {/* Login Button with glass effect */}
                <Link
                    to="/login"
                    className="px-5 py-2 rounded-full border border-white/40 bg-white/10 backdrop-blur-md text-white font-semibold hover:bg-white hover:text-black transition-all duration-300"
                >
                    Login
                </Link>
            </div>
        </header>
    );
};

export default Header;
