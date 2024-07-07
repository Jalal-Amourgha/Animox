"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaUser } from "react-icons/fa";
import { useAppContext } from "@/context";

interface AnimeRecommendationsProps {
  data: any[];
  id?: string;
  url?: string;
}

const Recommendations = ({ data, id, url }: AnimeRecommendationsProps) => {
  const { color } = useAppContext();
  const router = useRouter();

  const viewAnimeDetails = (id: any) => {
    router.push(`/anime/${id}`);
  };

  return (
    <div className="container mt-[100px]">
      <h1
        className={`text-3xl ${
          color === "yellow" ? "text-primary2" : "text-primary "
        } font-semibold mb-6`}
      >
        Recommended Animes :
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-10">
        {data.map((anime, index) =>
          index < 18 ? (
            <div
              className="relative "
              key={index}
              onClick={() => viewAnimeDetails(anime.entry.mal_id)}
            >
              <div className="relative w-full h-[45vh]">
                <Image
                  src={anime.entry.images.jpg.large_image_url}
                  fill
                  sizes="100%"
                  className="max-w-full h-full object-cover cursor-pointer rounded-lg"
                  alt="anie img"
                />
                <div
                  className={`absolute top-1 left-1 ${
                    color === "yellow" ? "bg-primary2" : "bg-primary "
                  } py-1 px-2 text-lg text-bg-color flex items-center rounded-full`}
                >
                  <FaUser className="me-2" /> {anime.votes}
                </div>
              </div>
              <h1 className="text-xl font-semibold line-clamp-1">
                {anime.entry.title}
              </h1>
            </div>
          ) : (
            ""
          )
        )}
      </div>
    </div>
  );
};

export default Recommendations;
