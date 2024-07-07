"use client";

import { FaStar } from "react-icons/fa";
import { AnimeProps } from "@/types";
import { useRouter } from "next/navigation";

import Image from "next/image";
import { MotionDiv } from "../Shared/MotionDiv";

interface AnimeCardProps {
  anime: AnimeProps;
  index: number;
}

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const AnimeCard = ({ anime, index }: AnimeCardProps) => {
  const { mal_id, title, score, episodes, images, type } = anime;
  const router = useRouter();

  return (
    <MotionDiv
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{
        delay: index * 0.25,
        ease: "easeInOut",
        duration: 0.5,
      }}
      viewport={{ amount: 0 }}
    >
      <div
        className="w-full h-[55vh] md:h-[45vh] relative"
        onClick={() => router.push(`/anime/${mal_id}`)}
      >
        <Image
          src={images.jpg.large_image_url}
          fill
          sizes="100%"
          className="w-full h-full rounded-xl object-cover cursor-pointer"
          alt="anime img"
        />
        {score !== null ? (
          <div className="absolute top-1 right-1 bg-primary text-bg-color text-lg flex items-center rounded-full px-1 z-[5]">
            <FaStar className="me-2" />
            <span>{score}</span>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-white capitalize text-lg font-semibold line-clamp-1 my-2 hover:text-primary cursor-pointer">
          {title}
        </h1>
        <span className="bg-[#4F4C4C] rounded-lg px-1">{type}</span>
      </div>

      <p className="text-primary text-lg">{episodes} episodes</p>
    </MotionDiv>
  );
};

export default AnimeCard;
