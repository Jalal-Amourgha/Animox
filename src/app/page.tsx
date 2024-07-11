import { AboutUs, AnimeSlider, DownloadApp, Hero, JoinUs } from "@/components";
import { animes } from "@/constants/_animes";
import { manga } from "@/constants/_manga";

export default function Home() {
  return (
    <>
      <Hero />
      <AnimeSlider
        title="Upcoming Animes"
        type="upcoming"
        data={animes.filter((anime) => +anime.score >= 8.5).slice(0, 15)}
        route="anime"
      />
      <AboutUs />

      <AnimeSlider
        title="Popular Manga"
        type="upcoming"
        data={manga.slice(0, 15)}
        route="manga"
      />
      <JoinUs />

      <DownloadApp />
    </>
  );
}
