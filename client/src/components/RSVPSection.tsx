import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { User, Phone, CheckCircle2, GraduationCap, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect, useMemo } from "react";

const formSchema = z.object({
  name: z.string()
    .min(3, { message: "Nome deve ter pelo menos 3 caracteres." })
    .refine(
      (val) => val.trim().split(/\s+/).length >= 2,
      { message: "Por favor, informe nome e sobrenome." }
    ),
  phone: z.string().min(10, {
    message: "Telefone inválido.",
  }),
  events: z.array(z.string()).refine((value) => value.length > 0, {
    message: "Selecione pelo menos um evento.",
  }),
  guests: z.string({
    required_error: "Selecione o número de acompanhantes.",
  }),
  companionNames: z.array(
    z.string()
      .refine(
        (val) => val.trim() === '' || val.trim().split(/\s+/).length >= 2,
        { message: "Informe nome e sobrenome do acompanhante." }
      )
  ).optional(),
  message: z.string().optional(),
});

const COLACAO_PRICE = 60;

export function RSVPSection() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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

  // Calculate total: colação is R$60 per person (including the main guest)
  const totalPrice = useMemo(() => {
    if (!hasColacao) return 0;
    const totalPeople = guestCount + 1; // +1 for the main guest
    return totalPeople * COLACAO_PRICE;
  }, [hasColacao, guestCount]);

  useEffect(() => {
    const currentCompanions = form.getValues("companionNames") || [];
    if (currentCompanions.length !== guestCount) {
      const newCompanions = Array(guestCount).fill("").map((_, i) => currentCompanions[i] || "");
      form.setValue("companionNames", newCompanions, { shouldValidate: true });
    }
  }, [guestCount, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    try {
      const { submitRSVP } = await import("@/hooks/useSubmissions");

      // Build attendance string based on selections
      let attendance: "colacao" | "jantar" | "ambos" | "none" = "none";
      if (hasColacao && hasJantar) attendance = "ambos";
      else if (hasColacao) attendance = "colacao";
      else if (hasJantar) attendance = "jantar";

      const result = await submitRSVP({
        name: values.name.trim(),
        phone: values.phone.trim(),
        attendance,
        guest_count: parseInt(values.guests) || 0,
        companion_names: values.companionNames?.filter(n => n.trim() !== "") || [],
        message: values.message?.trim() || undefined,
      });

      if (!result.success) {
        toast({
          variant: "destructive",
          title: "Erro ao enviar confirmação",
          description: result.error || "Tente novamente mais tarde.",
        });
        setIsSubmitting(false);
        return;
      }

      // Build WhatsApp message
      const companionList = values.companionNames && values.companionNames.length > 0
        ? values.companionNames.filter(name => name.trim() !== "").join(", ")
        : "Nenhum";

      const eventList = [];
      if (hasColacao) eventList.push("Colação de Grau (R$ 60,00)");
      if (hasJantar) eventList.push("Jantar no Mirante (cada convidado paga o seu)");

      const whatsappMessage = `Olá! Confirmo minha presença na formatura da Anna Lívia! ❤️

📋 *Dados:*
Nome: ${values.name}
Acompanhante(s): ${companionList}

🎓 *Eventos confirmados:*
${eventList.join("\n")}

${hasColacao ? `💰 *Valor da colação:* R$ ${totalPrice.toFixed(2)} (${guestCount + 1} pessoa(s) x R$ 60,00)` : ""}

Obrigada pelo convite!!`;

      const encodedMessage = encodeURIComponent(whatsappMessage);
      const phoneNumber = "5563985001811";

      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

      const whatsappUrl = isMobile
        ? `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`
        : `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

      setIsSubmitting(false);
      setIsSuccess(true);

      toast({
        title: "Confirmação enviada com sucesso!",
        description: "Abrindo WhatsApp...",
      });

      setTimeout(() => {
        window.location.href = whatsappUrl;
      }, 500);
    } catch (error) {
      console.error("Error submitting RSVP:", error);
      toast({
        variant: "destructive",
        title: "Erro inesperado",
        description: "Ocorreu um erro ao enviar sua confirmação.",
      });
      setIsSubmitting(false);
    }
  }

  return (
    <section id="rsvp" className="py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-5 md:px-4 relative z-10">
        <div className="text-center mb-8 md:mb-12">
          <p className="font-body text-secondary uppercase tracking-[0.3em] text-xs font-semibold mb-4">
            RSVP
          </p>
          <h2 className="font-script text-4xl md:text-6xl text-primary mb-4">
            Confirme sua Presença
          </h2>
          <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto" />
          <p className="text-muted-foreground max-w-lg mx-auto text-sm md:text-base mt-6">
            Por favor, confirme sua presença até o dia 20 de Julho para que possamos organizar tudo com carinho.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card border border-border/50 rounded-2xl shadow-xl p-5 md:p-10 relative overflow-hidden"
          >
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-primary mb-2">Quase lá!</h3>
                <p className="text-muted-foreground">Sua confirmação foi preparada. Clique abaixo se o WhatsApp não abriu automaticamente.</p>
                <Button
                  variant="outline"
                  className="mt-6 border-primary text-primary"
                  onClick={() => {
                    const companionList = form.getValues("companionNames")?.filter(n => n.trim() !== "").join(", ") || "Nenhum";
                    const events = form.getValues("events");
                    const eventList = [];
                    if (events.includes("colacao")) eventList.push("Colação de Grau (R$ 60,00)");
                    if (events.includes("jantar")) eventList.push("Jantar no Mirante");
                    const msg = `Olá! Confirmo minha presença na formatura da Anna Lívia! ❤️\nNome: ${form.getValues("name")}\nAcompanhante(s): ${companionList}\nEventos: ${eventList.join(", ")}\nObrigada pelo convite!!`;
                    window.open(`https://wa.me/5563985001811?text=${encodeURIComponent(msg)}`, "_blank");
                  }}
                >
                  Abrir WhatsApp manualmente
                </Button>
                <Button
                  variant="link"
                  className="mt-4 text-muted-foreground underline"
                  onClick={() => {
                    setIsSuccess(false);
                    form.reset();
                  }}
                >
                  Enviar outra confirmação
                </Button>
              </div>
            ) : (
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

                  <div className="grid grid-cols-1 gap-6">
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
                  </div>

                  {/* Event Selection */}
                  <FormField
                    control={form.control}
                    name="events"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel className="text-base">Quais eventos você vai participar?</FormLabel>
                          <p className="text-xs text-muted-foreground mt-1">Selecione um ou ambos</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            key="colacao"
                            control={form.control}
                            name="events"
                            render={({ field }) => {
                              return (
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
                                    <p className="text-xs text-muted-foreground">
                                      14/08 às 19:30 • Veredas do Lago
                                    </p>
                                    <p className="text-xs font-semibold text-primary mt-1">
                                      R$ 60,00 por pessoa
                                    </p>
                                    <p className="text-[10px] text-muted-foreground/70 mt-1">
                                      Crianças até 5 anos no colo: grátis. A partir de 5 anos: convite individual.
                                    </p>
                                  </div>
                                </FormItem>
                              )
                            }}
                          />
                          <FormField
                            key="jantar"
                            control={form.control}
                            name="events"
                            render={({ field }) => {
                              return (
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
                                    <p className="text-xs text-muted-foreground">
                                      14/08 às 22:00
                                    </p>
                                    <p className="text-xs font-semibold text-secondary mt-1">
                                      Cada convidado paga o seu
                                    </p>
                                  </div>
                                </FormItem>
                              )
                            }}
                          />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

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

                  {/* Dynamic Companion Names */}
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
                              <FormLabel className="text-sm font-medium">
                                Acompanhante {index + 1} - Nome e Sobrenome
                              </FormLabel>
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

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mensagem (Opcional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Deixe uma mensagem para a formanda..."
                            className="resize-none"
                            {...field}
                          />
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
                          <h4 className="font-heading text-lg font-bold text-primary">Resumo de Valores</h4>
                          <div className="space-y-2 text-sm">
                            {hasColacao && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Colação de Grau ({guestCount + 1} pessoa(s) × R$ 60,00)</span>
                                <span className="font-semibold text-primary">R$ {totalPrice.toFixed(2)}</span>
                              </div>
                            )}
                            {hasJantar && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Jantar no Mirante</span>
                                <span className="font-semibold text-secondary">Cada um paga o seu</span>
                              </div>
                            )}
                            {hasColacao && (
                              <>
                                <div className="border-t border-primary/10 pt-2 flex justify-between">
                                  <span className="font-semibold text-primary">Total Colação</span>
                                  <span className="font-bold text-primary text-lg">R$ {totalPrice.toFixed(2)}</span>
                                </div>
                              </>
                            )}
                          </div>
                          <p className="text-[10px] text-muted-foreground/70 italic">
                            * Crianças até 5 anos no colo são toleradas sem custo na colação. A partir de 5 anos, precisam de convite individual (R$ 60,00).
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <Button
                    type="submit"
                    className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold py-4 md:py-6 text-base md:text-lg rounded-xl min-h-[52px] flex items-center justify-center gap-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Enviando..." : "Confirmar via WhatsApp"}
                  </Button>
                </form>
              </Form>
            )}

            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-50" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
