"use client";
import {
  AllMembers,
  BackgroundImg,
  Loader,
  MembersStats,
  PopularMembers,
} from "@/components";
import { useAppContext } from "@/context";
import { useEffect, useState } from "react";

const MembersPage = () => {
  const { users } = useAppContext();

  return (
    <>
      <BackgroundImg classes="bg-bg-img-4" type="members" />

      <div className="container">
        <h1 className="text-3xl font-bold text-center text-primary mt-10">
          Anime and Manga lovers, critics and friends.
        </h1>

        {users && <PopularMembers data={users} />}

        {/* <MembersStats /> */}

        {users && <AllMembers data={users} />}
      </div>
    </>
  );
};

export default MembersPage;
