import { motion } from "framer-motion";
import menuCardBg from "@assets/generated_images/menu_card.png";
import { MapPin, Instagram, Clock } from "lucide-react";

export function DinnerSection() {
    return (
        <section id="dinner" className="py-16 md:py-24 relative overflow-hidden">
            {/* Optional darker overlay if background is too light */}
            <div className="absolute inset-0 bg-black/5 pointer-events-none z-10" />

            <div className="container mx-auto px-5 md:px-4 relative z-10">
                <div className="text-center mb-10 md:mb-16">
                    <p className="font-body text-secondary uppercase tracking-[0.3em] text-xs font-semibold mb-4">
                        Cardápio e valores
                    </p>
                    <h2 className="font-script text-4xl md:text-6xl text-primary mb-4">
                        Jantar de Formatura
                    </h2>
                    <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto" />
                </div>

                <div className="max-w-xl mx-auto">
                    {/* Menu Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        {/* Card Container */}
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
                                <h2 className="font-script text-3xl md:text-5xl mb-4 text-primary">Deliciatta Gourmet</h2>

                                <div className="flex flex-col items-center gap-2 mb-6 text-slate-600 text-sm">
                                    <p className="flex items-center gap-1.5">
                                        <Clock className="w-4 h-4 text-secondary" />
                                        21/02 às 19:30
                                    </p>
                                    <p className="flex items-center gap-1.5">
                                        <MapPin className="w-4 h-4 text-secondary" />
                                        Av. Armando Fajardo, 2353 - Igara, Canoas
                                    </p>
                                    <a href="https://www.instagram.com/deliciattagourmet?igsh=MW9jNXpnNzV4ZzdkNw==" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-secondary transition-colors cursor-pointer">
                                        <Instagram className="w-4 h-4 text-secondary" />
                                        @deliciattagourmet
                                    </a>
                                </div>

                                <div className="w-16 h-0.5 bg-secondary/50 mb-6" />

                                <div className="space-y-6 w-full max-w-sm text-center">
                                    <div>
                                        <h3 className="font-heading text-xl font-bold text-primary mb-2 uppercase tracking-wide">Rodízio Completo</h3>
                                        <p className="font-body text-slate-700 italic text-sm">Pizzas variadas, batata frita, polenta, massas, lasanha à bolonhesa e quatro queijos.</p>
                                        <p className="font-body text-slate-700 italic text-sm mt-1">Buffet de saladas e sobremesas incluído.</p>
                                    </div>

                                    <div>
                                        <h3 className="font-heading text-xl font-bold text-primary mb-2 uppercase tracking-wide">Bebidas</h3>
                                        <p className="font-body text-slate-700 italic text-sm">Incluso refrigerante e água sem gás.</p>
                                    </div>
                                </div>

                                <div className="w-full border-t border-dashed border-secondary/40 my-6" />

                                <div className="grid grid-cols-2 gap-4 w-full">
                                    <div className="text-center">
                                        <span className="block text-[10px] uppercase tracking-wider text-slate-500 mb-1">Individual (Sáb)</span>
                                        <span className="font-heading text-xl text-primary font-bold">R$ 74,90</span>
                                    </div>
                                    <div className="text-center">
                                        <span className="block text-[10px] uppercase tracking-wider text-slate-500 mb-1">Idosos (65+)</span>
                                        <span className="font-heading text-xl text-primary font-bold">R$ 54,90</span>
                                    </div>
                                    <div className="text-center col-span-2">
                                        <span className="block text-[10px] uppercase tracking-wider text-slate-500 mb-1">Crianças (6-10 anos)</span>
                                        <span className="font-heading text-xl text-primary font-bold">Meia Entrada</span>
                                        <span className="block text-[10px] italic text-slate-400 mt-1">* 0-5 anos isento</span>
                                    </div>
                                </div>

                            </div>

                            {/* Decorative Card Elements */}
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
