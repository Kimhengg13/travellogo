import React, { useState } from "react";
import { useData } from "../../context/DataContext";
import PlaceCard from "./PlaceCard";
import PlaceDetailModal from "./PlaceDetailModal";
import { FaFire } from "react-icons/fa";

const Categories = ["All", "Cultural", "Adventure", "Relax", "Luxury"];

const Places = ({ handleOrderPopup, filterCriteria }) => {
  const { places } = useData();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPlaceForModal, setSelectedPlaceForModal] = useState(null);

  // Filter logic
  const filteredPlaces = places.filter((place) => {
    // Category match
    const categoryMatch = selectedCategory === "All" || place.type.includes(selectedCategory);

    // Hero search filter match
    let searchMatch = true;
    if (filterCriteria) {
      const { destination, maxPrice } = filterCriteria;
      if (destination && destination.trim() !== "") {
        const query = destination.toLowerCase();
        searchMatch =
          place.title.toLowerCase().includes(query) ||
          place.location.toLowerCase().includes(query);
      }
      if (maxPrice && place.price > maxPrice) {
        searchMatch = false;
      }
    }

    return categoryMatch && searchMatch;
  });

  return (
    <div id="places" className="dark:bg-gray-950 dark:text-white bg-gray-50/50 py-16 transition-colors duration-300">
      <section data-aos="fade-up" className="container space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-200 dark:border-gray-800 pb-6">
          <div className="space-y-2">
            <span className="text-primary font-bold text-xs uppercase tracking-widest flex items-center gap-1.5">
              <FaFire className="text-amber-500" /> Featured Destinations
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-gray-900 dark:text-white">
              Handpicked Tour Packages
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {Categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md scale-105"
                    : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Places Grid */}
        {filteredPlaces.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filteredPlaces.map((item) => (
              <PlaceCard
                key={item.id}
                handleOrderPopup={handleOrderPopup}
                onSelectPlace={(place) => setSelectedPlaceForModal(place)}
                {...item}
              />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center space-y-3 bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm border border-gray-200 dark:border-gray-800">
            <p className="text-lg font-bold text-gray-700 dark:text-gray-300">No matching destinations found</p>
            <p className="text-xs text-gray-500">Try adjusting your price range or search terms.</p>
            <button
              onClick={() => {
                setSelectedCategory("All");
              }}
              className="mt-2 text-xs text-primary font-bold underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* Quick View Detail Modal */}
      {selectedPlaceForModal && (
        <PlaceDetailModal
          place={selectedPlaceForModal}
          onClose={() => setSelectedPlaceForModal(null)}
          onBookNow={(place) => {
            setSelectedPlaceForModal(null);
            if (handleOrderPopup) handleOrderPopup(place);
          }}
        />
      )}
    </div>
  );
};

export default Places;
