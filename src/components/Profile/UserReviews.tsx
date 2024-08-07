"use client";

import { useRouter } from "next/navigation";
import { Button } from "../Shared/Button";
import { useAppContext } from "@/context";
import ReviewCard from "../Shared/ReviewCard";

const UserReviews = ({ data, userInfo }: { data?: any[]; userInfo: any }) => {
  const { userData } = useAppContext();
  const router = useRouter();

  if (data?.length === 0) {
    return (
      <div className="flex justify-center flex-col mt-10">
        <h1 className="text-2xl text-center">
          {userInfo._id === userData._id
            ? "Currently, your Reviews List is empty. Start curating your viewing experience by adding Animes to your Reviews List!"
            : "Currently the user Reviews List is empty"}
        </h1>
        {userInfo._id === userData._id ? (
          <Button
            title="view Animes"
            bg={true}
            handleClick={() => router.push("/anime")}
            classes="w-fit mx-auto mt-10"
          />
        ) : (
          ""
        )}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {data &&
        data?.map((review, index) => (
          <ReviewCard
            userData={userInfo}
            userReview={review}
            title
            key={index}
          />
        ))}
    </div>
  );
};

export default UserReviews;
