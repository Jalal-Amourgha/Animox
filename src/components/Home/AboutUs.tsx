"use client";
import { img7 } from "@/assets";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "../Shared/Button";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { FaStarHalfAlt } from "react-icons/fa";
import { useState } from "react";

const AboutUs = () => {
  return (
    <>
      <section>
        <div className="container my-20">
          <div className="flex__elements">
            <div>
              <h1 className="text-5xl text-white font-bold leading-[120%]">
                We Have over
                <br />
                <span className="text-primary">11000 Anime and Manga</span> With
                <br />
                official License
              </h1>
              <Button
                title="View more"
                bg={true}
                classes="mt-5"
                // handleClick={handleViewMore}
              />
            </div>
            <div>
              <div className=" img-border-1 ml-auto">
                <Image
                  src={img7}
                  className="max-w-[100%] md:max-w-[80%]"
                  alt="about img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
