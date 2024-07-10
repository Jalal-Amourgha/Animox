"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface AnimeRecommendationsProps {
  data: any[];
  color: string;
}

const Recommendations = ({ data, color }: AnimeRecommendationsProps) => {
  const router = useRouter();

  return (
    <div className="container mt-[100px]">
      <h1 className={`text-3xl text-${color}  font-semibold mb-6`}>
        Recommended Animes :
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-10">
        {data.map((anime, index) =>
          index < 12 ? (
            <div
              className="relative "
              key={index}
              onClick={() => router.push(`/anime/${anime.mal_id}`)}
            >
              <div className="relative w-full h-[45vh]">
                <Image
                  src={anime.images}
                  fill
                  sizes="100%"
                  className="max-w-full h-full object-cover cursor-pointer rounded-lg"
                  alt="anie img"
                />
              </div>
              <h1
                className={`text-xl font-semibold line-clamp-1 mt-2 hover:text-${color} cursor-pointer`}
              >
                {anime.title}
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
