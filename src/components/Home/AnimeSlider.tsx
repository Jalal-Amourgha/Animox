"use client";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Header from "../Shared/Header";
import { Button } from "../Shared/Button";
import { PopularAnimesProps } from "@/types";

const AnimeSlider = ({
  title,
  type,
  id,
  url,
  header = true,
  btn = true,
}: PopularAnimesProps) => {
  const [data, setData] = useState<any[]>([]);

  const router = useRouter();

  const fetchAnimes = async (url: string) => {
    const res = await fetch(url);
    const data = await res.json();
    return setData(data.data);
  };

  useEffect(() => {
    if (url) {
      fetchAnimes(url);
    }
  }, [url]);

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
            {data.map((anime, index) => (
              <div className="relative h-[50vh] md:h-[40vh] w-full" key={index}>
                <Image
                  src={anime.images.jpg.large_image_url}
                  sizes="100%"
                  fill
                  className="rounded-lg object-cover cursor-pointer"
                  alt="anime img"
                />
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
