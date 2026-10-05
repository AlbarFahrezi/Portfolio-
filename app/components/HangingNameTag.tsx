"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { useLanguage } from "./LanguageProvider";

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

/* Decorative barcode */
const BARCODE =
  "repeating-linear-gradient(90deg,currentColor 0 2px,transparent 2px 4px,currentColor 4px 5px,transparent 5px 8px,currentColor 8px 11px,transparent 11px 13px,currentColor 13px 14px,transparent 14px 17px)";

export default function HangingNameTag() {
  const { language } = useLanguage();
  const isID = language === "id";

  const [motion, setMotion] = useState({ x: 0, y: -170, rotate: 0 });
  const [hover, setHover] = useState({ x: 0, y: 0 });
  const [flipped, setFlipped] = useState(false);
  const [dragging, setDragging] = useState(false);

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
    moved: 0,
  });

  const animationRef = useRef<number | null>(null);

  const stopAnimation = () => {
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  };

  const updateVisual = () => {
    const c = motionRef.current;
    setMotion({ x: c.x, y: c.y, rotate: c.rotate });
  };

  /* ---------------- SPRING ---------------- */

  const startSpring = () => {
    stopAnimation();

    const animate = () => {
      const c = motionRef.current;

      c.vx += -c.x * 0.035;
      c.vy += -c.y * 0.045;
      c.vx *= 0.92;
      c.vy *= 0.91;
      c.x += c.vx;
      c.y += c.vy;

      const targetRotate = c.x * -0.085 + c.vx * -2.8 + c.vy * 0.15;
      c.vr += (targetRotate - c.rotate) * 0.055;
      c.vr *= 0.88;
      c.rotate += c.vr;

      updateVisual();

      const moving =
        Math.abs(c.x) > 0.15 ||
        Math.abs(c.y) > 0.15 ||
        Math.abs(c.vx) > 0.08 ||
        Math.abs(c.vy) > 0.08 ||
        Math.abs(c.rotate) > 0.08 ||
        Math.abs(c.vr) > 0.08;

      if (moving) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        c.x = c.y = c.rotate = c.vx = c.vy = c.vr = 0;
        updateVisual();
        animationRef.current = null;
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    let timer = 0;

    // Tunggu intro loader selesai sebelum name tag jatuh
    const begin = () => {
      if (document.querySelector(".intro-overlay")) {
        timer = window.setTimeout(begin, 120);
      } else {
        timer = window.setTimeout(startSpring, 180);
      }
    };
    begin();

    return () => {
      window.clearTimeout(timer);
      stopAnimation();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------------- POINTER ---------------- */

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;

    stopAnimation();
    const c = motionRef.current;

    dragRef.current = {
      active: true,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: c.x,
      originY: c.y,
      moved: 0,
    };

    c.vx = c.vy = c.vr = 0;
    c.lastX = event.clientX;
    c.lastY = event.clientY;
    c.lastTime = performance.now();

    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    /* Hover tilt + sheen (aktif juga tanpa drag) */
    const rect = event.currentTarget.getBoundingClientRect();
    setHover({
      x: clamp((event.clientX - rect.left) / rect.width - 0.5, -0.5, 0.5),
      y: clamp((event.clientY - rect.top) / rect.height - 0.5, -0.5, 0.5),
    });

    const drag = dragRef.current;
    if (!drag.active || drag.pointerId !== event.pointerId) return;

    const c = motionRef.current;
    const now = performance.now();
    const dt = clamp(now - c.lastTime, 8, 40);

    const deltaX = event.clientX - drag.startX;
    const deltaY = event.clientY - drag.startY;
    drag.moved = Math.max(drag.moved, Math.hypot(deltaX, deltaY));

    const nextX = clamp(drag.originX + deltaX, -150, 150);
    const nextY = clamp(drag.originY + deltaY, 0, 330);

    c.vx = c.vx * 0.35 + ((event.clientX - c.lastX) / dt) * 16 * 0.65;
    c.vy = c.vy * 0.35 + ((event.clientY - c.lastY) / dt) * 16 * 0.65;

    c.x = nextX;
    c.y = nextY;
    c.lastX = event.clientX;
    c.lastY = event.clientY;
    c.lastTime = now;

    c.rotate = clamp(nextX * -0.1 + c.vx * -2.4 + c.vy * 0.1, -30, 30);

    updateVisual();
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag.active || drag.pointerId !== event.pointerId) return;

    const wasClick = drag.moved < 6;

    drag.active = false;
    drag.pointerId = -1;
    setDragging(false);

    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      // Pointer capture sudah dilepas browser.
    }

    if (wasClick) setFlipped((f) => !f);

    startSpring();
  };

  /* ---------------- GEOMETRY ---------------- */

  const anchorX = 210;
  const cardTop = 128 + motion.y;
  const ringX = anchorX + motion.x;
  const ringY = cardTop;

  const dx = ringX - anchorX;
  const dy = ringY;
  const { vx, vy } = motionRef.current;

  const sway = clamp(vx * -1.7 + vy * 0.1, -35, 35);
  const curve = Math.min(42, Math.abs(dx) * 0.16) + Math.min(15, Math.abs(vx) * 0.45);
  const dir = dx >= 0 ? 1 : -1;

  const strap = (ax: number, ex: number) => {
    const sdx = ex - ax;
    return `M ${ax} 0 C ${ax + sdx * 0.28 + sway + curve * dir} ${dy * 0.28}, ${
      ex - sdx * 0.28 + sway * 0.5 + curve * dir
    } ${ringY - dy * 0.28}, ${ex} ${ringY + 6}`;
  };

  const leftStrap = strap(anchorX - 44, ringX - 7);
  const rightStrap = strap(anchorX + 44, ringX + 7);

  /* 3D tilt: hover + ayunan dari kecepatan */
  const swingY = clamp(vx * 2.2, -28, 28);
  const swingX = clamp(-vy * 1.2, -15, 15);
  const rotX = -hover.y * 16 + swingX;
  const rotY = hover.x * 20 + swingY;

  const sheen = {
    "--mx": `${(hover.x + 0.5) * 100}%`,
    "--my": `${(hover.y + 0.5) * 100}%`,
  } as CSSProperties;

  const face: CSSProperties = {
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    transformStyle: "preserve-3d",
  };

  const edge = `${-motion.rotate * 1.4}px 34px 60px rgba(0,0,0,0.22)`;

  return (
    <div className="pointer-events-none absolute right-0 top-0 hidden h-[620px] w-[420px] lg:block">
      {/* Bracket / mount */}
      <div className="absolute left-1/2 top-0 z-40 h-[22px] w-[124px] -translate-x-1/2 rounded-b-[14px] bg-gradient-to-b from-[#1a1a1a] to-[#0b0b0b] shadow-[0_8px_18px_rgba(0,0,0,0.2)]">
        <span className="absolute left-4 top-[7px] h-1.5 w-1.5 rounded-full bg-[#333]" />
        <span className="absolute right-4 top-[7px] h-1.5 w-1.5 rounded-full bg-[#333]" />
        <span className="absolute left-1/2 top-[9px] h-[3px] w-6 -translate-x-1/2 rounded-full bg-[#FF5C35]" />
      </div>

      {/* Straps */}
      <svg
        className="pointer-events-none absolute inset-0 z-10 h-full w-full overflow-visible"
        viewBox="0 0 420 620"
        preserveAspectRatio="none"
      >
        <defs>
          <path id="strapL" d={leftStrap} />
          <path id="strapR" d={rightStrap} />
        </defs>

        {[leftStrap, rightStrap].map((d, i) => (
          <g key={i}>
            <path d={d} fill="none" stroke="rgba(0,0,0,0.18)" strokeWidth="21" strokeLinecap="butt" transform="translate(3 4)" />
            <path d={d} fill="none" stroke="#0E0E0E" strokeWidth="18" />
            <path d={d} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="18" strokeDasharray="1.2 2.4" />
            <path d={d} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" transform="translate(-7 0)" />
            <path d={d} fill="none" stroke="rgba(0,0,0,0.6)" strokeWidth="1" transform="translate(7 0)" />
          </g>
        ))}

        <text fontSize="8" fontWeight="700" letterSpacing="2.2" fill="#FF5C35" dy="2.8" fontFamily="var(--font-space-grotesk), sans-serif">
          <textPath href="#strapL" startOffset="6">
            ALBAR FAHREZI · FULLSTACK DEVELOPER · PKL 2026 · ALBAR FAHREZI · FULLSTACK DEVELOPER · PKL 2026
          </textPath>
        </text>

        <text fontSize="8" fontWeight="700" letterSpacing="2.2" fill="rgba(255,255,255,0.55)" dy="2.8" fontFamily="var(--font-space-grotesk), sans-serif">
          <textPath href="#strapR" startOffset="6">
            LARAVEL · REACT · NEXT.JS · MYSQL · LARAVEL · REACT · NEXT.JS · MYSQL · LARAVEL · REACT
          </textPath>
        </text>
      </svg>

      {/* Swinging badge */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={() => !dragRef.current.active && setHover({ x: 0, y: 0 })}
        style={{
          left: "50%",
          top: "128px",
          transform: `translate3d(calc(-50% + ${motion.x}px), ${motion.y}px, 0) rotate(${motion.rotate}deg)`,
          transformOrigin: "50% 0%",
        }}
        className="pointer-events-auto absolute z-30 w-[290px] cursor-grab touch-none select-none active:cursor-grabbing"
      >
        {/* Metal clip */}
        <svg
          className="pointer-events-none absolute left-1/2 top-[-8px] z-40 h-[84px] w-[48px] -translate-x-1/2 overflow-visible drop-shadow-[0_5px_6px_rgba(0,0,0,0.3)]"
          viewBox="0 0 48 84"
        >
          <defs>
            <linearGradient id="metal" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#F7F7F7" />
              <stop offset="0.45" stopColor="#B8B8B8" />
              <stop offset="1" stopColor="#767676" />
            </linearGradient>
          </defs>
          <rect x="9" y="0" width="30" height="24" rx="5" fill="url(#metal)" stroke="#6f6f6f" strokeWidth="1" />
          <line x1="9" y1="9" x2="39" y2="9" stroke="rgba(0,0,0,0.25)" />
          <line x1="9" y1="15" x2="39" y2="15" stroke="rgba(0,0,0,0.25)" />
          <circle cx="24" cy="31" r="6" fill="none" stroke="url(#metal)" strokeWidth="3.5" />
          <rect x="14" y="36" width="20" height="40" rx="10" fill="none" stroke="url(#metal)" strokeWidth="4" />
        </svg>

        {/* 3D scene */}
        <div className="relative mt-[44px] h-[430px] w-[290px]" style={{ perspective: "1100px" }}>
          <div
            className="relative h-full w-full"
            style={{
              ...sheen,
              transformStyle: "preserve-3d",
              transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
              transition: dragging ? "none" : "transform 140ms ease-out",
            }}
          >
            <div
              className="relative h-full w-full"
              style={{
                transformStyle: "preserve-3d",
                transform: `rotateY(${flipped ? 180 : 0}deg)`,
                transition: "transform 800ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              {/* Ketebalan kartu */}
              <div className="absolute inset-0 rounded-[18px] bg-[#C9C4B8]" style={{ transform: "translateZ(-2px)" }} />
              <div className="absolute inset-0 rounded-[18px] bg-[#A9A498]" style={{ transform: "translateZ(-5px)", boxShadow: edge }} />

              {/* ================= FRONT ================= */}
              <div
                className="absolute inset-0 rounded-[18px] border border-[#111111]/10 bg-gradient-to-br from-white via-[#FAF8F3] to-[#ECE8DF]"
                style={face}
              >
                <div className="absolute left-1/2 top-4 h-2.5 w-14 -translate-x-1/2 rounded-full bg-[#D6D1C5] shadow-[inset_0_2px_3px_rgba(0,0,0,0.25)]" />

                <div className="absolute inset-x-5 top-[34px] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#FF5C35]" />
                    <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#6B6B6B]">
                      Personal ID
                    </span>
                  </div>
                  <span className="flex items-center gap-1 font-mono text-[9px] text-[#6B6B6B]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#28C840]" />
                    ACTIVE
                  </span>
                </div>

                <div
                  className="absolute left-4 right-4 top-[62px] h-[232px] overflow-hidden rounded-xl bg-[#DDD9D0] shadow-[0_10px_24px_rgba(0,0,0,0.18)]"
                  style={{ transform: "translateZ(22px)" }}
                >
                  <Image
                    src="/images/profile.jpg"
                    alt="Albar Fahrezi"
                    fill
                    sizes="290px"
                    priority
                    draggable={false}
                    className="pointer-events-none object-cover object-[45%_30%]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 rounded-full border border-white/30 bg-black/25 px-2 py-1 font-mono text-[8px] text-white backdrop-blur-sm">
                    PKL / 26
                  </span>
                </div>

                <div
                  className="absolute inset-x-5 bottom-[62px]"
                  style={{ transform: "translateZ(34px)" }}
                >
                  <p className="font-[var(--font-space-grotesk)] text-[24px] font-bold leading-none tracking-[-0.05em] text-[#111111]">
                    Albar Fahrezi
                  </p>
                  <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF5C35]">
                    Fullstack Developer
                  </p>
                </div>

                <div className="absolute inset-x-5 bottom-4 flex items-end justify-between">
                  <div
                    className="h-7 w-[118px] text-[#111111]/80"
                    style={{ backgroundImage: BARCODE }}
                  />
                  <div
                    className="flex h-7 w-[74px] items-center justify-center rounded-md text-[8px] font-bold uppercase tracking-[0.15em] text-[#111111]/70"
                    style={{
                      backgroundImage:
                        "linear-gradient(115deg,#ff9a76,#ffd166,#7bdff2,#b794f6,#ff9a76)",
                      backgroundSize: "300% 100%",
                      backgroundPosition: "var(--mx) 50%",
                    }}
                  >
                    {isID ? "Klik: balik" : "Click: flip"}
                  </div>
                </div>

                {/* Kilau mengikuti kursor */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-[18px] mix-blend-soft-light"
                  style={{
                    background:
                      "radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,0.95), rgba(255,255,255,0) 55%)",
                    transform: "translateZ(40px)",
                  }}
                />
              </div>

              {/* ================= BACK ================= */}
              <div
                className="absolute inset-0 rounded-[18px] border border-white/10 bg-gradient-to-br from-[#1b1b1b] to-[#0b0b0b] text-white"
                style={{ ...face, transform: "rotateY(180deg)" }}
              >
                <div className="absolute left-1/2 top-4 h-2.5 w-14 -translate-x-1/2 rounded-full bg-black shadow-[inset_0_2px_3px_rgba(255,255,255,0.12)]" />

                <div className="absolute inset-x-6 top-[38px]">
                  <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#FF5C35]">
                    {isID ? "Kontak" : "Contact"}
                  </span>
                  <p className="mt-5 font-[var(--font-space-grotesk)] text-[30px] font-bold leading-[1] tracking-[-0.06em]">
                    {isID ? (
                      <>
                        Mari buat
                        <br />
                        sesuatu<span className="text-[#FF5C35]">.</span>
                      </>
                    ) : (
                      <>
                        Let&apos;s build
                        <br />
                        something<span className="text-[#FF5C35]">.</span>
                      </>
                    )}
                  </p>
                </div>

                <div className="absolute inset-x-6 bottom-[70px] space-y-3 font-mono text-[11px] text-white/70">
                  <p className="border-b border-white/15 pb-2">albarfahrezi7@gmail.com</p>
                  <p className="border-b border-white/15 pb-2">github.com/AlbarFahrezi</p>
                  <p className="border-b border-white/15 pb-2">linkedin.com/in/albar-fahrezi</p>
                </div>

                <div className="absolute inset-x-6 bottom-5 flex items-end justify-between">
                  <div className="h-6 w-[110px] text-white/70" style={{ backgroundImage: BARCODE }} />
                  <span className="font-mono text-[9px] text-white/40">2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-24 right-8 h-20 w-px overflow-hidden bg-[#111111]/10">
        <div className="animate-line-move h-full w-full bg-[#FF5C35]" />
      </div>
    </div>
  );
}