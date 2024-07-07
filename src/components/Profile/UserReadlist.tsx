"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { LuTrash2 } from "react-icons/lu";
import { useState } from "react";
import { Button } from "../Shared/Button";

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
          Currently, your Readlist is empty. Start curating your viewing
          experience by adding Animes to your ReadList!
        </h1>
        <Button
          title="View Animes"
          bg={true}
          handleClick={handleViewAnimes}
          classes="w-fit mx-auto mt-10"
        />
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {data &&
        data?.map((read, index) => (
          <div key={index}>
            <div className="relative lg:h-[40vh] h-[50vh] w-full">
              <Image
                src={read.img}
                fill
                sizes="100%"
                className="object-cover rounded-lg cursor-pointer"
                alt="anime img"
              />
            </div>
            <h1 className="text-xl font-semibold line-clamp-1 mt-1 mb-2">
              {read.title}
            </h1>
            <div className="flex justify-between items-center text-primary2">
              <div className="flex items-center gap-1">
                <FaStar /> <span className="text-white">{read.score}</span>
              </div>
              <p>{read.statu}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default UserReadlist;
