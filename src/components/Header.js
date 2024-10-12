import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div>
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <Link to={"/"} className="text-white text-2xl font-semibold">
                  Freelancer
                </Link>
              </div>
            </div>
            <div className="flex justify-center items-center gap-4">
              <Link className="text-white" to="/paymentdata">Payment Data</Link>
              <button className="bg-violet-700 text-white font-medium py-[6px] px-4 rounded-md shadow-md hover:bg-violet-800 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50">
                <Link to="/addproject">Add Project</Link>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
