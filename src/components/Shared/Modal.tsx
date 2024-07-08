"use client";

import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context";
import { Rating, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";

import StarRoundedIcon from "@mui/icons-material/StarRounded";

import StarHalfRoundedIcon from "@mui/icons-material/StarHalfRounded";

interface AddAnimeProps {
  isOpen: boolean;
  closeModal: () => void;
  img: string;
  title: string;
  type: string;

  color?: string;
}

const Modal = ({
  isOpen,
  closeModal,
  img,
  title,
  type,
  color,
}: AddAnimeProps) => {
  const { userData, reFetchUserData, setReFetchUserData } = useAppContext();
  const [note, setNote] = useState<string>("");
  const [statu, setStatu] = useState("");

  const router = useRouter();
  const [rate, setRate] = React.useState<number | null>(0);
  const [hover, setHover] = React.useState(-1);

  const submitWatchlist = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let createdAt = new Date();

    if (!rate || !statu) {
      return;
    }

    if (!userData.email) {
      router.push("/sign-up");
    }

    try {
      const response = await fetch(`/api/user/${userData.email}/infos`, {
        method: "PATCH",
        body: JSON.stringify({
          type: type,

          title: title,
          img: img,
          statu: statu,
          score: rate,
          createdAt: createdAt.toString(),
        }),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setRate(0);
      setNote("");
      closeModal();
      setReFetchUserData(reFetchUserData + 1);
    }
  };

  const submitReview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let createdAt = new Date();

    if (!rate || !note) {
      return;
    }

    if (!userData.email) {
      router.push("/sign-up");
    }

    try {
      const response = await fetch(`/api/user/${userData.email}/infos`, {
        method: "PATCH",
        body: JSON.stringify({
          type: "review",
          note: note,
          score: rate,
          title: title,
          img: img,
          createdAt: createdAt.toString(),
        }),
      });

      if (response.ok) {
        setRate(0);
        setNote("");
      }
    } catch (error) {
      console.log(error);
    } finally {
      closeModal();
      setReFetchUserData(reFetchUserData + 1);
    }
  };

  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: `${color === "primary2" ? "#FFFF80" : "#a6fe71"}`,
    },
    "& .MuiRating-iconHover": {
      color: `${color === "primary2" ? "#FFFF80" : "#a6fe71"}`,
    },
  });

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform  rounded-2xl bg-bg-color p-6 text-left align-middle shadow-xl transition-all relative">
                <button
                  className={`h-[40px] w-[40px] flex justify-center items-center absolute top-[-20px] right-[-20px] bg-bg-color text-${color} border-[1px] border-${color} text-lg rounded-full`}
                  onClick={closeModal}
                >
                  <IoClose />
                </button>

                <div>
                  <div className={`bg-${color} py-6 rounded-lg mb-5`}>
                    <h1
                      className={`text-2xl text-bg-color text-center font-semibold`}
                    >
                      {title}
                    </h1>
                  </div>
                  {type === "review" ? (
                    <form onSubmit={submitReview}>
                      <div className="grid grid-cols-3 mb-10">
                        <h1 className="text-2xl font-normal">Score:</h1>

                        <div className="col-span-2 mx-auto">
                          <StyledRating
                            name="customized-color"
                            defaultValue={2}
                            getLabelText={(value: number) =>
                              `${value} Heart${value !== 1 ? "s" : ""}`
                            }
                            value={rate}
                            onChange={(event, newValue) => {
                              setRate(newValue);
                            }}
                            onChangeActive={(event, newHover) => {
                              setHover(newHover);
                            }}
                            precision={0.1}
                            icon={<StarRoundedIcon fontSize="inherit" />}
                            emptyIcon={
                              <StarOutlineRoundedIcon fontSize="inherit" />
                            }
                            size="large"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 mb-10">
                        <h1 className="text-2xl font-normal">Note:</h1>
                        <textarea
                          value={note}
                          onChange={(e) => setNote(e.target.value)}
                          placeholder="Type your POV  about this anime"
                          className={`col-span-2 p-3 bg-bg-color border-[1px] border-${color} text-xl rounded-lg outline-none w-full`}
                          rows={5}
                          maxLength={250}
                        ></textarea>
                      </div>
                      <button
                        type="submit"
                        className={`w-full bg-${color} p-2 text-lg text-bg-color font-bold rounded-full`}
                      >
                        Add Review
                      </button>
                    </form>
                  ) : (
                    <form onSubmit={submitWatchlist}>
                      <div className="grid grid-cols-3 mb-10">
                        <h1 className="text-2xl font-normal">Score:</h1>
                        <div className="col-span-2 mx-auto">
                          <StyledRating
                            name="customized-color"
                            defaultValue={2}
                            getLabelText={(value: number) =>
                              `${value} Heart${value !== 1 ? "s" : ""}`
                            }
                            value={rate}
                            onChange={(event, newValue) => {
                              setRate(newValue);
                            }}
                            onChangeActive={(event, newHover) => {
                              setHover(newHover);
                            }}
                            precision={0.1}
                            icon={<StarRoundedIcon fontSize="inherit" />}
                            emptyIcon={
                              <StarOutlineRoundedIcon fontSize="inherit" />
                            }
                            size="large"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 mb-10">
                        <h1 className="text-2xl font-normal">Status:</h1>
                        <div className="grid-span-2">
                          <select
                            name="status"
                            className={`outline-none bg-bg-color text-${color} text-lg border-[1px] border-${color} rounded-xl w-[270px] p-2 cursor-pointer`}
                            value={statu}
                            onChange={(e) => setStatu(e.target.value)}
                          >
                            <option value="" disabled hidden>
                              Statu
                            </option>
                            {type === "watchlist" ? (
                              <option value={"watched"}>Watched</option>
                            ) : (
                              <option value={"read"}>Read</option>
                            )}

                            <option value="dropped">Dropped</option>
                            <option value="onhold">on-Hold</option>
                          </select>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className={`w-full bg-${color} p-2 text-lg text-bg-color font-bold rounded-full`}
                      >
                        Add To {type === "watchlist" ? "Watchlist" : "Readlist"}
                      </button>
                    </form>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
