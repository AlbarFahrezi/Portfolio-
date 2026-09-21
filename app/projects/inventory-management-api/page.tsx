import Link from "next/link";
import ProjectVisual from "@/app/components/ProjectVisual";

export default function InventoryManagementApiPage() {
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
            ← Back to Projects
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF5C35] md:text-sm">
          Project 02 — Backend
        </p>

        <div className="mt-8 grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <h1 className="font-[var(--font-space-grotesk)] text-5xl font-bold leading-[0.9] tracking-[-0.07em] md:text-7xl lg:text-8xl">
            Inventory
            <br />
            <span className="text-[#FF5C35]">
              Management API.
            </span>
          </h1>

          <p className="max-w-md text-base leading-8 text-[#6B6B6B] md:text-lg">
            API untuk mengelola master data, stok, transaksi IN/OUT,
            stock history, dan proses inventory secara terstruktur.
          </p>
        </div>
      </section>

      {/* PROJECT VISUAL */}
      <section className="border-t border-[#111111]/10 bg-[#111111] text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <p className="mb-10 text-xs font-semibold uppercase tracking-[0.2em] text-[#FF5C35]">
            Project Visual
          </p>

          <ProjectVisual type="inventory" />
        </div>
      </section>

      {/* OVERVIEW */}
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
                Project ini merupakan API inventory yang digunakan untuk
                mengelola produk, kategori, supplier, warehouse, transaksi
                stock IN dan OUT, stock adjustment, serta riwayat perubahan
                stok.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TECHNOLOGY */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.3fr_0.7fr]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF5C35]">
            02 — Technology
          </p>

          <div className="flex flex-wrap gap-3">
            {[
              "Laravel",
              "PHP",
              "MySQL",
              "REST API",
              "Laravel Sanctum",
              "Swagger",
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
            03 — Features
          </p>

          <div className="mt-12 grid gap-0 md:grid-cols-2">
            {[
              "Product Management",
              "Category Management",
              "Supplier Management",
              "Warehouse Management",
              "Stock IN / OUT",
              "Stock History",
              "Stock Adjustment",
              "Transaction Validation",
              "Event & Listener",
              "Dashboard Summary",
            ].map((feature, index) => (
              <div
                key={feature}
                className="border-t border-white/20 py-6"
              >
                <span className="text-sm text-[#FF5C35]">
                  {(index + 1).toString().padStart(2, "0")}
                </span>

                <h3 className="mt-3 font-[var(--font-space-grotesk)] text-2xl font-bold">
                  {feature}
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
            04 — Learning
          </p>

          <div>
            <h2 className="font-[var(--font-space-grotesk)] text-3xl font-bold tracking-[-0.05em] md:text-5xl">
              What I learned.
            </h2>

            <p className="mt-8 max-w-3xl text-base leading-8 text-[#6B6B6B] md:text-lg">
              Project ini memperdalam pemahaman saya tentang relational
              database, REST API, validation, database transaction,
              stock management, optimistic locking, event listener,
              middleware, authentication, dan testing API menggunakan
              Postman.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#FF5C35] px-6 py-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl justify-between text-sm font-medium">
          <span>Inventory Management API</span>

          <Link href="/#projects" className="hover:opacity-60">
            Back to Projects ↗
          </Link>
        </div>
      </footer>

    </main>
  );
}