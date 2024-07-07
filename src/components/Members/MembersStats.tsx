"use client";
import Image from "next/image";
import React from "react";
import { IoEye } from "react-icons/io5";
import { IoBook } from "react-icons/io5";
import { MdRateReview } from "react-icons/md";
import { FaStar } from "react-icons/fa6";
import Header from "../Shared/Header";

const MembersStats = () => {
  const b = [
    {
      title: "Hunter x Hunter",
      img: "https://cdn.myanimelist.net/images/anime/1337/99013l.jpg",

      number: 108,
      icon: <IoEye />,
      type: "Most Watched Anime",
    },
    {
      title: "Hunter x Hunter",
      img: "https://cdn.myanimelist.net/images/anime/1337/99013l.jpg",

      number: 99,
      icon: <FaStar />,
      type: "Most Rated Anime",
    },
    {
      title: "Death Note",
      img: "https://cdn.myanimelist.net/images/anime/1079/138100l.jpg",
      number: 88,
      icon: <IoBook />,
      type: "Most Read Manga",
    },
    {
      title: "Death Note",
      img: "https://cdn.myanimelist.net/images/anime/3/72943l.jpg",
      number: 66,
      icon: <FaStar />,
      type: "Most Rated Manga",
    },
    {
      title: "Attack on Titan",
      img: "https://cdn.myanimelist.net/images/anime/10/47347l.jpg",
      number: 57,
      icon: <MdRateReview />,
      type: "Most Reviewed Anime",
    },
    {
      title: "Food Wars! Shokugeki no Soma",
      img: "https://cdn.myanimelist.net/images/anime/3/72943l.jpg",
      number: 41,
      icon: <MdRateReview />,
      type: "Most Reviewed Manga",
    },
  ];

  return (
    <div className="mb-[100px]">
      <Header title="Some Stats" />
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-10">
        {b.map((item, index) => (
          <div key={index}>
            <div className="py-1 px-2 bg-primary text-bg-color text-md text-center font-semibold rounded-full mb-5">
              {item.type}
            </div>
            <div className="relative h-[50vh] w-full rounded-lg overflow-hidden">
              <Image
                src={item.img}
                className="object-cover"
                fill
                sizes="100%"
                alt="anime img"
              />
            </div>
            <h1 className="text-xl font-semibold line-clamp-1 mt-3">
              {item.title}
            </h1>
            <div className="flex items-center gap-2 text-primary">
              {item.icon} <h1 className="text-xl text-white">{item.number}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MembersStats;
