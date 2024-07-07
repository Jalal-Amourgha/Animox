"use client";

import { useAppContext } from "@/context";

const Header = ({ title }: { title: string }) => {
  const { color } = useAppContext();
  return (
    <div className="relative mt-[100px] mb-10">
      <h1
        className={`text-3xl ${
          color === "yellow" ? "text-primary2" : "text-primary"
        } font-semibold  bg-bg-color pe-5 w-fit relative z-10`}
      >
        {title}
      </h1>
      <div
        className={`absolute right-0 top-[40%] z-0 h-[2px] mt-2 w-full ${
          color === "yellow" ? "bg-primary2" : "bg-primary"
        }  rounded-full`}
      ></div>
    </div>
  );
};

export default Header;
