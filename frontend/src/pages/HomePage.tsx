import React from "react";
import Header from "../components/Landing/Header";
import HeroSection from "../components/Landing/HeroSection";
import AboutSection from "../components/AboutSection";


const HomePage = () => {
  return (
    <div className="relative min-h-screen bg-black text-white">
      <Header />
      <HeroSection />
      <AboutSection />

    </div>
  );
};

export default HomePage;
