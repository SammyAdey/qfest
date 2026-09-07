import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import localFont from "next/font/local";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ScheduleProvider } from "@/components/schedule-provider";
import { SiteLoader } from "@/components/site-loader";
import { SmoothScroll } from "@/components/smooth-scroll";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
});

const voyage = localFont({
  src: [
    {
      path: "../../public/font/vj-voyage/voyage-regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/font/vj-voyage/voyage-bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-voyage",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "QFest 2026 — Pieces of Us",
    template: "%s · QFest 2026",
  },
  description:
    "Quramo Festival of Words returns to Lagos, 1–3 October 2026, for ten years of African storytelling.",
  openGraph: {
    title: "QFest 2026 — Pieces of Us",
    description:
      "Celebrating ten years of African storytelling. 1–3 October 2026, Lagos.",
    images: ["/brand/poster.png"],
  },
  icons: {
    icon: "/brand/Qfest-logo.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${voyage.variable} intro-lock h-full antialiased`}
    >
      <body className="flex min-h-full min-w-0 flex-col overflow-x-clip bg-paper font-sans text-ink">
        <SmoothScroll />
        <SiteLoader />
        <ScheduleProvider>
          <Header />
          <div className="flex min-w-0 flex-1 flex-col overflow-x-clip">{children}</div>
          <Footer />
        </ScheduleProvider>
      </body>
    </html>
  );
}
