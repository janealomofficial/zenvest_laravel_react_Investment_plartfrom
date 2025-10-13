import React from "react";
import Header from "../components/Landing/Header";
import HeroSection from "../components/Landing/HeroSection";
import AboutSection from "../components/AboutSection";
import FeatureSectionOne from "../components/FeatureSectionOne";
import FeatureSectionTwo from "../components/FeatureSectionTwo";
import FeatureSectionThree from "../components/FeatureSectionThree";
import BrandsMarquee from "../components/BrandsMarquee";
import PlansSection from "../components/PlansSection";
import BenefitsSection from "../components/BenefitsSection";
import StatsSection from "../components/StatsSection";
import TestimonialsSection from "../components/TestimonialsSection";
import FaqSection from "../components/FaqSection";
import JoinSection from "../components/JoinSection";
import ZenVestFooter from "../components/ZenVestFooter";














const HomePage = () => {
  return (
    <div className="relative min-h-screen bg-black text-white">
      <Header />
      <HeroSection />
      <AboutSection />
      <FeatureSectionOne />
      <FeatureSectionTwo />
      <FeatureSectionThree />
      <BrandsMarquee />
      <PlansSection />
      <BenefitsSection />
      <StatsSection />
      <TestimonialsSection />
      <FaqSection />
      <JoinSection />
      <ZenVestFooter />






    </div>
  );
};

export default HomePage;
