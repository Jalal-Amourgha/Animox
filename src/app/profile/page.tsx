import type { Metadata } from "next";
import { UserInfo } from "@/components";

const MyProfilePage = () => {
  return (
    <>
      <UserInfo />
    </>
  );
};

export default MyProfilePage;

export const metadata: Metadata = {
  title: "Profile",
  description: "Explore Th Diverse Realms of Anime Magic",
};
