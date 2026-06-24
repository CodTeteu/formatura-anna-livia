import { motion } from "framer-motion";
import { Gift, Sparkles } from "lucide-react";
import { Link } from "wouter";

const assetPath = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

export function GiftSection() {
    return (
        <section id="gifts" className="py-16 md:py-24 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background pointer-events-none" />

            <div className="container mx-auto px-5 md:px-4 relative z-10">
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Text Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center md:text-left order-2 md:order-1"
                    >
                        <div className="flex items-center justify-center md:justify-start gap-2 mb-6">
                            <Sparkles className="w-4 h-4 text-secondary" />
                            <span className="text-secondary uppercase tracking-[0.3em] text-xs font-bold bg-card/70 px-4 py-1 rounded-full backdrop-blur-sm shadow-sm">
                                Lista de Presentes
                            </span>
                            <Sparkles className="w-4 h-4 text-secondary" />
                        </div>
                        <h2 className="font-script text-4xl md:text-6xl text-primary mb-6">Lista de Presentes</h2>
                        <p className="text-muted-foreground leading-relaxed font-body text-lg mb-8">
                            Sua presença é o maior presente. Preparamos uma lista para quem desejar contribuir com
                            algum presente nessa nova fase da minha trajetória como enfermeira.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                                <Link
                                    to="/lista-presentes"
                                    className="group relative flex items-center justify-center px-8 py-4 overflow-hidden font-medium text-white transition duration-300 ease-out border border-transparent rounded-full shadow-lg bg-primary hover:bg-primary/90 cursor-pointer w-full sm:w-auto min-w-[240px] whitespace-nowrap"
                                >
                                    <span className="flex items-center gap-2 uppercase tracking-widest text-xs font-bold">
                                        <Gift className="w-5 h-5" /> Escolher presentes
                                    </span>
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Image Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative block md:mt-0 order-1 md:order-2"
                    >
                        <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-all duration-700 border-4 border-card">
                            <img
                                src={assetPath("/assets/gallery/gallery_01.jpg")}
                                alt="Anna Lívia"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>
                        {/* Decorative small card */}
                        <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-lg shadow-xl -rotate-6 z-20 max-w-[180px] hidden sm:block">
                            <p className="font-script text-2xl text-primary text-center">Enfermagem</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
