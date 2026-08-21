import React, { useState } from "react";
import { useData } from "../../context/DataContext";
import {
  MdPlace,
  MdAdd,
  MdEdit,
  MdDelete,
  MdSearch,
  MdStar,
  MdClose,
  MdImage,
  MdAttachMoney,
  MdLocationOn,
  MdGridView,
  MdViewList,
} from "react-icons/md";

// Available Local Cambodian default images
import AngkorImg from "../../assets/cambodia/angkor-wat.jpg";
import KohRongImg from "../../assets/cambodia/koh-rong.jpg";
import PhnomPenhImg from "../../assets/cambodia/phnom-penh.jpg";
import KampotImg from "../../assets/cambodia/kampot.jpg";
import KepImg from "../../assets/cambodia/kep.jpg";
import MondulkiriImg from "../../assets/cambodia/mondulkiri.jpg";
import KratieImg from "../../assets/cambodia/kratie.jpg";
import BattambangImg from "../../assets/cambodia/battambang.jpg";

const presetImages = [
  { name: "Angkor Wat, Siem Reap", src: AngkorImg },
  { name: "Koh Rong Island", src: KohRongImg },
  { name: "Phnom Penh Palace", src: PhnomPenhImg },
  { name: "Kampot Pepper Farm", src: KampotImg },
  { name: "Kep Seafood Coast", src: KepImg },
  { name: "Mondulkiri Waterfalls", src: MondulkiriImg },
  { name: "Kratie Mekong Dolphins", src: KratieImg },
  { name: "Battambang Heritage", src: BattambangImg },
];

