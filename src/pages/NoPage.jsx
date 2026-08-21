import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCompass, FaHome, FaMapMarkedAlt, FaBookOpen, FaSearch } from "react-icons/fa";

const NoPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/best-places`);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-20 px-4 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-xl w-full text-center space-y-8 animate-fadeIn">
        {/* Animated Badge & Icon */}
        <div className="relative inline-block">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-primary to-secondary text-white flex items-center justify-center mx-auto shadow-glow animate-bounce">
            <FaCompass size={48} />
          </div>
          <span className="absolute -bottom-2 right-1/2 translate-x-1/2 px-3 py-1 bg-amber-500 text-white font-mono font-black text-xs rounded-full shadow-md uppercase tracking-wider">
            404 Error
          </span>
        </div>

        {/* Text Heading */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl font-heading font-black text-gray-900 dark:text-white tracking-tight">
            Off The Beaten Path!
          </h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
            The Cambodian destination or page you are searching for might have moved, or doesn't exist in our expedition records.
          </p>
        </div>

        {/* Quick Search */}
        <form onSubmit={handleSearch} className="max-w-md mx-auto relative">
          <input
            type="text"
            placeholder="Search Angkor, Koh Rong, Kampot..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-5 pr-28 py-3.5 bg-white dark:bg-gray-900 rounded-full border border-gray-200 dark:border-gray-800 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold rounded-full flex items-center gap-1.5 shadow-md hover:scale-105 transition-transform"
          >
            <FaSearch /> Search
          </button>
        </form>

        {/* Helpful Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-lg mx-auto pt-2">
          <Link
            to="/"
            className="p-3.5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-primary text-xs font-bold flex flex-col items-center gap-1.5 shadow-sm hover:shadow-md transition-all group"
          >
            <FaHome className="text-primary text-base group-hover:scale-110 transition-transform" />
            <span>Return Home</span>
          </Link>

          <Link
            to="/best-places"
            className="p-3.5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-primary text-xs font-bold flex flex-col items-center gap-1.5 shadow-sm hover:shadow-md transition-all group"
          >
            <FaMapMarkedAlt className="text-cyan-500 text-base group-hover:scale-110 transition-transform" />
            <span>Best Places</span>
          </Link>

          <Link
            to="/blogs"
            className="p-3.5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-primary text-xs font-bold flex flex-col items-center gap-1.5 shadow-sm hover:shadow-md transition-all group"
          >
            <FaBookOpen className="text-amber-500 text-base group-hover:scale-110 transition-transform" />
            <span>Travel Guides</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NoPage;
