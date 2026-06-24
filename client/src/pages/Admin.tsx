import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    Users,
    Calendar,
    Mail,
    Phone,
    Trash2,
    Download,
    Search,
    Lock,
    LogOut,
    GraduationCap,
    Loader2,
    Gift
} from "lucide-react";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useSubmissions } from "@/hooks/useSubmissions";
import type { RSVPSubmission } from "@/lib/supabase";

const assetPath = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

// ===========================================
// LOGIN FORM COMPONENT
// ===========================================
function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signIn, loading, error } = useAuth();
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await signIn(email, password);

        if (result.success) {
            toast({
                title: "Login realizado com sucesso",
                description: "Bem-vindo ao painel administrativo.",
            });
        } else {
            toast({
                variant: "destructive",
                title: "Falha no login",
                description: result.error || "Verifique suas credenciais.",
            });
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center p-4 bg-cover bg-fixed"
            style={{ backgroundImage: `url(${assetPath("/elegant_bg.png")})` }}
        >
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-0" />
            <Card className="w-full max-w-md relative z-10 border-none shadow-2xl bg-white/90 backdrop-blur-xl">
                <CardHeader className="text-center space-y-2 pb-8">
                    <div className="mx-auto w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mb-4">
                        <GraduationCap className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="font-script text-4xl text-primary">Área Administrativa</CardTitle>
                    <CardDescription className="text-base">
                        Entre com suas credenciais para gerenciar os convidados
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="admin@admin.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10 h-11 bg-white/50 border-gray-200 focus:border-secondary transition-all"
                                    disabled={loading}
                                />
                                <Mail className="w-4 h-4 absolute left-3 top-3.5 text-gray-400" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Senha</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10 h-11 bg-white/50 border-gray-200 focus:border-secondary transition-all"
                                    disabled={loading}
                                />
                                <Lock className="w-4 h-4 absolute left-3 top-3.5 text-gray-400" />
                            </div>
                        </div>
                        {error && (
                            <p className="text-sm text-red-500 text-center">{error}</p>
                        )}
                        <Button
                            type="submit"
                            className="w-full h-11 text-lg font-medium bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Entrando...
                                </>
                            ) : (
                                "Entrar no Painel"
                            )}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center pb-8">
                    <Link href="/">
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Voltar para o site
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}

// ===========================================
// STATS CARD COMPONENT
// ===========================================
interface StatsCardProps {
    title: string;
    value: number;
    suffix: string;
    icon: React.ReactNode;
    color: string;
    delay?: number;
}

