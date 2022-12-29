import React, { useContext, useState } from "react";
import { FiShare } from "react-icons/fi";
import { BsFillHexagonFill } from "react-icons/bs";
import { BiTransfer } from "react-icons/bi";
import { ethers, utils } from "ethers";
import axios from "axios";

import SwapSelectedToken from "../../components/SwapSelectedToken";
import { API, images, TOKEN } from "../../constants";
import styles from "./SwapPage.module.css";
import tokenABI from "../../abi.json";
import toast from "react-hot-toast";
import { AppContext } from "../../context/context";
import {
  usePrepareSendTransaction,
  useProvider,
  useSendTransaction,
  useWaitForTransaction,
  useContract,
  useSigner,
} from "wagmi";
import { useDebounce } from "use-debounce";
import usePrevious from "../../hooks/usePrevious";
import { useEffect } from "react";

const SwapPage = ({
  userProfile,
  onRefresherHelperHandler,
  onToggleVisibility,
  loading,
  setLoading,
}) => {
  const walletProvider = useProvider({
    chainId: 56,
  });
  const { data: signer, isError, isLoading } = useSigner();

  const [debouncedTo] = useDebounce(TOKEN.projectOwnerRecipientAddress, 500);

  const [inputValues, setInputValues] = useState({
    busdAmount: "0",
    apeAmount: "0",
  });
  const [debouncedAmount] = useDebounce(inputValues.busdAmount, 500);

  const contract = useContract({
    address: TOKEN.busdContract,
    abi: tokenABI,
    signerOrProvider: signer,
  });

  console.log(contract);

  // const { config } = usePrepareSendTransaction({
  //   request: {
  //     to: debouncedTo,
  //     value: debouncedAmount ? utils.parseEther(debouncedAmount) : undefined,
  //     data: contract,
  //   },
  // });

  // const { data, sendTransaction } = useSendTransaction(config);

  // const {
  //   isLoading,
  //   isSuccess,
  //   data: transactionData,
  // } = useWaitForTransaction({
  //   hash: data?.hash,
  // });

  // const prevTransaction = usePrevious({ hash: data?.hash, transactionData });

  const inputChangeHandler = (name, value) => {
    if (name === "busdAmount") {
      setInputValues((curState) => {
        return { [name]: value, apeAmount: (+value * 1) / TOKEN.apeTokenPrice };
      });
    } else {
      setInputValues((curState) => {
        return {
          [name]: value,
          busdAmount: (+value * TOKEN.apeTokenPrice) / 1,
        };
      });
    }
  };

  const submitHandler = async () => {
    try {
      if (!(Number(inputValues.busdAmount) > 0)) {
        toast.error("Enter a valid amount");
        return;
      }
      setLoading(true);
      // sendTransaction?.();
      console.log("executed");

      // const provider = new ethers.providers.Web3Provider(walletProvider);
      // const signer = provider.getSigner();

      // const tokenAddress = TOKEN.busdContract;

      // const token = new ethers.Contract(tokenAddress, tokenABI, signer);

      setLoading(true);
      const transaction = await contract.transfer(
        TOKEN.projectOwnerRecipientAddress,
        ethers.utils.parseUnits(inputValues.busdAmount, "ether")
      );

      console.log("transaction", transaction);

      const { data } = await axios.post(
        `${API.API_URL}/tokenTransfer/approveBusdPayment`,
        {
          user: {
            email: userProfile.email,
            Wallet: userProfile.Wallet,
          },
          transaction: transaction,
          transferedBusdAmount: Number(inputValues.busdAmount),
          network: TOKEN.networkType === "MAINNET" ? "MAINNET" : "TESTNET",
        }
      );
      setLoading(false);
      onRefresherHelperHandler();
      onToggleVisibility();
      toast.success(data.message, {
        position: "top-center",
        duration: 6000,
      });
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
      onRefresherHelperHandler();
      onToggleVisibility();
    }
  };

  // useEffect(() => {
  //   (async () => {
  //     if (data?.hash) {
  //       if (prevTransaction.hash !== data?.hash) {
  //         try {
  //           const { data } = await axios.post(
  //             `${API.API_URL}/tokenTransfer/approveBusdPayment`,
  //             {
  //               user: {
  //                 email: userProfile.email,
  //                 Wallet: userProfile.Wallet,
  //               },
  //               transaction: transactionData.to,
  //               transferedBusdAmount: Number(inputValues.busdAmount),
  //               network:
  //                 TOKEN.networkType === "MAINNET" ? "MAINNET" : "TESTNET",
  //             }
  //           );
  //           setLoading(false);
  //           onRefresherHelperHandler();
  //           onToggleVisibility();
  //           toast.success(data.message, {
  //             position: "top-center",
  //             duration: 6000,
  //           });
  //         } catch (error) {
  //           console.log(error);
  //           toast.error(error.message);
  //           setLoading(false);
  //           onRefresherHelperHandler();
  //           onToggleVisibility();
  //         }
  //       }
  //     }
  //   })();
  // }, [
  //   data?.hash,
  //   prevTransaction,
  //   setLoading,
  //   transactionData?.to,
  //   inputValues.busdAmount,
  //   userProfile.Wallet,
  //   userProfile.email,
  // ]);

  return (
    // <Layout>
    //   <section className=" w-full bg-[#EEEEEE]">
    //     <div className="flex justify-center items-center container px-5 py-10 mx-auto min-h-[calc(100vh-68px)] lg:min-h-[calc(100vh-78px)]">
    <div
      className={`${styles.swapBoxContainer} rounded-lg p-6 w-full max-w-lg bg-white relative z-50`}
    >
      <div className="w-full flex justify-between items-center">
        <div className="space-y-1">
          <h3 className="font-bold text-gray-800">Apecoin price instantly</h3>
          <h5 className="text-gray-700 text-xs">May 10 th 2021, 3:15:23 pm</h5>
        </div>
        <button
          type="button"
          className={`${styles.shareButton} rounded-xl p-3`}
        >
          <FiShare className="w-5 h-5 text-black" />
        </button>
      </div>
      <div className="flex flex-col items-start mt-5 relative space-y-3">
        <div className="w-full flex flex-col space-y-2">
          <span className="text-gray-600 text-xs font-medium">You send</span>
          <SwapSelectedToken
            img={images.busdLogo}
            tokenSymbol="BUSD"
            name="busdAmount"
            onChangeHandler={inputChangeHandler}
            inputValue={inputValues.busdAmount}
          />
        </div>

        <button
          className={`absolute top-1/2 z-20 transform -translate-y-[50%] right-0`}
        >
          <BsFillHexagonFill className="w-14 h-14 text-[#5F3DFF]" />
          <BiTransfer className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-90 text-2xl text-white" />
        </button>

        <div className="w-full flex flex-col space-y-2">
          <span className="text-gray-600 text-xs font-medium">You receive</span>
          <SwapSelectedToken
            img={images.apeLogo}
            tokenSymbol="APE"
            name="apeAmount"
            onChangeHandler={inputChangeHandler}
            inputValue={inputValues.apeAmount}
          />
        </div>
      </div>
      <button
        onClick={submitHandler}
        type="button"
        className="disabled:opacity-50 disabled:cursor-not-allowed w-full text-center bg-cyan-500 text-white rounded-xl mt-6 px-3 py-3 font-semibold"
        disabled={loading || !(Number(inputValues.busdAmount) > 0)}
      >
        {loading ? "Processing..." : "Buy Ape Token"}
      </button>
    </div>
    //     </div>
    //   </section>
    // </Layout>
  );
};

export default SwapPage;
