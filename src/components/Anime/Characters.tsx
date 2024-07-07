"use client";

import { useAppContext } from "@/context";
import Header from "../Shared/Header";

import Image from "next/image";

interface CharactersProps {
  data: any[];
  url?: string;
  id?: string;
}

const Characters = ({ data, id, url }: CharactersProps) => {
  const { color } = useAppContext();
  return (
    <section className="container">
      <Header title="Characters" />
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-10 bg-bg-color-2 p-2 md:p-5 rounded-lg">
        {data.map((anime, index) =>
          index < 20 ? (
            <div className="p-3 bg-bg-color rounded-lg" key={index}>
              <div className="relative h-[40vh] md:h-[33vh] w-full">
                <Image
                  src={anime.character.images.jpg.image_url}
                  fill
                  sizes="100%"
                  className="max-w-full object-cover mx-auto rounded-lg"
                  alt="anime img"
                />
              </div>
              <h1 className="text-white font-semibold text-lg line-clamp-1">
                {anime.character.name}
              </h1>
              <p
                className={`${
                  color === "yellow" ? "text-primary2" : "text-primary"
                } `}
              >
                {anime.role}
              </p>
            </div>
          ) : (
            ""
          )
        )}
      </div>
    </section>
  );
};

export default Characters;
