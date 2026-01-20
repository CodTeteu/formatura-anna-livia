import { Instagram, Settings } from "lucide-react";
import lumaLogo from "@assets/generated_images/luma_logo.png";

export function Footer() {
  return (
    <footer className="bg-[#1a1515] text-white pt-8 pb-4 border-t border-white/5 relative z-10">
      <div className="container mx-auto px-4 flex flex-col items-center text-center">
        {/* Name in Script Font */}
        <h3 className="font-script text-3xl md:text-4xl text-[#c5a87e] mb-4">
          Ana Luiza
        </h3>

        {/* Quote */}
        <p className="font-heading italic text-sm md:text-base text-white/70 mb-1 max-w-lg">
          "Liberdade é pouco. O que eu desejo ainda não tem nome."
        </p>
        <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/50 mb-5">
          — Clarice Lispector
        </span>

        {/* Admin Link Button */}
        <a
          href="/admin"
          className="border border-[#c5a87e]/30 rounded-lg px-6 py-2 flex items-center gap-2 text-[#c5a87e] text-[10px] md:text-xs font-semibold tracking-[0.2em] hover:bg-[#c5a87e]/5 transition-colors mb-5"
        >
          <Settings className="w-3.5 h-3.5" />
          PAINEL ADMIN
        </a>

        {/* Separator */}
        <div className="w-full h-px bg-white/10 max-w-md mb-4" />

        {/* Developed by */}
        <p className="text-[#c5a87e]/60 text-[9px] tracking-[0.3em] font-semibold mb-1 uppercase">
          Site desenvolvido por
        </p>

        {/* Logo */}
        <div className="mb-1 w-20 md:w-24">
          <img
            src={lumaLogo}
            alt="LUMA Convites Digitais"
            className="w-full h-auto brightness-110"
          />
        </div>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/luma.convitesdigitais?igsh=MWt6dmtjcjE5cmU0aQ%3D%3D&utm_source=qr"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-[#c5a87e]/70 text-[10px] md:text-xs hover:text-white transition-colors mb-4"
        >
          <Instagram className="w-3 h-3" />
          <span className="font-medium tracking-tight">@luma.convitesdigitais</span>
        </a>

        {/* Copyright */}
        <p className="text-[9px] text-white/40 tracking-wide">
          © 2026 Formatura Ana Luiza. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}


