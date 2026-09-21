import Link from "next/link";

export default function ApprovalWorkflowPage() {
  return (
    <main className="min-h-screen bg-[#F5F3EE] text-[#111111]">

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
            ← Back to Projects
          </Link>
        </div>
      </nav>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">

        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF5C35] md:text-sm">
          Project 03 — Fullstack
        </p>

        <div className="mt-8 grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">

          <h1 className="font-[var(--font-space-grotesk)] text-5xl font-bold leading-[0.9] tracking-[-0.07em] md:text-7xl lg:text-8xl">
            Approval
            <br />
            <span className="text-[#FF5C35]">Workflow.</span>
          </h1>

          <p className="max-w-md text-base leading-8 text-[#6B6B6B] md:text-lg">
            Sistem workflow untuk mengelola proses pengajuan dari draft,
            submission, approval, hingga rejection.
          </p>

        </div>

      </section>

      <section className="border-t border-[#111111]/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">

          <div className="grid gap-12 lg:grid-cols-[0.3fr_0.7fr]">

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF5C35]">
              01 — Overview
            </p>

            <div>
              <h2 className="font-[var(--font-space-grotesk)] text-3xl font-bold tracking-[-0.05em] md:text-5xl">
                What I built.
              </h2>

              <p className="mt-8 max-w-3xl text-base leading-8 text-[#6B6B6B] md:text-lg">
                Approval Workflow System dibuat untuk memahami bagaimana
                sebuah proses pengajuan dapat memiliki beberapa status dan
                perubahan state berdasarkan aksi user.
              </p>
            </div>

          </div>

        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">

        <div className="grid gap-12 lg:grid-cols-[0.3fr_0.7fr]">

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF5C35]">
            02 — Technology
          </p>

          <div className="flex flex-wrap gap-3">
            {[
              "Laravel",
              "PHP",
              "React",
              "MySQL",
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

      <section className="border-t border-[#111111]/10 bg-[#111111] text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF5C35]">
            03 — Workflow
          </p>

          <div className="mt-12 grid gap-0 md:grid-cols-2">

            {[
              "Draft",
              "Submit",
              "Review",
              "Approve",
              "Reject",
              "Workflow History",
            ].map((feature, index) => (
              <div
                key={feature}
                className="border-t border-white/20 py-6"
              >
                <span className="text-sm text-[#FF5C35]">
                  0{index + 1}
                </span>

                <h3 className="mt-3 font-[var(--font-space-grotesk)] text-2xl font-bold">
                  {feature}
                </h3>
              </div>
            ))}

          </div>

        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">

        <div className="grid gap-12 lg:grid-cols-[0.3fr_0.7fr]">

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF5C35]">
            04 — Learning
          </p>

          <div>
            <h2 className="font-[var(--font-space-grotesk)] text-3xl font-bold tracking-[-0.05em] md:text-5xl">
              What I learned.
            </h2>

            <p className="mt-8 max-w-3xl text-base leading-8 text-[#6B6B6B] md:text-lg">
              Project ini membantu saya memahami konsep workflow,
              state transition, API integration, frontend-backend
              communication, serta bagaimana menjaga agar perubahan status
              hanya dapat dilakukan sesuai aturan sistem.
            </p>
          </div>

        </div>

      </section>

      <footer className="bg-[#FF5C35] px-6 py-8 lg:px-10">

        <div className="mx-auto flex max-w-7xl justify-between text-sm font-medium">
          <span>Approval Workflow System</span>

          <Link href="/#projects" className="hover:opacity-60">
            Back to Projects ↗
          </Link>
        </div>

      </footer>

    </main>
  );
}