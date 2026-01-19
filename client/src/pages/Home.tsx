import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { GraduateSection } from "@/components/GraduateSection";
import { GallerySection } from "@/components/GallerySection";
import { CeremonySection } from "@/components/CeremonySection";
import { LiveStreamSection } from "@/components/LiveStreamSection";
import { DinnerSection } from "@/components/DinnerSection";
import { RSVPSection } from "@/components/RSVPSection";
import { Footer } from "@/components/Footer";
import { motion, useScroll, useSpring } from "framer-motion";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden bg-background">
      {/* Fixed Background Image - Seamless across all sections */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img
          src="/assets/theme_background.png"
          alt=""
          className="w-full h-full object-cover"
          fetchPriority="low"
          loading="lazy"
        />
      </div>

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-secondary origin-left z-[100]"
        style={{ scaleX }}
      />

      <Navigation />

      <main>
        <HeroSection />

        {/* Spacer between Hero and Graduate sections */}
        <div className="w-full h-16 md:h-24 bg-background" />

        <GraduateSection />
        <GallerySection />
        <CeremonySection />
        <LiveStreamSection />
        <DinnerSection />
        <RSVPSection />
      </main>

      <Footer />


    </div>
  );
}
