import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../libs/firebase";

// Initial seed data imports in case database collections are empty
import { initialPlaces, initialBlogs, initialBookings, initialReviews } from "../context/DataContext";

const googleProvider = new GoogleAuthProvider();

// ==========================================
// 1. AUTHENTICATION & USER PROFILE API
// ==========================================
export const authApi = {
  // Register new user with Email, Password & Display Name
  registerUser: async (email, password, displayName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (displayName) {
        await updateProfile(user, { displayName });
      }

      // Create user profile document in Firestore
      const userRef = doc(db, "users", user.uid);
      const profileData = {
        uid: user.uid,
        email: user.email,
        displayName: displayName || user.displayName || email.split("@")[0],
        photoURL: user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName || email.split("@")[0])}&background=0D9488&color=fff`,
        role: "user",
        createdAt: new Date().toISOString(),
      };

      await setDoc(userRef, profileData);
      return { user, profile: profileData };
    } catch (error) {
      console.error("Error in registerUser:", error);
      throw error;
    }
  },

  // Login user with Email & Password
  loginUser: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const profile = await authApi.getUserProfile(user.uid);
      return { user, profile };
    } catch (error) {
      console.error("Error in loginUser:", error);
      throw error;
    }
  },

  // Google Sign-In
  googleSignIn: async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Check if user profile already exists
      let profile = await authApi.getUserProfile(user.uid);
      if (!profile) {
        const userRef = doc(db, "users", user.uid);
        profile = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || user.email.split("@")[0],
          photoURL: user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || "User")}&background=0D9488&color=fff`,
          role: "user",
          createdAt: new Date().toISOString(),
        };
        await setDoc(userRef, profile);
      }

      return { user, profile };
    } catch (error) {
      console.error("Error in googleSignIn:", error);
      throw error;
    }
  },

  // Fetch User Profile Document from Firestore
  getUserProfile: async (uid) => {
    try {
      const userRef = doc(db, "users", uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        return docSnap.data();
      }
      return null;
    } catch (error) {
      console.error("Error in getUserProfile:", error);
      return null;
    }
  },

  // Send Password Reset Email
  resetPassword: async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return true;
    } catch (error) {
      console.error("Error in resetPassword:", error);
      throw error;
    }
  },

  // Logout Current User
  logoutUser: async () => {
    try {
      await signOut(auth);
      return true;
    } catch (error) {
      console.error("Error in logoutUser:", error);
      throw error;
    }
  },
};

// ==========================================
// 2. PLACES / TOURS DATABASE API
// ==========================================
export const placesApi = {
  getPlaces: async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "places"));
      if (querySnapshot.empty) {
        // Seed initial places if collection is empty
        await placesApi.seedPlaces();
        return initialPlaces;
      }
      const placesList = [];
      querySnapshot.forEach((doc) => {
        placesList.push({ id: doc.id, ...doc.data() });
      });
      return placesList;
    } catch (error) {
      console.warn("Firestore places get error, using fallback:", error);
      return initialPlaces;
    }
  },

  seedPlaces: async () => {
    try {
      for (const place of initialPlaces) {
        const docRef = doc(db, "places", String(place.id));
        await setDoc(docRef, place);
      }
    } catch (e) {
      console.error("Error seeding places:", e);
    }
  },

  addPlace: async (placeData) => {
    try {
      const id = String(Date.now());
      const newPlace = {
        ...placeData,
        id,
        rating: placeData.rating || 5.0,
        reviewsCount: placeData.reviewsCount || 1,
        createdAt: new Date().toISOString(),
      };
      await setDoc(doc(db, "places", id), newPlace);
      return newPlace;
    } catch (error) {
      console.error("Error adding place:", error);
      throw error;
    }
  },

  updatePlace: async (id, updatedFields) => {
    try {
      const docRef = doc(db, "places", String(id));
      await updateDoc(docRef, updatedFields);
      return true;
    } catch (error) {
      console.error("Error updating place:", error);
      throw error;
    }
  },

  deletePlace: async (id) => {
    try {
      await deleteDoc(doc(db, "places", String(id)));
      return true;
    } catch (error) {
      console.error("Error deleting place:", error);
      throw error;
    }
  },
};

