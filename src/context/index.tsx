"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { fetchData } from "@/actions/FetchData";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

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

  const fetchUsers = async () => {
    const res = await fetch("/api/users/9999/all");
    const data = await res.json();

    return setUsers(data);
  };

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

  useEffect(() => {
    if (!users.length && fetchOneTime) {
      fetchUsers();
      setFetchOneTime(false);
    }
  }, []);

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
