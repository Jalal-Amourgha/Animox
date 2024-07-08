"use client";

import { FaStar } from "react-icons/fa";
import { RiBookLine } from "react-icons/ri";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { format } from "date-fns";
import { MotionDiv } from "../Shared/MotionDiv";

interface MangaCardProps {
  manga: any;
  index: number;
}

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const MangaCard = ({ manga, index }: MangaCardProps) => {
  const { mal_id, title, score, chapters, images, type, rank, published } =
    manga;
  const router = useRouter();

  const handlePublishedIn = (date: string) => {
    return format(new Date(date), "MMM yyyy");
  };

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
      onClick={() => router.push(`manga/${mal_id}`)}
    >
      <div className="w-full h-[55vh] md:h-[45vh] relative">
        <Image
          src={images.jpg.large_image_url}
          fill
          sizes="100%"
          className="w-full h-full rounded-xl object-cover cursor-pointer"
          alt="anime img"
        />
        {rank !== null ? (
          <h1 className="absolute top-1 left-1 bg-primary2 text-bg-color text-lg font-bold flex items-center rounded-full  px-2 z-[5]">
            #{rank}
          </h1>
        ) : (
          ""
        )}
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-white capitalize text-lg font-semibold line-clamp-1 mt-2 mb-1 hover:text-primary2 cursor-pointer">
          {title}
        </h1>
        <span className="bg-[#4F4C4C] rounded-lg px-1">{type}</span>
      </div>
      <p className="text-lg font-medium text-primary2">
        {handlePublishedIn(published.from)}
      </p>
      <div className="flex items-center gap-3 mt-2">
        {chapters !== null ? (
          <div className="flex items-center gap-1 text-xl">
            <RiBookLine className="text-primary2" />
            <span className="text-white"> {chapters}</span>
          </div>
        ) : (
          ""
        )}
        <div className="flex items-center gap-1 text-xl">
          <FaStar className="text-primary2" />
          <span className="text-white"> {score}</span>
        </div>
      </div>
    </MotionDiv>
  );
};

export default MangaCard;
