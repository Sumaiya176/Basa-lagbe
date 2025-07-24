import React from "react";

const HeroSection = () => {
  return (
    <div className="h-screen">
      <div
        className="relative h-[350px] bg-cover  bg-center overflow-hidden rounded-xl mt-7"
        style={{ backgroundImage: "url('/hero1.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-70" />
        <div className="relative z-10 flex flex-col items-center justify-center h-[400px]">
          <p className="text-white text-xl px-5 md:text-4xl font-bold tracking-wide">
            Find your perfect rental with Basa Lagbe
          </p>
          <p className="text-white text-base px-5 md:text-xl font-light tracking-wide my-3">
            Rent from verified landlords. No agent fees..
          </p>
          <button className="bg-[#CC313D] rounded text-base font-light text-white p-3 md:p-5">
            Get Started
          </button>
        </div>
        <div className=""></div>
      </div>
    </div>
  );
};

export default HeroSection;
