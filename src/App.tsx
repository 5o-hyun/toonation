import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ChargePage from "./pages/account/charge";
import CulturePayPage from "./pages/account/charge/culturepay";
import ChargeSuccessPage from "./pages/account/charge/success";
import HomePage from "./pages";
import "../src/styles/common.css";
import "../src/styles/tailwind.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/account/charge" element={<ChargePage />} />
        <Route path="/account/charge/culturepay" element={<CulturePayPage />} />
        <Route path="/account/charge/success" element={<ChargeSuccessPage />} />
      </Routes>
    </Router>
  );
}

export default App;
