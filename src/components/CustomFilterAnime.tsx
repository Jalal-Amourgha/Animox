"use client";

import { useAppContext } from "@/context";
import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { PiCaretUpDownLight } from "react-icons/pi";
import { scores, seasons, status, types } from "@/_data";
import { fetchData } from "@/actions/FetchData";

interface CustomFilterProps {
  dataType: string[] | number[];
  title: string;
  classes?: string;
}

const CustomFilterAnime = ({ dataType, title, classes }: CustomFilterProps) => {
  const {
    setData,
    data,
    page,
    setPage,
    selectedFilter,
    setStopLoader,
    setSelectedFilter,
    fetchingPopularAnimes,
    setFetchingPopularAnimes,
    inView,
    color,
  } = useAppContext();
  const baseUrl = "https://api.jikan.moe/v4/";
  const [selectedOption, setSelectedOption] = useState<any>(title);

  useEffect(() => {
    if (
      selectedOption === "Statu" ||
      selectedOption === "Type" ||
      selectedOption === "Score" ||
      selectedOption === "Year"
    ) {
      return console.log("dw a silva i got u");
    }

    setPage(1);

    if (fetchingPopularAnimes) {
      setFetchingPopularAnimes(false);
      setData([]);
    }

    if (scores.includes(selectedOption)) {
      fetchData(
        `${baseUrl}anime?page=1&min_score=${selectedOption}&max_score=${
          selectedOption + 1
        }&order_by=popularity`,
        "anime"
      ).then((res) => {
        setData(res);
      });
    } else if (seasons.includes(selectedOption)) {
      fetchData(
        `${baseUrl}anime?page=1&order_by=popularity&start_date=${selectedOption}-01-01&end_date=${selectedOption}-12-12`,
        "anime"
      ).then((res) => {
        setData(res);
      });
    } else if (status.includes(selectedOption)) {
      fetchData(
        `${baseUrl}anime?page=1&status=${selectedOption}&order_by=popularity`,
        "anime"
      ).then((res) => {
        setData(res);
      });
    } else if (types.includes(selectedOption)) {
      fetchData(
        `${baseUrl}anime?page=1&type=${selectedOption}&order_by=popularity&rating=pg13&rating=r17`,
        "anime"
      ).then((res) => {
        setData(res);
      });
    }

    console.log("done");

    setStopLoader(false);
    setSelectedFilter(selectedOption);
  }, [selectedOption, fetchingPopularAnimes]);

  useEffect(() => {
    if (page > 1) {
      if (
        selectedOption === "Statu" ||
        selectedOption === "Type" ||
        selectedOption === "Score" ||
        selectedOption === "Year"
      ) {
        return console.log("You Cant");
      }

      if (scores.includes(selectedFilter)) {
        fetchData(
          `${baseUrl}anime?page=${page}&min_score=${selectedFilter}&max_score=${
            selectedFilter + 1
          }&order_by=popularity`,
          "anime"
        ).then((res) => {
          setData([...data, ...res]);
        });
      } else if (seasons.includes(selectedFilter)) {
        fetchData(
          `${baseUrl}anime?page=1&order_by=popularity&start_date=${selectedFilter}-01-01&end_date=${selectedFilter}-12-12`,
          "anime"
        ).then((res) => {
          setData([...data, ...res]);
        });
      } else if (status.includes(selectedFilter)) {
        fetchData(
          `${baseUrl}anime?page=1&status=${selectedFilter}&order_by=popularity`,
          "anime"
        ).then((res) => {
          setData([...data, ...res]);
        });
      } else if (types.includes(selectedFilter)) {
        fetchData(
          `${baseUrl}anime?page=1&type=${selectedFilter}&order_by=popularity&rating=pg13&rating=r17`,
          "anime"
        ).then((res) => {
          setData([...data, ...res]);
        });
      }
    }
    console.log("done 2");
  }, [page]);

  useEffect(() => {
    if (inView) {
      setPage(page + 1);
    }
  }, [inView]);

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
              className={`bg-bg-color border-2 ${
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
