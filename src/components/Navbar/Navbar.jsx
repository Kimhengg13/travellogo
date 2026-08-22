import React, { useState, useEffect } from "react";
import Logo from "../../assets/logo.png";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { FaCaretDown, FaShieldAlt, FaUser, FaSuitcase, FaSignOutAlt, FaUserPlus } from "react-icons/fa";
import { BiSun, BiMoon } from "react-icons/bi";
import ResponsiveMenu from "./ResponsiveMenu";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import { useAuth } from "../../context/AuthContext";

export const NavbarLinks = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Best Places",
    link: "/best-places",
  },
  {
    name: "Blogs",
    link: "/blogs",
  },
  {
    name: "About",
    link: "/about",
  },
];

const DropdownLinks = [
  {
    name: "Our Services",
    link: "#services",
  },
  {
    name: "Featured Tours",
    link: "#places",
  },
  {
    name: "Travel Reviews",
    link: "#testimonials",
  },
  {
    name: "Admin Portal",
    link: "/admin",
    isAdmin: true,
  },
];

const Navbar = ({ handleOrderPopup }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  const navigate = useNavigate();
  const location = useLocation();

  const { currentUser, userProfile, openAuthModal, logout } = useAuth();

  useEffect(() => {
    const element = document.documentElement;
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleScrollTo = (e, targetId, isAdmin = false) => {
    e.preventDefault();
    if (isAdmin) {
      navigate(targetId);
      return;
    }

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.querySelector(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.querySelector(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <nav className="fixed top-0 right-0 w-full z-50 glass-nav text-gray-900 dark:text-white shadow-sm border-b border-gray-200/50 dark:border-gray-800/50 transition-colors duration-300">
        {/* Main Navbar */}
        <div className="container py-3 sm:py-0">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-3 font-extrabold text-2xl tracking-tight">
              <Link to={"/"} onClick={() => window.scrollTo(0, 0)} className="flex items-center gap-2 group">
                <img src={Logo} alt="Wonder Cambodia Logo" className="h-12 w-auto transition-transform duration-300 group-hover:scale-105" />
                <span className="hidden sm:inline bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-heading font-black text-xl md:text-2xl">
                  Wonder Cambodia
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:block">
              <ul className="flex items-center gap-4 xl:gap-8 font-semibold text-sm">
                {NavbarLinks.map((link) => (
                  <li key={link.name} className="py-5">
                    <NavLink
                      to={link.link}
                      className={({ isActive }) =>
                        `relative py-1 transition-all duration-300 ${
                          isActive
                            ? "text-primary font-bold after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-full after:h-[3px] after:bg-gradient-to-r after:from-primary after:to-secondary after:rounded-full after:shadow-sm"
                            : "text-gray-700 dark:text-gray-200 hover:text-primary after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-0 hover:after:w-full after:h-[3px] after:bg-primary/40 after:rounded-full after:transition-all after:duration-300"
                        }`
                      }
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}

                {/* Dropdown */}
                <li className="group relative cursor-pointer py-5">
                  <span className="flex items-center gap-1 hover:text-primary transition-colors text-gray-700 dark:text-gray-200">
                    Quick Links
                    <FaCaretDown className="transition-transform duration-300 group-hover:rotate-180 text-primary" />
                  </span>
                  <div className="absolute -left-4 top-full z-[9999] hidden w-[190px] rounded-2xl bg-white dark:bg-gray-900 p-2 text-gray-800 dark:text-gray-100 group-hover:block shadow-2xl border border-gray-100 dark:border-gray-800 backdrop-blur-md">
                    <ul className="space-y-1">
                      {DropdownLinks.map((data) => (
                        <li key={data.name}>
                          {data.isAdmin ? (
                            <Link
                              to={data.link}
                              className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-primary hover:bg-primary/10 transition-all"
                            >
                              <FaShieldAlt className="text-amber-500" />
                              <span>{data.name}</span>
                            </Link>
                          ) : (
                            <a
                              className="block rounded-xl px-3 py-2 text-xs font-medium hover:bg-primary/10 hover:text-primary transition-all"
                              href={data.link}
                              onClick={(e) => handleScrollTo(e, data.link, data.isAdmin)}
                            >
                              {data.name}
                            </a>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              </ul>
            </div>

            {/* Actions & Buttons */}
            <div className="flex items-center gap-3">
              {/* Dark/Light Theme Toggle */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle Theme"
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-all duration-300 shadow-inner"
              >
                {theme === "dark" ? <BiSun size={20} className="text-amber-400" /> : <BiMoon size={20} />}
              </button>

              {/* User Authentication Menu / Button */}
              {currentUser ? (
                <div className="group relative py-2">
                  <button className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-primary/10 border border-gray-200 dark:border-gray-700 transition-all">
                    <img
                      src={userProfile?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(userProfile?.displayName || "User")}&background=0D9488&color=fff`}
                      alt="User Avatar"
                      className="w-7 h-7 rounded-full object-cover border border-primary"
                    />
                    <span className="hidden lg:inline text-xs font-extrabold max-w-[100px] truncate">
                      {userProfile?.displayName || currentUser.displayName || "Account"}
                    </span>
                    <FaCaretDown className="text-xs text-primary transition-transform duration-300 group-hover:rotate-180" />
                  </button>

                  {/* Profile Dropdown Menu */}
                  <div className="absolute right-0 top-full z-[9999] hidden w-56 rounded-2xl bg-white dark:bg-gray-900 p-3 text-gray-800 dark:text-gray-100 group-hover:block shadow-2xl border border-gray-100 dark:border-gray-800 backdrop-blur-md space-y-2">
                    <div className="px-3 py-2 border-b border-gray-100 dark:border-gray-800">
                      <p className="text-xs font-bold truncate">
                        {userProfile?.displayName || currentUser.displayName || "Explorer"}
                      </p>
                      <p className="text-[11px] text-gray-400 truncate">{currentUser.email}</p>
                    </div>

                    <div className="space-y-1">
                      <Link
                        to="/my-bookings"
                        className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold hover:bg-primary/10 hover:text-primary transition-all"
                      >
                        <FaSuitcase className="text-primary text-xs" />
                        <span>My Tour Bookings</span>
                      </Link>

                      <Link
                        to="/admin"
                        className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold hover:bg-amber-500/10 text-amber-600 dark:text-amber-400 transition-all"
                      >
                        <FaShieldAlt className="text-xs" />
                        <span>Admin Portal</span>
                      </Link>

                      <button
                        onClick={logout}
                        className="w-full flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-rose-500 hover:bg-rose-500/10 transition-all text-left"
                      >
                        <FaSignOutAlt className="text-xs" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-2">
                  <button
                    onClick={() => openAuthModal("signin")}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-extrabold bg-gray-100 dark:bg-gray-800 hover:bg-primary/10 hover:text-primary text-gray-700 dark:text-gray-200 transition-all border border-gray-200 dark:border-gray-700"
                  >
                    <FaUser className="text-primary text-[10px]" />
                    <span>Sign In</span>
                  </button>
                  <button
                    onClick={() => openAuthModal("register")}
                    className="hidden lg:flex items-center gap-1 px-3 py-2 rounded-full text-xs font-extrabold text-primary hover:bg-primary/10 transition-all"
                  >
                    <FaUserPlus className="text-xs" /> Register
                  </button>
                </div>
              )}

              {/* Book Now Button */}
              <button
                className="bg-gradient-to-r from-primary to-secondary hover:shadow-glow hover:scale-105 active:scale-95 transition-all duration-300 text-white font-bold text-sm px-5 py-2.5 rounded-full shadow-md"
                onClick={handleOrderPopup}
              >
                Book Now
              </button>

              {/* Mobile Hamburger Toggle */}
              <div className="lg:hidden block">
                {showMenu ? (
                  <HiMenuAlt1
                    onClick={toggleMenu}
                    className="cursor-pointer text-gray-800 dark:text-white transition-all"
                    size={28}
                  />
                ) : (
                  <HiMenuAlt3
                    onClick={toggleMenu}
                    className="cursor-pointer text-gray-800 dark:text-white transition-all"
                    size={28}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <ResponsiveMenu setShowMenu={setShowMenu} showMenu={showMenu} handleOrderPopup={handleOrderPopup} />
      </nav>
    </>
  );
};

export default Navbar;
