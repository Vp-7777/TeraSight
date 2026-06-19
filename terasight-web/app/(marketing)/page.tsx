import { HeroSection } from "@/components/landing/HeroSection";
import {
  AnalysisDemoSection,
  BeforeAfterSection,
  CtaSection,
  ImpactSection,
  PlatformSection,
  ReportPreviewSection,
  TestimonialsSection,
  UseCasesSection,
} from "@/components/landing/LandingSections";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PlatformSection />
      <AnalysisDemoSection />
      <UseCasesSection />
      <ImpactSection />
      <BeforeAfterSection />
      <ReportPreviewSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}