// ==========================================
// 3. BOOKINGS DATABASE API
// ==========================================
export const bookingsApi = {
  getBookings: async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "bookings"));
      if (querySnapshot.empty) {
        await bookingsApi.seedBookings();
        return initialBookings;
      }
      const bookingsList = [];
      querySnapshot.forEach((doc) => {
        bookingsList.push({ id: doc.id, ...doc.data() });
      });
      return bookingsList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } catch (error) {
      console.warn("Firestore bookings fetch error, using fallback:", error);
      return initialBookings;
    }
  },

  getUserBookings: async (userId, userEmail) => {
    try {
      const bookingsRef = collection(db, "bookings");
      let list = [];

      if (userId) {
        const q = query(bookingsRef, where("userId", "==", userId));
        const snap = await getDocs(q);
        snap.forEach((doc) => list.push({ id: doc.id, ...doc.data() }));
      }

      if (list.length === 0 && userEmail) {
        const qEmail = query(bookingsRef, where("email", "==", userEmail));
        const snapEmail = await getDocs(qEmail);
        snapEmail.forEach((doc) => {
          if (!list.some((b) => b.id === doc.id)) {
            list.push({ id: doc.id, ...doc.data() });
          }
        });
      }

      return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } catch (error) {
      console.error("Error fetching user bookings:", error);
      return [];
    }
  },

  seedBookings: async () => {
    try {
      for (const booking of initialBookings) {
        const docRef = doc(db, "bookings", String(booking.id));
        await setDoc(docRef, booking);
      }
    } catch (e) {
      console.error("Error seeding bookings:", e);
    }
  },

  createBooking: async (bookingData, userId = null) => {
    try {
      const newRef = "TG-" + Math.floor(100000 + Math.random() * 900000);
      const bookingId = "BK-" + Date.now();
      const newBooking = {
        id: bookingId,
        ref: newRef,
        customerName: bookingData.name || bookingData.customerName,
        email: bookingData.email,
        phone: bookingData.phone || "",
        placeId: bookingData.placeId || null,
        placeTitle: bookingData.placeTitle || "Custom Tour Package",
        date: bookingData.date || new Date().toISOString().split("T")[0],
        guests: Number(bookingData.guests || 1),
        pricePerPerson: Number(bookingData.pricePerPerson || 250),
        totalPrice: Number(bookingData.totalPrice || Number(bookingData.guests || 1) * Number(bookingData.pricePerPerson || 250)),
        status: bookingData.status || "Pending",
        notes: bookingData.notes || "",
        userId: userId || bookingData.userId || null,
        createdAt: new Date().toISOString(),
      };

      await setDoc(doc(db, "bookings", bookingId), newBooking);
      return newBooking;
    } catch (error) {
      console.error("Error creating booking in Firestore:", error);
      throw error;
    }
  },

  updateBookingStatus: async (id, status) => {
    try {
      const docRef = doc(db, "bookings", String(id));
      await updateDoc(docRef, { status });
      return true;
    } catch (error) {
      console.error("Error updating booking status:", error);
      throw error;
    }
  },

  editBooking: async (id, updatedFields) => {
    try {
      const docRef = doc(db, "bookings", String(id));
      await updateDoc(docRef, updatedFields);
      return true;
    } catch (error) {
      console.error("Error editing booking:", error);
      throw error;
    }
  },

  deleteBooking: async (id) => {
    try {
      await deleteDoc(doc(db, "bookings", String(id)));
      return true;
    } catch (error) {
      console.error("Error deleting booking:", error);
      throw error;
    }
  },
};

// ==========================================
// 4. BLOGS DATABASE API
// ==========================================
export const blogsApi = {
  getBlogs: async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "blogs"));
      if (querySnapshot.empty) {
        await blogsApi.seedBlogs();
        return initialBlogs;
      }
      const blogsList = [];
      querySnapshot.forEach((doc) => {
        blogsList.push({ id: doc.id, ...doc.data() });
      });
      return blogsList;
    } catch (error) {
      console.warn("Firestore blogs fetch error, using fallback:", error);
      return initialBlogs;
    }
  },

  seedBlogs: async () => {
    try {
      for (const blog of initialBlogs) {
        const docRef = doc(db, "blogs", String(blog.id));
        await setDoc(docRef, blog);
      }
    } catch (e) {
      console.error("Error seeding blogs:", e);
    }
  },

  addBlog: async (blogData) => {
    try {
      const id = String(Date.now());
      const newBlog = {
        ...blogData,
        id,
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        createdAt: new Date().toISOString(),
      };
      await setDoc(doc(db, "blogs", id), newBlog);
      return newBlog;
    } catch (error) {
      console.error("Error adding blog:", error);
      throw error;
    }
  },

  updateBlog: async (id, updatedFields) => {
    try {
      const docRef = doc(db, "blogs", String(id));
      await updateDoc(docRef, updatedFields);
      return true;
    } catch (error) {
      console.error("Error updating blog:", error);
      throw error;
    }
  },

  deleteBlog: async (id) => {
    try {
      await deleteDoc(doc(db, "blogs", String(id)));
      return true;
    } catch (error) {
      console.error("Error deleting blog:", error);
      throw error;
    }
  },
};

// ==========================================
// 5. REVIEWS DATABASE API
// ==========================================
export const reviewsApi = {
  getReviews: async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "reviews"));
      if (querySnapshot.empty) {
        await reviewsApi.seedReviews();
        return initialReviews;
      }
      const reviewsList = [];
      querySnapshot.forEach((doc) => {
        reviewsList.push({ id: doc.id, ...doc.data() });
      });
      return reviewsList;
    } catch (error) {
      console.warn("Firestore reviews fetch error, using fallback:", error);
      return initialReviews;
    }
  },

  seedReviews: async () => {
    try {
      for (const review of initialReviews) {
        const docRef = doc(db, "reviews", String(review.id));
        await setDoc(docRef, review);
      }
    } catch (e) {
      console.error("Error seeding reviews:", e);
    }
  },

  addReview: async (reviewData) => {
    try {
      const id = String(Date.now());
      const newReview = {
        ...reviewData,
        id,
        status: "Approved",
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        createdAt: new Date().toISOString(),
      };
      await setDoc(doc(db, "reviews", id), newReview);
      return newReview;
    } catch (error) {
      console.error("Error adding review:", error);
      throw error;
    }
  },

  updateReviewStatus: async (id, status) => {
    try {
      const docRef = doc(db, "reviews", String(id));
      await updateDoc(docRef, { status });
      return true;
    } catch (error) {
      console.error("Error updating review status:", error);
      throw error;
    }
  },

  deleteReview: async (id) => {
    try {
      await deleteDoc(doc(db, "reviews", String(id)));
      return true;
    } catch (error) {
      console.error("Error deleting review:", error);
      throw error;
    }
  },
};
