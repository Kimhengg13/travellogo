import React, { useState } from "react";
import { useData } from "../../context/DataContext";
import {
  MdLuggage,
  MdSearch,
  MdFilterList,
  MdAdd,
  MdDownload,
  MdDelete,
  MdEdit,
  MdVisibility,
  MdCheckCircle,
  MdHourglassEmpty,
  MdCancel,
  MdDoneAll,
  MdClose,
  MdPhone,
  MdEmail,
  MdCalendarToday,
  MdPeople,
  MdAttachMoney,
  MdNotes,
} from "react-icons/md";

const AdminBookings = () => {
  const { bookings, places, addBooking, updateBookingStatus, editBooking, deleteBooking } = useData();

  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBookingForView, setSelectedBookingForView] = useState(null);
  const [selectedBookingForEdit, setSelectedBookingForEdit] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState(null);

  // New Booking Form State
  const [newBookingForm, setNewBookingForm] = useState({
    name: "",
    email: "",
    phone: "",
    placeId: places[0]?.id || 1,
    date: new Date().toISOString().split("T")[0],
    guests: 2,
    notes: "",
  });

  // Filter Bookings
  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = statusFilter === "All" || b.status === statusFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      b.customerName?.toLowerCase().includes(q) ||
      b.email?.toLowerCase().includes(q) ||
      b.ref?.toLowerCase().includes(q) ||
      b.placeTitle?.toLowerCase().includes(q) ||
      b.phone?.toLowerCase().includes(q);

    return matchesStatus && matchesSearch;
  });

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ["Ref", "Customer Name", "Email", "Phone", "Package", "Date", "Guests", "Total ($)", "Status", "Notes"];
    const rows = filteredBookings.map((b) => [
      b.ref,
      `"${b.customerName}"`,
      b.email,
      `"${b.phone || ""}"`,
      `"${b.placeTitle}"`,
      b.date,
      b.guests,
      b.totalPrice,
      b.status,
      `"${(b.notes || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `wonder_cambodia_bookings_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCreateNewBooking = (e) => {
    e.preventDefault();
    if (!newBookingForm.name || !newBookingForm.email) return;

    const selectedPlace = places.find((p) => p.id === Number(newBookingForm.placeId));
    addBooking({
      ...newBookingForm,
      placeTitle: selectedPlace?.title || "Custom Package",
      pricePerPerson: selectedPlace?.price || 250,
    });

    setShowAddModal(false);
    setNewBookingForm({
      name: "",
      email: "",
      phone: "",
      placeId: places[0]?.id || 1,
      date: new Date().toISOString().split("T")[0],
      guests: 2,
      notes: "",
    });
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!selectedBookingForEdit) return;

    editBooking(selectedBookingForEdit.id, selectedBookingForEdit);
    setSelectedBookingForEdit(null);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 dark:text-white">
            Reservations & Bookings
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Manage incoming traveler bookings, verify guest details, and track status.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold rounded-2xl transition-colors shadow-sm"
          >
            <MdDownload size={16} /> Export CSV
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-primary to-secondary hover:shadow-glow text-white text-xs font-bold rounded-2xl transition-all shadow-md active:scale-95"
          >
            <MdAdd size={18} /> New Reservation
          </button>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-3xl shadow-card border border-slate-100 dark:border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Status Pills */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {["All", "Pending", "Confirmed", "Completed", "Cancelled"].map((status) => {
              const count =
                status === "All" ? bookings.length : bookings.filter((b) => b.status === status).length;
              return (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    statusFilter === status
                      ? "bg-primary text-white shadow-md shadow-primary/30"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  {status} ({count})
                </button>
              );
            })}
          </div>

          {/* Live Search Input */}
          <div className="relative w-full md:w-72">
            <MdSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by customer, ref, package..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary text-slate-900 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-card border border-slate-100 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 text-slate-400 uppercase font-bold text-[10px] tracking-wider">
                <th className="py-3.5 px-4">Ref Code</th>
                <th className="py-3.5 px-4">Traveler Info</th>
                <th className="py-3.5 px-4">Tour Package</th>
                <th className="py-3.5 px-4">Travel Date</th>
                <th className="py-3.5 px-4">Guests</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {filteredBookings.length > 0 ? (
                filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-4 font-mono font-bold text-primary">{b.ref}</td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white text-sm">{b.customerName}</p>
                        <p className="text-slate-400 text-[11px]">{b.email}</p>
                        {b.phone && <p className="text-slate-400 text-[10px]">{b.phone}</p>}
                      </div>
                    </td>
                    <td className="py-4 px-4 font-semibold text-slate-800 dark:text-slate-200 max-w-[200px]">
                      {b.placeTitle}
                    </td>
                    <td className="py-4 px-4">{b.date}</td>
                    <td className="py-4 px-4">{b.guests} Person(s)</td>
                    <td className="py-4 px-4 font-black font-heading text-sm text-slate-900 dark:text-white">
                      ${b.totalPrice}
                    </td>
                    <td className="py-4 px-4">
                      <select
                        value={b.status}
                        onChange={(e) => updateBookingStatus(b.id, e.target.value)}
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-full border-none focus:outline-none cursor-pointer ${
                          b.status === "Confirmed"
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : b.status === "Pending"
                            ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                            : b.status === "Completed"
                            ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                            : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedBookingForView(b)}
                          title="View Full Booking Details"
                          className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-primary hover:bg-primary/10 transition-colors"
                        >
                          <MdVisibility size={16} />
                        </button>
                        <button
                          onClick={() => setSelectedBookingForEdit(b)}
                          title="Edit Booking"
                          className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-amber-500 hover:bg-amber-500/10 transition-colors"
                        >
                          <MdEdit size={16} />
                        </button>
                        <button
                          onClick={() => setBookingToDelete(b)}
                          title="Delete Booking"
                          className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                        >
                          <MdDelete size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400 space-y-2">
                    <MdLuggage className="mx-auto text-4xl text-slate-300 dark:text-slate-700" />
                    <p className="font-bold">No reservations match your criteria</p>
                    <p className="text-xs">Try changing the status filter or clearing your search.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- MODAL: VIEW DETAILS --- */}
      {selectedBookingForView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 dark:border-slate-800 space-y-6 relative">
            <button
              onClick={() => setSelectedBookingForView(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white"
            >
              <MdClose size={20} />
            </button>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Reservation Details
              </span>
              <h2 className="text-2xl font-heading font-extrabold text-slate-900 dark:text-white">
                Ref: {selectedBookingForView.ref}
              </h2>
            </div>

            <div className="space-y-3 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-slate-200/60 dark:border-slate-700/60">
                <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                  <MdPeople className="text-primary" /> Customer Name:
                </span>
                <span className="font-bold text-slate-900 dark:text-white">{selectedBookingForView.customerName}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-200/60 dark:border-slate-700/60">
                <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                  <MdEmail className="text-primary" /> Email:
                </span>
                <span className="font-bold">{selectedBookingForView.email}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-200/60 dark:border-slate-700/60">
                <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                  <MdPhone className="text-primary" /> Phone:
                </span>
                <span className="font-bold">{selectedBookingForView.phone || "N/A"}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-200/60 dark:border-slate-700/60">
                <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                  <MdLuggage className="text-primary" /> Tour Package:
                </span>
                <span className="font-bold text-right max-w-[200px]">{selectedBookingForView.placeTitle}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-200/60 dark:border-slate-700/60">
                <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                  <MdCalendarToday className="text-primary" /> Preferred Date:
                </span>
                <span className="font-bold">{selectedBookingForView.date}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-200/60 dark:border-slate-700/60">
                <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                  <MdPeople className="text-primary" /> Travelers:
                </span>
                <span className="font-bold">{selectedBookingForView.guests} Guest(s)</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-200/60 dark:border-slate-700/60">
                <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                  <MdAttachMoney className="text-primary" /> Total Price:
                </span>
                <span className="font-black text-primary text-base font-heading">${selectedBookingForView.totalPrice}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-500 font-semibold">Status:</span>
                <span className="font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                  {selectedBookingForView.status}
                </span>
              </div>
            </div>

            {selectedBookingForView.notes && (
              <div className="space-y-1 text-xs">
                <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                  <MdNotes className="text-primary" /> Special Requests & Notes:
                </span>
                <p className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  {selectedBookingForView.notes}
                </p>
              </div>
            )}

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => {
                  updateBookingStatus(selectedBookingForView.id, "Confirmed");
                  setSelectedBookingForView(null);
                }}
                className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-2xl transition-colors shadow-md"
              >
                Confirm Booking
              </button>
              <button
                onClick={() => setSelectedBookingForView(null)}
                className="px-6 py-3 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-2xl hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL: CREATE MANUAL BOOKING --- */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 dark:border-slate-800 space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white"
            >
              <MdClose size={20} />
            </button>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Walk-in / Telephone Reservation
              </span>
              <h2 className="text-2xl font-heading font-extrabold text-slate-900 dark:text-white">
                Create New Booking
              </h2>
            </div>

            <form onSubmit={handleCreateNewBooking} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Customer Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Johnathan Smith"
                  value={newBookingForm.name}
                  onChange={(e) => setNewBookingForm({ ...newBookingForm, name: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={newBookingForm.email}
                    onChange={(e) => setNewBookingForm({ ...newBookingForm, email: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+855 12 345 678"
                    value={newBookingForm.phone}
                    onChange={(e) => setNewBookingForm({ ...newBookingForm, phone: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Select Tour Package *</label>
                <select
                  value={newBookingForm.placeId}
                  onChange={(e) => setNewBookingForm({ ...newBookingForm, placeId: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary font-medium"
                >
                  {places.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title} (${p.price}/person)
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Travel Date *</label>
                  <input
                    type="date"
                    required
                    value={newBookingForm.date}
                    onChange={(e) => setNewBookingForm({ ...newBookingForm, date: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Number of Guests</label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    required
                    value={newBookingForm.guests}
                    onChange={(e) => setNewBookingForm({ ...newBookingForm, guests: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Special Notes & Requests</label>
                <textarea
                  rows={3}
                  placeholder="e.g. VIP pickup, dietary requirements, hotel preference..."
                  value={newBookingForm.notes}
                  onChange={(e) => setNewBookingForm({ ...newBookingForm, notes: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary font-medium resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-2xl hover:shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md"
              >
                Create Reservation
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL: EDIT BOOKING --- */}
      {selectedBookingForEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 dark:border-slate-800 space-y-6 relative">
            <button
              onClick={() => setSelectedBookingForEdit(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white"
            >
              <MdClose size={20} />
            </button>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
                Update Record
              </span>
              <h2 className="text-2xl font-heading font-extrabold text-slate-900 dark:text-white">
                Edit Booking ({selectedBookingForEdit.ref})
              </h2>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Customer Name</label>
                <input
                  type="text"
                  required
                  value={selectedBookingForEdit.customerName}
                  onChange={(e) =>
                    setSelectedBookingForEdit({
                      ...selectedBookingForEdit,
                      customerName: e.target.value,
                    })
                  }
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Email</label>
                  <input
                    type="email"
                    required
                    value={selectedBookingForEdit.email}
                    onChange={(e) =>
                      setSelectedBookingForEdit({
                        ...selectedBookingForEdit,
                        email: e.target.value,
                      })
                    }
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Phone</label>
                  <input
                    type="tel"
                    value={selectedBookingForEdit.phone || ""}
                    onChange={(e) =>
                      setSelectedBookingForEdit({
                        ...selectedBookingForEdit,
                        phone: e.target.value,
                      })
                    }
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Date</label>
                  <input
                    type="date"
                    value={selectedBookingForEdit.date}
                    onChange={(e) =>
                      setSelectedBookingForEdit({
                        ...selectedBookingForEdit,
                        date: e.target.value,
                      })
                    }
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Status</label>
                  <select
                    value={selectedBookingForEdit.status}
                    onChange={(e) =>
                      setSelectedBookingForEdit({
                        ...selectedBookingForEdit,
                        status: e.target.value,
                      })
                    }
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Total Price ($)</label>
                <input
                  type="number"
                  value={selectedBookingForEdit.totalPrice}
                  onChange={(e) =>
                    setSelectedBookingForEdit({
                      ...selectedBookingForEdit,
                      totalPrice: Number(e.target.value),
                    })
                  }
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-2xl shadow-md transition-all"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL: CONFIRM DELETE --- */}
      {bookingToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl border border-slate-100 dark:border-slate-800">
            <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto text-2xl">
              <MdDelete />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Delete Reservation?</h3>
              <p className="text-xs text-slate-500 mt-1">
                Are you sure you want to delete booking <strong>{bookingToDelete.ref}</strong>? This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => {
                  deleteBooking(bookingToDelete.id);
                  setBookingToDelete(null);
                }}
                className="flex-1 py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs rounded-xl transition-colors shadow-md"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setBookingToDelete(null)}
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

export default AdminBookings;
