import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";

// Images
import gallery1 from "/assets/family_1.jpg";
import gallery2 from "/assets/family_parents.jpg";
import gallery3 from "/assets/couple.jpg";
import gallery4 from "/assets/family_tongue.jpg";

const PHOTOS = [
  { src: gallery1, alt: "Com a família" },
  { src: gallery2, alt: "Com os pais" },
  { src: gallery3, alt: "Com o amor" },
  { src: gallery4, alt: "Diversão em família" },
];

export function GallerySection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" }, [
    Autoplay({ delay: 3000, stopOnInteraction: false }),
  ]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section id="gallery" className="pt-16 pb-10 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-5 md:px-4 relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <p className="font-body text-secondary uppercase tracking-[0.3em] text-xs font-semibold mb-4">
            Minha Base
          </p>
          <h2 className="font-script text-4xl md:text-6xl text-primary mb-4">
            Família
          </h2>
          <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto" />
          <p className="font-body text-primary/80 mt-6 max-w-2xl mx-auto leading-relaxed">
            Essas fotos representam muito mais do que lembranças, representam a base que me sustentou e o amor que me fez acreditar. Obrigada por tudo. Essa conquista também é de vocês.
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {PHOTOS.map((photo, index) => (
                <div key={index} className="flex-[0_0_100%] md:flex-[0_0_60%] lg:flex-[0_0_50%] min-w-0 pl-4">
                  <motion.div
                    className="relative aspect-[3/2] md:aspect-video rounded-2xl overflow-hidden group cursor-pointer bg-black/5"
                    whileHover={{ scale: 0.98 }}
                    transition={{ duration: 0.4 }}
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6">
                      <div className="border border-white/30 p-8 w-full h-full flex items-center justify-center relative">
                        {/* Corners */}
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/60" />
                        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/60" />
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/60" />
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/60" />

                        <span className="text-white font-heading text-xl italic text-center">
                          {photo.alt}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4 mt-6 md:mt-10">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-12 h-12 md:w-12 md:h-12 border-primary/20 text-primary hover:bg-primary hover:text-white transition-colors min-w-[48px] min-h-[48px]"
              onClick={scrollPrev}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-12 h-12 md:w-12 md:h-12 border-primary/20 text-primary hover:bg-primary hover:text-white transition-colors min-w-[48px] min-h-[48px]"
              onClick={scrollNext}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
