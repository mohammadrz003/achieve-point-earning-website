import { Route, Routes } from "react-router-dom";
import "./App.css";

import HomePage from "./pages/home/HomePage";
import RefferalDetailsPage from "./pages/refferal-details/RefferalDetailsPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/refferal-details" element={<RefferalDetailsPage />} />
      </Routes>
    </div>
  );
}

export default App;
