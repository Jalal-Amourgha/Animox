"use client";

import { mangaTypes } from "@/constants/_data";
import { manga } from "@/constants/_manga";
import { IoIosSearch } from "react-icons/io";
import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import MangaCard from "./MangaCard";

const FilterManga = () => {
  const [data, setData] = useState<any>(
    manga.map((manga: any, index: number) => (
      <MangaCard
        key={(Math.random() * 1000000).toFixed()}
        manga={manga}
        index={index}
      />
    ))
  );
  const [selectedMangaType, setSelectedMangaType] = useState<String>("All");
  const [hidePagination, setHidePagination] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState("");

  const handleChange = (e: any, p: any) => {
    setPage(p);
    window.scrollTo({
      top: 400,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (selectedMangaType === "All") {
      return setData(
        manga
          .slice(12 * (page - 1), 12 * page)
          .map((item: any, index: number) => (
            <MangaCard
              key={(Math.random() * 1000000).toFixed()}
              manga={item}
              index={index}
            />
          ))
      );
    }

    setPage(1);
    setData(
      manga
        .filter((manga) => manga.type === selectedMangaType)
        .map((manga: any, index: number) => (
          <MangaCard
            key={(Math.random() * 1000000).toFixed()}
            manga={manga}
            index={index}
          />
        ))
    );
  }, [selectedMangaType, page]);

  useEffect(() => {
    if (search) {
      setData(
        manga
          .filter(
            (manga: any) =>
              manga.title.toLowerCase().startsWith(search.toLowerCase()) ||
              manga.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((manga: any, index: number) => (
            <MangaCard
              key={(Math.random() * 1000000).toFixed()}
              manga={manga}
              index={index}
            />
          ))
      );

      setHidePagination(true);
    }
  }, [search]);

  if (!data) {
    return;
  }

  return (
    <>
      <div className="max-w-[600px] mx-auto my-[80px] ">
        <h1 className="text-3xl font-semibold text-primary2 mb-5 text-center">
          Search For your Favorite Manga
        </h1>
        <div className="relative rounded-full overflow-hidden">
          <input
            type="text"
            className="p-3 w-full bg-bg-color text-lg text-white border-2 border-primary2 rounded-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search For your Favorite Manga"
          />
          <div className="absolute top-0 right-0 h-full w-14 flex items-center justify-center text-2xl text-bg-color bg-primary2 cursor-pointer">
            <IoIosSearch />
          </div>
        </div>
      </div>
      <div className="max-w-[800px] mx-auto my-[80px] flex justify-center flex-wrap gap-5">
        {mangaTypes.map((type, index) => (
          <div
            className={`${
              selectedMangaType === type ? "bg-primary2" : "bg-white"
            }  text-center text-xl py-2 px-4 rounded-full text-bg-color font-semibold hover:bg-primary2 cursor-pointer`}
            onClick={() => setSelectedMangaType(type)}
            key={index}
          >
            {type}
          </div>
        ))}
      </div>

      <div className="container grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-10">
        {data}
      </div>

      <div
        className={`${
          selectedMangaType !== "All" || hidePagination ? "hidden" : ""
        } w-fit text-white mx-auto mt-24`}
      >
        <Pagination
          count={4}
          shape="rounded"
          onChange={handleChange}
          page={page}
          size="large"
        />
      </div>
    </>
  );
};

export default FilterManga;
