"use client";

import Link from "next/link";
import { useLanguage } from "./components/LanguageProvider";
import HeroStage from "./components/HeroStage";
import {
  ScrollProgress,
  Typewriter,
  CountUp,
  BackToTop,
  useActiveSection,
  Reveal,
  JourneyTimeline,
  MagneticLink,
  TerminalDemo,
  CursorPreview,
} from "./components/AnimatedExtras";

import { useRef, useState, type CSSProperties } from "react";

const projects = [
  {
    number: "01",
    title: "Authentication API",
    slug: "/projects/authentication-api",
    github: "https://github.com/AlbarFahrezi/Authentication-Server-API",
    description: {
      id: "REST API untuk authentication dan authorization dengan sistem role administrator dan operator.",
      en: "REST API for authentication and authorization with administrator and operator roles.",
    },
    tags: ["Laravel", "PHP", "MySQL", "Sanctum"],
  },
  {
    number: "02",
    title: "Inventory Management API",
    slug: "/projects/inventory-management-api",
    github: "https://github.com/AlbarFahrezi/Inventory-Stock-Management-API",
    description: {
      id: "API untuk mengelola produk, stok, transaksi IN/OUT, stock history, dan proses inventory.",
      en: "API for managing products, stock, IN/OUT transactions, stock history, and inventory processes.",
    },
    tags: ["Laravel", "PHP", "MySQL", "REST API"],
  },
  {
    number: "03",
    title: "Approval Workflow System",
    slug: "/projects/approval-workflow",
    github: "https://github.com/AlbarFahrezi/approval_workflow_api",
    description: {
      id: "Sistem workflow untuk mengelola proses pengajuan dari draft hingga approval.",
      en: "A workflow system for managing submissions from draft to approval.",
    },
    tags: ["Laravel", "React", "MySQL", "REST API"],
  },
];

const skills = [
  "Laravel",
  "PHP",
  "JavaScript",
  "React",
  "Next.js",
  "MySQL",
  "REST API",
  "Git",
  "Tailwind CSS",
  "Figma",
  "Angular",
  "Docker",
];

const navItems = [
  { id: "about", idLabel: "Tentang", enLabel: "About" },
  { id: "journey", idLabel: "Perjalanan", enLabel: "Journey" },
  { id: "projects", idLabel: "Project", enLabel: "Projects" },
  { id: "education", idLabel: "Pendidikan", enLabel: "Education" },
  { id: "skills", idLabel: "Skill", enLabel: "Skills" },
  { id: "contact", idLabel: "Kontak", enLabel: "Contact" },
];

/* =========================================================
   EDUCATION
========================================================= */

type School = {
  short: string;
  name: string;
  level: { id: string; en: string };
  logo: string;
  href: string;
  years?: string;
  note?: { id: string; en: string };
};

/* TODO: ganti href dengan link yang kamu mau (website sekolah / halaman Kemdikbud),
   isi years (mis. "2012 — 2018"), dan taruh logo di /public/images/schools/ */
const schools: School[] = [
  {
    short: "SD",
    name: "SD RAWASARI",
    level: { id: "Sekolah Dasar", en: "Elementary School" },
    logo: "/images/schools/sd-rawasari.png",
    href: "https://referensi.data.kemendikdasmen.go.id/pendidikan/npsn/20233197",
  },
  {
    short: "SMPN 6",
    name: "SMPN 6 SUBANG",
    level: { id: "Sekolah Menengah Pertama", en: "Junior High School" },
    logo: "/images/schools/smpn-6-subang.png",
    href: "https://referensi.data.kemendikdasmen.go.id/residu/satuanpendidikan/detail/20217013",
  },
  {
    short: "SMKN 1",
    name: "SMKN 1 SUBANG",
    level: { id: "Sekolah Menengah Kejuruan", en: "Vocational High School" },
    logo: "/images/schools/smkn-1-subang.png",
    href: "https://smkn1subang.sch.id/",
  },
];

