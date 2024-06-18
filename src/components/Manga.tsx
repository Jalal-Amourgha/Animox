"use client";

import { fetchData } from "@/actions/FetchData";
import { useAppContext } from "@/context";
import { useEffect } from "react";

const Manga = () => {
  const { mangaData, setMangaData, selectedMangaType, mangaPage } =
    useAppContext();

  return <h1>dsadadadada</h1>;
};

export default Manga;
