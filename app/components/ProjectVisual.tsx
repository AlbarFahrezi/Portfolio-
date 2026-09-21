type ProjectVisualProps = {
  type: "auth" | "inventory" | "workflow";
};

export default function ProjectVisual({ type }: ProjectVisualProps) {
  if (type === "auth") {
    return (
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#181818] shadow-2xl">
        <div className="flex items-center gap-2 border-b border-white/10 px-5 py-4">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5C35]" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="ml-3 text-xs text-white/40">
            authentication-api
          </span>
        </div>

        <div className="grid gap-0 md:grid-cols-[0.7fr_1.3fr]">
          <div className="border-b border-white/10 p-6 md:border-b-0 md:border-r">
            <p className="text-xs uppercase tracking-[0.2em] text-[#FF5C35]">
              Authentication
            </p>

            <div className="mt-8 space-y-3">
              {["POST /register", "POST /login", "GET /profile", "POST /logout"].map(
                (route) => (
                  <div
                    key={route}
                    className="rounded-lg border border-white/10 px-4 py-3 font-mono text-xs text-white/70"
                  >
                    {route}
                  </div>
                )
              )}
            </div>
          </div>

          <div className="p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-white/40">
              Authorization
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-[#FF5C35]/30 bg-[#FF5C35]/10 p-5">
                <p className="text-sm text-[#FF5C35]">Administrator</p>
                <p className="mt-2 text-xs text-white/50">
                  Protected admin routes
                </p>
              </div>

              <div className="rounded-xl border border-white/10 p-5">
                <p className="text-sm text-white">Operator</p>
                <p className="mt-2 text-xs text-white/50">
                  Standard API access
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "inventory") {
    return (
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#181818] shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5C35]" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          </div>

          <span className="text-xs text-white/40">
            inventory-management-api
          </span>
        </div>

        <div className="grid gap-4 p-6 md:grid-cols-3">
          {[
            ["PRODUCTS", "10"],
            ["TOTAL STOCK", "195"],
            ["TRANSACTIONS", "24"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-xl border border-white/10 p-5"
            >
              <p className="text-[10px] font-semibold tracking-[0.2em] text-white/40">
                {label}
              </p>

              <p className="mt-4 font-[var(--font-space-grotesk)] text-4xl font-bold text-white">
                {value}
              </p>
            </div>
          ))}
        </div>

        <div className="grid gap-0 border-t border-white/10 md:grid-cols-2">
          <div className="p-6 md:border-r md:border-white/10">
            <p className="text-xs uppercase tracking-[0.2em] text-[#FF5C35]">
              Stock IN
            </p>

            <div className="mt-5 rounded-xl border border-white/10 p-5">
              <div className="flex justify-between text-sm">
                <span className="text-white/50">Quantity</span>
                <span className="font-semibold text-white">+5</span>
              </div>

              <div className="mt-4 h-2 rounded-full bg-white/10">
                <div className="h-2 w-[65%] rounded-full bg-[#FF5C35]" />
              </div>
            </div>
          </div>

          <div className="p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-white/40">
              Stock OUT
            </p>

            <div className="mt-5 rounded-xl border border-white/10 p-5">
              <div className="flex justify-between text-sm">
                <span className="text-white/50">Quantity</span>
                <span className="font-semibold text-white">-1</span>
              </div>

              <div className="mt-4 h-2 rounded-full bg-white/10">
                <div className="h-2 w-[35%] rounded-full bg-white/40" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#181818] shadow-2xl">
      <div className="border-b border-white/10 px-5 py-4">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5C35]" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        </div>
      </div>

      <div className="p-6 md:p-10">

        <p className="text-xs uppercase tracking-[0.2em] text-[#FF5C35]">
          Approval Workflow
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-5">

          {[
            ["01", "Draft"],
            ["02", "Submit"],
            ["03", "Review"],
            ["04", "Approve"],
            ["05", "Done"],
          ].map(([number, label], index) => (
            <div key={label} className="relative">

              <div className="rounded-xl border border-white/10 p-5">
                <span className="text-xs text-[#FF5C35]">
                  {number}
                </span>

                <p className="mt-3 font-[var(--font-space-grotesk)] font-bold text-white">
                  {label}
                </p>
              </div>

              {index < 4 && (
                <span className="absolute -right-3 top-1/2 hidden text-white/30 md:block">
                  →
                </span>
              )}

            </div>
          ))}

        </div>

        <div className="mt-8 rounded-xl border border-white/10 p-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs text-white/40">
                CURRENT STATUS
              </p>

              <p className="mt-2 font-[var(--font-space-grotesk)] text-xl font-bold text-white">
                Waiting for Approval
              </p>
            </div>

            <span className="rounded-full border border-[#FF5C35]/30 bg-[#FF5C35]/10 px-4 py-2 text-xs font-semibold text-[#FF5C35]">
              IN REVIEW
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}