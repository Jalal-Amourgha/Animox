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
  const animeDetails = [
    "status",
    "rating",
    "score",
    "Scored by",
    "rank",
    "popularity",
    "members",
    "favorites",
  ];

  return (
    <>
      <section className="container mt-[100px] ">
        <div className="bg-bg-color-2 text-white rounded-lg p-3 lg:p-5">
          <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-20 ">
            <div className="w-full">
              <div className="block lg:hidden mb-5">
                <h1 className={`text-3xl font-semibold mb-3 text-primary `}>
                  {data.title} ({data.year})
                </h1>

                <p className="text-slate-200">
                  Produced by{" "}
                  <span className={`text-primary`}>{data.studio}</span> , is
                  based on a{" "}
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
                      {genre}
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative w-full h-[70vh]">
                <Image
                  src={data.images}
                  fill
                  sizes="100%"
                  className="h-full max-w-[300px] mx-auto lg:m-0 lg:max-w-full object-cover rounded-lg"
                  alt="anime img"
                />
              </div>
            </div>
            <div className="lg:col-span-2 flex flex-col justify-between ">
              <div className="hidden lg:block">
                <h1 className={`text-3xl font-semibold mb-3 text-primary`}>
                  {data.title} ({data.year})
                </h1>

                <p className="text-slate-200">
                  Produced by{" "}
                  <span className={`text-primary`}>{data.studios}</span> , is
                  based on a <span className="text-primary">{data.source}</span>{" "}
                  <span
                    className={`px-1 ml-2 bg-primary text-bg-color text-lg font-bold rounded-lg`}
                  >
                    {data.type}
                  </span>
                </p>

                <div className="flex items-center gap-4 mt-3 ">
                  {data.genres.map((genre: any, index: number) => (
                    <div
                      className={`bg-primary py-1 px-3 text-lg font-bold text-center text-bg-color rounded-full cursor-pointer`}
                      key={index}
                    >
                      {genre}
                    </div>
                  ))}
                </div>
              </div>
              <div className="">
                {animeDetails.map((item) => (
                  <div className="text-lg font-semibold mb-3" key={item}>
                    <span className={`text-primary capitalize me-3`}>
                      {item} :{" "}
                    </span>{" "}
                    {data[item.toLowerCase().replaceAll(" ", "_")]}
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 ">
                <div
                  className={`flex items-center gap-3 border-[1px] border-primary bg-bg-color-2 text-primary duration-300 hover:bg-primary hover:text-bg-color font-bold text-lg rounded-md p-2 cursor-pointer`}
                  onClick={() => setOpenReviewModal(true)}
                >
                  <MdRateReview className="text-2xl" /> Add Review
                </div>
                <div
                  className={`flex items-center gap-3 border-[1px] border-primary bg-bg-color-2 text-primary duration-300 hover:bg-primary hover:text-bg-color font-bold text-lg rounded-md p-2 cursor-pointer`}
                  onClick={() => setOpenWatchlistModal(true)}
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
            <div>
              {data.synopsis
                .replace("[Written by MAL Rewrite]", "")
                .split("\n")
                .filter((str: string) => str !== "")
                .map((synopsis: string, index: number) => (
                  <p className="text-slate-200 mb-5" key={index}>
                    {synopsis}
                  </p>
                ))}
            </div>
          </div>
        </div>
      </section>
      <Modal
        isOpen={openReviewModal}
        closeModal={() => setOpenReviewModal(false)}
        img={data.images}
        title={data.title}
        id={data.mal_id}
        type="review"
        color="primary"
      />
      <Modal
        isOpen={openWatchlistModal}
        closeModal={() => setOpenWatchlistModal(false)}
        img={data.images}
        title={data.title}
        id={data.mal_id}
        type="watchlist"
        color="primary"
      />
    </>
  );
};

export default AnimeDetails;
