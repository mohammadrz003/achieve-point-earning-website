import { useCallback, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import "./App.css";
import HomePage from "./pages/home/HomePage";
import RefferalDetailsPage from "./pages/refferal-details/RefferalDetailsPage";
import MiningPage from "./pages/mining/MiningPage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/Signup";
import { useDispatch, useSelector } from "react-redux";
import { walletActions } from "./store/reducers/walletReducer";
import { ethers } from "ethers";
import { AppContext } from "./context/context";
import DoSthAfterRedirect from "./components/DoSthAfterRedirect";
import { authActions } from "./store/reducers/authReducer";

// wallet connect
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";

import { Web3Modal } from "@web3modal/react";

import { configureChains, createClient, WagmiConfig, useAccount } from "wagmi";

import { bsc } from "wagmi/chains";
import { API } from "./constants";

// configure
const chains = [bsc];

// Wagmi client
const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId: API.WALLET_CONNECT_PROJECT_ID }),
]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: "achive-point", chains }),
  provider,
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains);

const App = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const walletState = useSelector((state) => state.wallet);
  const { address, isConnected } = useAccount();

  // console.log(`address: ${address}`);
  // console.log(`isConnected: ${isConnected}`);

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
        dispatch(walletActions.setAccountAddress(newAccount[0]));
        getUserBalanceHandler(newAccount.toString());
        dispatch(authActions.setIsLoggedIn(false));
        dispatch(authActions.setUser({}));
      } else {
        dispatch(walletActions.setAccountAddress(""));
        dispatch(walletActions.setWalletBalance(""));
        dispatch(authActions.setIsLoggedIn(false));
        dispatch(authActions.setUser({}));
      }
    },
    [dispatch, getUserBalanceHandler]
  );

  const chainChangeHandler = (chainId) => {
    console.log(parseInt(chainId, 16));
    window.location.reload();
  };

  useEffect(() => {
    localStorage.setItem(
      "account",
      JSON.stringify({ user: authState.user, token: authState.token })
    );
    if (Object.keys(authState.user).length > 0 || authState.token) {
      dispatch(authActions.setIsLoggedIn(true));
    }
  }, [authState.user, authState.token, dispatch]);

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

  // set listener for wallet connection
  useEffect(() => {
    if (address && isConnected) {
      dispatch(walletActions.setAccountAddress(address));
      dispatch(authActions.setIsLoggedIn(false));
      dispatch(authActions.setUser({}));
    } else {
      dispatch(walletActions.setAccountAddress(address));
      dispatch(authActions.setIsLoggedIn(false));
      dispatch(authActions.setUser({}));
    }
  }, [address, isConnected, dispatch]);

  return (
    <div className="App">
      <AppContext.Provider value={{ provider: provider }}>
        <WagmiConfig client={wagmiClient}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/mining"
              element={
                walletState.walletAddress && authState.isLoggedIn ? (
                  <MiningPage />
                ) : walletState.walletAddress ? (
                  <LoginPage />
                ) : (
                  <DoSthAfterRedirect
                    callbackFn={() => toast.error("Connect Wallet first.")}
                  >
                    <Navigate to="/" replace />
                  </DoSthAfterRedirect>
                )
              }
            />
            <Route path="/refferal-details" element={<RefferalDetailsPage />} />
          </Routes>
        </WagmiConfig>

        <Web3Modal
          projectId={API.WALLET_CONNECT_PROJECT_ID}
          ethereumClient={ethereumClient}
        />
      </AppContext.Provider>
      <Toaster />
    </div>
  );
};

export default App;
