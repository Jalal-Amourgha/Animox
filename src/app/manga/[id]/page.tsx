"use client";
import {
  Characters,
  MangaDetails,
  Recommendations,
  Reviews,
} from "@/components";
import { manga } from "@/constants/_manga";

import { useEffect, useState } from "react";

interface PageProps {
  params: {
    id: string;
  };
}

const MangaPage = ({ params }: PageProps) => {
  const [mangaDetails, setMangaDetails] = useState<any>({ mal_id: "" });

  useEffect(() => {
    if (params.id) {
      setMangaDetails(manga.find((manga) => +manga.mal_id === +params.id));
    }
  }, [params.id]);

  return (
    <>
      {mangaDetails.mal_id && <MangaDetails data={mangaDetails} userId="'''" />}

      {mangaDetails.mal_id && (
        <Recommendations
          data={manga.filter(
            (manga) =>
              manga.mal_id !== mangaDetails.mal_id &&
              manga.genres.some((genre) => mangaDetails.genres.includes(genre))
          )}
          color="primary2"
        />
      )}
    </>
  );
};

export default MangaPage;
