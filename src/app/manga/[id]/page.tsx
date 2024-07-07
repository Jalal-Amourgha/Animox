"use client";
import { fetchDataDetails } from "@/actions/FetchDataDetails";
import {
  Characters,
  MangaDetails,
  Recommendations,
  Reviews,
} from "@/components";

import { useEffect, useState } from "react";

interface PageProps {
  params: {
    id: string;
  };
}

const MangaPage = ({ params }: PageProps) => {
  const [mangaDetails, setMangaDetails] = useState({ mal_id: "" });
  const [mangaCharacters, setMangaCharacters] = useState<any>([]);
  const [mangaRecommendations, setMangaRecommendations] = useState<any>([]);
  const [mangaStats, setMangaStats] = useState([]);
  const [mangaReviews, setMangaReviews] = useState<any>([]);

  let fetchOneTime = true;

  useEffect(() => {
    if (params.id && fetchOneTime) {
      fetchDataDetails(`https://api.jikan.moe/v4/manga/${params.id}`).then(
        (res) => {
          setMangaDetails(res);
          console.log(res);
        }
      );
      fetchDataDetails(
        `https://api.jikan.moe/v4/manga/${params.id}/statistics`
      ).then((res) => {
        setMangaStats(res);
        console.log(res);
      });
      fetchDataDetails(
        `https://api.jikan.moe/v4/manga/${params.id}/characters`
      ).then((res) => {
        setMangaCharacters(res.slice(0, 25));
        console.log(res);
      });
      fetchDataDetails(
        `https://api.jikan.moe/v4/manga/${params.id}/recommendations`
      ).then((res) => {
        setMangaRecommendations(res.slice(0, 25));
        console.log(res);
      });
      fetchDataDetails(
        `https://api.jikan.moe/v4/manga/${params.id}/reviews`
      ).then((res) => {
        setMangaReviews(res);
        console.log(res);
      });
    }

    fetchOneTime = false;
  }, [params.id]);

  return (
    <>
      {mangaDetails.mal_id && mangaStats && (
        <MangaDetails data={mangaDetails} userId="'''" />
      )}

      {mangaCharacters && <Characters data={mangaCharacters} />}

      {mangaRecommendations && <Recommendations data={mangaRecommendations} />}
      {mangaReviews && <Reviews data={mangaReviews} />}
    </>
  );
};

export default MangaPage;
