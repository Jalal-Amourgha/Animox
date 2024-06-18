"use client";

import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import Button from "./Button";
import Image from "next/image";

const UserReviews = ({ data }: { data?: any[] }) => {
  const router = useRouter();

  const data1 = [
    {
      img: "https://cdn.myanimelist.net/images/anime/1337/99013l.jpg",
      title: "Hunter x Hunter",
      score: 5,
      review:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur doloribus, adipisci optio, quae perspiciatis tenetur modi velit laudantium temporibus deserunt nam labore, dolorum totam in unde dignissimos quia error perferendis.",
      createdAt: "2024-05-15T20:06:51.247Z",
    },
    {
      img: "https://cdn.myanimelist.net/images/anime/1337/99013l.jpg",
      title: "Hunter x Hunter",
      score: 5,
      review:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur doloribus, adipisci optio, quae perspiciatis tenetur modi velit laudantium temporibus deserunt nam labore, dolorum totam in unde dignissimos quia error perferendis.",
      createdAt: "2024-05-15T20:06:51.247Z",
    },
    {
      img: "https://cdn.myanimelist.net/images/anime/1337/99013l.jpg",
      title: "Hunter x Hunter",
      score: 5,
      review:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur doloribus, adipisci optio, quae perspiciatis tenetur modi velit laudantium temporibus deserunt nam labore, dolorum totam in unde dignissimos quia error perferendis.",
      createdAt: "2024-05-15T20:06:51.247Z",
    },
    {
      img: "https://cdn.myanimelist.net/images/anime/1337/99013l.jpg",
      title: "Hunter x Hunter",
      score: 5,
      review:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur doloribus, adipisci optio, quae perspiciatis tenetur modi velit laudantium temporibus deserunt nam labore, dolorum totam in unde dignissimos quia error perferendis.",
      createdAt: "2024-05-15T20:06:51.247Z",
    },
  ];

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
      {data1?.map((review, index) => (
        <div
          className="flex flex-row gap-10 mb-5 pb-5 border-b-2 border-primary"
          key={index}
        >
          <div className="relative hidden md:block h-[50vh] basis-1/3 w-full">
            <Image
              src={review?.img}
              fill
              sizes="100%"
              className="object-cover w-full rounded-lg"
              alt={review?.title}
            />
          </div>
          <div className="basis-full md:basis-2/3">
            <h1 className="text-3xl text-primary font-semibold mb-5">
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
