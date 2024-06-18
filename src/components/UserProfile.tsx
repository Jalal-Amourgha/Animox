"use client";

import { avatarImgs, bannerImgs, filterOptions, userInfo } from "@/constants";
import { UserProps } from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import UserWatchlist from "./UserWatchlist";
import UserReviews from "./UserReviews";
import UserReadlist from "./UserReadlist";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";

const UserProfile = ({ userId }: { userId: string }) => {
  const [data, setData] = useState<UserProps>();
  const [filter, setFilter] = useState("reviews");
  let fetchOneTime = true;
  const router = useRouter();

  const fetchUserInfo = async () => {
    const response = await fetch(`/api/users/${userId}/info`);
    const data = await response.json();
    setData(data);
  };

  useEffect(() => {
    console.log("hada user Id", userId);
    if (userId && fetchOneTime) {
      fetchUserInfo();
    }
    fetchOneTime = false;
  }, []);

  if (!data?.banner) {
    return <h1>fdsfsdfsffsfs</h1>;
  }

  return (
    <>
      <div className="w-full h-[300px] relative">
        <Image
          src={
            bannerImgs[bannerImgs.findIndex((img) => img.id === data.banner)]
              .img
          }
          fill
          sizes="100%"
          className="w-full h-full object-cover"
          alt="banner img"
        />
        <div
          className={`absolute top-10 left-10 z-50 flex items-center gap-2 text-xl  text-black
     font-semibold cursor-pointer`}
          onClick={() => router.back()}
        >
          <FaArrowLeft />
          <h1>Back</h1>
        </div>
      </div>
      <div className="mt-[-75px] w-[150px] h-[150px]  border-[10px] border-bg-color rounded-full mx-auto relative">
        <Image
          src={
            avatarImgs[avatarImgs.findIndex((img) => img.id === data.image)].img
          }
          className="h-full w-full rounded-full"
          fill
          sizes="100%"
          alt="user avatar"
        />
      </div>

      <h1 className="text-3xl font-semibold text-center my-10">
        @{data?.username}
      </h1>
      <div className="flex justify-center  gap-10">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-3">{data.reviews.lenght}</h1>
          <p className="text-slate-300 uppercase">reviews</p>
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-3">
            {data.watchlist.lenght}
          </h1>
          <p className="text-slate-300 uppercase">watchlist</p>
        </div>{" "}
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-3">
            {data.readlist.lenght}
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
          {filter === "reviews" ? <UserReviews data={data?.reviews} /> : ""}
          {filter === "watchlist" ? (
            <UserWatchlist data={data?.watchlist} />
          ) : (
            ""
          )}
          {filter === "readlist" ? <UserReadlist data={data?.readlist} /> : ""}
        </div>
      </div>
    </>
  );
};

export default UserProfile;
