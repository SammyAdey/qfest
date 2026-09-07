import type { Metadata } from "next";
import { AboutPageView } from "@/components/about-page";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return <AboutPageView />;
}
