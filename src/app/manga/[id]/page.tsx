"use client";
import { fetchDataDetails } from "@/actions/FetchDataDetails";
import {
  AnimeDetails,
  Characters,
  MangaDetails,
  Recommendations,
  Reviews,
} from "@/components";
import { usePathname } from "next/navigation";
import { FC, useEffect, useState } from "react";

interface PageProps {
  params: {
    id: string;
  };
}

const MangaPage: FC<PageProps> = ({ params }) => {
  const [mangaDetails, setMangaDetails] = useState([]);
  const [mangaCharacters, setMangaCharacters] = useState<any>([]);
  const [mangaRecommendations, setMangaRecommendations] = useState<any>([]);
  const [mangaStats, setMangaStats] = useState([]);
  const [mangaReviews, setMangaReviews] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  let fetchOneTime = true;

  useEffect(() => {
    let countdownInterval: any;
    if (params.id && fetchOneTime) {
      fetchDataDetails(`https://api.jikan.moe/v4/manga/${params.id}`).then(
        (res) => {
          setMangaDetails(res);
        }
      );
      fetchDataDetails(
        `https://api.jikan.moe/v4/manga/${params.id}/statistics`
      ).then((res) => {
        setMangaStats(res);
      });
      fetchDataDetails(
        `https://api.jikan.moe/v4/manga/${params.id}/characters`
      ).then((res) => {
        setMangaCharacters(res.slice(0, 25));
      });
      fetchDataDetails(
        `https://api.jikan.moe/v4/manga/${params.id}/recommendations`
      ).then((res) => {
        setMangaRecommendations(res.slice(0, 25));
      });
      fetchDataDetails(
        `https://api.jikan.moe/v4/manga/${params.id}/reviews`
      ).then((res) => {
        setMangaReviews(res);
      });
    }

    fetchOneTime = false;

    countdownInterval = setInterval(() => {
      setIsLoading(false);
    }, 4000);

    return () => {
      clearInterval(countdownInterval);
    };
  }, [params.id]);

  if (isLoading) {
    return <h1 className="mt-[200px] text-4xl text-center text-white"></h1>;
  }
  return (
    <>
      <MangaDetails data={mangaDetails} stats={mangaStats} userId="'''" />

      <Characters data={mangaCharacters} />
      <Recommendations data={mangaRecommendations} />
      <Reviews data={mangaReviews} />
    </>
  );
};

export default MangaPage;
