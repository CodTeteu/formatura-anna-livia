import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const assetPath = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
const graduateImg = assetPath("/assets/gallery/gallery_01.jpg");

export function GraduateSection() {
  return (
    <section id="graduate" className="flex flex-col md:flex-row w-full -mt-2 relative z-10 max-w-[1200px] mx-auto md:items-center md:gap-12 md:py-20 md:px-8">

      {/* Mobile Title - Shows before photo on mobile only */}
      <div className="md:hidden w-full pt-8 pb-6 px-4 text-center">
        <p className="font-body text-secondary uppercase tracking-[0.3em] text-xs font-semibold mb-3">
          Formatura
        </p>
        <h2 className="font-script text-4xl text-primary">
          Anna Lívia
        </h2>
      </div>

      {/* Section 1: Image (Mobile: Full Bleed / Desktop: Left Side) */}
      <div className="relative w-full h-[60vh] min-h-[500px] md:h-auto md:min-h-0 md:aspect-[3/4] md:w-[45%] md:flex-shrink-0 md:rounded-2xl md:shadow-2xl overflow-hidden z-10">
        <div className="absolute inset-0 z-0">
          <img
            src={graduateImg}
            alt="Anna Lívia"
            className="w-full h-full object-cover object-[center_15%]"
          />
        </div>

        {/* Top Fog Gradient - only on mobile */}
        <div className="absolute top-0 left-0 w-full h-[25%] bg-gradient-to-b from-background to-transparent z-10 pointer-events-none md:hidden" />

        {/* Bottom Fog Gradient - only on mobile */}
        <div className="absolute bottom-0 left-0 w-full h-[40%] bg-gradient-to-t from-background from-10% to-transparent z-10 pointer-events-none md:hidden" />
      </div>

      {/* Section 2: Content (Mobile: Below Image / Desktop: Right Side) */}
      <div className="w-full md:w-[55%] py-10 px-4 -mt-2 md:mt-0 md:py-0 md:px-0 relative z-20">
        <div className="container mx-auto md:mx-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center md:text-left md:mx-0"
          >
            {/* Title - Desktop only (mobile shows above photo) */}
            <div className="hidden md:block">
              <p className="font-body text-secondary uppercase tracking-[0.3em] text-xs font-semibold mb-4">
                Formatura
              </p>
              <h2 className="font-script text-4xl md:text-7xl text-primary mb-8">
                Anna Lívia
              </h2>
            </div>

            <div className="prose prose-base md:prose-lg text-primary/80 mb-10 font-body leading-relaxed">
              <p>
                Após anos de aprendizado, desafios e crescimento, tenho a alegria de celebrar minha
                graduação em Enfermagem, uma conquista construída com esforço, fé e amor pelo cuidado
                ao próximo. É com grande carinho que convido você para compartilhar comigo este momento único.
              </p>
            </div>

            {/* Quote */}
            <div className="relative mb-6 py-6 px-8 max-w-2xl text-center md:text-left bg-primary/5 rounded-xl mx-auto md:mx-0">
              <Quote className="absolute top-0 left-1/2 md:left-8 w-8 h-8 text-secondary -translate-x-1/2 md:translate-x-0 -translate-y-1/2 fill-current bg-background md:bg-white/50 p-1.5 rounded-full" />
              <p className="font-heading italic text-lg md:text-2xl text-primary">
                "É justo que muito custe o que muito vale"
              </p>
              <cite className="block mt-4 text-sm uppercase tracking-wider text-primary/70 not-italic">
                — Santa Teresa d'Ávila
              </cite>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-primary/10">
              <div className="text-center md:text-left">
                <span className="block text-xs uppercase text-primary/60 tracking-wider mb-2">Curso</span>
                <span className="font-heading text-2xl text-primary font-bold">Enfermagem</span>
              </div>
              <div className="text-center md:text-left">
                <span className="block text-xs uppercase text-primary/60 tracking-wider mb-2">Universidade</span>
                <span className="font-heading text-2xl text-primary font-bold">Uniplan</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
