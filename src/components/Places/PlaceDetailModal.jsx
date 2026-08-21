import React from "react";
import { IoClose } from "react-icons/io5";
import { FaMapMarkerAlt, FaStar, FaClock, FaUsers, FaCheckCircle, FaCalendarCheck } from "react-icons/fa";

const PlaceDetailModal = ({ place, onClose, onBookNow }) => {
  if (!place) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 dark:border-gray-800 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/40 text-white hover:bg-black/60 transition-all"
        >
          <IoClose size={24} />
        </button>

        {/* Cover Image & Badges */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden rounded-t-3xl">
          <img
            src={place.img}
            alt={place.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6 flex justify-between items-end">
            <div>
              <span className="px-3 py-1 bg-primary/90 text-white text-xs font-bold uppercase rounded-full tracking-wider mb-2 inline-block">
                {place.type}
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
                {place.title}
              </h2>
              <p className="flex items-center gap-1.5 text-xs text-gray-200 mt-1">
                <FaMapMarkerAlt className="text-secondary" /> {place.location}
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-gray-300 block">Starting from</span>
              <span className="text-2xl sm:text-3xl font-black text-amber-400 font-heading">
                ${place.price}
              </span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Highlight Meta Specs */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-gray-50 dark:bg-gray-800/60 rounded-2xl text-center border border-gray-100 dark:border-gray-800">
            <div>
              <span className="text-xs text-gray-500 dark:text-gray-400 block flex items-center justify-center gap-1">
                <FaClock className="text-primary" /> Duration
              </span>
              <span className="text-sm font-bold">5 Days / 4 Nights</span>
            </div>
            <div>
              <span className="text-xs text-gray-500 dark:text-gray-400 block flex items-center justify-center gap-1">
                <FaUsers className="text-primary" /> Group Size
              </span>
              <span className="text-sm font-bold">Max 12 People</span>
            </div>
            <div>
              <span className="text-xs text-gray-500 dark:text-gray-400 block flex items-center justify-center gap-1">
                <FaStar className="text-amber-400" /> Rating
              </span>
              <span className="text-sm font-bold">4.9 (128 Reviews)</span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-lg font-bold font-heading">Overview</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {place.description ||
                "Experience an incredible journey tailored with luxury accommodations, guided sightseeing, private transport, and local culinary delights."}
            </p>
          </div>

          {/* What's Included */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold font-heading">Package Inclusions</h3>
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300">
              <span className="flex items-center gap-2"><FaCheckCircle className="text-emerald-500" /> 4-Star Resort Stay</span>
              <span className="flex items-center gap-2"><FaCheckCircle className="text-emerald-500" /> Daily Breakfast & Dinner</span>
              <span className="flex items-center gap-2"><FaCheckCircle className="text-emerald-500" /> Airport Transfer</span>
              <span className="flex items-center gap-2"><FaCheckCircle className="text-emerald-500" /> English Speaking Guide</span>
              <span className="flex items-center gap-2"><FaCheckCircle className="text-emerald-500" /> Sightseeing Permits</span>
              <span className="flex items-center gap-2"><FaCheckCircle className="text-emerald-500" /> Travel Insurance</span>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between gap-4">
            <div>
              <span className="text-xs text-gray-500 dark:text-gray-400 block">Total Package</span>
              <span className="text-2xl font-black text-primary font-heading">${place.price}</span>
            </div>
            <button
              onClick={() => {
                onClose();
                if (onBookNow) onBookNow(place);
              }}
              className="bg-gradient-to-r from-primary to-secondary hover:shadow-glow text-white font-extrabold px-8 py-3 rounded-full text-sm flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
            >
              <FaCalendarCheck /> Book This Package
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetailModal;
