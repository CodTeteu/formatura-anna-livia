import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { name: "Início", href: "#hero" },
  { name: "O Formando", href: "#graduate" },
  { name: "Galeria", href: "#gallery" },
  { name: "Colação", href: "#ceremony" },
  { name: "Festa", href: "#celebration" },
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
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <a 
          href="#hero" 
          onClick={(e) => scrollToSection(e, "#hero")}
          className={cn(
            "font-script text-3xl font-bold transition-colors",
            isScrolled ? "text-primary" : "text-white"
          )}
        >
          JS
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
          className="md:hidden p-2 text-current"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className={isScrolled ? "text-foreground" : "text-white"} />
          ) : (
            <Menu className={isScrolled ? "text-foreground" : "text-white"} />
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-3/4 max-w-sm bg-background/98 backdrop-blur-xl shadow-2xl z-50 flex flex-col items-center justify-center gap-8 md:hidden border-l border-border/50"
          >
            <GraduationCap className="w-16 h-16 text-secondary mb-4" />
            
            <div className="flex flex-col items-center gap-6">
              {NAV_LINKS.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="font-heading text-2xl text-foreground hover:text-secondary transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            <Button 
              size="lg"
              className="mt-8 bg-secondary hover:bg-secondary/90 text-secondary-foreground"
              onClick={(e) => scrollToSection(e as any, "#rsvp")}
            >
              Confirmar Presença
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
