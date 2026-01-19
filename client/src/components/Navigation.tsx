import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link } from "wouter";
import { Menu, X, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import logoInitials from "@assets/generated_images/ana_luiza_logo_initials.png";

const NAV_LINKS = [
  { name: "Início", href: "#hero" },
  { name: "A Formanda", href: "#graduate" },
  { name: "Galeria", href: "#gallery" },
  { name: "Comemoração", href: "#ceremony" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-md py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-5 md:px-4 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => scrollToSection(e, "#hero")}
          className="flex items-center transition-opacity hover:opacity-80"
        >
          <img
            src={logoInitials}
            alt="Ana Luiza Logo"
            className={cn(
              "h-10 md:h-12 w-auto transition-all duration-300 object-contain",
              isScrolled ? "brightness-0" : "brightness-0 invert"
            )}
          />
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className={cn(
                "text-sm font-medium tracking-wide hover:text-secondary transition-colors uppercase",
                isScrolled ? "text-foreground" : "text-white/90"
              )}
            >
              {link.name}
            </a>
          ))}
          <Button
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold"
            onClick={(e) => scrollToSection(e as any, "#rsvp")}
          >
            Confirmar
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-3 min-w-[48px] min-h-[48px] flex items-center justify-center text-current"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className={isScrolled ? "text-foreground" : "text-white"} />
          ) : (
            <Menu className={isScrolled ? "text-foreground" : "text-white"} />
          )}
        </button>
      </div>

      {/* Mobile Side Drawer - Rendered via Portal to avoid stacking context issues */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="md:hidden"
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  zIndex: 9998,
                }}
              />

              {/* Drawer Panel */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
                className="md:hidden"
                style={{
                  position: 'fixed',
                  top: 0,
                  right: 0,
                  bottom: 0,
                  width: '280px',
                  backgroundColor: '#1a1515',
                  zIndex: 9999,
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.3)',
                }}
              >
                {/* Close Button */}
                <div className="flex justify-end p-4">
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-3 min-w-[48px] min-h-[48px] rounded-full border border-secondary/30 hover:bg-secondary/10 transition-colors"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                </div>

                {/* Logo */}
                <div className="flex justify-center py-6">
                  <img
                    src={logoInitials}
                    alt="Ana Luiza"
                    className="h-14 w-auto brightness-0 invert"
                  />
                </div>

                {/* Divider */}
                <div className="mx-6 h-px bg-white/10" />

                {/* Nav Links */}
                <div className="flex flex-col px-6 py-6 gap-2">
                  {NAV_LINKS.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => scrollToSection(e, link.href)}
                      className="font-heading text-lg text-white/90 hover:text-secondary transition-colors py-3 px-4 rounded-lg hover:bg-white/5 text-center"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>

                {/* Spacer */}
                <div className="flex-1" />

                {/* CTA Button */}
                <div className="p-6">
                  <Button
                    size="lg"
                    className="w-full bg-secondary hover:bg-secondary/90 text-[#1a1515] font-bold py-6 rounded-full shadow-lg"
                    onClick={(e) => scrollToSection(e as any, "#rsvp")}
                  >
                    Confirmar Presença
                  </Button>
                </div>

                {/* Decorative */}
                <div className="flex justify-center pb-6">
                  <GraduationCap className="w-6 h-6 text-secondary/40" />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </nav>
  );
}
