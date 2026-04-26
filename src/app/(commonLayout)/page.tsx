"use client";

import { HeroSection } from "@/components/modules/home/HeroSection";
import { CategorySection } from "@/components/modules/home/CategorySection";
import { HowItWorks } from "@/components/modules/home/HowItWorks";
import { FeaturedTutors } from "@/components/modules/home/FeaturedTutors";
import { Testimonials } from "@/components/modules/home/Testimonials";
import { CTASection } from "@/components/modules/home/CTASection";
import { StatsSection } from "@/components/modules/home/StatsSection";
import { WhyChooseUs } from "@/components/modules/home/WhyChooseUs";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const { user } = useAuth();

  console.log("User from useAuth", user);

  return (
    <div className="flex flex-col min-h-screen px-4 md:px-6 lg:px-10">
      {/* Static Content */}
      <HeroSection />

      {/* Dynamic Content */}
      <CategorySection />

      {/* Static Content */}
      <HowItWorks />

      {/* Dynamic Content */}
      <StatsSection />

      {/* Dynamic Content */}
      <WhyChooseUs />

      {/* Dynamic Content */}
      <FeaturedTutors />

      {/* Dynamic Content */}
      <Testimonials />

      {/* Dynamic Content */}
      <CTASection />
    </div>
  );
}

