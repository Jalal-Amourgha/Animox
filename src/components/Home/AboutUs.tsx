"use client";
import { img7 } from "@/assets";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "../Shared/Button";

const AboutUs = () => {
  const router = useRouter();
  return (
    <>
      <section>
        <div className="container my-20">
          <div className="flex__elements">
            <div>
              <h1 className="text-5xl text-white font-bold leading-[120%]">
                We Have over
                <br />
                <span className="text-primary">100 Anime and Manga</span>
                <br /> With official License
              </h1>
              <Button
                title="View more"
                bg={true}
                classes="mt-5"
                handleClick={() => router.push("/anime")}
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
