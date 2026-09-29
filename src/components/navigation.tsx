"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { navLinks } from "@/lib/content";
import { motionTokens, easing } from "@/lib/motion";

const MotionLink = motion.create(Link);

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 flex items-center justify-between transition-all duration-300 ${
        isScrolled ? "bg-[var(--bg)]/80 backdrop-blur-md border-b border-[var(--dim)]" : ""
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Logo / Identity - Left */}
      <MotionLink
        href="/"
        className="relative font-mono text-lg tracking-tight select-none"
        aria-label="Divyanshu Singh - Home"
      >
        <span className="inline-flex items-center whitespace-nowrap">
          DS.
        </span>
      </MotionLink>

      {/* Navigation Links - Center */}
      <div className="hidden md:flex items-center gap-8 mx-auto">
        {navLinks.slice(0, 3).map((link) => (
          <MotionLink
            key={link.label}
            href={link.href.startsWith("#") ? `/${link.href}` : link.href}
            className="text-xs font-mono tracking-widest uppercase text-[var(--muted)] hover:text-[var(--foreground)] transition-colors duration-300"
            whileHover={{ x: 4 }}
            transition={{ duration: motionTokens.fast, ease: easing.editorial }}
          >
            {link.label}
            <span className="ml-1 opacity-40">→</span>
          </MotionLink>
        ))}
      </div>

      {/* GET IN TOUCH - Extreme Right */}
      <div className="hidden md:block">
        <Link
          href="/about"
          className="inline-flex items-center gap-2 px-6 py-2.5 border border-[var(--accent)] text-[var(--accent)] font-mono text-xs tracking-wider uppercase hover:bg-[var(--accent)] hover:text-[var(--bg)] transition-all duration-300"
        >
          GET IN TOUCH
          <span className="ml-1">→</span>
        </Link>
      </div>

    </nav>
  );
}