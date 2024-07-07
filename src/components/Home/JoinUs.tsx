"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { img6 } from "@/assets";
import { Button } from "../Shared/Button";

const JoinUs = () => {
  const router = useRouter();

  const handleSignup = () => {
    // router.push("/signup");
  };

  return (
    <section className="my-20">
      <div className="container">
        <div className="flex__elements">
          <div className="order-2 md:order-1">
            <div className="img-border-2">
              <Image src={img6} className="max-w-[94%]" alt="img" />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h1 className="text-5xl text-white font-bold leading-[120%]">
              Sign Up Now
              <br />
              To Join our Amazing
              <br />
              <span className="text-primary">Community</span>
            </h1>
            <Button
              title="Sign up"
              bg={true}
              classes="mt-5"
              handleClick={handleSignup}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinUs;
