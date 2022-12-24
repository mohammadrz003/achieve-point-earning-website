import { TOKEN } from "../constants";
import toast from "react-hot-toast";

const changeNetwork = async ({ networkName }) => {
  try {
    if (!window.ethereum) throw new Error("No crypto wallet found");
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: TOKEN.networks[networkName].chainId }],
    });
    return true;
  } catch (err) {
    toast.error(err.message, {
      position: "top-right",
    });
    if (err.code === 4902) {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            ...TOKEN.networks[networkName],
          },
        ],
      });
    }
    return false;
  }
};

export const handleNetworkSwitch = async (networkName) => {
  return await changeNetwork({ networkName });
};
