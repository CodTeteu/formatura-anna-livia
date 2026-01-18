import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { motion } from "framer-motion";
import { User, Phone, Mail, CheckCircle2 } from "lucide-react";
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
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Nome deve ter pelo menos 2 caracteres.",
  }),
  phone: z.string().min(10, {
    message: "Telefone inválido.",
  }),
  email: z.string().email({
    message: "Email inválido.",
  }),
  events: z.array(z.string()).refine((value) => value.length > 0, {
    message: "Selecione pelo menos um evento.",
  }),
  guests: z.string({
    required_error: "Selecione o número de acompanhantes.",
  }),
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
      email: "",
      events: [],
      guests: "0",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      console.log(values);
      setIsSubmitting(false);
      setIsSuccess(true);
      toast({
        title: "Presença Confirmada!",
        description: "Obrigado por confirmar. Nos vemos lá!",
      });
    }, 1500);
  }

  return (
    <section id="rsvp" className="py-24 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="font-body text-secondary uppercase tracking-[0.3em] text-xs font-semibold mb-4">
            Confirme sua Presença
          </p>
          <h2 className="font-script text-4xl md:text-6xl text-primary mb-4">
            RSVP
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Por favor, confirme sua presença até o dia 30 de Junho para que possamos organizar tudo com carinho.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card border border-border/50 rounded-2xl shadow-xl p-6 md:p-10 relative overflow-hidden"
          >
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-primary mb-2">Obrigado!</h3>
                <p className="text-muted-foreground">Sua confirmação foi enviada com sucesso.</p>
                <Button 
                  variant="link" 
                  className="mt-6 text-primary"
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input placeholder="seu@email.com" className="pl-10" {...field} />
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
                          <FormLabel className="text-base">Eventos que participará</FormLabel>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            key="ceremony"
                            control={form.control}
                            name="events"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key="ceremony"
                                  className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes("ceremony")}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, "ceremony"])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== "ceremony"
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel>
                                      Colação de Grau
                                    </FormLabel>
                                    <p className="text-xs text-muted-foreground">
                                      15 de Julho • 19:00
                                    </p>
                                  </div>
                                </FormItem>
                              )
                            }}
                          />
                          <FormField
                            key="celebration"
                            control={form.control}
                            name="events"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key="celebration"
                                  className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes("celebration")}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, "celebration"])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== "celebration"
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel>
                                      Baile de Formatura
                                    </FormLabel>
                                    <p className="text-xs text-muted-foreground">
                                      15 de Julho • 23:00
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

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mensagem (Opcional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Deixe uma mensagem para o formando..."
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
                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-6 text-lg rounded-xl"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Enviando..." : "Confirmar Presença"}
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
