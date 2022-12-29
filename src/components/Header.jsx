import React, { useState, useEffect, useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoCloseOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

import { images } from "../constants";
import { AppContext } from "../context/context";
import { Web3Button } from "@web3modal/react";

const Header = () => {
  const { connectWalletHandler } = useContext(AppContext);
  const walletState = useSelector((state) => state.wallet);
  const authState = useSelector((state) => state.auth);
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
          <Link to="/">
            <div className="flex items-center space-x-3">
              <img
                className="w-10 lg:w-14 h-auto"
                src={images.logo}
                alt="logo"
              />
              <h1 className="text-sm lg:text-base font-bold">
                Achive Point Earning
              </h1>
            </div>
          </Link>
          {showHeader ? (
            <IoCloseOutline
              className="w-7 h-7 lg:hidden"
              onClick={toggleHeaderHandler}
            />
          ) : (
            <HiMenuAlt3
              className="w-7 h-7 lg:hidden"
              onClick={toggleHeaderHandler}
            />
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
          {/* <li>
            <Link to="/swap" className="px-3 py-1.5 cursor-pointer block">
              Swap
            </Link>
          </li> */}
          <li>
            <Link to="/" className="px-3 py-1.5 cursor-pointer block">
              About us
            </Link>
          </li>
          <li className="w-full lg:w-auto mt-2 lg:mt-0 flex justify-center">
            <Web3Button icon="hide" />
            {/* <button
              onClick={connectWalletHandler}
              type="button"
              className="w-full lg:w-auto text-center px-3 py-1.5 cursor-pointer border bg-blue-600 text-white rounded-lg block"
            >
              {walletState.walletAddress
                ? `${walletState.walletAddress.slice(
                    0,
                    5
                  )}...${walletState.walletAddress.slice(-4)}`
                : "Connect Wallet"}
            </button> */}
          </li>
          {walletState?.walletAddress?.length > 0 && !authState.isLoggedIn && (
            <li className="w-full lg:w-auto mt-2 lg:mt-0">
              <Link
                to="/login"
                className="w-full lg:w-auto text-center px-3 py-1.5 cursor-pointer border border-blue-600 text-blue-600 rounded-lg block"
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </header>
    </section>
  );
};

export default Header;
