import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FaqSection = () => {
    const navigate = useNavigate(); // ✅ must be inside the component but outside arrays or loops
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            id: 1,
            question: "How does Prisma protect my investment and personal information?",
            answer:
                "Prisma uses bank-level encryption and multi-factor authentication to ensure your data and funds remain completely secure. All transactions are protected under advanced security protocols.",
        },
        {
            id: 2,
            question: "What tools does Prisma offer for risk management?",
            answer:
                "We provide automated portfolio rebalancing, real-time risk analysis, and customizable alerts to help investors maintain balanced and optimized portfolios.",
        },
        {
            id: 3,
            question: "Can I withdraw my funds at any time?",
            answer:
                "Yes, you can withdraw funds anytime without restrictions. Withdrawal requests are processed securely within 1–2 business days.",
        },
        {
            id: 4,
            question: "How often will I receive updates about my investments?",
            answer:
                "You’ll receive weekly portfolio insights, monthly performance reports, and real-time alerts on major investment movements.",
        },
        {
            id: 5,
            question: "What should I do if I need help understanding my portfolio?",
            answer:
                "Our expert advisors are available 24/7 via chat or email to explain your investment performance and guide you through portfolio adjustments.",
        },
        {
            id: 6,
            question:
                "Does Prisma offer resources or education for new investors?",
            answer:
                "Yes! Prisma Academy provides tutorials, webinars, and personalized investment learning paths for beginners.",
        },
    ];

    const toggle = (id) => {
        setOpenIndex(openIndex === id ? null : id);
    };

    return (
        <section id="faq" className="bg-black text-white py-20">
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row gap-12 items-start">
                {/* Left Side */}
                <div className="md:w-1/2">
                    <p className="text-sm text-purple-400 uppercase tracking-widest mb-4">
                        FAQ
                    </p>
                    <h2 className="text-4xl font-bold mb-6 leading-tight">
                        Answers to all your <br /> questions
                    </h2>
                    <button
                        onClick={() => navigate("/register")}
                        className="border border-purple-500/70 text-white px-6 py-2 rounded-full hover:bg-purple-600 hover:shadow-[0_0_20px_rgba(168,85,247,0.6)] transition duration-300"
                    >
                        Register Now
                    </button>
                </div>

                {/* Right Side */}
                <div className="md:w-1/2 space-y-4">
                    {faqs.map((faq) => (
                        <div
                            key={faq.id}
                            className="bg-gradient-to-b from-gray-900/90 to-gray-800/80 rounded-lg"
                        >
                            <button
                                onClick={() => toggle(faq.id)}
                                className="w-full flex justify-between items-center p-5 text-left text-gray-200 hover:text-white focus:outline-none"
                            >
                                <span className="font-medium">{faq.question}</span>
                                <svg
                                    className={`w-5 h-5 transition-transform ${openIndex === faq.id
                                        ? "rotate-180 text-purple-400"
                                        : "rotate-0"
                                        }`}
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === faq.id ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                                    }`}
                            >
                                <p className="px-5 pb-5 text-gray-400 text-sm">{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FaqSection;
