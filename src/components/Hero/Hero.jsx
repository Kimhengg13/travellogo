import React, { useState } from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaSearch, FaStar, FaGlobeAmericas, FaShieldAlt } from "react-icons/fa";

const Hero = ({ onSearch }) => {
  const [priceValue, setPriceValue] = useState(650);
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch({ destination, date, maxPrice: priceValue });
    }
    const placesSection = document.getElementById("places");
    if (placesSection) {
      placesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-black/40 h-full flex flex-col justify-between py-12">
      <div className="h-full flex justify-center items-center p-4">
        <div className="container grid grid-cols-1 gap-8 max-w-5xl">
          {/* Header Tagline & Badges */}
          <div className="text-white text-center space-y-4">
            <div data-aos="fade-down" className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold tracking-wider uppercase text-cyan-300 shadow-lg">
              <FaGlobeAmericas className="text-emerald-400" /> Kingdom Of Wonder
            </div>

            <h1
              data-aos="fade-up"
              data-aos-delay="200"
              className="font-heading font-black text-4xl sm:text-6xl md:text-7xl tracking-tight text-white leading-tight drop-shadow-lg"
            >
              Discover The Magic Of <br />
              <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-cyan-300 bg-clip-text text-transparent">
                Cambodia
              </span>
            </h1>

            <p
              data-aos="fade-up"
              data-aos-delay="400"
              className="text-gray-200 text-sm sm:text-lg max-w-2xl mx-auto font-medium"
            >
              Handcrafted tours across ancient Angkor temples, pristine Koh Rong islands, French colonial Kampot, and elephant sanctuaries in Mondulkiri.
            </p>
          </div>

          {/* Search Filter Box */}
          <div
            data-aos="fade-up"
            data-aos-delay="600"
            className="space-y-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/40 dark:border-gray-700/50 relative"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-2">
              {/* Destination Input */}
              <div className="space-y-2">
                <label htmlFor="destination" className="text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 flex items-center gap-1.5">
                  <FaMapMarkerAlt className="text-primary" /> Destination in Cambodia
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="destination"
                    id="destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Siem Reap, Koh Rong, Kampot..."
                    className="w-full bg-gray-100/80 dark:bg-gray-800/80 text-gray-900 dark:text-white placeholder-gray-400 font-medium rounded-2xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all border border-gray-200 dark:border-gray-700"
                  />
                </div>
              </div>

              {/* Date Input */}
              <div className="space-y-2">
                <label htmlFor="travel-date" className="text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 flex items-center gap-1.5">
                  <FaCalendarAlt className="text-primary" /> Travel Date
                </label>
                <input
                  type="date"
                  name="travel-date"
                  id="travel-date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-gray-100/80 dark:bg-gray-800/80 text-gray-900 dark:text-white font-medium rounded-2xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all border border-gray-200 dark:border-gray-700"
                />
              </div>

              {/* Max Price Slider */}
              <div className="space-y-2">
                <div className="w-full flex justify-between items-center text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">
                  <span>Max Budget</span>
                  <span className="font-extrabold text-primary text-base">${priceValue}</span>
                </div>
                <div className="bg-gray-100/80 dark:bg-gray-800/80 rounded-2xl p-3 flex items-center justify-center border border-gray-200 dark:border-gray-700">
                  <input
                    type="range"
                    name="price"
                    id="price"
                    className="w-full accent-primary cursor-pointer h-2 bg-gray-300 dark:bg-gray-700 rounded-lg"
                    min="100"
                    max="2000"
                    value={priceValue}
                    step="50"
                    onChange={(e) => setPriceValue(Number(e.target.value))}
                  />
                </div>
              </div>
            </div>

            {/* Floating Search Action Button */}
            <button
              onClick={handleSearchClick}
              className="bg-gradient-to-r from-primary via-cyan-600 to-secondary text-white font-extrabold text-sm px-8 py-3.5 rounded-full shadow-glow hover:scale-105 active:scale-95 duration-300 absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 tracking-wide uppercase"
            >
              <FaSearch /> Search Packages
            </button>
          </div>

          {/* Quick Floating Proof Badges */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-white/90 font-medium text-xs sm:text-sm">
            <div className="flex items-center gap-2 bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
              <FaStar className="text-amber-400" />
              <span>4.9 / 5 Rated Experience</span>
            </div>
            <div className="flex items-center gap-2 bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
              <FaGlobeAmericas className="text-cyan-400" />
              <span>500+ Verified Destinations</span>
            </div>
            <div className="flex items-center gap-2 bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
              <FaShieldAlt className="text-emerald-400" />
              <span>100% Secure Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
