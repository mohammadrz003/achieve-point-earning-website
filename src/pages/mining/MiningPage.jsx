import React, { useState, useEffect } from "react";

import Layout from "../../components/Layout";
import Modal from "../../components/Modal";
import Plan from "../../components/Plan";
import SwapPage from "../swap/SwapPage";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { handleNetworkSwitch } from "../../utils";
import axios from "axios";
import { API, TOKEN } from "../../constants";
import Profile from "../../components/Profile";
import ManageIndividualPlans from "./ManageIndividualPlans";
import ReferralDetails from "./ReferralDetails";
import { useWeb3ModalNetwork } from "@web3modal/react";
import { bsc, bscTestnet } from "wagmi/chains";

const PLANS_DATA = [
  {
    title: "Btc Star",
    starNumber: 1,
    caption: `We have a minute Rank Purchase of 25 APE token. Who will hold around
    25 APE to 249 APE will be a btc 1 Start rank holder.`,
    listItems: [
      "Roi - 1% daily",
      "Refferal Rebeat - 5% instant Comission",
      "2nd Level Refferal Rebeat - 3% instant Comission",
    ],
    buyLink: "/",
  },
  {
    title: "Btc Star",
    starNumber: 2,
    caption: `In btc 2 Start rank Purchase Rank Holder must hold At least 250 APE to 499 APE in his wallet.`,
    listItems: [
      "Roi - 1.1% daily",
      `And BTC Mining system 0.00137 daily 
      (0.5 BTC a Year) That can be withdrawn in a year`,
      `Refferal Rebeat - 5% instant Comission`,
      `2nd Level Refferal Rebeat -  3% instant Comission`,
    ],
    buyLink: "/",
  },
  {
    title: "Btc Star",
    starNumber: 3,
    caption: `Who will hold more than 500 APE token will be granted as a btc 3 Start rank holder.`,
    listItems: [
      "Roi - 1.2% daily",
      `And a BTC Mining system 0.00274 daily ( 1 BTC a year ) that can be withdrawn in a year.`,
      `Refferal Rebeat - 5% instant Comission`,
      `2nd Level Refferal Rebeat -  3% instant Comission`,
    ],
    buyLink: "/",
  },
];

const MiningPage = () => {
  const authState = useSelector((state) => state.auth);
  const walletState = useSelector((state) => state.wallet);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refresherHelper, setRefresherHelper] = useState(0);
  const [showSwapModal, setShowSwapModal] = useState(false);

  const { selectedChain, setSelectedChain } = useWeb3ModalNetwork();

  // console.log(selectedChain.id); // getting the network chain id

  const showSwapModalHandler = async () => {
    if (loading) {
      return;
    }
    if (!walletState.walletAddress) {
      toast.error("Connect your metamask account first.", {
        position: "top-center",
      });
    } else {
      setSelectedChain(bsc);
      setShowSwapModal((curState) => {
        return !curState;
      });

      // const switchNetworkResult = await handleNetworkSwitch(
      //   TOKEN.networkType === "MAINNET" ? "bsc" : "bscTestnet"
      // );
      // if (switchNetworkResult === true) {
      //   setShowSwapModal((curState) => {
      //     return !curState;
      //   });
      // }
    }
  };

  const refresherHelperHandler = () => {
    setRefresherHelper((curState) => curState + 1);
  };

  // useEffect(() => {
  //   (async () => {
  //     const { data } = await axios.get(
  //       `${API.API_URL}/auth/profile/${authState.user._id}`
  //     );
  //     setUserProfile(data.user);
  //   })();
  // }, [authState.user._id, refresherHelper]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.post(
        `${API.API_URL}/tokenTransfer/evaluatePlans`,
        {
          user: {
            email: authState.user.email,
            Wallet: walletState.walletAddress,
          },
        }
      );
      setUserProfile(data.user);
    })();
  }, [refresherHelper, authState.user.email, walletState.walletAddress]);

  return (
    <>
      <Modal
        isModalOpen={showSwapModal}
        toggleVisibility={showSwapModalHandler}
      >
        <SwapPage
          userProfile={userProfile}
          onRefresherHelperHandler={refresherHelperHandler}
          onToggleVisibility={showSwapModalHandler}
          loading={loading}
          setLoading={setLoading}
        />
      </Modal>
      <Layout>
        <div className="bg-[#EEEEEE]">
          <section className="container w-full px-5 py-10 mx-auto flex flex-col items-center">
            <h2 className="text-4xl md:text-5xl lg:text-7xl text-[#5A5A5A] text-center">
              Category's
            </h2>
            <p className="text-center text-xl mt-8 mb-8">
              We have decided our Achievement rank in 3 Step's
            </p>

            <Profile
              userProfile={userProfile}
              onClickHandler={showSwapModalHandler}
            />

            <div className="w-full flex flex-col flex-wrap md:flex-row md:justify-center lg:flex-nowrap gap-y-6 lg:gap-y-0 gap-x-5 mt-12">
              {PLANS_DATA.map((value, index) => (
                <div key={index} className="w-full md:w-[45%] lg:w-1/3">
                  <Plan
                    title={value.title}
                    starNumber={value.starNumber}
                    caption={value.caption}
                    listItems={value.listItems}
                    planType={value.starNumber}
                    userProfile={userProfile}
                    setUserProfile={setUserProfile}
                  />
                </div>
              ))}
            </div>
            <div className="w-full flex flex-col lg:gap-x-5 lg:flex-nowrap lg:flex-row lg:items-start lg:justify-start">
              <ManageIndividualPlans
                userProfile={userProfile}
                setUserProfile={setUserProfile}
              />
              <ReferralDetails
                userProfile={userProfile}
                setUserProfile={setUserProfile}
              />
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
};

export default MiningPage;
