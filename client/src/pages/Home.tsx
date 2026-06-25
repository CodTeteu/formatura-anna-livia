import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { GraduateSection } from "@/components/GraduateSection";
import { GallerySection } from "@/components/GallerySection";
import { CeremonySection } from "@/components/CeremonySection";
import { DinnerSection } from "@/components/DinnerSection";
import { GiftSection } from "@/components/GiftSection";
import { RSVPSection } from "@/components/RSVPSection";
import { Footer } from "@/components/Footer";
import { motion, useScroll, useSpring } from "framer-motion";
import { ImageLoadProvider, useImageLoad } from "@/hooks/useImageLoad";

const assetPath = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

function HomeContent() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const { heroLoaded } = useImageLoad();

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden bg-background">
      {/* Fixed Background Image - Only renders after hero image loads */}
      {heroLoaded && (
        <motion.div
          className="fixed inset-0 z-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={assetPath("/assets/theme_background.png")}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </motion.div>
      )}

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-secondary origin-left z-[100]"
        style={{ scaleX }}
      />

      <Navigation />

      <main>
        <HeroSection />

        {/* Spacer between Hero and Graduate sections */}
        <div className="w-full h-8 md:h-16 bg-background" />

        <GraduateSection />
        <GallerySection />
        <CeremonySection />
        <DinnerSection />
        <GiftSection />
        <RSVPSection />
      </main>

      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <ImageLoadProvider>
      <HomeContent />
    </ImageLoadProvider>
  );
}
