"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

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

/* =========================================================
   HANGING NAME TAG
========================================================= */

function HangingNameTag() {
  const [motion, setMotion] = useState({
    x: 0,
    y: 0,
    rotate: 0,
  });

  const motionRef = useRef({
    x: 0,
    y: 0,
    rotate: 0,

    vx: 0,
    vy: 0,
    vr: 0,

    lastX: 0,
    lastY: 0,
    lastTime: 0,
  });

  const dragRef = useRef({
    active: false,
    pointerId: -1,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
  });

  const animationRef = useRef<number | null>(null);

  const stopAnimation = () => {
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  };

  const updateVisual = () => {
    const current = motionRef.current;

    setMotion({
      x: current.x,
      y: current.y,
      rotate: current.rotate,
    });
  };

  /* =======================================================
     SPRING BACK
  ======================================================= */

  const startSpring = () => {
    stopAnimation();

    const animate = () => {
      const current = motionRef.current;

      const springX = -current.x * 0.035;
      const springY = -current.y * 0.045;

      current.vx += springX;
      current.vy += springY;

      current.vx *= 0.92;
      current.vy *= 0.91;

      current.x += current.vx;
      current.y += current.vy;

      const targetRotate =
        current.x * -0.085 +
        current.vx * -2.8 +
        current.vy * 0.15;

      const rotationSpring =
        (targetRotate - current.rotate) * 0.055;

      current.vr += rotationSpring;
      current.vr *= 0.88;
      current.rotate += current.vr;

      updateVisual();

      const stillMoving =
        Math.abs(current.x) > 0.15 ||
        Math.abs(current.y) > 0.15 ||
        Math.abs(current.vx) > 0.08 ||
        Math.abs(current.vy) > 0.08 ||
        Math.abs(current.rotate) > 0.08 ||
        Math.abs(current.vr) > 0.08;

      if (stillMoving) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        current.x = 0;
        current.y = 0;
        current.rotate = 0;

        current.vx = 0;
        current.vy = 0;
        current.vr = 0;

        updateVisual();

        animationRef.current = null;
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  /* =======================================================
     POINTER DOWN
  ======================================================= */

  const handlePointerDown = (
    event: ReactPointerEvent<HTMLDivElement>,
  ) => {
    if (event.pointerType === "touch") {
      return;
    }

    stopAnimation();

    const current = motionRef.current;

    dragRef.current = {
      active: true,
      pointerId: event.pointerId,

      startX: event.clientX,
      startY: event.clientY,

      originX: current.x,
      originY: current.y,
    };

    current.vx = 0;
    current.vy = 0;
    current.vr = 0;

    current.lastX = event.clientX;
    current.lastY = event.clientY;
    current.lastTime = performance.now();

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  /* =======================================================
     POINTER MOVE
  ======================================================= */

  const handlePointerMove = (
    event: ReactPointerEvent<HTMLDivElement>,
  ) => {
    const drag = dragRef.current;

    if (!drag.active || drag.pointerId !== event.pointerId) {
      return;
    }

    const current = motionRef.current;

    const now = performance.now();

    const deltaTime = Math.max(
      8,
      Math.min(40, now - current.lastTime),
    );

    const deltaX = event.clientX - drag.startX;
    const deltaY = event.clientY - drag.startY;

    const nextX = Math.max(
      -150,
      Math.min(150, drag.originX + deltaX),
    );

    const nextY = Math.max(
      0,
      Math.min(360, drag.originY + deltaY),
    );

    const pointerVelocityX =
      ((event.clientX - current.lastX) / deltaTime) * 16;

    const pointerVelocityY =
      ((event.clientY - current.lastY) / deltaTime) * 16;

    current.vx =
      current.vx * 0.35 +
      pointerVelocityX * 0.65;

    current.vy =
      current.vy * 0.35 +
      pointerVelocityY * 0.65;

    current.x = nextX;
    current.y = nextY;

    current.lastX = event.clientX;
    current.lastY = event.clientY;
    current.lastTime = now;

    const targetRotate =
      nextX * -0.1 +
      current.vx * -2.4 +
      current.vy * 0.1;

    current.rotate = Math.max(
      -30,
      Math.min(30, targetRotate),
    );

    updateVisual();
  };

  /* =======================================================
     POINTER UP
  ======================================================= */

  const handlePointerUp = (
    event: ReactPointerEvent<HTMLDivElement>,
  ) => {
    const drag = dragRef.current;

    if (!drag.active || drag.pointerId !== event.pointerId) {
      return;
    }

    drag.active = false;
    drag.pointerId = -1;

    try {
      event.currentTarget.releasePointerCapture(
        event.pointerId,
      );
    } catch {
      // Pointer capture sudah dilepas browser.
    }

    startSpring();
  };

  /* =======================================================
     CLEANUP
  ======================================================= */

  useEffect(() => {
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  /* =======================================================
     LANYARD GEOMETRY
  ======================================================= */

  /*
   * Anchor sekarang benar-benar berada di bagian paling atas
   * area lanyard.
   */

  const anchorX = 210;
  const anchorY = 12;

  /*
   * Titik sambungan tali ke ring.

   * Ring berada tepat di titik tengah atas card.
   *
   * Card top = 125
   * Motion Y = posisi tarikan
   */

  const ringX = anchorX + motion.x;
  const ringY = 125 + motion.y;

  const dx = ringX - anchorX;
  const dy = ringY - anchorY;

  /*
   * Gerakan tali mengikuti velocity card.
   */

  const sway =
    motionRef.current.vx * -2.2 +
    motionRef.current.vy * 0.2;

  const clampedSway = Math.max(
    -45,
    Math.min(45, sway),
  );

  const curveAmount =
    Math.min(50, Math.abs(dx) * 0.18) +
    Math.min(
      18,
      Math.abs(motionRef.current.vx) * 0.55,
    );

  const direction = dx >= 0 ? 1 : -1;

  const control1X =
    anchorX +
    dx * 0.25 +
    clampedSway +
    curveAmount * direction;

  const control1Y =
    anchorY +
    dy * 0.35;

  const control2X =
    ringX -
    dx * 0.25 +
    clampedSway * 0.5 +
    curveAmount * direction;

  const control2Y =
    ringY -
    dy * 0.35;

  const ropePath = `
    M ${anchorX} ${anchorY}
    C
      ${control1X} ${control1Y},
      ${control2X} ${control2Y},
      ${ringX} ${ringY}
  `;

  const ropeHighlightPath = `
    M ${anchorX + 1.2} ${anchorY}
    C
      ${control1X + 1.2} ${control1Y},
      ${control2X + 1.2} ${control2Y},
      ${ringX + 1.2} ${ringY}
  `;

  return (
    <div
      className="
        pointer-events-none
        absolute
        right-0
        top-0
        hidden
        h-[600px]
        w-[420px]
        lg:block
      "
    >
      {/* ==================================================
          CEILING ANCHOR
      ================================================== */}

      <div
        className="
          absolute
          left-1/2
          top-0
          z-30
          h-[44px]
          w-[20px]
          -translate-x-1/2
          rounded-b-[10px]
          bg-[#151515]
          shadow-[0_5px_12px_rgba(0,0,0,0.12)]
        "
      >
        <div
          className="
            absolute
            left-1/2
            top-0
            h-full
            w-[3px]
            -translate-x-1/2
            bg-white/10
          "
        />
      </div>

      {/* ==================================================
          ROPE
      ================================================== */}

      <svg
        className="
          pointer-events-none
          absolute
          inset-0
          z-10
          h-full
          w-full
          overflow-visible
        "
        viewBox="0 0 420 600"
        preserveAspectRatio="none"
      >
        <path
          d={ropePath}
          fill="none"
          stroke="rgba(0,0,0,0.12)"
          strokeWidth="7"
          strokeLinecap="round"
        />

        <path
          d={ropePath}
          fill="none"
          stroke="#8B8B8B"
          strokeWidth="4"
          strokeLinecap="round"
        />

        <path
          d={ropeHighlightPath}
          fill="none"
          stroke="#E0E0E0"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>

      {/* ==================================================
          DRAGGABLE CARD
      ================================================== */}

      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{
          left: "50%",
          top: "125px",
          transform: `
            translate3d(
              calc(-50% + ${motion.x}px),
              ${motion.y}px,
              0
            )
            rotate(${motion.rotate}deg)
          `,
          transformOrigin: "50% 0%",
        }}
        className="
          pointer-events-auto
          absolute
          z-20
          w-[290px]
          select-none
          touch-none
          cursor-grab
          active:cursor-grabbing
        "
      >
        {/* ==================================================
            RING
        ================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-[-20px]
            z-30
            flex
            h-10
            w-10
            -translate-x-1/2
            items-center
            justify-center
            rounded-full
            border-[4px]
            border-[#B5B5B5]
            bg-[#F5F3EE]
            shadow-[0_4px_8px_rgba(0,0,0,0.18)]
          "
        >
          <div
            className="
              h-3.5
              w-3.5
              rounded-full
              border-2
              border-[#777777]
            "
          />
        </div>

        {/* ==================================================
            METAL CONNECTOR
        ================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-[9px]
            z-20
            h-7
            w-12
            -translate-x-1/2
            rounded-b-lg
            border-2
            border-[#A5A5A5]
            bg-gradient-to-b
            from-[#D7D7D7]
            to-[#8D8D8D]
            shadow-md
          "
        />

        {/* ==================================================
            CARD
        ================================================== */}

        <div
          className="
            mt-6
            overflow-hidden
            rounded-[18px]
            border
            border-[#111111]/15
            bg-white
            shadow-[0_25px_70px_rgba(0,0,0,0.16)]
          "
        >
          {/* HEADER */}

          <div
            className="
              flex
              items-center
              justify-between
              border-b
              border-[#111111]/10
              px-5
              py-4
            "
          >
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#FF5C35]" />

              <span
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-[#6B6B6B]
                "
              >
                Personal ID
              </span>
            </div>

            <span className="font-mono text-[9px] text-[#999999]">
              2026
            </span>
          </div>

          {/* PHOTO */}

          <div className="p-4">
            <div
              className="
                relative
                aspect-[4/5]
                overflow-hidden
                rounded-xl
                bg-[#DDD9D0]
              "
            >
              <Image
                src="/images/profile.jpg"
                alt="Albar Fahrezi"
                fill
                sizes="290px"
                priority
                draggable={false}
                className="
                  pointer-events-none
                  object-cover
                  object-center
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/45
                  via-transparent
                  to-black/5
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  bottom-4
                  left-4
                  right-4
                  flex
                  items-end
                  justify-between
                "
              >
                <div>
                  <p
                    className="
                      text-[8px]
                      font-semibold
                      uppercase
                      tracking-[0.2em]
                      text-white/70
                    "
                  >
                    Profile
                  </p>

                  <p className="mt-1 text-xs font-semibold text-white">
                    Developer
                  </p>
                </div>

                <span
                  className="
                    rounded-full
                    border
                    border-white/30
                    bg-black/20
                    px-2
                    py-1
                    font-mono
                    text-[8px]
                    text-white
                    backdrop-blur-sm
                  "
                >
                  PKL/26
                </span>
              </div>
            </div>

            {/* IDENTITY */}

            <div className="pt-5">
              <p
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.22em]
                  text-[#6B6B6B]
                "
              >
                Name
              </p>

              <h3
                className="
                  mt-2
                  font-[var(--font-space-grotesk)]
                  text-3xl
                  font-bold
                  leading-none
                  tracking-[-0.06em]
                "
              >
                ALBAR
                <br />
                FAHREZI
              </h3>

              <div
                className="
                  mt-5
                  grid
                  grid-cols-2
                  gap-4
                  border-t
                  border-[#111111]/10
                  pt-4
                "
              >
                <div>
                  <p
                    className="
                      text-[8px]
                      font-bold
                      uppercase
                      tracking-[0.18em]
                      text-[#888888]
                    "
                  >
                    Role
                  </p>

                  <p className="mt-1 text-[11px] font-semibold">
                    Fullstack Developer
                  </p>
                </div>

                <div>
                  <p
                    className="
                      text-[8px]
                      font-bold
                      uppercase
                      tracking-[0.18em]
                      text-[#888888]
                    "
                  >
                    Focus
                  </p>

                  <p className="mt-1 text-[11px] font-semibold">
                    Web & API
                  </p>
                </div>
              </div>

              {/* FOOTER */}

              <div
                className="
                  mt-5
                  flex
                  items-center
                  justify-between
                  border-t
                  border-[#111111]/10
                  pt-4
                "
              >
                <div className="flex gap-[3px]">
                  <span className="h-5 w-[2px] bg-[#111111]" />
                  <span className="h-5 w-[1px] bg-[#111111]" />
                  <span className="h-5 w-[3px] bg-[#111111]" />
                  <span className="h-5 w-[1px] bg-[#111111]" />
                  <span className="h-5 w-[2px] bg-[#111111]" />
                  <span className="h-5 w-[1px] bg-[#111111]" />
                  <span className="h-5 w-[3px] bg-[#111111]" />
                  <span className="h-5 w-[2px] bg-[#111111]" />
                  <span className="h-5 w-[1px] bg-[#111111]" />
                </div>

                <span
                  className="
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-[#FF5C35]
                  "
                >
                  Learning · Building
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DECORATIVE LINE */}

      <div
        className="
          absolute
          -bottom-24
          right-8
          h-20
          w-px
          overflow-hidden
          bg-[#111111]/10
        "
      >
        <div className="animate-line-move h-full w-full bg-[#FF5C35]" />
      </div>
    </div>
  );
}

/* =========================================================
   HOME
========================================================= */

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
              className="
                font-[var(--font-space-grotesk)]
                text-lg
                font-bold
                tracking-[-0.05em]
              "
            >
              ALBAR FAHREZI
              
            </Link>

            <div className="hidden items-center gap-8 md:flex">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="
                    text-sm
                    font-medium
                    transition-colors
                    hover:text-[#FF5C35]
                  "
                >
                  {item.label}
                </a>
              ))}
            </div>

            <a
              href="#projects"
              className="
                hidden
                items-center
                justify-center
                rounded-full
                bg-[#111111]
                px-5
                py-2.5
                text-sm
                font-semibold
                !text-white
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:bg-[#FF5C35]
                md:inline-flex
              "
            >
              View Work
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                border
                border-[#111111]/15
                text-xl
                transition-all
                duration-200
                hover:border-[#FF5C35]
                hover:text-[#FF5C35]
                md:hidden
              "
            >
              {menuOpen ? "×" : "☰"}
            </button>
          </div>

          {menuOpen && (
            <div className="animate-fade-in border-t border-[#111111]/10 py-5 md:hidden">
              <div className="flex flex-col">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="
                      border-b
                      border-[#111111]/10
                      py-4
                      text-base
                      font-semibold
                      transition-colors
                      hover:text-[#FF5C35]
                    "
                  >
                    {item.label}
                  </a>
                ))}

                <a
                  href="#projects"
                  onClick={() => setMenuOpen(false)}
                  className="
                    mt-5
                    inline-flex
                    w-full
                    items-center
                    justify-center
                    rounded-full
                    bg-[#111111]
                    px-5
                    py-3
                    text-sm
                    font-semibold
                    !text-white
                    transition-all
                    duration-200
                    hover:bg-[#FF5C35]
                  "
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
        className="
          relative
          mx-auto
          flex
          min-h-[calc(100vh-81px)]
          max-w-7xl
          flex-col
          justify-center
          overflow-visible
          px-6
          py-20
          lg:px-10
        "
      >
        <div
          className="
            animate-fade-in
            mb-8
            flex
            items-center
            gap-3
            text-xs
            font-semibold
            uppercase
            tracking-[0.2em]
            text-[#6B6B6B]
            sm:text-sm
          "
        >
          <span className="h-2 w-2 shrink-0 rounded-full bg-[#FF5C35]" />
          Personal Portfolio · PKL Journey
        </div>

        <div
          className="
            grid
            gap-16
            lg:grid-cols-[1.25fr_0.75fr]
            lg:items-start
          "
        >
          {/* HERO LEFT */}

          <div className="animate-fade-up">
            <p className="mb-5 text-base text-[#6B6B6B] md:text-lg">
              Hello, I&apos;m
            </p>

            <h1
              className="
                font-[var(--font-space-grotesk)]
                text-[clamp(4rem,12vw,10rem)]
                font-bold
                leading-[0.78]
                tracking-[-0.08em]
              "
            >
              ALBAR
              <br />
              FAHREZI
              <span className="text-[#FF5C35]">.</span>
            </h1>

            <h2
              className="
                mt-10
                max-w-3xl
                font-[var(--font-space-grotesk)]
                text-3xl
                font-semibold
                leading-[1.05]
                tracking-[-0.05em]
                md:text-5xl
                lg:text-6xl
              "
            >
              Fullstack Developer
              <br />
              <span className="text-[#6B6B6B]">
                who loves building things.
              </span>
            </h2>
          </div>

          {/* HERO RIGHT */}

          <div className="animate-fade-up-delay flex flex-col items-end lg:pt-8">
            <div className="h-[600px] w-full" />

            <div className="mt-8 w-full max-w-md">
              <p className="text-base leading-7 text-[#6B6B6B] md:text-lg md:leading-8">
                A personal collection of my internship journey, projects,
                experiments, and things I learned while building software.
              </p>

              <a
                href="#projects"
                className="
                  mt-8
                  inline-flex
                  items-center
                  gap-3
                  border-b-2
                  border-[#111111]
                  pb-2
                  text-sm
                  font-semibold
                  transition-all
                  duration-200
                  hover:gap-5
                  md:text-base
                "
              >
                Explore my projects
                <span className="text-[#FF5C35]">↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* LANYARD */}

        <HangingNameTag />

        {/* HERO BOTTOM */}

        <div className="animate-fade-up-delay-2 mt-20 border-t border-[#111111]/20 pt-5">
          <div
            className="
              flex
              flex-col
              justify-between
              gap-3
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.16em]
              text-[#6B6B6B]
              sm:flex-row
              sm:text-xs
            "
          >
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
              <h2
                className="
                  max-w-4xl
                  font-[var(--font-space-grotesk)]
                  text-4xl
                  font-bold
                  leading-[1.05]
                  tracking-[-0.06em]
                  md:text-6xl
                "
              >
                Learning by{" "}
                <span className="text-[#FF5C35]">building</span>{" "}
                real projects.
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

            <h2
              className="
                font-[var(--font-space-grotesk)]
                text-4xl
                font-bold
                leading-[0.95]
                tracking-[-0.06em]
                md:text-6xl
              "
            >
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
            <span className="text-sm font-semibold text-[#FF5C35]">
              01
            </span>

            <h3 className="mt-8 font-[var(--font-space-grotesk)] text-2xl font-bold">
              PKL
            </h3>

            <p className="mt-4 leading-7 text-[#6B6B6B]">
              Mengenal workflow pengembangan software dan memahami bagaimana
              sebuah project dibangun secara terstruktur.
            </p>
          </div>

          <div className="border-b border-[#111111]/20 py-8 md:border-b-0 md:border-r md:px-8">
            <span className="text-sm font-semibold text-[#FF5C35]">
              02
            </span>

            <h3 className="mt-8 font-[var(--font-space-grotesk)] text-2xl font-bold">
              Learning
            </h3>

            <p className="mt-4 leading-7 text-[#6B6B6B]">
              Memperdalam Laravel, database, authentication, API, Git,
              frontend, dan konsep software development.
            </p>
          </div>

          <div className="py-8 md:pl-8">
            <span className="text-sm font-semibold text-[#FF5C35]">
              03
            </span>

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

              <h2
                className="
                  font-[var(--font-space-grotesk)]
                  text-4xl
                  font-bold
                  leading-[0.95]
                  tracking-[-0.06em]
                  md:text-6xl
                "
              >
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
                className="
                  group
                  grid
                  gap-8
                  border-t
                  border-[#111111]/20
                  py-10
                  transition-all
                  duration-300
                  hover:bg-[#F5F3EE]
                  md:grid-cols-[80px_1fr_1fr]
                  md:px-5
                "
              >
                <span
                  className="
                    text-sm
                    font-semibold
                    text-[#FF5C35]
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                >
                  {project.number}
                </span>

                <div>
                  <h3
                    className="
                      font-[var(--font-space-grotesk)]
                      text-3xl
                      font-bold
                      tracking-[-0.05em]
                      transition-colors
                      duration-200
                      group-hover:text-[#FF5C35]
                      md:text-4xl
                    "
                  >
                    {project.title}
                  </h3>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="
                          rounded-full
                          border
                          border-[#111111]/15
                          px-3
                          py-1
                          text-xs
                          font-medium
                          transition-all
                          duration-200
                          group-hover:border-[#111111]/25
                        "
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

                  <span
                    className="
                      text-sm
                      font-semibold
                      opacity-0
                      transition-all
                      duration-300
                      group-hover:translate-x-1
                      group-hover:opacity-100
                    "
                  >
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

            <h2
              className="
                mt-4
                font-[var(--font-space-grotesk)]
                text-4xl
                font-bold
                tracking-[-0.06em]
                md:text-5xl
              "
            >
              Tools I use.
            </h2>
          </div>

          <div className="flex content-start flex-wrap gap-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="
                  border
                  border-[#111111]/20
                  px-5
                  py-3
                  text-base
                  font-medium
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:border-[#FF5C35]
                  hover:bg-[#FF5C35]
                  hover:text-white
                  md:text-lg
                "
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
            <h2
              className="
                max-w-4xl
                font-[var(--font-space-grotesk)]
                text-5xl
                font-bold
                leading-[0.9]
                tracking-[-0.07em]
                md:text-7xl
              "
            >
              Let&apos;s connect
              <br />
              and build something.
            </h2>

            <div className="flex min-w-[240px] flex-col gap-4 text-lg font-medium">
              <a
                href="mailto:albarfahrezi7@gmail.com"
                className="
                  border-b
                  border-[#111111]
                  pb-2
                  transition-opacity
                  hover:opacity-60
                "
              >
                albarfahrezi7@gmail.com
              </a>

              <a
                href="https://github.com/AlbarFahrezi"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  border-b
                  border-[#111111]
                  pb-2
                  transition-opacity
                  hover:opacity-60
                "
              >
                GitHub ↗
              </a>

              <a
                href="https://www.linkedin.com/in/albar-fahrezi-65b30a395/"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  border-b
                  border-[#111111]
                  pb-2
                  transition-opacity
                  hover:opacity-60
                "
              >
                LinkedIn ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}

      <footer className="bg-[#111111] px-6 py-8 text-white lg:px-10">
        <div
          className="
            mx-auto
            flex
            max-w-7xl
            flex-col
            justify-between
            gap-4
            text-sm
            text-white/50
            sm:flex-row
          "
        >
          <span>© 2026 Albar. All rights reserved.</span>

          <span>Built with Next.js &amp; Tailwind CSS</span>
        </div>
      </footer>
    </main>
  );
}