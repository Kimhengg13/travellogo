import React, { createContext, useContext, useState, useEffect } from "react";

// Initial Cambodian Place Images
import AngkorImg from "../assets/cambodia/angkor-wat.jpg";
import KohRongImg from "../assets/cambodia/koh-rong.jpg";
import PhnomPenhImg from "../assets/cambodia/phnom-penh.jpg";
import KampotImg from "../assets/cambodia/kampot.jpg";
import KepImg from "../assets/cambodia/kep.jpg";
import MondulkiriImg from "../assets/cambodia/mondulkiri.jpg";
import KratieImg from "../assets/cambodia/kratie.jpg";
import BattambangImg from "../assets/cambodia/battambang.jpg";

export const initialPlaces = [
  {
    id: 1,
    img: AngkorImg,
    title: "Angkor Wat & Siem Reap Temples Expedition",
    location: "Siem Reap, Cambodia",
    description: "Experience sunrise over Angkor Wat, giant fig roots at Ta Prohm 'Tomb Raider' temple, and smiling stone faces at Bayon.",
    price: 350,
    type: "Cultural",
    duration: "4 Days / 3 Nights",
    groupSize: "Max 12 People",
    featured: true,
    rating: 4.9,
    reviewsCount: 142,
  },
  {
    id: 2,
    img: KohRongImg,
    title: "Koh Rong Island Luxury Beach & Plankton Diving",
    location: "Koh Rong, Cambodia",
    description: "Pristine white sand beaches, turquoise waters, luxury overwater villas, and night swims with glowing bioluminescent plankton.",
    price: 480,
    type: "Luxury",
    duration: "5 Days / 4 Nights",
    groupSize: "Max 8 People",
    featured: true,
    rating: 4.95,
    reviewsCount: 98,
  },
  {
    id: 3,
    img: PhnomPenhImg,
    title: "Phnom Penh Royal Palace & Mekong Sunset Cruise",
    location: "Phnom Penh, Cambodia",
    description: "Explore the golden Silver Pagoda, Royal Palace grounds, riverfront promenades, and traditional sunset cruises on the Mekong.",
    price: 290,
    type: "Cultural",
    duration: "3 Days / 2 Nights",
    groupSize: "Max 15 People",
    featured: true,
    rating: 4.85,
    reviewsCount: 110,
  },
  {
    id: 4,
    img: KampotImg,
    title: "Kampot Pepper Plantation & Bokor Plateau Trek",
    location: "Kampot, Cambodia",
    description: "Tour world-famous black pepper farms, cruise down the peaceful Kampot River, and explore misty Bokor National Park ruins.",
    price: 220,
    type: "Adventure",
    duration: "3 Days / 2 Nights",
    groupSize: "Max 10 People",
    featured: false,
    rating: 4.8,
    reviewsCount: 76,
  },
  {
    id: 5,
    img: KepImg,
    title: "Kep Seafood Haven & Rabbit Island Escape",
    location: "Kep, Cambodia",
    description: "Taste fresh crab cooked with green Kampot pepper at Kep Crab Market, followed by a wooden boat excursion to secluded Rabbit Island.",
    price: 190,
    type: "Relax",
    duration: "2 Days / 1 Night",
    groupSize: "Max 10 People",
    featured: false,
    rating: 4.75,
    reviewsCount: 64,
  },
  {
    id: 6,
    img: MondulkiriImg,
    title: "Mondulkiri Elephant Sanctuary & Bou Sra Waterfall",
    location: "Mondulkiri, Cambodia",
    description: "Ethical elephant washing and trekking in highland pine forests, ending with refreshing swims at majestic Bou Sra Waterfall.",
    price: 320,
    type: "Adventure",
    duration: "4 Days / 3 Nights",
    groupSize: "Max 8 People",
    featured: true,
    rating: 4.92,
    reviewsCount: 89,
  },
  {
    id: 7,
    img: KratieImg,
    title: "Kratie Mekong Irrawaddy Dolphin Discovery",
    location: "Kratie, Cambodia",
    description: "Take small wooden boats along the Mekong River to observe rare, endangered Irrawaddy dolphins in their natural sanctuary.",
    price: 210,
    type: "Relax",
    duration: "2 Days / 1 Night",
    groupSize: "Max 12 People",
    featured: false,
    rating: 4.8,
    reviewsCount: 52,
  },
  {
    id: 8,
    img: BattambangImg,
    title: "Battambang Bamboo Train & Bat Cave Heritage",
    location: "Battambang, Cambodia",
    description: "Ride the iconic traditional 'Norry' bamboo train, tour French colonial architecture, and witness millions of bats fly at Phnom Sampeau at dusk.",
    price: 180,
    type: "Cultural",
    duration: "2 Days / 1 Night",
    groupSize: "Max 14 People",
    featured: false,
    rating: 4.88,
    reviewsCount: 95,
  },
];

