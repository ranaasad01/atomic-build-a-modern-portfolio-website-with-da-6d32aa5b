"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, Code2 as Github, Briefcase as Linkedin, MessageCircle as Twitter, Mail, Star, ExternalLink, Code2, Layers, Zap, Shield, Users, Award, CheckCircle, Send, Sparkles, Terminal, Globe, Smartphone, Briefcase } from 'lucide-react';
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
    color: "from-red-500 to-red-700",
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
    role: "Product Lead, Orbit Health",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Gatto_europeo4.jpg/800px-Gatto_europeo4.jpg",
    quote:
      "Alex has a rare ability to translate complex product requirements into clean, performant code. The mobile app he built exceeded all our KPIs in the first month.",
    stars: 5,
  },
];

const stats = [
  { label: "Projects Shipped", value: "40+", icon: Briefcase },
  { label: "Happy Clients", value: "30+", icon: Users },
  { label: "Years Experience", value: "6+", icon: Award },
  { label: "GitHub Stars", value: "2.1k", icon: Star },
];

;

const services = [
  {
    icon: Code2,
    title: "Full-Stack Development",
    description:
      "End-to-end web applications with modern frameworks, scalable APIs, and robust databases.",
  },
  {
    icon: Layers,
    title: "UI / UX Design",
    description:
      "Pixel-perfect interfaces that balance aesthetics with usability and accessibility.",
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description:
      "Lighthouse 100 scores, Core Web Vitals tuning, and bundle size reduction strategies.",
  },
  {
    icon: Shield,
    title: "Security & DevOps",
    description:
      "CI/CD pipelines, containerization, and security best practices baked in from day one.",
  },
];

