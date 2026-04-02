import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Navbar from "./components/Navbar";
import { useStore } from "./store/useStore";

function App() {
  const { darkMode } = useStore();

  return (
    <div className={darkMode ? "dark bg-gray-900 min-h-screen" : "bg-gray-50 min-h-screen"}>
      <BrowserRouter>

        {/* 🔹 Navbar */}
        <Navbar />

        {/* 🔹 Pages */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;