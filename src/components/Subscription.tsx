"use client";
const Subscription = () => {
  return (
    <section className="container my-16">
      <h1 className="text-2xl md:text-4xl text-primary font-semibold text-center">
        Subscribe Newsletter
      </h1>
      <p className="text-white text-center text-md md:text-xl mt-3 mb-7">
        You will never miss Animes letest news. Our newsletter is once a week,
        every Friday.
      </p>
      <div className="relative max-w-[600px] m-auto">
        <input
          type="text"
          className="p-3 bg-bg-color text-white text-md md:text-xl md:text-center border-2 border-primary rounded-full outline-none w-full"
          placeholder="Enter your email"
        />
        <button className="absolute top-0 right-0 bg-primary p-[13px] text-white font-medium text-md md:text-xl rounded-full">
          Subscribe
        </button>
      </div>
    </section>
  );
};

export default Subscription;
