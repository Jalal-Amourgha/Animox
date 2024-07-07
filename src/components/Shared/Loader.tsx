import React from "react";

const Loader = () => {
  return (
    <div className="h-screen w-full fixed top-0 left-0 z-[200] bg-black  flex items-center justify-center">
      <div className="loading"></div>
    </div>
  );
};

export default Loader;