const AdminPlaces = () => {
  const { places, addPlace, editPlace, deletePlace } = useData();

  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'table'
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPlace, setEditingPlace] = useState(null);
  const [placeToDelete, setPlaceToDelete] = useState(null);

  const categories = ["All", "Cultural", "Adventure", "Relax", "Luxury"];

  const initialFormState = {
    title: "",
    location: "",
    price: 250,
    type: "Cultural",
    duration: "3 Days / 2 Nights",
    groupSize: "Max 10 People",
    description: "",
    featured: false,
    img: AngkorImg,
    customImgUrl: "",
  };

  const [placeForm, setPlaceForm] = useState(initialFormState);

  // Filter Places
  const filteredPlaces = places.filter((p) => {
    const matchesCategory = selectedCategory === "All" || p.type === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      p.title.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q);

    return matchesCategory && matchesSearch;
  });

  const handleOpenAdd = () => {
    setPlaceForm(initialFormState);
    setShowAddModal(true);
  };

  const handleOpenEdit = (place) => {
    setEditingPlace(place);
    setPlaceForm({
      title: place.title,
      location: place.location,
      price: place.price,
      type: place.type,
      duration: place.duration || "3 Days / 2 Nights",
      groupSize: place.groupSize || "Max 10 People",
      description: place.description || "",
      featured: Boolean(place.featured),
      img: place.img,
      customImgUrl: typeof place.img === "string" && place.img.startsWith("http") ? place.img : "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!placeForm.title || !placeForm.location) return;

    const finalImage = placeForm.customImgUrl ? placeForm.customImgUrl : placeForm.img;

    if (editingPlace) {
      editPlace(editingPlace.id, {
        ...placeForm,
        img: finalImage,
      });
      setEditingPlace(null);
    } else {
      addPlace({
        ...placeForm,
        img: finalImage,
      });
      setShowAddModal(false);
    }

    setPlaceForm(initialFormState);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 dark:text-white">
            Tour Packages & Destinations
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Create and edit Cambodian travel itineraries, adjust pricing, and manage listings.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-secondary hover:shadow-glow text-white text-xs font-bold rounded-2xl transition-all shadow-md active:scale-95 self-start sm:self-auto"
        >
          <MdAdd size={18} /> Add New Tour
        </button>
      </div>

      {/* Control Bar: Categories, Search, View Mode */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-3xl shadow-card border border-slate-100 dark:border-slate-800 space-y-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 w-full lg:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? "bg-primary text-white shadow-md shadow-primary/30"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar & View Mode Toggle */}
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-64">
              <MdSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search tours, locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary text-slate-900 dark:text-white"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-xl transition-all ${
                  viewMode === "grid"
                    ? "bg-white dark:bg-slate-900 text-primary shadow-sm"
                    : "text-slate-400 hover:text-slate-600"
                }`}
                title="Grid View"
              >
                <MdGridView size={18} />
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`p-1.5 rounded-xl transition-all ${
                  viewMode === "table"
                    ? "bg-white dark:bg-slate-900 text-primary shadow-sm"
                    : "text-slate-400 hover:text-slate-600"
                }`}
                title="Table View"
              >
                <MdViewList size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- GRID VIEW --- */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlaces.map((place) => (
            <div
              key={place.id}
              className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-card border border-slate-100 dark:border-slate-800 flex flex-col justify-between group hover:shadow-lg transition-all"
            >
              {/* Media Header */}
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={place.img}
                  alt={place.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 px-3 py-1 bg-primary/90 backdrop-blur-md text-white text-[10px] font-bold uppercase rounded-full tracking-wider shadow-sm">
                  {place.type}
                </span>
                <span className="absolute bottom-3 left-3 text-white font-bold text-xs flex items-center gap-1">
                  <MdLocationOn className="text-secondary" /> {place.location}
                </span>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-heading font-extrabold text-base text-slate-900 dark:text-white line-clamp-1 group-hover:text-primary transition-colors">
                    {place.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {place.description}
                  </p>
                </div>

                {/* Footer Controls */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Package Price</span>
                    <span className="font-heading font-black text-xl text-slate-900 dark:text-white">
                      ${place.price}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEdit(place)}
                      className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-amber-500 hover:bg-amber-500/10 transition-colors"
                      title="Edit Tour"
                    >
                      <MdEdit size={16} />
                    </button>
                    <button
                      onClick={() => setPlaceToDelete(place)}
                      className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                      title="Delete Tour"
                    >
                      <MdDelete size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* --- TABLE VIEW --- */
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-card border border-slate-100 dark:border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 text-slate-400 uppercase font-bold text-[10px] tracking-wider">
                  <th className="py-3.5 px-4">Tour Name</th>
                  <th className="py-3.5 px-4">Location</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Price</th>
                  <th className="py-3.5 px-4">Duration</th>
                  <th className="py-3.5 px-4">Rating</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                {filteredPlaces.map((place) => (
                  <tr key={place.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={place.img}
                          alt={place.title}
                          className="w-10 h-10 rounded-xl object-cover"
                        />
                        <span className="font-bold text-slate-900 dark:text-white max-w-xs truncate">
                          {place.title}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">{place.location}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary">
                        {place.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-black font-heading text-sm text-slate-900 dark:text-white">
                      ${place.price}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">{place.duration}</td>
                    <td className="py-3.5 px-4 font-bold text-amber-500 flex items-center gap-1">
                      <MdStar size={14} /> {place.rating || 4.9}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(place)}
                          className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-amber-500 transition-colors"
                        >
                          <MdEdit size={16} />
                        </button>
                        <button
                          onClick={() => setPlaceToDelete(place)}
                          className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-rose-500 transition-colors"
                        >
                          <MdDelete size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* --- MODAL: ADD / EDIT TOUR PACKAGE --- */}
      {(showAddModal || editingPlace) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 dark:border-slate-800 space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setShowAddModal(false);
                setEditingPlace(null);
              }}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white"
            >
              <MdClose size={20} />
            </button>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                {editingPlace ? "Modify Tour Package" : "New Tour Package"}
              </span>
              <h2 className="text-2xl font-heading font-extrabold text-slate-900 dark:text-white">
                {editingPlace ? "Edit Tour Details" : "Create Tour Package"}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Package Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kulen Waterfall & River of a Thousand Lingas"
                  value={placeForm.title}
                  onChange={(e) => setPlaceForm({ ...placeForm, title: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Location in Cambodia *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Siem Reap, Cambodia"
                    value={placeForm.location}
                    onChange={(e) => setPlaceForm({ ...placeForm, location: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Category *</label>
                  <select
                    value={placeForm.type}
                    onChange={(e) => setPlaceForm({ ...placeForm, type: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
                  >
                    <option value="Cultural">Cultural</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Relax">Relax</option>
                    <option value="Luxury">Luxury</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Price Per Person ($) *</label>
                  <input
                    type="number"
                    min="10"
                    required
                    value={placeForm.price}
                    onChange={(e) => setPlaceForm({ ...placeForm, price: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Duration</label>
                  <input
                    type="text"
                    placeholder="e.g. 4 Days / 3 Nights"
                    value={placeForm.duration}
                    onChange={(e) => setPlaceForm({ ...placeForm, duration: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Group Limit</label>
                  <input
                    type="text"
                    placeholder="e.g. Max 12 People"
                    value={placeForm.groupSize}
                    onChange={(e) => setPlaceForm({ ...placeForm, groupSize: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
                  />
                </div>
              </div>

              {/* Image Picker */}
              <div className="space-y-2">
                <label className="font-bold text-slate-700 dark:text-slate-300 block">
                  Select Preset Image or Custom URL
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {presetImages.map((preset, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setPlaceForm({ ...placeForm, img: preset.src, customImgUrl: "" })}
                      className={`relative rounded-xl overflow-hidden h-14 border-2 transition-all ${
                        placeForm.img === preset.src && !placeForm.customImgUrl
                          ? "border-primary ring-2 ring-primary/40 scale-105"
                          : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img src={preset.src} alt={preset.name} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
                <input
                  type="url"
                  placeholder="Or paste external image URL (https://...)"
                  value={placeForm.customImgUrl}
                  onChange={(e) => setPlaceForm({ ...placeForm, customImgUrl: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Tour Description *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Highlight key sights, temple visits, inclusions, and experiences..."
                  value={placeForm.description}
                  onChange={(e) => setPlaceForm({ ...placeForm, description: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-2xl hover:shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md"
              >
                {editingPlace ? "Update Tour Package" : "Publish Tour Package"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL: CONFIRM DELETE --- */}
      {placeToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl border border-slate-100 dark:border-slate-800">
            <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto text-2xl">
              <MdDelete />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Delete Tour Package?</h3>
              <p className="text-xs text-slate-500 mt-1">
                Are you sure you want to delete <strong>"{placeToDelete.title}"</strong>? It will immediately disappear from the public website.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => {
                  deletePlace(placeToDelete.id);
                  setPlaceToDelete(null);
                }}
                className="flex-1 py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs rounded-xl transition-colors shadow-md"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setPlaceToDelete(null)}
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

export default AdminPlaces;
