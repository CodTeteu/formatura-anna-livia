import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Shirt, Car, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import venueImg from "@assets/generated_images/ceremony_theater_interior.png";

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto mb-4">
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
                  alt="Local da Comemoração"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white">
                  <span className="text-5xl font-script mb-2">14</span>
                  <span className="text-xl uppercase tracking-widest font-heading">Agosto</span>
                  <span className="text-3xl font-script mt-2">19:30</span>
                  <div className="mt-4 px-4 py-1 border border-white/30 rounded-full bg-black/20 backdrop-blur-sm">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-medium">
                      Confirmar presença até 20/07
                    </p>
                  </div>
                </div>
              </div>
              <CardContent className="p-8 text-center bg-card">
                <h3 className="font-heading text-2xl text-primary mb-4 font-bold">Data e hora</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  A cerimônia de colação de grau será um momento especial de celebração.
                  <span className="block mt-2 text-primary font-semibold">Confirmar presença até 20/07.</span>
                  <span className="block mt-2 text-sm text-muted-foreground/80">
                    Serão disponibilizados 10 convites para a colação. Os demais convidados poderão adquirir seu convite por R$ 60,00.
                  </span>
                  <span className="block mt-1 text-sm text-muted-foreground/80">
                    Crianças até 5 anos (no colo) são toleradas sem custo. A partir de 5 anos, precisam de cadeira individual e pagam convite.
                  </span>
                </p>
                <div className="flex justify-center">
                  <Button
                    variant="outline"
                    className="border-secondary text-primary hover:bg-secondary/10"
                    onClick={() => {
                      const eventTitle = "Formatura Anna Lívia - Enfermagem";
                      const eventDetails = "Cerimônia de colação de grau - Veredas do Lago. Confirmar presença até 20/07.";
                      const eventLocation = "Veredas do Lago, Araguaína - TO";
                      const startDate = "20260814T193000";
                      const endDate = "20260814T213000";

                      // Detect device type
                      const userAgent = navigator.userAgent.toLowerCase();
                      const isAndroid = /android/i.test(userAgent);
                      const isIOS = /iphone|ipad|ipod/i.test(userAgent);

                      // Build base Google Calendar URL params
                      const calParams = `action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(eventDetails)}&location=${encodeURIComponent(eventLocation)}`;

                      if (isAndroid || isIOS) {
                        const mobileUrl = `https://calendar.google.com/calendar/r/eventedit?${calParams}`;
                        window.location.href = mobileUrl;
                      } else {
                        const webUrl = `https://calendar.google.com/calendar/render?${calParams}`;
                        window.open(webUrl, '_blank');
                      }
                    }}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Google Agenda
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
              <div className="relative h-64 bg-muted overflow-hidden">
                <img
                  src={venueImg}
                  alt="Veredas do Lago"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <h3 className="text-white font-script text-4xl">Veredas do Lago</h3>
                </div>
              </div>
              <CardContent className="p-8 text-center bg-card">
                <h3 className="font-heading text-2xl text-primary mb-4 font-bold">Localização</h3>
                <p className="text-muted-foreground mb-2">
                  Veredas do Lago - Araguaína, TO
                </p>
                <p className="text-primary font-medium mb-6">
                  19:30 Horas
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <a
                    href="https://www.google.com/maps/search/Veredas+do+Lago+Araguai%C3%ABna+TO"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" className="border-secondary text-primary hover:bg-secondary/10 w-full sm:w-auto">
                      <MapPin className="w-4 h-4 mr-2" />
                      Google Maps
                    </Button>
                  </a>
                  <a
                    href="https://waze.com/ul?q=Veredas%20do%20Lago%20Aragua%C3%ADna%20TO"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" className="border-secondary text-primary hover:bg-secondary/10 w-full sm:w-auto">
                      <MapPin className="w-4 h-4 mr-2" />
                      Waze
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>


      </div>
    </section>
  );
}
