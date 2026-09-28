"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";

const projects = [
  {
    number: "01",
    title: "Authentication API",
    slug: "/projects/authentication-api",
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
];

const navItems = [
  { id: "about", idLabel: "Tentang", enLabel: "About" },
  { id: "journey", idLabel: "Perjalanan", enLabel: "Journey" },
  { id: "projects", idLabel: "Project", enLabel: "Projects" },
  { id: "skills", idLabel: "Skill", enLabel: "Skills" },
  { id: "contact", idLabel: "Kontak", enLabel: "Contact" },
];

/* =========================================================
   SCROLL REVEAL COMPONENT
========================================================= */

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "up" | "left" | "right" | "scale";
  delay?: number;
};

function Reveal({
  children,
  className = "",
  variant = "up",
  delay = 0,
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -60px 0px",
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  const variantClass = {
    up: "reveal",
    left: "reveal-left",
    right: "reveal-right",
    scale: "reveal-scale",
  }[variant];

  const style = {
    "--reveal-delay": `${delay}ms`,
  } as CSSProperties;

  return (
    <div
      ref={ref}
      style={style}
      className={`${variantClass} ${
        visible ? "is-visible" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* =========================================================
   HANGING NAME TAG / LANYARD
========================================================= */

function HangingNameTag() {
  const [motion, setMotion] = useState({
    x: 0,
    y: -170,
    rotate: 0,
  });

  const motionRef = useRef({
    x: 0,
    y: -170,
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
     SPRING
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
        animationRef.current =
          requestAnimationFrame(animate);
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
     INITIAL DROP ANIMATION
  ======================================================= */

  useEffect(() => {
    const timer = window.setTimeout(() => {
      startSpring();
    }, 180);

    return () => {
      window.clearTimeout(timer);

      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

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

    event.currentTarget.setPointerCapture(
      event.pointerId,
    );
  };

  /* =======================================================
     POINTER MOVE
  ======================================================= */

  const handlePointerMove = (
    event: ReactPointerEvent<HTMLDivElement>,
  ) => {
    const drag = dragRef.current;

    if (
      !drag.active ||
      drag.pointerId !== event.pointerId
    ) {
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
      Math.min(330, drag.originY + deltaY),
    );

    const pointerVelocityX =
      ((event.clientX - current.lastX) /
        deltaTime) *
      16;

    const pointerVelocityY =
      ((event.clientY - current.lastY) /
        deltaTime) *
      16;

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

    if (
      !drag.active ||
      drag.pointerId !== event.pointerId
    ) {
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
     LANYARD GEOMETRY
  ======================================================= */

  const anchorX = 210;
  const anchorY = 0;

  const cardTop = 128 + motion.y;
  const ringX = anchorX + motion.x;
  const ringY = cardTop;

  const dx = ringX - anchorX;
  const dy = ringY - anchorY;

  const velocitySway =
    motionRef.current.vx * -1.7 +
    motionRef.current.vy * 0.1;

  const clampedSway = Math.max(
    -35,
    Math.min(35, velocitySway),
  );

  const curve =
    Math.min(42, Math.abs(dx) * 0.16) +
    Math.min(
      15,
      Math.abs(motionRef.current.vx) * 0.45,
    );

  const direction = dx >= 0 ? 1 : -1;

  const control1X =
    anchorX +
    dx * 0.28 +
    clampedSway +
    curve * direction;

  const control1Y =
    anchorY +
    dy * 0.28;

  const control2X =
    ringX -
    dx * 0.28 +
    clampedSway * 0.5 +
    curve * direction;

  const control2Y =
    ringY -
    dy * 0.28;

  const ropePath = `
    M ${anchorX} ${anchorY}
    C
      ${control1X} ${control1Y},
      ${control2X} ${control2Y},
      ${ringX} ${ringY}
  `;

  const ropeHighlightPath = `
    M ${anchorX - 1} ${anchorY}
    C
      ${control1X - 1} ${control1Y},
      ${control2X - 1} ${control2Y},
      ${ringX - 1} ${ringY}
  `;

  return (
    <div
      className="
        pointer-events-none
        absolute
        right-0
        top-0
        hidden
        h-[620px]
        w-[420px]
        lg:block
      "
    >
      <div
        className="
          absolute
          left-1/2
          top-0
          z-40
          h-[48px]
          w-[22px]
          -translate-x-1/2
          rounded-b-[12px]
          bg-[#111111]
          shadow-[0_8px_18px_rgba(0,0,0,0.16)]
        "
      >
        <div
          className="
            absolute
            left-1/2
            top-0
            h-full
            w-[4px]
            -translate-x-1/2
            bg-white/10
          "
        />
      </div>

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
        viewBox="0 0 420 620"
        preserveAspectRatio="none"
      >
        <path
          d={ropePath}
          fill="none"
          stroke="rgba(0,0,0,0.16)"
          strokeWidth="11"
          strokeLinecap="round"
        />

        <path
          d={ropePath}
          fill="none"
          stroke="#111111"
          strokeWidth="8"
          strokeLinecap="round"
        />

        <path
          d={ropeHighlightPath}
          fill="none"
          stroke="rgba(255,255,255,0.16)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>

      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{
          left: "50%",
          top: "128px",
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
          z-30
          w-[290px]
          select-none
          touch-none
          cursor-grab
          active:cursor-grabbing
        "
      >
        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-[-19px]
            z-40
            flex
            h-[42px]
            w-[42px]
            -translate-x-1/2
            items-center
            justify-center
            rounded-full
            border-[5px]
            border-[#A9A9A9]
            bg-[#F5F3EE]
            shadow-[0_5px_10px_rgba(0,0,0,0.2)]
          "
        >
          <div
            className="
              h-[14px]
              w-[14px]
              rounded-full
              border-[3px]
              border-[#777777]
              bg-[#F5F3EE]
            "
          />
        </div>

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-[8px]
            z-30
            h-[34px]
            w-[56px]
            -translate-x-1/2
            rounded-b-[10px]
            border-2
            border-[#999999]
            bg-gradient-to-b
            from-[#D8D8D8]
            via-[#B5B5B5]
            to-[#858585]
            shadow-[0_6px_10px_rgba(0,0,0,0.2)]
          "
        />

        <div
          className="
            mt-7
            overflow-hidden
            rounded-[18px]
            border
            border-[#111111]/15
            bg-white
            shadow-[0_28px_70px_rgba(0,0,0,0.17)]
          "
        >
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
                  tracking-[0.22em]
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
                  object-[45%_50%]
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/35
                  via-transparent
                  to-transparent
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
                  PKL / 26
                </span>

                <span
                  className="
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-white/80
                  "
                >
                  Developer
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

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
  const [language, setLanguage] = useState<"id" | "en">("en");

  const isID = language === "id";

  return (
    <main className="min-h-screen overflow-hidden bg-[#F5F3EE] text-[#111111]">
      {/* ==================================================
          NAVBAR
      ================================================== */}

      <nav
        className="
          sticky
          top-0
          z-50
          border-b
          border-[#111111]/10
          bg-[#F5F3EE]/95
          backdrop-blur-xl
        "
      >
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
              ALBAR<span className="text-[#FF5C35]">.</span>
            </Link>

            <div className="hidden items-center gap-8 md:flex">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="
                    text-sm
                    font-medium
                    transition-colors
                    hover:text-[#FF5C35]
                  "
                >
                  {isID ? item.idLabel : item.enLabel}
                </a>
              ))}
            </div>

            <div className="hidden items-center gap-2 md:flex">
              <div
                className="
                  flex
                  items-center
                  rounded-full
                  border
                  border-[#111111]/15
                  bg-white/40
                  p-1
                "
              >
                <button
                  type="button"
                  onClick={() => setLanguage("id")}
                  className={`
                    rounded-full
                    px-3
                    py-1.5
                    text-xs
                    font-semibold
                    transition-all
                    duration-200
                    ${
                      isID
                        ? "bg-[#111111] text-white"
                        : "text-[#777777] hover:text-[#111111]"
                    }
                  `}
                >
                  ID
                </button>

                <button
                  type="button"
                  onClick={() => setLanguage("en")}
                  className={`
                    rounded-full
                    px-3
                    py-1.5
                    text-xs
                    font-semibold
                    transition-all
                    duration-200
                    ${
                      !isID
                        ? "bg-[#111111] text-white"
                        : "text-[#777777] hover:text-[#111111]"
                    }
                  `}
                >
                  EN
                </button>
              </div>
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
              {isID ? "Lihat Project" : "View Work"}
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
            <div
              className="
                animate-fade-in
                border-t
                border-[#111111]/10
                py-5
                md:hidden
              "
            >
              <div className="flex flex-col">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
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
                    {isID ? item.idLabel : item.enLabel}
                  </a>
                ))}

                <div className="mt-5 flex items-center justify-between gap-3">
                  <div
                    className="
                      flex
                      rounded-full
                      border
                      border-[#111111]/15
                      p-1
                    "
                  >
                    <button
                      type="button"
                      onClick={() => setLanguage("id")}
                      className={`
                        rounded-full
                        px-4
                        py-2
                        text-xs
                        font-semibold
                        ${
                          isID
                            ? "bg-[#111111] text-white"
                            : "text-[#777777]"
                        }
                      `}
                    >
                      ID
                    </button>

                    <button
                      type="button"
                      onClick={() => setLanguage("en")}
                      className={`
                        rounded-full
                        px-4
                        py-2
                        text-xs
                        font-semibold
                        ${
                          !isID
                            ? "bg-[#111111] text-white"
                            : "text-[#777777]"
                        }
                      `}
                    >
                      EN
                    </button>
                  </div>

                  <a
                    href="#projects"
                    onClick={() => setMenuOpen(false)}
                    className="
                      inline-flex
                      flex-1
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

          {isID
            ? "Personal Portfolio · Perjalanan PKL"
            : "Personal Portfolio · PKL Journey"}
        </div>

        <div
          className="
            grid
            gap-16
            lg:grid-cols-[1.25fr_0.75fr]
            lg:items-start
          "
        >
          <div className="animate-fade-up">
            <p className="mb-5 text-base text-[#6B6B6B] md:text-lg">
              {isID ? "Halo, saya" : "Hello, I'm"}
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
                {isID
                  ? "yang suka membangun sesuatu."
                  : "who loves building things."}
              </span>
            </h2>
          </div>

          <div
            className="
              animate-fade-up-delay
              flex
              flex-col
              items-end
              lg:pt-8
            "
          >
            <div className="h-[600px] w-full" />

            <div className="mt-8 w-full max-w-md">
              <p
                className="
                  text-base
                  leading-7
                  text-[#6B6B6B]
                  md:text-lg
                  md:leading-8
                "
              >
                {isID
                  ? "Kumpulan perjalanan PKL, project, eksperimen, dan hal-hal yang saya pelajari selama membangun software."
                  : "A personal collection of my internship journey, projects, experiments, and things I learned while building software."}
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
                {isID
                  ? "Lihat project saya"
                  : "Explore my projects"}

                <span className="text-[#FF5C35]">↗</span>
              </a>
            </div>
          </div>
        </div>

        <HangingNameTag />

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
            <span>
              {isID
                ? "Berbasis di Indonesia"
                : "Based in Indonesia"}
            </span>

            <span>2026 — PKL Portfolio</span>

            <span>
              {isID
                ? "Scroll untuk melihat ↓"
                : "Scroll to explore ↓"}
            </span>
          </div>
        </div>
      </section>

      {/* ==================================================
          ABOUT
      ================================================== */}

      <section
        id="about"
        className="
          border-t
          border-[#111111]/10
          bg-[#111111]
          text-white
        "
      >
        <div
          className="
            mx-auto
            max-w-7xl
            px-6
            py-24
            lg:px-10
            lg:py-32
          "
        >
          <div className="grid gap-12 lg:grid-cols-[0.35fr_0.65fr]">
            <Reveal variant="left">
              <div>
                <p
                  className="
                    text-xs
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                    text-[#FF5C35]
                    md:text-sm
                  "
                >
                  01 — {isID ? "Tentang" : "About"}
                </p>
              </div>
            </Reveal>

            <Reveal variant="right" delay={120}>
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
                  {isID ? (
                    <>
                      Belajar melalui{" "}
                      <span className="text-[#FF5C35]">
                        membangun
                      </span>{" "}
                      project nyata.
                    </>
                  ) : (
                    <>
                      Learning by{" "}
                      <span className="text-[#FF5C35]">
                        building
                      </span>{" "}
                      real projects.
                    </>
                  )}
                </h2>

                <p
                  className="
                    mt-8
                    max-w-2xl
                    text-base
                    leading-8
                    text-white/60
                    md:text-lg
                  "
                >
                  {isID
                    ? "Selama kegiatan PKL, saya belajar mengubah konsep menjadi aplikasi yang benar-benar bisa digunakan. Dari authentication, database, REST API, sampai sistem inventory dan workflow."
                    : "During my internship, I learned how to turn concepts into applications that can actually be used. From authentication and databases to REST APIs, inventory systems, and workflows."}
                </p>
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
        className="
          mx-auto
          max-w-7xl
          px-6
          py-24
          lg:px-10
          lg:py-32
        "
      >
        <Reveal>
          <div
            className="
              mb-16
              flex
              flex-col
              justify-between
              gap-8
              md:flex-row
              md:items-end
            "
          >
            <div>
              <p
                className="
                  mb-4
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-[#FF5C35]
                  md:text-sm
                "
              >
                02 — {isID ? "Perjalanan" : "Journey"}
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

        <div className="grid border-t border-[#111111]/20 md:grid-cols-3">
          <Reveal delay={0}>
            <div
              className="
                border-b
                border-[#111111]/20
                py-8
                md:border-b-0
                md:border-r
                md:pr-8
              "
            >
              <span className="text-sm font-semibold text-[#FF5C35]">
                01
              </span>

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
            <div
              className="
                border-b
                border-[#111111]/20
                py-8
                md:border-b-0
                md:border-r
                md:px-8
              "
            >
              <span className="text-sm font-semibold text-[#FF5C35]">
                02
              </span>

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
              <span className="text-sm font-semibold text-[#FF5C35]">
                03
              </span>

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
        </div>
      </section>

      {/* ==================================================
          PROJECTS
      ================================================== */}

      <section
        id="projects"
        className="border-t border-[#111111]/10 bg-white"
      >
        <div
          className="
            mx-auto
            max-w-7xl
            px-6
            py-24
            lg:px-10
            lg:py-32
          "
        >
          <Reveal>
            <div
              className="
                mb-16
                flex
                flex-col
                justify-between
                gap-8
                md:flex-row
                md:items-end
              "
            >
              <div>
                <p
                  className="
                    mb-4
                    text-xs
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                    text-[#FF5C35]
                    md:text-sm
                  "
                >
                  03 —{" "}
                  {isID ? "Project Pilihan" : "Selected Projects"}
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
                  {isID ? (
                    <>
                      Hal yang
                      <br />
                      <span className="text-[#6B6B6B]">
                        saya bangun.
                      </span>
                    </>
                  ) : (
                    <>
                      Things I&apos;ve
                      <br />
                      <span className="text-[#6B6B6B]">
                        built.
                      </span>
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

          <div className="grid gap-0">
            {projects.map((project, index) => (
              <Reveal
                key={project.number}
                delay={index * 120}
                variant="up"
              >
                <Link
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
                      {isID
                        ? project.description.id
                        : project.description.en}
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
                      {isID
                        ? "Lihat project ↗"
                        : "View project ↗"}
                    </span>
                  </div>
                </Link>
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
        className="
          mx-auto
          max-w-7xl
          px-6
          py-24
          lg:px-10
          lg:py-32
        "
      >
        <div className="grid gap-12 lg:grid-cols-[0.35fr_0.65fr]">
          <Reveal variant="left">
            <div>
              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-[#FF5C35]
                  md:text-sm
                "
              >
                04 — {isID ? "Skill" : "Skills"}
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
                {isID
                  ? "Tools yang saya gunakan."
                  : "Tools I use."}
              </h2>
            </div>
          </Reveal>

          <Reveal variant="right" delay={120}>
            <div className="flex content-start flex-wrap gap-3">
              {skills.map((skill, index) => (
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
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
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
        className="
          border-t
          border-[#111111]/10
          bg-[#FF5C35]
          text-[#111111]
        "
      >
        <div
          className="
            mx-auto
            max-w-7xl
            px-6
            py-24
            lg:px-10
            lg:py-32
          "
        >
          <Reveal variant="left">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] md:text-sm">
              05 — {isID ? "Kontak" : "Contact"}
            </p>
          </Reveal>

          <div
            className="
              mt-10
              flex
              flex-col
              justify-between
              gap-12
              lg:flex-row
              lg:items-end
            "
          >
            <Reveal variant="left" delay={100}>
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

            <Reveal variant="right" delay={220}>
              <div
                className="
                  flex
                  min-w-[240px]
                  flex-col
                  gap-4
                  text-lg
                  font-medium
                "
              >
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
            </Reveal>
          </div>
        </div>
      </section>

      {/* ==================================================
          FOOTER
      ================================================== */}

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
          <span>
            © 2026 Albar.{" "}
            {isID
              ? "Semua hak dilindungi."
              : "All rights reserved."}
          </span>

          <span>
            Built with Next.js &amp; Tailwind CSS
          </span>
        </div>
      </footer>
    </main>
  );
}