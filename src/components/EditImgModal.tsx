"use client";

import { avatarImgs, bannerImgs } from "@/constants";
import Image from "next/image";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

interface EditImgModalProps {
  closeModal: () => void;
  userId: any;
  type: String;
}

const EditImgModal = ({ closeModal, userId, type }: EditImgModalProps) => {
  const [selectedImg, setSelectedImg] = useState<string>("");

  const handleChangeBannerImg = async () => {
    console.log(selectedImg, type);

    try {
      const response = await fetch(`/api/users/${userId}/info`, {
        method: "PATCH",
        body: JSON.stringify({
          type: type,
          newImg: selectedImg,
        }),
      });

      if (response.ok) {
        console.log("jalalalalal");
      }
    } catch (error) {
      console.log(error);
    } finally {
      closeModal();
    }
  };

  return (
    <div className="h-screen w-full fixed top-0 left-0 z-[200] flex justify-center imgs-center overlay">
      <div className="bg-bg-color max-w-[1300px] w-[1300px] h-[80vh] mx-2 my-auto p-5 rounded-lg relative z-[999] overflow-y-scroll overflow-x-hidden hide__scrollbar">
        <h1 className="text-3xl text-white text-center mb-10">
          Select your Banner Image
        </h1>
        <button
          className="absolute top-2 right-2 z-30 text-primary text-3xl rounded-full"
          onClick={closeModal}
        >
          <IoClose />
        </button>
        {type === "banner" ? (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 w-full h-full">
            {bannerImgs.map((img, index) => (
              <div
                className={`relative max-w-full rounded-lg overflow-hidden ${
                  selectedImg === img.id
                    ? "outline outline-offset-4 outline-4 outline-primary"
                    : ""
                }`}
                onClick={() => setSelectedImg(img.id)}
                key={img.id}
              >
                <Image
                  src={img.img}
                  fill
                  sizes="100%"
                  className="object-cover cursor-pointer"
                  alt="img"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 w-full h-full">
            {avatarImgs.map((img, index) => (
              <div
                className={`relative h-40 w-40 rounded-full mx-auto overflow-hidden ${
                  selectedImg === img.id
                    ? "outline outline-offset-4 outline-4 outline-primary"
                    : ""
                }`}
                onClick={() => setSelectedImg(img.id)}
                key={img.id}
              >
                <Image
                  src={img.img}
                  fill
                  sizes="100%"
                  className="object-cover cursor-pointer"
                  alt="img"
                />
              </div>
            ))}
          </div>
        )}

        <div
          className={`w-full text-center mt-10 ${
            selectedImg ? "block" : "hidden"
          }`}
        >
          <button
            className="bg-primary text-bg-color py-2 px-4 rounded-lg "
            onClick={handleChangeBannerImg}
          >
            Selected
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditImgModal;
