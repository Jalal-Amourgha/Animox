"use client";
import {
  AllMembers,
  BackgroundImg,
  PopularMembers,
  MembersReviews,
} from "@/components";
import { useAppContext } from "@/context";

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

        {users.length && <MembersReviews />}

        {users && <AllMembers data={users} />}
      </div>
    </>
  );
};

export default MembersPage;
