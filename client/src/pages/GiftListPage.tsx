import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Gift, Search, X, ShoppingCart, Plus, Filter, Check, Copy, QrCode, Loader2 } from "lucide-react";

const PIX_KEY = "06010236177";
const PIX_NAME = "ANNA LIVIA CARVALHO";
const PIX_BANK = "Banco do Brasil";
const WHATSAPP_NUMBER = "5563985001811";

interface GiftItem {
    id: string;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    category: string;
    featured?: boolean;
}

const GIFTS: GiftItem[] = [
    // Uniformes
    { id: "1", name: "Pijama Cirúrgico", price: 120.00, description: "Conjunto cirúrgico profissional cor azul escuro, tamanho M.", imageUrl: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=600&q=80", category: "Uniformes", featured: true },
    { id: "2", name: "Touca Cirúrgica", price: 35.00, description: "Touca descartável cor azul escuro para procedimentos.", imageUrl: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&q=80", category: "Uniformes" },
    { id: "3", name: "Jaleco Branco", price: 90.00, description: "Jaleco profissional branco para atendimentos e estágios.", imageUrl: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=600&q=80", category: "Uniformes" },
    { id: "4", name: "Sapato Branco Fechado", price: 180.00, description: "Sapato clinico branco, fechado e antiderrapante.", imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80", category: "Uniformes" },

    // Equipamentos
    { id: "5", name: "Estetoscópio", price: 250.00, description: "Estetoscópio profissional para avaliações clínicas.", imageUrl: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=600&q=80", category: "Equipamentos", featured: true },
    { id: "6", name: "Esfigmomanômetro", price: 180.00, description: "Aparelho de pressão arterial para medições precisas.", imageUrl: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&q=80", category: "Equipamentos" },
    { id: "7", name: "Otoscópio", price: 200.00, description: "Instrumento para exame otológico.", imageUrl: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=600&q=80", category: "Equipamentos" },
    { id: "8", name: "Lanterna de Exame", price: 60.00, description: "Lanterna clínica para exames físicos.", imageUrl: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=600&q=80", category: "Equipamentos" },

    // Utensílios
    { id: "9", name: "Caneta Profissional", price: 25.00, description: "Caneta para registros e anotações clínicas.", imageUrl: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=600&q=80", category: "Utensílios" },
    { id: "10", name: "Carimbo", price: 45.00, description: "Carimbo pessoal profissional para documentos.", imageUrl: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=600&q=80", category: "Utensílios" },
    { id: "11", name: "Tesoura Médica", price: 40.00, description: "Tesoura profissional para curativos e procedimentos.", imageUrl: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=600&q=80", category: "Utensílios" },
    { id: "12", name: "Pinça de Anatomia", price: 35.00, description: "Pinça profissional para procedimentos clínicos.", imageUrl: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=600&q=80", category: "Utensílios" },

    // Acessórios
    { id: "13", name: "Garrafa Térmica", price: 80.00, description: "Garrafa térmica para manter a hidratação durante plantões.", imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=80", category: "Acessórios", featured: true },
    { id: "14", name: "Mochila Profissional", price: 200.00, description: "Mochila funcional para trabalhos e deslocamentos.", imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80", category: "Acessórios" },
    { id: "15", name: "Necessaire", price: 60.00, description: "Necessaire para organizar pertences pessoais.", imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80", category: "Acessórios" },
    { id: "16", name: "Relógio de Bolso", price: 120.00, description: "Relógio de bolso para aferir pulsos e controlar tempos.", imageUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=80", category: "Acessórios" },

    // Livros
    { id: "17", name: "Livro de Enfermagem", price: 150.00, description: "Referência atualizada para prática clínica.", imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80", category: "Livros", featured: true },
    { id: "18", name: "Atlas de Anatomia", price: 180.00, description: "Atlas ilustrado para estudo e referência.", imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80", category: "Livros" },
    { id: "19", name: "Livro de Farmacologia", price: 130.00, description: "Guia completo de medicamentos e dosagens.", imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80", category: "Livros" },
    { id: "20", name: "Nota Bloco Clínico", price: 30.00, description: "Bloco para anotações clínicas e registros.", imageUrl: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=600&q=80", category: "Livros" },

    // Vale Presente
    { id: "21", name: "Vale Presente R$50", price: 50.00, description: "Contribuição livre via PIX para Anna escolher.", imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80", category: "Vale Presente" },
    { id: "22", name: "Vale Presente R$100", price: 100.00, description: "Contribuição livre via PIX para Anna escolher.", imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80", category: "Vale Presente" },
    { id: "23", name: "Vale Presente R$200", price: 200.00, description: "Contribuição livre via PIX para Anna escolher.", imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80", category: "Vale Presente" },
    { id: "24", name: "Vale Presente R$500", price: 500.00, description: "Contribuição livre via PIX para Anna escolher.", imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80", category: "Vale Presente" },
];

const categories = ["Todas", "Uniformes", "Equipamentos", "Utensílios", "Acessórios", "Livros", "Vale Presente"];

export function GiftListPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Todas");
    const [selectedGifts, setSelectedGifts] = useState<string[]>([]);
    const [showPixPanel, setShowPixPanel] = useState(false);
    const [copied, setCopied] = useState(false);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    const toggleGift = (id: string) => {
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

    const groupedGifts: { [key: string]: GiftItem[] } = {};
    if (selectedCategory === "Todas") {
        filteredGifts.forEach(gift => {
            if (!groupedGifts[gift.category]) groupedGifts[gift.category] = [];
            groupedGifts[gift.category].push(gift);
        });
    }

    const selectedTotal = selectedGifts.reduce((sum, id) => {
        const gift = GIFTS.find(g => g.id === id);
        return sum + (gift?.price || 0);
    }, 0);

    const formatPrice = (price: number) => price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

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
        const message = `Olá! Acabei de fazer um PIX para presentear a Anna Lívia na formatura! 🎓\n\nPresente(s): ${selectedNames}\nValor: ${formatPrice(selectedTotal)}\n\nQue Deus abençoe essa nova fase! ❤️`;
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
    };

    return (
        <div className="min-h-screen font-body" style={{ background: "linear-gradient(135deg, #0a1a0a 0%, #0d2818 50%, #0a1a0a 100%)" }}>
            {/* Background */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-20">
                {/* Header */}
                <header className="bg-[#0d1f12]/90 backdrop-blur-md border-b border-white/10 sticky top-0 z-40 shadow-sm">
                    <div className="container mx-auto px-4 py-4 md:py-6 flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <Link to="/" className="text-white hover:text-secondary transition-colors p-2 rounded-full hover:bg-white/10">
                                <ArrowLeft className="w-6 h-6" />
                            </Link>
                            <div>
                                <h1 className="text-xl md:text-2xl font-script text-white">Lista de Presentes</h1>
                                <p className="text-[10px] md:text-xs text-secondary uppercase tracking-widest font-bold">Anna Lívia</p>
                            </div>
                        </div>

                        <button
                            onClick={() => setShowPixPanel(!showPixPanel)}
                            className="relative p-2 text-white hover:text-secondary transition-colors hidden md:block"
                        >
                            <ShoppingCart className="w-6 h-6" />
                            {selectedGifts.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-secondary text-primary text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-lg">
                                    {selectedGifts.length}
                                </span>
                            )}
                        </button>
                    </div>

                    {/* Search and Filter (Desktop) */}
                    <div className="container mx-auto px-4 pb-4 hidden md:block">
                        <div className="flex gap-4 max-w-2xl mx-auto">
                            <div className="flex-1 relative group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5 group-focus-within:text-secondary transition-colors" />
                                <input
                                    type="text"
                                    placeholder="O que você procura?"
                                    className="w-full bg-white/10 border border-white/10 text-white rounded-full py-3 pl-12 pr-4 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all placeholder:text-white/40 shadow-sm"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="relative">
                                <select
                                    className="appearance-none bg-white/10 border border-white/10 text-white rounded-full py-3 pl-6 pr-12 focus:outline-none focus:border-secondary cursor-pointer hover:bg-white/15 transition-all shadow-sm"
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                >
                                    {categories.map(cat => (
                                        <option key={cat} value={cat} className="bg-[#0d2818] text-white">{cat}</option>
                                    ))}
                                </select>
                                <Filter className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Mobile Filter */}
                <div className="md:hidden sticky top-[73px] z-30 bg-[#0d1f12]/95 backdrop-blur-md border-b border-white/10 py-3 px-4 shadow-sm">
                    <div className="flex gap-3">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Buscar presente..."
                                className="w-full bg-white/10 border border-white/10 text-white text-sm rounded-lg py-2 pl-9 pr-3 focus:outline-none focus:border-secondary shadow-sm placeholder:text-white/40"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button
                            onClick={() => setIsMobileFilterOpen(true)}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border shadow-sm ${selectedCategory !== "Todas" ? "bg-secondary border-secondary text-primary" : "bg-white/10 border-white/10 text-white"}`}
                        >
                            <Filter className="w-4 h-4" />
                            <span className="max-w-[80px] truncate">{selectedCategory === "Todas" ? "Filtros" : selectedCategory}</span>
                        </button>
                    </div>
                </div>

                {/* Gift Grid */}
                <main className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
                    {filteredGifts.length === 0 ? (
                        <div className="text-center py-16 bg-white/5 rounded-2xl border border-white/10 mx-auto max-w-2xl shadow-sm">
                            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 text-white/40">
                                <Search className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-heading text-white mb-2">Nenhum presente encontrado</h3>
                            <p className="text-white/50">Tente buscar por outro termo ou categoria.</p>
                            <button onClick={() => { setSearchTerm(""); setSelectedCategory("Todas"); }} className="mt-6 text-secondary hover:text-white underline transition-colors">
                                Limpar filtros
                            </button>
                        </div>
                    ) : selectedCategory === "Todas" && !searchTerm ? (
                        <div className="space-y-12">
                            {categories.filter(c => c !== "Todas").map(category => {
                                const categoryGifts = groupedGifts[category];
                                if (!categoryGifts || categoryGifts.length === 0) return null;
                                return (
                                    <section key={category} className="scroll-mt-32" id={`cat-${category}`}>
                                        <div className="flex items-center gap-4 mb-6">
                                            <h2 className="text-2xl md:text-3xl font-heading text-secondary">{category}</h2>
                                            <div className="h-px bg-white/10 flex-1" />
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                                            {categoryGifts.map(gift => (
                                                <GiftCard key={gift.id} gift={gift} isSelected={selectedGifts.includes(gift.id)} onToggle={() => toggleGift(gift.id)} formatPrice={formatPrice} />
                                            ))}
                                        </div>
                                    </section>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                            {filteredGifts.map(gift => (
                                <GiftCard key={gift.id} gift={gift} isSelected={selectedGifts.includes(gift.id)} onToggle={() => toggleGift(gift.id)} formatPrice={formatPrice} />
                            ))}
                        </div>
                    )}
                </main>
            </div>

            {/* Mobile Category Bottom Sheet */}
            {isMobileFilterOpen && (
                <div className="fixed inset-0 z-[60] md:hidden">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileFilterOpen(false)} />
                    <div className="absolute bottom-0 left-0 right-0 bg-[#0d2818] rounded-t-3xl p-6 border-t border-white/10 max-h-[80vh] overflow-y-auto shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-heading text-white">Filtrar por Categoria</h3>
                            <button onClick={() => setIsMobileFilterOpen(false)} className="text-white/50 p-2"><X className="w-6 h-6" /></button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {categories.map(cat => (
                                <button key={cat} onClick={() => { setSelectedCategory(cat); setIsMobileFilterOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                                    className={`p-4 rounded-xl text-sm font-bold uppercase tracking-wider text-left transition-all ${selectedCategory === cat ? "bg-secondary text-primary shadow-lg" : "bg-white/10 text-white hover:bg-white/15 border border-white/10"}`}>
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
                    <button onClick={() => setShowPixPanel(true)} className="bg-secondary text-primary p-4 rounded-full shadow-2xl flex items-center gap-3 pr-6 hover:scale-105 active:scale-95 transition-all">
                        <div className="relative">
                            <ShoppingCart className="w-6 h-6" />
                            <span className="absolute -top-2 -right-2 bg-primary text-secondary text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">{selectedGifts.length}</span>
                        </div>
                        <span className="font-bold text-sm">{formatPrice(selectedTotal)}</span>
                    </button>
                </div>
            )}

            {/* PIX Side Panel */}
            {showPixPanel && (
                <div className="fixed inset-0 z-[100]">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowPixPanel(false)} />
                    <div className="absolute top-0 right-0 bottom-0 w-full max-w-md bg-[#0d2818] shadow-2xl flex flex-col">
                        {/* Header */}
                        <div className="bg-secondary p-5 flex items-center justify-between">
                            <div className="flex items-center gap-3 text-primary">
                                <QrCode className="w-5 h-5" />
                                <h2 className="font-heading text-lg">Pagamento via PIX</h2>
                            </div>
                            <button onClick={() => setShowPixPanel(false)} className="text-primary/80 hover:text-primary p-2"><X className="w-5 h-5" /></button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-5">
                            {/* Selected Items */}
                            {selectedGifts.length > 0 ? (
                                <div className="bg-white/5 rounded-2xl p-4 border border-white/10 shadow-sm">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Gift className="w-4 h-4 text-secondary" />
                                        <span className="text-xs font-medium text-white/60">{selectedGifts.length} {selectedGifts.length === 1 ? "item selecionado" : "itens selecionados"}</span>
                                    </div>
                                    <div className="space-y-2">
                                        {selectedGifts.map(id => {
                                            const gift = GIFTS.find(g => g.id === id);
                                            return gift ? (
                                                <div key={id} className="flex items-center justify-between text-sm">
                                                    <span className="text-white font-medium truncate">{gift.name}</span>
                                                    <span className="text-secondary font-bold ml-2 flex-shrink-0">{formatPrice(gift.price)}</span>
                                                </div>
                                            ) : null;
                                        })}
                                    </div>
                                    <div className="border-t border-white/10 mt-3 pt-3 flex justify-between">
                                        <span className="font-bold text-white">Total</span>
                                        <span className="font-bold text-secondary text-lg">{formatPrice(selectedTotal)}</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-8 text-white/40">
                                    <Gift className="w-12 h-12 mx-auto mb-3 opacity-30" />
                                    <p className="text-sm">Nenhum presente selecionado</p>
                                    <p className="text-xs">Volte e selecione itens da lista</p>
                                </div>
                            )}

                            {/* PIX Guidance */}
                            <div className="flex justify-center">
                                <div className="flex w-full max-w-xs flex-col items-center rounded-2xl border-2 border-dashed border-secondary/30 bg-secondary/5 p-5 text-center shadow-lg">
                                    <QrCode className="mb-3 h-10 w-10 text-secondary" />
                                    <p className="text-sm font-bold text-white">Use a chave PIX abaixo</p>
                                    <p className="mt-1 text-xs text-white/50">Copie a chave e faça o pagamento pelo seu banco</p>
                                </div>
                            </div>

                            {/* Bank Info */}
                            <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                                <p className="text-sm text-white font-heading font-bold">{PIX_NAME}</p>
                                <p className="text-xs text-secondary mt-0.5">{PIX_BANK}</p>
                            </div>

                            {/* PIX Key */}
                            <button onClick={copyPixKey} className={`w-full p-4 rounded-xl flex items-center justify-between transition-all ${copied ? "bg-green-500 text-white" : "bg-white/10 hover:bg-white/15"}`}>
                                <span className={`font-mono text-xs truncate ${copied ? "text-white" : "text-white"}`}>{PIX_KEY}</span>
                                <div className={`flex items-center gap-1.5 text-xs font-medium flex-shrink-0 ml-3 ${copied ? "text-white" : "text-secondary"}`}>
                                    {copied ? <><Check className="w-4 h-4" /> Copiado!</> : <><Copy className="w-4 h-4" /> Copiar</>}
                                </div>
                            </button>

                            {/* WhatsApp */}
                            <button onClick={sendWhatsApp} className="w-full bg-green-500 hover:bg-green-600 text-white py-3.5 rounded-xl font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 shadow-lg">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                Confirmar pelo WhatsApp
                            </button>

                            <p className="text-center text-white/40 text-[10px]">Após o pagamento, confirme pelo WhatsApp</p>
                        </div>

                        {/* Footer */}
                        <div className="p-4 border-t border-white/10 bg-[#0a1a0a]">
                            <button onClick={() => setShowPixPanel(false)} className="w-full text-muted-foreground hover:text-foreground text-xs py-2 transition-colors">
                                ← Voltar para a lista
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// Gift Card Component
function GiftCard({ gift, isSelected, onToggle, formatPrice }: { gift: GiftItem; isSelected: boolean; onToggle: () => void; formatPrice: (n: number) => string }) {
    const [added, setAdded] = useState(false);

    const handleAdd = () => {
        onToggle();
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div onClick={handleAdd} className={`bg-card group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border flex flex-col h-full transform hover:-translate-y-1 cursor-pointer ${isSelected ? "border-secondary ring-2 ring-secondary/30" : "border-border"}`}>
            <div className="relative aspect-square overflow-hidden bg-muted">
                <img src={gift.imageUrl} alt={gift.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded-md border border-white/10">{gift.category}</span>
                </div>

                {/* Featured Badge */}
                {gift.featured && (
                    <div className="absolute top-3 right-3">
                        <span className="px-2 py-1 bg-secondary text-primary text-[10px] font-bold uppercase tracking-widest rounded-md">★ Popular</span>
                    </div>
                )}

                {/* Quick Action Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                    <span className="bg-background text-foreground px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs flex items-center gap-2 shadow-xl">
                        {isSelected || added ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        {isSelected || added ? "Selecionado" : "Adicionar"}
                    </span>
                </div>
            </div>

            <div className="p-4 flex flex-col flex-1 bg-card relative z-10">
                <h3 className="text-foreground font-heading text-lg leading-tight mb-1 group-hover:text-primary transition-colors line-clamp-2 min-h-[50px] md:min-h-[44px]">{gift.name}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-4 flex-1 font-body leading-relaxed">{gift.description}</p>

                <div className="flex items-end justify-between mt-auto pt-4 border-t border-border/50">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Valor</span>
                        <span className="text-xl font-bold text-foreground">
                            <span className="text-sm align-top text-muted-foreground mr-0.5">R$</span>
                            {gift.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </span>
                    </div>

                    {/* Mobile Add Button */}
                    <button className={`md:hidden p-3 rounded-full shadow-lg transition-all active:scale-95 ${isSelected || added ? "bg-green-500 text-white" : "bg-primary text-primary-foreground"}`}>
                        {isSelected || added ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    </button>
                </div>
            </div>
        </div>
    );
}
