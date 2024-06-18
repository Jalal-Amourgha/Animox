"use client";

import { AnimeReviewsProps } from "@/types";
import { useEffect, useState } from "react";
import { format, formatDistanceToNowStrict } from "date-fns";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import Image from "next/image";

interface ReviewsProps {
  data: any[];
  url?: string;
}

const Reviews = ({ data }: ReviewsProps) => {
  // const [data, setData] = useState<AnimeReviewsProps[]>([]);
  // const [fetchOneTime, setFetchOneTime] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);
  // let delay: any;

  // const fetchAnimeReviews = async (url: string) => {
  //   const res = await fetch(url);
  //   const data = await res.json();

  //   setData(data.data);
  // };

  // useEffect(() => {
  //   if (fetchOneTime && url) {
  //     fetchAnimeReviews(url);
  //   }
  // }, []);

  const handleReviews = (review: string, showMore: boolean) => {
    let reviews = review.split("\n").filter((str) => str !== "");
    let limit = showMore ? 999 : 1;

    return reviews.map((review, index) =>
      index < limit ? (
        <p className="mb-5" key={index}>
          {review}
        </p>
      ) : (
        ""
      )
    );
  };

  const handlePuplishedIn = (date: string) => {
    return formatDistanceToNowStrict(new Date(date));
  };

  const handlePuplishedAt = (date: string) => {
    return format(new Date(date), "d MMM yyyy");
  };

  const handleReadMore = (index: number) => {
    if (hoveredIndex === index) {
      setHoveredIndex(-1);
    } else {
      setHoveredIndex(index);
    }
  };

  return (
    <section className="container  my-[100px]">
      <div>
        {data.map((review, index) =>
          index < 2 ? (
            <div
              className="flex flex-row  w-full py-10 border-b-[1px] border-primary"
              key={index}
            >
              <div className="basis-1/12">
                <div className="relative h-[60px] w-[60px]">
                  <Image
                    src={review.user.images.jpg.image_url}
                    fill
                    sizes="100%"
                    className="rounded-full"
                    alt="user img"
                  />
                </div>
              </div>

              <div className="basis-11/12 flex flex-col">
                <div className="flex">
                  <h1 className="font-normal mb-3">
                    Review by{" "}
                    <span className="text-primary font-semibold">
                      {review.user.username}
                    </span>
                  </h1>
                  <abbr
                    className="text-slate-400 italic ml-4"
                    title={`${handlePuplishedAt(review.date)}`}
                  >
                    {handlePuplishedIn(review.date)}
                  </abbr>
                </div>
                <div>
                  {handleReviews(
                    review.review,
                    hoveredIndex === index ? true : false
                  )}
                </div>
                <div className="flex items-center gap-10 mt-5">
                  <div className="flex items-center  text-primary">
                    <AiFillLike className="me-3" /> {review.reactions.nice}
                  </div>
                  <div className="flex items-center  text-primary">
                    <FaHeart className="me-3" /> {review.reactions.love_it}
                  </div>
                  <div className="flex items-center text-primary cursor-pointer">
                    <a className="me-2" onClick={() => handleReadMore(index)}>
                      {hoveredIndex === index ? "Show Less" : "Show More"}
                    </a>
                    {hoveredIndex === index ? (
                      <IoIosArrowUp />
                    ) : (
                      <IoIosArrowDown />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )
        )}
      </div>
    </section>
  );
};

export default Reviews;
