"use client";

import { animes } from "@/constants/_animes";
import {
  genres,
  scores,
  seasons,
  sources,
  status,
  types,
} from "@/constants/_data";
import { useAppContext } from "@/context";
import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { PiCaretUpDownLight } from "react-icons/pi";
import AnimeCard from "./AnimeCard";

interface CustomFilterProps {
  dataType: string[] | number[];
  title: string;
  classes?: string;
}

const CustomFilterAnime = ({ dataType, title, classes }: CustomFilterProps) => {
  const { setData, color } = useAppContext();
  const [selectedOption, setSelectedOption] = useState<any>(title);

  useEffect(() => {
    var newData: any = [];
    if (
      selectedOption === "Source" ||
      selectedOption === "Genre" ||
      selectedOption === "Score" ||
      selectedOption === "Year"
    ) {
      return;
    }

    if (scores.includes(selectedOption)) {
      newData = animes.filter((anime: any) => +anime.score >= +selectedOption);
    } else if (seasons.includes(selectedOption)) {
      newData = animes.filter((anime: any) => +anime.year === +selectedOption);
    } else if (sources.includes(selectedOption)) {
      newData = animes.filter((anime: any) => anime.source === selectedOption);
    } else if (genres.includes(selectedOption)) {
      newData = animes.filter((anime: any) =>
        anime.genres.includes(selectedOption)
      );
    }

    setData(
      newData.map((item: any, index: number) => (
        <AnimeCard
          key={(Math.random() * 1000000).toFixed()}
          anime={item}
          index={index}
        />
      ))
    );
  }, [selectedOption]);

  return (
    <div className="relative">
      <Listbox value={selectedOption} onChange={setSelectedOption}>
        <div className="relative mt-1">
          <Listbox.Button
            className={`relative text-xl border-2 ${
              color === "yellow" ? "border-primary2" : "border-primary"
            } rounded-lg bg-bg-color ${
              color === "yellow" ? "text-primary2" : "text-primary"
            } p-3  pr-10 text-left 
          w-[150px]`}
          >
            <span className="block truncate">{selectedOption}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <PiCaretUpDownLight />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              className={`bg-bg-color border-2 hide__scrollbar ${
                color === "yellow" ? "border-primary2" : "border-primary"
              } h-[350px] w-[150px] absolute top-[60px] right-0
                z-[9] overflow-y-auto rounded-lg `}
            >
              {dataType.map((item) => (
                <Listbox.Option
                  key={item}
                  className={({ active }) =>
                    `text-xl my-3 p-3 rounded-md cursor-pointer select-none  
                      ${
                        active
                          ? `bg-[#4a4a4a] ${
                              color === "yellow"
                                ? "text-primary2"
                                : "text-primary"
                            }`
                          : "text-white"
                      }`
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {item}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default CustomFilterAnime;
