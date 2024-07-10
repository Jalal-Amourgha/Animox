"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { AnimeCard } from "@/components";
import { animes } from "@/constants/_animes";

const AppContext = createContext<any>(undefined);

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const { inView, ref } = useInView();
  let [data, setData] = useState<any>(
    animes
      .slice(0, 18)
      .map((item: any, index: number) => (
        <AnimeCard
          key={(Math.random() * 1000000).toFixed()}
          anime={item}
          index={index}
        />
      ))
  );
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

  // This useeffect when ever user scroll down but only for popular anime

  useEffect(() => {
    if (inView) {
      if (page === 6) {
        return setHideLoader(true);
      }
      var newAnimes = animes
        .slice(data.length, 12 * page)
        .map((item: any, index: number) => (
          <AnimeCard
            key={(Math.random() * 1000000).toFixed()}
            anime={item}
            index={index}
          />
        ));
      setData([...data, ...newAnimes]);
    }
  }, [inView]);

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
