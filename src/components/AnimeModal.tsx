"use client";

import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context";

interface AddAnimeProps {
  isOpen: boolean;
  closeModal: () => void;
  img: string;
  title: string;
  type: string;
  userId: string;
  color: string;
}

const AnimeModal = ({
  isOpen,
  closeModal,
  img,
  title,
  type,
  userId,
  color,
}: AddAnimeProps) => {
  const { setShowPopup, setPopupMsg } = useAppContext();
  const [note, setNote] = useState<string>("");
  const [statu, setStatu] = useState("Statu");
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);
  const router = useRouter();

  const handleMouseEnter = (value: any) => {
    setHoveredRating(value);
  };

  const handleMouseLeave = () => {
    setHoveredRating(0);
  };

  const handleClick = (value: any) => {
    setSelectedRating(value);
  };

  const handleSelectChange = (event: any) => {
    setStatu(event.target.value);
  };

  const submitWatchlist = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let createdAt = new Date();

    if (!selectedRating || !statu) {
      return console.log("ta 3amar");
    }

    if (!userId) {
      router.push("/signup");
    }

    try {
      const response = await fetch(`/api/users/${userId}/info`, {
        method: "PATCH",
        body: JSON.stringify({
          type: type,
          title: title,
          img: img,
          statu: statu,
          score: selectedRating,
          createdAt: createdAt.toString(),
        }),
      });

      if (response.ok) {
        console.log("jalalalalal");
        setSelectedRating(0);
      }
    } catch (error) {
      console.log(error);
    } finally {
      closeModal();
      setShowPopup(true);
      setPopupMsg(`${title} has successfully added to your Watchlist`);
    }
  };

  const submitReview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let createdAt = new Date();

    if (!selectedRating || !note) {
      console.log("3amar dak l post");
      return;
    }

    if (!userId) {
      router.push("/signup");
    }

    try {
      const response = await fetch(`/api/users/${userId}/info`, {
        method: "PATCH",
        body: JSON.stringify({
          type: "review",
          userId: userId,
          note: note,
          score: selectedRating,
          title: title,
          img: img,
          createdAt: createdAt.toString(),
        }),
      });

      if (response.ok) {
        console.log("alles gute");
        setSelectedRating(0);
        setNote("");
      }
    } catch (error) {
      console.log(error);
    } finally {
      closeModal();
      setShowPopup(true);
      setPopupMsg(`${title} has successfully added to your Review List`);
    }
  };

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
                        <div className="col-span-2 flex justify-between items-center w-full">
                          {[1, 2, 3, 4, 5].map((value, index) => (
                            <div
                              key={value}
                              className={`text-3xl cursor-pointer ${
                                value <= (hoveredRating || selectedRating)
                                  ? `text-${color}`
                                  : "text-gray-400"
                              }`}
                              onClick={() => handleClick(value)}
                              onMouseEnter={() => handleMouseEnter(value)}
                              onMouseLeave={handleMouseLeave}
                            >
                              <FaStar />
                            </div>
                          ))}
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
                        <div className="col-span-2 flex justify-between items-center w-full">
                          {[1, 2, 3, 4, 5].map((value, index) => (
                            <div
                              key={value}
                              className={`text-3xl cursor-pointer ${
                                value <= (hoveredRating || selectedRating)
                                  ? `text-${color}`
                                  : "text-gray-400"
                              }`}
                              onClick={() => handleClick(value)}
                              onMouseEnter={() => handleMouseEnter(value)}
                              onMouseLeave={handleMouseLeave}
                            >
                              <FaStar />
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-3 mb-10">
                        <h1 className="text-2xl font-normal">Status:</h1>
                        <div className="grid-span-2">
                          <select
                            name="status"
                            className={`outline-none bg-bg-color text-${color} text-lg border-[1px] border-${color} rounded-xl w-[270px] p-2 cursor-pointer`}
                            value={statu}
                            onChange={handleSelectChange}
                          >
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
                        Add To Watchlist
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

export default AnimeModal;
