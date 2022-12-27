import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { API, TOKEN } from "../../constants";

const ReferralDetails = ({ userProfile, setUserProfile }) => {
  const authState = useSelector((state) => state.auth);
  const walletState = useSelector((state) => state.wallet);
  const [userReferralList, setUserReferralList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresherHelper, setRefresherHelper] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.post(`${API.API_URL}/auth/referralUsers`, {
          user: {
            email: authState.user.email,
            Wallet: walletState.walletAddress,
          },
        });
        setUserReferralList(data.userReferralList);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    })();
  }, [authState.user.email, walletState.walletAddress, refresherHelper]);

  const copyRefCodeToClipboard = () => {
    if (!userProfile) {
      return;
    }
    navigator.clipboard.writeText(userProfile?.referralCode);
    toast.success("Referral code copied successfully");
  };

  const claimReferralRewardHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${API.API_URL}/tokenTransfer/claimReferralReward`,
        {
          user: {
            email: authState.user.email,
            Wallet: walletState.walletAddress,
          },
          network: TOKEN.networkType,
          gas: "50000",
        }
      );
      setLoading(false);
      setUserProfile(data.user);
      setRefresherHelper((curState) => curState + 1);
      toast.success(data.message);
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="w-full lg:w-1/3 py-8">
      <div className="flex flex-row justify-between w-full mb-1 sm:mb-0">
        <h2 className="text-2xl leading-tight">Referral Details</h2>
        <div>
          <input
            value={userProfile ? userProfile?.referralCode : "loading..."}
            className="focus:outline-none p-2"
            type="hidden"
            readOnly
          />
          <button
            onClick={copyRefCodeToClipboard}
            className="bg-purple-500 text-white px-3 py-2 rounded-lg font-semibold"
          >
            Copy referral code
          </button>
        </div>
      </div>
      <div className="mt-4 overflow-x-auto">
        <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                >
                  Invested Amount
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                >
                  Link refer
                </th>
              </tr>
            </thead>
            <tbody>
              {userReferralList.map((referral) => (
                <tr>
                  <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {referral.name}
                    </p>
                  </td>
                  <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                    <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 bg-green-200 rounded-full opacity-50"
                      ></span>
                      <span className="relative">
                        {(referral.Balance * TOKEN.apeTokenPrice) / 1} BUSD
                      </span>
                    </span>
                  </td>
                  <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {referral.referralList.length}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="px-3 py-2 text-center bg-white rounded-lg mb-1">
          Total earned reward from referral: {userProfile?.invitedBalance} BUSD
        </p>
        <button
          disabled={loading}
          onClick={claimReferralRewardHandler}
          className="disabled:cursor-not-allowed disabled:opacity-70 w-full text-white font-medium py-3 px-3 rounded-lg bg-cyan-500 text-center"
        >
          Claim Referral Reward
        </button>
      </div>
    </div>
  );
};

export default ReferralDetails;
