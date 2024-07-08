"use client";

import {
  EditImgModal,
  Loader,
  UserReadlist,
  UserReviews,
  UserWatchlist,
} from "@/components";
import { avatarImgs, bannerImgs, filterOptions } from "@/constants";
import { useAppContext } from "@/context";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";

const MyProfilePage = () => {
  const { userData } = useAppContext();
  const [showEditBannerBtn, setShowEditBannerBtn] = useState<boolean>(false);
  const [showEditAvatarBtn, setShowEditAvatarBtn] = useState<boolean>(false);
  const [editBannerImg, setEditBannerImg] = useState<boolean>(false);
  const [editAvatarImg, setEditAvatarImg] = useState<boolean>(false);
  const [filter, setFilter] = useState("reviews");
  const router = useRouter();

  if (!userData?._id) {
    return <Loader />;
  }
  return (
    <>
      <div
        className="w-full h-[300px] relative cursor-pointer"
        onMouseEnter={() => setShowEditBannerBtn(true)}
        onMouseLeave={() => setShowEditBannerBtn(false)}
        onClick={() => setEditBannerImg(true)}
      >
        <Image
          src={
            bannerImgs[
              bannerImgs.findIndex((img) => img.id === userData?.banner)
            ].img
          }
          fill
          sizes="100%"
          className="w-full h-full object-cover"
          alt="banner img"
        />
        {showEditBannerBtn ? (
          <div className="profile__overlay flex justify-center items-center">
            <div className="h-[70px] w-[70px] border-2 border-white rounded-full flex justify-center items-center text-2xl text-white">
              <MdEdit />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div
        className={`absolute top-10 left-10 z-50 flex items-center gap-2 text-xl ${
          showEditBannerBtn ? "text-primary" : "text-black"
        } font-semibold cursor-pointer`}
        onClick={() => router.push(`/`)}
      >
        <FaArrowLeft />
        <h1>Back</h1>
      </div>
      <div
        className="mt-[-75px] w-[150px] h-[150px]  border-[10px] border-bg-color rounded-full mx-auto relative"
        onMouseEnter={() => setShowEditAvatarBtn(true)}
        onMouseLeave={() => setShowEditAvatarBtn(false)}
        onClick={() => setEditAvatarImg(true)}
      >
        <Image
          src={
            avatarImgs[
              avatarImgs.findIndex((img) => img.id === userData?.image)
            ].img
          }
          className="h-full w-full rounded-full"
          fill
          sizes="100%"
          alt="user avatar"
        />
        {showEditAvatarBtn ? (
          <div className="profile__overlay bg-black flex justify-center items-center relative z-[999] rounded-full overflow-hidden cursor-pointer">
            <div className="h-[70px] w-[70px] border-2 border-white rounded-full flex justify-center items-center text-2xl text-white">
              <MdEdit />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="container text-right">
        <button className="text-red-500 text-lg" onClick={() => signOut()}>
          Sign out
        </button>
      </div>

      <h1 className="text-3xl font-semibold text-center my-10">
        @{userData?.username}
      </h1>

      <div className="flex justify-center  gap-10">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-3">
            {userData?.reviews.length}
          </h1>
          <p className="text-slate-300 uppercase">reviews</p>
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-3">
            {userData?.watchlist.length}
          </h1>
          <p className="text-slate-300 uppercase">watchlist</p>
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-3">
            {userData?.readlist.length}
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
          {filter === "reviews" ? <UserReviews data={userData?.reviews} /> : ""}
          {filter === "watchlist" ? (
            <UserWatchlist data={userData?.watchlist} />
          ) : (
            ""
          )}
          {filter === "readlist" ? (
            <UserReadlist data={userData?.readlist} />
          ) : (
            ""
          )}
        </div>
      </div>
      {editBannerImg ? (
        <EditImgModal
          closeModal={() => setEditBannerImg(false)}
          type="banner"
        />
      ) : (
        ""
      )}
      {editAvatarImg ? (
        <EditImgModal
          closeModal={() => setEditAvatarImg(false)}
          type="avatar"
        />
      ) : (
        ""
      )}
    </>
  );
};

export default MyProfilePage;
