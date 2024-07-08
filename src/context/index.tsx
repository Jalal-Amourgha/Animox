"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
// import { fetchData } from "@/actions/FetchData";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { AnimeProps } from "@/types";
import { AnimeCard } from "@/components";
import { scores, seasons, types, status } from "@/constants/_data";

const AppContext = createContext<any>(undefined);

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const baseUrl = "https://api.jikan.moe/v4/";
  const { inView, ref } = useInView();
  let [data, setData] = useState<any[]>([]);
  let [page, setPage] = useState<number>(1);
  const [selectedFilter, setSelectedFilter] = useState<any>("");
  const [fetchingPopularAnimes, setFetchingPopularAnimes] =
    useState<boolean>(true);
  const [hideLoader, setHideLoader] = useState(false);
  const [reFetchUserData, setReFetchUserData] = useState(0);
  const [color, setColor] = useState<string>("");
  const pathname = usePathname();
  const { data: session } = useSession();
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState({
    _id: "",
    email: "",
  });
  const [fetchOneTime, setFetchOneTime] = useState(true);

  // Fetching All Users
  const fetchUsers = async () => {
    const res = await fetch("/api/users/9999/all");
    const data = await res.json();

    return setUsers(data);
  };

  // Fetching The User Log in
  const fetchUserInfo = async (id: string) => {
    const response = await fetch(`/api/user/${id}/infos`);
    const data = await response.json();

    setUserData(data);
  };

  useEffect(() => {
    if (session?.user?.email) {
      fetchUserInfo(session?.user?.email);
    }
  }, [session?.user?.email, reFetchUserData]);

  // Changing the color
  useEffect(() => {
    let color = pathname.includes("manga") ? "yellow" : "green";
    setColor(color);
  }, [pathname]);

  useEffect(() => {
    if (!users.length && fetchOneTime) {
      fetchUsers();
      setFetchOneTime(false);
    }
  }, []);

  // This Function responsable for fetching Animes
  const fetchAnimes = async (url: string, type: string) => {
    const res = await fetch(`${url}`, { cache: "no-store" });
    const data = await res.json();

    return data.data.map((item: AnimeProps, index: number) => (
      <AnimeCard
        key={(Math.random() * 1000000).toFixed()}
        anime={item}
        index={index}
      />
    ));
  };

  // This useeffect when ever user scroll down but only for popular anime
  useEffect(() => {
    if (inView && fetchingPopularAnimes) {
      fetchAnimes(
        `${baseUrl}anime?page=${page}&limit=20&order_by=popularity`,
        "anime"
      ).then((res: any) => {
        setData([...data, ...res]);
      });
      setPage((prev) => prev + 1);
    }
  }, [inView, fetchingPopularAnimes]);

  // This useeffect For Fetching animes depend on filter
  useEffect(() => {
    setPage(1);

    if (selectedFilter && fetchingPopularAnimes) {
      setFetchingPopularAnimes(false);
      setData([]);
    }

    if (scores.includes(selectedFilter)) {
      fetchAnimes(
        `${baseUrl}anime?page=1&min_score=${selectedFilter}&max_score=${
          selectedFilter + 1
        }&order_by=popularity`,
        "anime"
      ).then((res) => {
        setData(res);
      });
    } else if (seasons.includes(selectedFilter)) {
      fetchAnimes(
        `${baseUrl}anime?page=1&order_by=popularity&start_date=${selectedFilter}-01-01&end_date=${selectedFilter}-12-12`,
        "anime"
      ).then((res) => {
        setData(res);
      });
    } else if (status.includes(selectedFilter)) {
      fetchAnimes(
        `${baseUrl}anime?page=1&status=${selectedFilter}&order_by=popularity`,
        "anime"
      ).then((res) => {
        setData(res);
      });
    } else if (types.includes(selectedFilter)) {
      fetchAnimes(
        `${baseUrl}anime?page=1&type=${selectedFilter}&order_by=popularity&rating=pg13&rating=r17`,
        "anime"
      ).then((res) => {
        setData(res);
      });
    }
    setHideLoader(false);

    console.log(selectedFilter);
  }, [selectedFilter]);

  // This useeffect For Fetching animes depend on filter if user scroll down
  useEffect(() => {
    if (page > 1 && !fetchingPopularAnimes) {
      if (scores.includes(selectedFilter)) {
        fetchAnimes(
          `${baseUrl}anime?page=${page}&min_score=${selectedFilter}&max_score=${
            selectedFilter + 1
          }&order_by=popularity`,
          "anime"
        ).then((res) => {
          setData([...data, ...res]);
        });
      } else if (seasons.includes(selectedFilter)) {
        fetchAnimes(
          `${baseUrl}anime?page=${page}&order_by=popularity&start_date=${selectedFilter}-01-01&end_date=${selectedFilter}-12-12`,
          "anime"
        ).then((res) => {
          setData([...data, ...res]);
        });
      } else if (status.includes(selectedFilter)) {
        fetchAnimes(
          `${baseUrl}anime?page=${page}&status=${selectedFilter}&order_by=popularity`,
          "anime"
        ).then((res) => {
          setData([...data, ...res]);
        });
      } else if (types.includes(selectedFilter)) {
        fetchAnimes(
          `${baseUrl}anime?page=${page}&type=${selectedFilter}&order_by=popularity&rating=pg13&rating=r17`,
          "anime"
        ).then((res) => {
          setData([...data, ...res]);
        });
      }
    }

    console.log(page);
  }, [page, inView]);

  useEffect(() => {
    if (inView) {
      setPage(page + 1);
    }
  }, [inView]);

  return (
    <AppContext.Provider
      value={{
        data,
        inView,
        ref,
        page,
        pathname,
        selectedFilter,
        color,
        hideLoader,
        reFetchUserData,
        userData,
        users,
        setUserData,
        setReFetchUserData,

        setData,
        setPage,
        setHideLoader,
        setSelectedFilter,
        fetchingPopularAnimes,
        setFetchingPopularAnimes,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
