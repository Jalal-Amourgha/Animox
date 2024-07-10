"use client";

import { useEffect, useState } from "react";
import { FaRankingStar, FaStar } from "react-icons/fa6";
import { BsBookmarkCheckFill } from "react-icons/bs";
import { MdRateReview } from "react-icons/md";
import { format } from "date-fns";
import Image from "next/image";
import Modal from "../Shared/Modal";

interface MangaDetailsProps {
  data: any;
  userId: string;
}

const MangaDetails = ({ data, userId }: MangaDetailsProps) => {
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [openWatchlistModal, setOpenWatchlistModal] = useState(false);

  const mangaDetails = [
    "type",
    "chapters",
    "volumes",
    "status",
    "score",
    "rank",
    "popularity",
    "members",
    "favorites",
  ];

  const handlePublished = (date: string) => {
    return format(new Date(date), "yyyy");
  };

  return (
    <>
      <section className="container mt-[100px] ">
        <div className="bg-bg-color-2 text-white rounded-lg p-3 lg:p-5">
          <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-20 ">
            <div className="w-full">
              <div className="block lg:hidden mb-5">
                <h1 className={`text-3xl font-semibold mb-3 text-primary2 `}>
                  {data.title} ({handlePublished(data.published)})
                </h1>

                <div className="flex flex-wrap items-center gap-4 mt-3 mb-10">
                  {data.genres.map((genre: any, index: number) => (
                    <div
                      className={`bg-primary2 py-1 px-3 text-lg font-bold text-center text-bg-color rounded-full cursor-pointer`}
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
            <div className="lg:col-span-2">
              <div className="hidden lg:block">
                <h1 className={`text-3xl font-semibold mb-3 text-primary2`}>
                  {data.title} ({data.published})
                </h1>
                <p className="text-xl">
                  Written By{" "}
                  <span className="text-primary2">{data.author}</span>{" "}
                </p>

                <div className="flex flex-wrap items-center gap-4 mt-3 mb-5">
                  {data.genres.map((genre: any, index: number) => (
                    <div
                      className={`bg-primary2 py-1 px-3 text-lg font-bold text-center text-bg-color rounded-full cursor-pointer`}
                      key={index}
                    >
                      {genre}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-5">
                {mangaDetails.map((item) =>
                  data[item] && item !== "demographics" ? (
                    <div className="text-lg font-semibold mb-3" key={item}>
                      <span className={`text-primary2 capitalize me-3`}>
                        {item} :{" "}
                      </span>{" "}
                      {data[item]}
                    </div>
                  ) : (
                    ""
                  )
                )}
                <div className="text-lg font-semibold mb-3">
                  <span className={`text-primary2 capitalize me-3`}>
                    Demographics :{" "}
                  </span>{" "}
                  {data.demographics}
                </div>
              </div>
              <div className="flex flex-wrap gap-3 mt-5">
                <div
                  className={`flex items-center gap-3 border-[1px] border-primary2 bg-bg-color-2 text-primary2 duration-300 hover:bg-primary2 hover:text-bg-color font-bold text-lg rounded-md p-2 cursor-pointer`}
                  onClick={() => setOpenReviewModal(true)}
                >
                  <MdRateReview className="text-2xl" /> Add Review
                </div>
                <div
                  className={`flex items-center gap-3 border-[1px] border-primary2 bg-bg-color-2 text-primary2 duration-300 hover:bg-primary2 hover:text-bg-color font-bold text-lg rounded-md p-2 cursor-pointer`}
                  onClick={() => setOpenWatchlistModal(true)}
                >
                  <BsBookmarkCheckFill className="text-2xl" /> Add To Readlist
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <h1 className={`text-2xl text-primary2 font-semibold mb-3`}>
              Synopsis :
            </h1>
            <p className="text-slate-200">
              {data.synopsis.replace("[Written by MAL Rewrite]", "")}
            </p>
          </div>
          <div className="my-5">
            <h1 className={`text-2xl text-primary2 font-semibold mb-3`}>
              Background :
            </h1>
            <p className="text-slate-200">{data.background}</p>
          </div>
        </div>
      </section>
      <Modal
        isOpen={openReviewModal}
        closeModal={() => setOpenReviewModal(false)}
        img={data.images}
        title={data.title}
        type="review"
        color="primary2"
      />
      <Modal
        isOpen={openWatchlistModal}
        closeModal={() => setOpenWatchlistModal(false)}
        img={data.images}
        title={data.title}
        type="readlist"
        color="primary2"
      />
    </>
  );
};

export default MangaDetails;
