import { useState, useEffect, useCallback } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowLeft, Users, Gift, Search, Trash2, Download, LogOut,
    Lock, Mail, Loader2, Phone, Calendar, CheckCircle2, Clock,
    XCircle, Eye, Plus, Edit2, X, Save, Filter, Package
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";

const assetPath = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

type Tab = 'rsvps' | 'received-gifts' | 'manage-gifts';

// ===========================================
// LOGIN FORM
// ===========================================
function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signIn, loading, error } = useAuth();
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const loginEmail = email.includes("@") ? email : `${email}@admin.com`;
        const result = await signIn(loginEmail, password);
        if (result.success) {
            toast({ title: "Login realizado com sucesso", description: "Bem-vindo ao painel administrativo." });
        } else {
            toast({ variant: "destructive", title: "Falha no login", description: result.error || "Verifique suas credenciais." });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 to-background">
            <Card className="w-full max-w-md shadow-2xl border-none">
                <CardContent className="p-8">
                    <div className="text-center mb-8">
                        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                            <Lock className="w-8 h-8 text-primary" />
                        </div>
                        <h1 className="font-script text-3xl text-primary">Painel Admin</h1>
                        <p className="text-muted-foreground text-sm mt-1">Anna Lívia - Formatura</p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input id="email" type="text" placeholder="admin@admin.com" className="pl-10" value={email} onChange={e => setEmail(e.target.value)} disabled={loading} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Senha</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input id="password" type="password" placeholder="••••••••" className="pl-10" value={password} onChange={e => setPassword(e.target.value)} disabled={loading} />
                            </div>
                        </div>
                        {error && <p className="text-sm text-red-500 text-center">{error}</p>}
                        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white" disabled={loading}>
                            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                            Entrar
                        </Button>
                    </form>
                    <div className="text-center mt-4">
                        <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">← Voltar ao site</Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

// ===========================================
// MAIN ADMIN COMPONENT
// ===========================================
export default function Admin() {
    const { isAuthenticated, loading: authLoading, signOut, user } = useAuth();
    const { toast } = useToast();
    const [activeTab, setActiveTab] = useState<Tab>('rsvps');

    // RSVP State
    const [rsvps, setRsvps] = useState<any[]>([]);
    const [rsvpLoading, setRsvpLoading] = useState(true);
    const [rsvpSearch, setRsvpSearch] = useState("");
    const [rsvpFilter, setRsvpFilter] = useState<string>("all");

    // Gift Selections State
    const [giftSelections, setGiftSelections] = useState<any[]>([]);
    const [giftsLoading, setGiftsLoading] = useState(true);
    const [giftSearch, setGiftSearch] = useState("");

    // Gift Management State
    const [giftItems, setGiftItems] = useState<any[]>([]);
    const [manageLoading, setManageLoading] = useState(true);
    const [manageSearch, setManageSearch] = useState("");
    const [showGiftModal, setShowGiftModal] = useState(false);
    const [editingGift, setEditingGift] = useState<any>(null);
    const [giftForm, setGiftForm] = useState({ name: "", description: "", price: 0, category: "", image_url: "" });

    // Fetch Data
    const fetchRsvps = useCallback(async () => {
        setRsvpLoading(true);
        const { data } = await supabase.from('rsvp_submissions').select('*').order('created_at', { ascending: false });
        setRsvps(data || []);
        setRsvpLoading(false);
    }, []);

    const fetchGiftSelections = useCallback(async () => {
        setGiftsLoading(true);
        const { data } = await supabase.from('gift_selections').select('*').order('created_at', { ascending: false });
        setGiftSelections(data || []);
        setGiftsLoading(false);
    }, []);

    const fetchGiftItems = useCallback(async () => {
        setManageLoading(true);
        const { data } = await supabase.from('gift_items').select('*').order('created_at', { ascending: false });
        setGiftItems(data || []);
        setManageLoading(false);
    }, []);

    const fetchAll = useCallback(async () => {
        await Promise.all([fetchRsvps(), fetchGiftSelections(), fetchGiftItems()]);
    }, [fetchRsvps, fetchGiftSelections, fetchGiftItems]);

    useEffect(() => { if (isAuthenticated) fetchAll(); }, [isAuthenticated, fetchAll]);

    // RSVP Actions
    const deleteRsvp = async (id: string) => {
        await supabase.from('rsvp_submissions').delete().eq('id', id);
        setRsvps(prev => prev.filter(r => r.id !== id));
        toast({ title: "Confirmação removida" });
    };

    const exportRsvpCSV = () => {
        const headers = ["Nome", "Telefone", "Eventos", "Acompanhantes", "Mensagem", "Data"];
        const rows = rsvps.map(r => [
            r.name, r.phone, r.attendance,
            (r.companion_names || []).join(", "), r.message || "",
            new Date(r.created_at).toLocaleString("pt-BR")
        ]);
        const csv = [headers, ...rows].map(row => row.map(v => `"${String(v ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");
        const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `confirmacoes_anna_livia_${new Date().toLocaleDateString('pt-BR').replace(/\//g, '-')}.csv`;
        link.click();
        toast({ title: "CSV exportado com sucesso" });
    };

    // Gift Selection Actions
    const deleteGiftSelection = async (id: string) => {
        await supabase.from('gift_selections').delete().eq('id', id);
        setGiftSelections(prev => prev.filter(g => g.id !== id));
        toast({ title: "Seleção removida" });
    };

    const updateGiftStatus = async (id: string, status: string) => {
        await supabase.from('gift_selections').update({ payment_status: status }).eq('id', id);
        setGiftSelections(prev => prev.map(g => g.id === id ? { ...g, payment_status: status } : g));
        toast({ title: "Status atualizado" });
    };

    // Gift Management Actions
    const saveGift = async () => {
        if (!giftForm.name) return;
        if (editingGift) {
            await supabase.from('gift_items').update(giftForm).eq('id', editingGift.id);
            toast({ title: "Presente atualizado" });
        } else {
            await supabase.from('gift_items').insert([giftForm]);
            toast({ title: "Presente criado" });
        }
        setShowGiftModal(false);
        setEditingGift(null);
        setGiftForm({ name: "", description: "", price: 0, category: "", image_url: "" });
        fetchGiftItems();
    };

    const deleteGiftItem = async (id: string) => {
        await supabase.from('gift_items').delete().eq('id', id);
        setGiftItems(prev => prev.filter(g => g.id !== id));
        toast({ title: "Presente removido" });
    };

    const formatPrice = (v: number) => v?.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) || "R$ 0,00";

    // Auth
    if (authLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
    if (!isAuthenticated) return <LoginForm />;

    // Filtered Data
    const filteredRsvps = rsvps.filter(r => {
        const matchSearch = !rsvpSearch || r.name?.toLowerCase().includes(rsvpSearch.toLowerCase()) || r.phone?.includes(rsvpSearch);
        const matchFilter = rsvpFilter === "all" || r.attendance === rsvpFilter;
        return matchSearch && matchFilter;
    });

    const filteredGiftSelections = giftSelections.filter(g => {
        const query = giftSearch.toLowerCase();
        return !giftSearch || 
            g.guest_name?.toLowerCase().includes(query) || 
            g.guest_phone?.includes(query);
    });

    const filteredGiftItems = giftItems.filter(g => {
        return !manageSearch || g.name?.toLowerCase().includes(manageSearch.toLowerCase());
    });

    const tabs: { id: Tab; label: string; icon: any; count: number }[] = [
        { id: 'rsvps', label: 'Confirmações', icon: Users, count: rsvps.length },
        { id: 'received-gifts', label: 'Recebidos', icon: Gift, count: giftSelections.length },
        { id: 'manage-gifts', label: 'Gerenciar', icon: Package, count: giftItems.length },
    ];

    return (
        <div className="min-h-screen bg-gray-50/50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
                <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href="/"><Button variant="ghost" size="icon" className="rounded-full"><ArrowLeft className="w-5 h-5" /></Button></Link>
                        <h1 className="text-lg font-heading font-bold text-primary">Painel Admin</h1>
                    </div>
                    <Button variant="ghost" size="sm" onClick={signOut} className="text-red-500 hover:text-red-600"><LogOut className="w-4 h-4 mr-1" /> Sair</Button>
                </div>
            </header>

            {/* Desktop Tabs */}
            <div className="hidden md:block bg-white border-b border-gray-200">
                <div className="container mx-auto px-4">
                    <div className="flex gap-1">
                        {tabs.map(tab => (
                            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                                <tab.icon className="w-4 h-4" />
                                {tab.label}
                                <Badge variant="secondary" className="ml-1 text-xs">{tab.count}</Badge>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content */}
            <main className="container mx-auto px-4 py-6 pb-24 md:pb-6">
                <AnimatePresence mode="wait">
                    {activeTab === 'rsvps' && (
                        <motion.div key="rsvps" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            {/* Search & Filter */}
                            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input placeholder="Buscar por nome ou telefone..." className="pl-10" value={rsvpSearch} onChange={e => setRsvpSearch(e.target.value)} />
                                </div>
                                <div className="flex gap-2">
                                    {["all", "colacao", "jantar", "ambos"].map(f => (
                                        <Button key={f} size="sm" variant={rsvpFilter === f ? "default" : "outline"} onClick={() => setRsvpFilter(f)}
                                            className={rsvpFilter === f ? "bg-primary text-white" : ""}>
                                            {f === "all" ? "Todos" : f === "colacao" ? "Colação" : f === "jantar" ? "Jantar" : "Ambos"}
                                        </Button>
                                    ))}
                                </div>
                                <Button size="sm" variant="outline" onClick={exportRsvpCSV}><Download className="w-4 h-4 mr-1" /> CSV</Button>
                            </div>

                            {/* RSVP Cards */}
                            {rsvpLoading ? (
                                <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
                            ) : filteredRsvps.length === 0 ? (
                                <div className="text-center py-12 text-gray-500"><Users className="w-12 h-12 mx-auto mb-3 opacity-30" /><p>Nenhuma confirmação encontrada</p></div>
                            ) : (
                                <div className="space-y-3">
                                    {filteredRsvps.map(rsvp => (
                                        <Card key={rsvp.id} className="border-none shadow-sm">
                                            <CardContent className="p-4">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <h3 className="font-heading font-bold text-gray-900">{rsvp.name}</h3>
                                                            <Badge variant="secondary" className={`text-xs ${rsvp.attendance === 'colacao' ? 'bg-blue-100 text-blue-700' : rsvp.attendance === 'jantar' ? 'bg-orange-100 text-orange-700' : rsvp.attendance === 'ambos' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                                                {rsvp.attendance === 'colacao' ? 'Colação' : rsvp.attendance === 'jantar' ? 'Jantar' : rsvp.attendance === 'ambos' ? 'Ambos' : rsvp.attendance}
                                                            </Badge>
                                                        </div>
                                                        <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                                                            <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {rsvp.phone}</span>
                                                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(rsvp.created_at).toLocaleDateString("pt-BR")}</span>
                                                            {rsvp.guest_count > 0 && <span className="flex items-center gap-1"><Users className="w-3 h-3" /> +{rsvp.guest_count}</span>}
                                                        </div>
                                                        {rsvp.companion_names?.length > 0 && (
                                                            <p className="text-xs text-gray-400 mt-1">Acompanhantes: {rsvp.companion_names.join(", ")}</p>
                                                        )}
                                                        {rsvp.message && <p className="text-xs text-gray-400 mt-1 italic">"{rsvp.message}"</p>}
                                                    </div>
                                                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-500" onClick={() => deleteRsvp(rsvp.id)}>
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}

                    {activeTab === 'received-gifts' && (
                        <motion.div key="gifts" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <div className="flex gap-3 mb-6">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input placeholder="Buscar por nome..." className="pl-10" value={giftSearch} onChange={e => setGiftSearch(e.target.value)} />
                                </div>
                            </div>

                            {giftsLoading ? (
                                <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
                            ) : filteredGiftSelections.length === 0 ? (
                                <div className="text-center py-12 text-gray-500"><Gift className="w-12 h-12 mx-auto mb-3 opacity-30" /><p>Nenhuma seleção de presente</p></div>
                            ) : (
                                <div className="space-y-3">
                                    {filteredGiftSelections.map(sel => (
                                        <Card key={sel.id} className="border-none shadow-sm">
                                            <CardContent className="p-4">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <h3 className="font-heading font-bold text-gray-900">{sel.guest_name}</h3>
                                                            <Badge variant="secondary" className={`text-xs ${sel.payment_status === 'paid' ? 'bg-green-100 text-green-700' : sel.payment_status === 'confirmed' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                                                {sel.payment_status === 'paid' ? 'Pago' : sel.payment_status === 'confirmed' ? 'Confirmado' : 'Pendente'}
                                                            </Badge>
                                                        </div>
                                                        <div className="flex flex-wrap gap-3 text-sm text-gray-500 mt-1">
                                                            {sel.guest_phone && (
                                                                <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {sel.guest_phone}</span>
                                                            )}
                                                            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {new Date(sel.created_at).toLocaleDateString("pt-BR")}</span>
                                                        </div>
                                                        <div className="flex flex-wrap gap-1 mt-2">
                                                            {Array.isArray(sel.selected_gifts) && sel.selected_gifts.map((g: any, i: number) => (
                                                                <Badge key={i} variant="outline" className="text-xs">{g.name}</Badge>
                                                            ))}
                                                        </div>
                                                        <p className="text-sm font-semibold text-primary mt-2">{formatPrice(sel.total_value)}</p>
                                                    </div>
                                                    <div className="flex gap-1">
                                                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-green-500" onClick={() => updateGiftStatus(sel.id, 'paid')} title="Marcar como pago">
                                                            <CheckCircle2 className="w-4 h-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-500" onClick={() => deleteGiftSelection(sel.id)}>
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}

                    {activeTab === 'manage-gifts' && (
                        <motion.div key="manage" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <div className="flex gap-3 mb-6">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input placeholder="Buscar presente..." className="pl-10" value={manageSearch} onChange={e => setManageSearch(e.target.value)} />
                                </div>
                                <Button size="sm" onClick={() => { setEditingGift(null); setGiftForm({ name: "", description: "", price: 0, category: "", image_url: "" }); setShowGiftModal(true); }}>
                                    <Plus className="w-4 h-4 mr-1" /> Novo
                                </Button>
                            </div>

                            {manageLoading ? (
                                <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
                            ) : filteredGiftItems.length === 0 ? (
                                <div className="text-center py-12 text-gray-500"><Package className="w-12 h-12 mx-auto mb-3 opacity-30" /><p>Nenhum presente cadastrado</p></div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {filteredGiftItems.map(gift => (
                                        <Card key={gift.id} className="border-none shadow-sm overflow-hidden">
                                            {gift.image_url && <img src={gift.image_url} alt={gift.name} className="w-full h-32 object-cover" />}
                                            <CardContent className="p-4">
                                                <h3 className="font-heading font-bold text-gray-900">{gift.name}</h3>
                                                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{gift.description}</p>
                                                <div className="flex items-center justify-between mt-3">
                                                    <span className="text-sm font-semibold text-primary">{formatPrice(gift.price)}</span>
                                                    <div className="flex gap-1">
                                                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setEditingGift(gift); setGiftForm(gift); setShowGiftModal(true); }}>
                                                            <Edit2 className="w-3 h-3" />
                                                        </Button>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => deleteGiftItem(gift.id)}>
                                                            <Trash2 className="w-3 h-3" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            {/* Mobile Bottom Tab Bar */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-area-pb">
                <div className="flex">
                    {tabs.map(tab => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium transition-colors ${activeTab === tab.id ? 'text-primary' : 'text-gray-500'}`}>
                            <tab.icon className="w-5 h-5" />
                            <span>{tab.label}</span>
                            {tab.count > 0 && <span className="absolute -mt-6 ml-4 bg-primary text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full">{tab.count > 9 ? '9+' : tab.count}</span>}
                        </button>
                    ))}
                </div>
            </div>

            {/* Gift Modal */}
            <AnimatePresence>
                {showGiftModal && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50">
                        <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="font-heading text-xl font-bold">{editingGift ? "Editar Presente" : "Novo Presente"}</h2>
                                <Button variant="ghost" size="icon" onClick={() => setShowGiftModal(false)}><X className="w-5 h-5" /></Button>
                            </div>
                            <div className="space-y-4">
                                <div><Label>Nome</Label><Input value={giftForm.name} onChange={e => setGiftForm(p => ({ ...p, name: e.target.value }))} placeholder="Nome do presente" /></div>
                                <div><Label>Descrição</Label><Input value={giftForm.description} onChange={e => setGiftForm(p => ({ ...p, description: e.target.value }))} placeholder="Descrição" /></div>
                                <div><Label>Preço (R$)</Label><Input type="number" value={giftForm.price} onChange={e => setGiftForm(p => ({ ...p, price: parseFloat(e.target.value) || 0 }))} /></div>
                                <div><Label>Categoria</Label><Input value={giftForm.category} onChange={e => setGiftForm(p => ({ ...p, category: e.target.value }))} placeholder="Ex: Uniformes, Equipamentos" /></div>
                                <div><Label>URL da Imagem</Label><Input value={giftForm.image_url} onChange={e => setGiftForm(p => ({ ...p, image_url: e.target.value }))} placeholder="https://..." /></div>
                            </div>
                            <div className="flex gap-3 mt-6">
                                <Button variant="outline" className="flex-1" onClick={() => setShowGiftModal(false)}>Cancelar</Button>
                                <Button className="flex-1 bg-primary text-white" onClick={saveGift}><Save className="w-4 h-4 mr-1" /> Salvar</Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
