"use client";

import { motion } from "framer-motion";
import { TextReveal } from "@/components/ui/cascade-text";
import { motionTokens, easing } from "@/lib/motion";
import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";

/* GitHub icon */
function GithubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="h-5 w-5"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.38.6.11.82-.26.82-.58v-2.23c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49.99.11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23A11.5 11.5 0 0112 5.8c1.02 0 2.05.14 3 .4 2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.19.69.8.58A12 12 0 0012 0z" />
    </svg>
  );
}

/* LinkedIn icon */
function LinkedinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="h-5 w-5"
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 013.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 110-4.14 2.07 2.07 0 010 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45C23.2 24 24 23.23 24 22.28V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "#about" },
  { label: "Works", href: "#work" },
  { label: "Resume", href: "/resume" },
];

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/real-ds",
    icon: GithubIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/realdivyanshusingh",
    icon: LinkedinIcon,
  },
  {
    label: "Email",
    href: "mailto:divyanshu.vitc@gmail.com",
    icon: Mail,
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#090909] text-white">
      <div className="relative z-10 px-6 pt-12 sm:px-8 md:px-12 md:pt-14 lg:px-16 xl:px-20">

        {/* Header */}
        <div className="mx-auto mb-12 flex w-full max-w-[1240px] items-start justify-between md:mb-14">
          <Link
            href="/"
            className="text-xl font-black tracking-[-0.06em] transition-opacity duration-300 hover:opacity-60"
          >
            DIVYANSHU
          </Link>

          <div className="text-right text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
            <p>Portfolio / 2026</p>
            <p>Software Engineer</p>
          </div>
        </div>

        {/* Footer content */}
        <div className="mx-auto grid w-full max-w-[1240px] grid-cols-1 gap-10 md:grid-cols-[1.2fr_repeat(3,1fr)] md:gap-8">

          {/* Contact */}
          <div>
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">
              (CONTACT)
            </p>

            <Link
              href="mailto:divyanshu.vitc@gmail.com"
              className="group inline-flex items-center gap-2 text-xl font-semibold tracking-[-0.035em] text-white transition-opacity duration-300 hover:opacity-50 md:text-[21px] whitespace-nowrap"
            >
              divyanshu.vitc@gmail.com

              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>

            <div className="mt-7">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">
                (BASED IN)
              </p>

              <p className="text-lg font-medium tracking-[-0.02em] text-white">
                Chennai, India
              </p>
            </div>
          </div>

          {/* Links */}
          <div>
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">
              (LINKS)
            </p>

            <nav className="flex flex-col items-start gap-2.5">
              {navigation.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="group flex items-center gap-1 text-lg font-medium tracking-[-0.025em] text-white transition-opacity duration-300 hover:opacity-50"
                >
                  {link.label}

                  <ArrowUpRight
                    className="h-3.5 w-3.5 opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                  />
                </Link>
              ))}
            </nav>
          </div>

          {/* Socials */}
          <div>
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">
              (SOCIALS)
            </p>

            <nav className="flex flex-col items-start gap-2.5">
              {socials.map((social) => {
                const Icon = social.icon;

                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    target={
                      social.href.startsWith("mailto:")
                        ? undefined
                        : "_blank"
                    }
                    rel={
                      social.href.startsWith("mailto:")
                        ? undefined
                        : "noopener noreferrer"
                    }
                    className="group flex items-center gap-3 text-lg font-medium tracking-[-0.025em] text-white transition-opacity duration-300 hover:opacity-50"
                  >
                    <Icon className="h-4.5 w-4.5" />

                    <span>{social.label}</span>

                    <ArrowUpRight
                      className="h-3.5 w-3.5 opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                    />
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Statement */}
          <div className="flex justify-end text-right">
          <p className="max-w-[190px] text-right text-base font-medium leading-[1.35] tracking-[-0.02em] text-white/60">
            Building digital experiences, software and things worth shipping.
          </p>
          </div>
          </div>

        {/* Accent name strip */}
        <div className="relative left-1/2 mt-12 w-screen -translate-x-1/2 overflow-hidden bg-[var(--accent)] sm:mt-14 md:mt-16">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: motionTokens.cinematic,
              ease: easing.editorial,
            }}
            className="flex h-[clamp(115px,13vw,190px)] w-full items-center justify-center overflow-hidden"
          >
            <TextReveal
              text="DIVYANSHU"
              as="span"
              fontSize="clamp(4.5rem, 12.8vw, 13.5rem)"
              hoverColor="#ffffff"
              duration={300}
              easing="ease-in-out"
              direction="up"
              className="
                block
                w-full
                cursor-default
                select-none
                whitespace-nowrap
                text-center
                font-black
                uppercase
                leading-none
                tracking-[-0.09em]
                text-black
              "
              style={{
                fontFamily: "Inter, sans-serif",
              }}
            />
          </motion.div>
        </div>

        {/* Bottom row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: motionTokens.reveal,
            ease: easing.editorial,
          }}
          className="border-t border-white/10 py-4"
        >
          <div className="flex flex-col gap-3 text-[10px] font-medium uppercase tracking-[0.12em] text-white/40 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Divyanshu Singh. All rights reserved.</p>

            <div className="flex gap-5">
              <Link
                href="/privacy"
                className="transition-colors hover:text-white"
              >
                Privacy
              </Link>

              <Link
                href="/terms"
                className="transition-colors hover:text-white"
              >
                Terms
              </Link>
            </div>

            <p>Designed & Built by Divyanshu</p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}