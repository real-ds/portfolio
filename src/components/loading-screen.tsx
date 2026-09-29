"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/theme-provider";
import { motionTokens, easing } from "@/lib/motion";
import { EncryptedText } from "@/components/ui/encrypted-text";

const SESSION_KEY = "ds-land-intro-seen";
const listeners = new Set<() => void>();

function subscribeIntroSeen(callback: () => void) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function readIntroSeen(): boolean {
  try {
    return window.sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

function getIntroSeenSnapshot() {
  return readIntroSeen();
}

function getIntroSeenServerSnapshot() {
  return false;
}

function markIntroSeen() {
  try {
    window.sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    return;
  }
  listeners.forEach((listener) => listener());
}

interface LoadingScreenProps {
  onComplete?: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const { theme } = useTheme();
  const seen = useSyncExternalStore(
    subscribeIntroSeen,
    getIntroSeenSnapshot,
    getIntroSeenServerSnapshot
  );
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (seen) return;

    const duration = 4200;
    const startTime = performance.now();
    let rafId = 0;

    const updateProgress = (now: number) => {
      const elapsed = now - startTime;
      const newProgress = Math.min(100, (elapsed / duration) * 100);
      setProgress(newProgress);

      if (newProgress < 100) {
        rafId = requestAnimationFrame(updateProgress);
      } else {
        setIsComplete(true);
        markIntroSeen();
        setTimeout(() => {
          onComplete?.();
        }, 500);
      }
    };

    rafId = requestAnimationFrame(updateProgress);

    return () => cancelAnimationFrame(rafId);
  }, [seen, onComplete]);

  const shouldShow = !isComplete && !seen;

  const bgColor = theme === "dark" ? "#0B0B0B" : "#F5F5EF";
  const textColor = theme === "dark" ? "#FFFFFF" : "#000000";
  const mutedColor = theme === "dark" ? "#707068" : "#999999";

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: motionTokens.standard, ease: easing.editorial }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center"
          style={{ backgroundColor: bgColor }}
        >
          {/* Encrypted Welcome Text */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: motionTokens.standard }}
            className="px-6 text-center leading-none mb-4"
          >
            <EncryptedText
              text="Welcome to DS's Land"
              revealDelayMs={180}
              flipDelayMs={80}
              className="text-xl md:text-2xl font-bold tracking-tight leading-[1em] text-[var(--foreground)]"
              encryptedClassName="opacity-40"
              revealedClassName=""
            />
          </motion.div>

          {/* Numeric Counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: motionTokens.standard }}
          >
            <span
              className="text-sm md:text-base font-bold tabular-nums leading-none"
              style={{
                fontFamily: "Inter, system-ui, sans-serif",
                color: textColor,
              }}
            >
              {Math.round(progress)}
            </span>
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: motionTokens.standard }}
            className="w-40 md:w-56 h-[2px] relative overflow-hidden"
            style={{ backgroundColor: mutedColor }}
          >
            <motion.div
              className="absolute inset-y-0 left-0"
              style={{
                width: `${progress}%`,
                backgroundColor: "#722F37",
              }}
            />
          </motion.div>

          {/* Status Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: motionTokens.standard }}
            className="mt-6 text-[10px] tracking-[0.3em] uppercase"
            style={{
              fontFamily: "'Cascadia Code', 'Cascadia Mono', Consolas, monospace",
              color: mutedColor,
            }}
          >
            Loading
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}