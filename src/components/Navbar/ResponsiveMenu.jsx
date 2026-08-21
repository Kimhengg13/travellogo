import React from "react";
import { Link } from "react-router-dom";
import { NavbarLinks } from "./Navbar";
import Logo from "../../assets/logo.png";
import { FaUserCircle, FaTimes, FaShieldAlt, FaCompass, FaPhone } from "react-icons/fa";

const ResponsiveMenu = ({ showMenu, setShowMenu, handleOrderPopup }) => {
  return (
    <>
      {/* Dark Backdrop Overlay */}
      {showMenu && (
        <div
          onClick={() => setShowMenu(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden transition-opacity duration-300"
        />
      )}

      {/* Slide-out Drawer */}
      <div
        className={`${
          showMenu ? "translate-x-0" : "-translate-x-full"
        } fixed bottom-0 top-0 left-0 z-50 flex h-screen w-[80%] max-w-sm flex-col justify-between bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-6 pb-6 pt-6 transition-transform duration-300 ease-in-out md:hidden shadow-2xl border-r border-gray-200 dark:border-gray-800`}
      >
        <div className="space-y-6">
          {/* Header Row */}
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
            <Link
              to="/"
              onClick={() => setShowMenu(false)}
              className="flex items-center gap-2"
            >
              <img src={Logo} alt="Logo" className="h-9 w-auto" />
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-heading font-black text-lg">
                Wonder Cambodia
              </span>
            </Link>
            <button
              onClick={() => setShowMenu(false)}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <FaTimes size={16} />
            </button>
          </div>

          {/* User Welcome Card */}
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary text-white flex items-center justify-center font-bold text-sm shadow-sm">
              <FaCompass />
            </div>
            <div>
              <h2 className="text-xs font-bold text-gray-900 dark:text-white">Welcome Explorer</h2>
              <p className="text-[11px] text-primary font-semibold">Kingdom of Wonder Tours</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 px-3 block mb-2">
              Menu Navigation
            </span>
            {NavbarLinks.map((data) => (
              <Link
                key={data.name}
                to={data.link}
                onClick={() => setShowMenu(false)}
                className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-primary/10 hover:text-primary transition-all"
              >
                <span>{data.name}</span>
                <span className="text-primary font-bold text-xs">→</span>
              </Link>
            ))}
          </nav>

          {/* Admin Dashboard Shortcut */}
          <div className="pt-2">
            <Link
              to="/admin"
              onClick={() => setShowMenu(false)}
              className="flex items-center justify-between p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-bold transition-all hover:bg-amber-500 hover:text-white"
            >
              <div className="flex items-center gap-2">
                <FaShieldAlt />
                <span>Admin Management Portal</span>
              </div>
              <span className="text-[10px] font-mono">Access</span>
            </Link>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-gray-800 text-xs">
          <button
            onClick={() => {
              setShowMenu(false);
              if (handleOrderPopup) handleOrderPopup();
            }}
            className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-2xl shadow-md text-xs"
          >
            Book Tour Now
          </button>
          <div className="text-center text-[10px] text-gray-400">
            <p>© 2026 Wonder Cambodia. All rights reserved.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResponsiveMenu;