function StatsCard({ title, value, suffix, icon, color, delay = 0 }: StatsCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
        >
            <Card className={`border-none shadow-lg shadow-${color}/5 bg-white overflow-hidden relative group hover:-translate-y-1 transition-all duration-300`}>
                <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-${color}`}>
                    {icon}
                </div>
                <CardHeader className="pb-2 relative z-10">
                    <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{title}</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                    <div className="flex items-end gap-2">
                        <span className={`text-4xl font-heading font-bold text-${color}`}>{value}</span>
                        <span className="text-sm text-muted-foreground mb-1">{suffix}</span>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}

// ===========================================
// SUBMISSIONS TABLE COMPONENT
// ===========================================
interface SubmissionsTableProps {
    submissions: RSVPSubmission[];
    onDelete: (id: string) => void;
    searchTerm: string;
    filterEvent: string | null;
}

function SubmissionsTable({ submissions, onDelete, searchTerm, filterEvent }: SubmissionsTableProps) {
    const eventLabels: Record<string, string> = {
        attending: "Vai comparecer",
        "not-attending": "Não vai",
        colacao: "Colação",
        jantar: "Jantar",
        ambos: "Colação + Jantar",
        none: "Não informado"
    };

    const filteredSubmissions = submissions.filter((sub) => {
        const matchesSearch =
            sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            sub.phone.includes(searchTerm) ||
            (sub.email?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);

        const matchesFilter = filterEvent
            ? sub.attendance === filterEvent
            : true;

        return matchesSearch && matchesFilter;
    });

    if (filteredSubmissions.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-24 text-muted-foreground bg-gray-50/50">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    <Users className="w-10 h-10 opacity-30" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-gray-900 mb-2">Nenhuma confirmação encontrada</h3>
                <p className="max-w-xs text-center text-sm opacity-80">
                    As confirmações de presença aparecerão aqui assim que forem enviadas pelos convidados.
                </p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow className="bg-gray-50/80 hover:bg-gray-50/80 border-b border-primary/10">
                        <TableHead className="font-semibold text-primary py-5 pl-6">Nome do Convidado</TableHead>
                        <TableHead className="font-semibold text-primary py-5">Contato</TableHead>
                        <TableHead className="font-semibold text-primary py-5">Status</TableHead>
                        <TableHead className="font-semibold text-primary text-center py-5">Pessoas</TableHead>
                        <TableHead className="font-semibold text-primary py-5">Mensagem</TableHead>
                        <TableHead className="font-semibold text-primary py-5">Data</TableHead>
                        <TableHead className="w-[80px] py-5"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredSubmissions.map((sub, index) => (
                        <motion.tr
                            key={sub.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="group hover:bg-primary/[0.02] transition-colors border-b border-gray-100 last:border-0"
                        >
                            <TableCell className="font-medium text-gray-900 py-4 pl-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                                        {sub.name.charAt(0).toUpperCase()}
                                    </div>
                                    {sub.name}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex flex-col gap-1.5 text-sm">
                                    <span className="flex items-center gap-2 text-gray-600">
                                        <Phone className="w-3.5 h-3.5 text-secondary" /> {sub.phone}
                                    </span>
                                    {sub.email && (
                                        <span className="flex items-center gap-2 text-gray-500">
                                            <Mail className="w-3.5 h-3.5 text-secondary" /> {sub.email}
                                        </span>
                                    )}
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge
                                    variant="secondary"
                                    className={`font-normal border-0 ${
                                        sub.attendance === 'attending' || sub.attendance === 'colacao' || sub.attendance === 'ambos'
                                            ? 'bg-green-100 text-green-700'
                                            : sub.attendance === 'jantar'
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'bg-red-100 text-red-700'
                                        }`}
                                >
                                    {eventLabels[sub.attendance] || sub.attendance}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <div className="flex flex-col gap-1">
                                    <Badge variant="outline" className="font-medium border-gray-200 w-fit">
                                        +{sub.guest_count} {sub.guest_count === 1 ? 'pessoa' : 'pessoas'}
                                    </Badge>
                                    {sub.companion_names && sub.companion_names.length > 0 && (
                                        <div className="text-xs text-gray-500 max-w-[200px]">
                                            {sub.companion_names.filter(n => n.trim()).join(', ')}
                                        </div>
                                    )}
                                </div>
                            </TableCell>
                            <TableCell>
                                {sub.message ? (
                                    <div className="max-w-[300px] text-gray-600 italic bg-gray-50 px-2 py-1 rounded text-xs border border-gray-100 whitespace-pre-wrap break-words">
                                        "{sub.message}"
                                    </div>
                                ) : (
                                    <span className="text-gray-300">-</span>
                                )}
                            </TableCell>
                            <TableCell className="text-gray-500 text-sm whitespace-nowrap">
                                {new Date(sub.created_at).toLocaleDateString("pt-BR")}
                                <span className="block text-xs text-gray-400">
                                    {new Date(sub.created_at).toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </TableCell>
                            <TableCell>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => onDelete(sub.id)}
                                    className="text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all rounded-full"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </TableCell>
                        </motion.tr>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

// ===========================================
// MAIN ADMIN COMPONENT
// ===========================================
export default function Admin() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterEvent, setFilterEvent] = useState<string | null>(null);

    const { isAuthenticated, loading: authLoading, signOut, user } = useAuth();
    const { submissions, loading: dataLoading, deleteSubmission } = useSubmissions();
    const { toast } = useToast();

    const handleLogout = async () => {
        await signOut();
        toast({
            title: "Logout realizado",
            description: "Você foi desconectado do painel.",
        });
    };

    const handleDelete = async (id: string) => {
        const result = await deleteSubmission(id);
        if (result.success) {
            toast({ title: "Confirmação removida" });
        } else {
            toast({
                variant: "destructive",
                title: "Erro ao remover",
                description: result.error
            });
        }
    };

    const exportExcel = () => {
        const data = submissions.map(s => ({
            "Nome": s.name,
            "Telefone": s.phone,
            "Email": s.email || "",
            "Status": s.attendance === 'attending' ? 'Vai comparecer' : 'Não vai',
            "Acompanhantes": s.guest_count,
            "Nomes Acompanhantes": s.companion_names?.join(", ") || "",
            "Mensagem": s.message || "",
            "Data": new Date(s.created_at).toLocaleString("pt-BR")
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Confirmações");
        XLSX.writeFile(workbook, `Confirmacoes_AnaLuiza_${new Date().toLocaleDateString('pt-BR').replace(/\//g, '-')}.xlsx`);
    };

    // Show loading while checking auth
    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    // Show login form if not authenticated
    if (!isAuthenticated) {
        return <LoginForm />;
    }

    // Calculate stats
    const totalGuests = submissions.reduce((acc, sub) => acc + (sub.guest_count || 0) + 1, 0);
    const attendingCount = submissions.filter(s => s.attendance === 'attending' || s.attendance === 'colacao' || s.attendance === 'ambos').length;
    const notAttendingCount = submissions.filter(s => s.attendance === 'not-attending' || s.attendance === 'none').length;

    return (
        <div className="min-h-screen bg-neutral-50/50">
            {/* Background decoration */}
            <div
                className="fixed inset-0 opacity-10 pointer-events-none z-0 mix-blend-multiply"
                style={{ backgroundImage: `url(${assetPath("/elegant_bg.png")})` }}
            />

            {/* Header */}
            <header className="bg-white/80 backdrop-blur-md border-b border-primary/10 sticky top-0 z-50 shadow-sm relative">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <Link href="/">
                            <Button variant="ghost" size="icon" className="hover:bg-primary/5 rounded-full w-10 h-10">
                                <ArrowLeft className="w-5 h-5 text-primary" />
                            </Button>
                        </Link>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/5 rounded-full flex items-center justify-center">
                                <GraduationCap className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex flex-col">
                                <h1 className="text-xl font-heading font-bold text-primary tracking-wide">Painel Administrativo</h1>
                                <p className="text-muted-foreground text-xs uppercase tracking-wider">
                                    {user?.email}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Button onClick={exportExcel} variant="outline" className="hidden sm:flex border-primary/20 hover:bg-primary/5 text-primary hover:text-primary">
                            <Download className="w-4 h-4 mr-2" />
                            Exportar Excel
                        </Button>
                        <Button onClick={handleLogout} variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                            <LogOut className="w-4 h-4 mr-2" />
                            Sair
                        </Button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-6 py-8 relative z-10 max-w-7xl">
                {/* Welcome Section */}
                <div className="mb-10">
                    <h2 className="font-script text-4xl text-primary mb-2">Bem-vindo(a), Admin</h2>
                    <p className="text-muted-foreground">Aqui está o resumo das confirmações de presença para o evento.</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <StatsCard
                        title="Respostas"
                        value={submissions.length}
                        suffix="formulários"
                        icon={<Users className="w-16 h-16" />}
                        color="primary"
                        delay={0.1}
                    />
                    <StatsCard
                        title="Total de Pessoas"
                        value={totalGuests}
                        suffix="convidados"
                        icon={<Users className="w-16 h-16" />}
                        color="emerald-600"
                        delay={0.2}
                    />
                    <StatsCard
                        title="Vão Comparecer"
                        value={attendingCount}
                        suffix="confirmados"
                        icon={<GraduationCap className="w-16 h-16" />}
                        color="green-600"
                        delay={0.3}
                    />
                    <StatsCard
                        title="Não Vão"
                        value={notAttendingCount}
                        suffix="ausências"
                        icon={<Calendar className="w-16 h-16" />}
                        color="red-500"
                        delay={0.4}
                    />
                </div>

                {/* Search and Filter */}
                <Card className="mb-8 border-none shadow-lg shadow-black/5 bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row gap-6 items-center">
                            <div className="relative flex-1 w-full">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    placeholder="Buscar por nome, telefone ou email..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 h-12 border-primary/10 focus:border-secondary bg-white shadow-sm"
                                />
                            </div>
                            <div className="flex gap-2 w-full sm:w-auto p-1 bg-gray-100/50 rounded-lg border border-gray-200/50">
                                <Button
                                    variant={filterEvent === null ? "default" : "ghost"}
                                    onClick={() => setFilterEvent(null)}
                                    className={`flex-1 sm:flex-none ${filterEvent === null ? "bg-primary text-white shadow-md" : "text-muted-foreground hover:text-primary hover:bg-white"}`}
                                >
                                    Todos
                                </Button>
                                <Button
                                    variant={filterEvent === "attending" ? "default" : "ghost"}
                                    onClick={() => setFilterEvent("attending")}
                                    className={`flex-1 sm:flex-none ${filterEvent === "attending" ? "bg-green-600 text-white shadow-md" : "text-muted-foreground hover:text-green-600 hover:bg-white"}`}
                                >
                                    Confirmados
                                </Button>
                                <Button
                                    variant={filterEvent === "not-attending" ? "default" : "ghost"}
                                    onClick={() => setFilterEvent("not-attending")}
                                    className={`flex-1 sm:flex-none ${filterEvent === "not-attending" ? "bg-red-500 text-white shadow-md" : "text-muted-foreground hover:text-red-500 hover:bg-white"}`}
                                >
                                    Ausências
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Table */}
                <Card className="border-none shadow-xl shadow-black/5 bg-white overflow-hidden">
                    <CardContent className="p-0">
                        {dataLoading ? (
                            <div className="flex items-center justify-center py-24">
                                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                            </div>
                        ) : (
                            <SubmissionsTable
                                submissions={submissions}
                                onDelete={handleDelete}
                                searchTerm={searchTerm}
                                filterEvent={filterEvent}
                            />
                        )}
                    </CardContent>
                </Card>

                {/* Gift Selections Section */}
                <GiftSelectionsSection />
            </main>
        </div>
    );
}

