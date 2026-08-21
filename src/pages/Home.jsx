import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Hero from "../components/Hero/Hero";
import BlogsComp from "../components/Blogs/BlogsComp";
import Places from "../components/Places/Places";
import Testimonial from "../components/Testimonial/Testimonial";
import Banner from "../components/Banner/Banner";
import BannerPic from "../components/BannerPic/BannerPic";
import BannerImg from "../assets/cover-women.jpg";
import Banner2 from "../assets/travel-cover2.jpg";

import AngkorImg from "../assets/cambodia/angkor-wat.jpg";
import KohRongImg from "../assets/cambodia/koh-rong.jpg";
import PhnomPenhImg from "../assets/cambodia/phnom-penh.jpg";

// 3 High-resolution Cambodia Hero Images loaded from local assets
const heroImages = [
  {
    url: AngkorImg,
    caption: "Angkor Wat Sunrise, Siem Reap",
  },
  {
    url: KohRongImg,
    caption: "Koh Rong Tropical Beach Paradise",
  },
  {
    url: PhnomPenhImg,
    caption: "Royal Palace & Mekong Riverfront, Phnom Penh",
  },
];

const Home = () => {
  const { handleOrderPopup } = useOutletContext() || {};
  const [filterCriteria, setFilterCriteria] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto change image every 3.5 seconds
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 3500);

    return () => clearInterval(slideInterval);
  }, []);

  const handleSearch = (criteria) => {
    setFilterCriteria(criteria);
  };

  return (
    <div className="dark:bg-gray-950 transition-colors duration-300">
      {/* Hero Container with 3-Image Background Auto Slider */}
      <div className="h-[780px] relative overflow-hidden">
        {/* Background Images with Cross-Fade Transition */}
        {heroImages.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? "opacity-100 scale-105" : "opacity-0 scale-100"
            } transition-transform duration-[4000ms]`}
          >
            <img
              src={img.url}
              alt={img.caption}
              className="w-full h-full object-cover"
            />
            {/* Dark Overlay Gradient for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-black/50 to-black/40" />
          </div>
        ))}

        {/* Hero Overlay Content */}
        <div className="relative z-10 h-full">
          <Hero onSearch={handleSearch} />
        </div>
      </div>

      <Places handleOrderPopup={handleOrderPopup} filterCriteria={filterCriteria} />
      <BannerPic img={BannerImg} />
      <BlogsComp />
      <Banner />
      <BannerPic img={Banner2} />
      <Testimonial />
    </div>
  );
};

export default Home;
