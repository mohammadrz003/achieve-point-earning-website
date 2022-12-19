import { useCallback, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import "./App.css";
import HomePage from "./pages/home/HomePage";
import RefferalDetailsPage from "./pages/refferal-details/RefferalDetailsPage";
import MiningPage from "./pages/mining/MiningPage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/Signup";
import SwapPage from "./pages/swap/SwapPage";
import { useDispatch } from "react-redux";
import { walletActions } from "./store/reducers/walletReducer";
import { ethers } from "ethers";
import { AppContext } from "./context/context";

function App() {
  const dispatch = useDispatch();

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

  return (
    <div className="App">
      <AppContext.Provider value={{connectWalletHandler}}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/mining" element={<MiningPage />} />
          <Route path="/refferal-details" element={<RefferalDetailsPage />} />
          {/* <Route path="/swap" element={<SwapPage />} /> */}
        </Routes>
      </AppContext.Provider>
      <Toaster />
    </div>
  );
}

export default App;
