import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useData } from "../../context/DataContext";
import {
  MdLuggage,
  MdAttachMoney,
  MdPlace,
  MdArticle,
  MdStar,
  MdHourglassEmpty,
  MdCheckCircle,
  MdCancel,
  MdTrendingUp,
  MdAdd,
  MdArrowForward,
  MdPerson,
} from "react-icons/md";
import { FaFire } from "react-icons/fa";

const AdminDashboard = () => {
  const { bookings, places, blogs, reviews, updateBookingStatus } = useData();

  // Calculate Metrics
  const totalRevenue = bookings.reduce((sum, b) => {
    return b.status !== "Cancelled" ? sum + (b.totalPrice || 0) : sum;
  }, 0);

  const pendingBookings = bookings.filter((b) => b.status === "Pending");
  const confirmedBookings = bookings.filter((b) => b.status === "Confirmed");
  const completedBookings = bookings.filter((b) => b.status === "Completed");

  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + Number(r.rating || 5), 0) / reviews.length).toFixed(1)
      : "5.0";

  // Category counts
  const categoryCounts = places.reduce((acc, place) => {
    acc[place.type] = (acc[place.type] || 0) + 1;
    return acc;
  }, {});

  // Monthly breakdown mockup based on current bookings
  const monthlyRevenueData = [
    { month: "Apr", rev: 3200, bookings: 5 },
    { month: "May", rev: 4800, bookings: 8 },
    { month: "Jun", rev: 6100, bookings: 11 },
    { month: "Jul", rev: 8900, bookings: 16 },
    { month: "Aug", rev: totalRevenue > 0 ? totalRevenue : 7500, bookings: bookings.length },
    { month: "Sep", rev: 11200, bookings: 19 },
  ];

  const maxRev = Math.max(...monthlyRevenueData.map((d) => d.rev));

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Welcome & Quick Actions Banner */}
      <div className="bg-gradient-to-r from-primary via-cyan-600 to-secondary rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        {/* Background ambient shapes */}
        <div className="absolute right-0 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
            <FaFire className="text-amber-300" /> Executive Overview
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black">
            Welcome to Wonder Cambodia Admin
          </h1>
          <p className="text-xs sm:text-sm text-cyan-100 max-w-xl font-medium">
            Monitor real-time bookings, manage Cambodian travel itineraries, publish guides, and track revenue performance.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 relative z-10">
          <Link
            to="/admin/places"
            className="flex items-center gap-1.5 bg-white text-primary hover:bg-slate-50 font-bold text-xs px-4 py-2.5 rounded-full shadow-md hover:scale-105 active:scale-95 transition-all"
          >
            <MdAdd size={16} /> New Tour
          </Link>
          <Link
            to="/admin/blogs"
            className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white font-bold text-xs px-4 py-2.5 rounded-full backdrop-blur-md hover:scale-105 active:scale-95 transition-all"
          >
            <MdAdd size={16} /> New Blog
          </Link>
          <Link
            to="/admin/bookings"
            className="flex items-center gap-1.5 bg-slate-900/40 hover:bg-slate-900/60 text-white font-bold text-xs px-4 py-2.5 rounded-full backdrop-blur-md hover:scale-105 active:scale-95 transition-all"
          >
            <MdLuggage size={16} /> Manage Bookings
          </Link>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Revenue */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-card border border-slate-100 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-2xl">
              <MdAttachMoney />
            </div>
            <span className="text-xs font-bold px-2.5 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center gap-1">
              <MdTrendingUp /> +18.4%
            </span>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Revenue</p>
            <h3 className="text-3xl font-heading font-black text-slate-900 dark:text-white mt-1">
              ${totalRevenue.toLocaleString()}
            </h3>
            <p className="text-[11px] text-slate-500 mt-1">From {bookings.length} verified bookings</p>
          </div>
        </div>

        {/* Total Bookings */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-card border border-slate-100 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-2xl">
              <MdLuggage />
            </div>
            <span className="text-xs font-bold px-2.5 py-1 bg-primary/10 text-primary rounded-full">
              {pendingBookings.length} Pending
            </span>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Reservations</p>
            <h3 className="text-3xl font-heading font-black text-slate-900 dark:text-white mt-1">
              {bookings.length}
            </h3>
            <p className="text-[11px] text-slate-500 mt-1">
              {confirmedBookings.length} confirmed • {completedBookings.length} completed
            </p>
          </div>
        </div>

        {/* Active Tour Packages */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-card border border-slate-100 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center text-2xl">
              <MdPlace />
            </div>
            <span className="text-xs font-bold px-2.5 py-1 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 rounded-full">
              Live & Listed
            </span>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Tour Packages</p>
            <h3 className="text-3xl font-heading font-black text-slate-900 dark:text-white mt-1">
              {places.length}
            </h3>
            <p className="text-[11px] text-slate-500 mt-1">Across 8 Cambodian provinces</p>
          </div>
        </div>

        {/* Customer Satisfaction Rating */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-card border border-slate-100 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center text-2xl">
              <MdStar />
            </div>
            <span className="text-xs font-bold px-2.5 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-full">
              {reviews.length} Reviews
            </span>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Client Rating</p>
            <h3 className="text-3xl font-heading font-black text-slate-900 dark:text-white mt-1">
              {averageRating} <span className="text-lg text-slate-400 font-normal">/ 5.0</span>
            </h3>
            <p className="text-[11px] text-slate-500 mt-1">99.2% positive customer satisfaction</p>
          </div>
        </div>
      </div>

      {/* Analytics & Distribution Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Growth Trend (2 Cols) */}
        <div className="lg:col-span-2 p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-card border border-slate-100 dark:border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-lg font-heading font-extrabold text-slate-900 dark:text-white">
                Revenue & Booking Performance
              </h3>
              <p className="text-xs text-slate-400">Monthly gross volume and traveler reservations</p>
            </div>
            <div className="flex items-center gap-3 text-xs font-semibold">
              <span className="flex items-center gap-1 text-primary">
                <span className="w-3 h-3 rounded-full bg-primary inline-block" /> Revenue ($)
              </span>
            </div>
          </div>

          {/* Custom SVG / CSS Bar Chart */}
          <div className="pt-6">
            <div className="h-48 flex items-end justify-between gap-2 sm:gap-6 px-2 border-b border-slate-200 dark:border-slate-800 pb-2">
              {monthlyRevenueData.map((data, idx) => {
                const heightPercent = Math.round((data.rev / maxRev) * 100);
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-2 py-0.5 rounded shadow-md pointer-events-none">
                      ${data.rev.toLocaleString()}
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-t-xl h-36 flex items-end justify-center p-1 relative overflow-hidden">
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className="w-full bg-gradient-to-t from-primary to-secondary rounded-t-lg transition-all duration-700 group-hover:brightness-110 shadow-sm"
                      />
                    </div>
                    <span className="text-xs font-bold text-slate-500 group-hover:text-primary transition-colors">
                      {data.month}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tour Package Category Distribution (1 Col) */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-card border border-slate-100 dark:border-slate-800 space-y-6">
          <div>
            <h3 className="text-lg font-heading font-extrabold text-slate-900 dark:text-white">
              Tour Categories
            </h3>
            <p className="text-xs text-slate-400">Inventory breakdown by travel style</p>
          </div>

          <div className="space-y-4">
            {Object.entries(categoryCounts).map(([cat, count]) => {
              const pct = Math.round((count / places.length) * 100);
              return (
                <div key={cat} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-700 dark:text-slate-300">{cat}</span>
                    <span className="text-primary font-black">
                      {count} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${pct}%` }}
                      className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs space-y-1">
            <p className="font-bold text-slate-700 dark:text-slate-200">Total Destinations</p>
            <p className="text-slate-500">
              {places.length} active packages curated for international and local tourists.
            </p>
          </div>
        </div>
      </div>

      {/* Recent Bookings Table Preview */}
      <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-card border border-slate-100 dark:border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-heading font-extrabold text-slate-900 dark:text-white">
              Recent Tour Bookings
            </h3>
            <p className="text-xs text-slate-400">Latest reservation requests submitted via website</p>
          </div>
          <Link
            to="/admin/bookings"
            className="flex items-center gap-1 text-xs font-bold text-primary hover:text-secondary transition-colors"
          >
            <span>View All Bookings</span> <MdArrowForward size={14} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 uppercase font-bold text-[10px] tracking-wider">
                <th className="pb-3 px-2">Ref / Date</th>
                <th className="pb-3 px-2">Traveler</th>
                <th className="pb-3 px-2">Package</th>
                <th className="pb-3 px-2">Guests</th>
                <th className="pb-3 px-2">Total ($)</th>
                <th className="pb-3 px-2">Status</th>
                <th className="pb-3 px-2 text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {bookings.slice(0, 5).map((booking) => (
                <tr key={booking.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-2">
                    <p className="font-mono font-bold text-primary">{booking.ref}</p>
                    <p className="text-[10px] text-slate-400">{booking.date}</p>
                  </td>
                  <td className="py-3.5 px-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                        {booking.customerName?.charAt(0) || "U"}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">{booking.customerName}</p>
                        <p className="text-[10px] text-slate-400 truncate max-w-[140px]">{booking.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-2 font-semibold text-slate-800 dark:text-slate-200 max-w-[180px] truncate">
                    {booking.placeTitle}
                  </td>
                  <td className="py-3.5 px-2">{booking.guests} Guest(s)</td>
                  <td className="py-3.5 px-2 font-black font-heading text-sm text-slate-900 dark:text-white">
                    ${booking.totalPrice}
                  </td>
                  <td className="py-3.5 px-2">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        booking.status === "Confirmed"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : booking.status === "Pending"
                          ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                          : booking.status === "Completed"
                          ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                          : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                      }`}
                    >
                      {booking.status === "Confirmed" && <MdCheckCircle size={12} />}
                      {booking.status === "Pending" && <MdHourglassEmpty size={12} />}
                      {booking.status === "Cancelled" && <MdCancel size={12} />}
                      {booking.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-2 text-right">
                    {booking.status === "Pending" ? (
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => updateBookingStatus(booking.id, "Confirmed")}
                          title="Confirm Booking"
                          className="px-2.5 py-1 bg-emerald-500 text-white rounded-lg font-bold hover:bg-emerald-600 transition-colors text-[10px]"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => updateBookingStatus(booking.id, "Cancelled")}
                          title="Decline Booking"
                          className="px-2 py-1 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg font-bold hover:bg-rose-500 hover:text-white transition-colors text-[10px]"
                        >
                          Decline
                        </button>
                      </div>
                    ) : (
                      <Link
                        to="/admin/bookings"
                        className="text-primary hover:underline font-bold text-[11px]"
                      >
                        View Details
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
