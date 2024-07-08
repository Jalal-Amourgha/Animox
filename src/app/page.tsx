import { AboutUs, AnimeSlider, DownloadApp, Hero, JoinUs } from "@/components";
import { sponsors } from "@/constants";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Hero />
      <AnimeSlider
        title="Upcoming Animes"
        type="upcoming"
        url="https://api.jikan.moe/v4/anime?status=upcoming&limit=15&order_by=popularity"
      />
      <AboutUs />

      <AnimeSlider
        title="Popular Animes"
        type="upcoming"
        url="https://api.jikan.moe/v4/anime?limit=15&order_by=popularity"
      />
      <JoinUs />

      <DownloadApp />
      <section className="container mt-[100px] grid grid-cols-2 md:grid-cols-5 gap-10">
        {sponsors.map((sponsor) => (
          <div key={sponsor.id}>
            <Image
              src={sponsor.img}
              className="w-[130px] grayscale mx-auto"
              alt="sponsor img"
            />
          </div>
        ))}
      </section>
    </>
  );
}
