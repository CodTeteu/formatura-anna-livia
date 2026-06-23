import { motion } from "framer-motion";
import { Gift, Copy, CheckCircle2, Heart, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const GIFTS = [
    { icon: "💊", name: "Pijama Cirúrgico", detail: "cor azul escuro (M)" },
    { icon: "🩺", name: "Touca", detail: "azul escuro" },
    { icon: "🖊️", name: "Caneta", detail: "" },
    { icon: "📎", name: "Carimbo", detail: "" },
    { icon: "🥤", name: "Garrafa Térmica", detail: "" },
    { icon: "🎒", name: "Mochila", detail: "" },
    { icon: "👜", name: "Necessaire", detail: "" },
    { icon: "💰", name: "Vale Presente ou PIX", detail: "" },
];

export function GiftSection() {
    const [copied, setCopied] = useState(false);
    const pixKey = "06010236177";
    const pixName = "ANNA LIVIA CARVALHO";
    const pixBank = "Banco do Brasil";

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section id="gifts" className="py-16 md:py-24 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background pointer-events-none" />

            <div className="container mx-auto px-5 md:px-4 relative z-10">
                <div className="text-center mb-10 md:mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-center gap-2 mb-4"
                    >
                        <Sparkles className="w-4 h-4 text-secondary" />
                        <p className="font-body text-secondary uppercase tracking-[0.3em] text-xs font-semibold">
                            Presentes
                        </p>
                        <Sparkles className="w-4 h-4 text-secondary" />
                    </motion.div>
                    <h2 className="font-script text-4xl md:text-6xl text-primary mb-4">
                        Lista de Presentes
                    </h2>
                    <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto" />
                    <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base mt-6 leading-relaxed">
                        Sua presença em minha formatura já é um presente! Mas, para aqueles que desejarem me
                        presentear, preparei uma lista com itens que irão me acompanhar nessa nova fase da minha
                        trajetória como enfermeira.
                    </p>
                </div>

                <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    {/* Gift List */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <Card className="border-primary/10 shadow-xl overflow-hidden">
                            <div className="bg-primary p-5 flex items-center gap-3">
                                <Gift className="w-5 h-5 text-secondary" />
                                <h3 className="font-heading text-xl font-bold text-white">
                                    Itens da Lista
                                </h3>
                            </div>
                            <CardContent className="p-0">
                                <ul className="divide-y divide-primary/5">
                                    {GIFTS.map((gift, index) => (
                                        <motion.li
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.05 }}
                                            className="flex items-center gap-4 px-6 py-4 hover:bg-primary/5 transition-colors"
                                        >
                                            <span className="text-2xl w-10 text-center flex-shrink-0">{gift.icon}</span>
                                            <div className="flex-1">
                                                <span className="font-body font-medium text-primary block">{gift.name}</span>
                                                {gift.detail && (
                                                    <span className="text-xs text-muted-foreground">{gift.detail}</span>
                                                )}
                                            </div>
                                        </motion.li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* PIX Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <Card className="border-primary/10 shadow-xl overflow-hidden">
                            <div className="bg-secondary p-5 flex items-center gap-3">
                                <Heart className="w-5 h-5 text-primary" />
                                <h3 className="font-heading text-xl font-bold text-primary">
                                    Chave PIX
                                </h3>
                            </div>
                            <CardContent className="p-6 space-y-5">
                                {/* PIX Key Display */}
                                <div className="bg-primary/5 rounded-xl p-5 border border-primary/10">
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-muted-foreground uppercase tracking-wider">Chave (CPF)</span>
                                            <button
                                                onClick={() => copyToClipboard(pixKey)}
                                                className="text-secondary hover:text-secondary/80 transition-colors"
                                            >
                                                {copied ? (
                                                    <CheckCircle2 className="w-4 h-4" />
                                                ) : (
                                                    <Copy className="w-4 h-4" />
                                                )}
                                            </button>
                                        </div>
                                        <p className="font-mono text-lg font-bold text-primary tracking-wide">{pixKey}</p>
                                    </div>
                                </div>

                                <div className="bg-primary/5 rounded-xl p-5 border border-primary/10">
                                    <div className="space-y-3">
                                        <span className="text-xs text-muted-foreground uppercase tracking-wider block">Beneficiário</span>
                                        <p className="font-heading text-lg font-bold text-primary">{pixName}</p>
                                    </div>
                                </div>

                                <div className="bg-primary/5 rounded-xl p-5 border border-primary/10">
                                    <div className="space-y-3">
                                        <span className="text-xs text-muted-foreground uppercase tracking-wider block">Instituição</span>
                                        <p className="font-heading text-lg font-bold text-primary">{pixBank}</p>
                                    </div>
                                </div>

                                {/* Copy Button */}
                                <Button
                                    onClick={() => copyToClipboard(pixKey)}
                                    className="w-full bg-secondary hover:bg-secondary/90 text-primary font-bold py-6 text-base rounded-xl transition-all shadow-lg"
                                >
                                    {copied ? (
                                        <>
                                            <CheckCircle2 className="w-5 h-5 mr-2" />
                                            Chave Copiada!
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="w-5 h-5 mr-2" />
                                            Copiar Chave PIX
                                        </>
                                    )}
                                </Button>

                                <p className="text-center text-xs text-muted-foreground italic">
                                    Agradecemos imensamente todo o carinho e apoio! ❤️
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
