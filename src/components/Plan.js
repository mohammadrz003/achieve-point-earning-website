import React from "react";
import { Link } from "react-router-dom";
import { images } from "../constants";

const Plan = ({ title, starNumber, caption, listItems, buyLink }) => {
  return (
    <div className="w-full flex flex-col rounded-lg shadow-md p-5">
      <h4 className="text-center text-3xl font-semibold text-[#5A5A5A]">
        {title}
      </h4>
      <div className="w-full flex justify-center items-center mt-5">
        {[...Array(starNumber)].map((value, index) => (
          <img key={index} className="w-8 h-8" src={images.star} alt="star" />
        ))}
      </div>
      <p className="font-medium text-[#969696] mt-5">{caption}</p>
      <ul className="w-full flex flex-col gap-y-5 mt-6 font-medium text-blue-600">
        {listItems.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
      <a
        href={buyLink}
        className="rounded-lg border border-blue-500 px-6 py-3 mt-10 font-medium text-blue-500 text-center"
      >
        Buy Now
      </a>
    </div>
  );
};

export default Plan;
