"use client";
import { useState } from "react";
import { GoSun } from "react-icons/go";
import { WiMoonAltWaningCrescent3 } from "react-icons/wi";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light'|'dark'>("light");

  // Load theme from localStorage or system preference
  

  return (
    <button
      onClick={()=>setTheme(prev => prev === "light" ? "dark" : "light")}
      className="p-2 rounded-full border border-gray-200 hover:scale-105 duration-200"
    >
      {theme === "light" ? <WiMoonAltWaningCrescent3 className="text-gray-600" /> : <GoSun className="text-yellow-400" />}
    </button>
  );
}
