import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoCloseOutline } from "react-icons/io5";

import { images } from "../constants";

const Header = () => {
  const [showHeader, setShowHeader] = useState(false);

  const toggleHeaderHandler = () => {
    setShowHeader((prevState) => {
      return !prevState;
    });
  };

  return (
    <section>
      <header className="mx-auto container flex flex-col items-between lg:flex-row lg:justify-between px-5 py-5 flex-wrap lg:flex-nowrap">
        <div className="flex w-full justify-between lg:w-auto">
          <div className="flex items-center space-x-3">
            <img className="w-10 lg:w-14 h-auto" src={images.logo} alt="logo" />
            <h1 className="text-sm lg:text-base font-bold">
              Achieve Point Earning
            </h1>
          </div>
          {showHeader ? (
            <IoCloseOutline className="w-7 h-7 lg:hidden" onClick={toggleHeaderHandler} />
          ) : (
            <HiMenuAlt3 className="w-7 h-7 lg:hidden" onClick={toggleHeaderHandler} />
          )}
        </div>

        <ul
          className={`${
            showHeader ? "flex" : "hidden"
          } font-semibold mt-7 lg:mt-0 w-full lg:w-auto lg:flex flex-col items-center flex-wrap lg:space-x-3 lg:flex-row lg:items-center`}
        >
          <li>
            <Link to="/" className="px-3 py-1.5 cursor-pointer block">
              Home
            </Link>
          </li>
          <li>
            <Link to="/mining" className="px-3 py-1.5 cursor-pointer block">
              Mining
            </Link>
          </li>
          <li>
            <Link
              to="/refferal-details"
              className="px-3 py-1.5 cursor-pointer block"
            >
              Refferal Details
            </Link>
          </li>
          <li>
            <Link to="/" className="px-3 py-1.5 cursor-pointer block">
              Support
            </Link>
          </li>
          <li>
            <Link to="/" className="px-3 py-1.5 cursor-pointer block">
              About us
            </Link>
          </li>
          <li className="w-full lg:w-auto mt-2 lg:mt-0">
            <Link
              to="/login"
              className="w-full lg:w-auto text-center px-3 py-1.5 cursor-pointer border border-blue-600 text-blue-600 rounded-lg block"
            >
              Login
            </Link>
          </li>
        </ul>
      </header>
    </section>
  );
};

export default Header;
