import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export function GraduateSection() {
  return (
    <section id="graduate" className="w-full pt-12 pb-10 md:py-24 relative z-10 max-w-[800px] mx-auto px-5 md:px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <p className="font-body text-secondary uppercase tracking-[0.3em] text-xs font-semibold mb-4">
          Formatura
        </p>
        <h2 className="font-script text-5xl md:text-7xl text-primary mb-8">
          Anna Lívia Carvalho
        </h2>

        <div className="prose prose-base md:prose-lg text-primary/80 mb-10 font-body leading-relaxed max-w-2xl mx-auto">
          <p>
            Após anos de aprendizado, desafios e crescimento, tenho a alegria de celebrar minha
            graduação em Enfermagem, uma conquista construída com esforço, fé e amor pelo cuidado
            ao próximo. É com grande carinho que convido você para compartilhar comigo este momento único.
          </p>
          <p className="mt-4 font-heading font-bold text-primary">
            Anna Lívia Carvalho
          </p>
        </div>

        {/* Quote */}
        <div className="relative mb-10 py-6 px-8 max-w-xl text-center bg-primary/5 rounded-xl mx-auto">
          <Quote className="absolute top-0 left-1/2 w-8 h-8 text-secondary -translate-x-1/2 -translate-y-1/2 fill-current bg-background p-1.5 rounded-full" />
          <p className="font-heading italic text-lg md:text-2xl text-primary">
            "Há sonhos que exigem coragem, dedicação e perseverança para se tornarem realidade."
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-6 pt-6 border-t border-primary/10 max-w-md mx-auto">
          <div className="text-center">
            <span className="block text-xs uppercase text-primary/60 tracking-wider mb-2">Curso</span>
            <span className="font-heading text-2xl text-primary font-bold">Enfermagem</span>
          </div>
          <div className="text-center">
            <span className="block text-xs uppercase text-primary/60 tracking-wider mb-2">Universidade</span>
            <span className="font-heading text-2xl text-primary font-bold">Uniplan</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
