import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ceremonyBg from "/assets/ceremony_bg.jpg";
import veredasImg from "/assets/veredas_do_lago.png";
import miranteImg from "/assets/mirante.jpg";

export function CeremonySection() {
  return (
    <section id="ceremony" className="pt-10 pb-4 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-5 md:px-4 relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <p className="font-body text-secondary uppercase tracking-[0.3em] text-xs font-semibold mb-4">
            O Grande Momento
          </p>
          <h2 className="font-script text-4xl md:text-6xl text-primary mb-4">
            Detalhes do grande dia
          </h2>
          <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">

          {/* Card 1: Data e Confirmação */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="h-full border-none shadow-xl overflow-hidden group">
              <div className="relative h-56 overflow-hidden">
                <img
                  src={ceremonyBg}
                  alt="Anna Lívia"
                  className="w-full h-full object-cover object-[center_20%] scale-125 transition-transform duration-700 group-hover:scale-[1.35]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/10 to-black/50" />
                <div className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 text-white text-center">
                  <span className="text-5xl font-script block mb-1">14</span>
                  <span className="text-xl uppercase tracking-widest font-heading block">Agosto</span>
                  <span className="text-2xl font-script block mt-2">2026</span>
                </div>
              </div>
              <CardContent className="p-6 text-center bg-card">
                <h3 className="font-heading text-xl text-primary mb-3 font-bold">Data da Formatura</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                  14 de Agosto de 2026
                </p>
                <div className="bg-primary/5 border border-primary/10 rounded-xl p-3 mb-4">
                  <p className="text-xs text-primary font-semibold">
                    Confirmar presença até 20/07
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="border-secondary text-primary hover:bg-secondary/10 w-full"
                  onClick={() => {
                    const eventTitle = "Formatura Anna Lívia - Enfermagem";
                    const eventDetails = "Formatura Anna Lívia - Enfermagem. Confirmar presença até 20/07.";
                    const eventLocation = "Veredas do Lago, Araguaína - TO";
                    const startDate = "20260814T193000";
                    const endDate = "20260814T223000";
                    const calParams = `action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(eventDetails)}&location=${encodeURIComponent(eventLocation)}`;
                    const userAgent = navigator.userAgent.toLowerCase();
                    const isMobile = /android|iphone|ipad|ipod/i.test(userAgent);
                    window.location.href = isMobile
                      ? `https://calendar.google.com/calendar/r/eventedit?${calParams}`
                      : `https://calendar.google.com/calendar/render?${calParams}`;
                  }}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Google Agenda
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Card 2: Colação de Grau */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <Card className="h-full border-none shadow-xl overflow-hidden group">
              <div className="relative h-56 bg-muted overflow-hidden">
                <img
                  src={veredasImg}
                  alt="Veredas do Lago"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-6">
                  <h3 className="text-white font-script text-3xl text-center">Veredas do Lago</h3>
                </div>
              </div>
              <CardContent className="p-6 text-center bg-card">
                <h3 className="font-heading text-xl text-primary mb-3 font-bold">Colação de Grau</h3>
                <div className="flex items-center justify-center gap-2 text-muted-foreground mb-2">
                  <Clock className="w-4 h-4 text-secondary" />
                  <span className="text-sm">Início às 19:30</span>
                </div>
                {/* Endereço por escrito */}
                <div className="flex flex-col items-center justify-center gap-1 text-muted-foreground mb-3">
                  <div className="flex items-center gap-1.5 justify-center">
                    <MapPin className="w-3.5 h-3.5 text-secondary shrink-0" />
                    <span className="text-xs font-medium text-secondary">Endereço</span>
                  </div>
                  <p className="text-xs text-center leading-relaxed">
                    Alameda das Mansões, 450 — Setor Park Primavera<br />
                    Araguaína – TO
                  </p>
                </div>
                <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 mb-4">
                  <p className="text-3xl font-heading font-bold text-primary">R$ 60,00</p>
                  <p className="text-xs text-muted-foreground mt-1">por pessoa</p>
                </div>
                <p className="text-xs text-muted-foreground/80 mb-4 italic">
                  * Acima de 5 anos, criança precisa de cadeira individual e paga convite.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-3">
                  <a href="https://www.google.com/maps/search/?api=1&query=Veredas+do+Lago+Eventos+Aragua%C3%ADna+TO" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="border-secondary text-primary hover:bg-secondary/10 w-full sm:w-auto text-xs">
                      <MapPin className="w-3.5 h-3.5 mr-1 shrink-0" /> Maps
                    </Button>
                  </a>
                  <a href="https://waze.com/ul?q=Veredas%20do%20Lago%20Aragua%C3%ADna%20TO" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="border-secondary text-primary hover:bg-secondary/10 w-full sm:w-auto text-xs">
                      <MapPin className="w-3.5 h-3.5 mr-1 shrink-0" /> Waze
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Card 3: Jantar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="h-full border-none shadow-xl overflow-hidden group">
              <div className="relative h-56 bg-muted overflow-hidden">
                <img
                  src={miranteImg}
                  alt="Restaurante Mirante"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-6">
                  <h3 className="text-white font-script text-3xl text-center">Mirante</h3>
                </div>
              </div>
              <CardContent className="p-6 text-center bg-card">
                <h3 className="font-heading text-xl text-primary mb-3 font-bold">Jantar de Formatura</h3>
                <div className="flex items-center justify-center gap-2 text-muted-foreground mb-2">
                  <Clock className="w-4 h-4 text-secondary" />
                  <span className="text-sm">22:00 Horas</span>
                </div>
                {/* Endereço por escrito */}
                <div className="flex flex-col items-center justify-center gap-1 text-muted-foreground mb-3">
                  <div className="flex items-center gap-1.5 justify-center">
                    <MapPin className="w-3.5 h-3.5 text-secondary shrink-0" />
                    <span className="text-xs font-medium text-secondary">Endereço</span>
                  </div>
                  <p className="text-xs text-center leading-relaxed">
                    Av. Filadélfia, 2750 — Setor Central<br />
                    Araguaína – TO
                  </p>
                </div>
                <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 mb-4">
                  <p className="text-3xl font-heading font-bold text-primary">R$ 70,00</p>
                  <p className="text-xs text-muted-foreground mt-1">por pessoa</p>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center">
                    <Users className="w-3 h-3 text-secondary" />
                    <span>0 a 5 anos: <strong className="text-primary">Grátis</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center">
                    <Users className="w-3 h-3 text-secondary" />
                    <span>6 a 9 anos: <strong className="text-primary">Meia</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center">
                    <Users className="w-3 h-3 text-secondary" />
                    <span>Acima de 10 anos: <strong className="text-primary">Integral</strong></span>
                  </div>
                </div>
                <a href="https://maps.app.goo.gl/GBsAG2JG4a4ZKQXp8" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="border-secondary text-primary hover:bg-secondary/10 w-full text-xs">
                    <MapPin className="w-3 h-3 mr-1" /> Google Maps
                  </Button>
                </a>
              </CardContent>
            </Card>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
