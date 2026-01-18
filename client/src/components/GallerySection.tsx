import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";

// Images
import gallery1 from "@assets/stock_images/happy_graduation_gro_ddcc4e7c.jpg";
import gallery2 from "@assets/stock_images/happy_graduation_gro_9463c2f2.jpg";
import gallery3 from "@assets/stock_images/graduation_diploma_s_aa9dbeb9.jpg";

const PHOTOS = [
  { src: gallery1, alt: "Momentos de alegria com a turma" },
  { src: gallery2, alt: "Celebração da conquista" },
  { src: gallery3, alt: "O tão sonhado diploma" },
  // Duplicate for infinite scroll feel if needed, but carousel handles loop
  { src: gallery1, alt: "Turma reunida" }, 
  { src: gallery2, alt: "Detalhes da beca" },
];

export function GallerySection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" }, [
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  ]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section id="gallery" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="font-body text-secondary uppercase tracking-[0.3em] text-xs font-semibold mb-4">
            Memórias
          </p>
          <h2 className="font-script text-4xl md:text-6xl text-primary mb-4">
            Galeria de Fotos
          </h2>
          <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {PHOTOS.map((photo, index) => (
                <div key={index} className="flex-[0_0_85%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] min-w-0 pl-4">
                  <motion.div 
                    className="relative aspect-[4/5] rounded-2xl overflow-hidden group cursor-pointer"
                    whileHover={{ scale: 0.98 }}
                    transition={{ duration: 0.4 }}
                  >
                    <img 
                      src={photo.src} 
                      alt={photo.alt} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
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
          <div className="flex justify-center gap-4 mt-12">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-12 h-12 border-primary/20 text-primary hover:bg-primary hover:text-white transition-colors"
              onClick={scrollPrev}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-12 h-12 border-primary/20 text-primary hover:bg-primary hover:text-white transition-colors"
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
