import Hero from "@/components/marketing/Hero";
import HowItWorks from "@/components/marketing/HowItWorks";
import ServicesGrid from "@/components/marketing/ServicesGrid";
import CoverageMap from "@/components/marketing/CoverageMap";
import WhyAltitude from "@/components/marketing/WhyAltitude";
import IndustriesScroller from "@/components/marketing/IndustriesScroller";
import Testimonials from "@/components/marketing/Testimonials";
import PilotCTA from "@/components/marketing/PilotCTA";
import StructuredData from "@/components/marketing/StructuredData";

export default function MarketingPage() {
  return (
    <div className="flex flex-col">
      <StructuredData />
      <Hero />
      <HowItWorks />
      <ServicesGrid />
      <CoverageMap />
      <WhyAltitude />
      <IndustriesScroller />
      <Testimonials />
      <PilotCTA />
    </div>
  );
}
