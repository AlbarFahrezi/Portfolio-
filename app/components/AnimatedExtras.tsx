"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from "react";

/* =========================================================
   1. SCROLL PROGRESS BAR
   Garis oranye tipis di atas halaman, mengikuti scroll.
========================================================= */

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const progress = max > 0 ? doc.scrollTop / max : 0;

      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`;
      }
      frame = 0;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]">
      <div
        ref={barRef}
        className="h-full origin-left bg-[#FF5C35]"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}

/* =========================================================
   2. TYPEWRITER
   Teks yang mengetik dan menghapus bergantian.
========================================================= */

type TypewriterProps = {
  words: string[];
  className?: string;
};

export function Typewriter({ words, className = "" }: TypewriterProps) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  // Reset saat bahasa berganti (array words berubah)
  const wordsKey = words.join("|");
  useEffect(() => {
    setIndex(0);
    setText("");
    setDeleting(false);
  }, [wordsKey]);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      setText(words[0] ?? "");
      return;
    }

    const current = words[index % words.length] ?? "";
    let delay = deleting ? 35 : 75;

    if (!deleting && text === current) delay = 1600;
    if (deleting && text === "") delay = 350;

    const timer = window.setTimeout(() => {
      if (!deleting && text === current) {
        setDeleting(true);
      } else if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      } else {
        setText(
          deleting
            ? current.slice(0, text.length - 1)
            : current.slice(0, text.length + 1),
        );
      }
    }, delay);

    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, deleting, index, wordsKey]);

  return (
    <span className={className} aria-label={words.join(", ")}>
      {text}
      <span className="animate-caret ml-1 inline-block h-[0.9em] w-[3px] translate-y-[0.1em] bg-[#FF5C35]" />
    </span>
  );
}

/* =========================================================
   3. COUNT UP
   Angka naik dari 0 saat masuk viewport.
========================================================= */

type CountUpProps = {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
};

export function CountUp({
  to,
  suffix = "",
  duration = 1400,
  className = "",
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      setValue(to);
      return;
    }

    let frame = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();

        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 4); // easeOutQuart
          setValue(Math.round(to * eased));
          if (t < 1) frame = requestAnimationFrame(tick);
        };

        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [to, duration]);

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
}

/* =========================================================
   4. MARQUEE
   Pita teks berjalan tanpa henti, berhenti saat di-hover.
========================================================= */

type MarqueeProps = {
  items: string[];
  reverse?: boolean;
};

export function Marquee({ items, reverse = false }: MarqueeProps) {
  const row = (hidden: boolean) => (
    <div
      className="flex shrink-0 items-center"
      aria-hidden={hidden || undefined}
    >
      {items.map((item) => (
        <span
          key={`${hidden}-${item}`}
          className="flex items-center font-[var(--font-space-grotesk)] text-4xl font-bold tracking-[-0.05em] md:text-6xl"
        >
          <span className="px-6 md:px-10">{item}</span>
          <span className="text-[#FF5C35]">✦</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee overflow-hidden border-y border-[#111111]/20 py-6">
      <div
        className={`marquee-track flex w-max ${
          reverse ? "marquee-reverse" : ""
        }`}
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

/* =========================================================
   5. ACTIVE SECTION
   Hook untuk menandai menu navbar sesuai section yang tampil.
========================================================= */

export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>("");
  const idsKey = ids.join("|");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idsKey]);

  return active;
}

/* =========================================================
   6. BACK TO TOP
   Tombol muncul setelah scroll, klik untuk kembali ke atas.
========================================================= */

export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#111111] text-lg !text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#FF5C35] ${
        show
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      ↑
    </button>
  );
}

/* =========================================================
   7. REVEAL (dipindah dari page.tsx)
========================================================= */

type RevealProps = {
  children: ReactNode;
  className?: string;
  variant?: "up" | "left" | "right" | "scale";
  delay?: number;
};

export function Reveal({
  children,
  className = "",
  variant = "up",
  delay = 0,
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
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
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const variantClass = {
    up: "reveal",
    left: "reveal-left",
    right: "reveal-right",
    scale: "reveal-scale",
  }[variant];

  return (
    <div
      ref={ref}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
      className={`${variantClass} ${visible ? "is-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

/* =========================================================
   8. SMOOTH SCROLL (Lenis)
========================================================= */

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.1,
      anchors: { offset: -80 },
    });

    let frame = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}

