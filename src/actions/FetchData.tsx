"use server";

import { AnimeCard, MangaCard } from "@/components";
import { AnimeProps, MangaProps } from "@/types";

export const fetchData = async (url: string, type: string) => {
  const res = await fetch(`${url}`, { cache: "no-store" });
  const data = await res.json();

  if (type === "anime") {
    return data.data.map((item: AnimeProps, index: number) => (
      <AnimeCard
        key={(Math.random() * 1000000).toFixed()}
        anime={item}
        index={index}
      />
    ));
  } else {
    return data.data.map((item: MangaProps, index: number) => (
      <MangaCard
        key={(Math.random() * 1000000).toFixed()}
        manga={item}
        index={index}
      />
    ));
  }
};
