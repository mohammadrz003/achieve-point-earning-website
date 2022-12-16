import React, { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";

const WalletCard = () => {
  

  

  //   const connectWalletHandler = async () => {
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);

  //     // MetaMask requires requesting permission to connect users accounts
  //     const result = await provider.send("eth_requestAccounts", []);
  //     console.log(result[0]);
  //     // const signer = provider.getSigner();
  //   };

  return (
    <div>
      <h4>Connection to metamask using window.ethereum methods</h4>
      {/* <button
        className="bg-cyan-600 text-white px-3 py-1.5"
        type="button"
        onClick={connectWalletHandler}
      >
        {connectButtonText}
      </button>
      <div className="flex flex-col">
        <p>Address: {defaultAccount}</p>
        <p>Balance: {userBalance}</p>
      </div>
      {errorMessage} */}
    </div>
  );
};

export default WalletCard;
