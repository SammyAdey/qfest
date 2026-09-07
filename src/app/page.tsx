import { Hero } from "@/components/hero";
import { HomeAbout } from "@/components/home-about";
import { HomeKeynotes } from "@/components/home-keynotes";
import { HomePartners } from "@/components/home-partners";
import { HomeSchedule } from "@/components/home-schedule";
import { HomeVerse } from "@/components/home-verse";
import { FestivalGallery } from "@/components/festival-gallery";
import { Newsletter } from "@/components/newsletter";

export default function Home() {
  return (
    <main>
      <Hero />
      <HomeAbout />
      <HomeVerse />
      <HomeKeynotes />
      <HomeSchedule />
      <FestivalGallery />
      <HomePartners />
      <Newsletter />
    </main>
  );
}
