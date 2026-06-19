"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Code2 as Github, Briefcase as Linkedin, MessageCircle as Twitter, Mail, Heart } from 'lucide-react';
import { navLinks, BRAND } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const socialLinks = [
  { label: "GitHub", href: BRAND.github, icon: Github },
  { label: "LinkedIn", href: BRAND.linkedin, icon: Linkedin },
  { label: "Twitter", href: BRAND.twitter, icon: Twitter },
  { label: "Email", href: `mailto:${BRAND.email}`, icon: Mail },
];

export default function Footer() {
  const pathname = usePathname();

  function handleAnchorClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) {
    if (href.startsWith("#") && pathname === "/") {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }

  function resolveHref(href: string): string {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : "/" + href;
    }
    return href;
  }

  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/5 bg-[#0a0a0a]">
      {/* Subtle gradient top edge */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8"
        >
          {/* Brand column */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-red-500/25">
                {BRAND.initials}
              </div>
              <span className="font-semibold text-white/90">{BRAND.name}</span>
            </div>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              {BRAND.tagline}. Crafting elegant digital experiences with modern
              web technologies.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-2 pt-1">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-white/50 flex items-center justify-center transition-colors"
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Navigation column */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30">
              Navigation
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={resolveHref(link.href)}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact column */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30">
              Get In Touch
            </h3>
            <p className="text-sm text-white/40 leading-relaxed">
              Open to freelance projects and full-time opportunities.
            </p>
            <motion.a
              href={`mailto:${BRAND.email}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-red-700 text-white text-sm font-medium shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition-shadow"
            >
              <Mail size={14} />
              {BRAND.email}
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs text-white/25">
            © {year} {BRAND.name}. All rights reserved.
          </p>
          <p className="text-xs text-white/25 flex items-center gap-1">
            Built with <Heart size={11} className="text-red-400" /> using Next.js & Tailwind CSS
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
