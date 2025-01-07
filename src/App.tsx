import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ChargePage from "./pages/account/charge";
import HomePage from "./pages";
import "../src/styles/common.css";
import "../src/styles/tailwind.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/account/charge" element={<ChargePage />} />
      </Routes>
    </Router>
  );
}

export default App;
