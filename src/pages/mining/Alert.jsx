import React from "react";
import { FcCancel } from "react-icons/fc";

const Alert = ({ showAlertHandler, deletePlanHandler }) => {
  return (
    <div className="relative z-50 w-64 p-4 m-auto bg-white shadow-lg rounded-2xl">
      <div className="w-full h-full text-center">
        <div className="flex flex-col justify-between h-full">
          <FcCancel className="w-12 h-12 m-auto mt-4 text-indigo-500" />
          <p className="mt-4 text-xl font-bold text-gray-800">Cancel Plan</p>
          <p className="px-6 py-2 text-gray-600 font-semibold text-sm">
            <span className="text-red-500">Note*</span>: make sure you claim all
            the remaining reward for this plan. otherwise, all your reward will
            be gone!
          </p>
          <div className="flex items-center justify-between w-full gap-4 mt-8">
            <button
              onClick={deletePlanHandler}
              type="button"
              className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            >
              Delete
            </button>
            <button
              onClick={showAlertHandler}
              type="button"
              className="py-2 px-4  bg-white hover:bg-gray-100 focus:ring-indigo-500 focus:ring-offset-indigo-200 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            >
              Discard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alert;