export const initialBlogs = [
  {
    id: 1,
    image: AngkorImg,
    title: "Complete Guide to Sunrise at Angkor Wat: Photography & Secret Spots",
    category: "Guides & Tips",
    description:
      "Witnessing the sun rise over the iconic 5 lotus towers of Angkor Wat is a once-in-a-lifetime experience. Here are the best viewing locations, temple pass tips, and crowd-avoidance strategies.",
    content: `Witnessing the sun rise over the iconic lotus towers of Angkor Wat is widely considered one of Southeast Asia's greatest travel experiences. As the morning light slowly transforms from deep indigo to vivid amber, pink, and gold, the ancient Khmer silhouette reflects off the northern lotus pond in breathtaking fashion.

### Best Viewing Spots
1. **The Northern Reflection Pond:** This is the classic photography spot. Arrive by 5:00 AM to secure a front-row spot along the pond edge.
2. **The Southern Library Area:** Offers a slightly elevated angle and significantly fewer crowds.
3. **Outer Moat Promenade:** If you prefer peaceful solitude, the western causeway reflection over the moat offers an ethereal morning view.

### Essential Tips for Your Visit
- **Temple Pass:** Purchase your Angkor Pass online beforehand or at the official ticket center the evening prior (tickets bought after 4:45 PM are valid for that sunset and the next full day).
- **Dress Code:** Wear modest clothing covering shoulders and knees out of respect for this active spiritual sanctuary.
- **Breakfast:** Pack a breakfast box from your Siem Reap hotel or enjoy fresh Khmer iced coffee at the small stalls outside the temple walls.`,
    author: "Sophea Chan",
    authorRole: "Senior Cultural Guide",
    date: "Aug 19, 2026",
    readTime: "5 min read",
  },
  {
    id: 2,
    image: KohRongImg,
    title: "Island Hopping in Cambodia: Koh Rong vs. Koh Rong Sanloem",
    category: "Beach & Nature",
    description:
      "Choosing between the vibrant beach life of Koh Rong and the tranquil, crystal-clear bays of Saracen Bay in Koh Rong Sanloem. Plus, how to swim with glowing bioluminescent plankton at night.",
    content: `Cambodia's southwestern coast in the Gulf of Thailand is home to tropical archipelagos that rival any beach destination in the world. The two premier islands—Koh Rong and Koh Rong Sanloem—each offer distinct vibes tailored to different travel styles.

### Koh Rong: The Island of Grand Adventure & Long Beaches
Spanning over 78 square kilometers, Koh Rong features the legendary 7-kilometer Long Beach (Sok San), world-class diving centers, ziplines, luxury overwater villa resorts, and vibrant night beachfront cafes.

### Koh Rong Sanloem: Tranquil Paradise & Gentle Waters
Sanloem is famous for Saracen Bay—a quiet, crescent-shaped bay of powdery white sand with calm, shallow turquoise waters that are ideal for paddleboarding, relaxation, and wellness retreats.

### The Magic of Bioluminescent Plankton
On both islands, taking a boat tour or swimming away from coastal lights on a moonless night will reveal millions of sparkling neon blue dinoflagellates lighting up with every stroke of your hands.`,
    author: "Dara Heng",
    authorRole: "Marine Adventure Specialist",
    date: "Aug 14, 2026",
    readTime: "4 min read",
  },
  {
    id: 3,
    image: KampotImg,
    title: "Savoring Kampot & Kep: World-Famous Green Pepper & Fresh Seafood",
    category: "Culinary & Culture",
    description:
      "Why Kampot pepper is revered by Michelin-starred chefs worldwide, and how a short coastal trip to Kep's legendary Crab Market completes Cambodia's ultimate culinary trail.",
    content: `Nestled between misty Bokor Mountain and the tranquil Gulf of Thailand, the southern provinces of Kampot and Kep represent Cambodia's premier gastronomic capital.

### The Secret of Kampot Pepper
Protected under geographical indication (GI) status, Kampot pepper owes its unique aroma, floral brightness, and subtle heat to the quartz-rich soil and sea breezes of Kampot. Visiting organic farms like La Plantation offers guided tastings of black, red, white, and fresh green peppercorns.

### Kep Crab Market
A 30-minute scenic tuk-tuk ride away lies the seaside town of Kep. Local fishermen pull wooden traps brimming with live blue swimmer crabs straight from the sea, which local cooks stir-fry over roaring woks with bundles of fresh green Kampot pepper, garlic, and palm sugar.

### Riverside Evenings in Kampot
Conclude your days with a sunset cruise on the Kampot River as dusk falls and thousands of synchronized fireflies illuminate the riverside mangrove trees.`,
    author: "Bopha Khem",
    authorRole: "Food & Travel Writer",
    date: "Jul 28, 2026",
    readTime: "6 min read",
  },
];

