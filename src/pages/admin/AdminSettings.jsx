import React, { useState } from "react";
import { useData } from "../../context/DataContext";
import {
  MdSettings,
  MdSave,
  MdRestartAlt,
  MdCheckCircle,
  MdEmail,
  MdPhone,
  MdBusiness,
  MdAttachMoney,
  MdNotifications,
} from "react-icons/md";

const AdminSettings = () => {
  const { settings, updateSettings, resetToDefaultData } = useData();

  const [formData, setFormData] = useState(settings);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSettings(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleResetData = () => {
    resetToDefaultData();
    setShowResetConfirm(false);
    setFormData(settings);
    alert("Database has been reset to default Cambodian demo records!");
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl">
      {/* Header Bar */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 dark:text-white">
          Agency & Platform Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Configure business details, notification behaviors, currency formats, and sample data controls.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-2xl text-xs font-bold flex items-center gap-2 border border-emerald-500/20 animate-fadeIn">
          <MdCheckCircle size={18} /> Settings successfully saved!
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Business Identity */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-card border border-slate-100 dark:border-slate-800 space-y-4">
          <h3 className="text-base font-heading font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <MdBusiness className="text-primary" /> Agency Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-slate-700 dark:text-slate-300">Brand / Agency Name</label>
              <input
                type="text"
                value={formData.agencyName}
                onChange={(e) => setFormData({ ...formData, agencyName: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-slate-700 dark:text-slate-300">Primary Contact Email</label>
              <input
                type="email"
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-slate-700 dark:text-slate-300">Concierge Phone Hotline</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-slate-700 dark:text-slate-300">Currency Symbol</label>
              <input
                type="text"
                value={formData.currencySymbol}
                onChange={(e) => setFormData({ ...formData, currencySymbol: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
              />
            </div>
          </div>
        </div>

        {/* Booking Engine Automation Preferences */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-card border border-slate-100 dark:border-slate-800 space-y-4">
          <h3 className="text-base font-heading font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <MdNotifications className="text-primary" /> Booking Rules & Automation
          </h3>

          <div className="space-y-3 text-xs">
            <label className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.autoConfirm}
                onChange={(e) => setFormData({ ...formData, autoConfirm: e.target.checked })}
                className="w-4 h-4 text-primary rounded accent-primary cursor-pointer"
              />
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">
                  Automatic Booking Confirmation
                </span>
                <span className="text-slate-500 text-[11px]">
                  Automatically set new web reservations to "Confirmed" status without manual staff review.
                </span>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.notificationEmail}
                onChange={(e) => setFormData({ ...formData, notificationEmail: e.target.checked })}
                className="w-4 h-4 text-primary rounded accent-primary cursor-pointer"
              />
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">
                  Instant Email Alerts
                </span>
                <span className="text-slate-500 text-[11px]">
                  Receive notification pings whenever a guest books a tour or writes a review.
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-4 pt-2">
          <button
            type="submit"
            className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-primary to-secondary text-white font-bold text-xs rounded-2xl shadow-md hover:shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <MdSave size={18} /> Save Settings
          </button>

          <button
            type="button"
            onClick={() => setShowResetConfirm(true)}
            className="flex items-center gap-2 px-5 py-3.5 bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500 hover:text-white font-bold text-xs rounded-2xl transition-colors"
          >
            <MdRestartAlt size={18} /> Reset Demo Data
          </button>
        </div>
      </form>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl border border-slate-100 dark:border-slate-800">
            <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto text-2xl">
              <MdRestartAlt />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Reset All Database Records?</h3>
              <p className="text-xs text-slate-500 mt-1">
                This will restore all default Cambodian destinations, bookings, blogs, and testimonials to their initial seed state.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleResetData}
                className="flex-1 py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs rounded-xl transition-colors shadow-md"
              >
                Reset Now
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-2.5 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSettings;
