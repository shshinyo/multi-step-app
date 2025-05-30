import { useEffect, useState } from "react";
import lightModeIcon from "../assets/sun.svg";
import darkModeIcon from "../assets/dark.svg";

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(
    localStorage.getItem("theme") === "dark" || false,
  );

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="p-2 rounded-md shadow bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <img src={lightModeIcon} className="w-5 h-5" alt="Light mode" />
      ) : (
        <img src={darkModeIcon} className="w-5 h-5" alt="Dark mode" />
      )}
    </button>
  );
};

export default DarkModeToggle;
