import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { TfiLock } from "react-icons/tfi";
import { useSelector } from "react-redux";

import { API, images, TOKEN } from "../constants";
import toast from "react-hot-toast";

const Plan = ({
  title,
  starNumber,
  caption,
  listItems,
  planType,
  userProfile,
  setUserProfile,
}) => {
  const walletState = useSelector((state) => state.wallet);
  const authState = useSelector((state) => state.auth);
  const [apeAmount, setApeAmount] = useState(
    planType === 1 ? 25 : planType === 2 ? 250 : 500
  );
  const [isLocked, setIsLocked] = useState(true);

  useEffect(() => {
    if (userProfile) {
      if (planType === 1) {
        setIsLocked(userProfile?.Balance < TOKEN.planOneMinimum ? true : false);
      } else if (planType === 2) {
        setIsLocked(userProfile?.Balance < TOKEN.planTwoMinimum ? true : false);
      } else if (planType === 3) {
        setIsLocked(
          userProfile?.Balance < TOKEN.planThreeMinimum ? true : false
        );
      }
    }
  }, [planType, userProfile?.Balance, userProfile]);

  const inputChangeHandler = (e) => {
    setApeAmount(e.target.value);
  };

  const buyPlanHandler = async () => {
    try {
      if (planType === 1) {
        if (
          +apeAmount < TOKEN.planOneMinimum ||
          +apeAmount > TOKEN.planTwoMinimum - 1
        ) {
          toast.error(
            `enter a valid number between ${TOKEN.planOneMinimum} and ${
              TOKEN.planTwoMinimum - 1
            }`
          );
          return;
        }
      } else if (planType === 2) {
        if (
          +apeAmount < TOKEN.planTwoMinimum ||
          +apeAmount > TOKEN.planThreeMinimum - 1
        ) {
          toast.error(
            `enter a valid number between ${TOKEN.planTwoMinimum} and ${
              TOKEN.planThreeMinimum - 1
            }`
          );
          return;
        }
      } else {
        if (+apeAmount < TOKEN.planThreeMinimum) {
          toast.error(
            `enter a valid number upper than ${TOKEN.planThreeMinimum}
            }`
          );
          return;
        }
      }

      const { data } = await axios.post(
        `${API.API_URL}/tokenTransfer/buyPlan`,
        {
          user: {
            email: authState.user.email,
            Wallet: walletState.walletAddress,
          },
          planType: planType,
          apeAmount: Number(apeAmount),
        }
      );
      console.log(data);
      setUserProfile(data.user);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full flex flex-col rounded-lg shadow-md p-5 bg-white">
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
      {!isLocked && (
        <input
          type="number"
          placeholder="enter APE amount"
          className="mt-8 w-full focus:outline-none border border-gray-400 p-2 rounded-lg text-center font-semibold"
          value={apeAmount}
          onChange={inputChangeHandler}
        />
      )}

      <button
        onClick={buyPlanHandler}
        type="button"
        className="disabled:opacity-80 disabled:cursor-not-allowed text-white rounded-lg flex justify-center border disabled:bg-blue-500 disabled:hover:bg-blue-600 bg-green-500 hover:bg-green-600 text-center px-6 py-3 mt-5 font-medium"
        disabled={isLocked}
      >
        {isLocked ? <TfiLock className="w-7 h-7 text-white" /> : "Buy Now"}
      </button>
    </div>
  );
};

export default Plan;
