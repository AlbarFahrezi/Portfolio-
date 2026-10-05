import { IntroLoader, SmoothScroll } from "./components/AnimatedExtras";

// template.tsx dirender ulang tiap pindah halaman,
// jadi fade-in di sini jadi transisi antar route.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <IntroLoader />
      <SmoothScroll />
      <div className="page-fade">{children}</div>
    </>
  );
}