"use client";

import Link from "next/link";
import { useState } from "react";

const Header3 = () => {
  const [city, setCity] = useState(" ");

  return (
    <div className="bg-gradient-to-r from-red-600 to-red-500 h-auto py-10">
      <div className="p-5 text-center">
        <h2 className="text-4xl text-white font-bold">
          Over 157,000 hotels and homes across 35 countries
        </h2>
        <div className="flex flex-col items-center my-5 mx-10 gap-4">
          <div className="flex w-full justify-center gap-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-6/12 h-16 outline-none px-3 text-lg border-r-2 border-gray-400"
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
            <button
              type="submit"
              className="h-16 px-3 py-2 w-72 bg-green-500 hover:bg-green-600 text-white text-xl flex justify-center items-center"
            >
              <Link href={`/hotels?city=${city}`}>Search</Link>
            </button>
          </div>

          <div className="flex w-full justify-center gap-5 mt-5 font-bold">
            <button
              type="submit"
              className="h-16 px-6 py-2 hover:cursor-pointer text-white"
            >
              Continue your search
            </button>
            <button
              type="submit"
              className="h-16 px-6 py-2 hover:cursor-pointer border-2 border-white text-white hover:bg-gray-500 rounded-xl"
            >
              Homestay in India hotels
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header3;
