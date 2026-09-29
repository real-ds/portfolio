"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { navLinks } from "@/lib/content";
import { useTheme } from "./theme-provider";
import { motionTokens, easing } from "@/lib/motion";

const MotionLink = motion.create(Link);

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="md:hidden">
      {/* Hamburger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <motion.span
          animate={{
            rotate: isOpen ? 45 : 0,
            y: isOpen ? 6 : 0,
          }}
          className="w-6 h-[1px] bg-[var(--foreground)]"
        />
        <motion.span
          animate={{
            opacity: isOpen ? 0 : 1,
          }}
          className="w-6 h-[1px] bg-[var(--foreground)]"
        />
        <motion.span
          animate={{
            rotate: isOpen ? -45 : 0,
            y: isOpen ? -6 : 0,
          }}
          className="w-6 h-[1px] bg-[var(--foreground)]"
        />
      </button>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: motionTokens.standard }}
            className="fixed inset-0 z-40 bg-[var(--bg)] flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.slice(0, 3).map((link, index) => (
                <MotionLink
                  key={link.label}
                  href={link.href.startsWith("#") ? `/${link.href}` : link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{
                    delay: index * 0.1,
                    duration: motionTokens.reveal,
                    ease: easing.editorial,
                  }}
                  className="text-2xl font-mono tracking-widest uppercase text-[var(--foreground)] hover:text-[var(--accent)] transition-colors duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </MotionLink>
              ))}

              {/* GET IN TOUCH button in mobile */}
              <MotionLink
                href="/about"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{
                  delay: 0.4,
                  duration: motionTokens.reveal,
                  ease: easing.editorial,
                }}
                className="inline-flex items-center gap-2 px-8 py-3 border border-[var(--accent)] text-[var(--accent)] font-mono text-sm tracking-wider uppercase hover:bg-[var(--accent)] hover:text-[var(--bg)] transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                GET IN TOUCH
                <span>→</span>
              </MotionLink>

              {/* About Me link */}
              <MotionLink
                href="/about"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{
                  delay: 0.5,
                  duration: motionTokens.reveal,
                  ease: easing.editorial,
                }}
                className="text-xl font-mono tracking-widest uppercase text-[var(--muted)] hover:text-[var(--accent)] transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                About Me
              </MotionLink>

              {/* Theme toggle in mobile menu */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{
                  delay: 0.6,
                  duration: motionTokens.reveal,
                  ease: easing.editorial,
                }}
                onClick={toggleTheme}
                className="mt-8 px-6 py-3 border border-[var(--dim)] text-sm font-mono tracking-wider uppercase text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors duration-300"
              >
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}