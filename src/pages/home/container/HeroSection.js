import React from "react";

import { images } from "../../../constants";

const HeroSection = () => {
  return (
    <section className="container flex flex-col-reverse lg:flex-row w-full px-5 py-3 min-h-[calc(100vh-80px) lg:max-h-[600px] mx-auto border-b-2 border-b-gray-500 pb-12">
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start">
        <h2 className="text-center text-3xl lg:text-left lg:text-5xl xl:text-6xl lg:leading-snug xl:leading-normal font-semibold leading-normal">
          Start Your Fantastic
          <br />
          Cryptocurrency
          <br />
          Mining Today
        </h2>
        <p className="w-full text-center lg:text-left md:w-[80%] mt-3 leading-normal">
          Achieve Point Earning aims to extend business to the entire
          Cryptocurrency industry chain in the future
        </p>
        <button class="mt-7 bg-gray-800 inline-flex py-3 px-5 rounded-lg items-center hover:bg-gray-900 focus:outline-none">
          <img
            className="w-6 h-auto"
            src={images.googlePlay}
            alt="google-play"
          />
          <span className="ml-4 flex items-start flex-col leading-none">
            <span className="text-xs text-gray-100 mb-1">GET IT ON</span>
            <span className="title-font font-medium text-gray-50">
              Google Play
            </span>
          </span>
        </button>
        <div className="w-full flex items-center justify-center lg:justify-start gap-x-7 flex-wrap mt-6">
          <div className="flex items-center gap-x-2">
            <span className="bg-cyan-600 rounded-full w-5 h-5" />
            <p>Free Register</p>
          </div>
          <div className="flex items-center gap-x-2">
            <span className="bg-cyan-600 rounded-full w-5 h-5" />
            <p>Great Service</p>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex flex-col justify-center">
        <img className="w-full h-auto" src={images.headerLogo} alt="logo" />
      </div>
    </section>
  );
};

export default HeroSection;
