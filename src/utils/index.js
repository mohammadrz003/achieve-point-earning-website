import { TOKEN } from "../constants";
import toast from "react-hot-toast";

const changeNetwork = async ({ networkName }) => {
  try {
    if (!window.ethereum) throw new Error("No crypto wallet found");
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          ...TOKEN.networks[networkName],
        },
      ],
    });
    return true;
  } catch (err) {
    toast.error(err.message, {
      position: "top-right",
    });
    return false;
  }
};

export const handleNetworkSwitch = async (networkName) => {
  return await changeNetwork({ networkName });
};
