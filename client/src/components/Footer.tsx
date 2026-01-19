import { Instagram, Settings } from "lucide-react";
import lumaLogo from "@assets/generated_images/luma_logo.png";

export function Footer() {
  return (
    <footer className="bg-[#1a1515] text-white pt-4 pb-4 border-t border-white/5 relative z-10">
      <div className="container mx-auto px-4 flex flex-col items-center text-center">
        {/* Admin Link Button */}
        <a
          href="/admin"
          className="border border-[#c5a87e]/30 rounded-lg px-8 py-2 flex items-center gap-2 text-[#c5a87e] text-[10px] md:text-xs font-semibold tracking-[0.2em] hover:bg-[#c5a87e]/5 transition-colors mb-2"
        >
          <Settings className="w-4 h-4" />
          PAINEL ADMIN
        </a>

        {/* Separator */}
        <div className="w-full h-px bg-white/10 max-w-lg mb-2" />

        {/* Developed by */}
        <p className="text-[#c5a87e]/80 text-[10px] tracking-[0.4em] font-semibold mb-0 uppercase">
          Site desenvolvido por
        </p>

        {/* Logo */}
        <div className="mb-1 w-24 md:w-28">
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
          className="flex items-center gap-2 text-[#c5a87e]/90 text-[10px] md:text-xs hover:text-white transition-colors"
        >
          <Instagram className="w-3.5 h-3.5" />
          <span className="font-medium tracking-tight">@luma.convitesdigitais</span>
        </a>
      </div>
    </footer>
  );
}
