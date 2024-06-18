import type { Metadata } from "next";

import { img4 } from "@/assets";
import Image from "next/image";
import { RegisterAndLogin, Popup } from "@/components";

import "animate.css";

const SignUpPage = () => {
  return (
    <>
      <section className="max-w-[1000px] mx-auto px-4 my-[100px]">
        <div className="h-[600px] w-full flex flex-row bg-primary rounded-3xl box-shadow overflow-hidden">
          <div className="basis-1/2 hidden md:flex h-full w-full p-10 flex-col">
            <div className="mb-10 text-center">
              <h1 className="text-3xl text-bg-color font-semibold mb-3">
                Welcome To Animox
              </h1>
              <p className="text-bg-color italic">
                Sign In and Join the best Anime Community.
              </p>
            </div>
            <Image
              src={img4}
              className="max-w-full mx-auto"
              alt="sign up img"
            />
          </div>
          <div className="basis-full md:basis-1/2 bg-bg-color p-5 md:p-10 rounded-3xl h-full">
            <RegisterAndLogin />
          </div>
        </div>
      </section>
      <Popup />
    </>
  );
};

export default SignUpPage;
export const metadata: Metadata = {
  title: "Animox/Signup",
  description: "Explore Th Diverse Realms of Anime Magic",
};
