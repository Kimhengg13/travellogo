import React, { useState } from "react";
import Slider from "react-slick";
import { useData } from "../../context/DataContext";
import { FaStar, FaQuoteLeft, FaCheckCircle, FaPen, FaTimes } from "react-icons/fa";

const Testimonial = () => {
  const { reviews, addReview } = useData();
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    location: "",
    rating: 5,
    text: "",
  });
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const settings = {
    dots: true,
    arrows: false,
    infinite: reviews.length > 1,
    speed: 600,
    slidesToShow: Math.min(2, reviews.length),
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.text) return;

    addReview({
      name: formData.name,
      role: formData.role || "Verified Traveler",
      location: formData.location || "Phnom Penh, Cambodia",
      text: formData.text,
      rating: Number(formData.rating),
    });

    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setShowReviewModal(false);
      setFormData({ name: "", role: "", location: "", rating: 5, text: "" });
    }, 1500);
  };

  return (
    <div id="testimonials" data-aos="fade-up" className="py-16 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="container">
        {/* Header section with Write a Review CTA */}
        <div className="text-center mb-12 max-w-xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3.5 py-1 rounded-full inline-block">
            Real Traveler Reviews
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-gray-900 dark:text-white">
            Loved By Over 15,000+ Explorers
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            Read verified feedback from global travelers who booked their bucket-list vacations with us.
          </p>

          {/* Write a Review Trigger Button */}
          <div className="pt-2">
            <button
              onClick={() => setShowReviewModal(true)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold px-5 py-2.5 rounded-full hover:shadow-glow hover:scale-105 active:scale-95 transition-all duration-300 shadow-sm"
            >
              <FaPen className="text-xs" /> Write a Review
            </button>
          </div>
        </div>

        {/* Testimonial Carousel */}
        <div data-aos="zoom-in" className="max-w-4xl mx-auto px-4">
          <Slider {...settings}>
            {reviews.map(({ id, name, role, location, text, img, rating }) => (
              <div key={id} className="p-3">
                <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-card border border-gray-100 dark:border-gray-800 relative flex flex-col justify-between space-y-4 h-full">
                  <FaQuoteLeft className="text-primary/20 text-4xl absolute top-6 right-6" />

                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(Number(rating || 5))].map((_, i) => (
                      <FaStar key={i} size={14} />
                    ))}
                  </div>

                  {/* Review Quote */}
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-medium italic">
                    "{text}"
                  </p>

                  {/* Traveler Profile */}
                  <div className="flex items-center gap-3 pt-2 border-t border-gray-100 dark:border-gray-800">
                    <img
                      src={
                        img ||
                        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"
                      }
                      alt={name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-primary"
                    />
                    <div>
                      <h4 className="font-heading font-bold text-sm text-gray-900 dark:text-white flex items-center gap-1">
                        {name} <FaCheckCircle className="text-primary text-xs" />
                      </h4>
                      <p className="text-[11px] text-gray-400">
                        {role} • {location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* Interactive Write a Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100 dark:border-gray-800 space-y-6">
            {/* Close Button */}
            <button
              onClick={() => setShowReviewModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <FaTimes />
            </button>

            {/* Modal Title */}
            <div className="space-y-1 text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Your Experience Matters</span>
              <h3 className="text-2xl font-heading font-extrabold text-gray-900 dark:text-white">
                Write a Review
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Share your Cambodian travel story with future explorers!
              </p>
            </div>

            {submitted ? (
              <div className="p-6 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-2xl text-center space-y-2 border border-emerald-500/20">
                <FaCheckCircle className="text-3xl mx-auto text-emerald-500" />
                <h4 className="font-bold text-base">Review Submitted!</h4>
                <p className="text-xs text-emerald-600/80 dark:text-emerald-400/80">
                  Thank you! Your feedback has been added to our live reviews.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                {/* Star Rating Selection */}
                <div className="flex flex-col items-center space-y-1.5 py-1">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Overall Rating</label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setFormData({ ...formData, rating: star })}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 text-2xl transition-transform hover:scale-125 focus:outline-none"
                      >
                        <FaStar
                          className={(hoverRating || formData.rating) >= star ? "text-amber-400" : "text-gray-300 dark:text-gray-700"}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Johnson"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white rounded-2xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-primary border border-gray-200 dark:border-gray-700"
                  />
                </div>

                {/* Role / Location */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Traveler Type</label>
                    <input
                      type="text"
                      placeholder="e.g. Solo Explorer"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white rounded-2xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-primary border border-gray-200 dark:border-gray-700"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Location</label>
                    <input
                      type="text"
                      placeholder="e.g. Phnom Penh, KH"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white rounded-2xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-primary border border-gray-200 dark:border-gray-700"
                    />
                  </div>
                </div>

                {/* Review Message */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Your Review *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your trip to Siem Reap, Koh Rong, Kampot..."
                    value={formData.text}
                    onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                    className="w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white rounded-2xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-primary border border-gray-200 dark:border-gray-700 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary via-cyan-500 to-secondary text-white font-bold text-xs py-3.5 rounded-2xl hover:shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-md flex items-center justify-center gap-2"
                >
                  <FaPen /> Submit Review
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Testimonial;
