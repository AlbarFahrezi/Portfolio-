const projects = [
  {
    number: "01",
    title: "Authentication API",
    description:
      "REST API untuk authentication dan authorization dengan sistem role administrator dan operator.",
    tags: ["Laravel", "PHP", "MySQL", "Sanctum"],
  },
  {
    number: "02",
    title: "Inventory Management API",
    description:
      "API untuk mengelola produk, stok, transaksi IN/OUT, stock history, dan proses inventory.",
    tags: ["Laravel", "PHP", "MySQL", "REST API"],
  },
  {
    number: "03",
    title: "Approval Workflow System",
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

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F5F3EE] text-[#111111]">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-[#111111]/10 bg-[#F5F3EE]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <a
            href="#home"
            className="text-lg font-bold tracking-[-0.04em]"
          >
            ALBAR<span className="text-[#FF5C35]">.</span>
          </a>

          <div className="hidden items-center gap-8 text-sm font-medium md:flex">
            <a href="#about" className="transition-opacity hover:opacity-50">
              About
            </a>
            <a href="#journey" className="transition-opacity hover:opacity-50">
              Journey
            </a>
            <a href="#projects" className="transition-opacity hover:opacity-50">
              Projects
            </a>
            <a href="#skills" className="transition-opacity hover:opacity-50">
              Skills
            </a>
            <a href="#contact" className="transition-opacity hover:opacity-50">
              Contact
            </a>
          </div>

          <a
            href="#projects"
            className="rounded-full bg-[#111111] px-5 py-2.5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
          >
            View Work
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section
        id="home"
        className="mx-auto flex min-h-[calc(100vh-81px)] max-w-7xl flex-col justify-center px-6 py-20 lg:px-10"
      >
        <div className="mb-8 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.2em] text-[#6B6B6B]">
          <span className="h-2 w-2 rounded-full bg-[#FF5C35]" />
          Personal Portfolio · PKL Journey
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.6fr] lg:items-end">
          <div>
            <p className="mb-4 text-lg text-[#6B6B6B]">Hello, I&apos;m</p>

            <h1 className="text-[clamp(4rem,11vw,9rem)] font-bold leading-[0.82] tracking-[-0.07em]">
              ALBAR
              <span className="text-[#FF5C35]">.</span>
            </h1>

            <h2 className="mt-8 max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.04em] md:text-5xl">
              Fullstack Developer
              <br />
              <span className="text-[#6B6B6B]">
                who loves building things.
              </span>
            </h2>
          </div>

          <div className="lg:pb-3">
            <p className="max-w-md text-base leading-7 text-[#6B6B6B] md:text-lg">
              A personal collection of my internship journey, projects,
              experiments, and things I learned while building software.
            </p>

            <a
              href="#projects"
              className="mt-8 inline-flex items-center gap-3 border-b-2 border-[#111111] pb-2 font-semibold transition-all hover:gap-5"
            >
              Explore my projects
              <span className="text-[#FF5C35]">↗</span>
            </a>
          </div>
        </div>

        <div className="mt-20 border-t border-[#111111]/20 pt-5">
          <div className="flex flex-col justify-between gap-3 text-xs font-medium uppercase tracking-[0.16em] text-[#6B6B6B] sm:flex-row">
            <span>Based in Indonesia</span>
            <span>2026 — PKL Portfolio</span>
            <span>Scroll to explore ↓</span>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="border-t border-[#111111]/10 bg-[#111111] text-white"
      >
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.35fr_0.65fr]">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#FF5C35]">
                01 — About
              </p>
            </div>

            <div>
              <h2 className="max-w-4xl text-4xl font-bold leading-tight tracking-[-0.05em] md:text-6xl">
                Learning by{" "}
                <span className="text-[#FF5C35]">building</span> real
                projects.
              </h2>

              <p className="mt-8 max-w-2xl text-lg leading-8 text-white/60">
                Selama kegiatan PKL, saya belajar mengubah konsep menjadi
                aplikasi yang benar-benar bisa digunakan. Dari authentication,
                database, REST API, sampai sistem inventory dan workflow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* JOURNEY */}
      <section id="journey" className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-[#FF5C35]">
              02 — Journey
            </p>

            <h2 className="text-4xl font-bold tracking-[-0.05em] md:text-6xl">
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
            <span className="text-sm font-medium text-[#FF5C35]">01</span>
            <h3 className="mt-8 text-2xl font-bold">PKL</h3>
            <p className="mt-4 leading-7 text-[#6B6B6B]">
              Mengenal workflow pengembangan software dan memahami bagaimana
              sebuah project dibangun secara terstruktur.
            </p>
          </div>

          <div className="border-b border-[#111111]/20 py-8 md:border-b-0 md:border-r md:px-8">
            <span className="text-sm font-medium text-[#FF5C35]">02</span>
            <h3 className="mt-8 text-2xl font-bold">Learning</h3>
            <p className="mt-4 leading-7 text-[#6B6B6B]">
              Memperdalam Laravel, database, authentication, API, Git,
              frontend, dan konsep software development.
            </p>
          </div>

          <div className="py-8 md:pl-8">
            <span className="text-sm font-medium text-[#FF5C35]">03</span>
            <h3 className="mt-8 text-2xl font-bold">Building</h3>
            <p className="mt-4 leading-7 text-[#6B6B6B]">
              Menerapkan ilmu melalui beberapa project seperti Authentication
              API, Inventory API, dan Approval Workflow.
            </p>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section
        id="projects"
        className="border-t border-[#111111]/10 bg-white"
      >
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-[#FF5C35]">
                03 — Selected Projects
              </p>

              <h2 className="text-4xl font-bold tracking-[-0.05em] md:text-6xl">
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

          <div className="grid gap-5">
            {projects.map((project) => (
              <article
                key={project.number}
                className="group grid gap-8 border-t border-[#111111]/20 py-10 md:grid-cols-[80px_1fr_1fr] md:items-start"
              >
                <span className="text-sm font-medium text-[#FF5C35]">
                  {project.number}
                </span>

                <div>
                  <h3 className="text-3xl font-bold tracking-[-0.04em] transition-colors group-hover:text-[#FF5C35] md:text-4xl">
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

                <p className="max-w-md leading-7 text-[#6B6B6B]">
                  {project.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[0.35fr_0.65fr]">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#FF5C35]">
              04 — Skills
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-[-0.05em] md:text-5xl">
              Tools I use.
            </h2>
          </div>

          <div className="flex flex-wrap content-start gap-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="border border-[#111111]/20 px-5 py-3 text-lg font-medium transition-all hover:border-[#FF5C35] hover:bg-[#FF5C35] hover:text-white"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="border-t border-[#111111]/10 bg-[#FF5C35] text-[#111111]"
      >
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <p className="text-sm font-medium uppercase tracking-[0.2em]">
            05 — Contact
          </p>

          <div className="mt-10 flex flex-col justify-between gap-12 lg:flex-row lg:items-end">
            <h2 className="max-w-4xl text-5xl font-bold leading-[0.95] tracking-[-0.06em] md:text-7xl">
              Let&apos;s connect
              <br />
              and build something.
            </h2>

            <div className="flex flex-col gap-4 text-lg font-medium">
              <a
                href="mailto:your.email@example.com"
                className="border-b border-[#111111] pb-2"
              >
                your.email@example.com
              </a>

              <a
                href="#"
                className="border-b border-[#111111] pb-2"
              >
                GitHub ↗
              </a>

              <a
                href="#"
                className="border-b border-[#111111] pb-2"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#111111] px-6 py-8 text-white lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-white/50 sm:flex-row">
          <span>© 2026 Albar. All rights reserved.</span>
          <span>Built with Next.js & Tailwind CSS</span>
        </div>
      </footer>
    </main>
  );
}