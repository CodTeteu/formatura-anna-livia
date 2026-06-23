import { motion } from "framer-motion";
import menuCardBg from "@assets/generated_images/menu_card.png";
import { MapPin, Clock, Users } from "lucide-react";

export function DinnerSection() {
    return (
        <section id="dinner" className="py-16 md:py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/5 pointer-events-none z-10" />

            <div className="container mx-auto px-5 md:px-4 relative z-10">
                <div className="text-center mb-10 md:mb-16">
                    <p className="font-body text-secondary uppercase tracking-[0.3em] text-xs font-semibold mb-4">
                        Após a Cerimônia
                    </p>
                    <h2 className="font-script text-4xl md:text-6xl text-primary mb-4">
                        Jantar no Mirante
                    </h2>
                    <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto" />
                </div>

                <div className="max-w-xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div
                            className="relative bg-[#faf9f6] p-5 md:p-10 shadow-2xl transition-transform duration-500 will-change-transform"
                            style={{
                                backgroundImage: `url(${menuCardBg})`,
                                backgroundSize: 'cover',
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                            }}
                        >
                            <div className="border border-secondary/30 h-full p-4 md:p-6 flex flex-col items-center text-center">
                                <p className="font-heading text-secondary tracking-widest text-sm uppercase mb-2">Comemoração</p>
                                <h2 className="font-script text-3xl md:text-5xl mb-4 text-primary">Mirante</h2>

                                <div className="flex flex-col items-center gap-2 mb-6 text-slate-600 text-sm">
                                    <p className="flex items-center gap-1.5">
                                        <Clock className="w-4 h-4 text-secondary" />
                                        14/08 às 22:00
                                    </p>
                                    <p className="flex items-center gap-1.5">
                                        <MapPin className="w-4 h-4 text-secondary" />
                                        Mirante - Araguaína, TO
                                    </p>
                                </div>

                                <div className="w-16 h-0.5 bg-secondary/50 mb-6" />

                                <div className="space-y-4 w-full max-w-sm text-center mb-6">
                                    <p className="font-body text-slate-700 text-sm leading-relaxed">
                                        Após a colação de grau, continuaremos a celebração com um jantar especial no Mirante.
                                    </p>
                                    <p className="font-body text-slate-700 text-sm leading-relaxed font-semibold text-primary">
                                        Cada convidado paga o seu jantar.
                                    </p>
                                </div>

                                <div className="w-full border-t border-dashed border-secondary/40 my-6" />

                                <div className="w-full max-w-sm">
                                    <h3 className="font-heading text-lg font-bold text-primary mb-4 uppercase tracking-wide flex items-center justify-center gap-2">
                                        <Users className="w-5 h-5" />
                                        Regras de Valores
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center bg-primary/5 rounded-lg px-4 py-3">
                                            <span className="font-body text-sm text-slate-700">Crianças (0 a 5 anos)</span>
                                            <span className="font-heading text-lg text-primary font-bold">Grátis</span>
                                        </div>
                                        <div className="flex justify-between items-center bg-primary/5 rounded-lg px-4 py-3">
                                            <span className="font-body text-sm text-slate-700">Crianças (6 a 9 anos)</span>
                                            <span className="font-heading text-lg text-primary font-bold">Meia</span>
                                        </div>
                                        <div className="flex justify-between items-center bg-primary/5 rounded-lg px-4 py-3">
                                            <span className="font-body text-sm text-slate-700">A partir de 10 anos</span>
                                            <span className="font-heading text-lg text-primary font-bold">Integral</span>
                                        </div>
                                    </div>
                                    <p className="text-xs text-slate-500 mt-4 italic">
                                        * Valores referentes ao jantar no Mirante. Cada convidado paga o seu.
                                    </p>
                                </div>
                            </div>

                            <div className="absolute top-4 left-4 w-4 h-4 border-l-2 border-t-2 border-secondary/40" />
                            <div className="absolute top-4 right-4 w-4 h-4 border-r-2 border-t-2 border-secondary/40" />
                            <div className="absolute bottom-4 left-4 w-4 h-4 border-l-2 border-b-2 border-secondary/40" />
                            <div className="absolute bottom-4 right-4 w-4 h-4 border-r-2 border-b-2 border-secondary/40" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
