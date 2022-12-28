import React from "react";
import { Web3NetworkSwitch } from "@web3modal/react";

import { images } from "../constants";

const Profile = ({ userProfile, onClickHandler }) => {

  return (
    <div className="relative overflow-hidden bg-white rounded-lg shadow w-60 md:w-72">
      <img
        src={images.apeLogo}
        alt="ape logo"
        className="absolute w-24 h-24 rounded-full opacity-50 -top-6 -right-6 md:-right-4"
      />
      <div className="px-4 py-5 sm:p-6">
        <dl>
          <dt className="text-sm font-medium leading-5 text-gray-500 truncate">
            APE token amount
          </dt>
          <dd className="mt-1 text-3xl font-semibold leading-9 text-gray-900">
            {userProfile ? userProfile.Balance : "loading..."} APE
          </dd>
          <dd className="font-semibold text-gray-500">
            <span>
              $ {userProfile ? userProfile.Balance * 4 : "loading..."}
            </span>
          </dd>
          <dd className="mt-2.5">
            <button
              onClick={onClickHandler}
              className="w-full px-2 py-2 rounded-lg bg-cyan-500 text-white font-bold"
            >
              Buy More
            </button>
          </dd>
          <dd className="mt-2.5">
            <Web3NetworkSwitch />
          </dd>
        </dl>
      </div>
    </div>
  );
};

export default Profile;
