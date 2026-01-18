import { GraduationCap, Instagram, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-12">
          <GraduationCap className="w-12 h-12 text-secondary mb-6" />
          
          <h2 className="font-script text-4xl mb-2">João Silva</h2>
          <p className="text-white/60 uppercase tracking-widest text-sm mb-8">
            Engenharia de Software • 2026
          </p>
          
          <p className="max-w-md text-white/80 italic font-heading text-xl mb-8">
            "O futuro pertence àqueles que acreditam na beleza de seus sonhos."
          </p>
          
          <div className="flex gap-6">
            <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-secondary hover:text-primary hover:border-secondary transition-all">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-secondary hover:text-primary hover:border-secondary transition-all">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-secondary hover:text-primary hover:border-secondary transition-all">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-white/40">
          <p>&copy; 2026 João Silva. Todos os direitos reservados.</p>
          <p className="mt-2 md:mt-0">
            Desenvolvido com <span className="text-red-400">❤</span> para a Formatura
          </p>
        </div>
      </div>
    </footer>
  );
}
