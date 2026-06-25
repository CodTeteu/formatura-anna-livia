import { motion } from "framer-motion";
import menuCardBg from "@assets/generated_images/menu_card.png";

export function DinnerSection() {
    return (
        <section id="cardapio" className="pt-10 pb-8 md:py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/5 pointer-events-none z-10" />

            <div className="container mx-auto px-5 md:px-4 relative z-10">
                <div className="text-center mb-10 md:mb-16">
                    <p className="font-body text-secondary uppercase tracking-[0.3em] text-xs font-semibold mb-4">
                        Cardápio
                    </p>
                    <h2 className="font-script text-4xl md:text-6xl text-primary mb-4">
                        Jantar de Formatura
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
                                <p className="font-heading text-secondary tracking-widest text-sm uppercase mb-2">Cardápio</p>
                                <h2 className="font-script text-3xl md:text-5xl mb-4 text-primary">Rodízio de Massas</h2>

                                <div className="w-16 h-0.5 bg-secondary/50 mb-6" />

                                <div className="space-y-6 w-full max-w-sm text-center">
                                    {/* Entradas */}
                                    <div>
                                        <h3 className="font-heading text-xl font-bold text-primary mb-2 uppercase tracking-wide">Entradas</h3>
                                        <p className="font-body text-slate-700 italic text-sm">
                                            Batata frita, bolinho de mandioca com carne de sol, quibe frito, croquete, anel de cebola, pizzas variadas.
                                        </p>
                                    </div>

                                    {/* Massas */}
                                    <div>
                                        <h3 className="font-heading text-xl font-bold text-primary mb-2 uppercase tracking-wide">Massas</h3>
                                        <p className="font-body text-slate-700 italic text-sm">
                                            Macarrão ao alho e óleo, macarrão à bolonhesa, lasanha de frango, lasanha à bolonhesa.
                                        </p>
                                    </div>

                                    {/* Bebidas */}
                                    <div>
                                        <h3 className="font-heading text-xl font-bold text-primary mb-2 uppercase tracking-wide">Bebidas Inclusas</h3>
                                        <p className="font-body text-slate-700 italic text-sm">
                                            Água sem gás, refrigerante, 2 tipos de suco (exceto laranja).
                                        </p>
                                    </div>

                                    {/* Sobremesas */}
                                    <div>
                                        <h3 className="font-heading text-xl font-bold text-primary mb-2 uppercase tracking-wide">Sobremesas</h3>
                                        <p className="font-body text-slate-700 italic text-sm">
                                            Pizza doce de brigadeiro com sorvete, pizza doce de banana com canela, pizza doce de goiabada com queijo.
                                        </p>
                                    </div>
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
