import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const assetPath = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

// Gallery photos with optional memorial overlays in the requested order (Anna alone first, then green backgrounds, then other photos)
const PHOTOS = [
  // --- GRUPO 1: ANNA SOZINHA (10 fotos) ---
  { src: assetPath("/assets/gallery/anna_sozinha_anatomia_em_pe.jpg"), alt: "Anna sozinha em pé no laboratório de anatomia" },
  { src: assetPath("/assets/gallery/anna_sozinha_anatomia_perfil.jpg"), alt: "Anna de perfil no laboratório de anatomia" },
  { src: assetPath("/assets/gallery/anna_sozinha_anatomia_sentada.jpg"), alt: "Anna sentada no laboratório de anatomia" },
  { src: assetPath("/assets/gallery/anna_sozinha_anatomia_mesa.jpg"), alt: "Anna na mesa no laboratório de anatomia" },
  { src: assetPath("/assets/gallery/anna_sozinha_anatomia_apoiada.jpg"), alt: "Anna apoiada no laboratório de anatomia" },
  { src: assetPath("/assets/gallery/anna_sozinha_trono_verde.jpg"), alt: "Anna no trono com beca" },
  { src: assetPath("/assets/gallery/anna_sozinha_bata_verde_celular1.jpg"), alt: "Anna com beca segurando celular com foto do avô", overlay: "Em memória do meu avô Mauro Pfaiffer" },
  { src: assetPath("/assets/gallery/anna_sozinha_bata_verde_celular2.jpg"), alt: "Anna com beca segurando celular com foto da Dindinha", overlay: "Em memória minha bisavó Coraci (Dindinha)" },
  { src: assetPath("/assets/gallery/anna_sozinha_scrub_ambulancia1.jpg"), alt: "Anna de scrub na ambulância" },
  { src: assetPath("/assets/gallery/anna_sozinha_scrub_ambulancia2.jpg"), alt: "Anna de scrub braços cruzados na ambulância" },

  // --- GRUPO 2: FUNDO VERDE (10 fotos) ---
  { src: assetPath("/assets/gallery/anna_jaleco_verde_beijo_testa.jpg"), alt: "Anna recebendo beijo na testa" },
  { src: assetPath("/assets/gallery/familia_fundo_verde_4pessoas.jpg"), alt: "Anna com família fundo verde" },
  { src: assetPath("/assets/gallery/anna_e_colega_fundo_verde.jpg"), alt: "Anna com colega fundo verde" },
  { src: assetPath("/assets/gallery/grupo_fundo_verde_6pessoas.jpg"), alt: "Anna com grupo fundo verde" },
  { src: assetPath("/assets/gallery/familia_fundo_verde_5pessoas.jpg"), alt: "Anna com familiares fundo verde" },
  { src: assetPath("/assets/gallery/anna_e_avos_fundo_verde.jpg"), alt: "Anna com avós fundo verde" },
  { src: assetPath("/assets/gallery/anna_e_familia_placa_fundo_verde.jpg"), alt: "Anna com família e placa fundo verde" },
  { src: assetPath("/assets/gallery/familia_grupo_fundo_verde_mauro.jpg"), alt: "Família reunida com Anna sentada" },
  { src: assetPath("/assets/gallery/anna_e_pais_fundo_verde.jpg"), alt: "Anna de beca com os pais" },
  { src: assetPath("/assets/gallery/anna_e_avos_beijo_fundo_verde_coraci.jpg"), alt: "Anna recebendo beijo dos avós" },

  // --- GRUPO 3: OUTRAS FOTOS (17 fotos) ---
  { src: assetPath("/assets/gallery/anna_e_colega_abraço_fundo_branco.jpg"), alt: "Anna abraçando colega" },
  { src: assetPath("/assets/gallery/anna_e_padrinho_selfie.jpg"), alt: "Selfie com padrinho", overlay: "Em memória: pai da minha melhor amiga Mayza / padrinho do meu namorado" },
  { src: assetPath("/assets/gallery/anna_e_menino_chapeu_piscapisca.jpg"), alt: "Anna com menino de chapéu" },
  { src: assetPath("/assets/gallery/anna_e_menino_chapeu_em_pe.jpg"), alt: "Anna em pé com menino de chapéu" },
  { src: assetPath("/assets/gallery/anna_e_cachorro_shih_tzu.jpg"), alt: "Anna com seu shih-tzu de estimação" },
  { src: assetPath("/assets/gallery/anna_e_colega_olhar_piscapisca.jpg"), alt: "Anna com amiga olhando uma para a outra" },
  { src: assetPath("/assets/gallery/anna_e_familia_piscapisca.jpg"), alt: "Anna com familiares" },
  { src: assetPath("/assets/gallery/selfie_anna_e_colega_bebe.jpg"), alt: "Selfie com colega e bebê" },
  { src: assetPath("/assets/gallery/anna_e_familia_deck_noite.jpg"), alt: "Anna com família à noite no deck" },
  { src: assetPath("/assets/gallery/anna_e_colega_deck_noite.jpg"), alt: "Anna com amiga à noite no deck" },
  { src: assetPath("/assets/gallery/anna_e_grupo_piscapisca.jpg"), alt: "Anna com grupo de amigos" },
  { src: assetPath("/assets/gallery/selfie_anna_e_amigos.jpg"), alt: "Selfie com amigos" },
  { src: assetPath("/assets/gallery/cachorro_preto_rosa.jpg"), alt: "Cachorro com rosa na boca" },
  { src: assetPath("/assets/gallery/grupo_deck_noite.jpg"), alt: "Grupo reunido à noite no deck" },
  { src: assetPath("/assets/gallery/grupo_aniversario_baloes.jpg"), alt: "Grupo celebrando aniversário" },
  { src: assetPath("/assets/gallery/grupo_mesa_bolo.jpg"), alt: "Grupo ao redor da mesa de bolo" },
  { src: assetPath("/assets/gallery/lucas_chapeu_fazenda.jpg"), alt: "Primo Lucas na fazenda", overlay: "Em memória: meu primo Lucas" },
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
    <section id="gallery" className="pt-10 pb-6 md:py-24 relative overflow-hidden">
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
