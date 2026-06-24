import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Gift, Search, X, ShoppingCart, Plus, Filter, Check, Copy, QrCode } from "lucide-react";

const assetPath = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

const PIX_KEY = "06010236177";
const PIX_NAME = "ANNA LIVIA CARVALHO";
const PIX_BANK = "Banco do Brasil";
const WHATSAPP_NUMBER = "5563985001811";

interface GiftItem {
    id: number;
    name: string;
    description: string;
    category: string;
    emoji: string;
}

const GIFTS: GiftItem[] = [
    { id: 1, name: "Pijama Cirúrgico", description: "Cor azul escuro, tamanho M", category: "Uniformes", emoji: "💊" },
    { id: 2, name: "Touca Cirúrgica", description: "Cor azul escuro", category: "Uniformes", emoji: "🩺" },
    { id: 3, name: "Caneta", description: "Caneta profissional para registros", category: "Utensílios", emoji: "🖊️" },
    { id: 4, name: "Carimbo", description: "Carimbo pessoal profissional", category: "Utensílios", emoji: "📎" },
    { id: 5, name: "Garrafa Térmica", description: "Para manter a hidratação durante o plantão", category: "Utensílios", emoji: "🥤" },
    { id: 6, name: "Mochila", description: "Mochila funcional para trabalhos e deslocamentos", category: "Acessórios", emoji: "🎒" },
    { id: 7, name: "Necessaire", description: "Necessaire para organizar pertences", category: "Acessórios", emoji: "👜" },
    { id: 8, name: "Vale Presente", description: "Contribuição livre via PIX para Anna escolher", category: "PIX", emoji: "💰" },
];

const categories = ["Todas", "Uniformes", "Utensílios", "Acessórios", "PIX"];

