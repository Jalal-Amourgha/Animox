"use client";
import Image from "next/image";
import { BsYinYang } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { avatarImgs } from "@/constants";
import { UserProps } from "@/types";

import { format } from "date-fns";

interface ReviewCardProps {
  userData?: UserProps;

  title?: boolean;
  userReview?: any;
}

const ReviewCard = ({
  userData,
  title = false,
  userReview,
}: ReviewCardProps) => {
  const router = useRouter();

  return (
    <>
      <div className="bg-bg-color-2 p-6 rounded-3xl border-[1px] border-primary relative">
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-3">
            <Image
              src={
                avatarImgs[
                  avatarImgs.findIndex((img) => img.id === userData?.image)
                ].img
              }
              height={50}
              width={50}
              className="rounded-full"
              alt="user avatar"
            />
            <div>
              <h1
                className="text-xl text-white font-semibold mb-1 hover:text-primary cursor-pointer"
                onClick={() => router.push(`/profile/${userData?.username}`)}
              >
                {userData?.username}
              </h1>
              <div className="flex items-center gap-2">
                <p className={`${!title ? "hidden" : ""} text-gray-400`}>
                  <span className="text-primary">
                    {userReview?.title}&apos;s
                  </span>{" "}
                  review
                </p>
              </div>
            </div>
          </div>
          <BsYinYang size="30" color="#a6fe71" />
        </div>
        <p className="text-base font-normal">{userReview.review}</p>
        <p className="absolute right-3 bottom-3 text-sm  text-slate-300 ">
          {format(new Date(userReview.createdAt), "MMM d, yyyy")}
        </p>
      </div>
    </>
  );
};

export default ReviewCard;
