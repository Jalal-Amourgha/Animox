"use client";

import { avatarImgs } from "@/constants";
import Image from "next/image";
import Header from "../Shared/Header";
import { UserProps } from "@/types";
import { useRouter } from "next/navigation";

const PopularMembers = ({ data }: { data: any }) => {
  const router = useRouter();
  return (
    <>
      <Header title="Popular Members" />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-7">
        {data &&
          data.map((member: UserProps, index: number) => (
            <div
              className="text-center"
              onClick={() => router.push(`/profile/${member.username}`)}
              key={index}
            >
              <div className="relative h-48 w-48 rounded-full mx-auto overflow-hidden">
                <Image
                  src={
                    avatarImgs[
                      avatarImgs.findIndex((e) => e.id === `${member.image}`)
                    ].img
                  }
                  fill
                  sizes="100%"
                  alt="member avatar img"
                />
              </div>
              <h1 className="text-xl font-semibold my-5 hover:text-primary cursor-pointer">
                {member.username}
              </h1>
              <div className="flex items-center justify-center gap-3 mb-5">
                <div>{member.reviews.length} Reviews</div>
                <div>{member.watchlist.length} Watchlist</div>
                <div>{member.readlist.length} Readlist</div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default PopularMembers;
