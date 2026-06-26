import { Instagram, Settings } from "lucide-react";
import lumaLogo from "@assets/generated_images/luma_logo.png";

const appPath = (path = "") => `${import.meta.env.BASE_URL}${path}`.replace(/\/$/, "") || "/";

export function Footer() {
  return (
    <footer className="bg-primary text-white pt-10 pb-6 relative z-10">
      <div className="container mx-auto px-4 flex flex-col items-center text-center">
        {/* Name in Script Font */}
        <h3 className="font-script text-3xl md:text-4xl text-white mb-6">
          Anna Lívia
        </h3>

        {/* Admin Link Button */}
        <a
          href={appPath("admin")}
          className="border border-white/30 rounded-lg px-6 py-2 flex items-center gap-2 text-white text-[10px] md:text-xs font-semibold tracking-[0.2em] hover:bg-white/10 transition-colors mb-6"
        >
          <Settings className="w-3.5 h-3.5" />
          PAINEL ADMIN
        </a>

        {/* Separator */}
        <div className="w-full h-px bg-white/10 max-w-md mb-5" />

        {/* Developed by */}
        <p className="text-white/60 text-[9px] tracking-[0.3em] font-semibold mb-2 uppercase">
          Site desenvolvido por
        </p>

        {/* Logo */}
        <div className="mb-2 w-20 md:w-24">
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
          className="flex items-center gap-1.5 text-white/70 text-[10px] md:text-xs hover:text-white transition-colors mb-4"
        >
          <Instagram className="w-3 h-3" />
          <span className="font-medium tracking-tight">@luma.convitesdigitais</span>
        </a>

        {/* Copyright */}
        <p className="text-[9px] text-white/40 tracking-wide">
          © 2026 Formatura Anna Lívia. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
