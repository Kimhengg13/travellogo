import React, { useState, useEffect } from "react";
import { Link, NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useData } from "../../context/DataContext";
import Logo from "../../assets/logo.png";
import {
  MdDashboard,
  MdLuggage,
  MdPlace,
  MdArticle,
  MdRateReview,
  MdAnalytics,
  MdSettings,
  MdLogout,
  MdMenu,
  MdClose,
  MdNotifications,
  MdSearch,
  MdOpenInNew,
  MdWbSunny,
  MdNightlightRound,
  MdCheckCircle,
  MdWarning,
} from "react-icons/md";

const AdminLayout = () => {
  const { adminAuth, logoutAdmin, bookings } = useData();
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  const pendingBookings = bookings.filter((b) => b.status === "Pending");

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

  const handleLogout = () => {
    logoutAdmin();
    navigate("/admin/login");
  };

  const navItems = [
    {
      name: "Dashboard",
      path: "/admin",
      exact: true,
      icon: <MdDashboard size={20} />,
    },
    {
      name: "Bookings",
      path: "/admin/bookings",
      icon: <MdLuggage size={20} />,
      badge: pendingBookings.length > 0 ? pendingBookings.length : null,
      badgeColor: "bg-amber-500",
    },
    {
      name: "Tour Packages",
      path: "/admin/places",
      icon: <MdPlace size={20} />,
    },
    {
      name: "Travel Blogs",
      path: "/admin/blogs",
      icon: <MdArticle size={20} />,
    },
    {
      name: "Reviews & Ratings",
      path: "/admin/reviews",
      icon: <MdRateReview size={20} />,
    },
    {
      name: "Analytics & Reports",
      path: "/admin/analytics",
      icon: <MdAnalytics size={20} />,
    },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: <MdSettings size={20} />,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans flex flex-col md:flex-row transition-colors duration-300">
      {/* Mobile Drawer Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden transition-opacity"
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-50 h-screen w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } shadow-xl md:shadow-none`}
      >
        {/* Brand Header */}
        <div>
          <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <Link to="/admin" className="flex items-center gap-3 group">
              <img
                src={Logo}
                alt="Wonder Cambodia Logo"
                className="h-10 w-auto transition-transform group-hover:scale-105"
              />
              <div>
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-heading font-black text-xl tracking-tight block">
                  Wonder Admin
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block -mt-1">
                  Management Portal
                </span>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <MdClose size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 overflow-y-auto max-h-[calc(100vh-220px)]">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-2">
              Main Menu
            </div>
            {navItems.map((item) => {
              const isActive =
                item.exact
                  ? location.pathname === item.path || location.pathname === "/admin/dashboard"
                  : location.pathname.startsWith(item.path);

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md shadow-primary/20"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-primary"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isActive ? "text-white" : "text-slate-500 dark:text-slate-400"}>
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full text-white ${item.badgeColor} shadow-sm`}
                    >
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer & User Profile */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          {/* Quick Exit to Public Website */}
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-center gap-2 w-full py-2 px-3 mb-3 text-xs font-bold text-primary bg-primary/10 hover:bg-primary/20 rounded-xl transition-colors"
          >
            <MdOpenInNew size={14} />
            <span>View Live Website</span>
          </Link>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img
                src={
                  adminAuth.user?.avatar ||
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                }
                alt="Admin Avatar"
                className="w-9 h-9 rounded-full object-cover border border-primary"
              />
              <div className="overflow-hidden">
                <p className="text-xs font-bold truncate">{adminAuth.user?.name || "Administrator"}</p>
                <p className="text-[10px] text-slate-400 truncate">{adminAuth.user?.role || "Super Admin"}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              title="Logout"
              className="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
            >
              <MdLogout size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4 transition-colors">
          {/* Left: Mobile Toggle & Page Search */}
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <MdMenu size={24} />
            </button>
            <div className="relative w-full hidden sm:block">
              <MdSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Quick search bookings, tours, travelers..."
                className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 text-xs font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-primary border border-transparent dark:border-slate-700 text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>

          {/* Right: Quick Actions, Theme, Notifications & Live Site */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Live Site Button */}
            <Link
              to="/"
              className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            >
              <MdOpenInNew size={14} className="text-primary" />
              <span>Public Storefront</span>
            </Link>

            {/* Dark/Light Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-primary transition-colors"
            >
              {theme === "dark" ? <MdWbSunny size={18} className="text-amber-400" /> : <MdNightlightRound size={18} />}
            </button>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-primary transition-colors"
              >
                <MdNotifications size={19} />
                {pendingBookings.length > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-amber-500 rounded-full ring-2 ring-white dark:ring-slate-900 animate-pulse" />
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 py-3 z-50 animate-fadeIn">
                  <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Notifications
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-500/10 text-amber-500 rounded-full">
                      {pendingBookings.length} Pending
                    </span>
                  </div>

                  <div className="max-h-64 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                    {pendingBookings.length > 0 ? (
                      pendingBookings.map((b) => (
                        <Link
                          key={b.id}
                          to="/admin/bookings"
                          onClick={() => setShowNotifications(false)}
                          className="p-3 hover:bg-slate-50 dark:hover:bg-slate-800/60 flex items-start gap-3 transition-colors block"
                        >
                          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500 mt-0.5">
                            <MdWarning size={15} />
                          </div>
                          <div className="flex-1 overflow-hidden">
                            <p className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                              {b.customerName}
                            </p>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                              Booked: {b.placeTitle}
                            </p>
                            <p className="text-[10px] text-primary font-semibold mt-0.5">
                              {b.ref} • ${b.totalPrice}
                            </p>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="py-6 text-center text-xs text-slate-400 flex flex-col items-center gap-1.5">
                        <MdCheckCircle className="text-emerald-500" size={24} />
                        <span>All bookings are up to date!</span>
                      </div>
                    )}
                  </div>

                  <div className="p-2 border-t border-slate-100 dark:border-slate-800 text-center">
                    <Link
                      to="/admin/bookings"
                      onClick={() => setShowNotifications(false)}
                      className="text-xs font-bold text-primary hover:underline"
                    >
                      View All Bookings
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Admin Avatar Pill */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
              <img
                src={
                  adminAuth.user?.avatar ||
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                }
                alt="Avatar"
                className="w-8 h-8 rounded-full object-cover border border-primary"
              />
              <span className="text-xs font-bold hidden sm:inline-block">
                {adminAuth.user?.name?.split(" ")[0] || "Admin"}
              </span>
            </div>
          </div>
        </header>

        {/* Dynamic Nested Page Content */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
