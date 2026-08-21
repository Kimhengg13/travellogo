import React from "react";
import TravelImg from "../../assets/travelbox.png";
import { FaPlaneDeparture, FaHotel, FaWifi, FaUtensils, FaShieldHalved } from "react-icons/fa6";

const Banner = () => {
  return (
    <div id="services" className="py-16 bg-gray-100/60 dark:bg-gray-900/60 transition-colors duration-300">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div data-aos="zoom-in" className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary to-secondary rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition duration-500" />
            <img
              src={TravelImg}
              alt="Travel Features"
              className="relative max-w-[440px] h-auto w-full mx-auto drop-shadow-2xl object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Text Content Section */}
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-primary font-bold text-xs uppercase tracking-widest flex items-center gap-1.5">
                <FaShieldHalved className="text-emerald-500" /> Premium Travel Perks
              </span>
              <h2
                data-aos="fade-up"
                className="text-3xl sm:text-4xl font-heading font-extrabold text-gray-900 dark:text-white leading-tight"
              >
                Explore Every Corner Of Cambodia With Confidence
              </h2>
            </div>

            <p
              data-aos="fade-up"
              data-aos-delay="200"
              className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-medium"
            >
              We craft stress-free, all-inclusive travel experiences. Enjoy 24/7 dedicated concierge assistance, VIP flight bookings, luxury 5-star resort stays, gourmet dining, and high-speed global connectivity.
            </p>

            {/* Feature Perks Grid */}
            <div data-aos="fade-up" data-aos-delay="400" className="grid grid-cols-2 gap-4 pt-2">
              <div className="group/card flex items-center gap-3.5 p-4 rounded-2xl bg-white dark:bg-gray-800/90 shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-700/80 transition-all duration-300 hover:-translate-y-0.5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center text-xl group-hover/card:scale-110 group-hover/card:bg-violet-600 group-hover/card:text-white transition-all duration-300 shadow-sm">
                  <FaPlaneDeparture />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-900 dark:text-white">Flight Deals</h4>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400">VIP Ticket Bookings</p>
                </div>
              </div>

              <div className="group/card flex items-center gap-3.5 p-4 rounded-2xl bg-white dark:bg-gray-800/90 shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-700/80 transition-all duration-300 hover:-translate-y-0.5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center text-xl group-hover/card:scale-110 group-hover/card:bg-amber-500 group-hover/card:text-white transition-all duration-300 shadow-sm">
                  <FaHotel />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-900 dark:text-white">Luxury Hotels</h4>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400">Handpicked Resorts</p>
                </div>
              </div>

              <div className="group/card flex items-center gap-3.5 p-4 rounded-2xl bg-white dark:bg-gray-800/90 shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-700/80 transition-all duration-300 hover:-translate-y-0.5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xl group-hover/card:scale-110 group-hover/card:bg-emerald-600 group-hover/card:text-white transition-all duration-300 shadow-sm">
                  <FaWifi />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-900 dark:text-white">Free Wi-Fi</h4>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400">Stay Connected</p>
                </div>
              </div>

              <div className="group/card flex items-center gap-3.5 p-4 rounded-2xl bg-white dark:bg-gray-800/90 shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-700/80 transition-all duration-300 hover:-translate-y-0.5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500/20 to-pink-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center text-xl group-hover/card:scale-110 group-hover/card:bg-rose-500 group-hover/card:text-white transition-all duration-300 shadow-sm">
                  <FaUtensils />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-900 dark:text-white">Gourmet Meals</h4>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400">Local & Int'l Cuisine</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
