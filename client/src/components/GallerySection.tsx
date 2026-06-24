import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const assetPath = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

// Gallery photos with optional memorial overlays
const PHOTOS = [
  ...Array.from({ length: 37 }, (_, i) => ({
    src: assetPath(`/assets/gallery/gallery_${(i + 1).toString().padStart(2, "0")}.jpg`),
    alt: `Momento especial ${i + 1}`,
    overlay: i === 15 ? "Em memória do meu avô Mauro Pfaiffer" : i === 16 ? "Em memória minha bisavó Coraci (Dindinha)" : i === 20 ? "Em memória primo Lucas" : i === 21 ? "Em memória: pai da minha melhor amiga Mayza / padrinho do meu namorado" : null,
  })),
];

export function GallerySection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" }, [
    Autoplay({ delay: 3000, stopOnInteraction: false }),
  ]);

  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const openLightbox = (index: number) => {
    setSelectedPhoto(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
    document.body.style.overflow = "";
  };

  const goToPrev = () => {
    if (selectedPhoto !== null) {
      setSelectedPhoto(selectedPhoto === 0 ? PHOTOS.length - 1 : selectedPhoto - 1);
    }
  };

  const goToNext = () => {
    if (selectedPhoto !== null) {
      setSelectedPhoto(selectedPhoto === PHOTOS.length - 1 ? 0 : selectedPhoto + 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    if (selectedPhoto === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPhoto]);

  return (
    <section id="gallery" className="pt-16 pb-10 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-5 md:px-4 relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <p className="font-body text-secondary uppercase tracking-[0.3em] text-xs font-semibold mb-4">
            Momentos Especiais
          </p>
          <h2 className="font-script text-4xl md:text-6xl text-primary mb-4">
            Galeria
          </h2>
          <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto" />
          <p className="font-body text-primary/80 mt-6 max-w-2xl mx-auto leading-relaxed">
            Cada foto representa uma lembrança especial, uma conquista, um sorriso. Acompanhe um pouco da minha jornada até essa conquista tão importante.
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {PHOTOS.map((photo, index) => (
                <div key={index} className="flex-[0_0_85%] md:flex-[0_0_50%] lg:flex-[0_0_40%] min-w-0 pl-4">
                  <motion.div
                    className="relative aspect-[3/4] rounded-2xl overflow-hidden group cursor-pointer bg-primary/5 border border-primary/10 shadow-lg"
                    whileHover={{ scale: 0.98 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => openLightbox(index)}
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Memorial Overlay - always visible */}
                    {photo.overlay && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end justify-center p-6 z-10">
                        <p className="text-white font-heading text-sm md:text-base italic text-center drop-shadow-lg">
                          {photo.overlay}
                        </p>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between">
                      <span className="text-white font-heading text-sm italic">
                        {photo.alt}
                      </span>
                      <ZoomIn className="w-5 h-5 text-white/80" />
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

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-[210] p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors min-w-[48px] min-h-[48px] flex items-center justify-center"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Photo Counter */}
            <div className="absolute top-4 left-4 z-[210] px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium">
              {selectedPhoto + 1} / {PHOTOS.length}
            </div>

            {/* Previous Button */}
            <button
              onClick={(e) => { e.stopPropagation(); goToPrev(); }}
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-[210] p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors min-w-[48px] min-h-[48px] flex items-center justify-center"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
              className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-[210] p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors min-w-[48px] min-h-[48px] flex items-center justify-center"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Image */}
            <div className="relative">
              <motion.img
                key={selectedPhoto}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                src={PHOTOS[selectedPhoto].src}
                alt={PHOTOS[selectedPhoto].alt}
                className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
              {/* Memorial Overlay in Lightbox */}
              {PHOTOS[selectedPhoto].overlay && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                  <p className="text-white font-heading text-base md:text-lg italic text-center drop-shadow-lg">
                    {PHOTOS[selectedPhoto].overlay}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
