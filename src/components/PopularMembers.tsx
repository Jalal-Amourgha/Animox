"use client";

import { avatarImgs } from "@/constants";
import Image from "next/image";

import SectionHeader from "./SectionHeader";

const PopularMembers = () => {
  let a = [
    {
      username: "Silva__x",
      image: "avatar1",
      reviews: [
        {
          title: "Hunter x Hunter",
          img: "https://cdn.myanimelist.net/images/anime/1337/99013l.jpg",
          score: { $numberInt: "5" },
          review:
            "HxH is absolutely a Masterpiece Anime. I hope this Anime return one day.",
          createdAt: "2024-05-15T20:06:51.247Z",
        },
        {
          title: "Death Note",
          img: "https://cdn.myanimelist.net/images/anime/1079/138100l.jpg",
          score: { $numberInt: "5" },
          review: "Death Note is the first Anime that i watched",
          createdAt: "Wed May 15 2024 21:28:19 GMT+0100 (GMT+01:00)",
        },
        {
          title: "Food Wars! Shokugeki no Soma",
          img: "https://cdn.myanimelist.net/images/anime/3/72943l.jpg",
          score: { $numberInt: "4" },
          review: "i love this anime so much",
          createdAt: "Thu May 16 2024 19:05:29 GMT+0100 (GMT+01:00)",
        },
      ],
      watchlist: [
        {
          title: "Attack on Titan",
          img: "https://cdn.myanimelist.net/images/anime/10/47347l.jpg",
          statu: "watched",
          score: "5",
        },
        {
          title: "Death Note",
          img: "https://cdn.myanimelist.net/images/anime/1079/138100l.jpg",
          statu: "watched",
          score: "5",
        },
        {
          title: "Food Wars! Shokugeki no Soma",
          img: "https://cdn.myanimelist.net/images/anime/3/72943l.jpg",
          statu: "watched",
          score: "4",
        },
      ],
      readlist: [
        {
          title: "Food Wars! Shokugeki no Soma",
          img: "https://cdn.myanimelist.net/images/anime/3/72943l.jpg",
          statu: "read",
          score: "4",
        },
      ],
    },
  ];
  return (
    <>
      <SectionHeader title="Popular Members" />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-7">
        {[1, 2, 3, 4, 5].map((member, index) => (
          <div className="text-center" key={index}>
            <div className="relative h-48 w-48 rounded-full mx-auto overflow-hidden">
              <Image
                src={
                  avatarImgs[
                    avatarImgs.findIndex((e) => e.id === `avatar${member}`)
                  ].img
                }
                fill
                sizes="100%"
                alt="member avatar img"
              />
            </div>
            <h1 className="text-xl font-semibold my-5 hover:text-primary cursor-pointer">
              Member_{member}
            </h1>
            <div className="flex items-center justify-center gap-3 mb-5">
              <div>{a[0].reviews.length} Reviews</div>
              <div>{a[0].watchlist.length} Watchlist</div>
              <div>{a[0].readlist.length} Readlist</div>
            </div>
            <div className="flex gap-3">
              {a[0].watchlist.map((watch, index) => (
                <div
                  className="relative h-24 w-full rounded-lg overflow-hidden cursor-pointer"
                  key={index}
                >
                  <Image src={watch.img} fill sizes="100%" alt="anime img" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PopularMembers;
