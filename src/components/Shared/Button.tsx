import { ButtonProps } from "@/types";

export const Button = ({
  title,
  bg,
  handleClick,
  classes = "",
}: ButtonProps) => {
  return (
    <button
      className={`
      text-xl font-medium
   
      h-fit
      ${
        bg
          ? "bg-primary py-2 px-6 border-2 border-primary rounded-md text-xl font-medium text-bg-color duration-500 hover:bg-bg-color hover:text-primary"
          : "bg-bg-color text-primary"
      }
      ${classes}
      `}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};
