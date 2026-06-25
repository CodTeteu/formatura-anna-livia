import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import partyImg from "@assets/generated_images/elegant_party_ballroom.png";

export function CelebrationSection() {
  return (
    <section id="celebration" className="py-24 bg-primary text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full border-2 border-secondary" />
        <div className="absolute bottom-20 right-20 w-64 h-64 rounded-full border border-secondary" />
        <div className="absolute top-1/2 left-1/3 w-4 h-4 bg-secondary rounded-full" />
        <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-secondary rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-body text-secondary uppercase tracking-[0.3em] text-xs font-semibold mb-4">
              A Festa Continua
            </p>
            <h2 className="font-script text-5xl md:text-7xl mb-8">
              Baile de Formatura
            </h2>
            <p className="text-white/80 text-lg leading-relaxed mb-10 font-light">
              Após a cerimônia solene, vamos celebrar juntos essa conquista em grande estilo. 
              Prepare-se para uma noite inesquecível com música, dança e muita alegria.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              <div className="border-l border-white/30 pl-6">
                <h4 className="text-white font-heading text-xl font-bold mb-2">Local</h4>
                <p className="text-white/90">Salão de Festas Excellence</p>
                <p className="text-white/60 text-sm mt-1">Av. das Nações, 500</p>
              </div>
              
              <div className="border-l border-white/30 pl-6">
                <h4 className="text-white font-heading text-xl font-bold mb-2">Detalhes</h4>
                <p className="text-white/90">23:00 Horas</p>
                <p className="text-white/60 text-sm mt-1">Traje Social Completo</p>
              </div>
              
              <div className="border-l border-white/30 pl-6">
                <h4 className="text-white font-heading text-xl font-bold mb-2">Buffet</h4>
                <p className="text-white/90">Jantar Completo</p>
                <p className="text-white/60 text-sm mt-1">Open Bar Premium</p>
              </div>

              <div className="border-l border-white/30 pl-6">
                <h4 className="text-white font-heading text-xl font-bold mb-2">Atrações</h4>
                <p className="text-white/90">Banda Show</p>
                <p className="text-white/60 text-sm mt-1">DJ Convidado</p>
              </div>
            </div>

            <Button 
              size="lg" 
              className="bg-secondary text-primary font-bold hover:bg-white hover:text-primary transition-colors text-lg px-8 py-6 rounded-full"
            >
              Informações sobre Convites
            </Button>
          </motion.div>

          {/* Image */}
          <motion.div
             initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
             whileInView={{ opacity: 1, scale: 1, rotate: 3 }}
             whileHover={{ rotate: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="relative"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
              <img 
                src={partyImg} 
                alt="Baile de Formatura" 
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Backdrop Elements */}
            <div className="absolute inset-0 bg-secondary/20 transform -rotate-6 rounded-2xl -z-10 scale-105 blur-sm" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
