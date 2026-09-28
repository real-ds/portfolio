"use client";

import { motion } from "framer-motion";
import { TextReveal } from "@/components/ui/cascade-text";
import { motionTokens, easing } from "@/lib/motion";
import Link from "next/link";
import { Globe, Share2, MessageCircle, Link as LinkIcon, Send, Feather } from "lucide-react";

const socialLinks = [
  { icon: Share2, href: "#", label: "Social 1" },
  { icon: MessageCircle, href: "#", label: "Social 2" },
  { icon: LinkIcon, href: "#", label: "Social 3" },
  { icon: Globe, href: "#", label: "Social 4" },
  { icon: Send, href: "#", label: "Social 5" },
  { icon: Feather, href: "#", label: "Social 6" },
];

export function Footer() {
  return (
    <footer className="relative py-20 md:py-28 px-6 md:px-12 lg:px-24 bg-[#722F37]">
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="my-8 flex flex-wrap justify-center gap-6">
          {socialLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="text-white/60 hover:text-[#FF0033] block transition-colors duration-150"
            >
              <link.icon className="w-6 h-6" />
            </Link>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 70, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.2, duration: motionTokens.cinematic, ease: easing.editorial }}
          className="w-full flex justify-center overflow-visible mb-12"
        >
          <div className="w-full flex justify-center text-center">
            <TextReveal
              text="DIVYANSHU SINGH"
              as="span"
              fontSize="clamp(3rem, 8vw, 6rem)"
              hoverColor="#FFFFFF"
              duration={300}
              easing="ease-in-out"
              direction="up"
              className="inline-block no-underline cursor-default select-none whitespace-nowrap opacity-20 hover:opacity-20 transition-opacity duration-500 text-white"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: motionTokens.reveal, ease: easing.editorial }}
          className="text-center mt-16"
        >
          <p className="text-sm text-white/60">
            Designed & Built by Divyanshu Singh © 2026
          </p>
        </motion.div>
      </div>
    </footer>
  );
}