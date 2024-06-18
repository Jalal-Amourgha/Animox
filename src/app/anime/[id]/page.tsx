"use client";

import { fetchDataDetails } from "@/actions/FetchDataDetails";
import {
  AnimeDetails,
  Recommendations,
  AnimeSlider,
  Characters,
  AnimeTrailer,
  Reviews,
  Loading,
  Popup,
} from "@/components";
import { useSession } from "next-auth/react";
import React, { FC, useEffect, useState } from "react";

interface AnimePageProps {
  params: {
    id: string;
  };
}

const AnimePage: FC<AnimePageProps> = ({ params }) => {
  const { data: session } = useSession();

  const [animeDetails, setAnimeDetails] = useState<any>();
  const [animeCharacters, setAnimeCharacters] = useState<any>([]);
  const [animeRecommendations, setAnimeRecommendations] = useState<any>([]);
  const [animeReviews, setAnimeReviews] = useState<any>([]);
  const [userId, setUserId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  let fetchOneTime = true;

  useEffect(() => {
    if (session?.user?.email) {
      setUserId(session?.user?.email);
    }
  }, [session?.user?.email]);

  useEffect(() => {
    let countdownInterval: any;
    if (params.id && fetchOneTime) {
      fetchDataDetails(`https://api.jikan.moe/v4/anime/${params.id}`).then(
        (res) => {
          setAnimeDetails(res);
        }
      );
      fetchDataDetails(
        `https://api.jikan.moe/v4/anime/${params.id}/characters`
      ).then((res) => {
        setAnimeCharacters(res.slice(0, 25));
      });
      fetchDataDetails(
        `https://api.jikan.moe/v4/anime/${params.id}/recommendations`
      ).then((res) => {
        setAnimeRecommendations(res.slice(0, 25));
      });
      fetchDataDetails(
        `https://api.jikan.moe/v4/anime/${params.id}/reviews`
      ).then((res) => {
        setAnimeReviews(res);
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
      <AnimeDetails data={animeDetails} userId={userId} />

      <Characters data={animeCharacters} />

      {animeDetails && animeDetails.trailer && (
        <AnimeTrailer url={animeDetails.trailer.embed_url} />
      )}

      <Recommendations data={animeRecommendations} />

      <Reviews data={animeReviews} />
      <Popup />
    </>
  );
};

export default AnimePage;
