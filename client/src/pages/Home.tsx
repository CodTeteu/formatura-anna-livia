import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { GraduateSection } from "@/components/GraduateSection";
import { GallerySection } from "@/components/GallerySection";
import { CeremonySection } from "@/components/CeremonySection";
import { CelebrationSection } from "@/components/CelebrationSection";
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
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-secondary origin-left z-[100]"
        style={{ scaleX }}
      />

      <Navigation />
      
      <main>
        <HeroSection />
        <GraduateSection />
        <GallerySection />
        <CeremonySection />
        <CelebrationSection />
        <RSVPSection />
      </main>

      <Footer />
      
      {/* Floating CTA for Mobile */}
      <div className="md:hidden fixed bottom-6 right-6 z-40">
         <button 
           onClick={() => document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth" })}
           className="w-14 h-14 bg-secondary text-primary rounded-full shadow-xl flex items-center justify-center animate-bounce"
         >
           <span className="font-bold text-xs">RSVP</span>
         </button>
      </div>
    </div>
  );
}
