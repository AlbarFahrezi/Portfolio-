"use client";

import Link from "next/link";
import { useState } from "react";

const projects = [
  {
    number: "01",
    title: "Authentication API",
    slug: "/projects/authentication-api",
    description:
      "REST API untuk authentication dan authorization dengan sistem role administrator dan operator.",
    tags: ["Laravel", "PHP", "MySQL", "Sanctum"],
  },
  {
    number: "02",
    title: "Inventory Management API",
    slug: "/projects/inventory-management-api",
    description:
      "API untuk mengelola produk, stok, transaksi IN/OUT, stock history, dan proses inventory.",
    tags: ["Laravel", "PHP", "MySQL", "REST API"],
  },
  {
    number: "03",
    title: "Approval Workflow System",
    slug: "/projects/approval-workflow",
    description:
      "Sistem workflow untuk mengelola proses pengajuan dari draft hingga approval.",
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
];

const navItems = [
  { label: "About", href: "#about" },
  { label: "Journey", href: "#journey" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen overflow-hidden bg-[#F5F3EE] text-[#111111]">
      {/* ==================== NAVBAR ==================== */}
      <nav className="sticky top-0 z-50 border-b border-[#111111]/10 bg-[#F5F3EE]/95 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex items-center justify-between py-5">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="font-[var(--font-space-grotesk)] text-lg font-bold tracking-[-0.05em]"
            >
              ALBAR<span className="text-[#FF5C35]">.</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-8 md:flex">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium transition-colors hover:text-[#FF5C35]"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Desktop Button */}
            <a
              href="#projects"
              className="hidden items-center justify-center rounded-full bg-[#111111] px-5 py-2.5 text-sm font-semibold !text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#FF5C35] md:inline-flex"
            >
              View Work
            </a>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#111111]/15 text-xl md:hidden"
            >
              {menuOpen ? "×" : "☰"}
            </button>
          </div>

          {/* Mobile Navigation */}
          {menuOpen && (
            <div className="border-t border-[#111111]/10 py-5 md:hidden">
              <div className="flex flex-col">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="border-b border-[#111111]/10 py-4 text-base font-semibold transition-colors hover:text-[#FF5C35]"
                  >
                    {item.label}
                  </a>
                ))}

                <a
                  href="#projects"
                  onClick={() => setMenuOpen(false)}
                  className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[#111111] px-5 py-3 text-sm font-semibold !text-white transition-colors hover:bg-[#FF5C35]"
                >
                  View Work
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* ==================== HERO ==================== */}
      <section
        id="home"
        className="mx-auto flex min-h-[calc(100vh-81px)] max-w-7xl flex-col justify-center px-6 py-20 lg:px-10"
      >
        <div className="mb-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#6B6B6B] sm:text-sm">
          <span className="h-2 w-2 shrink-0 rounded-full bg-[#FF5C35]" />
          Personal Portfolio · PKL Journey
        </div>

        <div className="grid gap-14 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
          <div>
            <p className="mb-5 text-base text-[#6B6B6B] md:text-lg">
              Hello, I&apos;m
            </p>

            <h1 className="font-[var(--font-space-grotesk)] text-[clamp(4rem,12vw,10rem)] font-bold leading-[0.78] tracking-[-0.08em]">
              ALBAR
              <span className="text-[#FF5C35]">.</span>
            </h1>

            <h2 className="mt-10 max-w-3xl font-[var(--font-space-grotesk)] text-3xl font-semibold leading-[1.05] tracking-[-0.05em] md:text-5xl lg:text-6xl">
              Fullstack Developer
              <br />
              <span className="text-[#6B6B6B]">
                who loves building things.
              </span>
            </h2>
          </div>

          <div className="lg:pb-2">
            <p className="max-w-md text-base leading-7 text-[#6B6B6B] md:text-lg md:leading-8">
              A personal collection of my internship journey, projects,
              experiments, and things I learned while building software.
            </p>

            <a
              href="#projects"
              className="mt-8 inline-flex items-center gap-3 border-b-2 border-[#111111] pb-2 text-sm font-semibold transition-all duration-200 hover:gap-5 md:text-base"
            >
              Explore my projects
              <span className="text-[#FF5C35]">↗</span>
            </a>
          </div>
        </div>

        <div className="mt-20 border-t border-[#111111]/20 pt-5">
          <div className="flex flex-col justify-between gap-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6B6B6B] sm:flex-row sm:text-xs">
            <span>Based in Indonesia</span>
            <span>2026 — PKL Portfolio</span>
            <span>Scroll to explore ↓</span>
          </div>
        </div>
      </section>

      {/* ==================== ABOUT ==================== */}
      <section
        id="about"
        className="border-t border-[#111111]/10 bg-[#111111] text-white"
      >
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.35fr_0.65fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF5C35] md:text-sm">
                01 — About
              </p>
            </div>

            <div>
              <h2 className="max-w-4xl font-[var(--font-space-grotesk)] text-4xl font-bold leading-[1.05] tracking-[-0.06em] md:text-6xl">
                Learning by{" "}
                <span className="text-[#FF5C35]">building</span> real
                projects.
              </h2>

              <p className="mt-8 max-w-2xl text-base leading-8 text-white/60 md:text-lg">
                Selama kegiatan PKL, saya belajar mengubah konsep menjadi
                aplikasi yang benar-benar bisa digunakan. Dari authentication,
                database, REST API, sampai sistem inventory dan workflow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== JOURNEY ==================== */}
      <section
        id="journey"
        className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32"
      >
        <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#FF5C35] md:text-sm">
              02 — Journey
            </p>

            <h2 className="font-[var(--font-space-grotesk)] text-4xl font-bold leading-[0.95] tracking-[-0.06em] md:text-6xl">
              From learning
              <br />
              to building.
            </h2>
          </div>

          <p className="max-w-sm text-base leading-7 text-[#6B6B6B]">
            Perjalanan saya berkembang melalui proses belajar, eksplorasi,
            implementasi, dan evaluasi.
          </p>
        </div>

        <div className="grid border-t border-[#111111]/20 md:grid-cols-3">
          <div className="border-b border-[#111111]/20 py-8 md:border-b-0 md:border-r md:pr-8">
            <span className="text-sm font-semibold text-[#FF5C35]">01</span>

            <h3 className="mt-8 font-[var(--font-space-grotesk)] text-2xl font-bold">
              PKL
            </h3>

            <p className="mt-4 leading-7 text-[#6B6B6B]">
              Mengenal workflow pengembangan software dan memahami bagaimana
              sebuah project dibangun secara terstruktur.
            </p>
          </div>

          <div className="border-b border-[#111111]/20 py-8 md:border-b-0 md:border-r md:px-8">
            <span className="text-sm font-semibold text-[#FF5C35]">02</span>

            <h3 className="mt-8 font-[var(--font-space-grotesk)] text-2xl font-bold">
              Learning
            </h3>

            <p className="mt-4 leading-7 text-[#6B6B6B]">
              Memperdalam Laravel, database, authentication, API, Git,
              frontend, dan konsep software development.
            </p>
          </div>

          <div className="py-8 md:pl-8">
            <span className="text-sm font-semibold text-[#FF5C35]">03</span>

            <h3 className="mt-8 font-[var(--font-space-grotesk)] text-2xl font-bold">
              Building
            </h3>

            <p className="mt-4 leading-7 text-[#6B6B6B]">
              Menerapkan ilmu melalui beberapa project seperti Authentication
              API, Inventory API, dan Approval Workflow.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== PROJECTS ==================== */}
      <section
        id="projects"
        className="border-t border-[#111111]/10 bg-white"
      >
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#FF5C35] md:text-sm">
                03 — Selected Projects
              </p>

              <h2 className="font-[var(--font-space-grotesk)] text-4xl font-bold leading-[0.95] tracking-[-0.06em] md:text-6xl">
                Things I&apos;ve
                <br />
                <span className="text-[#6B6B6B]">built.</span>
              </h2>
            </div>

            <p className="max-w-sm text-base leading-7 text-[#6B6B6B]">
              Beberapa project yang menjadi bagian dari perjalanan belajar dan
              pengalaman saya selama PKL.
            </p>
          </div>

          <div className="grid gap-0">
            {projects.map((project) => (
              <Link
                key={project.number}
                href={project.slug}
                className="group grid gap-8 border-t border-[#111111]/20 py-10 transition-colors hover:bg-[#F5F3EE] md:grid-cols-[80px_1fr_1fr] md:px-5"
              >
                <span className="text-sm font-semibold text-[#FF5C35]">
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
                        className="rounded-full border border-[#111111]/15 px-3 py-1 text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col justify-between gap-6">
                  <p className="max-w-md leading-7 text-[#6B6B6B]">
                    {project.description}
                  </p>

                  <span className="text-sm font-semibold opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100">
                    View project ↗
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SKILLS ==================== */}
      <section
        id="skills"
        className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32"
      >
        <div className="grid gap-12 lg:grid-cols-[0.35fr_0.65fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF5C35] md:text-sm">
              04 — Skills
            </p>

            <h2 className="mt-4 font-[var(--font-space-grotesk)] text-4xl font-bold tracking-[-0.06em] md:text-5xl">
              Tools I use.
            </h2>
          </div>

          <div className="flex content-start flex-wrap gap-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="border border-[#111111]/20 px-5 py-3 text-base font-medium transition-all duration-200 hover:border-[#FF5C35] hover:bg-[#FF5C35] hover:text-white md:text-lg"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CONTACT ==================== */}
      <section
        id="contact"
        className="border-t border-[#111111]/10 bg-[#FF5C35] text-[#111111]"
      >
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] md:text-sm">
            05 — Contact
          </p>

          <div className="mt-10 flex flex-col justify-between gap-12 lg:flex-row lg:items-end">
            <h2 className="max-w-4xl font-[var(--font-space-grotesk)] text-5xl font-bold leading-[0.9] tracking-[-0.07em] md:text-7xl">
              Let&apos;s connect
              <br />
              and build something.
            </h2>

            <div className="flex min-w-[240px] flex-col gap-4 text-lg font-medium">
              <a
                href="mailto:albarfahrezi7@gmail.com"
                className="border-b border-[#111111] pb-2 transition-opacity hover:opacity-60"
              >
                albarfahrezi7@gmail.com
              </a>

              <a
                href="https://github.com/AlbarFahrezi"
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-[#111111] pb-2 transition-opacity hover:opacity-60"
              >
                GitHub ↗
              </a>

              <a
                href="https://www.linkedin.com/in/albar-fahrezi-65b30a395/"
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-[#111111] pb-2 transition-opacity hover:opacity-60"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="bg-[#111111] px-6 py-8 text-white lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-white/50 sm:flex-row">
          <span>© 2026 Albar. All rights reserved.</span>

          <span>Built with Next.js &amp; Tailwind CSS</span>
        </div>
      </footer>
    </main>
  );
}