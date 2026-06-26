import { useState, useEffect, useCallback } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowLeft, Users, Gift, Search, Trash2, Download, LogOut,
    Lock, Mail, Loader2, Phone, Calendar, CheckCircle2, Clock,
    Plus, Edit2, X, Save, Package, RefreshCw, TrendingUp,
    GraduationCap, ChevronRight, Sparkles, AlertCircle, UserCheck,
    UtensilsCrossed
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";

type Tab = 'rsvps' | 'received-gifts' | 'manage-gifts';

// ── Color tokens ──
const green = '#0d1f12';
const greenMid = '#1a3a20';
const gold = '#c8a96e';
const goldLight = '#e0c99a';
const cream = '#f7f5f0';
const creamDark = '#ede9df';

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
        <div className="min-h-screen flex items-center justify-center p-4" style={{ background: `linear-gradient(160deg, ${cream} 0%, #e8e3d8 50%, ${creamDark} 100%)` }}>
            {/* Decorative blobs */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-30" style={{ background: `radial-gradient(circle, ${goldLight}60, transparent 70%)` }} />
                <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-20" style={{ background: `radial-gradient(circle, ${gold}40, transparent 70%)` }} />
            </div>

            <div className="relative w-full max-w-sm">
                <div className="bg-white rounded-3xl shadow-2xl border border-black/5 overflow-hidden">
                    {/* Top accent */}
                    <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${green}, ${gold}, ${green})` }} />

                    <div className="p-8 pt-10">
                        {/* Logo */}
                        <div className="flex flex-col items-center mb-8">
                            <div className="w-18 h-18 rounded-2xl flex items-center justify-center mb-4 shadow-lg" style={{ background: green, width: 72, height: 72 }}>
                                <GraduationCap className="w-9 h-9" style={{ color: gold }} />
                            </div>
                            <h2 className="text-2xl font-heading" style={{ color: green }}>Painel Admin</h2>
                            <p className="text-xs mt-1 uppercase tracking-[0.2em] font-semibold" style={{ color: gold }}>Formatura Anna Lívia</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: greenMid }}>Usuário</label>
                                <div className="relative">
                                    <Mail className="absolute left-3.5 top-3.5 h-4 w-4" style={{ color: gold }} />
                                    <input
                                        type="text"
                                        className="w-full pl-10 pr-4 py-3.5 rounded-xl border-2 outline-none transition-all text-sm"
                                        style={{ borderColor: '#e5e0d8', background: cream, color: green }}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="admin"
                                        onFocus={(e) => e.target.style.borderColor = gold}
                                        onBlur={(e) => e.target.style.borderColor = '#e5e0d8'}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: greenMid }}>Senha</label>
                                <div className="relative">
                                    <Lock className="absolute left-3.5 top-3.5 h-4 w-4" style={{ color: gold }} />
                                    <input
                                        type="password"
                                        className="w-full pl-10 pr-4 py-3.5 rounded-xl border-2 outline-none transition-all text-sm"
                                        style={{ borderColor: '#e5e0d8', background: cream, color: green }}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        onFocus={(e) => e.target.style.borderColor = gold}
                                        onBlur={(e) => e.target.style.borderColor = '#e5e0d8'}
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-100">
                                    <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                                    <p className="text-red-600 text-xs">{error}</p>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 rounded-xl font-bold text-sm uppercase tracking-widest text-white transition-all disabled:opacity-50 active:scale-[0.98] shadow-lg"
                                style={{ background: green }}
                            >
                                {loading ? <span className="flex items-center justify-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Entrando...</span> : 'Acessar Painel'}
                            </button>

                            <Link href="/" className="block w-full text-center text-xs py-2 transition-colors" style={{ color: gold }}>
                                ← Voltar ao convite
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
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
    const [expandedRsvpId, setExpandedRsvpId] = useState<string | null>(null);

    // Gift Selections State
    const [giftSelections, setGiftSelections] = useState<any[]>([]);
    const [giftsLoading, setGiftsLoading] = useState(true);
    const [giftSearch, setGiftSearch] = useState("");
    const [expandedGiftId, setExpandedGiftId] = useState<string | null>(null);

    // Gift Management State
    const [giftItems, setGiftItems] = useState<any[]>([]);
    const [manageLoading, setManageLoading] = useState(true);
    const [manageSearch, setManageSearch] = useState("");
    const [showGiftModal, setShowGiftModal] = useState(false);
    const [editingGift, setEditingGift] = useState<any>(null);
    const [giftForm, setGiftForm] = useState({ name: "", description: "", price: 0, category: "", image_url: "" });
    const [savingGift, setSavingGift] = useState(false);

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
        if (!confirm('Excluir este registro permanentemente?')) return;
        await supabase.from('rsvp_submissions').delete().eq('id', id);
        setRsvps(prev => prev.filter(r => r.id !== id));
        toast({ title: "Confirmação removida" });
    };

    const updateRsvpStatus = async (id: string, status: string) => {
        await supabase.from('rsvp_submissions').update({ email: status }).eq('id', id);
        setRsvps(prev => prev.map(r => r.id === id ? { ...r, email: status } : r));
        toast({ title: status === 'paid' ? "✅ Marcado como Pago" : "⏳ Marcado como Pendente" });
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
        if (!confirm('Excluir este registro de presente?')) return;
        await supabase.from('gift_selections').delete().eq('id', id);
        setGiftSelections(prev => prev.filter(g => g.id !== id));
        toast({ title: "Registro removido" });
    };

    const updateGiftStatus = async (id: string, status: string) => {
        await supabase.from('gift_selections').update({ payment_status: status }).eq('id', id);
        setGiftSelections(prev => prev.map(g => g.id === id ? { ...g, payment_status: status } : g));
        toast({ title: status === 'paid' ? "✅ Marcado como Pago" : "⏳ Marcado como Aguardando PIX" });
    };

    // Gift Item Actions
    const openGiftModal = (gift?: any) => {
        if (gift) { setEditingGift(gift); setGiftForm({ name: gift.name || "", description: gift.description || "", price: gift.price || 0, category: gift.category || "", image_url: gift.image_url || "" }); }
        else { setEditingGift(null); setGiftForm({ name: "", description: "", price: 0, category: "", image_url: "" }); }
        setShowGiftModal(true);
    };

    const saveGift = async () => {
        if (!giftForm.name.trim()) {
            toast({ variant: "destructive", title: "Nome obrigatório" });
            return;
        }
        setSavingGift(true);
        try {
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
        } catch (err) {
            toast({ variant: "destructive", title: "Erro ao salvar presente" });
        } finally {
            setSavingGift(false);
        }
    };

    const deleteGiftItem = async (id: string) => {
        if (!confirm('Excluir este presente da lista?')) return;
        await supabase.from('gift_items').delete().eq('id', id);
        setGiftItems(prev => prev.filter(g => g.id !== id));
        toast({ title: "Presente removido" });
    };

    const formatPrice = (v: number) => v?.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) || "R$ 0,00";

    // Auth
    if (authLoading) return <div className="min-h-screen flex items-center justify-center" style={{ background: cream }}><Loader2 className="w-8 h-8 animate-spin" style={{ color: gold }} /></div>;
    if (!isAuthenticated) return <LoginForm />;

    // Derived stats
    const totalPeople = rsvps.reduce((acc, r) => acc + (r.guest_count || 0) + 1, 0);

    const getColacaoValue = (r: any) => {
        const count = (r.guest_count || 0) + 1;
        if (r.attendance === 'colacao' || r.attendance === 'ambos') return count * 60;
        return 0;
    };

    const getJantarValue = (r: any) => {
        const count = (r.guest_count || 0) + 1;
        if (r.attendance === 'jantar' || r.attendance === 'ambos') return count * 70;
        return 0;
    };

    const totalColacaoPaid = rsvps
        .filter(r => r.email === 'paid')
        .reduce((acc, r) => acc + getColacaoValue(r), 0);

    const totalColacaoPending = rsvps
        .filter(r => r.email !== 'paid')
        .reduce((acc, r) => acc + getColacaoValue(r), 0);

    const totalJantarPaid = rsvps
        .filter(r => r.email === 'paid')
        .reduce((acc, r) => acc + getJantarValue(r), 0);

    const totalJantarPending = rsvps
        .filter(r => r.email !== 'paid')
        .reduce((acc, r) => acc + getJantarValue(r), 0);

    const totalRsvpsPaidValue = totalColacaoPaid + totalJantarPaid;
    const totalRsvpsPendingValue = totalColacaoPending + totalJantarPending;

    const paidGifts = giftSelections.filter(g => g.payment_status === 'paid');
    const pendingGifts = giftSelections.filter(g => g.payment_status !== 'paid');
    const totalGiftPaidValue = paidGifts.reduce((acc, g) => acc + (g.total_value || 0), 0);
    const totalGiftPendingValue = pendingGifts.reduce((acc, g) => acc + (g.total_value || 0), 0);

    const totalPaidRevenue = totalRsvpsPaidValue + totalGiftPaidValue;

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
        { id: 'rsvps', label: 'Confirmações', icon: UserCheck, count: rsvps.length },
        { id: 'received-gifts', label: 'Presentes', icon: Gift, count: giftSelections.length },
        { id: 'manage-gifts', label: 'Lista', icon: Package, count: giftItems.length },
    ];

    return (
        <div className="min-h-screen pb-24 md:pb-8" style={{ background: cream }}>

            {/* ── HEADER ── */}
            <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b" style={{ borderColor: '#e5e0d8' }}>
                <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href="/">
                            <button className="p-2 rounded-xl border transition-all active:scale-95 hover:shadow-sm" style={{ borderColor: '#e5e0d8', color: greenMid }}>
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                        </Link>
                        <div>
                            <h1 className="text-base font-heading flex items-center gap-2" style={{ color: green }}>
                                <Sparkles className="w-4 h-4" style={{ color: gold }} />
                                Painel de Controle
                            </h1>
                            <p className="text-[10px] uppercase tracking-wider hidden sm:block" style={{ color: gold }}>
                                {user?.email}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={fetchAll}
                            className="p-2.5 rounded-xl border transition-all active:scale-95 hover:shadow-sm"
                            style={{ borderColor: '#e5e0d8', color: greenMid }}
                            title="Atualizar dados"
                        >
                            <RefreshCw className="w-4 h-4" />
                        </button>
                        <button
                            onClick={signOut}
                            className="p-2.5 rounded-xl bg-red-50 border border-red-100 text-red-500 hover:bg-red-100 transition-all active:scale-95"
                        >
                            <LogOut className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </header>

            <div className="max-w-6xl mx-auto px-4 pt-5">

                {/* ── STATS CARDS ── */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
                    {/* Card 1: Confirmações */}
                    <div className="bg-white rounded-2xl p-4 relative overflow-hidden border shadow-sm" style={{ borderColor: '#e5e0d8' }}>
                        <div className="absolute top-0 right-0 w-16 h-16 rounded-full -translate-y-1/3 translate-x-1/3 opacity-10" style={{ background: green }} />
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `${green}15` }}>
                                <UserCheck className="w-4 h-4" style={{ color: green }} />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: gold }}>Confirmações</span>
                        </div>
                        <p className="text-2xl font-heading" style={{ color: green }}>{rsvps.length}</p>
                        <p className="text-[10px] mt-0.5 text-slate-400 font-medium">{totalPeople} pessoa(s)</p>
                    </div>

                    {/* Card 2: Colação */}
                    <div className="bg-white rounded-2xl p-4 relative overflow-hidden border shadow-sm" style={{ borderColor: '#e5e0d8' }}>
                        <div className="absolute top-0 right-0 w-16 h-16 rounded-full -translate-y-1/3 translate-x-1/3 opacity-10" style={{ background: '#3b82f6' }} />
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-blue-50">
                                <GraduationCap className="w-4 h-4 text-blue-600" />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: gold }}>Colação</span>
                        </div>
                        <p className="text-xl font-heading text-blue-600">{formatPrice(totalColacaoPaid)}</p>
                        <p className="text-[10px] mt-0.5 text-slate-400 font-medium truncate">Pendente: {formatPrice(totalColacaoPending)}</p>
                    </div>

                    {/* Card 3: Janta */}
                    <div className="bg-white rounded-2xl p-4 relative overflow-hidden border shadow-sm" style={{ borderColor: '#e5e0d8' }}>
                        <div className="absolute top-0 right-0 w-16 h-16 rounded-full -translate-y-1/3 translate-x-1/3 opacity-10" style={{ background: '#f97316' }} />
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-orange-50">
                                <UtensilsCrossed className="w-4 h-4 text-orange-600" />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: gold }}>Janta</span>
                        </div>
                        <p className="text-xl font-heading text-orange-600">{formatPrice(totalJantarPaid)}</p>
                        <p className="text-[10px] mt-0.5 text-slate-400 font-medium truncate">Pendente: {formatPrice(totalJantarPending)}</p>
                    </div>

                    {/* Card 4: Recebidos */}
                    <div className="bg-white rounded-2xl p-4 relative overflow-hidden border shadow-sm" style={{ borderColor: '#e5e0d8' }}>
                        <div className="absolute top-0 right-0 w-16 h-16 rounded-full -translate-y-1/3 translate-x-1/3 opacity-10" style={{ background: '#10b981' }} />
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-emerald-50">
                                <TrendingUp className="w-4 h-4 text-emerald-600" />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: gold }}>Recebidos</span>
                        </div>
                        <p className="text-xl font-heading text-emerald-600">{formatPrice(totalRsvpsPaidValue)}</p>
                        <p className="text-[10px] mt-0.5 text-slate-400 font-medium truncate">Pendente: {formatPrice(totalRsvpsPendingValue)}</p>
                    </div>

                    {/* Card 5: Presentes */}
                    <div className="bg-white rounded-2xl p-4 relative overflow-hidden border shadow-sm" style={{ borderColor: '#e5e0d8' }}>
                        <div className="absolute top-0 right-0 w-16 h-16 rounded-full -translate-y-1/3 translate-x-1/3 opacity-10" style={{ background: '#a855f7' }} />
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-purple-50">
                                <Gift className="w-4 h-4 text-purple-600" />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: gold }}>Presentes</span>
                        </div>
                        <p className="text-xl font-heading text-purple-600">{formatPrice(totalGiftPaidValue)}</p>
                        <p className="text-[10px] mt-0.5 text-slate-400 font-medium truncate">Pendente: {formatPrice(totalGiftPendingValue)}</p>
                    </div>

                    {/* Card 6: Total Geral */}
                    <div className="rounded-2xl p-4 relative overflow-hidden border shadow-sm text-white" style={{ background: green, borderColor: greenMid }}>
                        <div className="absolute top-0 right-0 w-16 h-16 rounded-full -translate-y-1/3 translate-x-1/3 opacity-20" style={{ background: gold }} />
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.15)' }}>
                                <Sparkles className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: goldLight }}>Total Geral</span>
                        </div>
                        <p className="text-xl font-heading text-white">{formatPrice(totalPaidRevenue)}</p>
                        <p className="text-[10px] mt-0.5" style={{ color: 'rgba(255,255,255,0.6)' }}>Adesões + Presentes</p>
                    </div>
                </div>

                {/* ── DESKTOP TAB BAR ── */}
                <div className="hidden md:flex gap-2 mb-6">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all border"
                            style={activeTab === tab.id
                                ? { background: green, color: 'white', borderColor: green, boxShadow: `0 4px 12px ${green}30` }
                                : { background: 'white', color: greenMid, borderColor: '#e5e0d8' }
                            }
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                            <span className="text-[10px] px-2 py-0.5 rounded-full" style={activeTab === tab.id ? { background: 'rgba(255,255,255,0.2)' } : { background: cream }}>
                                {tab.count}
                            </span>
                        </button>
                    ))}
                </div>

                {/* ── MOBILE SECTION HEADER ── */}
                <div className="md:hidden flex items-center justify-between mt-1 mb-4">
                    <h2 className="text-base font-heading" style={{ color: green }}>
                        {activeTab === 'rsvps' && 'Confirmações de Presença'}
                        {activeTab === 'received-gifts' && 'Presentes Recebidos'}
                        {activeTab === 'manage-gifts' && 'Lista de Presentes'}
                    </h2>
                    {activeTab === 'rsvps' && rsvps.length > 0 && (
                        <button onClick={exportRsvpCSV} className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg active:scale-95 transition-transform" style={{ background: `${green}15`, color: green }}>
                            <Download className="w-3.5 h-3.5" /> CSV
                        </button>
                    )}
                    {activeTab === 'manage-gifts' && (
                        <button onClick={() => openGiftModal()} className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg active:scale-95 transition-transform text-white" style={{ background: green }}>
                            <Plus className="w-3.5 h-3.5" /> Novo
                        </button>
                    )}
                </div>

                {/* ══════════════════════════════════
                    TAB: RSVP / CONFIRMAÇÕES
                ══════════════════════════════════ */}
                <AnimatePresence mode="wait">
                    {activeTab === 'rsvps' && (
                        <motion.div key="rsvps" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            {/* Search & Filter */}
                            <div className="flex flex-col sm:flex-row gap-3 mb-5">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: goldLight }} />
                                    <input
                                        placeholder="Buscar por nome ou telefone..."
                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border outline-none text-sm transition-all"
                                        style={{ borderColor: '#e5e0d8', background: 'white', color: green }}
                                        value={rsvpSearch}
                                        onChange={e => setRsvpSearch(e.target.value)}
                                        onFocus={(e) => e.target.style.borderColor = gold}
                                        onBlur={(e) => e.target.style.borderColor = '#e5e0d8'}
                                    />
                                </div>
                                <div className="flex gap-2 flex-wrap">
                                    {[
                                        { val: "all", label: "Todos" },
                                        { val: "colacao", label: "Colação" },
                                        { val: "jantar", label: "Jantar" },
                                        { val: "ambos", label: "Ambos" },
                                    ].map(f => (
                                        <button
                                            key={f.val}
                                            onClick={() => setRsvpFilter(f.val)}
                                            className="px-3 py-2 rounded-xl text-xs font-semibold border transition-all active:scale-95"
                                            style={rsvpFilter === f.val
                                                ? { background: green, color: 'white', borderColor: green }
                                                : { background: 'white', color: greenMid, borderColor: '#e5e0d8' }
                                            }
                                        >
                                            {f.label}
                                        </button>
                                    ))}
                                    <button
                                        onClick={exportRsvpCSV}
                                        className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all active:scale-95"
                                        style={{ background: 'white', color: greenMid, borderColor: '#e5e0d8' }}
                                    >
                                        <Download className="w-3.5 h-3.5" /> CSV
                                    </button>
                                </div>
                            </div>

                            {rsvpLoading ? (
                                <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 animate-spin" style={{ color: gold }} /></div>
                            ) : filteredRsvps.length === 0 ? (
                                <div className="text-center py-16">
                                    <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: creamDark }}>
                                        <Users className="w-8 h-8" style={{ color: goldLight }} />
                                    </div>
                                    <p className="text-sm" style={{ color: greenMid }}>Nenhuma confirmação encontrada</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {filteredRsvps.map(rsvp => {
                                        const isExpanded = expandedRsvpId === rsvp.id;
                                        const attendanceBadge = rsvp.attendance === 'colacao'
                                            ? { bg: 'bg-blue-50', text: 'text-blue-700', label: 'Colação' }
                                            : rsvp.attendance === 'jantar'
                                            ? { bg: 'bg-orange-50', text: 'text-orange-700', label: 'Jantar' }
                                            : rsvp.attendance === 'ambos'
                                            ? { bg: 'bg-emerald-50', text: 'text-emerald-700', label: 'Ambos' }
                                            : { bg: 'bg-gray-50', text: 'text-gray-600', label: rsvp.attendance };

                                        return (
                                            <div key={rsvp.id} className="bg-white rounded-2xl border shadow-sm overflow-hidden transition-all" style={{ borderColor: rsvp.email === 'paid' ? '#10b981' : '#e5e0d8', borderWidth: rsvp.email === 'paid' ? '1.5px' : '1px' }}>
                                                <button
                                                    onClick={() => setExpandedRsvpId(isExpanded ? null : rsvp.id)}
                                                    className="w-full p-4 flex items-center gap-3 text-left"
                                                >
                                                    {/* Avatar */}
                                                    <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm" style={{ background: rsvp.email === 'paid' ? '#10b981' : green }}>
                                                        <span className="font-heading text-base" style={{ color: rsvp.email === 'paid' ? 'white' : gold }}>{rsvp.name?.charAt(0).toUpperCase()}</span>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center justify-between gap-2">
                                                            <h3 className="font-bold text-sm truncate" style={{ color: green }}>{rsvp.name}</h3>
                                                            <div className="flex items-center gap-1.5 flex-shrink-0">
                                                                <span className={`inline-flex items-center px-2 py-0.5 rounded-lg text-[9px] font-bold uppercase ${attendanceBadge.bg} ${attendanceBadge.text}`}>
                                                                    {attendanceBadge.label}
                                                                </span>
                                                                <span className={`inline-flex items-center px-2 py-0.5 rounded-lg text-[9px] font-bold uppercase ${rsvp.email === 'paid' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-600'}`}>
                                                                    {rsvp.email === 'paid' ? 'Pago' : 'Pendente'}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-3 mt-1 flex-wrap">
                                                            <span className="text-[11px] flex items-center gap-1" style={{ color: goldLight }}>
                                                                <Phone className="w-3 h-3" /> {rsvp.phone}
                                                            </span>
                                                            <span className="text-[11px] flex items-center gap-1" style={{ color: goldLight }}>
                                                                <Calendar className="w-3 h-3" /> {new Date(rsvp.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                                                            </span>
                                                            {rsvp.guest_count > 0 && (
                                                                <span className="text-[11px] flex items-center gap-1" style={{ color: goldLight }}>
                                                                    <Users className="w-3 h-3" /> +{rsvp.guest_count}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="text-right flex-shrink-0">
                                                        <p className="text-sm font-bold" style={{ color: rsvp.email === 'paid' ? '#10b981' : greenMid }}>{formatPrice(getColacaoValue(rsvp) + getJantarValue(rsvp))}</p>
                                                        <ChevronRight className={`w-4 h-4 transition-transform mt-1 ml-auto ${isExpanded ? 'rotate-90' : ''}`} style={{ color: goldLight }} />
                                                    </div>
                                                </button>

                                                {isExpanded && (
                                                    <div className="px-4 pb-4 pt-2 space-y-3 border-t" style={{ borderColor: '#e5e0d8' }}>
                                                        {rsvp.companion_names?.length > 0 && (
                                                            <div className="rounded-xl p-3" style={{ background: cream }}>
                                                                <p className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: gold }}>Acompanhantes ({rsvp.companion_names.length})</p>
                                                                <div className="space-y-1">
                                                                    {rsvp.companion_names.map((name: string, idx: number) => (
                                                                        <p key={idx} className="text-xs" style={{ color: greenMid }}>• {name}</p>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                        {rsvp.message && (
                                                            <div className="rounded-xl p-3" style={{ background: `${gold}10` }}>
                                                                <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: gold }}>Mensagem</p>
                                                                <p className="text-xs italic" style={{ color: greenMid }}>"{rsvp.message}"</p>
                                                            </div>
                                                        )}

                                                        {/* Status Manual do RSVP */}
                                                        <div className="rounded-xl p-3 border" style={{ borderColor: '#e5e0d8', background: 'white' }}>
                                                            <p className="text-[10px] font-bold uppercase tracking-wider mb-3" style={{ color: gold }}>Status do Pagamento (Adesão)</p>
                                                            <div className="flex gap-2">
                                                                <button
                                                                    onClick={() => updateRsvpStatus(rsvp.id, 'paid')}
                                                                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold border-2 transition-all active:scale-[0.97] ${rsvp.email === 'paid' ? 'text-white' : 'border-emerald-200 text-emerald-700 bg-emerald-50'}`}
                                                                    style={rsvp.email === 'paid' ? { background: '#10b981', borderColor: '#10b981' } : {}}
                                                                >
                                                                    <CheckCircle2 className="w-4 h-4" />
                                                                    Pago ✅
                                                                </button>
                                                                <button
                                                                    onClick={() => updateRsvpStatus(rsvp.id, 'pending')}
                                                                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold border-2 transition-all active:scale-[0.97] ${rsvp.email !== 'paid' ? 'text-white' : 'border-amber-200 text-amber-600 bg-amber-50'}`}
                                                                    style={rsvp.email !== 'paid' ? { background: '#f59e0b', borderColor: '#f59e0b' } : {}}
                                                                >
                                                                    <Clock className="w-4 h-4" />
                                                                    Pendente ⏳
                                                                </button>
                                                            </div>
                                                        </div>

                                                        <div className="flex justify-end">
                                                            <button
                                                                onClick={() => deleteRsvp(rsvp.id)}
                                                                className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-all"
                                                            >
                                                                <Trash2 className="w-3.5 h-3.5" /> Excluir
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </motion.div>
                    )}

                    {/* ══════════════════════════════════
                        TAB: PRESENTES RECEBIDOS
                    ══════════════════════════════════ */}
                    {activeTab === 'received-gifts' && (
                        <motion.div key="gifts" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <div className="flex gap-3 mb-5">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: goldLight }} />
                                    <input
                                        placeholder="Buscar por nome ou telefone..."
                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border outline-none text-sm transition-all"
                                        style={{ borderColor: '#e5e0d8', background: 'white', color: green }}
                                        value={giftSearch}
                                        onChange={e => setGiftSearch(e.target.value)}
                                        onFocus={(e) => e.target.style.borderColor = gold}
                                        onBlur={(e) => e.target.style.borderColor = '#e5e0d8'}
                                    />
                                </div>
                            </div>

                            {giftsLoading ? (
                                <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 animate-spin" style={{ color: gold }} /></div>
                            ) : filteredGiftSelections.length === 0 ? (
                                <div className="text-center py-16">
                                    <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: creamDark }}>
                                        <Gift className="w-8 h-8" style={{ color: goldLight }} />
                                    </div>
                                    <p className="text-sm" style={{ color: greenMid }}>Nenhuma seleção de presente ainda</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {filteredGiftSelections.map(sel => {
                                        const isPaid = sel.payment_status === 'paid';
                                        const isExpanded = expandedGiftId === sel.id;

                                        return (
                                            <div key={sel.id} className="bg-white rounded-2xl border shadow-sm overflow-hidden" style={{ borderColor: isPaid ? '#10b981' : '#e5e0d8', borderWidth: isPaid ? '1.5px' : '1px' }}>
                                                <button
                                                    onClick={() => setExpandedGiftId(isExpanded ? null : sel.id)}
                                                    className="w-full p-4 flex items-center gap-3 text-left"
                                                >
                                                    <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm" style={{ background: isPaid ? '#10b981' : creamDark }}>
                                                        <Gift className={`w-5 h-5 ${isPaid ? 'text-white' : ''}`} style={!isPaid ? { color: goldLight } : {}} />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center justify-between gap-2">
                                                            <h3 className="font-bold text-sm truncate" style={{ color: green }}>{sel.guest_name}</h3>
                                                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[9px] font-bold uppercase flex-shrink-0 ${isPaid ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-600'}`}>
                                                                {isPaid ? <><CheckCircle2 className="w-2.5 h-2.5" /> Pago</> : <><Clock className="w-2.5 h-2.5" /> Aguard. PIX</>}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-3 mt-1">
                                                            {sel.guest_phone && (
                                                                <span className="text-[11px] flex items-center gap-1" style={{ color: goldLight }}>
                                                                    <Phone className="w-3 h-3" /> {sel.guest_phone}
                                                                </span>
                                                            )}
                                                            <span className="text-[11px] flex items-center gap-1" style={{ color: goldLight }}>
                                                                <Calendar className="w-3 h-3" /> {new Date(sel.created_at).toLocaleDateString('pt-BR')}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="text-right flex-shrink-0">
                                                        <p className="text-sm font-bold" style={{ color: isPaid ? '#10b981' : greenMid }}>{formatPrice(sel.total_value)}</p>
                                                        <ChevronRight className={`w-4 h-4 transition-transform mt-1 ml-auto ${isExpanded ? 'rotate-90' : ''}`} style={{ color: goldLight }} />
                                                    </div>
                                                </button>

                                                {isExpanded && (
                                                    <div className="px-4 pb-4 pt-2 space-y-3 border-t" style={{ borderColor: '#e5e0d8' }}>
                                                        {/* Presentes selecionados */}
                                                        {Array.isArray(sel.selected_gifts) && sel.selected_gifts.length > 0 && (
                                                            <div className="rounded-xl p-3" style={{ background: cream }}>
                                                                <p className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: gold }}>Presentes ({sel.selected_gifts.length})</p>
                                                                <div className="flex flex-wrap gap-1.5">
                                                                    {sel.selected_gifts.map((g: any, i: number) => (
                                                                        <span key={i} className="text-xs px-2 py-1 rounded-lg" style={{ background: `${green}12`, color: green }}>
                                                                            {g?.name}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}

                                                        {/* ── STATUS MANUAL ── */}
                                                        <div className="rounded-xl p-3 border" style={{ borderColor: '#e5e0d8', background: 'white' }}>
                                                            <p className="text-[10px] font-bold uppercase tracking-wider mb-3" style={{ color: gold }}>Status do Pagamento</p>
                                                            <div className="flex gap-2">
                                                                <button
                                                                    onClick={() => updateGiftStatus(sel.id, 'paid')}
                                                                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold border-2 transition-all active:scale-[0.97] ${isPaid ? 'text-white' : 'border-emerald-200 text-emerald-700 bg-emerald-50'}`}
                                                                    style={isPaid ? { background: '#10b981', borderColor: '#10b981' } : {}}
                                                                >
                                                                    <CheckCircle2 className="w-4 h-4" />
                                                                    Pago ✅
                                                                </button>
                                                                <button
                                                                    onClick={() => updateGiftStatus(sel.id, 'pending')}
                                                                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold border-2 transition-all active:scale-[0.97] ${!isPaid ? 'text-white' : 'border-amber-200 text-amber-600 bg-amber-50'}`}
                                                                    style={!isPaid ? { background: '#f59e0b', borderColor: '#f59e0b' } : {}}
                                                                >
                                                                    <Clock className="w-4 h-4" />
                                                                    Aguard. PIX ⏳
                                                                </button>
                                                            </div>
                                                        </div>

                                                        <div className="flex justify-end">
                                                            <button
                                                                onClick={() => deleteGiftSelection(sel.id)}
                                                                className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-all"
                                                            >
                                                                <Trash2 className="w-3.5 h-3.5" /> Excluir
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </motion.div>
                    )}

                    {/* ══════════════════════════════════
                        TAB: GERENCIAR LISTA DE PRESENTES
                    ══════════════════════════════════ */}
                    {activeTab === 'manage-gifts' && (
                        <motion.div key="manage" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <div className="flex gap-3 mb-5">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: goldLight }} />
                                    <input
                                        placeholder="Buscar presente..."
                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border outline-none text-sm transition-all"
                                        style={{ borderColor: '#e5e0d8', background: 'white', color: green }}
                                        value={manageSearch}
                                        onChange={e => setManageSearch(e.target.value)}
                                        onFocus={(e) => e.target.style.borderColor = gold}
                                        onBlur={(e) => e.target.style.borderColor = '#e5e0d8'}
                                    />
                                </div>
                                <button
                                    onClick={() => openGiftModal()}
                                    className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white shadow-sm transition-all active:scale-95"
                                    style={{ background: green }}
                                >
                                    <Plus className="w-4 h-4" /> Novo Presente
                                </button>
                            </div>

                            {manageLoading ? (
                                <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 animate-spin" style={{ color: gold }} /></div>
                            ) : filteredGiftItems.length === 0 ? (
                                <div className="text-center py-16">
                                    <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: creamDark }}>
                                        <Package className="w-8 h-8" style={{ color: goldLight }} />
                                    </div>
                                    <p className="text-sm mb-4" style={{ color: greenMid }}>Nenhum presente cadastrado</p>
                                    <button
                                        onClick={() => openGiftModal()}
                                        className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white mx-auto shadow-sm transition-all active:scale-95"
                                        style={{ background: green }}
                                    >
                                        <Plus className="w-4 h-4" /> Adicionar Primeiro Presente
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {filteredGiftItems.map(gift => (
                                        <div key={gift.id} className="bg-white rounded-2xl border shadow-sm overflow-hidden flex flex-col" style={{ borderColor: '#e5e0d8' }}>
                                            {gift.image_url ? (
                                                <img src={gift.image_url} alt={gift.name} className="w-full h-36 object-cover" />
                                            ) : (
                                                <div className="w-full h-24 flex items-center justify-center" style={{ background: creamDark }}>
                                                    <Package className="w-8 h-8" style={{ color: goldLight }} />
                                                </div>
                                            )}
                                            <div className="p-4 flex flex-col flex-1">
                                                <div className="flex items-start justify-between gap-2 mb-1">
                                                    <h3 className="font-heading font-bold text-sm" style={{ color: green }}>{gift.name}</h3>
                                                    {gift.category && (
                                                        <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: `${gold}20`, color: green }}>
                                                            {gift.category}
                                                        </span>
                                                    )}
                                                </div>
                                                {gift.description && <p className="text-xs line-clamp-2 mb-3 flex-1" style={{ color: goldLight }}>{gift.description}</p>}
                                                <div className="flex items-center justify-between mt-auto pt-2 border-t" style={{ borderColor: '#e5e0d8' }}>
                                                    <span className="text-sm font-bold" style={{ color: green }}>{formatPrice(gift.price)}</span>
                                                    <div className="flex gap-1">
                                                        <button
                                                            onClick={() => openGiftModal(gift)}
                                                            className="p-2 rounded-lg hover:bg-gray-50 transition-all active:scale-95"
                                                            title="Editar"
                                                        >
                                                            <Edit2 className="w-3.5 h-3.5" style={{ color: greenMid }} />
                                                        </button>
                                                        <button
                                                            onClick={() => deleteGiftItem(gift.id)}
                                                            className="p-2 rounded-lg hover:bg-red-50 transition-all active:scale-95"
                                                            title="Excluir"
                                                        >
                                                            <Trash2 className="w-3.5 h-3.5 text-red-400" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* ── MOBILE BOTTOM TAB BAR ── */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t z-50" style={{ borderColor: '#e5e0d8' }}>
                <div className="flex safe-area-pb">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className="flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium transition-colors relative"
                            style={{ color: activeTab === tab.id ? green : '#9ca3af' }}
                        >
                            <tab.icon className="w-5 h-5" />
                            <span>{tab.label}</span>
                            {tab.count > 0 && (
                                <span
                                    className="absolute top-2 right-1/2 translate-x-4 text-[9px] w-4 h-4 flex items-center justify-center rounded-full text-white"
                                    style={{ background: activeTab === tab.id ? green : gold }}
                                >
                                    {tab.count > 9 ? '9+' : tab.count}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── GIFT MODAL ── */}
            <AnimatePresence>
                {showGiftModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-sm"
                        onClick={(e) => { if (e.target === e.currentTarget) setShowGiftModal(false); }}
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 40 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 40 }}
                            className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden"
                        >
                            {/* Modal top accent */}
                            <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${green}, ${gold}, ${green})` }} />

                            {/* Mobile drag handle */}
                            <div className="sm:hidden flex justify-center pt-3 pb-1">
                                <div className="w-10 h-1 rounded-full bg-gray-200" />
                            </div>

                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="font-heading text-xl font-bold" style={{ color: green }}>
                                        {editingGift ? "Editar Presente" : "Novo Presente"}
                                    </h2>
                                    <button
                                        onClick={() => setShowGiftModal(false)}
                                        className="p-2 rounded-xl border transition-all active:scale-95"
                                        style={{ borderColor: '#e5e0d8', color: greenMid }}
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: greenMid }}>Nome *</label>
                                        <input
                                            className="w-full px-4 py-3 rounded-xl border-2 outline-none transition-all text-sm"
                                            style={{ borderColor: '#e5e0d8', background: cream, color: green }}
                                            value={giftForm.name}
                                            onChange={e => setGiftForm(p => ({ ...p, name: e.target.value }))}
                                            placeholder="Ex: Estetoscópio profissional"
                                            onFocus={(e) => e.target.style.borderColor = gold}
                                            onBlur={(e) => e.target.style.borderColor = '#e5e0d8'}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: greenMid }}>Descrição</label>
                                        <input
                                            className="w-full px-4 py-3 rounded-xl border-2 outline-none transition-all text-sm"
                                            style={{ borderColor: '#e5e0d8', background: cream, color: green }}
                                            value={giftForm.description}
                                            onChange={e => setGiftForm(p => ({ ...p, description: e.target.value }))}
                                            placeholder="Breve descrição do presente"
                                            onFocus={(e) => e.target.style.borderColor = gold}
                                            onBlur={(e) => e.target.style.borderColor = '#e5e0d8'}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: greenMid }}>Preço (R$)</label>
                                            <input
                                                type="number"
                                                step="0.01"
                                                className="w-full px-4 py-3 rounded-xl border-2 outline-none transition-all text-sm"
                                                style={{ borderColor: '#e5e0d8', background: cream, color: green }}
                                                value={giftForm.price}
                                                onChange={e => setGiftForm(p => ({ ...p, price: parseFloat(e.target.value) || 0 }))}
                                                onFocus={(e) => e.target.style.borderColor = gold}
                                                onBlur={(e) => e.target.style.borderColor = '#e5e0d8'}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: greenMid }}>Categoria</label>
                                            <input
                                                className="w-full px-4 py-3 rounded-xl border-2 outline-none transition-all text-sm"
                                                style={{ borderColor: '#e5e0d8', background: cream, color: green }}
                                                value={giftForm.category}
                                                onChange={e => setGiftForm(p => ({ ...p, category: e.target.value }))}
                                                placeholder="Ex: Uniformes"
                                                onFocus={(e) => e.target.style.borderColor = gold}
                                                onBlur={(e) => e.target.style.borderColor = '#e5e0d8'}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: greenMid }}>URL da Imagem</label>
                                        <input
                                            className="w-full px-4 py-3 rounded-xl border-2 outline-none transition-all text-sm"
                                            style={{ borderColor: '#e5e0d8', background: cream, color: green }}
                                            value={giftForm.image_url}
                                            onChange={e => setGiftForm(p => ({ ...p, image_url: e.target.value }))}
                                            placeholder="https://..."
                                            onFocus={(e) => e.target.style.borderColor = gold}
                                            onBlur={(e) => e.target.style.borderColor = '#e5e0d8'}
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-3 mt-6">
                                    <button
                                        onClick={() => setShowGiftModal(false)}
                                        className="flex-1 py-3.5 rounded-xl font-bold text-sm border-2 transition-all active:scale-[0.97]"
                                        style={{ borderColor: '#e5e0d8', color: greenMid }}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        onClick={saveGift}
                                        disabled={savingGift}
                                        className="flex-1 py-3.5 rounded-xl font-bold text-sm text-white shadow-lg transition-all active:scale-[0.97] disabled:opacity-50 flex items-center justify-center gap-2"
                                        style={{ background: green }}
                                    >
                                        {savingGift ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                        {savingGift ? 'Salvando...' : 'Salvar'}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