/* =========================================================
   9. SCROLL PROGRESS HOOK + JOURNEY TIMELINE
   Garis tergambar mengikuti scroll, titik menyala bergantian.
========================================================= */

export function useScrollProgress(ref: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const el = ref.current;
      frame = 0;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const value = (window.innerHeight * 0.8 - rect.top) / rect.height;
      setProgress(Math.min(1, Math.max(0, value)));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ref]);

  return progress;
}

export function JourneyTimeline({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const progress = useScrollProgress(ref);

  return (
    <div
      ref={ref}
      className="relative grid border-t border-[#111111]/20 md:grid-cols-3"
    >
      <div
        className="pointer-events-none absolute left-0 top-[-1px] h-[2px] w-full origin-left bg-[#FF5C35]"
        style={{ transform: `scaleX(${progress})` }}
      />

      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={`pointer-events-none absolute top-[-6px] hidden h-[11px] w-[11px] rounded-full border-2 transition-colors duration-300 md:block ${
            progress >= i / 3 + 0.03
              ? "border-[#FF5C35] bg-[#FF5C35]"
              : "border-[#111111]/30 bg-[#F5F3EE]"
          }`}
          style={{ left: `${(i / 3) * 100}%` }}
        />
      ))}

      {children}
    </div>
  );
}

/* =========================================================
   10. HERO: MASK REVEAL + PARALLAX
========================================================= */

export function MaskLines({
  lines,
  startDelay = 200,
  step = 140,
}: {
  lines: ReactNode[];
  startDelay?: number;
  step?: number;
}) {
  return (
    <>
      {lines.map((line, i) => (
        <span key={i} className="-my-[0.08em] block overflow-hidden py-[0.08em]">
          <span
            className="mask-inner block"
            style={{ animationDelay: `${startDelay + i * step}ms` }}
          >
            {line}
          </span>
        </span>
      ))}
    </>
  );
}

export function ParallaxHero({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const y = Math.min(window.scrollY, 900);
      if (ref.current) {
        ref.current.style.transform = `translate3d(0, ${y * 0.14}px, 0)`;
        ref.current.style.opacity = String(Math.max(0, 1 - y / 1100));
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className="will-change-transform">
      {children}
    </div>
  );
}

/* =========================================================
   11. MAGNETIC LINK
========================================================= */

export function MagneticLink({
  href,
  children,
  className = "",
  strength = 0.3,
  download,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  strength?: number;
  download?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement | null>(null);

  return (
    <a
      ref={ref}
      href={href}
      download={download}
      className={`magnetic ${className}`}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * strength;
        const y = (e.clientY - (r.top + r.height / 2)) * strength;
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }}
      onMouseLeave={() => {
        if (ref.current) ref.current.style.transform = "";
      }}
    >
      {children}
    </a>
  );
}

/* =========================================================
   12. TERMINAL API DEMO
========================================================= */

const API_SCRIPTS = [
  {
    label: "Authentication API",
    cmd: `curl -X POST /api/login -d '{"email":"admin@mail.com"}'`,
    lines: [
      `HTTP/1.1 200 OK`,
      `{`,
      `  "message": "Login successful",`,
      `  "role": "administrator",`,
      `  "token": "1|Xk9f...q2Zt"`,
      `}`,
    ],
  },
  {
    label: "Inventory API",
    cmd: `curl /api/products?low_stock=true`,
    lines: [
      `HTTP/1.1 200 OK`,
      `{`,
      `  "data": [`,
      `    { "name": "Kabel LAN", "stock": 4 },`,
      `    { "name": "Mouse USB", "stock": 2 }`,
      `  ]`,
      `}`,
    ],
  },
  {
    label: "Approval Workflow",
    cmd: `curl -X POST /api/submissions/12/approve`,
    lines: [
      `HTTP/1.1 200 OK`,
      `{`,
      `  "id": 12,`,
      `  "status": "approved",`,
      `  "approved_by": "manager"`,
      `}`,
    ],
  },
];

