import { HeroSection } from "@/components/modules/home/HeroSection";
import { CategorySection } from "@/components/modules/home/CategorySection";
import { HowItWorks } from "@/components/modules/home/HowItWorks";
import { FeaturedTutors } from "@/components/modules/home/FeaturedTutors";
import { Testimonials } from "@/components/modules/home/Testimonials";
import { CTASection } from "@/components/modules/home/CTASection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen px-4 md:px-6">
      {/* Static Content */}
      <HeroSection />

      {/* Dynamic Content */}
      <CategorySection />

      {/* Static Content */}
      <HowItWorks />

      {/* Dynamic Content */}
      <FeaturedTutors />

      {/* Dynamic Content */}
      <Testimonials />

      {/* Dynamic Content */}
      <CTASection />
    </div>
  );
}

