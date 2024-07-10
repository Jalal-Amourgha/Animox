"use client";

import {
  AnimeDetails,
  AnimeTrailer,
  Loader,
  Recommendations,
  ReviewCard,
} from "@/components";
import { animes } from "@/constants/_animes";
import { reviews } from "@/constants/_reviews";
import { useAppContext } from "@/context";
import { UserProps } from "@/types";

import { useSession } from "next-auth/react";
import React, { FC, use, useEffect, useState } from "react";

interface AnimePageProps {
  params: {
    id: string;
  };
}

const AnimePage: FC<AnimePageProps> = ({ params }) => {
  const { users } = useAppContext();
  const [animeDetails, setAnimeDetails] = useState<any>({ mal_id: "" });
  const [userId, setUserId] = useState<string>("");
  const [a, setA] = useState<any>("");

  useEffect(() => {
    if (params.id) {
      setAnimeDetails(animes.find((anime) => +anime.mal_id === +params.id));
    }
    console.log(users);
  }, [params.id]);

  useEffect(() => {
    console.log(
      users.filter((user: UserProps) =>
        user.reviews.some((review: any) => review.id === animeDetails.mal_id)
      ).length
    );
  }, [a]);

  if (!animeDetails.mal_id) {
    return <Loader />;
  }

  return (
    <>
      <AnimeDetails data={animeDetails} userId={userId} />

      <input
        type="text"
        className="bg-bg-color text-white"
        value={a}
        onChange={(e) => setA(e.target.value)}
      />

      {/* {animeDetails && animeDetails.trailer && (
        <AnimeTrailer url={animeDetails.trailer} />
      )} */}

      <Recommendations
        data={animes.filter(
          (anime) =>
            anime.mal_id !== animeDetails.mal_id &&
            anime.genres.some((genre) => animeDetails.genres.includes(genre))
        )}
        color="primary"
      />

      {users &&
        animeDetails &&
        users.filter((user: UserProps) =>
          user.reviews.some((review: any) => review.id === animeDetails.mal_id)
        ).length && (
          <div className="container mt-20">
            <h1 className="text-3xl text-primary font-semibold mb-10">
              Reviews :
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
              {users &&
                animeDetails &&
                users.filter((user: UserProps) =>
                  user.reviews.some(
                    (review: any) => review.id === animeDetails.mal_id
                  )
                ).length &&
                users
                  .filter((user: UserProps) =>
                    user.reviews.some(
                      (review: any) => review.id === animeDetails.mal_id
                    )
                  )
                  .map((user: any, index: number) => (
                    <ReviewCard
                      userData={user}
                      userReview={user.reviews.find(
                        (review: any) => review.id === animeDetails.mal_id
                      )}
                    />
                  ))}
            </div>
          </div>
        )}
    </>
  );
};

export default AnimePage;
