import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { User, Phone, CheckCircle2, Users, ArrowRight, Copy, Check, QrCode, Gift, Sparkles, GraduationCap, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { QRCodeSVG } from "qrcode.react";

const PIX_KEY = "06010236177";
const PIX_NAME = "ANNA LIVIA CARVALHO";
const PIX_BANK = "Banco do Brasil";
const WHATSAPP_NUMBER = "5563985001811";
const COLACAO_PRICE = 60;

const formSchema = z.object({
  name: z.string().min(3, { message: "Nome deve ter pelo menos 3 caracteres." }).refine(
    (val) => val.trim().split(/\s+/).length >= 2,
    { message: "Por favor, informe nome e sobrenome." }
  ),
  phone: z.string().min(10, { message: "Telefone inválido." }),
  events: z.array(z.string()).refine((value) => value.length > 0, {
    message: "Selecione pelo menos um evento.",
  }),
  guests: z.string({ required_error: "Selecione o número de acompanhantes." }),
  companionNames: z.array(
    z.string().refine(
      (val) => val.trim() === '' || val.trim().split(/\s+/).length >= 2,
      { message: "Informe nome e sobrenome do acompanhante." }
    )
  ).optional(),
  message: z.string().optional(),
});

type RsvpStep = "form" | "payment" | "success";

export function RSVPSection() {
  const { toast } = useToast();
  const [step, setStep] = useState<RsvpStep>("form");
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"pix" | null>(null);
  const [formData, setFormData] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      events: [],
      guests: "0",
      companionNames: [],
      message: "",
    },
  });

  const guestCount = parseInt(form.watch("guests") || "0");
  const selectedEvents = form.watch("events");
  const hasColacao = selectedEvents.includes("colacao");
  const hasJantar = selectedEvents.includes("jantar");

  const totalPrice = useMemo(() => {
    if (!hasColacao) return 0;
    const totalPeople = guestCount + 1;
    return totalPeople * COLACAO_PRICE;
  }, [hasColacao, guestCount]);

  useEffect(() => {
    const currentCompanions = form.getValues("companionNames") || [];
    if (currentCompanions.length !== guestCount) {
      const newCompanions = Array(guestCount).fill("").map((_: any, i: number) => currentCompanions[i] || "");
      form.setValue("companionNames", newCompanions, { shouldValidate: true });
    }
  }, [guestCount, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setFormData(values);
    setStep("payment");
  };

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

  const handleFinalize = async () => {
    setLoading(true);
    try {
      const { submitRSVP } = await import("@/hooks/useSubmissions");
      const isAttending = formData.events.includes("colacao") || formData.events.includes("jantar");

      let attendance: "colacao" | "jantar" | "ambos" | "none" = "none";
      if (hasColacao && hasJantar) attendance = "ambos";
      else if (hasColacao) attendance = "colacao";
      else if (hasJantar) attendance = "jantar";

      await submitRSVP({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        attendance,
        guest_count: parseInt(formData.guests) || 0,
        companion_names: formData.companionNames?.filter((n: string) => n.trim() !== "") || [],
        message: formData.message?.trim() || undefined,
      });

      setPaymentMethod("pix");
      setStep("success");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao salvar",
        description: "Tente novamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  const sendWhatsApp = () => {
    const companionList = formData.companionNames?.filter((n: string) => n.trim() !== "").join(", ") || "Nenhum";
    const eventList = [];
    if (hasColacao) eventList.push("Colação de Grau");
    if (hasJantar) eventList.push("Jantar no Mirante");

    const message = `Olá! Confirmo minha presença na formatura da Anna Lívia! 🎓

📋 *Dados:*
Nome: ${formData.name}
Acompanhante(s): ${companionList}

🎓 *Eventos:*
${eventList.join("\n")}

💰 *Valor colação:* R$ ${totalPrice.toFixed(2)}

Obrigada pelo convite!!`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const formatPrice = (price: number) => price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  // STEP: SUCCESS
  if (step === "success") {
    return (
      <section id="rsvp" className="py-16 md:py-24 relative overflow-hidden">
        <div className="container mx-auto px-5 md:px-4 relative z-10">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-border/50 rounded-2xl shadow-xl overflow-hidden"
            >
              {/* Header */}
              <div className="bg-primary text-white p-8 text-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="font-script text-3xl md:text-4xl mb-2">Presença Confirmada!</h2>
                <p className="text-white/70">Que alegria saber que você estará conosco, {formData.name.split(" ")[0]}!</p>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* Details */}
                  <div>
                    <h3 className="text-xs font-bold text-secondary uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Users className="w-4 h-4" /> Detalhes
                    </h3>
                    <div className="bg-primary/5 rounded-xl p-4 border border-primary/10 space-y-3">
                      <div>
                        <span className="block text-xs text-muted-foreground uppercase">Responsável</span>
                        <span className="font-heading text-lg text-primary">{formData.name}</span>
                      </div>
                      <div>
                        <span className="block text-xs text-muted-foreground uppercase">Data</span>
                        <span className="font-medium">14/08/2026 às 19:30</span>
                      </div>
                      <div>
                        <span className="block text-xs text-muted-foreground uppercase">Acompanhantes</span>
                        <span className="text-sm">{formData.companionNames?.filter((n: string) => n.trim()).join(", ") || "Nenhum"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Summary */}
                  <div>
                    <h3 className="text-xs font-bold text-secondary uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Gift className="w-4 h-4" /> Resumo
                    </h3>
                    <div className="bg-card rounded-xl border border-border overflow-hidden">
                      <div className="p-4 space-y-2">
                        {hasColacao && (
                          <div className="flex justify-between text-sm border-b border-dashed border-border pb-2">
                            <span className="flex items-center gap-2"><GraduationCap className="w-4 h-4 text-secondary" /> Colação</span>
                            <span className="font-medium">{formatPrice(totalPrice)}</span>
                          </div>
                        )}
                        {hasJantar && (
                          <div className="flex justify-between text-sm border-b border-dashed border-border pb-2">
                            <span className="flex items-center gap-2"><UtensilsCrossed className="w-4 h-4 text-secondary" /> Jantar</span>
                            <span className="font-medium text-secondary">Cada um paga</span>
                          </div>
                        )}
                      </div>
                      <div className="bg-primary/5 p-4 flex justify-between items-center border-t border-border">
                        <span className="font-bold text-xs uppercase tracking-wider">Total</span>
                        <span className="font-heading text-xl font-bold text-primary">{formatPrice(totalPrice)}</span>
                      </div>
                      <div className="p-3 text-center text-xs font-bold uppercase tracking-widest bg-green-50 text-green-700">
                        Método Selecionado: PIX
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center space-y-4">
                  <Button onClick={sendWhatsApp} className="bg-[#25D366] hover:bg-[#20ba59] text-white font-bold py-6 text-base rounded-xl w-full">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current mr-2"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    Enviar confirmação no WhatsApp
                  </Button>
                  <button onClick={() => window.location.reload()} className="text-muted-foreground text-xs uppercase tracking-widest hover:text-primary transition-colors">
                    Voltar ao site
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  // STEP: PAYMENT
  if (step === "payment") {
    return (
      <section id="rsvp" className="py-16 md:py-24 relative overflow-hidden">
        <div className="container mx-auto px-5 md:px-4 relative z-10">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-border/50 rounded-2xl shadow-xl overflow-hidden"
            >
              {/* Header */}
              <div className="bg-primary text-white p-8 text-center">
                <h2 className="font-script text-3xl md:text-4xl mb-2">Pagamento</h2>
                <p className="text-white/70">Escolha a melhor forma para você</p>
              </div>

              <div className="p-6 md:p-10">
                {/* Total */}
                <div className="text-center mb-8">
                  <p className="text-xs font-bold text-secondary uppercase tracking-widest mb-2">Valor Total</p>
                  <p className="text-4xl md:text-5xl font-heading text-primary font-bold">{formatPrice(totalPrice)}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Colação para {guestCount + 1} pessoa(s)
                  </p>
                </div>

                {/* PIX Option */}
                <div className="border-2 border-primary rounded-xl p-6 mb-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-full shrink-0">
                      <QrCode className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading text-xl font-bold text-primary flex items-center gap-2">
                        PIX
                        <span className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded-full">Sem taxa</span>
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1 mb-4">Use a chave abaixo ou escaneie o QR Code.</p>

                      {/* QR Code */}
                      <div className="flex justify-center mb-4">
                        <div className="bg-white rounded-xl p-3 border border-border shadow-sm">
                          <QRCodeSVG
                            value={`00020126580014BR.GOV.BCB.PIX0136${PIX_KEY}0212Anna Livia05200000BRBCentral PIX54040.005802BR5913ANNA LIVIA CARVALHO6009ARAGUAINA62070503***6304`}
                            size={180}
                            level="M"
                            includeMargin={false}
                          />
                        </div>
                      </div>

                      {/* Receiver Info */}
                      <div className="bg-primary/5 border border-primary/10 rounded-lg p-3 mb-4 text-center">
                        <p className="text-sm text-primary font-heading font-bold">{PIX_NAME}</p>
                        <p className="text-xs text-secondary">{PIX_BANK}</p>
                      </div>

                      {/* Copy Key */}
                      <button
                        onClick={copyPixKey}
                        className={`w-full p-3 rounded-lg flex items-center justify-between transition-all mb-4 ${copied ? "bg-green-500 text-white" : "bg-muted hover:bg-accent"}`}
                      >
                        <code className={`font-mono text-sm truncate ${copied ? "text-white" : "text-foreground"}`}>{PIX_KEY}</code>
                        <div className={`flex items-center gap-1.5 text-xs font-medium flex-shrink-0 ml-3 ${copied ? "text-white" : "text-primary"}`}>
                          {copied ? <><Check className="w-4 h-4" /> Copiado!</> : <><Copy className="w-4 h-4" /> Copiar</>}
                        </div>
                      </button>

                      {/* Confirm Button */}
                      <Button
                        onClick={handleFinalize}
                        disabled={loading}
                        className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold py-4 text-base rounded-xl"
                      >
                        {loading ? "Processando..." : "Confirmar Pagamento"}
                      </Button>
                    </div>
                  </div>
                </div>

                <button onClick={() => setStep("form")} className="w-full text-muted-foreground hover:text-foreground text-xs py-2 transition-colors">
                  ← Voltar e editar dados
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  // STEP: FORM
  return (
    <section id="rsvp" className="py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-5 md:px-4 relative z-10">
        <div className="text-center mb-8 md:mb-12">
          <p className="font-body text-secondary uppercase tracking-[0.3em] text-xs font-semibold mb-4">RSVP</p>
          <h2 className="font-script text-4xl md:text-6xl text-primary mb-4">Confirme sua Presença</h2>
          <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto" />
          <p className="text-muted-foreground max-w-lg mx-auto text-sm md:text-base mt-6">
            Por favor, confirme sua presença até o dia 20 de Julho.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card border border-border/50 rounded-2xl shadow-xl p-5 md:p-10 relative overflow-hidden"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome Completo</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="Seu nome" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone / WhatsApp</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="(00) 00000-0000" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Events */}
                <FormField
                  control={form.control}
                  name="events"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-base">Quais eventos vai participar?</FormLabel>
                        <p className="text-xs text-muted-foreground mt-1">Selecione um ou ambos</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          key="colacao"
                          control={form.control}
                          name="events"
                          render={({ field }) => (
                            <FormItem
                              key="colacao"
                              className={`flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 transition-colors cursor-pointer ${hasColacao ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'}`}
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes("colacao")}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      field.onChange([...(field.value || []), "colacao"]);
                                    } else {
                                      field.onChange(field.value?.filter(v => v !== "colacao"));
                                    }
                                  }}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none flex-1">
                                <FormLabel className="text-primary font-medium flex items-center gap-2">
                                  <GraduationCap className="w-4 h-4" />
                                  Colação de Grau
                                </FormLabel>
                                <p className="text-xs text-muted-foreground">14/08 às 19:30 • Veredas do Lago</p>
                                <p className="text-xs font-semibold text-primary mt-1">R$ 60,00 por pessoa</p>
                              </div>
                            </FormItem>
                          )}
                        />
                        <FormField
                          key="jantar"
                          control={form.control}
                          name="events"
                          render={({ field }) => (
                            <FormItem
                              key="jantar"
                              className={`flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 transition-colors cursor-pointer ${hasJantar ? 'border-secondary bg-secondary/5' : 'hover:bg-muted/50'}`}
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes("jantar")}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      field.onChange([...(field.value || []), "jantar"]);
                                    } else {
                                      field.onChange(field.value?.filter(v => v !== "jantar"));
                                    }
                                  }}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none flex-1">
                                <FormLabel className="text-secondary font-medium flex items-center gap-2">
                                  <UtensilsCrossed className="w-4 h-4" />
                                  Jantar no Mirante
                                </FormLabel>
                                <p className="text-xs text-muted-foreground">14/08 às 22:00</p>
                                <p className="text-xs font-semibold text-secondary mt-1">R$ 70,00 por pessoa</p>
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Guests */}
                <FormField
                  control={form.control}
                  name="guests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número de Acompanhantes</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="0">Apenas eu</SelectItem>
                          <SelectItem value="1">1 Acompanhante</SelectItem>
                          <SelectItem value="2">2 Acompanhantes</SelectItem>
                          <SelectItem value="3">3 Acompanhantes</SelectItem>
                          <SelectItem value="4">4 Acompanhantes</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Companion Names */}
                <AnimatePresence>
                  {guestCount > 0 && Array.from({ length: guestCount }).map((_, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <FormField
                        control={form.control}
                        name={`companionNames.${index}`}
                        render={({ field }) => (
                          <FormItem className="mb-4">
                            <FormLabel className="text-sm font-medium">Acompanhante {index + 1} - Nome e Sobrenome</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground opacity-70" />
                                <Input placeholder="Nome do acompanhante" className="pl-10" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Message */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mensagem (Opcional)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Deixe uma mensagem para a formanda..." className="resize-none" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Price Summary */}
                <AnimatePresence>
                  {hasColacao && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-primary/5 border border-primary/10 rounded-xl p-5 space-y-3">
                        <h4 className="font-heading text-lg font-bold text-primary">Resumo</h4>
                        <div className="space-y-2 text-sm">
                          {hasColacao && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Colação ({guestCount + 1} × R$ 60,00)</span>
                              <span className="font-semibold text-primary">{formatPrice(totalPrice)}</span>
                            </div>
                          )}
                          {hasJantar && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Jantar ({guestCount + 1} × R$ 70,00)</span>
                              <span className="font-semibold text-primary">{formatPrice((guestCount + 1) * 70)}</span>
                            </div>
                          )}
                          <div className="border-t border-primary/10 pt-2 flex justify-between">
                            <span className="font-bold text-primary">Total Colação</span>
                            <span className="font-bold text-primary text-lg">{formatPrice(totalPrice)}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-6 text-base rounded-xl">
                  Continuar para Pagamento <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </Form>

            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-50" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import { useMemo, useEffect } from "react";
