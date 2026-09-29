"use client";

import Link from "next/link";
import ProjectVisual from "@/app/components/ProjectVisual";
import { useLanguage } from "@/app/components/LanguageProvider";

const features = [
  {
    id: "Register & Login",
    en: "Register & Login",
  },
  {
    id: "Token Authentication",
    en: "Token Authentication",
  },
  {
    id: "User Profile",
    en: "User Profile",
  },
  {
    id: "Role-based Authorization",
    en: "Role-based Authorization",
  },
  {
    id: "Admin Protected Routes",
    en: "Admin Protected Routes",
  },
  {
    id: "Logout",
    en: "Logout",
  },
];

export default function AuthenticationApiPage() {
  const { language } = useLanguage();
  const isID = language === "id";

  return (
    <main className="min-h-screen bg-[#F5F3EE] text-[#111111]">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-[#111111]/10 bg-[#F5F3EE]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <Link
            href="/"
            className="font-[var(--font-space-grotesk)] text-lg font-bold tracking-[-0.05em]"
          >
            ALBAR<span className="text-[#FF5C35]">.</span>
          </Link>

          <Link
            href="/#projects"
            className="text-sm font-semibold transition-colors hover:text-[#FF5C35]"
          >
            {isID ? "← Kembali ke Project" : "← Back to Projects"}
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF5C35] md:text-sm">
          Project 01 — Backend
        </p>

        <div className="mt-8 grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div>
            <h1 className="font-[var(--font-space-grotesk)] text-5xl font-bold leading-[0.9] tracking-[-0.07em] md:text-7xl lg:text-8xl">
              Authentication
              <br />
              <span className="text-[#FF5C35]">API.</span>
            </h1>
          </div>

          <p className="max-w-md text-base leading-8 text-[#6B6B6B] md:text-lg">
            {isID
              ? "REST API untuk mengelola authentication dan authorization menggunakan Laravel dengan sistem role administrator dan operator."
              : "A REST API for handling authentication and authorization using Laravel with administrator and operator roles."}
          </p>
        </div>
      </section>

      {/* PROJECT VISUAL */}
      <section className="border-t border-[#111111]/10 bg-[#111111] text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <p className="mb-10 text-xs font-semibold uppercase tracking-[0.2em] text-[#FF5C35]">
            {isID ? "Visual Project" : "Project Visual"}
          </p>

          <ProjectVisual type="auth" />
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="border-t border-[#111111]/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.3fr_0.7fr]">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF5C35]">
              01 — {isID ? "Gambaran Umum" : "Overview"}
            </p>

            <div>
              <h2 className="font-[var(--font-space-grotesk)] text-3xl font-bold tracking-[-0.05em] md:text-5xl">
                {isID ? "Yang saya bangun." : "What I built."}
              </h2>

              <p className="mt-8 max-w-3xl text-base leading-8 text-[#6B6B6B] md:text-lg">
                {isID
                  ? "Project ini dibuat untuk mempelajari bagaimana sebuah backend authentication bekerja dari proses register, login, authentication menggunakan token, hingga pembatasan akses berdasarkan role user."
                  : "This project was built to understand how backend authentication works, from registration and login to token-based authentication and access control based on user roles."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TECHNOLOGY */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.3fr_0.7fr]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF5C35]">
            02 — {isID ? "Teknologi" : "Technology"}
          </p>

          <div className="flex flex-wrap gap-3">
            {[
              "Laravel",
              "PHP",
              "MySQL",
              "Laravel Sanctum",
              "REST API",
              "Git",
            ].map((tech) => (
              <span
                key={tech}
                className="border border-[#111111]/20 px-5 py-3 text-base font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="border-t border-[#111111]/10 bg-[#111111] text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF5C35]">
            03 — {isID ? "Fitur" : "Features"}
          </p>

          <div className="mt-12 grid gap-0 md:grid-cols-2">
            {features.map((feature, index) => (
              <div
                key={feature.en}
                className="border-t border-white/20 py-6"
              >
                <span className="text-sm text-[#FF5C35]">
                  0{index + 1}
                </span>

                <h3 className="mt-3 font-[var(--font-space-grotesk)] text-2xl font-bold">
                  {isID ? feature.id : feature.en}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT I LEARNED */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.3fr_0.7fr]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF5C35]">
            04 — {isID ? "Pembelajaran" : "Learning"}
          </p>

          <div>
            <h2 className="font-[var(--font-space-grotesk)] text-3xl font-bold tracking-[-0.05em] md:text-5xl">
              {isID ? "Yang saya pelajari." : "What I learned."}
            </h2>

            <p className="mt-8 max-w-3xl text-base leading-8 text-[#6B6B6B] md:text-lg">
              {isID
                ? "Dari project ini saya memahami konsep authentication, authorization, token-based authentication, middleware, role-based access, serta bagaimana API dirancang agar dapat digunakan oleh frontend maupun aplikasi lain."
                : "Through this project, I learned about authentication, authorization, token-based authentication, middleware, role-based access, and how APIs can be designed for use by frontend applications and other clients."}
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#FF5C35] px-6 py-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl justify-between text-sm font-medium">
          <span>Authentication API</span>

          <Link href="/#projects" className="hover:opacity-60">
            {isID ? "Kembali ke Project ↗" : "Back to Projects ↗"}
          </Link>
        </div>
      </footer>
    </main>
  );
}