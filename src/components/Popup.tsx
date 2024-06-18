"use client";
import { FaCheckCircle } from "react-icons/fa";
import "animate.css";
import { useAppContext } from "@/context";
import { useEffect, useState } from "react";

const Popup = () => {
  const { showPopup, setShowPopup, popupMsg } = useAppContext();

  useEffect(() => {
    let countdownInterval: any;

    if (showPopup) {
      countdownInterval = setInterval(() => {
        setShowPopup(false);
      }, 4000);
    }
    return () => {
      clearInterval(countdownInterval);
    };
  }, [showPopup, setShowPopup]);

  return (
    <div
      className={`fixed top-10 left-0 ${
        showPopup ? "z-[100]" : "z-10"
      } w-full flex justify-center items-center overflow-hidden`}
      style={{ background: "none" }}
    >
      <div
        className={`bg-bg-color w-fit text-center text-primary flex items-center justify-center flex-col py-5 px-10 border-t-[10px] border-primary rounded-lg animate__animated  ${
          showPopup ? "block animate__backInLeft" : "animate__backOutRight"
        }
        `}
      >
        <FaCheckCircle className="text-5xl" />
        <h1 className="text-2xl mt-5">{popupMsg}</h1>
      </div>
    </div>
  );
};

export default Popup;
