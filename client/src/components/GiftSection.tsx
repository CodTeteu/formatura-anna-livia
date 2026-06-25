import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Gift, Copy, Check, X, Heart, ShoppingBag } from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";

const PIX_KEY = "06010236177";
const PIX_NAME = "ANNA LIVIA CARVALHO";
const PIX_BANK = "Banco do Brasil";
const PIX_KEY_TYPE = "CPF";

export function GiftSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [copied, setCopied] = useState(false);
    const [showPixModal, setShowPixModal] = useState(false);
    const { toast } = useToast();

    const handleCopyPix = async () => {
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(PIX_KEY);
            } else {
                const textArea = document.createElement("textarea");
                textArea.value = PIX_KEY;
                textArea.style.position = "fixed";
                textArea.style.left = "-9999px";
                textArea.style.top = "-9999px";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                document.execCommand("copy");
                document.body.removeChild(textArea);
            }

            setCopied(true);
            toast({
                title: "Chave Pix copiada!",
                description: "A chave foi copiada para sua área de transferência.",
            });
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            toast({
                title: "Copie manualmente",
                description: `Chave PIX: ${PIX_KEY}`,
                variant: "destructive"
            });
        }
    };

    return (
        <section id="gifts" className="relative py-10 md:py-24 overflow-hidden bg-primary" ref={ref}>
            {/* Background blobs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-secondary/10 blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-secondary/10 blur-[100px]" />
            </div>

            <div className="max-w-3xl mx-auto px-5 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    <span className="text-secondary uppercase tracking-[0.3em] text-xs font-bold bg-white/10 px-4 py-1 rounded-full backdrop-blur-sm inline-block mb-6">
                        Com Carinho
                    </span>
                    <h2 className="text-4xl md:text-6xl font-script text-white mb-6">Lista de Presentes</h2>

                    <p className="text-white/80 leading-relaxed font-body text-lg mb-4">
                        O presente mais importante para mim é ter você comigo nesse dia tão especial!
                    </p>
                    <p className="text-white/70 leading-relaxed font-body text-base mb-10 max-w-2xl mx-auto">
                        Mas, se desejar me presentear de outra forma, preparei uma lista com algumas sugestões para me ajudar a começar essa nova fase profissional como enfermeira com muito carinho 💚
                    </p>

                    {/* Buttons: Lista de Presentes + PIX */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/lista-presentes" className="w-full sm:w-auto">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.95 }}
                                className="group relative flex items-center justify-center px-8 py-4 overflow-hidden font-medium transition duration-300 ease-out border border-transparent rounded-full shadow-lg bg-secondary hover:bg-secondary/90 cursor-pointer w-full sm:w-auto min-w-[220px]"
                            >
                                <span className="flex items-center gap-2 uppercase tracking-widest text-xs font-bold text-primary">
                                    <ShoppingBag className="w-5 h-5" /> Escolher Presentes
                                </span>
                            </motion.div>
                        </Link>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowPixModal(true)}
                            className="group relative flex items-center justify-center px-8 py-4 overflow-hidden font-medium transition duration-300 ease-out border-2 border-secondary rounded-full shadow-lg bg-transparent hover:bg-secondary hover:text-primary cursor-pointer w-full sm:w-auto min-w-[220px] text-secondary"
                        >
                            <span className="flex items-center gap-2 uppercase tracking-widest text-xs font-bold">
                                <Gift className="w-5 h-5" /> Presentear com Pix
                            </span>
                        </motion.button>
                    </div>
                </motion.div>
            </div>

            {/* PIX Modal/Popup */}
            {showPixModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in"
                        onClick={() => setShowPixModal(false)}
                    ></div>

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="relative bg-[#0d2818] border border-white/10 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setShowPixModal(false)}
                            className="absolute top-4 right-4 p-2 text-white/60 hover:text-white transition-colors z-10"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Decorative top border */}
                        <div className="h-2 bg-gradient-to-r from-secondary to-secondary/40"></div>

                        {/* Content */}
                        <div className="p-6 md:p-8">
                            {/* Icon & Title */}
                            <div className="text-center mb-6">
                                <div className="w-16 h-16 bg-secondary/15 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Heart className="w-8 h-8 text-secondary" />
                                </div>
                                <h3 className="text-2xl font-heading text-white font-bold mb-2">Obrigado por me presentear!</h3>
                                <p className="text-white/60 text-sm">
                                    Sua generosidade significa muito para mim. Use a chave abaixo para fazer seu PIX.
                                </p>
                            </div>

                            <div className="flex flex-col items-center gap-6">
                                {/* Bank Info */}
                                <div className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-left">
                                    <p className="text-sm text-white font-bold font-heading">{PIX_NAME}</p>
                                    <div className="flex justify-between items-center mt-1">
                                        <p className="text-xs text-white/60">{PIX_BANK} · {PIX_KEY_TYPE}</p>
                                    </div>
                                </div>

                                {/* PIX Key Copyable */}
                                <div className="w-full">
                                    <div
                                        className="bg-white/5 p-4 rounded-xl border border-white/10 flex items-center justify-between group cursor-pointer hover:border-secondary transition-colors"
                                        onClick={handleCopyPix}
                                    >
                                        <span className="font-mono text-sm text-white truncate px-2 select-all font-bold">
                                            {PIX_KEY}
                                        </span>
                                        <button className="text-secondary group-hover:scale-110 transition-transform">
                                            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>

                                <button
                                    onClick={handleCopyPix}
                                    className="w-full bg-secondary hover:bg-secondary/90 text-primary py-3 rounded-lg text-sm font-bold uppercase tracking-widest transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    {copied ? (
                                        <>
                                            <Check className="w-4 h-4" /> Copiado!
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="w-4 h-4" /> Copiar Chave PIX
                                        </>
                                    )}
                                </button>

                                <p className="text-center text-white/50 text-xs italic">
                                    O valor vai diretamente para a formanda 🎓
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </section>
    );
}

