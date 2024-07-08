"use client";

import { fetchDataDetails } from "@/actions/FetchDataDetails";
import {
  AnimeDetails,
  AnimeTrailer,
  Characters,
  Loader,
  Recommendations,
  Reviews,
} from "@/components";

import { useSession } from "next-auth/react";
import React, { FC, useEffect, useState } from "react";

interface AnimePageProps {
  params: {
    id: string;
  };
}

const AnimePage: FC<AnimePageProps> = ({ params }) => {
  // const { data: session } = useSession();

  const [animeDetails, setAnimeDetails] = useState<any>({ mal_id: "" });
  const [animeCharacters, setAnimeCharacters] = useState<any>([]);
  const [animeRecommendations, setAnimeRecommendations] = useState<any>([]);
  const [animeReviews, setAnimeReviews] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string>("");
  let fetchOneTime = true;

  const fetchAnimeReview = async () => {
    const res = await fetch(
      `https://api.jikan.moe/v4/anime/${params.id}/reviews`
    );

    const data = await res.json();

    return setAnimeReviews(data.data);
  };

  useEffect(() => {
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

      fetchAnimeReview();
    }

    fetchOneTime = false;
  }, [params.id]);

  useEffect(() => {
    if (
      animeDetails.mal_id &&
      animeCharacters &&
      animeRecommendations &&
      animeReviews
    ) {
      setIsLoading(false);
    }
  }, [animeDetails, animeCharacters, animeRecommendations, animeReviews]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <AnimeDetails data={animeDetails} userId={userId} />

      <Characters data={animeCharacters} />

      {animeDetails && animeDetails.trailer && (
        <AnimeTrailer url={animeDetails.trailer.embed_url} />
      )}

      {animeRecommendations && <Recommendations data={animeRecommendations} />}

      {animeReviews && <Reviews data={animeReviews} />}
    </>
  );
};

export default AnimePage;
