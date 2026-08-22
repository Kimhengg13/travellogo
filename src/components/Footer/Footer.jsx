import React, { useState } from "react";
import FooterLogo from "../../assets/logo.png";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaPaperPlane,
  FaCheckCircle,
  FaChevronRight,
  FaArrowUp,
} from "react-icons/fa";
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import NatureVid from "../../assets/video/footer.mp4";
import { Link } from "react-router-dom";

const FooterLinks = [
  { title: "Home", link: "/" },
  { title: "Best Places", link: "/best-places" },
  { title: "Travel Blogs", link: "/blogs" },
  { title: "About Us", link: "/about" },
];

const DestinationLinks = [
  { title: "Angkor Wat, Siem Reap", link: "/best-places" },
  { title: "Koh Rong Island", link: "/best-places" },
  { title: "Phnom Penh City", link: "/best-places" },
  { title: "Kampot & Kep Coast", link: "/best-places" },
];

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative overflow-hidden pt-16 text-gray-900 dark:text-gray-100">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute right-0 top-0 h-full w-full object-cover z-[-1] brightness-75 dark:brightness-50"
      >
        <source src={NatureVid} type="video/mp4" />
      </video>

      <div className="container">
        {/* Main Glassmorphic Footer Container */}
        <div className="bg-white/95 dark:bg-gray-950/95 backdrop-blur-2xl rounded-t-[2.5rem] p-8 sm:p-14 shadow-2xl border-t border-x border-white/60 dark:border-gray-800/80">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand Column */}
            <div className="space-y-5">
              <Link to="/" onClick={scrollToTop} className="flex items-center gap-3 group">
                <img src={FooterLogo} alt="Wonder Cambodia Logo" className="h-12 w-auto transition-transform duration-300 group-hover:scale-105" />
                <span className="bg-gradient-to-r from-primary via-cyan-500 to-secondary bg-clip-text text-transparent font-heading font-black text-xl sm:text-2xl tracking-tight">
                  Wonder Cambodia
                </span>
              </Link>

              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                Your premier travel companion for luxury Cambodian vacations, ancient temple tours, island escapes, and eco-adventures across the Kingdom of Wonder.
              </p>

              {/* Contact Info Pills */}
              <div className="space-y-2.5 text-xs font-semibold text-gray-700 dark:text-gray-300">
                <div className="flex items-center gap-2.5 p-2 rounded-xl bg-gray-100/80 dark:bg-gray-900/80 border border-gray-200/50 dark:border-gray-800">
                  <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                    <FaLocationDot className="text-xs" />
                  </div>
                  <span className="truncate">Norodom Blvd, Phnom Penh, Cambodia</span>
                </div>
                <div className="flex items-center gap-2.5 p-2 rounded-xl bg-gray-100/80 dark:bg-gray-900/80 border border-gray-200/50 dark:border-gray-800">
                  <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                    <FaPhone className="text-xs" />
                  </div>
                  <span>+855 (0) 23 888 999</span>
                </div>
              </div>

              {/* Social Handles */}
              <div className="flex items-center gap-2.5 pt-1">
                <a href="#" aria-label="Instagram" className="p-3 rounded-2xl bg-gray-100 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-tr hover:from-primary hover:to-secondary hover:text-white hover:scale-110 hover:-translate-y-0.5 shadow-sm transition-all duration-300">
                  <FaInstagram size={14} />
                </a>
                <a href="#" aria-label="Facebook" className="p-3 rounded-2xl bg-gray-100 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-tr hover:from-primary hover:to-secondary hover:text-white hover:scale-110 hover:-translate-y-0.5 shadow-sm transition-all duration-300">
                  <FaFacebookF size={14} />
                </a>
                <a href="#" aria-label="Twitter" className="p-3 rounded-2xl bg-gray-100 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-tr hover:from-primary hover:to-secondary hover:text-white hover:scale-110 hover:-translate-y-0.5 shadow-sm transition-all duration-300">
                  <FaTwitter size={14} />
                </a>
                <a href="#" aria-label="LinkedIn" className="p-3 rounded-2xl bg-gray-100 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-tr hover:from-primary hover:to-secondary hover:text-white hover:scale-110 hover:-translate-y-0.5 shadow-sm transition-all duration-300">
                  <FaLinkedinIn size={14} />
                </a>
              </div>
            </div>

            {/* Quick Links Column */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <h4 className="font-heading font-extrabold text-sm uppercase tracking-wider text-primary">
                  Quick Navigation
                </h4>
                <div className="w-8 h-1 bg-gradient-to-r from-primary to-secondary rounded-full" />
              </div>
              <ul className="space-y-3 text-xs font-semibold text-gray-600 dark:text-gray-300">
                {FooterLinks.map((link) => (
                  <li key={link.title}>
                    <Link
                      to={link.link}
                      onClick={scrollToTop}
                      className="group flex items-center gap-2 hover:text-primary transition-all duration-300 hover:translate-x-1"
                    >
                      <FaChevronRight className="text-[9px] text-primary/60 group-hover:text-primary group-hover:translate-x-0.5 transition-transform" />
                      <span>{link.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Popular Destinations Column */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <h4 className="font-heading font-extrabold text-sm uppercase tracking-wider text-primary">
                  Top Destinations
                </h4>
                <div className="w-8 h-1 bg-gradient-to-r from-primary to-secondary rounded-full" />
              </div>
              <ul className="space-y-3 text-xs font-semibold text-gray-600 dark:text-gray-300">
                {DestinationLinks.map((link) => (
                  <li key={link.title}>
                    <Link
                      to={link.link}
                      onClick={scrollToTop}
                      className="group flex items-center gap-2 hover:text-primary transition-all duration-300 hover:translate-x-1"
                    >
                      <FaChevronRight className="text-[9px] text-primary/60 group-hover:text-primary group-hover:translate-x-0.5 transition-transform" />
                      <span>{link.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter Column */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <h4 className="font-heading font-extrabold text-sm uppercase tracking-wider text-primary">
                  Newsletter
                </h4>
                <div className="w-8 h-1 bg-gradient-to-r from-primary to-secondary rounded-full" />
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300 font-medium leading-relaxed">
                Subscribe for exclusive discounts, secret deals, and travel inspiration across Cambodia.
              </p>

              {!subscribed ? (
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="Your email address..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-gray-100/90 dark:bg-gray-900/90 text-gray-900 dark:text-white placeholder-gray-400 rounded-2xl py-3 px-4 text-xs focus:outline-none focus:ring-2 focus:ring-primary border border-gray-200 dark:border-gray-800 shadow-inner"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary via-cyan-500 to-secondary text-white font-bold text-xs py-3 rounded-2xl hover:shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 shadow-md"
                  >
                    <FaPaperPlane className="text-xs" /> Subscribe Now
                  </button>
                </form>
              ) : (
                <div className="p-4 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 border border-emerald-500/20 animate-fade-in">
                  <FaCheckCircle className="text-sm" /> Thanks for subscribing!
                </div>
              )}
            </div>
          </div>

          {/* Bottom Copyright Bar */}
          <div className="mt-12 pt-6 border-t border-gray-200/80 dark:border-gray-800/80 text-center text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>© 2026 Wonder Cambodia. All rights reserved.</p>
            
            <div className="flex items-center gap-6 font-semibold text-gray-400">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-colors">Cookie Settings</a>
            </div>

            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-xs font-bold text-primary hover:text-secondary transition-colors p-2 rounded-xl hover:bg-primary/10"
            >
              <span>Back to top</span>
              <FaArrowUp className="text-[10px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
