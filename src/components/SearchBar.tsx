"use client";

import { AnimesList } from "@/_data";
import { fetchData } from "@/actions/FetchData";
import { useAppContext } from "@/context";
import { Combobox, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
const SearchBar = ({ type }: { type: string }) => {
  const { setData, setMangaData, color } = useAppContext();
  const [selectedAnime, setSelectedAnime] = useState<string>("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!selectedAnime) {
      return console.log("stop");
    }

    if (type === "manga") {
      fetchData(
        `https://api.jikan.moe/v4/manga?q=${selectedAnime}&limit=1`,
        "manga"
      ).then((res) => {
        setMangaData(res);
      });
    } else {
      fetchData(
        `https://api.jikan.moe/v4/anime?q=${selectedAnime}&limit=1`,
        "anime"
      ).then((res) => {
        setData(res);
      });
    }
  }, [selectedAnime]);

  const filteredAnimes =
    query === ""
      ? AnimesList
      : AnimesList.filter((anime) =>
          anime
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );
  return (
    <>
      <div
        className={`bg-bg-color max-w-[600px] mx-auto mt-[50px] relative ${
          query !== ""
            ? `border-x-2 border-b-2 rounded-lg ${
                color === "yellow" ? "border-primary2" : "border-primary"
              }`
            : ""
        }`}
      >
        <h1
          className={`text-4xl ${
            color === "yellow" ? "text-primary2" : "text-primary"
          } md:text-center font-semibold mb-8`}
        >
          Search For <span className="capitalize">{type}</span>
        </h1>
        <Combobox value={selectedAnime} onChange={setSelectedAnime}>
          <div
            className={`${
              type === "manga" ? "relative overflow-hidden rounded-full" : ""
            } w-full`}
          >
            <Combobox.Input
              className={`w-full bg-bg-color text-white border-2 ${
                type === "manga" ? "rounded-full" : "rounded-lg"
              }
        ${
          color === "yellow" ? "border-primary2" : "border-primary"
        } text-xl p-3 mx-auto  outline-none`}
              placeholder={`Seach for your favorite ${
                color === "primary" ? "Anime" : "Manga"
              }`}
              displayValue={(item: string) => item}
              onChange={(e) => setQuery(e.target.value)}
            />
            {type === "manga" ? (
              <div className="absolute top-0 right-0 bg-primary2 text-bg-color text-3xl font-bold h-full w-14 flex justify-center items-center cursor-pointer">
                <IoIosSearch />
              </div>
            ) : (
              ""
            )}
          </div>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options
              className={`w-full h-[400px] absolute top-[60px] left-0 bg-bg-color z-[15] ${
                color === "yellow" ? "border-primary2" : "border-primary"
              } border-2 ${
                type === "manga" ? "rounded-xl" : "rounded-lg"
              } overflow-y-scroll`}
            >
              {filteredAnimes.map((anime: string, index: number) => (
                <Combobox.Option
                  key={index}
                  className={({ active }) =>
                    `text-xl p-4 my-2 rounded-lg cursor-pointer ${
                      active
                        ? `${
                            color === "primay" ? "bg-primary" : "bg-primary2"
                          } text-bg-color`
                        : "text-white"
                    }`
                  }
                  value={anime}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {anime}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? "text-white" : "text-teal-600"
                          }`}
                        ></span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Transition>
        </Combobox>
      </div>
    </>
  );
};

export default SearchBar;
