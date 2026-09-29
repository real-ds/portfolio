"use client";

import { motion } from "framer-motion";
import { TextReveal } from "@/components/ui/cascade-text";
import { motionTokens, easing } from "@/lib/motion";
import Link from "next/link";
import { Mail, Globe, Send, Feather } from "lucide-react";

/* Brand marks are inlined because lucide-react v1 dropped its
   brand icon set (Github, Linkedin, ...). */

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-6 w-6">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.38.6.11.82-.26.82-.58v-2.23c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49.99.11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23A11.5 11.5 0 0112 5.8c1.02 0 2.05.14 3 .4 2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.19.69.8.58A12 12 0 0012 0z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-6 w-6">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 013.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 110-4.14 2.07 2.07 0 010 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

const socialLinks = [
  {
    icon: Globe,
    href: "https://github.com/real-ds",
    label: "Live site",
  },
  { icon: GithubIcon, href: "https://github.com/real-ds", label: "GitHub" },
  {
    icon: LinkedinIcon,
    href: "https://www.linkedin.com/in/realdivyanshusingh",
    label: "LinkedIn",
  },
  { icon: Mail, href: "mailto:divyanshu.vitc@gmail.com", label: "Email" },
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
              target={link.href.startsWith("#") ? undefined : "_blank"}
              rel={link.href.startsWith("#") ? undefined : "noopener noreferrer"}
              aria-label={link.label}
              className="text-white/60 hover:text-[#FF0033] block transition-colors duration-150"
            >
              <link.icon className="h-6 w-6" />
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