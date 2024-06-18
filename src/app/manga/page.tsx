import type { Metadata } from "next";
import { SearchBar, BackgroundImg, Manga } from "@/components";

import FilterManga from "@/components/FilterManga";

export const metadata: Metadata = {
  title: "Animox/Manga",
  description: "Explore Th Diverse Realms of Anime Magic",
};

export default function Home() {
  return (
    <>
      <BackgroundImg classes="bg-bg-img-3 bg-center" type="Manga" />

      <SearchBar type="manga" />

      <FilterManga />
    </>
  );
}
