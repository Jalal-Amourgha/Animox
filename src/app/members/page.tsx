import type { Metadata } from "next";

import { BackgroundImg, PopularMembers, SectionHeader } from "@/components";
import AllMembers from "@/components/AllMembers";
import MembersStats from "@/components/MembersStats";

export const metadata: Metadata = {
  title: "Animox/Members",
  description: "Explore Th Diverse Realms of Anime Magic",
};
const MembersPage = () => {
  return (
    <>
      <BackgroundImg classes="bg-bg-img-4" type="members" />

      <div className="container">
        <h1 className="text-3xl font-bold text-center text-primary mt-10">
          Anime and Manga lovers, critics and friends.
        </h1>

        <PopularMembers />

        <MembersStats />
        <AllMembers />
      </div>
    </>
  );
};

export default MembersPage;