// ─── Skill Bar ────────────────────────────────────────────────────────────────
function SkillBar({ name, level }: { name: string; level: number }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-sm">
        <span className="text-white/80 font-medium">{name}</span>
        <span className="text-red-400 font-mono text-xs">{level}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-red-500 to-red-700 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
        />
      </div>
    </div>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({ project }: { project: (typeof featuredProjects)[0] }) {
  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -6 }}
      className="group relative bg-white/[0.03] border border-white/8 rounded-2xl overflow-hidden hover:border-red-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/10"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://placehold.co/600x400/1a1a1a/666?text=Project";
          }}
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-20`} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <h3 className="text-lg font-semibold text-white group-hover:text-red-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-white/50 leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs rounded-md bg-white/5 text-white/50 border border-white/8"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3 pt-1">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 transition-colors font-medium"
            >
              <ExternalLink size={12} />
              Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors"
            >
              <Github size={12} />
              Source
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const contactRef = useRef<HTMLFormElement>(null);
  const prefersReduced = useReducedMotion();

  const filters = ["all", "frontend", "backend", "design", "tools"];
  const filteredSkills =
    activeFilter === "all"
      ? skills
      : skills.filter((s) => s.category === activeFilter);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormStatus("sending");
    await new Promise((r) => setTimeout(r, 1500));
    setFormStatus("sent");
    setFormData({ name: "", email: "", message: "" });
  }

  return (
    <div className="relative">
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
        {/* Background glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-red-500/8 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-red-700/6 rounded-full blur-[100px]" />
        </div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-4xl mx-auto text-center space-y-8"
        >
          {/* Badge */}
          <motion.div variants={fadeInUp}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 text-sm font-medium">
              <Sparkles size={14} />
              Available for new projects
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeInUp}
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.08]"
          >
            <span className="text-white">Crafting digital</span>
            <br />
            <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
              experiences
            </span>
            <br />
            <span className="text-white">that matter.</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            variants={fadeInUp}
            className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed"
          >
            Hi, I&apos;m <span className="text-white font-medium">{BRAND.name}</span> — a
            full-stack developer & designer who turns complex problems into
            elegant, performant web applications.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.a
              href={primaryCTA.href}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="group flex items-center gap-2 px-7 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition-all duration-200"
            >
              {primaryCTA.label}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/10 hover:border-white/20 text-white/70 hover:text-white font-medium transition-all duration-200 hover:bg-white/5"
            >
              <Mail size={16} />
              Get in touch
            </motion.a>
          </motion.div>

          {/* Social proof */}
          <motion.div
            variants={fadeInUp}
            className="flex items-center justify-center gap-6 pt-4"
          >
            {[
              { icon: Github, href: BRAND.github, label: "GitHub" },
              { icon: Linkedin, href: BRAND.linkedin, label: "LinkedIn" },
              { icon: Twitter, href: BRAND.twitter, label: "Twitter" },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ y: -3, scale: 1.1 }}
                className="text-white/30 hover:text-red-400 transition-colors"
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-white/20 uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent"
          />
        </motion.div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────────────── */}
      <section className="py-16 border-y border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                className="text-center space-y-1"
              >
                <div className="text-3xl md:text-4xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-white/40">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────────────────────── */}
      <section id="about" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image side */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="relative"
            >
              <div className="relative w-full max-w-sm mx-auto lg:mx-0">
                {/* Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-red-700/20 rounded-3xl blur-2xl scale-110" />
                <div className="relative rounded-3xl overflow-hidden border border-white/10 aspect-square">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80"
                    alt={BRAND.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://placehold.co/600x600/1a1a1a/666?text=AM";
                    }}
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f]/60 to-transparent" />
                </div>
                {/* Floating badge */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="absolute -bottom-4 -right-4 bg-[#1a1a1a] border border-white/10 rounded-2xl px-4 py-3 shadow-xl"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-sm font-medium text-white/80">Open to work</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Text side */}
            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="space-y-6"
            >
              <div>
                <p className="text-red-400 text-sm font-medium uppercase tracking-widest mb-3">
                  About Me
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                  Building the web,
                  <br />
                  <span className="text-white/40">one pixel at a time.</span>
                </h2>
              </div>
              <div className="space-y-4 text-white/60 leading-relaxed">
                <p>
                  I&apos;m a full-stack developer with 6+ years of experience building
                  scalable web applications for startups and enterprises alike. I
                  specialize in React ecosystems, Node.js backends, and everything
                  in between.
                </p>
                <p>
                  When I&apos;m not coding, you&apos;ll find me contributing to open source,
                  writing about web performance, or exploring the latest in design
                  systems.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                {[
                  { icon: Terminal, label: "Clean Code" },
                  { icon: Zap, label: "Fast Delivery" },
                  { icon: Globe, label: "Remote-First" },
                  { icon: Smartphone, label: "Mobile-First" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2.5 text-sm text-white/60">
                    <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                      <Icon size={14} className="text-red-400" />
                    </div>
                    {label}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-4 pt-2">
                <motion.a
                  href={BRAND.resumeUrl}
                  download
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-medium text-sm shadow-lg shadow-red-500/20 transition-colors"
                >
                  Download CV
                </motion.a>
                <a
                  href="#contact"
                  className="text-sm text-white/50 hover:text-white transition-colors underline underline-offset-4"
                >
                  Let&apos;s talk
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ──────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-white/[0.01]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-16"
          >
            <motion.div variants={fadeInUp} className="text-center space-y-4">
              <p className="text-red-400 text-sm font-medium uppercase tracking-widest">
                What I Do
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Services & Expertise
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service) => (
                <motion.div
                  key={service.title}
                  variants={fadeInUp}
                  whileHover={{ y: -4 }}
                  className="group p-6 rounded-2xl bg-white/[0.03] border border-white/8 hover:border-red-500/30 transition-all duration-300 space-y-4"
                >
                  <div className="w-11 h-11 rounded-xl bg-red-500/10 flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                    <service.icon size={20} className="text-red-400" />
                  </div>
                  <h3 className="font-semibold text-white">{service.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SKILLS ────────────────────────────────────────────────────────── */}
      <section id="skills" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-12"
          >
            <motion.div variants={fadeInUp} className="text-center space-y-4">
              <p className="text-red-400 text-sm font-medium uppercase tracking-widest">
                Tech Stack
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Skills & Technologies
              </h2>
            </motion.div>

            {/* Filter tabs */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap justify-center gap-2"
            >
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-all duration-200 ${
                    activeFilter === f
                      ? "bg-red-600 text-white shadow-lg shadow-red-500/25"
                      : "bg-white/5 text-white/50 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {f}
                </button>
              ))}
            </motion.div>

            {/* Skill bars */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6"
            >
              {filteredSkills.map((skill) => (
                <motion.div key={skill.name} variants={fadeInUp}>
                  <SkillBar name={skill.name} level={skill.level} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── PROJECTS ──────────────────────────────────────────────────────── */}
      <section id="projects" className="py-24 md:py-32 bg-white/[0.01]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-12"
          >
            <motion.div variants={fadeInUp} className="text-center space-y-4">
              <p className="text-red-400 text-sm font-medium uppercase tracking-widest">
                Portfolio
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Featured Projects
              </h2>
              <p className="text-white/50 max-w-xl mx-auto">
                A selection of projects I&apos;ve built — from SaaS dashboards to
                mobile apps and e-commerce platforms.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {featuredProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 hover:border-red-500/40 text-white/60 hover:text-white transition-all duration-200 hover:bg-red-500/5 text-sm font-medium"
              >
                View all projects
                <ArrowRight size={14} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-12"
          >
            <motion.div variants={fadeInUp} className="text-center space-y-4">
              <p className="text-red-400 text-sm font-medium uppercase tracking-widest">
                Testimonials
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                What clients say
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <motion.div
                  key={t.name}
                  variants={fadeInUp}
                  whileHover={{ y: -4 }}
                  className="p-6 rounded-2xl bg-white/[0.03] border border-white/8 hover:border-red-500/20 transition-all duration-300 space-y-4"
                >
                  {/* Stars */}
                  <div className="flex gap-1">
                    {Array.from({ length: t.stars }).map((_, i) => (
                      <Star key={i} size={14} className="fill-red-400 text-red-400" />
                    ))}
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-2">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-10 h-10 rounded-full object-cover border border-white/10"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://placehold.co/40x40/1a1a1a/666?text=" +
                          t.name[0];
                      }}
                    />
                    <div>
                      <div className="text-sm font-medium text-white">{t.name}</div>
                      <div className="text-xs text-white/40">{t.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT ───────────────────────────────────────────────────────── */}
      <section id="contact" className="py-24 md:py-32 bg-white/[0.01]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-12"
          >
            <motion.div variants={fadeInUp} className="text-center space-y-4">
              <p className="text-red-400 text-sm font-medium uppercase tracking-widest">
                Contact
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Let&apos;s work together
              </h2>
              <p className="text-white/50 max-w-lg mx-auto">
                Have a project in mind? I&apos;d love to hear about it. Send me a
                message and I&apos;ll get back to you within 24 hours.
              </p>
            </motion.div>

            <motion.form
              ref={contactRef}
              variants={fadeInUp}
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm text-white/60 font-medium">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, name: e.target.value }))
                    }
                    placeholder="Alex Morgan"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-white/60 font-medium">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, email: e.target.value }))
                    }
                    placeholder="hello@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors text-sm"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-white/60 font-medium">Message</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, message: e.target.value }))
                  }
                  placeholder="Tell me about your project..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors text-sm resize-none"
                />
              </div>

              <motion.button
                type="submit"
                disabled={formStatus === "sending" || formStatus === "sent"}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold shadow-lg shadow-red-500/25 transition-all duration-200"
              >
                {formStatus === "sending" ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Sending...
                  </>
                ) : formStatus === "sent" ? (
                  <>
                    <CheckCircle size={16} />
                    Message sent!
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </motion.button>

              {formStatus === "sent" && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-sm text-emerald-400"
                >
                  Thanks! I&apos;ll be in touch soon.
                </motion.p>
              )}
            </motion.form>

            {/* Direct contact */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4 border-t border-white/5"
            >
              <a
                href={`mailto:${BRAND.email}`}
                className="flex items-center gap-2 text-sm text-white/50 hover:text-red-400 transition-colors"
              >
                <Mail size={15} />
                {BRAND.email}
              </a>
              <span className="hidden sm:block w-px h-4 bg-white/10" />
              <a
                href={BRAND.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-white/50 hover:text-red-400 transition-colors"
              >
                <Github size={15} />
                GitHub
              </a>
              <span className="hidden sm:block w-px h-4 bg-white/10" />
              <a
                href={BRAND.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-white/50 hover:text-red-400 transition-colors"
              >
                <Linkedin size={15} />
                LinkedIn
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
