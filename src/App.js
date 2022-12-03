import { Route, Routes } from "react-router-dom";
import "./App.css";

import HomePage from "./pages/home/HomePage";
import RefferalDetailsPage from "./pages/refferal-details/RefferalDetailsPage";
import MiningPage from "./pages/mining/MiningPage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/Signup";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/mining" element={<MiningPage />} />
        <Route path="/refferal-details" element={<RefferalDetailsPage />} />
      </Routes>
    </div>
  );
}

export default App;
