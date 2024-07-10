"use client";
import { google, apple, mobileImg } from "@/assets";
import Image from "next/image";

const DownloadApp = () => {
  return (
    <section className="container rounded-xl my-16 bg-primary">
      <div className="flex__elements p-3 md:p-5">
        <div>
          <h1 className="text-2xl md:text-4xl text-bg-color font-bold">
            Download our Mobile App
          </h1>
          <p className="text-bg-color text-base md:text-lg  md:w-3/4 my-5">
            Take your anime and manga obsession on the go with our mobile app!
            Dive into a world of endless entertainment right at your fingertips.
            Whether you&apos;re searching for your favorite series or eager to
            rate and review the latest releases, our app provides the perfect
            platform for anime and manga enthusiasts everywhere. Download now
            and unlock a universe of immersive storytelling and unforgettable
            characters anytime, anywhere.
          </p>
          <div className="flex flex-row gap-5">
            <Image
              src={google}
              className="w-[120px] cursor-pointer"
              alt="google icon"
            />
            <Image
              src={apple}
              className="w-[120px] cursor-pointer"
              alt="apple icon"
            />
          </div>
        </div>
        <div className="">
          <div className="relative">
            <Image
              src={mobileImg}
              className="md:max-w-[100%] lg:max-w-[80%]  ml-auto"
              alt="img"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadApp;
