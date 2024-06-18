"use client";

import { avatarImgs, bannerImgs, filterOptions, userInfo } from "@/constants";
import { UserProps } from "@/types";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import UserReviews from "./UserReviews";
import UserWatchlist from "./UserWatchlist";
import UserReadlist from "./UserReadlist";
import { useAppContext } from "@/context";
import EditImgModal from "./EditImgModal";

interface UserInfoProps {}

const UserInfo = ({}: UserInfoProps) => {
  const [data, setData] = useState<UserProps>();
  const [showEditBannerBtn, setShowEditBannerBtn] = useState<boolean>(false);
  const [showEditAvatarBtn, setShowEditAvatarBtn] = useState<boolean>(false);
  const [editBannerImg, setEditBannerImg] = useState<boolean>(false);
  const [editAvatarImg, setEditAvatarImg] = useState<boolean>(false);
  const [filter, setFilter] = useState("reviews");
  const router = useRouter();
  const { data: session } = useSession();
  let fetchOneTime = true;

  const fetchUserInfo = async (id: string) => {
    const response = await fetch(`/api/users/${id}/info`);
    const data = await response.json();

    setData(data);
  };

  useEffect(() => {
    if (session?.user?.email && fetchOneTime) {
      fetchUserInfo(session?.user?.email);
    }
    fetchOneTime = false;
  }, [session?.user?.email, fetchOneTime]);

  if (!data?.username) {
    return <h1>sasasasasa</h1>;
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
            bannerImgs[bannerImgs.findIndex((img) => img.id === data?.banner)]
              .img
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
        onClick={() => router.back()}
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
            avatarImgs[avatarImgs.findIndex((img) => img.id === data?.image)]
              .img
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
        @{data?.username}
      </h1>

      <div className="flex justify-center  gap-10">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-3">
            {data?.reviews.length}
          </h1>
          <p className="text-slate-300 uppercase">reviews</p>
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-3">
            {data?.watchlist.length}
          </h1>
          <p className="text-slate-300 uppercase">watchlist</p>
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-3">
            {data?.readlist.length}
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
      {editBannerImg ? (
        <EditImgModal
          closeModal={() => setEditBannerImg(false)}
          userId={data?.email}
          type="banner"
        />
      ) : (
        ""
      )}
      {editAvatarImg ? (
        <EditImgModal
          closeModal={() => setEditAvatarImg(false)}
          userId={data?.email}
          type="avatar"
        />
      ) : (
        ""
      )}
    </>
  );
};

export default UserInfo;