export const initialBookings = [
  {
    id: "BK-1001",
    ref: "TG-849201",
    customerName: "Eleanor Vance",
    email: "eleanor.vance@example.com",
    phone: "+1 (555) 234-8910",
    placeId: 1,
    placeTitle: "Angkor Wat & Siem Reap Temples Expedition",
    date: "2026-09-15",
    guests: 2,
    pricePerPerson: 350,
    totalPrice: 700,
    status: "Confirmed",
    notes: "Special dietary request: vegetarian. Requesting sunrise pickup from Raffles Grand Hotel.",
    createdAt: "2026-08-18T09:30:00Z",
  },
  {
    id: "BK-1002",
    ref: "TG-918234",
    customerName: "David Matsumoto",
    email: "david.matsumoto@example.com",
    phone: "+81 90-1234-5678",
    placeId: 2,
    placeTitle: "Koh Rong Island Luxury Beach & Plankton Diving",
    date: "2026-10-04",
    guests: 2,
    pricePerPerson: 480,
    totalPrice: 960,
    status: "Pending",
    notes: "Honeymoon trip. Overwater villa preferred with speedboat transfer from Sihanoukville.",
    createdAt: "2026-08-20T14:15:00Z",
  },
  {
    id: "BK-1003",
    ref: "TG-772183",
    customerName: "Camille Dupont",
    email: "camille.dupont@example.fr",
    phone: "+33 6 12 34 56 78",
    placeId: 4,
    placeTitle: "Kampot Pepper Plantation & Bokor Plateau Trek",
    date: "2026-09-22",
    guests: 4,
    pricePerPerson: 220,
    totalPrice: 880,
    status: "Confirmed",
    notes: "Family tour with 2 teenagers. Interested in French colonial history and cooking class.",
    createdAt: "2026-08-16T11:20:00Z",
  },
  {
    id: "BK-1004",
    ref: "TG-334912",
    customerName: "Liam O'Connor",
    email: "liam.oc@example.ie",
    phone: "+353 87 654 3210",
    placeId: 6,
    placeTitle: "Mondulkiri Elephant Sanctuary & Bou Sra Waterfall",
    date: "2026-09-08",
    guests: 1,
    pricePerPerson: 320,
    totalPrice: 320,
    status: "Completed",
    notes: "Solo wildlife photographer. Requested private eco-lodge cabin.",
    createdAt: "2026-08-05T08:45:00Z",
  },
  {
    id: "BK-1005",
    ref: "TG-621890",
    customerName: "Sophia Zhang",
    email: "sophia.zhang@example.com",
    phone: "+65 9123 4567",
    placeId: 3,
    placeTitle: "Phnom Penh Royal Palace & Mekong Sunset Cruise",
    date: "2026-08-30",
    guests: 3,
    pricePerPerson: 290,
    totalPrice: 870,
    status: "Pending",
    notes: "Requires English-speaking private guide for older parents.",
    createdAt: "2026-08-21T07:10:00Z",
  },
];

