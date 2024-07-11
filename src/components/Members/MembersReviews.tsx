"use client";

import { useAppContext } from "@/context";
import { UserProps } from "@/types";
import { useEffect, useRef, useState } from "react";
import ReviewCard from "../Shared/ReviewCard";
import { Button } from "../Shared/Button";

const MembersReviews = () => {
  const { users } = useAppContext();
  const [reviews, setReviews] = useState<any>([]);
  const [displayAllReviews, setDisplayAllReviews] = useState(false);

  useEffect(() => {
    if (users) {
      users.map((user: UserProps) => user.reviews.map((re: any) => {}));
    }
  }, [users]);

  useEffect(() => {
    const reviews: any = [];

    users.forEach((user: any) => {
      user.reviews.forEach((review: any) => {
        reviews.push({
          username: user.username,
          image: user.image,

          id: review.id,
          review: review.review,
          score: review.score,
          img: review.img,
          title: review.title,
          createdAt: review.createdAt,
        });
      });
    });

    reviews.sort(() => Math.random() - 0.5);

    setReviews(reviews);
  }, [users]);

  return (
    <div
      className={`${
        !displayAllReviews ? "h-[450px]" : ""
      } grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-20 relative overflow-y-scroll hide__scrollbar `}
    >
      <ul className={`flex flex-col gap-6`}>
        {reviews.slice(0, 10).map((review: any, index: number) => (
          <ReviewCard
            userData={{
              _id: "",
              image: review.image,
              username: review.username,
            }}
            userReview={review}
            key={index}
          />
        ))}
      </ul>
      <ul className="flex flex-col gap-6 ">
        {reviews.slice(10, 20).map((review: any, index: number) => (
          <ReviewCard
            userData={{
              _id: "",
              image: review.image,
              username: review.username,
            }}
            userReview={review}
            key={index}
          />
        ))}
      </ul>
      <ul className="flex flex-col gap-6">
        {reviews.slice(20, 30).map((review: any, index: number) => (
          <ReviewCard
            userData={{
              _id: "",
              image: review.image,
              username: review.username,
            }}
            userReview={review}
            key={index}
          />
        ))}
      </ul>
      <div
        className={`${
          displayAllReviews ? "hidden" : "flex"
        } absolute left-0 bottom-0 w-full  justify-center items-center py-28 bg-gradient-to-t from-bg-color`}
      >
        <Button
          title={`${displayAllReviews ? "Show Less" : "View All Review"}`}
          bg={true}
          handleClick={() => setDisplayAllReviews(!displayAllReviews)}
          classes="w-fit mx-auto mt-10"
        />
      </div>
    </div>
  );
};

export default MembersReviews;
