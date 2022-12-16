import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoCloseOutline } from "react-icons/io5";
import { ethers } from "ethers";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import { images } from "../constants";
import { walletActions } from "../store/reducers/walletReducer";

const Header = () => {
  const dispatch = useDispatch();
  const walletState = useSelector((state) => state.wallet);
  const [showHeader, setShowHeader] = useState(false);

  const connectWalletHandler = () => {
    if (window.ethereum) {
      // matamask is installed
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChangeHandler(result[0]);
        });
    } else {
      toast.error("Install Metamask", {
        position: "top-right",
      });
    }
  };

  const getUserBalanceHandler = useCallback(
    (address) => {
      window.ethereum
        .request({ method: "eth_getBalance", params: [address, "latest"] })
        .then((balance) => {
          dispatch(
            walletActions.setWalletBalance(
              ethers.utils.formatEther(balance, "ether")
            )
          );
        });
    },
    [dispatch]
  );

  const accountChangeHandler = useCallback(
    (newAccount) => {
      if (newAccount.length !== 0) {
        dispatch(walletActions.setAccountAddress(newAccount));
        getUserBalanceHandler(newAccount.toString());
      } else {
        dispatch(walletActions.setAccountAddress(""));
        dispatch(walletActions.setWalletBalance(""));
      }
    },
    [dispatch, getUserBalanceHandler]
  );

  const chainChangeHandler = (chainId) => {
    console.log(parseInt(chainId, 16));
    window.location.reload();
  };

  useEffect(() => {
    try {
      window.ethereum.on("accountsChanged", accountChangeHandler);
      window.ethereum.on("chainChanged", chainChangeHandler);
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
      });
    }
  }, [accountChangeHandler]);

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
              Achive Point Earning
            </h1>
          </div>
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
          <li>
            <Link to="/swap" className="px-3 py-1.5 cursor-pointer block">
              Swap
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
          <li className="w-full lg:w-auto mt-2 lg:mt-0">
            <button
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
            </button>
          </li>
        </ul>
      </header>
    </section>
  );
};

export default Header;