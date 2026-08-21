import React, { useState } from "react";
import { useData } from "../../context/DataContext";
import { IoCloseOutline } from "react-icons/io5";
import {
  FaCheckCircle,
  FaPlaneDeparture,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaUsers,
  FaCalendarAlt,
  FaLock,
} from "react-icons/fa";

const OrderPopup = ({ orderPopup, setOrderPopup, selectedPlace }) => {
  const { addBooking } = useData();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: new Date().toISOString().split("T")[0],
    guests: "2",
    notes: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [createdBooking, setCreatedBooking] = useState(null);

  const pricePerPerson = selectedPlace?.price || 250;
  const guestCount = Number(formData.guests || 1);
  const estimatedTotal = pricePerPerson * guestCount;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    const saved = addBooking({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      date: formData.date,
      guests: guestCount,
      notes: formData.notes,
      placeId: selectedPlace?.id || null,
      placeTitle: selectedPlace?.title || "Custom Cambodian Tour Package",
      pricePerPerson: pricePerPerson,
    });

    setCreatedBooking(saved);
    setIsSubmitted(true);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setCreatedBooking(null);
    setOrderPopup(false);
  };

  if (!orderPopup) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-200 dark:border-gray-800 relative transition-all duration-300 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <IoCloseOutline size={22} />
        </button>

        {!isSubmitted ? (
          <div className="space-y-5">
            {/* Modal Title Header */}
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                <FaPlaneDeparture /> Reserved Tour Booking
              </div>
              <h2 className="text-2xl font-heading font-extrabold">
                {selectedPlace?.title ? `Book "${selectedPlace.title}"` : "Book Your Next Adventure"}
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Fill in your contact details below to reserve your Cambodian travel package.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                  <FaUser className="text-primary text-[10px]" /> Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary font-medium"
                />
              </div>

              {/* Email & Phone Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                    <FaEnvelope className="text-primary text-[10px]" /> Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                    <FaPhone className="text-primary text-[10px]" /> Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+855 12 345 678"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary font-medium"
                  />
                </div>
              </div>

              {/* Travel Date & Guests Count */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                    <FaCalendarAlt className="text-primary text-[10px]" /> Preferred Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                    <FaUsers className="text-primary text-[10px]" /> Guests / Travelers
                  </label>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary font-medium"
                  >
                    <option value="1">1 Person (Solo)</option>
                    <option value="2">2 Persons (Couple)</option>
                    <option value="3">3 Persons</option>
                    <option value="4">4 Persons (Family)</option>
                    <option value="6">6+ Persons (Group)</option>
                  </select>
                </div>
              </div>

              {/* Price Calculation Box */}
              <div className="p-3 bg-gray-50 dark:bg-gray-800/60 rounded-xl flex items-center justify-between text-xs border border-gray-100 dark:border-gray-800">
                <span className="text-gray-500">
                  Rate: ${pricePerPerson} × {guestCount} traveler(s)
                </span>
                <div className="text-right">
                  <span className="font-heading font-black text-lg text-primary">
                    Total: ${estimatedTotal}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-glow text-white font-extrabold py-3.5 rounded-2xl text-sm transition-all duration-300 hover:scale-[1.02] active:scale-98 tracking-wide shadow-md flex items-center justify-center gap-2"
                >
                  <FaLock className="text-xs" /> Confirm & Reserve Now
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation Screen */
          <div className="text-center py-6 space-y-4 animate-scaleUp">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <FaCheckCircle size={36} />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-heading font-black text-gray-900 dark:text-white">
                Booking Confirmed!
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                Thank you <strong>{createdBooking?.customerName}</strong>! Your reservation has been recorded and transmitted to our concierge team.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/60 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Booking Reference:</span>
                <span className="font-mono font-bold text-primary">{createdBooking?.ref}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Destination:</span>
                <span className="font-bold">{createdBooking?.placeTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Travel Date:</span>
                <span className="font-bold">{createdBooking?.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Travelers:</span>
                <span className="font-bold">{createdBooking?.guests} Guest(s)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Total Package Amount:</span>
                <span className="font-bold text-emerald-500 font-heading text-sm">${createdBooking?.totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Status:</span>
                <span className="font-bold px-2 py-0.5 bg-amber-500/10 text-amber-500 rounded-full">
                  {createdBooking?.status}
                </span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-extrabold text-xs px-8 py-3 rounded-full hover:scale-105 active:scale-95 transition-all shadow-md"
            >
              Done & Return
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderPopup;
