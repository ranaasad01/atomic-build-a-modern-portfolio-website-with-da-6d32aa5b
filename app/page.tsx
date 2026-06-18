"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, Code2 as Github, Briefcase as Linkedin, MessageCircle as Twitter, Mail, Star, ExternalLink, Code2, Layers, Zap, Shield, Users, Award, CheckCircle, Send, Sparkles, Terminal, Globe, Smartphone } from 'lucide-react';
import { BRAND, primaryCTA } from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";

// ─── Inline Data ─────────────────────────────────────────────────────────────

const featuredProjects = [
  {
    slug: "lumina-dashboard",
    title: "Lumina Dashboard",
    description:
      "A real-time analytics platform for SaaS businesses. Built with Next.js, Prisma, and WebSockets — handles 50k+ concurrent users with sub-100ms latency.",
    tags: ["Next.js", "TypeScript", "Prisma", "WebSockets", "Tailwind"],
    image: "https://www.lumina-intelligence.com/wp-content/uploads/2019/12/Dashboard-probiotic-cosmetics.png",
    liveUrl: "https://lumina.demo",
    githubUrl: "https://github.com/alexmorgan/lumina",
    featured: true,
    color: "from-indigo-500 to-purple-600",
  },
  {
    slug: "flora-ecommerce",
    title: "Flora E-Commerce",
    description:
      "A full-stack e-commerce experience for an artisan plant shop. Features Stripe payments, inventory management, and a custom CMS for product listings.",
    tags: ["React", "Node.js", "Stripe", "PostgreSQL", "Framer Motion"],
    image: "https://hcrvedpmxascabvhqdcj.supabase.co/storage/v1/object/public/main-image-folder/migrated/ghost/content/images/wp-content/uploads/2022/09/flora-ssustainable-ecommerce-1024x933.png",
    liveUrl: "https://flora.demo",
    githubUrl: "https://github.com/alexmorgan/flora",
    featured: true,
    color: "from-emerald-500 to-teal-600",
  },
  {
    slug: "orbit-mobile",
    title: "Orbit Mobile App",
    description:
      "A cross-platform habit tracker built with React Native and Expo. Syncs across devices via Supabase and features beautiful animated progress rings.",
    tags: ["React Native", "Expo", "Supabase", "Reanimated", "TypeScript"],
    image: "https://cdn.sanity.io/images/nih52a6e/production/f845a343321b74ea706adbf9fb531282d8f387f1-1085x800.png?fm=png",
    liveUrl: "https://orbit.demo",
    githubUrl: "https://github.com/alexmorgan/orbit",
    featured: true,
    color: "from-orange-500 to-rose-600",
  },
];

const skills = [
  { name: "React / Next.js", level: 96, category: "frontend" },
  { name: "TypeScript", level: 93, category: "frontend" },
  { name: "Tailwind CSS", level: 95, category: "frontend" },
  { name: "Framer Motion", level: 88, category: "frontend" },
  { name: "Node.js", level: 90, category: "backend" },
  { name: "PostgreSQL", level: 84, category: "backend" },
  { name: "Prisma / Drizzle", level: 87, category: "backend" },
  { name: "GraphQL", level: 80, category: "backend" },
  { name: "Figma", level: 85, category: "design" },
  { name: "Docker", level: 78, category: "tools" },
  { name: "AWS / Vercel", level: 82, category: "tools" },
  { name: "Git / CI-CD", level: 91, category: "tools" },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CTO at Luminary Labs",
    avatar: "https://www.docker.com/app/uploads/2025/05/DD-hiroko-2320x1456.png",
    quote:
      "Alex delivered a production-ready dashboard in 6 weeks that our previous team spent 6 months on. The code quality and attention to UX detail is exceptional.",
    stars: 5,
  },
  {
    name: "Marcus Webb",
    role: "Founder, Flora Studio",
    avatar: "https://static.www.nfl.com/image/private/t_headshot_desktop/league/aewahyauhdstskbbuq43",
    quote:
      "Working with Alex was a game-changer. Our conversion rate jumped 34% after the redesign. He thinks like a product designer and codes like a senior engineer.",
    stars: 5,
  },
  {
    name: "Priya Nair",
    role: "Product Lead at Stackwise",
    avatar: "https://media.licdn.com/dms/image/v2/D5622AQE3NpM1FP01Yg/feedshare-shrink_800/B56Zf4pvKcGUAg-/0/1752223383746?e=2147483647&v=beta&t=C11dC6M36dpAKpcbBRMtusPrnkgE-cNJfHc93ZNpFoQ",
    quote:
      "Alex's ability to translate complex requirements into elegant, performant interfaces is rare. He's now our go-to for every critical frontend project.",
    stars: 5,
  },
];

