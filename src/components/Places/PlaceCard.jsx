import React, { useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { FaStar, FaHeart, FaRegHeart, FaEye } from "react-icons/fa";

const PlaceCard = ({
  img,
  title,
  location,
  description,
  price,
  type,
  handleOrderPopup,
  onSelectPlace,
}) => {
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <div className="group rounded-3xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-card hover:shadow-glow transition-all duration-500 overflow-hidden border border-gray-100 dark:border-gray-800 flex flex-col justify-between relative transform hover:-translate-y-2">
      {/* Top Media Container */}
      <div className="relative overflow-hidden h-[230px] w-full">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 opacity-80 group-hover:opacity-60 transition-opacity" />

        {/* Type Badge */}
        <span className="absolute top-4 left-4 bg-primary/90 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
          {type || "Cultural"}
        </span>

        {/* Wishlist Heart Button */}
        <button
          onClick={toggleLike}
          aria-label="Bookmark destination"
          className="absolute top-4 right-4 p-2.5 rounded-full bg-white/80 dark:bg-gray-900/80 text-gray-700 dark:text-gray-200 hover:scale-110 active:scale-95 transition-all shadow-md backdrop-blur-md"
        >
          {isLiked ? (
            <FaHeart className="text-red-500 transition-colors" size={16} />
          ) : (
            <FaRegHeart size={16} />
          )}
        </button>

        {/* Floating Rating Tag */}
        <div className="absolute bottom-3 left-4 flex items-center gap-1 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-xs font-semibold">
          <FaStar className="text-amber-400 text-xs" />
          <span>4.9</span>
          <span className="text-gray-300 font-normal text-[10px]">(120+)</span>
        </div>
      </div>

      {/* Card Info Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs text-primary font-semibold">
            <IoLocationSharp size={15} />
            <span>{location}</span>
          </div>

          <h3 className="font-heading font-extrabold text-xl line-clamp-1 group-hover:text-primary transition-colors">
            {title}
          </h3>

          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Pricing & Actions Footer */}
        <div className="pt-4 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-gray-400 font-medium block">Per Person</span>
            <span className="font-heading font-black text-2xl text-gray-900 dark:text-white">
              ${price}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick View Details Button */}
            {onSelectPlace && (
              <button
                onClick={() => onSelectPlace({ img, title, location, description, price, type })}
                aria-label="View Place Details"
                className="p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary/20 hover:text-primary transition-all"
              >
                <FaEye size={16} />
              </button>
            )}

            {/* Book Now Button */}
            <button
              onClick={() => handleOrderPopup({ img, title, location, price })}
              className="bg-gradient-to-r from-primary to-secondary hover:shadow-glow text-white font-bold text-xs px-4 py-2.5 rounded-full transition-all duration-300 active:scale-95 shadow-sm"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;
