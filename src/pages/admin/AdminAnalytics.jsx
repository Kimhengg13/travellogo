import React from "react";
import { useData } from "../../context/DataContext";
import {
  MdAnalytics,
  MdAttachMoney,
  MdLuggage,
  MdPeople,
  MdTrendingUp,
  MdPlace,
  MdStar,
} from "react-icons/md";

const AdminAnalytics = () => {
  const { bookings, places, reviews } = useData();

  const totalRevenue = bookings.reduce((sum, b) => {
    return b.status !== "Cancelled" ? sum + (b.totalPrice || 0) : sum;
  }, 0);

  const averageBookingValue =
    bookings.length > 0 ? Math.round(totalRevenue / bookings.length) : 0;

  // Regional breakdown
  const regionalData = [
    { region: "Siem Reap (Angkor)", revenue: 14200, bookings: 24, share: 38 },
    { region: "Koh Rong Archipelago", revenue: 11800, bookings: 18, share: 31 },
    { region: "Phnom Penh Capital", revenue: 5400, bookings: 12, share: 15 },
    { region: "Kampot & Kep Coast", revenue: 3900, bookings: 10, share: 10 },
    { region: "Mondulkiri & Highlands", revenue: 2200, bookings: 6, share: 6 },
  ];

  // Traveler Group Breakdown
  const guestStats = bookings.reduce(
    (acc, b) => {
      const g = Number(b.guests || 1);
      if (g === 1) acc.solo += 1;
      else if (g === 2) acc.couples += 1;
      else if (g <= 4) acc.family += 1;
      else acc.group += 1;
      return acc;
    },
    { solo: 0, couples: 0, family: 0, group: 0 }
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Bar */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 dark:text-white">
          Analytics & Revenue Intelligence
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          In-depth insights into Cambodian tourism volume, traveler preferences, and province performance.
        </p>
      </div>

      {/* High-level Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-card border border-slate-100 dark:border-slate-800 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-2xl">
            <MdAttachMoney />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Average Booking Value</p>
            <h3 className="text-3xl font-heading font-black text-slate-900 dark:text-white mt-1">
              ${averageBookingValue}
            </h3>
            <p className="text-[11px] text-emerald-500 font-bold mt-1">+12.5% vs last quarter</p>
          </div>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-card border border-slate-100 dark:border-slate-800 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-2xl">
            <MdPeople />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Travelers Hosted</p>
            <h3 className="text-3xl font-heading font-black text-slate-900 dark:text-white mt-1">
              {bookings.reduce((sum, b) => sum + Number(b.guests || 1), 0)} Guests
            </h3>
            <p className="text-[11px] text-slate-400 mt-1">From international & regional inquiries</p>
          </div>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-card border border-slate-100 dark:border-slate-800 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center text-2xl">
            <MdTrendingUp />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Booking Conversion</p>
            <h3 className="text-3xl font-heading font-black text-slate-900 dark:text-white mt-1">
              4.8%
            </h3>
            <p className="text-[11px] text-slate-400 mt-1">Direct website inquiry to reservation</p>
          </div>
        </div>
      </div>

      {/* Regional Performance & Traveler Type Grids */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Province / Regional Revenue */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-card border border-slate-100 dark:border-slate-800 space-y-6">
          <div>
            <h3 className="text-lg font-heading font-extrabold text-slate-900 dark:text-white">
              Revenue by Cambodian Province
            </h3>
            <p className="text-xs text-slate-400">Top earning destinations and tour circuits</p>
          </div>

          <div className="space-y-4">
            {regionalData.map((reg) => (
              <div key={reg.region} className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-800 dark:text-slate-200">{reg.region}</span>
                  <span className="text-primary font-black">
                    ${reg.revenue.toLocaleString()} ({reg.share}%)
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${reg.share}%` }}
                    className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traveler Demographics Breakdown */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-card border border-slate-100 dark:border-slate-800 space-y-6">
          <div>
            <h3 className="text-lg font-heading font-extrabold text-slate-900 dark:text-white">
              Traveler Group Demographics
            </h3>
            <p className="text-xs text-slate-400">Guest party compositions booking tour packages</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800 text-center space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Couples / Duos</span>
              <p className="text-2xl font-black font-heading text-primary">{guestStats.couples}</p>
              <p className="text-[10px] text-slate-500">Honeymoon & romantic getaways</p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800 text-center space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Families</span>
              <p className="text-2xl font-black font-heading text-cyan-500">{guestStats.family}</p>
              <p className="text-[10px] text-slate-500">3-4 travelers with children</p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800 text-center space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Solo Explorers</span>
              <p className="text-2xl font-black font-heading text-amber-500">{guestStats.solo}</p>
              <p className="text-[10px] text-slate-500">Backpackers & photographers</p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800 text-center space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Large Groups</span>
              <p className="text-2xl font-black font-heading text-emerald-500">{guestStats.group}</p>
              <p className="text-[10px] text-slate-500">5+ travelers & corporate retreats</p>
            </div>
          </div>

          <div className="p-4 bg-primary/10 rounded-2xl text-xs text-primary font-bold">
            💡 Pro Tip: Island overwater villas in Koh Rong and sunrise Angkor Wat tours have the highest profit margins.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
