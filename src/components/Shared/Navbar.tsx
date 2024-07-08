"use client";
import { BsYinYang } from "react-icons/bs";
import { navLinks } from "@/constants";
import Link from "next/link";
import { CgMenu } from "react-icons/cg";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { HiOutlineLogin } from "react-icons/hi";
import { FaRegUser } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context";
import { Button } from "./Button";

const Navbar = () => {
  const { color } = useAppContext();
  const [showNavbar, setShowNavbar] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const [scrollHeight, setScrollHeight] = useState(0);

  useEffect(() => {
    // Function to handle scroll event
    const handleScroll = () => {
      const currentScrollHeight = window.scrollY;
      setScrollHeight(currentScrollHeight);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollHeight]);

  const toggleNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full py-3 ${
        scrollHeight || showNavbar ? "bg-bg-color" : ""
      } `}
    >
      <div className="container">
        <nav className="flex justify-between w-full">
          <Link
            href={"/"}
            className={`flex items-center gap-3 text-2xl font-semibold w-fit ${
              color === "yellow" ? "text-primary2" : "text-primary"
            }`}
          >
            <BsYinYang />
            <h1>Animox</h1>
          </Link>

          <ul className="hidden md:flex items-center list-none relative">
            {navLinks.map((link) => (
              <li
                className={`text-white text-xl font-medium my-2 pb-1 mx-5 relative cursor-pointer link ${color} `}
                key={link.label}
              >
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
            {session?.user?.email ? (
              <div
                className="cursor-pointer relative"
                onClick={() => setIsUserLoggedIn(!isUserLoggedIn)}
              >
                <FaRegCircleUser
                  className={`text-2xl  ${
                    color === "yellow" ? "text-primary2" : "text-primary"
                  }`}
                />
                {isUserLoggedIn ? (
                  <div
                    className={`absolute top-[40px] right-0 bg-bg-color text-white rounded-lg w-[200px] border-[1px] ${
                      color === "yellow" ? "border-primary2" : "border-primary"
                    } p-5`}
                  >
                    <Link
                      href="/profile"
                      className="flex items-center gap-5 mb-5"
                    >
                      <FaRegUser /> Profile
                    </Link>
                    <div
                      className="flex items-center gap-5"
                      onClick={() => signOut()}
                    >
                      <HiOutlineLogin /> Log out
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ) : (
              <Button
                title="Sign in"
                bg={true}
                handleClick={() => router.push("/sign-up")}
              />
            )}
          </ul>
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleNavbar}
              className={`text-2xl ${
                color === "yellow" ? "text-primary2" : "text-primary"
              } cursor-pointer`}
            >
              {showNavbar ? <IoClose /> : <CgMenu />}
            </button>

            <div
              className={`absolute top-[54px] left-0 overflow-hidden flex justify-center items-center w-full ${
                showNavbar ? "h-[calc(100vh-54px)] block" : "h-[0px]"
              } duration-500 bg-bg-color z-50`}
            >
              <div>
                <ul className="list-none text-center">
                  {navLinks.map((link) => (
                    <li
                      className={`text-white text-xl font-medium p-3 my-3 duration-200 hover:${
                        color === "yellow" ? "text-primary2" : "text-primary"
                      } hover:bg-white hover:bg-opacity-10 rounded-lg cursor-pointer`}
                      key={link.label}
                    >
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
