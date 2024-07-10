"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { LuTrash2 } from "react-icons/lu";
import { useState } from "react";
import { Button } from "../Shared/Button";
import { useAppContext } from "@/context";

const UserReadlist = ({ data, userId }: { data: any[]; userId: string }) => {
  const { userData } = useAppContext();
  const [statu, setStatu] = useState<string>("all");
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);
  const router = useRouter();

  const handleSelectChange = (event: any) => {
    setStatu(event.target.value);
  };

  if (data.length === 0) {
    return (
      <div className="col-span-4 flex justify-center flex-col mt-10">
        <h1 className="text-2xl text-center">
          {userId === userData._id
            ? "Currently, your Readlist is empty. Start curating your viewing experience by adding Animes to your ReadList!"
            : "Currently the user Readlist is empty"}
        </h1>
        {userId === userData._id ? (
          <button className="w-fit mx-auto mt-5 bg-primary2 py-2 px-6 text-xl text-bg-color font-medium rounded-lg">
            View Manga
          </button>
        ) : (
          ""
        )}
      </div>
    );
  }
  return (
    <div>
      <div className="text-right">
        <select
          name="status"
          className="outline-none bg-bg-color text-primary2 text-lg border-[1px] border-primary2 rounded-xl w-[270px] p-2 cursor-pointer"
          value={statu}
          onChange={handleSelectChange}
        >
          <option value="all">All</option>
          <option value="read">Read</option>
          <option value="dropped">Dropped</option>
          <option value="onhold">on-Hold</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-10">
        {data &&
          data?.map((item, index) =>
            statu === "all" ? (
              <div key={index}>
                <div
                  className="relative lg:h-[40vh] h-[50vh] w-full"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(-1)}
                >
                  <Image
                    src={item.img}
                    fill
                    sizes="100%"
                    className="object-cover rounded-lg cursor-pointer"
                    alt="anime img"
                  />
                </div>
                <div className="flex justify-between items-center mt-2">
                  <h1 className="text-xl font-semibold line-clamp-1">
                    {item.title}
                  </h1>
                  <div className="flex items-center gap-1">
                    <FaStar className="text-xl text-primary2" />
                    <span>{item.score}</span>
                  </div>
                </div>
                <p className="text-primary2 italic">{item.statu}</p>
              </div>
            ) : item.statu === statu ? (
              <div key={index}>
                <div
                  className="relative lg:h-[40vh] h-[50vh] w-full"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(-1)}
                >
                  <Image
                    src={item.img}
                    fill
                    sizes="100%"
                    className="object-cover rounded-lg cursor-pointer"
                    alt="anime img"
                  />
                </div>
                <div className="flex justify-between items-center mt-2">
                  <h1 className="text-xl font-semibold line-clamp-1">
                    {item.title}
                  </h1>
                  <div className="flex items-center gap-1">
                    <FaStar className="text-xl text-primary2" />
                    <span>{item.score}</span>
                  </div>
                </div>
                <p className="text-primary2 italic">{item.statu}</p>
              </div>
            ) : (
              ""
            )
          )}
      </div>
    </div>
  );
};

export default UserReadlist;
