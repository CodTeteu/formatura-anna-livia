import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Copy, MonitorPlay } from "lucide-react";
import liveStreamImg from "@assets/generated_images/live_stream.png";

export function LiveStreamSection() {
    const youtubeLink = "https://youtube.com/@canalvipprodutora?si=2bHUOHLxFA52b90p";

    const copyToClipboard = () => {
        navigator.clipboard.writeText(youtubeLink);
        // You could add a toast notification here
        alert("Link copiado!");
    };

    return (
        <section id="livestream" className="pt-4 pb-16 md:py-24 bg-primary text-white relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-secondary blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-secondary blur-[100px]" />
            </div>

            <div className="container mx-auto px-5 md:px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse flex items-center gap-2">
                                <span className="w-2 h-2 bg-white rounded-full" />
                                AO VIVO
                            </span>
                            <p className="font-body text-secondary uppercase tracking-[0.3em] text-xs font-semibold">
                                Transmissão Oficial
                            </p>
                        </div>

                        <h2 className="font-script text-4xl md:text-7xl mb-6 md:mb-8">
                            Acompanhe de Onde Estiver
                        </h2>
                        <p className="text-white/80 text-base md:text-lg leading-relaxed mb-8 md:mb-10 font-light">
                            Sabemos que nem todos poderão estar presentes fisicamente, mas queremos que você faça parte deste momento especial.
                            A cerimônia será transmitida ao vivo em alta definição pelo YouTube.
                        </p>

                        <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 md:p-8 border border-white/20 mb-8">
                            <h4 className="text-secondary font-heading text-xl font-bold mb-4 flex items-center gap-2">
                                <MonitorPlay className="w-5 h-5" />
                                Link da Transmissão
                            </h4>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex-1 bg-black/30 rounded-lg px-3 md:px-4 py-3 text-white/90 font-mono text-xs md:text-sm border border-white/10 break-all">
                                    {youtubeLink}
                                </div>
                                <Button
                                    onClick={copyToClipboard}
                                    variant="secondary"
                                    className="font-bold shrink-0"
                                >
                                    <Copy className="w-4 h-4 mr-2" />
                                    Copiar Link
                                </Button>
                            </div>

                        </div>

                        <div className="flex gap-4">
                            <Button
                                size="lg"
                                className="bg-red-600 hover:bg-red-700 text-white font-bold text-base md:text-lg px-6 md:px-8 py-5 md:py-6 rounded-full w-full transition-all shadow-lg hover:shadow-red-900/50 min-h-[52px]"
                                asChild
                            >
                                <a href={youtubeLink} target="_blank" rel="noopener noreferrer">
                                    <MonitorPlay className="w-6 h-6 mr-2" />
                                    Acessar Canal no YouTube
                                </a>
                            </Button>
                        </div>

                    </motion.div>

                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative hidden lg:block"
                    >
                        <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-secondary/50 group cursor-pointer">
                            <img
                                src={liveStreamImg}
                                alt="Transmissão ao Vivo"
                                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <MonitorPlay className="w-20 h-20 text-white drop-shadow-lg" />
                            </div>
                        </div>
                        {/* Backdrop Elements */}
                        <div className="absolute -inset-4 bg-secondary/10 -rotate-3 rounded-2xl -z-10 blur-sm" />
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
