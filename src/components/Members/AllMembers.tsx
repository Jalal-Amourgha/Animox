"use client";

import { avatarImgs } from "@/constants";
import Image from "next/image";

import { IoBook, IoEye } from "react-icons/io5";
import { MdRateReview } from "react-icons/md";
import Header from "../Shared/Header";
import { UserProps } from "@/types";
import { useRouter } from "next/navigation";

const AllMembers = ({ data }: { data: any }) => {
  const router = useRouter();
  return (
    <section className="container">
      <Header title="Members" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 flex flex-col">
          {data &&
            data.map((member: UserProps, index: number) => (
              <div
                className="flex items-center gap-5 md:gap-10 border-b-[1px] border-primary py-5"
                onClick={() => router.push(`/profile/${member.username}`)}
                key={index}
              >
                <div className="relative h-14 w-14 rounded-full overflow-hidden">
                  <Image
                    src={
                      avatarImgs[
                        avatarImgs.findIndex((e) => e.id === `${member.image}`)
                      ].img
                    }
                    fill
                    sizes="100%"
                    alt="member avatar"
                  />
                </div>
                <div className="flex items-center justify-between w-full">
                  <h1 className="text-xl font-bold hover:text-primary cursor-pointer">
                    {member.username}
                  </h1>
                  <div className="flex items-center text-base md:text-xl gap-2 md:gap-3">
                    <MdRateReview className="text-primary" />
                    {member.reviews.length}
                  </div>
                  <div className="flex items-center text-base md:text-xl gap-2 md:gap-3">
                    <IoEye className="text-primary" />
                    {member.watchlist.length}
                  </div>
                  <div className="flex items-center text-base md:text-xl gap-2 md:gap-3">
                    <IoBook className="text-primary" />
                    {member.readlist.length}
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="hidden lg:grid grid-cols-7 gap-4 h-fit">
          {data &&
            data.map((member: UserProps, index: number) => (
              <div
                className="h-fit"
                onClick={() => router.push(`/profile/${member.username}`)}
                key={index}
              >
                <div className="relative h-14 w-14 rounded-full  cursor-pointer overflow-hidden">
                  <Image
                    src={
                      avatarImgs[
                        avatarImgs.findIndex((e) => e.id === `${member.image}`)
                      ].img
                    }
                    fill
                    sizes="100%"
                    alt="member avatar"
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default AllMembers;
