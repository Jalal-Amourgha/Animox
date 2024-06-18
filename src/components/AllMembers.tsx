"use client";

import { avatarImgs } from "@/constants";
import Image from "next/image";
import SectionHeader from "./SectionHeader";
import { IoBook, IoEye } from "react-icons/io5";
import { MdRateReview } from "react-icons/md";

const AllMembers = () => {
  return (
    <section className="container">
      <SectionHeader title="Members" />
      <div className="flex flex-row gap-10">
        <div className="basis-2/3 flex flex-col">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((member, index) => (
            <div
              className="flex items-center gap-10 border-b-[1px] border-primary py-5"
              key={index}
            >
              <div className="relative h-14 w-14 rounded-full overflow-hidden">
                <Image
                  src={
                    avatarImgs[
                      avatarImgs.findIndex((e) => e.id === `avatar${member}`)
                    ].img
                  }
                  fill
                  sizes="100%"
                  alt="member avatar"
                />
              </div>
              <div className="flex items-center justify-between w-full">
                <h1 className="text-xl font-bold">Member_{member}</h1>
                <div className="flex items-center text-xl gap-3">
                  <MdRateReview className="text-primary" />8
                </div>
                <div className="flex items-center text-xl gap-3">
                  <IoEye className="text-primary" />
                  28
                </div>
                <div className="flex items-center text-xl gap-3">
                  <IoBook className="text-primary" />
                  10
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllMembers;