// ===========================================
// GIFT SELECTIONS SECTION
// ===========================================
function GiftSelectionsSection() {
    const [giftSelections, setGiftSelections] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGifts = async () => {
            const { supabase } = await import("@/lib/supabase");
            const { data, error } = await supabase
                .from('gift_selections')
                .select('*')
                .order('created_at', { ascending: false });

            if (!error && data) {
                setGiftSelections(data);
            }
            setLoading(false);
        };
        fetchGifts();
    }, []);

    const handleDelete = async (id: string) => {
        const { supabase } = await import("@/lib/supabase");
        await supabase.from('gift_selections').delete().eq('id', id);
        setGiftSelections(prev => prev.filter(s => s.id !== id));
    };

    return (
        <div className="mt-10">
            <h2 className="font-heading text-2xl font-bold text-primary mb-6 flex items-center gap-3">
                <Gift className="w-6 h-6 text-secondary" />
                Seleções de Presentes
            </h2>
            <Card className="border-none shadow-xl shadow-black/5 bg-white overflow-hidden">
                <CardContent className="p-0">
                    {loading ? (
                        <div className="flex items-center justify-center py-24">
                            <Loader2 className="w-8 h-8 animate-spin text-primary" />
                        </div>
                    ) : giftSelections.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-24 text-muted-foreground bg-gray-50/50">
                            <Gift className="w-10 h-10 opacity-30 mb-4" />
                            <h3 className="text-xl font-heading font-semibold text-gray-900 mb-2">Nenhuma seleção de presente</h3>
                            <p className="text-sm">As seleções de presentes aparecerão aqui.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-gray-50/80 border-b border-primary/10">
                                        <TableHead className="font-semibold text-primary py-5 pl-6">Convidado</TableHead>
                                        <TableHead className="font-semibold text-primary py-5">Presentes</TableHead>
                                        <TableHead className="font-semibold text-primary py-5">Valor</TableHead>
                                        <TableHead className="font-semibold text-primary py-5">Status</TableHead>
                                        <TableHead className="font-semibold text-primary py-5">Data</TableHead>
                                        <TableHead className="w-[80px] py-5"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {giftSelections.map((selection: any) => (
                                        <motion.tr
                                            key={selection.id}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="hover:bg-primary/[0.02] transition-colors border-b border-gray-100 last:border-0"
                                        >
                                            <TableCell className="font-medium text-gray-900 py-4 pl-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary text-xs font-bold shadow-sm">
                                                        <Gift className="w-4 h-4" />
                                                    </div>
                                                    {selection.guest_name}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="text-sm max-w-[250px]">
                                                    {Array.isArray(selection.selected_gifts) &&
                                                        selection.selected_gifts.map((g: any, i: number) => (
                                                            <span key={i} className="inline-block bg-primary/5 text-primary text-xs px-2 py-1 rounded mr-1 mb-1">
                                                                {g.name}
                                                            </span>
                                                        ))
                                                    }
                                                </div>
                                            </TableCell>
                                            <TableCell className="font-semibold text-primary">
                                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(selection.total_value || 0)}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="secondary" className={`font-normal border-0 ${
                                                    selection.payment_status === 'paid' ? 'bg-green-100 text-green-700' :
                                                    selection.payment_status === 'confirmed' ? 'bg-blue-100 text-blue-700' :
                                                    'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                    {selection.payment_status === 'paid' ? 'Pago' :
                                                     selection.payment_status === 'confirmed' ? 'Confirmado' : 'Pendente'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-gray-500 text-sm whitespace-nowrap">
                                                {new Date(selection.created_at).toLocaleDateString("pt-BR")}
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleDelete(selection.id)}
                                                    className="text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all rounded-full"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </TableCell>
                                        </motion.tr>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
