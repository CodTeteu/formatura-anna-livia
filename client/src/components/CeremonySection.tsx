import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Shirt, Car, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import venueImg from "@assets/generated_images/ceremony_theater_interior.png";

export function CeremonySection() {
  return (
    <section id="ceremony" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="font-body text-secondary uppercase tracking-[0.3em] text-xs font-semibold mb-4">
            O Grande Momento
          </p>
          <h2 className="font-script text-4xl md:text-6xl text-primary mb-4">
            Colação de Grau
          </h2>
          <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          {/* Card 1: The Event */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="h-full border-none shadow-xl overflow-hidden group">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={venueImg} 
                  alt="Local da Colação" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary/60 flex flex-col items-center justify-center text-white">
                  <span className="text-5xl font-script mb-2">15</span>
                  <span className="text-xl uppercase tracking-widest font-heading">Julho • 2026</span>
                </div>
              </div>
              <CardContent className="p-8 text-center bg-card">
                <h3 className="font-heading text-2xl text-primary mb-4 font-bold">A Cerimônia</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  A cerimônia solene de colação de grau marcará o encerramento deste ciclo acadêmico. 
                  Sua presença tornará este momento ainda mais especial.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button variant="outline" className="border-secondary text-primary hover:bg-secondary/10">
                    <Calendar className="w-4 h-4 mr-2" />
                    Google Agenda
                  </Button>
                  <Button variant="outline" className="border-secondary text-primary hover:bg-secondary/10">
                    <Calendar className="w-4 h-4 mr-2" />
                    Outlook
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Card 2: The Venue */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="h-full border-none shadow-xl overflow-hidden group">
              <div className="relative h-64 bg-muted flex items-center justify-center overflow-hidden">
                {/* Placeholder Map or Image */}
                <div className="absolute inset-0 bg-slate-200 flex items-center justify-center">
                   <MapPin className="w-16 h-16 text-muted-foreground/30" />
                   <span className="sr-only">Mapa</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <h3 className="text-white font-script text-4xl">Teatro Municipal</h3>
                </div>
              </div>
              <CardContent className="p-8 text-center bg-card">
                <h3 className="font-heading text-2xl text-primary mb-4 font-bold">Localização</h3>
                <p className="text-muted-foreground mb-2">
                  Av. Central, 1000 - Centro
                </p>
                <p className="text-primary font-medium mb-6">
                  19:00 Horas
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button variant="outline" className="border-secondary text-primary hover:bg-secondary/10">
                    <MapPin className="w-4 h-4 mr-2" />
                    Google Maps
                  </Button>
                  <Button variant="outline" className="border-secondary text-primary hover:bg-secondary/10">
                    <MapPin className="w-4 h-4 mr-2" />
                    Waze
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center p-6 bg-muted/30 rounded-xl">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
              <Shirt className="w-6 h-6" />
            </div>
            <h4 className="font-heading font-bold text-lg mb-2">Traje</h4>
            <p className="text-sm text-muted-foreground">Esporte Fino ou Passeio Completo</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-6 bg-muted/30 rounded-xl">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
              <Car className="w-6 h-6" />
            </div>
            <h4 className="font-heading font-bold text-lg mb-2">Estacionamento</h4>
            <p className="text-sm text-muted-foreground">Estacionamento gratuito disponível no local</p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-muted/30 rounded-xl">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h4 className="font-heading font-bold text-lg mb-2">Chegada</h4>
            <p className="text-sm text-muted-foreground">Recomendamos chegar com 30min de antecedência</p>
          </div>
        </div>
      </div>
    </section>
  );
}
