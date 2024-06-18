"use client";
import { useState, useEffect } from "react";
import { Button, SectionHeader } from "@/components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from "next/navigation";

import Image from "next/image";
import { format } from "date-fns";
import { TbRulerMeasure } from "react-icons/tb";

interface PopularAnimesProps {
  title?: string;
  type?: string;
  id?: string;
  url?: string;
  api?: string;
  header?: boolean;
  btn?: boolean;
}

const AnimeSlider = ({
  title,
  type,
  id,
  url,
  header = true,
  btn = true,
}: PopularAnimesProps) => {
  const [data, setData] = useState<any[]>([]);
  let isLoading = true;
  const router = useRouter();

  const fetchAnimes = async (url: string) => {
    const res = await fetch(url);
    const data = await res.json();

    setData(data.data);
  };

  useEffect(() => {
    if (isLoading) {
      fetchAnimes(url as string);
    }
    isLoading = false;
  }, [url]);

  const handlePuplishedAt = (date: string) => {
    return format(new Date(date), "d MMM yyyy");
  };

  const viewMore = () => {
    // router.push("/anime");
  };

  const viewAnimeDetails = (id: string) => {
    // router.push(`/anime/${id}`);
  };

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

  return (
    <section className="my-10">
      <div className="container">
        {header ? <SectionHeader title={title} /> : ""}

        {!data ? (
          <h1>Loading ...</h1>
        ) : (
          <Slider {...settings}>
            {data.map((anime, index) => (
              <div
                className="relative h-[50vh] md:h-[40vh] w-full"
                key={index}
                onClick={() => viewAnimeDetails(anime.mal_id)}
              >
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
            <Button title="View all" bg={true} handleClick={viewMore} />
          </div>
        ) : (
          ""
        )}
      </div>
    </section>
  );
};

export default AnimeSlider;
