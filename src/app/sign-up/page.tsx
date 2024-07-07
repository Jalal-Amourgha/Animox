"use client";
import { img4 } from "@/assets";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
// import { RegisterAndLogin, } from "@/components";
// import "animate.css";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleFocus = (inputName: string) => {
    setFocusedInput(inputName);
  };

  const handleBlur = () => {
    setFocusedInput("");
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password || !username) {
      return setError("Please fill all the fields");
    }

    try {
      const res = await fetch("api/sign-up", {
        method: "POST",
        body: JSON.stringify({
          email,
          username,
          password,
        }),
      });

      if (res.ok) {
        console.log("all good in the hood");
        setEmail("");
        setUsername("");
        setPassword("");
      } else {
        setError("This email or username is already taken");
      }
    } catch (error) {
      console.log(error);
    } finally {
      router.push("/sign-in");
    }
  };
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
                Sign Up and Join the best Anime Community.
              </p>
            </div>
            <Image
              src={img4}
              className="max-w-full mx-auto"
              alt="sign up img"
            />
          </div>
          <div className="basis-full md:basis-1/2 bg-bg-color p-5 md:p-10 rounded-3xl h-full flex flex-col justify-between">
            <h1 className="text-3xl font-semibold mb-5">Create Account!</h1>
            <form onSubmit={handleRegister}>
              <div className="mb-5">
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => {
                    /^[^ ]*$/.test(e.target.value)
                      ? setUsername(e.target.value)
                      : "";
                  }}
                  className={`signup__input ${
                    focusedInput === "username" ? "onfocus" : ""
                  }`}
                  onFocus={() => handleFocus("username")}
                  onBlur={handleBlur}
                />
              </div>
              <div className="mb-5">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`signup__input ${
                    focusedInput === "email" ? "onfocus" : ""
                  }`}
                  onFocus={() => handleFocus("email")}
                  onBlur={handleBlur}
                />
              </div>
              <div className="mb-5 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`signup__input ${
                    focusedInput === "password" ? "onfocus" : ""
                  }`}
                  onFocus={() => handleFocus("password")}
                  onBlur={handleBlur}
                />
                {showPassword ? (
                  <FaRegEye
                    className="password__icon text-primary"
                    onClick={toggleShowPassword}
                  />
                ) : (
                  <FaRegEyeSlash
                    className="password__icon"
                    onClick={toggleShowPassword}
                  />
                )}
              </div>
              {error && (
                <div className="bg-red-500 text-white text-lg p-2 rounded-lg mb-5">
                  {error}
                </div>
              )}
              <button
                type="submit"
                className="p-2 bg-primary text-bg-color text-lg font-bold w-full rounded-full"
              >
                Sign up
              </button>
            </form>

            <p className="text-slate-300 text-center mt-5">
              Already have an account?{" "}
              <span
                className="text-primary cursor-pointer"
                onClick={() => router.push("/sign-in")}
              >
                Sign In
              </span>
            </p>
          </div>
        </div>
      </section>
      {/* <Popup /> */}
    </>
  );
};

export default SignUpPage;
