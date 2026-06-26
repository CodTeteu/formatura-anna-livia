import { useState, useEffect } from "react";
import { Music, Volume2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AudioPlayerProps {
  isScrolled?: boolean;
  isMobileMenuOpen?: boolean;
}

const MUSIC_URL = "/assets/graduation-song.mp4";

// Single audio instance shared across all mounts of AudioPlayer
let sharedAudio: HTMLAudioElement | null = null;
const listeners = new Set<(isPlaying: boolean) => void>();

let started = false;

const getSharedAudio = () => {
  if (typeof window === "undefined") return null;
  
  if (!sharedAudio) {
    const audioUrl = MUSIC_URL.startsWith('http')
      ? MUSIC_URL
      : `${import.meta.env.BASE_URL}${MUSIC_URL.replace(/^\//, '')}`;
    
    sharedAudio = new Audio(audioUrl);
    sharedAudio.loop = true;
    sharedAudio.volume = 1.0; 

    // Sync state if audio plays or pauses
    sharedAudio.addEventListener("play", () => {
      if (!started && sharedAudio) {
        sharedAudio.currentTime = 20;
        started = true;
      }
      listeners.forEach(listener => listener(true));
    });
    sharedAudio.addEventListener("pause", () => {
      listeners.forEach(listener => listener(false));
    });
    sharedAudio.addEventListener("ended", () => {
      listeners.forEach(listener => listener(false));
    });
  }
  return sharedAudio;
};

export const getSharedAudioState = () => {
  const audio = getSharedAudio();
  return audio ? !audio.paused : false;
};

export const playSharedAudio = () => {
  const audio = getSharedAudio();
  if (audio) {
    audio.play().catch((err) => {
      console.log("Audio play blocked by browser:", err);
    });
  }
};

export const pauseSharedAudio = () => {
  const audio = getSharedAudio();
  if (audio) {
    audio.pause();
  }
};

export const subscribeToAudioState = (listener: (isPlaying: boolean) => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

/**
 * AudioPlayer Component
 * Compact romantic instrumental background music player for the top navbar
 */
const AudioPlayer = ({ isScrolled = false, isMobileMenuOpen = false }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [hasDismissed, setHasDismissed] = useState(false);

  useEffect(() => {
    const audio = getSharedAudio();
    if (audio) {
      setIsPlaying(!audio.paused);
    }

    const listener = (playing: boolean) => {
      setIsPlaying(playing);
    };
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
      // If no players are mounted on the screen, pause the audio to prevent leaks
      if (listeners.size === 0 && sharedAudio) {
        sharedAudio.pause();
      }
    };
  }, []);

  // Control the tooltip/bubble entry delay
  useEffect(() => {
    if (isPlaying) {
      setShowBubble(false);
      return;
    }

    const timer = setTimeout(() => {
      if (!isPlaying && !hasDismissed) {
        setShowBubble(true);
      }
    }, 3000); // 3 seconds delay before showing the tip bubble

    return () => clearTimeout(timer);
  }, [isPlaying, hasDismissed]);

  // Handle auto-dismissal after 10 seconds
  useEffect(() => {
    if (showBubble) {
      const dismissTimer = setTimeout(() => {
        setShowBubble(false);
      }, 10000); // 10 seconds display duration

      return () => clearTimeout(dismissTimer);
    }
  }, [showBubble]);

  const togglePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    const audio = getSharedAudio();
    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
    } else {
      audio.play()
        .catch((err) => {
          console.log("Audio play blocked by browser:", err);
        });
    }
  };

  const handleDismissBubble = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowBubble(false);
    setHasDismissed(true);
  };

  // Button styles based on header scroll state
  const buttonColorClass = isScrolled
    ? "text-primary border-primary/20 hover:bg-primary/5"
    : "text-white border-white/20 hover:bg-white/5";

  return (
    <div className="flex items-center relative">
      {/* Native HTML button to ensure reliable user gesture detection on mobile devices */}
      <button
        onClick={togglePlay}
        className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center border transition-all duration-300 relative hover:scale-105 active:scale-95 ${
          isPlaying
            ? "bg-primary border-primary text-primary-foreground"
            : buttonColorClass
        }`}
        aria-label="Tocar música de fundo"
      >
        {/* Pulsing Outer Rings when Playing */}
        {isPlaying && (
          <span className="absolute inset-0 rounded-full bg-primary/25 animate-ping pointer-events-none" />
        )}

        {/* CSS-animated spinning using inline style to ensure smooth, slow rotation (20s) */}
        <div
          className="flex items-center justify-center transition-transform duration-500"
          style={{
            animation: isPlaying ? "spin 20s linear infinite" : "none"
          }}
        >
          {isPlaying ? (
            <Volume2 className="w-4 h-4 md:w-5 md:h-5" />
          ) : (
            <Music className="w-4 h-4 md:w-5 md:h-5" />
          )}
        </div>
      </button>

      {/* Floating Chat Bubble Style Tooltip */}
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 5 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={togglePlay}
            className="absolute top-11 md:top-12 right-0 w-52 bg-white/95 dark:bg-[#1a1515]/95 border border-border/40 rounded-xl p-2.5 pr-6 shadow-[0_10px_25px_rgba(0,0,0,0.08)] text-left z-50 cursor-pointer pointer-events-auto group/bubble select-none"
          >
            {/* Elegant Top Arrow pointing to the music button */}
            <div className="absolute bottom-full right-[14px] md:right-[15px] w-2 h-2 bg-white/95 dark:bg-[#1a1515]/95 border-l border-t border-border/40 transform rotate-45 translate-y-[5px]" />
            
            {/* Close Button */}
            <button
              onClick={handleDismissBubble}
              className="absolute top-1.5 right-1.5 p-0.5 rounded-full text-muted-foreground/50 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              aria-label="Fechar dica"
            >
              <X className="w-3 h-3" />
            </button>

            {/* Bubble Content */}
            <p className="font-body text-xs text-foreground/90 dark:text-[#fffaef]/95 leading-normal font-medium">
              Toque para ouvir a música e ter uma experiência mais completa ✨
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AudioPlayer;
