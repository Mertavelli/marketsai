'use client'
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import Briefing from "../sections/Briefing";
import TopNews from "../sections/TopNews";
import AssetsPieChart from "../components/AssetsPieChart";

import { useAuthStore } from "../stores/useAuthStore";
import RecommendedStartups from "../components/RecommendedStartups";

export default function Home() {
  const { user } = useAuthStore();
  const [isVisible, setIsVisible] = useState(true);

  if (user?.accountType === "investor") {
    return (
      <div className="w-full max-w-[91rem] flex flex-col gap-5">
        {isVisible && (
          <div className="flex justify-between items-center bg-accent/5 border border-accent py-3 px-4 rounded-md">
            <p className="p-black">PDF exports are now available for Investment Memos.</p>
            <button onClick={() => setIsVisible(false)} className="cursor-pointer text-black">
              <IoClose size={25} />
            </button>
          </div>
        )}

        <RecommendedStartups />

        <div className="flex gap-4 w-full h-full">
          <div className="w-1/2">
            <Briefing />
          </div>

          <div className="w-1/2">
            <AssetsPieChart />
          </div>
        </div>

        <TopNews />
      </div>
    );
  }

  if (user?.accountType === "company") {
    return (
      <div className="w-full max-w-[91rem] flex flex-col gap-5">
        <h1 className="heading">Welcome, founder!</h1>
        {/* Hier kannst du spezifische Komponenten für Startups einfügen */}
      </div>
    );
  }

  return null; // fallback für z. B. nicht eingeloggte Nutzer oder unbekannten accountType
}
