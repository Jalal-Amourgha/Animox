"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Header from "../Shared/Header";
import { Button } from "../Shared/Button";
import { AnimeProps, PopularAnimesProps } from "@/types";

const AnimeSlider = ({
  title,
  data = [],
  header = true,
  btn = true,
}: PopularAnimesProps) => {
  const router = useRouter();

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    arrows: false,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1304,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (!data) {
    return;
  }
  return (
    <section className="my-10">
      <div className="container">
        {header && <Header title={title as string} />}

        {!data ? (
          <h1>Loading ...</h1>
        ) : (
          <Slider {...settings}>
            {data &&
              data.map((anime: AnimeProps, index) => (
                <div key={index}>
                  <div className="relative h-[50vh] md:h-[40vh] w-full">
                    <Image
                      src={anime.images}
                      sizes="100%"
                      fill
                      className="rounded-lg object-cover cursor-pointer"
                      alt="anime img"
                    />
                  </div>
                  <h1
                    className="text-xl text-white font-semibold hover:text-primary line-clamp-1 mt-2 cursor-pointer"
                    onClick={() => router.push(`/anime/${anime.mal_id}`)}
                  >
                    {anime.title}
                  </h1>
                </div>
              ))}
          </Slider>
        )}

        {btn ? (
          <div className="text-center my-10">
            <Button
              title="View all"
              bg={true}
              handleClick={() => router.push("/anime")}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </section>
  );
};

export default AnimeSlider;
