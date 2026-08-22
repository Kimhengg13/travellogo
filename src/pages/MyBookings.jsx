import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { bookingsApi } from "../services/api";
import { Link } from "react-router-dom";
import {
  FaPlaneDeparture,
  FaCalendarAlt,
  FaUsers,
  FaMapMarkerAlt,
  FaDollarSign,
  FaClock,
  FaCheckCircle,
  FaSync,
  FaInfoCircle,
  FaArrowLeft,
} from "react-icons/fa";

const MyBookings = () => {
  const { currentUser, userProfile, openAuthModal } = useAuth();
  const [userBookings, setUserBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    if (!currentUser) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const data = await bookingsApi.getUserBookings(currentUser.uid, currentUser.email);
      setUserBookings(data);
    } catch (e) {
      console.error("Error fetching user bookings:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="min-h-screen pt-28 pb-16 bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-900 max-w-md w-full p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-800 text-center space-y-4">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
            <FaPlaneDeparture size={28} />
          </div>
          <h2 className="text-2xl font-heading font-black text-gray-900 dark:text-white">
            Access My Bookings
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Please sign in to your Wonder Cambodia account to view your tour reservations and travel itineraries.
          </p>
          <div className="pt-2">
            <button
              onClick={() => openAuthModal("signin")}
              className="w-full bg-gradient-to-r from-primary to-secondary text-white font-extrabold py-3.5 rounded-2xl text-sm transition-all hover:scale-105 shadow-md"
            >
              Sign In to Your Account
            </button>
          </div>
          <Link to="/" className="inline-block text-xs font-bold text-gray-500 hover:text-primary pt-2">
            ← Return to Home Page
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-16 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Top Header Card */}
        <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 mb-8 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-10 translate-x-8 -translate-y-8 pointer-events-none">
            <FaPlaneDeparture size={240} />
          </div>
          <div className="relative z-10 space-y-3">
            <div className="flex items-center gap-3">
              <img
                src={userProfile?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(userProfile?.displayName || "User")}&background=0D9488&color=fff`}
                alt={userProfile?.displayName}
                className="w-14 h-14 rounded-full border-2 border-primary object-cover shadow-md"
              />
              <div>
                <h1 className="text-2xl sm:text-3xl font-heading font-black">
                  Welcome, {userProfile?.displayName || currentUser?.displayName || "Explorer"}!
                </h1>
                <p className="text-xs text-gray-300 font-medium">
                  {currentUser?.email} • Traveler Account
                </p>
              </div>
            </div>
            <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-white/10">
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                <FaCheckCircle /> Account Verified
              </span>
              <button
                onClick={fetchBookings}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold transition-all"
              >
                <FaSync className={loading ? "animate-spin" : ""} /> Refresh Bookings
              </button>
            </div>
          </div>
        </div>

        {/* Section Title */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-heading font-extrabold text-gray-900 dark:text-white">
              My Cambodian Tour Reservations
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Total Reservations: <strong>{userBookings.length}</strong>
            </p>
          </div>
          <Link
            to="/best-places"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 text-xs font-bold transition-all"
          >
            Explore More Places
          </Link>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="py-16 text-center space-y-3">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-gray-500 font-bold">Loading your reservations from database...</p>
          </div>
        ) : userBookings.length === 0 ? (
          /* Empty State */
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 text-center border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
            <div className="w-16 h-16 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mx-auto">
              <FaInfoCircle size={32} />
            </div>
            <h3 className="text-lg font-heading font-black">No Active Tour Bookings Found</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              You haven't reserved any Cambodian tours yet under <strong>{currentUser.email}</strong>. Browse our top places and book your adventure!
            </p>
            <Link
              to="/best-places"
              className="inline-block bg-gradient-to-r from-primary to-secondary text-white font-extrabold px-6 py-3 rounded-2xl text-xs shadow-md hover:scale-105 transition-all"
            >
              Browse Tour Packages
            </Link>
          </div>
        ) : (
          /* Bookings Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userBookings.map((b) => (
              <div
                key={b.id}
                className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-200 dark:border-gray-800 shadow-md hover:shadow-xl transition-all duration-300 space-y-4"
              >
                {/* Booking Header */}
                <div className="flex justify-between items-start border-b border-gray-100 dark:border-gray-800 pb-3">
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                      Ref: {b.ref || b.id}
                    </span>
                    <h3 className="font-heading font-black text-lg text-gray-900 dark:text-white line-clamp-1">
                      {b.placeTitle}
                    </h3>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      b.status === "Confirmed"
                        ? "bg-emerald-500/10 text-emerald-500"
                        : b.status === "Completed"
                        ? "bg-blue-500/10 text-blue-500"
                        : b.status === "Cancelled"
                        ? "bg-rose-500/10 text-rose-500"
                        : "bg-amber-500/10 text-amber-500"
                    }`}
                  >
                    {b.status}
                  </span>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <FaCalendarAlt className="text-primary" />
                    <span>Date: <strong>{b.date}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <FaUsers className="text-primary" />
                    <span>Travelers: <strong>{b.guests} Person(s)</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <FaDollarSign className="text-primary" />
                    <span>Rate: <strong>${b.pricePerPerson} / person</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <FaClock className="text-primary" />
                    <span>Booked: <strong>{b.createdAt ? new Date(b.createdAt).toLocaleDateString() : "Recent"}</strong></span>
                  </div>
                </div>

                {b.notes && (
                  <div className="p-3 bg-gray-50 dark:bg-gray-800/60 rounded-xl text-xs text-gray-500 dark:text-gray-400 italic">
                    "{b.notes}"
                  </div>
                )}

                {/* Total Price Footer */}
                <div className="pt-2 flex justify-between items-center border-t border-gray-100 dark:border-gray-800 text-xs">
                  <span className="text-gray-500 font-semibold">Total Price Paid/Due:</span>
                  <span className="font-heading font-black text-xl text-primary">${b.totalPrice}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
