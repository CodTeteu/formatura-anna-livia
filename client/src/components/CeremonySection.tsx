import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Shirt, Car, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import venueImg from "@assets/generated_images/ana_ceremony.jpg";

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
                  <span className="text-5xl font-script mb-2">21</span>
                  <span className="text-xl uppercase tracking-widest font-heading">Fevereiro</span>
                  <span className="text-3xl font-script mt-2">19:30</span>
                  <div className="mt-4 px-4 py-1 border border-white/30 rounded-full bg-black/20 backdrop-blur-sm">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-medium">
                      Confirmar presença até 11/02
                    </p>
                  </div>
                </div>
              </div>
              <CardContent className="p-8 text-center bg-card">
                <h3 className="font-heading text-2xl text-primary mb-4 font-bold">Data e hora</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  A cerimônia de formatura será transmitida ao vivo. Em seguida, celebraremos essa conquista com um jantar comemorativo que iniciará as 19:30.
                  <span className="block mt-2 text-primary font-semibold">Confirmar presença até 11/02.</span>
                </p>
                <div className="flex justify-center">
                  <Button
                    variant="outline"
                    className="border-secondary text-primary hover:bg-secondary/10"
                    onClick={() => {
                      const eventTitle = "Formatura Ana Luiza - Radiologia";
                      const eventDetails = "A cerimônia de formatura será transmitida ao vivo. Em seguida, celebraremos essa conquista com um jantar comemorativo que iniciará as 19:30. Confirmar presença até 11/02.";
                      const eventLocation = "Av. Armando Fajardo, 2353 - Igara, Canoas - RS";
                      const startDate = "20260221T193000";
                      const endDate = "20260221T223000";

                      // Detect device type
                      const userAgent = navigator.userAgent.toLowerCase();
                      const isAndroid = /android/i.test(userAgent);
                      const isIOS = /iphone|ipad|ipod/i.test(userAgent);

                      // Build base Google Calendar URL params
                      const calParams = `action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(eventDetails)}&location=${encodeURIComponent(eventLocation)}`;

                      if (isAndroid || isIOS) {
                        // Mobile: Try to open app first, fallback to web
                        // Use the standard web URL which Android/iOS will prompt to open in app
                        const mobileUrl = `https://calendar.google.com/calendar/r/eventedit?${calParams}`;
                        window.location.href = mobileUrl;
                      } else {
                        // Desktop: Open in new tab
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
                  src="https://lh3.googleusercontent.com/gps-cs-s/AG0ilSzPyMg-pH4etAp68AXMIZxAgv9D8bcskFo0Jmgu-EK3UwxUxmiOf9wK8nx_3CNyahepva8ukLrD-9mrtI_W8gwWvzTs_Ww8N-Fyz-iHdfB9iOYmjUSQUc8d27gPAuGkzmpG-bCtuw=w408-h544-k-no"
                  alt="Pizzaria Deliciatta Gourmet"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <h3 className="text-white font-script text-4xl">Pizzaria Deliciatta Gourmet</h3>
                </div>
              </div>
              <CardContent className="p-8 text-center bg-card">
                <h3 className="font-heading text-2xl text-primary mb-4 font-bold">Localização</h3>
                <p className="text-muted-foreground mb-2">
                  Av. Armando Fajardo, 2353 - Igara, Canoas - RS
                </p>
                <p className="text-primary font-medium mb-6">
                  19:30 Horas
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <a
                    href="https://maps.app.goo.gl/FoghBrwrRGTPhQjx5"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" className="border-secondary text-primary hover:bg-secondary/10 w-full sm:w-auto">
                      <MapPin className="w-4 h-4 mr-2" />
                      Google Maps
                    </Button>
                  </a>
                  <a
                    href="https://waze.com/ul?q=Av.%20Armando%20Fajardo,%202353%20-%20Igara,%20Canoas%20-%20RS"
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
