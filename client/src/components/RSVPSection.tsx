import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { User, Phone, CheckCircle2 } from "lucide-react";
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
import { useState, useEffect } from "react";

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
      // Import submitRSVP dynamically to avoid circular deps
      const { submitRSVP } = await import("@/hooks/useSubmissions");

      // Determine attendance based on selected events
      const isAttending = values.events.includes("attending");

      // Submit to Supabase
      const result = await submitRSVP({
        name: values.name.trim(),
        phone: values.phone.trim(),
        attendance: isAttending ? "attending" : "not-attending",
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

      const whatsappMessage = `Acabei de confirmar minha presença na sua formatura, será uma honra fazer parte desse momento. ❤️\nNome: ${values.name}\nAcompanhante(s): ${companionList}\nObrigada pelo convite!!`;

      const encodedMessage = encodeURIComponent(whatsappMessage);
      const whatsappUrl = `https://wa.me/5551995649195?text=${encodedMessage}`;

      setIsSubmitting(false);
      setIsSuccess(true);

      // Use location.href for better compatibility across all devices
      // window.open can be blocked by popup blockers
      toast({
        title: "Confirmação enviada com sucesso!",
        description: "Redirecionando para o WhatsApp...",
      });

      // Small delay to show the toast, then redirect
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
            Confirme sua Presença
          </p>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm md:text-base">
            Por favor, confirme sua presença até o dia 11 de Fevereiro para que possamos organizar tudo com carinho.
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
                    const msg = `Acabei de confirmar minha presença na sua formatura, será uma honra fazer parte desse momento. ❤️\nNome: ${form.getValues("name")}\nAcompanhante(s): ${companionList}\nObrigada pelo convite!!`;
                    window.open(`https://wa.me/5551995649195?text=${encodeURIComponent(msg)}`, "_blank");
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

                  <FormField
                    control={form.control}
                    name="events"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel className="text-base">Confirmação de Presença</FormLabel>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            key="attending"
                            control={form.control}
                            name="events"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key="attending"
                                  className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes("attending")}
                                      onCheckedChange={(checked) => {
                                        if (checked) {
                                          const filtered = field.value?.filter(v => v !== "not-attending") || [];
                                          field.onChange([...filtered, "attending"]);
                                        } else {
                                          field.onChange(field.value?.filter(v => v !== "attending"));
                                        }
                                      }}
                                    />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel className="text-green-600 font-medium">
                                      ✓ Vou comparecer
                                    </FormLabel>
                                    <p className="text-xs text-muted-foreground">
                                      Confirmo minha presença no evento
                                    </p>
                                  </div>
                                </FormItem>
                              )
                            }}
                          />
                          <FormField
                            key="not-attending"
                            control={form.control}
                            name="events"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key="not-attending"
                                  className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes("not-attending")}
                                      onCheckedChange={(checked) => {
                                        if (checked) {
                                          const filtered = field.value?.filter(v => v !== "attending") || [];
                                          field.onChange([...filtered, "not-attending"]);
                                        } else {
                                          field.onChange(field.value?.filter(v => v !== "not-attending"));
                                        }
                                      }}
                                    />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel className="text-red-500 font-medium">
                                      ✗ Não vou comparecer
                                    </FormLabel>
                                    <p className="text-xs text-muted-foreground">
                                      Infelizmente não poderei ir
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

            {/* Decorative Top Border */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-50" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