export function TerminalDemo() {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const [started, setStarted] = useState(false);
  const [reduce, setReduce] = useState(false);
  const [idx, setIdx] = useState(0);
  const [typed, setTyped] = useState(0);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    setReduce(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );

    const el = boxRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started || reduce) return;

    const script = API_SCRIPTS[idx];
    let timer = 0;

    if (typed < script.cmd.length) {
      timer = window.setTimeout(() => setTyped(typed + 1), 26);
    } else if (shown < script.lines.length) {
      timer = window.setTimeout(() => setShown(shown + 1), shown === 0 ? 420 : 130);
    } else {
      timer = window.setTimeout(() => {
        setIdx((idx + 1) % API_SCRIPTS.length);
        setTyped(0);
        setShown(0);
      }, 2800);
    }

    return () => window.clearTimeout(timer);
  }, [started, reduce, idx, typed, shown]);

  const script = API_SCRIPTS[idx];
  const typedCount = reduce ? script.cmd.length : typed;
  const shownCount = reduce ? script.lines.length : shown;
  const typingDone = typedCount >= script.cmd.length;

  const caret = (
    <span className="animate-caret ml-0.5 inline-block h-[1em] w-[7px] translate-y-[0.15em] bg-[#FF5C35]" />
  );

  return (
    <div
      ref={boxRef}
      className="overflow-hidden rounded-2xl border border-white/10 bg-[#0B0B0B] shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
    >
      <div className="flex items-center gap-4 border-b border-white/10 px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
          <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
          <span className="h-3 w-3 rounded-full bg-[#28C840]" />
        </div>

        <div className="flex flex-wrap gap-2">
          {API_SCRIPTS.map((item, i) => (
            <span
              key={item.label}
              className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium transition-colors duration-300 ${
                i === idx
                  ? "bg-[#FF5C35] text-[#111111]"
                  : "text-white/40"
              }`}
            >
              {item.label}
            </span>
          ))}
        </div>
      </div>

      <div className="min-h-[300px] p-5 font-mono text-[13px] leading-6 text-white/75">
        <p className="whitespace-pre-wrap break-all">
          <span className="text-[#FF5C35]">$</span>{" "}
          {script.cmd.slice(0, typedCount)}
          {!typingDone && caret}
        </p>

        <div className="mt-3 overflow-x-auto">
          {script.lines.slice(0, shownCount).map((line, i) => (
            <pre
              key={`${idx}-${i}`}
              className={`animate-fade-in ${
                line.startsWith("HTTP") ? "text-[#4ADE80]" : ""
              }`}
            >
              {line}
            </pre>
          ))}
        </div>

        {typingDone && shownCount >= script.lines.length && (
          <p className="mt-3">
            <span className="text-[#FF5C35]">$</span> {caret}
          </p>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   13. CURSOR PREVIEW (thumbnail project mengikuti kursor)
========================================================= */

type PreviewItem = {
  number: string;
  title: string;
  tags: string[];
  image?: string;
};

export function CursorPreview({
  items,
  activeIndex,
  containerRef,
}: {
  items: PreviewItem[];
  activeIndex: number | null;
  containerRef: RefObject<HTMLElement | null>;
}) {
  const boxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const target = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };

    const loop = () => {
      pos.x += (target.x - pos.x) * 0.14;
      pos.y += (target.y - pos.y) * 0.14;
      const tilt = (target.x - pos.x) * 0.05;

      if (boxRef.current) {
        boxRef.current.style.transform = `translate3d(${pos.x + 28}px, ${
          pos.y - 120
        }px, 0) rotate(${tilt}deg)`;
      }
      raf = requestAnimationFrame(loop);
    };

    container.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);

    return () => {
      container.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [containerRef]);

  return (
    <div
      ref={boxRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-40 hidden md:block"
    >
      <div
        className={`relative h-[210px] w-[290px] overflow-hidden rounded-2xl border border-[#111111]/15 bg-[#111111] shadow-[0_30px_70px_rgba(0,0,0,0.25)] transition-all duration-300 ease-out ${
          activeIndex === null
            ? "scale-90 opacity-0"
            : "scale-100 opacity-100"
        }`}
      >
        {items.map((item, i) => (
          <div
            key={item.number}
            className={`absolute inset-0 flex flex-col justify-between p-5 text-white transition-opacity duration-300 ${
              activeIndex === i ? "opacity-100" : "opacity-0"
            }`}
            style={
              item.image
                ? {
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }
                : {
                    backgroundImage:
                      "linear-gradient(135deg, #111111 0%, #2b2b2b 100%)",
                  }
            }
          >
            {!item.image && (
              <>
                <span className="font-[var(--font-space-grotesk)] text-6xl font-bold tracking-[-0.06em] text-[#FF5C35]">
                  {item.number}
                </span>

                <div>
                  <p className="font-[var(--font-space-grotesk)] text-xl font-bold leading-tight tracking-[-0.03em]">
                    {item.title}
                  </p>
                  <p className="mt-2 text-xs text-white/50">
                    {item.tags.join(" · ")}
                  </p>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   14. HERO NETWORK BACKGROUND (dot grid + jaringan data)
   Canvas: titik bereaksi pada kursor, node saling terhubung,
   paket data oranye berjalan di sepanjang garis.
========================================================= */

export function HeroNetwork({
  variant = "light",
}: {
  variant?: "light" | "dark";
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    type Node = { x: number; y: number; vx: number; vy: number; bx: number; by: number };
    type Packet = { a: number; b: number; t: number; s: number };

    const ink = variant === "dark" ? "245,243,238" : "17,17,17";
    const LINK = 150;
    const GRID = 28;
    const MOUSE_R = 160;

    let w = 0;
    let h = 0;
    let nodes: Node[] = [];
    let packets: Packet[] = [];
    let lastSpawn = 0;
    let visible = true;
    let raf = 0;

    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999, active: false };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, w, h);

      if (mouse.active) {
        mouse.x += (mouse.tx - mouse.x) * 0.18;
        mouse.y += (mouse.ty - mouse.y) * 0.18;
      }

      /* ---------- Dot grid ---------- */
      const near: { x: number; y: number; k: number }[] = [];

      ctx.fillStyle = `rgba(${ink},${variant === "dark" ? 0.14 : 0.1})`;
      ctx.beginPath();

      for (let gx = GRID / 2; gx < w; gx += GRID) {
        for (let gy = GRID / 2; gy < h; gy += GRID) {
          const dx = gx - mouse.x;
          const dy = gy - mouse.y;
          const d = Math.hypot(dx, dy);

          if (mouse.active && d < MOUSE_R) {
            const k = 1 - d / MOUSE_R;
            const safe = d || 1;
            near.push({
              x: gx + (dx / safe) * k * 7,
              y: gy + (dy / safe) * k * 7,
              k,
            });
          } else {
            ctx.moveTo(gx + 1, gy);
            ctx.arc(gx, gy, 1, 0, Math.PI * 2);
          }
        }
      }
      ctx.fill();

      near.forEach(({ x, y, k }) => {
        ctx.fillStyle = `rgba(255,92,53,${0.12 + k * 0.7})`;
        ctx.beginPath();
        ctx.arc(x, y, 1 + k * 1.8, 0, Math.PI * 2);
        ctx.fill();
      });

      /* ---------- Update node ---------- */
      if (!reduce) {
        nodes.forEach((n) => {
          if (mouse.active) {
            const dx = mouse.x - n.x;
            const dy = mouse.y - n.y;
            const d = Math.hypot(dx, dy);
            if (d < 220 && d > 1) {
              n.vx += (dx / d) * 0.012;
              n.vy += (dy / d) * 0.012;
            }
          }

          n.vx += (n.bx - n.vx) * 0.02;
          n.vy += (n.by - n.vy) * 0.02;
          n.x += n.vx;
          n.y += n.vy;

          if (n.x < 0 || n.x > w) {
            n.bx *= -1;
            n.vx *= -1;
            n.x = Math.min(w, Math.max(0, n.x));
          }
          if (n.y < 0 || n.y > h) {
            n.by *= -1;
            n.vy *= -1;
            n.y = Math.min(h, Math.max(0, n.y));
          }
        });
      }

      /* ---------- Garis antar node ---------- */
      ctx.lineWidth = 1;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (d < LINK) {
            ctx.strokeStyle = `rgba(${ink},${(1 - d / LINK) * 0.16})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      /* ---------- Garis ke kursor + node ---------- */
      nodes.forEach((n) => {
        let k = 0;

        if (mouse.active) {
          const d = Math.hypot(n.x - mouse.x, n.y - mouse.y);
          if (d < 170) {
            k = 1 - d / 170;
            ctx.strokeStyle = `rgba(255,92,53,${k * 0.5})`;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }

        ctx.fillStyle = k > 0 ? `rgba(255,92,53,${0.4 + k * 0.6})` : `rgba(${ink},0.35)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2 + k * 1.5, 0, Math.PI * 2);
        ctx.fill();
      });

      /* ---------- Paket data (request) ---------- */
      if (!reduce) {
        if (packets.length < 5 && time - lastSpawn > 700 && nodes.length > 1) {
          const a = Math.floor(Math.random() * nodes.length);
          const options: number[] = [];

          nodes.forEach((n, idx) => {
            if (idx !== a && Math.hypot(n.x - nodes[a].x, n.y - nodes[a].y) < LINK) {
              options.push(idx);
            }
          });

          if (options.length) {
            packets.push({
              a,
              b: options[Math.floor(Math.random() * options.length)],
              t: 0,
              s: 0.012 + Math.random() * 0.012,
            });
            lastSpawn = time;
          }
        }

        packets = packets.filter((p) => {
          const A = nodes[p.a];
          const B = nodes[p.b];
          p.t += p.s;

          if (p.t >= 1 || Math.hypot(A.x - B.x, A.y - B.y) > LINK * 1.3) {
            return false;
          }

          const x = A.x + (B.x - A.x) * p.t;
          const y = A.y + (B.y - A.y) * p.t;

          ctx.fillStyle = "rgba(255,92,53,0.22)";
          ctx.beginPath();
          ctx.arc(x, y, 7, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = "#FF5C35";
          ctx.beginPath();
          ctx.arc(x, y, 2.6, 0, Math.PI * 2);
          ctx.fill();

          return true;
        });
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;

      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(w < 768 ? 26 : 64, Math.round((w * h) / 24000));

      nodes = Array.from({ length: count }, () => {
        const bx = (Math.random() - 0.5) * 0.3;
        const by = (Math.random() - 0.5) * 0.3;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: bx,
          vy: by,
          bx,
          by,
        };
      });
      packets = [];

      if (reduce) draw(0);
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const inside = x >= 0 && x <= rect.width && y >= 0 && y <= rect.height;

      if (inside && !mouse.active) {
        mouse.x = x;
        mouse.y = y;
      }
      mouse.active = inside;
      mouse.tx = x;
      mouse.ty = y;
    };

    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    if (!reduce) {
      const visibility = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
      });
      visibility.observe(canvas);

      window.addEventListener("mousemove", onMove, { passive: true });

      const loop = (time: number) => {
        if (visible && !document.hidden) draw(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);

      return () => {
        cancelAnimationFrame(raf);
        resizeObserver.disconnect();
        visibility.disconnect();
        window.removeEventListener("mousemove", onMove);
      };
    }

    return () => resizeObserver.disconnect();
  }, [variant]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 left-1/2 -z-10 h-full w-screen -translate-x-1/2"
      style={{
        maskImage: "linear-gradient(to bottom, black 0%, black 65%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, black 0%, black 65%, transparent 100%)",
      }}
    />
  );
}


/* =========================================================
   15. INTRO LOADER (sapaan dalam berbagai bahasa)
   Muncul sekali per sesi di halaman utama, lalu naik ke atas
   dan membuka website.
========================================================= */

const GREETINGS = [
  { text: "Hello", lang: "English" },
  { text: "Hola", lang: "Español" },
  { text: "Bonjour", lang: "Français" },
  { text: "こんにちは", lang: "日本語" },
  { text: "안녕하세요", lang: "한국어" },
  { text: "Ciao", lang: "Italiano" },
  { text: "Olá", lang: "Português" },
  { text: "Привет", lang: "Русский" },
  { text: "مرحبا", lang: "العربية" },
  { text: "नमस्ते", lang: "हिन्दी" },
  { text: "Hallo", lang: "Deutsch" },
  { text: "Sampurasun", lang: "Basa Sunda" },
  { text: "Halo", lang: "Bahasa Indonesia" },
];

export function IntroLoader() {
  const pathname = usePathname();
  const [active, setActive] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const [index, setIndex] = useState(0);

  const isHome = pathname === "/";

  /* Lewati kalau sudah pernah tampil di sesi ini / reduce motion */
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("intro-seen") === "1";
    } catch {
      // sessionStorage tidak tersedia
    }

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (seen || reduce || !isHome) setActive(false);
  }, [isHome]);

  /* Kunci scroll selama intro */
  useEffect(() => {
    if (!active || !isHome) return;
    const html = document.documentElement;
    const previous = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = previous;
    };
  }, [active, isHome]);

  /* Ganti sapaan */
  useEffect(() => {
    if (!active || leaving) return;

    const last = index === GREETINGS.length - 1;
    const delay = last ? 900 : index === 0 ? 650 : 300;

    const timer = window.setTimeout(() => {
      if (last) setLeaving(true);
      else setIndex((i) => i + 1);
    }, delay);

    return () => window.clearTimeout(timer);
  }, [active, leaving, index]);

  /* Selesai: hapus overlay */
  useEffect(() => {
    if (!leaving) return;

    const timer = window.setTimeout(() => {
      try {
        sessionStorage.setItem("intro-seen", "1");
      } catch {
        // abaikan
      }
      setActive(false);
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [leaving]);

  if (!active || !isHome) return null;

  const current = GREETINGS[index];
  const progress = (index + 1) / GREETINGS.length;

  return (
    <div
      className={`fixed inset-0 z-[100] overflow-hidden bg-[#F5F3EE] transition-transform duration-[950ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
        leaving
          ? "intro-leaving -translate-y-full rounded-b-[48px]"
          : "intro-overlay translate-y-0"
      }`}
    >
      {/* Dot grid + cahaya tengah */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 45%, rgba(255,255,255,0.9), rgba(255,255,255,0) 55%), radial-gradient(rgba(17,17,17,0.16) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 24px 24px",
        }}
      />

      {/* Bingkai */}
      <div className="absolute inset-4 rounded-3xl border border-[#111111]/20 md:inset-5" />

      {/* Header kecil */}
      <div className="absolute left-9 top-9 font-[var(--font-space-grotesk)] text-sm font-bold tracking-[-0.04em] md:left-12 md:top-12">
        ALBAR<span className="text-[#FF5C35]">.</span>
      </div>

      <button
        type="button"
        onClick={() => setLeaving(true)}
        className="absolute right-9 top-8 rounded-full border border-[#111111]/20 px-4 py-1.5 text-xs font-semibold text-[#6B6B6B] transition-colors hover:border-[#FF5C35] hover:text-[#FF5C35] md:right-12 md:top-11"
      >
        Skip ↗
      </button>

      {/* Sapaan */}
      <div className="relative flex h-full flex-col items-center justify-center px-6">
        <div className="flex items-center gap-4 md:gap-8">
          <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#4A4A4A] md:h-3 md:w-3" />

          <span
            key={index}
            className="greet-in whitespace-nowrap font-[var(--font-space-grotesk)] text-[clamp(3rem,13vw,9rem)] font-bold leading-none tracking-[-0.05em] text-[#4A4A4A]"
          >
            {current.text}
          </span>

          <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#4A4A4A] md:h-3 md:w-3" />
        </div>

        <div className="mt-14 h-px w-[min(560px,72vw)] bg-[#111111]/15">
          <div
            className="h-full origin-left bg-[#FF5C35] transition-transform duration-300 ease-out"
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>

        <div className="mt-5 flex w-[min(560px,72vw)] items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-[#6B6B6B]">
          <span>{current.lang}</span>
          <span>
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(GREETINGS.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  );
}