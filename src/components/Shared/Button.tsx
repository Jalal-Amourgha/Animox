"use client";

import { useAppContext } from "@/context";
import { ButtonProps } from "@/types";
import { useEffect, useState } from "react";

export const Button = ({
  title,
  bg,
  handleClick,
  classes = "",
}: ButtonProps) => {
  const { color } = useAppContext();

  return (
    <button
      className={`
      ${
        color === "yellow"
          ? "bg-primary2 border-primary2 hover:text-primary2"
          : "bg-primary border-primary hover:text-primary"
      }
   
      h-fit
      py-2 px-6 border-2  rounded-md text-xl font-medium text-bg-color duration-500 hover:bg-inherit
        
      
      ${classes}
      `}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};