function SchoolCard({ school, isID }: { school: School; isID: boolean }) {
  const [failed, setFailed] = useState(false);

  return (
    <a
      href={school.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <div className="relative flex h-44 items-center justify-center overflow-hidden rounded-2xl bg-[#F5F3EE] transition-transform duration-500 ease-out group-hover:-translate-y-2">
        {failed ? (
          <span className="font-[var(--font-space-grotesk)] text-5xl font-bold tracking-[-0.06em] text-[#111111]/25 transition-colors duration-500 group-hover:text-[#FF5C35]">
            {school.short}
          </span>
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={school.logo}
            alt={school.name}
            draggable={false}
            onError={() => setFailed(true)}
            className="h-28 w-28 object-contain opacity-60 grayscale transition-all duration-500 ease-out group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0 [@media(hover:none)]:opacity-100 [@media(hover:none)]:grayscale-0"
          />
        )}

        <span className="absolute right-4 top-4 translate-x-1 text-lg text-[#FF5C35] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          ↗
        </span>
      </div>

      <div className="mt-6 border-t border-white/15 pt-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF5C35]">
          {isID ? school.level.id : school.level.en}
        </p>

        <h3 className="mt-3 font-[var(--font-space-grotesk)] text-2xl font-bold tracking-[-0.04em] transition-colors duration-300 group-hover:text-[#FF5C35]">
          {school.name}
        </h3>

        {school.years && (
          <p className="mt-2 font-mono text-xs text-white/50">{school.years}</p>
        )}

        {school.note && (
          <p className="mt-2 text-sm text-white/60">
            {isID ? school.note.id : school.note.en}
          </p>
        )}
      </div>
    </a>
  );
}

/* =========================================================
   CONTACT
========================================================= */

type ContactKey =
  | "email"
  | "phone"
  | "linkedin"
  | "github"
  | "instagram"
  | "youtube";

/* TODO: isi href untuk phone / instagram / youtube kalau mau ditampilkan.
   Yang href-nya kosong otomatis tidak muncul. */
const contacts: { key: ContactKey; label: string; href: string }[] = [
  { key: "email", label: "Email", href: "mailto:albarfahrezi7@gmail.com" },
  { key: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/albar-fahrezi-65b30a395/" },
  { key: "github", label: "GitHub", href: "https://github.com/AlbarFahrezi" },
  
  { key: "instagram", label: "Instagram", href: "https://www.instagram.com/rzexxtr/" },
  { key: "youtube", label: "YouTube", href: "" },
];

const brandBackground: Record<ContactKey, string> = {
  email: "#EA4335",
  phone: "#34A853",
  linkedin: "#0A66C2",
  github: "#181717",
  instagram:
    "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
  youtube: "#FF0000",
};

const brandShape: Record<ContactKey, string> = {
  email: "rounded-full",
  phone: "rounded-full",
  github: "rounded-full",
  linkedin: "rounded-[14px]",
  instagram: "rounded-[14px]",
  youtube: "rounded-[14px]",
};

function ContactIcon({ name }: { name: ContactKey }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "email":
      return (
        <svg {...common}>
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      );
    case "phone":
      return (
        <svg {...common}>
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" width={26} height={26} fill="currentColor" aria-hidden>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
        </svg>
      );
    case "github":
      return (
        <svg viewBox="0 0 24 24" width={30} height={30} fill="currentColor" aria-hidden>
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...common}>
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      );
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" width={26} height={26} fill="currentColor" aria-hidden>
          <path d="M9.4 7.2v9.6l8.2-4.8z" />
        </svg>
      );
  }
}

