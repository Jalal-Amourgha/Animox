"use client";

import { fetchData } from "@/actions/FetchData";
import { mangaTypes } from "@/constants/_data";
import { useAppContext } from "@/context";
import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";

const FilterManga = () => {
  const [data, setData] = useState<any>([]);
  const [selectedMangaType, setSelectedMangaType] = useState<String>("manga");
  const [page, setPage] = useState<number>(1);

  const handleSelectedType = (type: string) => {
    setSelectedMangaType(type);
    setPage(1);
  };

  const handleChange = (e: any, p: any) => {
    setPage(p);
    window.scrollTo({
      top: 400,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    fetchData(
      `https://api.jikan.moe/v4/manga?type=${selectedMangaType}&page=${page}&order_by=popularity&sfw=false&limit=24`,
      "manga"
    ).then((res) => {
      setData(res);
    });
  }, [selectedMangaType, page]);

  useEffect(() => {
    setPage(1);
  }, [selectedMangaType]);

  if (!data) {
    return;
  }

  return (
    <>
      <div className="max-w-[800px] mx-auto my-[80px] flex justify-center flex-wrap gap-5">
        {mangaTypes.map((type, index) => (
          <div
            className={`${
              selectedMangaType === type.type ? "bg-primary2" : "bg-white"
            }  text-center text-xl py-2 px-4 rounded-full text-bg-color font-semibold hover:bg-primary2 cursor-pointer`}
            onClick={() => handleSelectedType(type.type)}
            key={index}
          >
            {type.name}
          </div>
        ))}
      </div>

      <div className="container grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-10">
        {data}
      </div>

      <div className="w-fit text-white mx-auto mt-24">
        <Pagination
          count={10}
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
