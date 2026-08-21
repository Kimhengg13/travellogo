import React, { useState } from "react";
import { useData } from "../../context/DataContext";
import {
  MdRateReview,
  MdStar,
  MdCheckCircle,
  MdCancel,
  MdDelete,
  MdAdd,
  MdSearch,
  MdClose,
  MdPerson,
  MdLocationOn,
} from "react-icons/md";

const AdminReviews = () => {
  const { reviews, addReview, updateReviewStatus, deleteReview } = useData();

  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);

  const [newReviewForm, setNewReviewForm] = useState({
    name: "",
    role: "Solo Traveler",
    location: "Siem Reap, Cambodia",
    rating: 5,
    text: "",
  });

  const filteredReviews = reviews.filter((r) => {
    const q = searchQuery.toLowerCase();
    return (
      !searchQuery ||
      r.name.toLowerCase().includes(q) ||
      r.location.toLowerCase().includes(q) ||
      r.text.toLowerCase().includes(q)
    );
  });

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReviewForm.name || !newReviewForm.text) return;

    addReview(newReviewForm);
    setShowAddModal(false);
    setNewReviewForm({
      name: "",
      role: "Solo Traveler",
      location: "Siem Reap, Cambodia",
      rating: 5,
      text: "",
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 dark:text-white">
            Customer Reviews & Feedback
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Moderate verified explorer testimonials, ratings, and feedback shown on the homepage.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-secondary hover:shadow-glow text-white text-xs font-bold rounded-2xl transition-all shadow-md active:scale-95 self-start sm:self-auto"
        >
          <MdAdd size={18} /> Add Testimonial
        </button>
      </div>

      {/* Control Bar */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-3xl shadow-card border border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
          <span className="px-3 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-full flex items-center gap-1">
            <MdStar /> {reviews.length} Verified Reviews
          </span>
        </div>

        <div className="relative w-full sm:w-72">
          <MdSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search reviews by name, content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary text-slate-900 dark:text-white font-medium"
          />
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReviews.map((review) => (
          <div
            key={review.id}
            className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-card border border-slate-100 dark:border-slate-800 flex flex-col justify-between space-y-4"
          >
            {/* Top Row: Stars & Status */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(Number(review.rating || 5))].map((_, i) => (
                  <MdStar key={i} size={16} />
                ))}
              </div>

              <span
                className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                  review.status === "Approved"
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                }`}
              >
                {review.status || "Approved"}
              </span>
            </div>

            {/* Review Quote Text */}
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium italic leading-relaxed">
              "{review.text}"
            </p>

            {/* Author Profile Footer */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={
                    review.img ||
                    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"
                  }
                  alt={review.name}
                  className="w-10 h-10 rounded-full object-cover border border-primary"
                />
                <div>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1">
                    {review.name}
                  </h4>
                  <p className="text-[10px] text-slate-400">
                    {review.role} • {review.location}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setReviewToDelete(review)}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-rose-500 transition-colors"
                  title="Delete Review"
                >
                  <MdDelete size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- MODAL: ADD TESTIMONIAL --- */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100 dark:border-slate-800 space-y-6 relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white"
            >
              <MdClose size={20} />
            </button>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Customer Testimonial
              </span>
              <h2 className="text-2xl font-heading font-extrabold text-slate-900 dark:text-white">
                Add New Review
              </h2>
            </div>

            <form onSubmit={handleAddReview} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Customer Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rachel Adams"
                  value={newReviewForm.name}
                  onChange={(e) => setNewReviewForm({ ...newReviewForm, name: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Traveler Type</label>
                  <input
                    type="text"
                    placeholder="e.g. Solo Traveler"
                    value={newReviewForm.role}
                    onChange={(e) => setNewReviewForm({ ...newReviewForm, role: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Location Origin</label>
                  <input
                    type="text"
                    placeholder="e.g. Melbourne, AU"
                    value={newReviewForm.location}
                    onChange={(e) => setNewReviewForm({ ...newReviewForm, location: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Rating (1 to 5 Stars)</label>
                <select
                  value={newReviewForm.rating}
                  onChange={(e) => setNewReviewForm({ ...newReviewForm, rating: Number(e.target.value) })}
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
                >
                  <option value="5">⭐⭐⭐⭐⭐ 5 Stars (Exceptional)</option>
                  <option value="4">⭐⭐⭐⭐ 4 Stars (Very Good)</option>
                  <option value="3">⭐⭐⭐ 3 Stars (Average)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Testimonial Content *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="What did they say about their Angkor Wat, Koh Rong, or Kampot tour?"
                  value={newReviewForm.text}
                  onChange={(e) => setNewReviewForm({ ...newReviewForm, text: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-2xl hover:shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md"
              >
                Save & Publish Review
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL: CONFIRM DELETE --- */}
      {reviewToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl border border-slate-100 dark:border-slate-800">
            <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto text-2xl">
              <MdDelete />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Delete Review?</h3>
              <p className="text-xs text-slate-500 mt-1">
                Are you sure you want to delete review from <strong>"{reviewToDelete.name}"</strong>?
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => {
                  deleteReview(reviewToDelete.id);
                  setReviewToDelete(null);
                }}
                className="flex-1 py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs rounded-xl transition-colors shadow-md"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setReviewToDelete(null)}
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

export default AdminReviews;
