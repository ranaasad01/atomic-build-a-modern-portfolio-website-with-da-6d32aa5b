export type NavLink = {
  label: string;
  href: string;
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
};

export type Skill = {
  name: string;
  level: number; // 0–100
  category: "frontend" | "backend" | "tools" | "design";
};

// ─── Brand constants ────────────────────────────────────────────────────────
export const BRAND = {
  name: "Alex Morgan",
  initials: "AM",
  tagline: "Full-Stack Developer & Designer",
  email: "hello@alexmorgan.dev",
  github: "https://github.com/alexmorgan",
  linkedin: "https://linkedin.com/in/alexmorgan",
  twitter: "https://twitter.com/alexmorgan",
  resumeUrl: "/resume-alex-morgan.pdf",
} as const;

// ─── Navigation (single source of truth) ────────────────────────────────────
export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

// ─── Primary CTA ─────────────────────────────────────────────────────────────
export const primaryCTA = {
  label: "View My Work",
  href: "#projects",
} as const;