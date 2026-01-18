import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import heroBg from "@assets/generated_images/cinematic_graduation_hero_background.png";

export function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const calculateTimeLeft = () => {
    // Set a date in the future (e.g., July 15, 2026)
    const difference = +new Date("2026-07-15") - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<any>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  const timerComponents: any[] = [];
  const timeLabels: Record<string, string> = {
    days: "Dias",
    hours: "Horas",
    minutes: "Min",
    seconds: "Seg"
  };

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }
    timerComponents.push(
      <div key={interval} className="flex flex-col items-center mx-2 md:mx-4 p-3 md:p-4 bg-black/20 backdrop-blur-md border border-white/10 rounded-lg min-w-[70px] md:min-w-[90px]">
        <span className="text-2xl md:text-4xl font-bold text-white font-heading">
          {timeLeft[interval]}
        </span>
        <span className="text-[10px] md:text-xs text-secondary uppercase tracking-wider mt-1">
          {timeLabels[interval]}
        </span>
      </div>
    );
  });

  return (
    <section id="hero" ref={ref} className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-primary/30 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />
      </motion.div>

      {/* Content */}
      <motion.div 
        className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center"
        style={{ opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 inline-block px-6 py-2 border border-secondary/50 rounded-full bg-black/20 backdrop-blur-sm"
        >
          <span className="text-secondary text-sm md:text-base tracking-[0.2em] uppercase font-medium">
            Convite de Formatura
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-script text-6xl md:text-8xl lg:text-9xl text-white mb-4 drop-shadow-xl"
        >
          João Silva
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-white/90 text-lg md:text-xl font-heading tracking-[0.3em] uppercase mb-12"
        >
          Engenharia de Software • 2026
        </motion.p>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {timerComponents.length ? timerComponents : (
            <span className="text-2xl text-white font-heading">O Grande Dia Chegou!</span>
          )}
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          onClick={() => document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth" })}
          className="group relative px-8 py-3 bg-transparent overflow-hidden rounded-full transition-all hover:bg-secondary/10"
        >
          <span className="absolute inset-0 border border-secondary/60 rounded-full" />
          <span className="relative text-white font-medium tracking-widest uppercase text-sm group-hover:text-secondary transition-colors">
            Confirmar Presença
          </span>
        </motion.button>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 z-10 cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        onClick={() => document.getElementById("graduate")?.scrollIntoView({ behavior: "smooth" })}
      >
        <ChevronDown className="w-8 h-8" />
      </motion.div>
    </section>
  );
}
