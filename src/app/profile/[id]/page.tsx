"use client";

import { avatar1, banner1 } from "@/assets";
import { UserInfo } from "@/components";
import UserProfile from "@/components/UserProfile";
import { avatarImgs, bannerImgs } from "@/constants";
import Image from "next/image";
import { useState, useEffect, FC } from "react";

interface UserProfilePageProps {
  params: {
    id: string;
  };
}

const UserProfilePage: FC<UserProfilePageProps> = ({ params }) => {
  return (
    <>
      <UserProfile userId={params.id} />
    </>
  );
};

export default UserProfilePage;
