"use client";

import { Loader, UserReadlist, UserReviews, UserWatchlist } from "@/components";
import { avatarImgs, bannerImgs, filterOptions } from "@/constants";
import { useAppContext } from "@/context";
import { UserProps } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";

interface PageProps {
  params: {
    id: string;
  };
}

const UserPage = ({ params }: PageProps) => {
  const { users } = useAppContext();

  const [userdData, setUserData] = useState<UserProps>({
    _id: "",
  });
  const [filter, setFilter] = useState("reviews");
  const router = useRouter();

  useEffect(() => {
    if (params.id) {
      setUserData(users.find((user: UserProps) => user.username === params.id));
    }
  }, [params.id]);

  if (!userdData._id) {
    return <Loader />;
  }

  return (
    <>
      <div className="w-full h-[300px] relative cursor-pointer">
        <Image
          src={
            bannerImgs[
              bannerImgs.findIndex((img) => img.id === userdData?.banner)
            ].img
          }
          fill
          sizes="100%"
          className="w-full h-full object-cover"
          alt="banner img"
        />
      </div>
      <div
        className={`absolute top-10 left-10 z-50 flex items-center gap-2 text-xl  font-semibold cursor-pointer`}
        onClick={() => router.push(`/`)}
      >
        <FaArrowLeft />
        <h1>Back</h1>
      </div>
      <div className="mt-[-75px] w-[150px] h-[150px]  border-[10px] border-bg-color rounded-full mx-auto relative">
        <Image
          src={
            avatarImgs[
              avatarImgs.findIndex((img) => img.id === userdData?.image)
            ].img
          }
          className="h-full w-full rounded-full"
          fill
          sizes="100%"
          alt="user avatar"
        />
      </div>

      <h1 className="text-3xl font-semibold text-center my-10">
        @{userdData?.username}
      </h1>

      <div className="flex justify-center  gap-10">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-3">
            {userdData?.reviews.length}
          </h1>
          <p className="text-slate-300 uppercase">reviews</p>
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-3">
            {userdData?.watchlist.length}
          </h1>
          <p className="text-slate-300 uppercase">watchlist</p>
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-3">
            {userdData?.readlist.length}
          </h1>
          <p className="text-slate-300 uppercase">readlist</p>
        </div>
      </div>
      <div className="max-w-fit mx-auto flex gap-4 py-3 px-5 rounded-lg bg-bg-color-2 my-10">
        {filterOptions.map((item) => (
          <button
            className={`p-2 tex-center text-lg capitalize bg-bg-color-2 border-[1px] border-primary rounded-lg hover:bg-primary hover:text-bg-color ${
              filter === item.label
                ? "bg-primary text-bg-color"
                : " text-primary"
            }`}
            onClick={() => setFilter(item.label)}
            key={item.id}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="max-w-[1000px] mx-auto">
        <div className="p-10">
          {filter === "reviews" ? (
            <UserReviews data={userdData?.reviews} />
          ) : (
            ""
          )}
          {filter === "watchlist" ? (
            <UserWatchlist data={userdData?.watchlist} />
          ) : (
            ""
          )}
          {filter === "readlist" ? (
            <UserReadlist data={userdData?.readlist} />
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default UserPage;
