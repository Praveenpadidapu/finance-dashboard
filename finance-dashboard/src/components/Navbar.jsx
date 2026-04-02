import { Link, useLocation } from "react-router-dom";
import { useStore } from "../store/useStore";

export default function Navbar() {
  const location = useLocation();
  const { darkMode, toggleDarkMode } = useStore();

  return (
    <div className="bg-white dark:bg-gray-900 shadow px-6 py-4 flex justify-between items-center">

      {/* Logo */}
      <h1 className="text-xl font-bold text-indigo-600 dark:text-white">
        Finance Dashboard
      </h1>

      {/* Navigation */}
      <div className="flex items-center gap-6">

        <Link
          to="/"
          className={`font-medium ${
            location.pathname === "/"
              ? "text-indigo-600"
              : "text-gray-500 dark:text-gray-300"
          }`}
        >
          Dashboard
        </Link>

        <Link
          to="/transactions"
          className={`font-medium ${
            location.pathname === "/transactions"
              ? "text-indigo-600"
              : "text-gray-500 dark:text-gray-300"
          }`}
        >
          Transactions
        </Link>

        {/* 🌙 Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="border px-3 py-1 rounded text-sm dark:text-white"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

      </div>
    </div>
  );
}