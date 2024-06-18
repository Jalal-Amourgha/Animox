import type { Metadata } from "next";
import {
  SearchBar,
  CustomFilterAnime,
  Animes,
  BackgroundImg,
} from "@/components";
import { scores, seasons, status, types } from "@/_data";

export const metadata: Metadata = {
  title: "Animox/Anime",
  description: "Explore Th Diverse Realms of Anime Magic",
};

export default function Home() {
  return (
    <>
      <BackgroundImg classes="bg-bg-img-2 bg-top" type="Anime" />

      <SearchBar type="anime" />

      <section className="container my-[70px]">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center ">
          <h1 className="text-3xl text-white font-medium mb-5 lg:mb-0">
            Explore Animes :
          </h1>

          <div className="flex flex-wrap justify-between gap-5">
            <CustomFilterAnime title="Statu" dataType={status} />
            <CustomFilterAnime title="Type" dataType={types} />
            <CustomFilterAnime title="Score" dataType={scores} />
            <CustomFilterAnime title="Year" dataType={seasons} />
          </div>
        </div>
      </section>
      <Animes />
    </>
  );
}
