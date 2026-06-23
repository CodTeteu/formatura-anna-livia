import { motion } from "framer-motion";
import { Gift, Copy, Check, QrCode, Heart, Sparkles, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const GIFTS = [
    { name: "Pijama Cirúrgico", detail: "cor azul escuro (M)", price: "R$" },
    { name: "Touca", detail: "azul escuro", price: "R$" },
    { name: "Caneta", detail: "", price: "R$" },
    { name: "Carimbo", detail: "", price: "R$" },
    { name: "Garrafa Térmica", detail: "", price: "R$" },
    { name: "Mochila", detail: "", price: "R$" },
    { name: "Necessaire", detail: "", price: "R$" },
    { name: "Vale Presente ou PIX", detail: "", price: "" },
];

const PIX_KEY = "06010236177";
const PIX_NAME = "ANNA LIVIA CARVALHO";
const PIX_BANK = "Banco do Brasil";

export function GiftSection() {
    const [copied, setCopied] = useState(false);
    const [selectedGifts, setSelectedGifts] = useState<number[]>([]);

    const toggleGift = (index: number) => {
        setSelectedGifts(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [...prev, index]
        );
    };

    const copyPixKey = async () => {
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(PIX_KEY);
            } else {
                const textArea = document.createElement('textarea');
                textArea.value = PIX_KEY;
                textArea.style.position = 'fixed';
                textArea.style.left = '-9999px';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
            }
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Silent fail
        }
    };

    return (
        <section id="gifts" className="py-16 md:py-24 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background pointer-events-none" />

            <div className="container mx-auto px-5 md:px-4 relative z-10">
                {/* Header */}
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
                        trajetória como enfermeira. Agradeço imensamente todo o carinho e apoio recebido ao
                        longo dessa caminhada.
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
                        <div className="bg-card rounded-2xl border border-primary/10 shadow-xl overflow-hidden">
                            {/* Header */}
                            <div className="bg-primary p-5 flex items-center gap-3">
                                <Gift className="w-5 h-5 text-secondary" />
                                <h3 className="font-heading text-xl font-bold text-white">
                                    Itens da Lista
                                </h3>
                                {selectedGifts.length > 0 && (
                                    <span className="ml-auto bg-secondary text-primary text-xs font-bold px-3 py-1 rounded-full">
                                        {selectedGifts.length} {selectedGifts.length === 1 ? 'item' : 'itens'}
                                    </span>
                                )}
                            </div>

                            {/* Gift Items */}
                            <div className="divide-y divide-primary/5">
                                {GIFTS.map((gift, index) => {
                                    const isSelected = selectedGifts.includes(index);
                                    return (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.05 }}
                                            onClick={() => toggleGift(index)}
                                            className={`flex items-center gap-4 px-6 py-4 cursor-pointer transition-all ${
                                                isSelected
                                                    ? 'bg-secondary/10 border-l-4 border-l-secondary'
                                                    : 'hover:bg-primary/5 border-l-4 border-l-transparent'
                                            }`}
                                        >
                                            <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                                                isSelected
                                                    ? 'bg-secondary border-secondary'
                                                    : 'border-primary/20'
                                            }`}>
                                                {isSelected && <Check className="w-4 h-4 text-primary" />}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <span className={`font-body font-medium block ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                                                    {gift.name}
                                                </span>
                                                {gift.detail && (
                                                    <span className="text-xs text-muted-foreground">{gift.detail}</span>
                                                )}
                                            </div>
                                            {gift.price && (
                                                <span className="text-sm font-heading font-bold text-primary/60">
                                                    {gift.price}
                                                </span>
                                            )}
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {/* Info */}
                            <div className="p-4 bg-primary/5 border-t border-primary/10">
                                <p className="text-center text-xs text-muted-foreground">
                                    Toque nos itens para selecionar. Informe o valor via PIX.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* PIX Payment */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="bg-card rounded-2xl border border-primary/10 shadow-xl overflow-hidden">
                            {/* Header */}
                            <div className="bg-secondary p-5 flex items-center gap-3">
                                <QrCode className="w-5 h-5 text-primary" />
                                <h3 className="font-heading text-xl font-bold text-primary">
                                    Pagamento via PIX
                                </h3>
                            </div>

                            <div className="p-6 space-y-5">
                                {/* Selected Items Summary */}
                                {selectedGifts.length > 0 && (
                                    <div className="bg-gradient-to-br from-muted to-background rounded-2xl p-4 border border-border shadow-sm">
                                        <div className="flex items-center gap-2 mb-3">
                                            <ShoppingCart className="w-4 h-4 text-primary" />
                                            <span className="text-xs font-medium text-muted-foreground">
                                                {selectedGifts.length} {selectedGifts.length === 1 ? 'item selecionado' : 'itens selecionados'}
                                            </span>
                                        </div>
                                        <div className="space-y-1">
                                            {selectedGifts.map(idx => (
                                                <p key={idx} className="text-sm text-foreground font-medium">
                                                    • {GIFTS[idx].name}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* PIX Guidance */}
                                <div className="flex justify-center">
                                    <div className="flex w-full max-w-xs flex-col items-center rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 p-5 text-center shadow-lg">
                                        <QrCode className="mb-3 h-10 w-10 text-primary" />
                                        <p className="text-sm font-bold text-foreground">Use a chave PIX abaixo</p>
                                        <p className="mt-1 text-xs text-muted-foreground">
                                            Copie a chave e faça o pagamento pelo seu banco
                                        </p>
                                    </div>
                                </div>

                                {/* Bank Info */}
                                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-orange-100 rounded-xl p-3 text-center">
                                    <p className="text-sm text-orange-900 font-heading font-bold">{PIX_NAME}</p>
                                    <p className="text-xs text-orange-600 mt-0.5">{PIX_BANK}</p>
                                </div>

                                {/* PIX Key - Copy Button */}
                                <button
                                    onClick={copyPixKey}
                                    className={`w-full p-4 rounded-xl flex items-center justify-between group transition-all ${
                                        copied
                                            ? 'bg-green-500 text-white'
                                            : 'bg-muted hover:bg-accent'
                                    }`}
                                >
                                    <span className={`font-mono text-xs truncate ${copied ? 'text-white' : 'text-foreground'}`}>
                                        {PIX_KEY}
                                    </span>
                                    <div className={`flex items-center gap-1.5 text-xs font-medium flex-shrink-0 ml-3 ${copied ? 'text-white' : 'text-primary'}`}>
                                        {copied ? (
                                            <><Check className="w-4 h-4" /> Copiado!</>
                                        ) : (
                                            <><Copy className="w-4 h-4" /> Copiar</>
                                        )}
                                    </div>
                                </button>

                                {/* WhatsApp Confirmation */}
                                <button
                                    onClick={() => {
                                        const giftNames = selectedGifts.length > 0
                                            ? selectedGifts.map(idx => GIFTS[idx].name).join(', ')
                                            : 'um presente';
                                        const message = `Olá! Acabei de fazer um PIX para presentear a Anna Lívia na formatura! 🎓\n\nPresente(s): ${giftNames}\n\nQue Deus abençoe essa nova fase! ❤️`;
                                        window.open(`https://wa.me/5563985001811?text=${encodeURIComponent(message)}`, '_blank');
                                    }}
                                    className="w-full mt-2 bg-green-500 hover:bg-green-600 text-white py-3.5 rounded-xl font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 shadow-lg"
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    Confirmar pelo WhatsApp
                                </button>

                                <p className="text-center text-muted-foreground text-[10px]">
                                    Após o pagamento, confirme pelo WhatsApp
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
