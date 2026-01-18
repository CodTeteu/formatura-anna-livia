import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import graduateImg from "@assets/generated_images/professional_graduate_portrait.png";

export function GraduateSection() {
  return (
    <section id="graduate" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative Background Pattern */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.03] pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-primary">
          <pattern id="grid" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" />
          </pattern>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">
          
          {/* Image Column */}
          <div className="md:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src={graduateImg} 
                  alt="João Silva" 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              
              {/* Decorative Frame */}
              <div className="absolute top-6 left-6 w-full h-full border-2 border-secondary/40 rounded-3xl -z-10 translate-x-4 translate-y-4 md:translate-x-6 md:translate-y-6" />
            </motion.div>
            
            {/* Floating Elements */}
            <motion.div 
              className="absolute -top-10 -left-10 w-24 h-24 bg-secondary/10 rounded-full blur-2xl -z-10"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
          </div>

          {/* Content Column */}
          <div className="md:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="font-body text-secondary uppercase tracking-[0.3em] text-xs font-semibold mb-4">
                Sobre o Formando
              </p>
              <h2 className="font-script text-5xl md:text-7xl text-primary mb-6">
                João Silva
              </h2>
              
              <div className="prose prose-lg text-muted-foreground mb-8 font-body leading-relaxed">
                <p>
                  A jornada acadêmica foi marcada por desafios, descobertas e, acima de tudo, crescimento. 
                  Cada projeto, cada noite de estudo e cada amizade construída ao longo destes anos 
                  contribuiu para formar não apenas um profissional, mas a pessoa que me tornei.
                </p>
                <p>
                  A Engenharia de Software me ensinou que com a lógica certa e persistência, 
                  qualquer problema pode ser solucionado. Agora, estou pronto para aplicar esse conhecimento 
                  e construir o futuro.
                </p>
              </div>

              {/* Quote */}
              <div className="relative pl-8 border-l-2 border-secondary mb-10 py-2">
                <Quote className="absolute top-0 left-0 w-4 h-4 text-secondary/40 -translate-x-1/2 -translate-y-1/2 fill-current" />
                <p className="font-heading italic text-xl md:text-2xl text-primary/80">
                  "O sucesso não é o final, o fracasso não é fatal: é a coragem de continuar que conta."
                </p>
                <cite className="block mt-4 text-sm uppercase tracking-wider text-muted-foreground not-italic">
                  — Winston Churchill
                </cite>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-border">
                <div>
                  <span className="block text-xs uppercase text-muted-foreground tracking-wider mb-1">Curso</span>
                  <span className="font-heading text-lg text-primary font-bold">Engenharia de Software</span>
                </div>
                <div>
                  <span className="block text-xs uppercase text-muted-foreground tracking-wider mb-1">Universidade</span>
                  <span className="font-heading text-lg text-primary font-bold">Universidade Federal</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
