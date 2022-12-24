import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Modal from "../../components/Modal";
import { API, images, TOKEN } from "../../constants";
import Alert from "./Alert";

const ManageIndividualPlans = ({ userProfile, setUserProfile }) => {
  const authState = useSelector((state) => state.auth);
  const walletState = useSelector((state) => state.wallet);
  const [showAlert, setShowAlert] = useState(false);
  const [planid, setPlanid] = useState("");
  const [loading, setLoading] = useState(false);

  const showAlertHandler = (planId) => {
    setPlanid(planId);
    setShowAlert((curState) => !curState);
  };

  const deletePlanHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${API.API_URL}/tokenTransfer/cancelPlan`,
        {
          user: {
            email: authState.user.email,
            Wallet: walletState.walletAddress,
          },
          planId: planid,
        }
      );
      setShowAlert((curState) => !curState);
      setUserProfile(data.user);
      toast.success(data.message);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const claimRewardHandler = async (planid) => {
    try {
      const { data } = await axios.post(
        `${API.API_URL}/tokenTransfer/claimReward`,
        {
          user: {
            email: authState.user.email,
            Wallet: walletState.walletAddress,
          },
          planId: planid,
          network: TOKEN.networkType,
          gas: "50000",
        }
      );
      setUserProfile(data.user);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Modal isModalOpen={showAlert} toggleVisibility={showAlertHandler}>
        <Alert
          showAlertHandler={showAlertHandler}
          deletePlanHandler={deletePlanHandler}
        />
      </Modal>

      <div className="container max-w-5xl px-4 mx-auto sm:px-8">
        <div className="py-8">
          <div className="flex flex-row justify-between w-full mb-1 sm:mb-0">
            <h2 className="text-2xl leading-tight">Active Plans</h2>
          </div>
          <div className="mt-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
            <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Plan type
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Locked Ape
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Starting Time
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Reward
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {userProfile?.plans.map((plan) => (
                    <tr>
                      <td
                        key={plan.id}
                        className="px-5 py-5 text-sm bg-white border-b border-gray-200"
                      >
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold">Btc Star</span>
                          <div className="flex items-center space-x-1">
                            {[...Array(plan.planType)].map((item) => (
                              <img
                                className="w-5 h-5"
                                src={images.star}
                                alt="star"
                              />
                            ))}
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {plan.lockedApe}
                        </p>
                      </td>
                      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {new Date(plan.planStartingTime).toLocaleString(
                            "en-US"
                          )}
                        </p>
                      </td>
                      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                        <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                          <span
                            aria-hidden="true"
                            className="absolute inset-0 bg-green-200 rounded-full opacity-50"
                          ></span>
                          <span className="relative">{plan.profit} BUSD</span>
                        </span>
                      </td>
                      <td className="flex items-center space-x-3 px-5 py-5 text-sm bg-white border-b border-gray-200">
                        <button
                          onClick={() => {
                            claimRewardHandler(plan.id);
                          }}
                          disabled={plan.profit === 0 ? true : false}
                          className="disabled:opacity-70 disabled:cursor-not-allowed bg-green-500 hover:bg-green-600 px-2 py-1 rounded-lg text-white font-semibold"
                        >
                          {loading ? "loading..." : "Claim Reward"}
                        </button>
                        <button
                          onClick={() => showAlertHandler(plan.id)}
                          className="text-red-500 hover:text-red-600 font-semibold"
                        >
                          Cancel Plan
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageIndividualPlans;
