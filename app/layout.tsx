import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Albar — Fullstack Developer",
    template: "%s — Albar",
  },
  description:
    "Personal portfolio Albar yang mendokumentasikan perjalanan PKL, project, skill, dan pengalaman belajar dalam software development.",
  keywords: [
    "Albar",
    "Fullstack Developer",
    "Web Developer",
    "Laravel",
    "Next.js",
    "PHP",
    "React",
    "MySQL",
    "Portfolio",
    "PKL",
  ],
  authors: [{ name: "Albar Fahrezi" }],
  creator: "Albar Fahrezi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
    >
      <body className={inter.className}>{children}</body>
    </html>
  );
}