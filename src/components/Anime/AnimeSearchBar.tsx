"use client";

import { animes } from "@/constants/_animes";
import { useAppContext } from "@/context";
import { useEffect, useState } from "react";
import AnimeCard from "./AnimeCard";

const AnimeSearchBar = () => {
  const { setData, setHideLoader } = useAppContext();
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (search) {
      setData(
        animes
          .filter(
            (anime: any) =>
              anime.title.toLowerCase().startsWith(search.toLowerCase()) ||
              anime.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((item: any, index: number) => (
            <AnimeCard
              key={(Math.random() * 1000000).toFixed()}
              anime={item}
              index={index}
            />
          ))
      );
      setHideLoader(true);
    }
  }, [search]);

  return (
    <div className="max-w-[600px] w-full mx-auto my-20">
      <h1 className="text-primary text-3xl font-semibold text-center mb-5">
        Search For anime
      </h1>
      <input
        type="text"
        className="p-3 border-2 border-primary rounded-lg text-lg text-white bg-bg-color w-full"
        style={{ outline: "none" }}
        placeholder="Search for you favorite Anime"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default AnimeSearchBar;
