"use client";

import { useAppContext } from "@/context";

interface BackgroundImgprops {
  classes: string;
  type?: string;
}
const BackgroundImg = ({ classes, type }: BackgroundImgprops) => {
  const { color } = useAppContext();
  return (
    <div
      className={`overlay relative z-10 h-[37vh] w-full ${classes} bg-cover bg-no-repeat  flex justify-center items-center`}
    >
      <div className="relative z-10 text-center">
        <h1 className="text-3xl font-semibold mb-5">Online {type}</h1>
        <p className="text-lg font-medium">
          Home /{" "}
          <span
            className={`${
              color === "yellow" ? "text-primary2" : "text-primary"
            }`}
          >
            {type}
          </span>
        </p>
      </div>
    </div>
  );
};

export default BackgroundImg;
