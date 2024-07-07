"use client";

import { useState } from "react";
import { BsBookmarkCheckFill } from "react-icons/bs";
import { MdRateReview } from "react-icons/md";
import Image from "next/image";
import Modal from "../Shared/Modal";

interface AnimeDetailsProps {
  data: any;
  userId: string;
}

const AnimeDetails = ({ data, userId }: AnimeDetailsProps) => {
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [openWatchlistModal, setOpenWatchlistModal] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const animeDetails = [
    "status",
    "rating",
    "score",
    "rank",
    "popularity",
    "members",
    "favorites",
  ];

  const handleSynopsis = (synopsis: string) => {
    let story = synopsis
      .replace("[Written by MAL Rewrite]", "")
      .split("\n")
      .filter((str) => str !== "");
    let limit = readMore ? 999 : 1;

    return story.map((synopsis, index) =>
      index < limit ? (
        <p className="text-slate-200 mb-5" key={index}>
          {synopsis}
          {limit === 1 ? (
            <span
              className={`text-primary ml-3 cursor-pointer`}
              onClick={() => setReadMore(true)}
            >
              Read more
            </span>
          ) : (
            ""
          )}
          {index === story.length - 1 ? (
            <span
              className={`text-primary ml-3 cursor-pointer`}
              onClick={() => setReadMore(false)}
            >
              Show less
            </span>
          ) : (
            ""
          )}
        </p>
      ) : (
        ""
      )
    );
  };

  const handleOpenReviewModal = () => {
    setOpenReviewModal(true);
  };

  const handleCloseReviewModal = () => {
    setOpenReviewModal(false);
  };

  const handleOpenWatchlistModal = () => {
    setOpenWatchlistModal(true);
  };

  const handleCloseWatchlistModal = () => {
    setOpenWatchlistModal(false);
  };

  return (
    <>
      <section className="container mt-[100px] ">
        <div className="bg-bg-color-2 text-white rounded-lg p-3 lg:p-5">
          <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-20 ">
            <div className="w-full">
              <div className="block lg:hidden mb-5">
                <h1 className={`text-3xl font-semibold mb-3 text-primary `}>
                  {data.title_english} ({data.year})
                </h1>

                <p className="text-slate-200">
                  Produced by{" "}
                  <span className={`text-primary`}>{data.studios[0].name}</span>{" "}
                  , is based on a{" "}
                  <span className={`text-primary`}>{data.source}</span>{" "}
                  <span
                    className={`px-1 ml-2 bg-primary text-bg-color text-lg font-bold rounded-lg`}
                  >
                    {data.type}
                  </span>
                </p>

                <div className="flex flex-wrap items-center gap-2 mt-3 mb-10">
                  {data.genres.map((genre: any, index: number) => (
                    <div
                      className={`bg-primary py-1 px-3 text-lg font-bold text-center text-bg-color rounded-full cursor-pointer`}
                      key={index}
                    >
                      {genre.name}
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative w-full h-[70vh]">
                <Image
                  src={data.images.jpg.large_image_url}
                  fill
                  sizes="100%"
                  className="h-full max-w-[300px] mx-auto lg:m-0 lg:max-w-full object-cover rounded-lg"
                  alt="anime img"
                />
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="hidden lg:block">
                <h1 className={`text-3xl font-semibold mb-3 text-primary`}>
                  {data.title_english} ({data.year})
                </h1>

                <p className="text-slate-200">
                  Produced by{" "}
                  <span className={`text-primary`}>{data.studios[0].name}</span>{" "}
                  , is based on a{" "}
                  <span className="text-primary">{data.source}</span>{" "}
                  <span
                    className={`px-1 ml-2 bg-primary text-bg-color text-lg font-bold rounded-lg`}
                  >
                    {data.type}
                  </span>
                </p>

                <div className="flex items-center gap-4 mt-3 mb-10">
                  {data.genres.map((genre: any, index: number) => (
                    <div
                      className={`bg-primary py-1 px-3 text-lg font-bold text-center text-bg-color rounded-full cursor-pointer`}
                      key={index}
                    >
                      {genre.name}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-5">
                {animeDetails.map((item) => (
                  <div className="text-lg font-semibold mb-3" key={item}>
                    <span className={`text-primary capitalize me-3`}>
                      {item} :{" "}
                    </span>{" "}
                    {data[item]}
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 mt-5">
                <div
                  className={`flex items-center gap-3 border-[1px] border-primary bg-bg-color-2 text-primary duration-300 hover:bg-primary hover:text-bg-color font-bold text-lg rounded-md p-2 cursor-pointer`}
                  onClick={handleOpenReviewModal}
                >
                  <MdRateReview className="text-2xl" /> Add Review
                </div>
                <div
                  className={`flex items-center gap-3 border-[1px] border-primary bg-bg-color-2 text-primary duration-300 hover:bg-primary hover:text-bg-color font-bold text-lg rounded-md p-2 cursor-pointer`}
                  onClick={handleOpenWatchlistModal}
                >
                  <BsBookmarkCheckFill className="text-2xl" /> Add To Watchlist
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <h1 className={`text-2xl text-primary font-semibold mb-3`}>
              Synopsis :
            </h1>
            <div>{handleSynopsis(data.synopsis)}</div>
          </div>
        </div>
      </section>
      <Modal
        isOpen={openReviewModal}
        closeModal={handleCloseReviewModal}
        img={data.images.jpg.large_image_url}
        title={data.title_english}
        type="review"
        userId={userId}
        color="primary"
      />
      <Modal
        isOpen={openWatchlistModal}
        closeModal={handleCloseWatchlistModal}
        img={data.images.jpg.large_image_url}
        title={data.title_english}
        type="watchlist"
        userId={userId}
        color="primary"
      />
    </>
  );
};

export default AnimeDetails;