export function GiftListPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Todas");
    const [selectedGifts, setSelectedGifts] = useState<number[]>([]);
    const [showPixPanel, setShowPixPanel] = useState(false);
    const [copied, setCopied] = useState(false);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    const toggleGift = (id: number) => {
        setSelectedGifts(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const filteredGifts = GIFTS.filter(gift => {
        const matchesSearch = gift.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            gift.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "Todas" || gift.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const copyPixKey = async () => {
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(PIX_KEY);
            } else {
                const textArea = document.createElement("textarea");
                textArea.value = PIX_KEY;
                textArea.style.position = "fixed";
                textArea.style.left = "-9999px";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                document.execCommand("copy");
                document.body.removeChild(textArea);
            }
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch { /* silent */ }
    };

    const sendWhatsApp = () => {
        const selectedNames = selectedGifts.length > 0
            ? selectedGifts.map(id => GIFTS.find(g => g.id === id)?.name).filter(Boolean).join(", ")
            : "um presente";
        const message = `Olá! Acabei de fazer um PIX para presentear a Anna Lívia na formatura! 🎓\n\nPresente(s): ${selectedNames}\n\nQue Deus abençoe essa nova fase! ❤️`;
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
    };

    return (
        <div className="min-h-screen bg-background font-body">
            {/* Background */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-20">
                {/* Header */}
                <header className="bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-40 shadow-sm">
                    <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <Link to="/" className="text-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-muted">
                                <ArrowLeft className="w-6 h-6" />
                            </Link>
                            <div>
                                <h1 className="text-xl md:text-2xl font-script text-foreground">Lista de Presentes</h1>
                                <p className="text-[10px] md:text-xs text-primary uppercase tracking-widest font-bold">Anna Lívia</p>
                            </div>
                        </div>

                        <button
                            onClick={() => setShowPixPanel(!showPixPanel)}
                            className="relative p-2 text-foreground hover:text-primary transition-colors"
                        >
                            <ShoppingCart className="w-6 h-6" />
                            {selectedGifts.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-lg">
                                    {selectedGifts.length}
                                </span>
                            )}
                        </button>
                    </div>

                    {/* Search and Filter (Desktop) */}
                    <div className="container mx-auto px-4 pb-4 hidden md:block">
                        <div className="flex gap-4 max-w-2xl mx-auto">
                            <div className="flex-1 relative group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="text"
                                    placeholder="O que você procura?"
                                    className="w-full bg-background border border-border text-foreground rounded-full py-3 pl-12 pr-4 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground shadow-sm"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="relative">
                                <select
                                    className="appearance-none bg-background border border-border text-foreground rounded-full py-3 pl-6 pr-12 focus:outline-none focus:border-primary cursor-pointer hover:bg-muted transition-all shadow-sm"
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                >
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                                <Filter className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Mobile Filter */}
                <div className="md:hidden sticky top-[73px] z-30 bg-background/95 backdrop-blur-md border-b border-border py-3 px-4 shadow-sm">
                    <div className="flex gap-3">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Buscar presente..."
                                className="w-full bg-background border border-border text-foreground text-sm rounded-lg py-2 pl-9 pr-3 focus:outline-none focus:border-primary shadow-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button
                            onClick={() => setIsMobileFilterOpen(true)}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border shadow-sm ${selectedCategory !== "Todas" ? "bg-primary border-primary text-primary-foreground" : "bg-background border-border text-foreground"}`}
                        >
                            <Filter className="w-4 h-4" />
                            <span className="max-w-[80px] truncate">{selectedCategory === "Todas" ? "Filtros" : selectedCategory}</span>
                        </button>
                    </div>
                </div>

                {/* Gift Grid */}
                <main className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
                    {filteredGifts.length === 0 ? (
                        <div className="text-center py-16 bg-card rounded-2xl border border-border mx-auto max-w-2xl shadow-sm">
                            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6 text-muted-foreground">
                                <Search className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-heading text-foreground mb-2">Nenhum presente encontrado</h3>
                            <p className="text-muted-foreground">Tente buscar por outro termo ou categoria.</p>
                            <button
                                onClick={() => { setSearchTerm(""); setSelectedCategory("Todas"); }}
                                className="mt-6 text-primary hover:text-foreground underline transition-colors"
                            >
                                Limpar filtros
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                            {filteredGifts.map(gift => {
                                const isSelected = selectedGifts.includes(gift.id);
                                return (
                                    <div
                                        key={gift.id}
                                        onClick={() => toggleGift(gift.id)}
                                        className={`bg-card group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border flex flex-col h-full transform hover:-translate-y-1 cursor-pointer ${
                                            isSelected ? "border-secondary ring-2 ring-secondary/30" : "border-border"
                                        }`}
                                    >
                                        {/* Emoji Header */}
                                        <div className={`relative aspect-square overflow-hidden flex items-center justify-center ${isSelected ? "bg-secondary/10" : "bg-muted"}`}>
                                            <span className="text-6xl md:text-7xl">{gift.emoji}</span>

                                            {/* Category Badge */}
                                            <div className="absolute top-3 left-3">
                                                <span className="px-2 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded-md border border-white/10">
                                                    {gift.category}
                                                </span>
                                            </div>

                                            {/* Selection Indicator */}
                                            <div className={`absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                                                isSelected ? "bg-secondary text-primary scale-110" : "bg-white/20 text-white"
                                            }`}>
                                                {isSelected && <Check className="w-4 h-4" />}
                                            </div>

                                            {/* Hover Overlay */}
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                                                <span className="bg-background text-foreground px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs flex items-center gap-2 shadow-xl">
                                                    {isSelected ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                                    {isSelected ? "Selecionado" : "Selecionar"}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-4 flex flex-col flex-1 bg-card relative z-10">
                                            <h3 className="text-foreground font-heading text-lg leading-tight mb-1 group-hover:text-primary transition-colors line-clamp-2 min-h-[50px]">
                                                {gift.name}
                                            </h3>
                                            <p className="text-xs text-muted-foreground line-clamp-2 flex-1 font-body leading-relaxed">
                                                {gift.description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </main>
            </div>

            {/* Mobile Category Bottom Sheet */}
            {isMobileFilterOpen && (
                <div className="fixed inset-0 z-[60] md:hidden">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileFilterOpen(false)} />
                    <div className="absolute bottom-0 left-0 right-0 bg-background rounded-t-3xl p-6 border-t border-border max-h-[80vh] overflow-y-auto shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-heading text-foreground">Filtrar por Categoria</h3>
                            <button onClick={() => setIsMobileFilterOpen(false)} className="text-muted-foreground p-2"><X className="w-6 h-6" /></button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => {
                                        setSelectedCategory(cat);
                                        setIsMobileFilterOpen(false);
                                        window.scrollTo({ top: 0, behavior: "smooth" });
                                    }}
                                    className={`p-4 rounded-xl text-sm font-bold uppercase tracking-wider text-left transition-all ${selectedCategory === cat
                                        ? "bg-primary text-primary-foreground shadow-lg"
                                        : "bg-muted text-foreground hover:bg-accent border border-border"
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Floating Cart Button (Mobile) */}
            {selectedGifts.length > 0 && (
                <div className="fixed bottom-6 right-6 z-40 md:hidden">
                    <button
                        onClick={() => setShowPixPanel(true)}
                        className="bg-secondary text-primary p-4 rounded-full shadow-2xl flex items-center gap-3 pr-6 hover:scale-105 active:scale-95 transition-all"
                    >
                        <div className="relative">
                            <ShoppingCart className="w-6 h-6" />
                            <span className="absolute -top-2 -right-2 bg-primary text-secondary text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                                {selectedGifts.length}
                            </span>
                        </div>
                        <span className="font-bold text-sm">PIX</span>
                    </button>
                </div>
            )}

            {/* PIX Side Panel */}
            {showPixPanel && (
                <div className="fixed inset-0 z-[100]">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowPixPanel(false)} />
                    <div className="absolute top-0 right-0 bottom-0 w-full max-w-md bg-background shadow-2xl flex flex-col animate-slide-in-right">
                        {/* Header */}
                        <div className="bg-primary p-5 flex items-center justify-between">
                            <div className="flex items-center gap-3 text-white">
                                <QrCode className="w-5 h-5" />
                                <h2 className="font-heading text-lg">Pagamento via PIX</h2>
                            </div>
                            <button onClick={() => setShowPixPanel(false)} className="text-white/80 hover:text-white p-2">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-5">
                            {/* Selected Items */}
                            {selectedGifts.length > 0 ? (
                                <div className="bg-gradient-to-br from-muted to-background rounded-2xl p-4 border border-border shadow-sm">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Gift className="w-4 h-4 text-primary" />
                                        <span className="text-xs font-medium text-muted-foreground">
                                            {selectedGifts.length} {selectedGifts.length === 1 ? "item selecionado" : "itens selecionados"}
                                        </span>
                                    </div>
                                    <div className="space-y-1">
                                        {selectedGifts.map(id => {
                                            const gift = GIFTS.find(g => g.id === id);
                                            return gift ? (
                                                <p key={id} className="text-sm text-foreground font-medium">
                                                    {gift.emoji} {gift.name}
                                                </p>
                                            ) : null;
                                        })}
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-8 text-muted-foreground">
                                    <Gift className="w-12 h-12 mx-auto mb-3 opacity-30" />
                                    <p className="text-sm">Nenhum presente selecionado</p>
                                    <p className="text-xs">Volte e selecione itens da lista</p>
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

                            {/* PIX Key */}
                            <button
                                onClick={copyPixKey}
                                className={`w-full p-4 rounded-xl flex items-center justify-between transition-all ${
                                    copied ? "bg-green-500 text-white" : "bg-muted hover:bg-accent"
                                }`}
                            >
                                <span className={`font-mono text-xs truncate ${copied ? "text-white" : "text-foreground"}`}>
                                    {PIX_KEY}
                                </span>
                                <div className={`flex items-center gap-1.5 text-xs font-medium flex-shrink-0 ml-3 ${copied ? "text-white" : "text-primary"}`}>
                                    {copied ? <><Check className="w-4 h-4" /> Copiado!</> : <><Copy className="w-4 h-4" /> Copiar</>}
                                </div>
                            </button>

                            {/* WhatsApp */}
                            <button
                                onClick={sendWhatsApp}
                                className="w-full bg-green-500 hover:bg-green-600 text-white py-3.5 rounded-xl font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 shadow-lg"
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
                </div>
            )}
        </div>
    );
}