export const initialReviews = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Solo Traveler",
    location: "London, UK",
    text: "Wonder Cambodia arranged our entire 10-day Cambodia itinerary effortlessly! The sunrise over Angkor Wat and Koh Rong island getaway surpassed all our expectations.",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    status: "Approved",
    date: "Aug 15, 2026",
  },
  {
    id: 2,
    name: "Marcus Vance",
    role: "Adventure Enthusiast",
    location: "Sydney, Australia",
    text: "From Bokor Mountain trekking in Kampot to VIP Mekong River cruises in Phnom Penh, Wonder Cambodia's local guides provided 5-star service every step of the way.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    status: "Approved",
    date: "Aug 10, 2026",
  },
  {
    id: 3,
    name: "Elena Rostova",
    role: "Luxury Traveler",
    location: "Dubai, UAE",
    text: "The 24/7 local guide support and instant booking confirmation gave us total peace of mind. Truly the highest standard in Cambodian luxury travel!",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    status: "Approved",
    date: "Jul 29, 2026",
  },
];

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  // Places State
  const [places, setPlaces] = useState(() => {
    try {
      const saved = localStorage.getItem("wc_places_data");
      return saved ? JSON.parse(saved) : initialPlaces;
    } catch {
      return initialPlaces;
    }
  });

  // Bookings State
  const [bookings, setBookings] = useState(() => {
    try {
      const saved = localStorage.getItem("wc_bookings_data");
      return saved ? JSON.parse(saved) : initialBookings;
    } catch {
      return initialBookings;
    }
  });

  // Blogs State
  const [blogs, setBlogs] = useState(() => {
    try {
      const saved = localStorage.getItem("wc_blogs_data");
      return saved ? JSON.parse(saved) : initialBlogs;
    } catch {
      return initialBlogs;
    }
  });

  // Reviews State
  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem("wc_reviews_data");
      return saved ? JSON.parse(saved) : initialReviews;
    } catch {
      return initialReviews;
    }
  });

  // Admin Auth State
  const [adminAuth, setAdminAuth] = useState(() => {
    try {
      const saved = localStorage.getItem("wc_admin_auth");
      return saved
        ? JSON.parse(saved)
        : {
            isAuthenticated: false,
            user: null,
          };
    } catch {
      return { isAuthenticated: false, user: null };
    }
  });

  // Platform Settings State
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem("wc_settings_data");
      return saved
        ? JSON.parse(saved)
        : {
            agencyName: "Wonder Cambodia",
            contactEmail: "reservations@wondercambodia.com",
            phone: "+855 (0) 23 888 999",
            currency: "USD ($)",
            currencySymbol: "$",
            autoConfirm: false,
            notificationEmail: true,
            taxRate: 10,
          };
    } catch {
      return {
        agencyName: "Wonder Cambodia",
        contactEmail: "reservations@wondercambodia.com",
        phone: "+855 (0) 23 888 999",
        currency: "USD ($)",
        currencySymbol: "$",
        autoConfirm: false,
        notificationEmail: true,
        taxRate: 10,
      };
    }
  });

  // Persist Changes
  useEffect(() => {
    try {
      localStorage.setItem("wc_places_data", JSON.stringify(places));
    } catch (e) {
      console.error("Error saving places to localStorage", e);
    }
  }, [places]);

  useEffect(() => {
    try {
      localStorage.setItem("wc_bookings_data", JSON.stringify(bookings));
    } catch (e) {
      console.error("Error saving bookings to localStorage", e);
    }
  }, [bookings]);

  useEffect(() => {
    try {
      localStorage.setItem("wc_blogs_data", JSON.stringify(blogs));
    } catch (e) {
      console.error("Error saving blogs to localStorage", e);
    }
  }, [blogs]);

  useEffect(() => {
    try {
      localStorage.setItem("wc_reviews_data", JSON.stringify(reviews));
    } catch (e) {
      console.error("Error saving reviews to localStorage", e);
    }
  }, [reviews]);

  useEffect(() => {
    try {
      localStorage.setItem("wc_admin_auth", JSON.stringify(adminAuth));
    } catch (e) {
      console.error("Error saving adminAuth to localStorage", e);
    }
  }, [adminAuth]);

  useEffect(() => {
    try {
      localStorage.setItem("wc_settings_data", JSON.stringify(settings));
    } catch (e) {
      console.error("Error saving settings to localStorage", e);
    }
  }, [settings]);

  // --- Booking Operations ---
  const addBooking = (bookingData) => {
    const newRef = "TG-" + Math.floor(100000 + Math.random() * 900000);
    const guestNum = Number(bookingData.guests || 1);
    const place = places.find((p) => p.id === Number(bookingData.placeId)) || null;
    const pricePerPerson = Number(bookingData.pricePerPerson || place?.price || 250);
    const totalPrice = guestNum * pricePerPerson;

    const newBooking = {
      id: "BK-" + Date.now(),
      ref: newRef,
      customerName: bookingData.name || bookingData.customerName,
      email: bookingData.email,
      phone: bookingData.phone || "",
      placeId: bookingData.placeId || (place ? place.id : null),
      placeTitle: bookingData.placeTitle || (place ? place.title : "Custom Tour Package"),
      date: bookingData.date || new Date().toISOString().split("T")[0],
      guests: guestNum,
      pricePerPerson,
      totalPrice,
      status: settings.autoConfirm ? "Confirmed" : "Pending",
      notes: bookingData.notes || "",
      createdAt: new Date().toISOString(),
    };

    setBookings((prev) => [newBooking, ...prev]);
    return newBooking;
  };

  const updateBookingStatus = (id, newStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
  };

  const editBooking = (id, updatedFields) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updatedFields } : b))
    );
  };

  const deleteBooking = (id) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  // --- Place / Tour Operations ---
  const addPlace = (placeData) => {
    const newPlace = {
      id: Date.now(),
      img: placeData.img || AngkorImg,
      title: placeData.title,
      location: placeData.location,
      description: placeData.description,
      price: Number(placeData.price),
      type: placeData.type || "Cultural",
      duration: placeData.duration || "3 Days / 2 Nights",
      groupSize: placeData.groupSize || "Max 10 People",
      featured: Boolean(placeData.featured),
      rating: 5.0,
      reviewsCount: 1,
    };
    setPlaces((prev) => [newPlace, ...prev]);
    return newPlace;
  };

  const editPlace = (id, updatedFields) => {
    setPlaces((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              ...updatedFields,
              price: updatedFields.price !== undefined ? Number(updatedFields.price) : p.price,
            }
          : p
      )
    );
  };

  const deletePlace = (id) => {
    setPlaces((prev) => prev.filter((p) => p.id !== id));
  };

  // --- Blog Operations ---
  const addBlog = (blogData) => {
    const newBlog = {
      id: Date.now(),
      image: blogData.image || AngkorImg,
      title: blogData.title,
      category: blogData.category || "Travel Guides",
      description: blogData.description,
      content: blogData.content || blogData.description,
      author: blogData.author || "Wonder Cambodia Team",
      authorRole: blogData.authorRole || "Travel Specialist",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      readTime: blogData.readTime || "4 min read",
    };
    setBlogs((prev) => [newBlog, ...prev]);
    return newBlog;
  };

  const editBlog = (id, updatedFields) => {
    setBlogs((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updatedFields } : b))
    );
  };

  const deleteBlog = (id) => {
    setBlogs((prev) => prev.filter((b) => b.id !== id));
  };

  const getBlogByIdOrSlug = (param) => {
    if (!param) return null;
    const decoded = decodeURIComponent(param).trim().toLowerCase();
    return (
      blogs.find((b) => String(b.id) === decoded) ||
      blogs.find((b) => b.title.toLowerCase() === decoded) ||
      blogs.find((b) => b.title.toLowerCase().includes(decoded)) ||
      null
    );
  };

  // --- Review Operations ---
  const addReview = (reviewData) => {
    const newReview = {
      id: Date.now(),
      name: reviewData.name,
      role: reviewData.role || "Verified Explorer",
      location: reviewData.location || "Cambodia Traveler",
      text: reviewData.text,
      rating: Number(reviewData.rating || 5),
      img:
        reviewData.img ||
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
      status: "Approved",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    };
    setReviews((prev) => [newReview, ...prev]);
    return newReview;
  };

  const updateReviewStatus = (id, newStatus) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  const deleteReview = (id) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  // --- Admin Authentication ---
  const loginAdmin = (email, password) => {
    // Demo admin credentials or bypass
    if (
      (email === "admin@wondercambodia.com" && password === "admin123") ||
      (email.trim().length > 0 && password.trim().length > 0)
    ) {
      const authState = {
        isAuthenticated: true,
        user: {
          name: "Serey Rath",
          role: "Super Administrator",
          email: email || "admin@wondercambodia.com",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
          lastLogin: new Date().toISOString(),
        },
      };
      setAdminAuth(authState);
      return { success: true };
    }
    return { success: false, message: "Invalid email or password. Use demo credentials." };
  };

  const logoutAdmin = () => {
    setAdminAuth({ isAuthenticated: false, user: null });
  };

  // --- Reset to Initial Seed Data ---
  const resetToDefaultData = () => {
    setPlaces(initialPlaces);
    setBookings(initialBookings);
    setBlogs(initialBlogs);
    setReviews(initialReviews);
    localStorage.removeItem("wc_places_data");
    localStorage.removeItem("wc_bookings_data");
    localStorage.removeItem("wc_blogs_data");
    localStorage.removeItem("wc_reviews_data");
  };

  const value = {
    places,
    addPlace,
    editPlace,
    deletePlace,

    bookings,
    addBooking,
    updateBookingStatus,
    editBooking,
    deleteBooking,

    blogs,
    addBlog,
    editBlog,
    deleteBlog,
    getBlogByIdOrSlug,

    reviews,
    addReview,
    updateReviewStatus,
    deleteReview,

    adminAuth,
    loginAdmin,
    logoutAdmin,

    settings,
    updateSettings: (newSettings) => setSettings((prev) => ({ ...prev, ...newSettings })),
    resetToDefaultData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};

export default DataContext;
