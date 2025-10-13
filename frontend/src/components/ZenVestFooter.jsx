import React from "react";
import { useNavigate } from "react-router-dom";
import { Facebook, Linkedin, X } from "lucide-react";

const ZenVestFooter = () => {
    const navigate = useNavigate();

    return (
        <footer className="bg-black text-white py-16 px-8 md:px-20 border-t border-gray-800">
            <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-12">
                {/* Brand Section */}
                <div>
                    <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-600 bg-clip-text text-transparent">
                        ZenVest
                    </h1>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Empowering investors with smarter tools and seamless experiences.
                        Grow with confidence through ZenVest.
                    </p>
                </div>

                {/* Navigation */}
                <div>
                    <h2 className="text-lg font-semibold mb-4">Navigation</h2>
                    <ul className="space-y-2 text-gray-400">
                        <li><button onClick={() => navigate("/about")} className="hover:text-white transition">About</button></li>
                        <li><button onClick={() => navigate("/features")} className="hover:text-white transition">Features</button></li>
                        <li><button onClick={() => navigate("/solutions")} className="hover:text-white transition">Solutions</button></li>
                        <li><button onClick={() => navigate("/benefits")} className="hover:text-white transition">Benefits</button></li>
                        <li><button onClick={() => navigate("/faq")} className="hover:text-white transition">FAQ</button></li>
                    </ul>
                </div>

                {/* Company */}
                <div>
                    <h2 className="text-lg font-semibold mb-4">Company</h2>
                    <p className="text-gray-400 text-sm">
                        Shaid buddijibi RD,<br />Bosila, Muhammadpur, Dhaka
                    </p>
                    <p className="text-gray-400 mt-3 text-sm">+8801736353994</p>
                    <p className="text-gray-400 text-sm">support@zenvest.com</p>
                </div>

                {/* Utility */}
                <div>
                    <h2 className="text-lg font-semibold mb-4">Utility</h2>
                    <ul className="space-y-2 text-gray-400">
                        <li><button onClick={() => navigate("/404")} className="hover:text-white transition">404</button></li>
                        <li><button onClick={() => navigate("/privacy")} className="hover:text-white transition">Privacy Policy</button></li>
                    </ul>
                    {/* Social icons */}
                    <div className="flex gap-4 mt-6">
                        <a href="#" className="hover:text-purple-400 transition"><X size={18} /></a>
                        <a href="#" className="hover:text-purple-400 transition"><Facebook size={18} /></a>
                        <a href="#" className="hover:text-purple-400 transition"><Linkedin size={18} /></a>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800 mt-12 pt-6 text-center text-gray-500 text-sm">
                © {new Date().getFullYear()} ZenVest. All rights reserved.
            </div>
        </footer>
    );
};

export default ZenVestFooter;
