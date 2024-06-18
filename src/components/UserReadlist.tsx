"use client";

import { useRouter } from "next/navigation";
import Button from "./Button";
import Image from "next/image";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { LuTrash2 } from "react-icons/lu";
import { useState } from "react";

const UserReadlist = ({ data }: { data: any[] }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);
  const router = useRouter();

  const handleViewAnimes = () => {
    router.push("/anime");
  };

  const handleRaiting = (n: any) => {
    let arr = [];
    let stars = n;

    // returning number into interger Number
    if (!Number.isInteger(n)) {
      if (n === Math.fround(n)) {
        stars = n;
      } else if (+(n + "").split(".")[1] > 5) {
        stars = +(n + "").split(".")[0] + 0.5;
      } else {
        stars = (n + "").split(".")[0];
      }
    }

    // creating the stars array
    for (let i = 1; i <= 5; i++) {
      if (stars >= 1) {
        arr.push(<FaStar />);
      } else if (stars === 0.5) {
        arr.push(<FaStarHalfAlt />);
        stars = stars - 0.5;
      } else if (stars <= 0) {
        arr.push(<FaRegStar />);
      }

      stars = stars - 1;
    }

    return arr.map((icon, index) => <div key={index}>{icon}</div>);
  };

  const handleDeleteItem = (id: number) => {
    console.log(id);
  };

  if (data.length === 0) {
    return (
      <div className="flex justify-center flex-col mt-10">
        <h1 className="text-2xl text-center">
          Currently, your Favorites List is empty. Start curating your viewing
          experience by adding Animes to your ReadList!
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
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5">
      {data?.map((item, index) => (
        <div key={index}>
          <div
            className="relative h-[350px] md:h-[250px] lg:h-[200px] w-full cursor-pointer"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(-1)}
          >
            <Image
              src={item.img}
              fill
              sizes="100%"
              className="object-cover rounded-lg"
              alt="anime img"
            />
            {hoveredIndex === index ? (
              <div
                className="absolute top-2 right-2 md:top-1 md:right-1 h-[40px] w-[40px] rounded-full bg-[#ea2d40] flex justify-center items-center text-xl"
                onClick={() => handleDeleteItem(index)}
              >
                <LuTrash2 />
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="flex flow-row gap-3 text-primary mt-2">
            {handleRaiting(item.score)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserReadlist;
