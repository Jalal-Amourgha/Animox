"use client";

import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import Image from "next/image";
import { Button } from "../Shared/Button";

const UserReviews = ({ data }: { data?: any[] }) => {
  const router = useRouter();

  const handleCreatedAt = (date: string) => {
    return format(new Date(date), "d MMM yyyy");
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

  const handleViewAnimes = () => {
    router.push("/anime");
  };

  if (data?.length === 0) {
    return (
      <div className="flex justify-center flex-col mt-10">
        <h1 className="text-2xl text-center">
          Currently, your Reviews List is empty. Start curating your viewing
          experience by adding Animes to your Reviews List!
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
    <div className="flex flex-col">
      {data &&
        data?.map((review, index) => (
          <div
            className={`flex flex-row gap-10 mb-5 pb-5 ${
              index !== data.length - 1 ? "border-b-2 border-primary" : ""
            } `}
            key={index}
          >
            <div
              className="hidden lg:block h-[250px] rounded-lg overflow-hidden basis-[150px] w-fit bg-cover bg-center bg-no-repeat "
              style={{
                backgroundImage: `url(${review?.img})`,
              }}
            ></div>

            <div className="basis-full md:basis-2/3">
              <h1 className="text-3xl text-primary font-semibold ">
                {review.title}
              </h1>
              <div className="flex  items-center gap-5 text-lg mb-5">
                <div className="flex gap-3 text-primary">
                  {handleRaiting(review.score)}
                </div>

                <span className="text-gray-400">
                  {handleCreatedAt(review.createdAt)}
                </span>
              </div>
              <p>{review.review}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default UserReviews;
