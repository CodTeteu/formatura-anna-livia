import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import heroBg from "@assets/generated_images/cinematic_graduation_hero_background.png";
import heroMe from "/assets/hero_ana.jpg";

export function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const calculateTimeLeft = () => {
    // Set target date: Feb 21, 2026 at 19:30:00
    const difference = +new Date("2026-02-21T19:30:00") - +new Date();

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const timeIntervals = [
    { key: "days", label: "Dias" },
    { key: "hours", label: "Horas" },
    { key: "minutes", label: "Min" },
    { key: "seconds", label: "Seg" }
  ] as const;

  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  const timerComponents = timeIntervals.map(({ key, label }) => (
    <div key={key} className="flex flex-col items-center mx-1 md:mx-4 p-2 md:p-4 bg-black/20 backdrop-blur-md border border-white/10 rounded-lg min-w-[60px] md:min-w-[90px]">
      <span className="text-2xl md:text-4xl font-bold text-white font-heading tabular-nums">
        {formatNumber(timeLeft[key as keyof typeof timeLeft])}
      </span>
      <span className="text-[10px] md:text-xs text-secondary uppercase tracking-wider mt-1">
        {label}
      </span>
    </div>
  ));

  return (
    <section id="hero" ref={ref} className="relative h-screen min-h-[600px] md:min-h-[900px] flex items-center justify-center overflow-hidden w-full">
      {/* Background with Parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
      >
        <img
          src={heroMe}
          alt="Ana Luiza Hero"
          className="w-full h-full object-cover object-[center_20%]"
          fetchPriority="high"
          loading="eager"
        />
        <div className="absolute bottom-0 left-0 w-full h-[30%] bg-gradient-to-t from-background from-10% to-transparent z-0 pointer-events-none" />
      </motion.div>

      {/* Name and Course - Top */}
      <motion.div
        className="absolute top-[15%] md:top-[20%] left-1/2 -translate-x-1/2 z-10 text-center px-4 w-full max-w-4xl"
        style={{ opacity }}
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-script text-6xl md:text-8xl lg:text-9xl text-white mb-4 drop-shadow-xl whitespace-nowrap"
        >
          Ana Luiza
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-white/90 text-lg md:text-xl font-heading tracking-[0.3em] uppercase"
        >
          Radiologia
        </motion.p>
      </motion.div>

      {/* Countdown and Button - Bottom */}
      <motion.div
        className="absolute bottom-[15%] md:bottom-[20%] left-1/2 -translate-x-1/2 z-10 text-center px-4 flex flex-col items-center w-full max-w-4xl"
        style={{ opacity }}
      >
        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap justify-center gap-1 md:gap-2 mb-8 md:mb-12"
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
          className="group relative px-8 py-4 min-h-[48px] bg-secondary/90 overflow-hidden rounded-full transition-all hover:bg-secondary"
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
