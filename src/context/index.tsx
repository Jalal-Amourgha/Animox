"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { fetchData } from "@/actions/FetchData";
import { usePathname } from "next/navigation";

const AppContext = createContext<any>(undefined);

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const baseUrl = "https://api.jikan.moe/v4/";
  const { inView, ref } = useInView();
  let [data, setData] = useState<any[]>([]);
  let [page, setPage] = useState<number>(1);
  const [selectedFilter, setSelectedFilter] = useState<any>("");
  const [fetchingPopularAnimes, setFetchingPopularAnimes] =
    useState<boolean>(true);

  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [popupMsg, setPopupMsg] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const pathname = usePathname();

  useEffect(() => {
    let color = pathname.includes("manga") ? "yellow" : "green";
    setColor(color);
  }, [pathname]);

  useEffect(() => {
    if (inView && fetchingPopularAnimes) {
      fetchData(
        `${baseUrl}anime?page=${page}&limit=20&order_by=popularity`,
        "anime"
      ).then((res) => {
        setData([...data, ...res]);
      });
      setPage((prev) => prev + 1);
    }
  }, [inView, fetchingPopularAnimes]);

  return (
    <AppContext.Provider
      value={{
        data,
        inView,
        ref,
        page,
        pathname,
        selectedFilter,
        showPopup,
        popupMsg,
        color,

        setData,
        setPage,

        setSelectedFilter,
        fetchingPopularAnimes,
        setFetchingPopularAnimes,
        setShowPopup,
        setPopupMsg,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
