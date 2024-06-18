"use client";

import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { googleIcon } from "@/assets";
import Image from "next/image";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

import { useAppContext } from "@/context";
import { useRouter } from "next/navigation";

const RegisterAndLogin = () => {
  const { setShowPopup, setPopupMsg } = useAppContext();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState("");
  const [error, setError] = useState("");
  const [dontHaveAccount, setDontHaveAccoutn] = useState(true);
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
      const res = await fetch("api/register", {
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
      setShowPopup(true);
      setPopupMsg("You have successfully Registered!");
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      return setError("Please fill all the fields");
    }

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.ok) {
        console.log("allo");
        router.push("/profile");
      }
    } catch (error) {
      setError("Password or Email is not Correct!");
    }
  };

  return (
    <>
      <section>
        <h1 className="text-3xl font-semibold mb-5">Create Account!</h1>
        <form onSubmit={dontHaveAccount ? handleRegister : handleLogin}>
          <div className="mb-5">
            {dontHaveAccount ? (
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`signup__input ${
                  focusedInput === "username" ? "onfocus" : ""
                }`}
                onFocus={() => handleFocus("username")}
                onBlur={handleBlur}
              />
            ) : (
              ""
            )}
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
            {dontHaveAccount ? "Sign up" : "Log in"}
          </button>
        </form>
        <div className="other__methods">
          <p className="text-slate-300 px-3 bg-bg-color w-fit mx-auto relative z-10">
            Or Sign up with
          </p>
        </div>

        <div
          className="p-[6px] bg-white flex items-center justify-center w-full border-[1px] border-slate-300 rounded-lg mx-auto cursor-pointer"
          onClick={() => signIn("google")}
        >
          <Image src={googleIcon} height={26} width={26} alt="google icon" />
          <p className="text-black font-normal text-lg ml-3">
            Continue with Google
          </p>
        </div>

        {dontHaveAccount ? (
          <p className="text-slate-300 text-center mt-5">
            Already have an account?{" "}
            <span
              className="text-primary cursor-pointer"
              onClick={() => setDontHaveAccoutn(false)}
            >
              Sign In
            </span>
          </p>
        ) : (
          <p className="text-slate-300 text-center mt-5">
            Don't Have an Account yet?{" "}
            <span
              className="text-primary cursor-pointer"
              onClick={() => setDontHaveAccoutn(true)}
            >
              Sign Up
            </span>
          </p>
        )}
      </section>
    </>
  );
};

export default RegisterAndLogin;