/* =========================================================
   HOME
========================================================= */

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { language, setLanguage } = useLanguage();

  const isID = language === "id";

  const active = useActiveSection(navItems.map((item) => item.id));

  const [hovered, setHovered] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  const roles = isID
    ? ["Laravel & REST API.", "React & Next.js.", "Logika jadi keajaiban."]
    : ["Laravel & REST APIs.", "React & Next.js.", "Logic into magic."];

  const stats = [
    { value: 3, label: isID ? "Project" : "Projects" },
    { value: skills.length, label: isID ? "Tools" : "Tools" },
    { value: 6, label: isID ? "Bulan PKL" : "Months of PKL" }, // sesuaikan angkanya
  ];

  return (
    <main className="min-h-screen overflow-x-clip bg-[#F5F3EE] text-[#111111]">
      <ScrollProgress />

      {/* ==================================================
          NAVBAR
      ================================================== */}

      <nav className="sticky top-0 z-50 border-b border-[#111111]/10 bg-[#F5F3EE]/95 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex items-center justify-between py-5">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="font-[var(--font-space-grotesk)] text-lg font-bold tracking-[-0.05em]"
            >
              ALBAR
              <span className="text-[#FF5C35]"></span>
            </Link>

            <div className="hidden items-center gap-8 md:flex">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  data-active={active === item.id}
                  className="nav-link text-sm font-medium transition-colors hover:text-[#FF5C35]"
                >
                  {isID ? item.idLabel : item.enLabel}
                </a>
              ))}
            </div>

            <div className="hidden items-center gap-2 md:flex">
              <div className="flex items-center rounded-full border border-[#111111]/15 bg-white/40 p-1">
                <button
                  type="button"
                  onClick={() => setLanguage("id")}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
                    isID
                      ? "bg-[#111111] text-white"
                      : "text-[#777777] hover:text-[#111111]"
                  }`}
                >
                  ID
                </button>

                <button
                  type="button"
                  onClick={() => setLanguage("en")}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
                    !isID
                      ? "bg-[#111111] text-white"
                      : "text-[#777777] hover:text-[#111111]"
                  }`}
                >
                  EN
                </button>
              </div>
            </div>

            <a
              href="#projects"
              className="hidden items-center justify-center rounded-full bg-[#111111] px-5 py-2.5 text-sm font-semibold !text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#FF5C35] md:inline-flex"
            >
              {isID ? "Lihat Project" : "View Work"}
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#111111]/15 text-xl transition-all duration-200 hover:border-[#FF5C35] hover:text-[#FF5C35] md:hidden"
            >
              {menuOpen ? "×" : "☰"}
            </button>
          </div>

          {menuOpen && (
            <div className="animate-fade-in border-t border-[#111111]/10 py-5 md:hidden">
              <div className="flex flex-col">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setMenuOpen(false)}
                    className="border-b border-[#111111]/10 py-4 text-base font-semibold transition-colors hover:text-[#FF5C35]"
                  >
                    {isID ? item.idLabel : item.enLabel}
                  </a>
                ))}

                <div className="mt-5 flex items-center justify-between gap-3">
                  <div className="flex rounded-full border border-[#111111]/15 p-1">
                    <button
                      type="button"
                      onClick={() => setLanguage("id")}
                      className={`rounded-full px-4 py-2 text-xs font-semibold ${
                        isID ? "bg-[#111111] text-white" : "text-[#777777]"
                      }`}
                    >
                      ID
                    </button>

                    <button
                      type="button"
                      onClick={() => setLanguage("en")}
                      className={`rounded-full px-4 py-2 text-xs font-semibold ${
                        !isID ? "bg-[#111111] text-white" : "text-[#777777]"
                      }`}
                    >
                      EN
                    </button>
                  </div>

                  <a
                    href="#projects"
                    onClick={() => setMenuOpen(false)}
                    className="inline-flex flex-1 items-center justify-center rounded-full bg-[#111111] px-5 py-3 text-sm font-semibold !text-white transition-all duration-200 hover:bg-[#FF5C35]"
                  >
                    {isID ? "Lihat Project" : "View Work"}
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* ==================================================
          HERO
      ================================================== */}

      <HeroStage>
        <div className="animate-fade-in flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/60 sm:text-sm">
          

          {isID
            ? ""
            : ""}
        </div>

        <div>
          <div className="grid items-end gap-10 lg:grid-cols-2">
            <div className="animate-fade-up-delay-2">
              <p className="mb-3 text-base text-white/60 md:text-lg">
                {isID ? "Halo, saya" : "Hello, I'm"}
              </p>

              <h2 className="font-[var(--font-space-grotesk)] text-3xl font-semibold leading-[1.05] tracking-[-0.05em] md:text-5xl">
                Fullstack Developer
                <br />
                <span className="text-[#FF5C35]">
                  <Typewriter words={roles} />
                </span>
              </h2>
            </div>

            <div className="animate-fade-up-delay lg:ml-auto lg:max-w-md">
              <p className="text-base leading-7 text-white/60 md:text-lg md:leading-8">
                {isID
                  ? ""
                  : ""}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-6">
                <MagneticLink
                  href="#projects"
                  className="inline-flex items-center gap-3 border-b-2 border-white pb-2 text-sm font-semibold md:text-base"
                >
                  {isID ? "Lihat project saya" : "Explore my projects"}
                  <span className="text-[#FF5C35]">↗</span>
                </MagneticLink>

                <MagneticLink
                  href="/cv.pdf"
                  download
                  className="inline-flex items-center rounded-full bg-[#F5F3EE] px-5 py-2.5 text-sm font-semibold !text-[#111111] hover:bg-[#FF5C35] hover:!text-white"
                >
                  {isID ? "Unduh CV" : "Download CV"}
                </MagneticLink>
              </div>
            </div>
          </div>

          <div className="animate-fade-up-delay-2 mt-12 border-t border-white/20 pt-5">
            <div className="flex flex-col justify-between gap-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/50 sm:flex-row sm:text-xs">
              <span>
                {isID ? "Scroll untuk melihat ↓" : "Scroll to explore ↓"}
              </span>
            </div>
          </div>
        </div>
      </HeroStage>

      {/* ==================================================
          ABOUT
      ================================================== */}

      <section
        id="about"
        className="border-t border-[#111111]/10 bg-[#111111] text-white"
      >
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.35fr_0.65fr]">
            <Reveal variant="left">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF5C35] md:text-sm">
                  01 — {isID ? "Tentang" : "About"}
                </p>
              </div>
            </Reveal>

            <Reveal variant="right" delay={120}>
              <div>
                <h2 className="max-w-4xl font-[var(--font-space-grotesk)] text-4xl font-bold leading-[1.05] tracking-[-0.06em] md:text-6xl">
                  {isID ? (
                    <>
                      Belajar melalui{" "}
                      <span className="text-[#FF5C35]">membangun</span> project
                      nyata.
                    </>
                  ) : (
                    <>
                      Learning by{" "}
                      <span className="text-[#FF5C35]">building</span> real
                      projects.
                    </>
                  )}
                </h2>

                <p className="mt-8 max-w-2xl text-base leading-8 text-white/60 md:text-lg">
                  {isID
                    ? "Selama kegiatan PKL, saya belajar mengubah konsep menjadi aplikasi yang benar-benar bisa digunakan. Dari authentication, database, REST API, sampai sistem inventory dan workflow."
                    : "During my internship, I learned how to turn concepts into applications that can actually be used. From authentication and databases to REST APIs, inventory systems, and workflows."}
                </p>

                <div className="mt-12 grid max-w-xl grid-cols-3 gap-6 border-t border-white/15 pt-8">
                  {stats.map((stat) => (
                    <div key={stat.label}>
                      <CountUp
                        to={stat.value}
                        suffix="+"
                        className="font-[var(--font-space-grotesk)] text-4xl font-bold tracking-[-0.05em] text-[#FF5C35] md:text-5xl"
                      />
                      <p className="mt-2 text-sm text-white/60">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ==================================================
          JOURNEY
      ================================================== */}

      <section
        id="journey"
        className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32"
      >
        <Reveal>
          <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#FF5C35] md:text-sm">
                02 — {isID ? "Perjalanan" : "Journey"}
              </p>

              <h2 className="font-[var(--font-space-grotesk)] text-4xl font-bold leading-[0.95] tracking-[-0.06em] md:text-6xl">
                {isID ? (
                  <>
                    Dari belajar
                    <br />
                    hingga membangun.
                  </>
                ) : (
                  <>
                    From learning
                    <br />
                    to building.
                  </>
                )}
              </h2>
            </div>

            <p className="max-w-sm text-base leading-7 text-[#6B6B6B]">
              {isID
                ? "Perjalanan saya berkembang melalui proses belajar, eksplorasi, implementasi, dan evaluasi."
                : "My journey has grown through learning, exploration, implementation, and evaluation."}
            </p>
          </div>
        </Reveal>

        <JourneyTimeline>
          <Reveal delay={0}>
            <div className="border-b border-[#111111]/20 py-8 md:border-b-0 md:border-r md:pr-8">
              <span className="text-sm font-semibold text-[#FF5C35]">01</span>

              <h3 className="mt-8 font-[var(--font-space-grotesk)] text-2xl font-bold">
                PKL
              </h3>

              <p className="mt-4 leading-7 text-[#6B6B6B]">
                {isID
                  ? "Mengenal workflow pengembangan software dan memahami bagaimana sebuah project dibangun secara terstruktur."
                  : "Understanding software development workflows and how projects are structured and built."}
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="border-b border-[#111111]/20 py-8 md:border-b-0 md:border-r md:px-8">
              <span className="text-sm font-semibold text-[#FF5C35]">02</span>

              <h3 className="mt-8 font-[var(--font-space-grotesk)] text-2xl font-bold">
                Learning
              </h3>

              <p className="mt-4 leading-7 text-[#6B6B6B]">
                {isID
                  ? "Memperdalam Laravel, database, authentication, API, Git, frontend, dan konsep software development."
                  : "Deepening my knowledge of Laravel, databases, authentication, APIs, Git, frontend, and software development."}
              </p>
            </div>
          </Reveal>

          <Reveal delay={240}>
            <div className="py-8 md:pl-8">
              <span className="text-sm font-semibold text-[#FF5C35]">03</span>

              <h3 className="mt-8 font-[var(--font-space-grotesk)] text-2xl font-bold">
                Building
              </h3>

              <p className="mt-4 leading-7 text-[#6B6B6B]">
                {isID
                  ? "Menerapkan ilmu melalui beberapa project seperti Authentication API, Inventory API, dan Approval Workflow."
                  : "Applying what I learned through projects such as Authentication API, Inventory API, and Approval Workflow."}
              </p>
            </div>
          </Reveal>
        </JourneyTimeline>
      </section>

      {/* ==================================================
          API TERMINAL
      ================================================== */}

      <section className="bg-[#111111] text-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[0.4fr_0.6fr] lg:items-center lg:px-10 lg:py-32">
          <Reveal variant="left">
            <div>
              <h2 className="font-[var(--font-space-grotesk)] text-4xl font-bold leading-[1] tracking-[-0.06em] md:text-5xl">
                {isID ? (
                  <>
                    Backend yang
                    <br />
                    bisa dibaca.
                  </>
                ) : (
                  <>
                    Backend you
                    <br />
                    can read.
                  </>
                )}
              </h2>

              <p className="mt-6 max-w-sm text-base leading-7 text-white/60">
                {isID
                  ? "Cuplikan request dan response dari tiga API yang saya bangun selama PKL."
                  : "Sample requests and responses from the three APIs I built during my internship."}
              </p>
            </div>
          </Reveal>

          <Reveal variant="right" delay={120}>
            <TerminalDemo />
          </Reveal>
        </div>
      </section>

      {/* ==================================================
          PROJECTS
      ================================================== */}

      <section
        id="projects"
        className="border-t border-[#111111]/10 bg-white"
      >
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <Reveal>
            <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div>
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#FF5C35] md:text-sm">
                  03 — {isID ? "Project Pilihan" : "Selected Projects"}
                </p>

                <h2 className="font-[var(--font-space-grotesk)] text-4xl font-bold leading-[0.95] tracking-[-0.06em] md:text-6xl">
                  {isID ? (
                    <>
                      Hal yang
                      <br />
                      <span className="text-[#6B6B6B]">saya bangun.</span>
                    </>
                  ) : (
                    <>
                      Things I&apos;ve
                      <br />
                      <span className="text-[#6B6B6B]">built.</span>
                    </>
                  )}
                </h2>
              </div>

              <p className="max-w-sm text-base leading-7 text-[#6B6B6B]">
                {isID
                  ? "Beberapa project yang menjadi bagian dari perjalanan belajar dan pengalaman saya selama PKL."
                  : "Projects that became part of my learning journey and internship experience."}
              </p>
            </div>
          </Reveal>

          <div
            ref={listRef}
            onMouseLeave={() => setHovered(null)}
            className="grid gap-0"
          >
            {projects.map((project, index) => (
              <Reveal
                key={project.number}
                delay={index * 120}
                variant="up"
              >
                <div onMouseEnter={() => setHovered(index)} className="group grid gap-8 border-t border-[#111111]/20 py-10 transition-all duration-300 hover:bg-[#F5F3EE] md:grid-cols-[80px_1fr_1fr] md:px-5">
                  <span className="text-sm font-semibold text-[#FF5C35] transition-transform duration-300 group-hover:translate-x-1">
                    {project.number}
                  </span>

                  <div>
                    <h3 className="font-[var(--font-space-grotesk)] text-3xl font-bold tracking-[-0.05em] transition-colors duration-200 group-hover:text-[#FF5C35] md:text-4xl">
                      {project.title}
                    </h3>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-[#111111]/15 px-3 py-1 text-xs font-medium transition-all duration-200 group-hover:border-[#111111]/25"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col justify-between gap-6">
                    <p className="max-w-md leading-7 text-[#6B6B6B]">
                      {isID
                        ? project.description.id
                        : project.description.en}
                    </p>

                    <div className="flex flex-wrap items-center gap-5">
                      <Link
                        href={project.slug}
                        className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 hover:gap-3 hover:text-[#FF5C35]"
                      >
                        {isID ? "Lihat project" : "View project"}

                        <span className="text-[#FF5C35]">↗</span>
                      </Link>

                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#6B6B6B] transition-all duration-300 hover:gap-3 hover:text-[#111111]"
                      >
                        GitHub
                        <span>↗</span>
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <CursorPreview
            items={projects}
            activeIndex={hovered}
            containerRef={listRef}
          />
        </div>
      </section>

      {/* ==================================================
          EDUCATION
      ================================================== */}

      <section
        id="education"
        className="border-t border-[#111111]/10 bg-[#111111] text-white"
      >
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <Reveal>
            <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div>
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#FF5C35] md:text-sm">
                  04 — {isID ? "Pendidikan" : "Education"}
                </p>

                <h2 className="font-[var(--font-space-grotesk)] text-4xl font-bold leading-[0.95] tracking-[-0.06em] md:text-6xl">
                  {isID ? (
                    <>
                      Riwayat
                      <br />
                      <span className="text-white/40">Pendidikan.</span>
                    </>
                  ) : (
                    <>
                      Educational
                      <br />
                      <span className="text-white/40">Background.</span>
                    </>
                  )}
                </h2>
              </div>

              <p className="max-w-sm text-base leading-7 text-white/60">
                {isID
                  ? ""
                  : ""}
              </p>
            </div>
          </Reveal>

          <div className="grid gap-12 md:grid-cols-3 md:gap-8">
            {schools.map((school, index) => (
              <Reveal key={school.name} delay={index * 120}>
                <SchoolCard school={school} isID={isID} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          SKILLS
      ================================================== */}

      <section
        id="skills"
        className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32"
      >
        <div className="grid gap-12 lg:grid-cols-[0.35fr_0.65fr]">
          <Reveal variant="left">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF5C35] md:text-sm">
                05 — {isID ? "Skill" : "Skills"}
              </p>

              <h2 className="mt-4 font-[var(--font-space-grotesk)] text-4xl font-bold tracking-[-0.06em] md:text-5xl">
                {isID ? "Tools yang saya gunakan." : "Tools I use."}
              </h2>
            </div>
          </Reveal>

          <Reveal variant="right" delay={120}>
            <div className="flex flex-wrap content-start gap-3">
              {skills.map((skill, index) => (
                <span
                  key={skill}
                  className="skill-pop border border-[#111111]/20 px-5 py-3 text-base font-medium transition-[transform,border-color,background-color,color] duration-200 hover:-translate-y-0.5 hover:border-[#FF5C35] hover:bg-[#FF5C35] hover:text-white md:text-lg"
                  style={{ "--i": index } as CSSProperties}
                >
                  {skill}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ==================================================
          CONTACT
      ================================================== */}

      <section
        id="contact"
        className="border-t border-[#111111]/10 bg-[#FF5C35] text-[#111111]"
      >
        <div className="mx-auto max-w-7xl px-6 py-24 text-center lg:px-10 lg:py-32">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] md:text-sm">
              06 — {isID ? "Kontak" : "Contact"}
            </p>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="mx-auto mt-6 max-w-4xl font-[var(--font-space-grotesk)] text-5xl font-bold leading-[0.92] tracking-[-0.07em] md:text-7xl">
              {isID ? (
                <>
                  Mari terhubung
                  <br />
                  dan buat sesuatu.
                </>
              ) : (
                <>
                  Let&apos;s connect
                  <br />
                  and build something.
                </>
              )}
            </h2>
          </Reveal>

          <Reveal delay={180}>
            <p className="mx-auto mt-6 max-w-md text-base leading-7 text-[#111111]/70 md:text-lg">
              {isID
                ? "Punya ide, pertanyaan, atau peluang? Hubungi saya lewat salah satu kanal di bawah."
                : "Have an idea, a question, or an opportunity? Reach me through any channel below."}
            </p>
          </Reveal>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            {contacts
              .filter((item) => item.href)
              .map((item, index) => (
                <Reveal key={item.key} delay={260 + index * 80} variant="scale">
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    style={{ background: brandBackground[item.key] }}
                    className={`group relative flex h-14 w-14 items-center justify-center ${brandShape[item.key]} !text-white shadow-[0_8px_20px_rgba(0,0,0,0.18)] ring-2 ring-[#F5F3EE] transition-all duration-300 hover:-translate-y-1.5 hover:scale-110 hover:shadow-[0_14px_28px_rgba(0,0,0,0.28)]`}
                  >
                    <ContactIcon name={item.key} />

                    <span className="pointer-events-none absolute -bottom-9 left-1/2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-full bg-[#111111] px-3 py-1 text-[11px] font-semibold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      {item.label}
                    </span>
                  </a>
                </Reveal>
              ))}
          </div>

          <Reveal delay={600}>
            <a
              href="mailto:albarfahrezi7@gmail.com"
              className="mt-16 inline-block border-b-2 border-[#111111] pb-1 text-lg font-semibold transition-opacity hover:opacity-60 md:text-xl"
            >
              
            </a>
          </Reveal>
        </div>
      </section>

      {/* ==================================================
          FOOTER
      ================================================== */}

      <footer className="bg-[#111111] px-6 py-8 text-white lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-white/50 sm:flex-row">
          <span>
            © 2026 Albar.{" "}
            {isID ? "Semua hak dilindungi." : "All rights reserved."}
          </span>

          <span>Built with Next.js &amp; Tailwind CSS</span>
        </div>
      </footer>

      <BackToTop />
    </main>
  );
}