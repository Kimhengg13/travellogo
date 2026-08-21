import React from "react";
import BlogsComp from "../components/Blogs/BlogsComp";
import Location from "../components/Location/Location";
import CountUp from "react-countup";
import { FaGlobe, FaSmile, FaAward, FaHeadset } from "react-icons/fa";

const About = () => {
  return (
    <div className="dark:bg-gray-950 transition-colors duration-300">
      {/* Hero Header Section */}
      <div className="bg-gradient-to-r from-primary via-cyan-700 to-secondary py-20 text-white text-center relative overflow-hidden">
        <div className="container max-w-4xl space-y-4 relative z-10">
          <span className="bg-white/20 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            Kingdom of Wonder
          </span>
          <h1 data-aos="fade-up" className="text-4xl sm:text-6xl font-heading font-black">
            Sharing The Splendor Of Cambodia With The World
          </h1>
          <p data-aos="fade-up" data-aos-delay="200" className="text-sm sm:text-lg text-gray-100 max-w-2xl mx-auto font-medium">
            Dedicated to promoting Cambodian cultural heritage, eco-tourism, and luxury hospitality across Siem Reap, Koh Rong, Phnom Penh, Kampot, and beyond.
          </p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="container py-16 space-y-16">
        {/* Story Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-right" className="space-y-4">
            <h2 className="text-3xl font-heading font-extrabold text-gray-900 dark:text-white">
              Authentic Experiences & Warm Khmer Hospitality
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
              Cambodia is a land of inspiring contrast—from ancient Khmer architectural marvels like Angkor Wat to tropical white-sand islands in the Gulf of Thailand, lush jungle highlands in Mondulkiri, and French colonial heritage in Kampot and Battambang.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
              At Wonder Cambodia, our mission is to craft authentic, sustainable, and stress-free travel experiences. We partner with local communities, ethical wildlife sanctuaries, and premium resorts to ensure your journey supports local heritage while giving you 5-star comfort.
            </p>
          </div>

          {/* Animated Statistics Grid */}
          <div data-aos="fade-left" className="grid grid-cols-2 gap-4">
            <div className="p-6 bg-white dark:bg-gray-900 rounded-3xl shadow-card border border-gray-100 dark:border-gray-800 text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
                <FaGlobe size={24} />
              </div>
              <h3 className="text-3xl font-black font-heading text-gray-900 dark:text-white">
                <CountUp end={500} duration={2.5} suffix="+" />
              </h3>
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Destinations</p>
            </div>

            <div className="p-6 bg-white dark:bg-gray-900 rounded-3xl shadow-card border border-gray-100 dark:border-gray-800 text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                <FaSmile size={24} />
              </div>
              <h3 className="text-3xl font-black font-heading text-gray-900 dark:text-white">
                <CountUp end={15} duration={2.5} suffix="k+" />
              </h3>
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Happy Clients</p>
            </div>

            <div className="p-6 bg-white dark:bg-gray-900 rounded-3xl shadow-card border border-gray-100 dark:border-gray-800 text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto">
                <FaAward size={24} />
              </div>
              <h3 className="text-3xl font-black font-heading text-gray-900 dark:text-white">
                <CountUp end={45} duration={2.5} suffix="+" />
              </h3>
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Awards Won</p>
            </div>

            <div className="p-6 bg-white dark:bg-gray-900 rounded-3xl shadow-card border border-gray-100 dark:border-gray-800 text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-violet-500/10 text-violet-500 flex items-center justify-center mx-auto">
                <FaHeadset size={24} />
              </div>
              <h3 className="text-3xl font-black font-heading text-gray-900 dark:text-white">
                <CountUp end={24} duration={1.5} suffix="/7" />
              </h3>
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Support</p>
            </div>
          </div>
        </div>

        {/* Location & Map Section */}
        <Location />

        {/* Latest Blogs Preview */}
        <BlogsComp />
      </div>
    </div>
  );
};

export default About;
