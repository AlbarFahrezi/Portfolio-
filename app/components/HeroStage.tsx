"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { HeroNetwork } from "./AnimatedExtras";

/* Nama besar berada DI BELAKANG foto, foto cutout di DEPAN.
   Mouse dan scroll menggeser tiap lapisan dengan kecepatan berbeda (parallax). */

const smooth = "transform 450ms cubic-bezier(0.22, 1, 0.36, 1)";

export default function HeroStage({ children }: { children: ReactNode }) {
  const stageRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;

    const onMove = (e: MouseEvent) => {
      const r = stage.getBoundingClientRect();
      stage.style.setProperty("--mx", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
      stage.style.setProperty("--my", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        stage.style.setProperty("--sy", String(Math.min(window.scrollY, 1000)));
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={stageRef}
      id="home"
      className="relative isolate flex min-h-[max(720px,calc(100vh-81px))] flex-col overflow-hidden bg-[#111111] text-[#F5F3EE]"
    >
      {/* Cahaya oranye di belakang foto */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 50% 58% at 50% 64%, rgba(255,92,53,0.42), rgba(255,92,53,0) 70%)",
        }}
      />

      <HeroNetwork variant="dark" />

      {/* ============ NAMA (lapisan belakang) ============ */}
      <h1 className="pointer-events-none absolute inset-x-0 top-[7%] z-10 mx-auto flex w-full max-w-[1600px] select-none flex-col px-6 font-[var(--font-space-grotesk)] text-[clamp(5rem,17vw,17rem)] font-bold uppercase leading-[0.82] tracking-[-0.07em] lg:px-10">
        <span
          className="block text-left"
          style={{
            transform:
              "translate3d(calc(var(--mx, 0) * 30px + var(--sy, 0) * -0.22px), 0, 0)",
            transition: smooth,
          }}
        >
          <span className="block overflow-hidden py-[0.06em]">
            <span
              className="mask-inner block"
              style={{ animationDelay: "250ms" }}
            >
              Albar
            </span>
          </span>
        </span>

        <span
          className="block text-right"
          style={{
            transform:
              "translate3d(calc(var(--mx, 0) * -30px + var(--sy, 0) * 0.22px), 0, 0)",
            transition: smooth,
          }}
        >
          <span className="block overflow-hidden py-[0.06em]">
            <span
              className="mask-inner block"
              style={{ animationDelay: "400ms" }}
            >
              Fahrezi
            </span>
          </span>
        </span>
      </h1>

      {/* ============ FOTO (lapisan depan) ============ */}
      <div className="animate-fade-up-delay pointer-events-none absolute inset-x-0 bottom-0 top-[5%] z-20 flex items-end justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/albar-hero.png"
          alt="Albar Fahrezi"
          draggable={false}
          fetchPriority="high"
          className="h-full w-auto max-w-none select-none object-contain object-bottom"
          style={{
            transform:
              "translate3d(calc(var(--mx, 0) * -18px), calc(var(--my, 0) * -10px + var(--sy, 0) * 0.07px), 0)",
            transition: smooth,
            filter: "drop-shadow(0 30px 50px rgba(0,0,0,0.55))",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 72%, transparent 100%), linear-gradient(to right, transparent 0%, black 18%, black 82%, transparent 100%)",
            maskImage:
              "linear-gradient(to bottom, black 72%, transparent 100%), linear-gradient(to right, transparent 0%, black 18%, black 82%, transparent 100%)",
            WebkitMaskComposite: "source-in",
            maskComposite: "intersect",
          }}
        />
      </div>

      {/* Gradasi bawah supaya teks mudah dibaca */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[25] h-1/2 bg-gradient-to-t from-[#111111] via-[#111111]/70 to-transparent" />

      {/* ============ KONTEN DEPAN ============ */}
      <div className="relative z-30 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between px-6 py-10 lg:px-10">
        {children}
      </div>
    </section>
  );
}