"use client";
import { heroImg } from "@/assets";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="hero__background bg-bg-img-1">
      <div className="container">
        <div className="h-[80vh] md:h-screen w-full flex justify-between md:justify-normal items-center flex-col pt-[100px] md:pt-0 md:flex-row relative z-10">
          <div className="w-full">
            <h1 className="text-5xl md:text-6xl font-bold leading-[120%]">
              Explore The
              <br />
              <span className="text-primary">Diverse Realms</span>
              <br />
              of Anime Magic
            </h1>
          </div>
          <div className="relative w-full h-[60vh]">
            <Image
              src={heroImg}
              fill
              alt="anime"
              className="object-contain md:ml-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