const stats = [
  { value: "5+", label: "Years of Experience" },
  { value: "40+", label: "Projects Shipped" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "12M+", label: "Users Reached" },
];

const services = [
  {
    icon: Globe,
    title: "Web Applications",
    description:
      "Full-stack web apps built with Next.js, TypeScript, and modern databases. Scalable, fast, and production-ready from day one.",
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description:
      "Cross-platform mobile apps with React Native and Expo. Native performance with a single shared codebase.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    icon: Layers,
    title: "UI/UX Design",
    description:
      "Pixel-perfect interfaces designed in Figma and brought to life with smooth animations and accessible components.",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
  {
    icon: Zap,
    title: "Performance Audits",
    description:
      "Deep-dive performance reviews that identify bottlenecks and deliver measurable improvements in Core Web Vitals.",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
  },
  {
    icon: Shield,
    title: "API Architecture",
    description:
      "Robust REST and GraphQL APIs with authentication, rate limiting, and comprehensive documentation.",
    color: "text-rose-400",
    bg: "bg-rose-500/10",
  },
  {
    icon: Code2,
    title: "Code Reviews",
    description:
      "Thorough code reviews and technical mentorship to elevate your team's standards and ship with confidence.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
];

const socialLinks = [
  { label: "GitHub", href: BRAND.github, icon: Github },
  { label: "LinkedIn", href: BRAND.linkedin, icon: Linkedin },
  { label: "Twitter", href: BRAND.twitter, icon: Twitter },
  { label: "Email", href: `mailto:${BRAND.email}`, icon: Mail },
];

// ─── Skill Bar Component ──────────────────────────────────────────────────────

function SkillBar({ name, level, delay = 0 }: { name: string; level: number; delay?: number }) {
  const barVariants: Variants = {
    hidden: { width: "0%" },
    visible: {
      width: `${level}%`,
      transition: { duration: 1, ease: "easeOut", delay },
    },
  };

  return (
    <motion.div
      variants={fadeInUp}
      className="space-y-1.5"
    >
      <div className="flex justify-between items-center">
        <span className="text-sm text-white/70">{name}</span>
        <span className="text-xs text-white/40 font-mono">{level}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          variants={barVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
        />
      </div>
    </motion.div>
  );
}

// ─── Page Component ───────────────────────────────────────────────────────────

export default function HomePage() {
  const shouldReduceMotion = useReducedMotion();
  const [activeSkillTab, setActiveSkillTab] = useState<"frontend" | "backend" | "tools" | "design">("frontend");
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [formSent, setFormSent] = useState(false);

  const filteredSkills = skills.filter((s) => s.category === activeSkillTab);

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormSent(true);
  }

  const motionProps = shouldReduceMotion
    ? {}
    : { variants: fadeInUp, initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-80px" } };

  return (
    <main className="bg-[#0f0f0f] text-white overflow-x-hidden">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
        {/* Background glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-indigo-600/10 rounded-full blur-[120px]" />
          <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-purple-600/8 rounded-full blur-[100px]" />
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium mb-8"
          >
            <Sparkles size={14} />
            Available for freelance projects
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-6"
          >
            <span className="text-white">Crafting</span>{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              digital
            </span>
            <br />
            <span className="text-white">experiences</span>{" "}
            <span className="text-white/30">that</span>
            <br />
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              matter.
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.15 }}
            className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            I'm <span className="text-white/80 font-medium">{BRAND.name}</span> — a full-stack developer and designer
            who turns complex problems into elegant, performant web products.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.a
              variants={scaleIn}
              href={primaryCTA.href}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="group flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold shadow-xl shadow-indigo-500/25 transition-all"
            >
              {primaryCTA.label}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.a
              variants={scaleIn}
              href="#contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-7 py-3.5 rounded-2xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/8 text-white/80 hover:text-white font-medium transition-all"
            >
              <Mail size={16} />
              Get in touch
            </motion.a>
          </motion.div>

          {/* Social links */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-3 mt-12"
          >
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-indigo-500/20 hover:text-indigo-400 text-white/40 flex items-center justify-center transition-colors border border-white/5 hover:border-indigo-500/30"
              >
                <Icon size={16} />
              </motion.a>
            ))}
          </motion.div>

          {/* Stats strip */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-20 pt-12 border-t border-white/5"
          >
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={fadeInUp} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-white/40 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────────────── */}
      <section id="about" className="py-24 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image side */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] max-w-md mx-auto lg:mx-0">
                <img
                  src="https://media.licdn.com/dms/image/v2/C5603AQE-oMdEA4-lZg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1516522176575?e=2147483647&v=beta&t=NNza9NbD-soKscrNPIBTk-qTQ2z583NAZI6yUgYwXZ0"
                  alt="Alex Morgan — Full-Stack Developer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f]/60 via-transparent to-transparent" />
              </div>
              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="absolute -bottom-4 -right-4 lg:right-0 bg-[#1a1a2e] border border-white/10 rounded-2xl p-4 shadow-2xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <Terminal size={18} className="text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">Open to Work</div>
                    <div className="text-xs text-white/40">Remote & Freelance</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Text side */}
            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-semibold uppercase tracking-widest">
                About Me
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
                Building the web,{" "}
                <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  one pixel
                </span>{" "}
                at a time.
              </h2>
              <p className="text-white/60 leading-relaxed text-lg">
                I'm a full-stack developer based in San Francisco with 5+ years of experience building
                products that people love. I specialize in React ecosystems, Node.js backends, and
                translating design visions into pixel-perfect, performant interfaces.
              </p>
              <p className="text-white/50 leading-relaxed">
                Before going independent, I led frontend development at two Y Combinator startups and
                shipped features used by millions. I care deeply about code quality, developer experience,
                and the tiny details that make a product feel truly polished.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                {[
                  { icon: Users, text: "Team player & mentor" },
                  { icon: Award, text: "Y Combinator alumni" },
                  { icon: Zap, text: "Performance obsessed" },
                  { icon: CheckCircle, text: "Accessibility-first" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2.5 text-sm text-white/60">
                    <Icon size={15} className="text-indigo-400 flex-shrink-0" />
                    {text}
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 pt-2">
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors shadow-lg shadow-indigo-500/20"
                >
                  See my work <ArrowRight size={14} />
                </motion.a>
                <motion.a
                  href={BRAND.resumeUrl}
                  download
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 text-white/70 hover:text-white text-sm font-medium transition-all"
                >
                  Download CV
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-semibold uppercase tracking-widest mb-4">
              What I Do
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Services that{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                deliver results
              </span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto text-lg">
              From concept to deployment, I offer end-to-end development services tailored to your product's needs.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {services.map((service) => (
              <motion.div
                key={service.title}
                variants={scaleIn}
                whileHover={{ y: -4, scale: 1.01 }}
                className="group p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all cursor-default"
              >
                <div className={`w-11 h-11 rounded-xl ${service.bg} flex items-center justify-center mb-4`}>
                  <service.icon size={20} className={service.color} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SKILLS ───────────────────────────────────────────────────────── */}
      <section id="skills" className="py-24 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs font-semibold uppercase tracking-widest mb-4">
              Technical Skills
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              My{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                tech stack
              </span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto text-lg">
              Years of hands-on experience across the full stack — from pixel-perfect UIs to scalable backend systems.
            </p>
          </motion.div>

          {/* Tabs */}
          <div className="flex justify-center mb-10">
            <div className="flex gap-1 p-1 rounded-xl bg-white/5 border border-white/5">
              {(["frontend", "backend", "tools", "design"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveSkillTab(tab)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                    activeSkillTab === tab
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            key={activeSkillTab}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto"
          >
            {filteredSkills.map((skill, i) => (
              <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={i * 0.08} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PROJECTS ─────────────────────────────────────────────────────── */}
      <section id="projects" className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-semibold uppercase tracking-widest mb-4">
              Featured Work
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Projects I'm{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                proud of
              </span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto text-lg">
              A selection of recent work spanning SaaS platforms, e-commerce, and mobile applications.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-8"
          >
            {featuredProjects.map((project, i) => (
              <motion.div
                key={project.slug}
                variants={fadeInUp}
                whileHover={{ y: -2 }}
                className={`group grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-white/5 bg-white/[0.02] hover:border-white/10 transition-all ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* Image */}
                <div className="relative aspect-video lg:aspect-auto overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20`} />
                </div>

                {/* Content */}
                <div className="p-8 md:p-10 flex flex-col justify-center space-y-5">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-xs text-white/50 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white">{project.title}</h3>
                  <p className="text-white/55 leading-relaxed">{project.description}</p>
                  <div className="flex items-center gap-3 pt-2">
                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors shadow-lg shadow-indigo-500/20"
                      >
                        <ExternalLink size={14} />
                        Live Demo
                      </motion.a>
                    )}
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 text-white/70 hover:text-white text-sm font-medium transition-all"
                      >
                        <Github size={14} />
                        Source
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-300 text-xs font-semibold uppercase tracking-widest mb-4">
              Testimonials
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              What clients{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                say
              </span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto text-lg">
              Don't take my word for it — here's what the people I've worked with have to say.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
                variants={scaleIn}
                whileHover={{ y: -4 }}
                className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all space-y-4"
              >
                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-white/65 text-sm leading-relaxed italic">"{t.quote}"</p>
                <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-white/10"
                  />
                  <div>
                    <div className="text-sm font-semibold text-white">{t.name}</div>
                    <div className="text-xs text-white/40">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────────────── */}
      <section id="contact" className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-300 text-xs font-semibold uppercase tracking-widest">
                Get In Touch
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
                Let's build something{" "}
                <span className="bg-gradient-to-r from-rose-400 to-orange-400 bg-clip-text text-transparent">
                  great together
                </span>
              </h2>
              <p className="text-white/55 leading-relaxed text-lg">
                Whether you have a project in mind, want to discuss a collaboration, or just want to say hi —
                my inbox is always open.
              </p>
              <div className="space-y-4 pt-2">
                {[
                  { icon: Mail, label: "Email", value: BRAND.email, href: `mailto:${BRAND.email}` },
                  { icon: Github, label: "GitHub", value: "github.com/alexmorgan", href: BRAND.github },
                  { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/alexmorgan", href: BRAND.linkedin },
                ].map(({ icon: Icon, label, value, href }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                      <Icon size={18} className="text-indigo-400" />
                    </div>
                    <div>
                      <div className="text-xs text-white/30 uppercase tracking-wider">{label}</div>
                      <div className="text-sm text-white/70 group-hover:text-white transition-colors">{value}</div>
                    </div>
                    <ArrowRight size={14} className="ml-auto text-white/20 group-hover:text-indigo-400 transition-colors" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Right — Form */}
            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              {formSent ? (
                <motion.div
                  variants={scaleIn}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-col items-center justify-center text-center p-12 rounded-3xl border border-emerald-500/20 bg-emerald-500/5 space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <CheckCircle size={32} className="text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Message sent!</h3>
                  <p className="text-white/50">
                    Thanks for reaching out. I'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => { setFormSent(false); setFormState({ name: "", email: "", message: "" }); }}
                    className="mt-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleFormSubmit}
                  className="space-y-5 p-8 rounded-3xl border border-white/5 bg-white/[0.02]"
                >
                  <h3 className="text-xl font-semibold text-white mb-6">Send a message</h3>
                  <div>
                    <label htmlFor="name" className="block text-sm text-white/50 mb-2">
                      Your Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formState.name}
                      onChange={handleFormChange}
                      placeholder="Jane Smith"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-indigo-500/50 focus:bg-white/8 transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm text-white/50 mb-2">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formState.email}
                      onChange={handleFormChange}
                      placeholder="jane@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-indigo-500/50 focus:bg-white/8 transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm text-white/50 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formState.message}
                      onChange={handleFormChange}
                      placeholder="Tell me about your project..."
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-indigo-500/50 focus:bg-white/8 transition-all text-sm resize-none"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold transition-all shadow-xl shadow-indigo-500/20"
                  >
                    <Send size={16} />
                    Send Message
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="relative rounded-3xl overflow-hidden p-10 md:p-16 text-center border border-indigo-500/20"
          >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-purple-600/15 to-pink-600/10" />
            <div className="absolute inset-0 bg-[#0f0f0f]/60" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

            <div className="relative space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-semibold uppercase tracking-widest">
                <Sparkles size={12} />
                Available Now
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                Ready to start your{" "}
                <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  next project?
                </span>
              </h2>
              <p className="text-white/55 max-w-xl mx-auto text-lg">
                I'm currently accepting new clients for Q3 2025. Let's discuss how I can help bring your vision to life.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="group flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold shadow-xl shadow-indigo-500/25 transition-all"
                >
                  Start a conversation
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </motion.a>
                <motion.a
                  href={BRAND.resumeUrl}
                  download
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-7 py-3.5 rounded-2xl border border-white/10 hover:border-white/20 bg-white/5 text-white/80 hover:text-white font-medium transition-all"
                >
                  View Resume
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}