"use client";

import { useRouter } from "next/navigation";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { LuTrash2 } from "react-icons/lu";
import { useState } from "react";
import Image from "next/image";
import { Button } from "../Shared/Button";

const UserWatchlist = ({ data }: { data?: any[] }) => {
  const [statu, setStatu] = useState<string>("all");
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);
  const router = useRouter();

  const handleViewAnimes = () => {
    router.push("/anime");
  };

  const handleSelectChange = (event: any) => {
    setStatu(event.target.value);
  };

  if (data?.length === 0) {
    return (
      <div className="flex justify-center flex-col mt-10">
        <h1 className="text-2xl text-center">
          Currently, your watchlist is empty. Start curating your viewing
          experience by adding Animes to your watchlist now!
        </h1>
        <Button
          title="view Animes"
          bg={true}
          handleClick={handleViewAnimes}
          classes="w-fit mx-auto mt-10"
        />
      </div>
    );
  }
  return (
    <div>
      <div className="text-right">
        <select
          name="status"
          className="outline-none bg-bg-color text-primary text-lg border-[1px] border-primary rounded-xl w-[270px] p-2 cursor-pointer"
          value={statu}
          onChange={handleSelectChange}
        >
          <option value="all">All</option>
          <option value="watched">Watched</option>
          <option value="dropped">Dropped</option>
          <option value="onhold">on-Hold</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-10">
        {data &&
          data?.map((watchlist, index) =>
            statu === "all" ? (
              <div key={index}>
                <div
                  className="relative lg:h-[40vh] h-[50vh] w-full"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(-1)}
                >
                  <Image
                    src={watchlist.img}
                    fill
                    sizes="100%"
                    className="object-cover rounded-lg cursor-pointer"
                    alt="anime img"
                  />
                  <div className="absolute top-2 left-2 md:top-1 md:right-1  rounded-full bg-primary text-bg-color px-2 flex items-center w-fit gap-2 text-lg">
                    <FaStar /> {"  "}
                    <span>{watchlist.score}</span>
                  </div>
                  {/* {hoveredIndex === index ? (
                    <div
                      className="absolute top-2 right-2 md:top-1 md:right-1 h-[40px] w-[40px] rounded-full bg-[#ea2d40] flex justify-center items-center text-xl"
                      onClick={() => handleDeleteItem(index)}
                    >
                      <LuTrash2 />
                    </div>
                  ) : (
                    ""
                  )} */}
                </div>
                <h1 className="text-xl font-semibold line-clamp-1">
                  {watchlist.title}
                </h1>
                <p className="text-primary italic">{watchlist.statu}</p>
              </div>
            ) : watchlist.statu === statu ? (
              <div key={index}>
                <div
                  className="relative lg:h-[40vh]  h-[50vh] w-full"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(-1)}
                >
                  <Image
                    src={watchlist.img}
                    fill
                    sizes="100%"
                    className="object-cover rounded-lg cursor-pointer"
                    alt="anime img"
                  />
                  <div className="absolute top-2 left-2 md:top-1 md:right-1  rounded-full bg-primary px-2 flex items-center w-fit gap-2 text-lg">
                    <FaStar /> {"  "}
                    <span>{watchlist.score}</span>
                  </div>
                  {/* {hoveredIndex === index ? (
                    <div
                      className="absolute top-2 right-2 md:top-1 md:right-1 h-[40px] w-[40px] rounded-full bg-[#ea2d40] flex justify-center items-center text-xl"
                      onClick={() => handleDeleteItem(index)}
                    >
                      <LuTrash2 />
                    </div>
                  ) : (
                    ""
                  )} */}
                </div>
                <h1 className="text-xl font-semibold mb-2 line-clamp-1">
                  {watchlist.title}
                </h1>
                <p className="text-primary italic">{watchlist.statu}</p>
              </div>
            ) : (
              ""
            )
          )}
      </div>
    </div>
  );
};

export default UserWatchlist;
