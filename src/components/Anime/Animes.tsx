"use client";

import { useAppContext } from "@/context";

const Animes = () => {
  const { data, ref, hideLoader } = useAppContext();

  return (
    <section className="container mb-10">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-10">
        {data}
      </div>

      <div
        className={`${hideLoader ? "hidden" : "flex"}  justify-center my-16`}
      >
        <div className="loader" ref={ref}></div>
      </div>
    </section>
  );
};

export default Animes;
