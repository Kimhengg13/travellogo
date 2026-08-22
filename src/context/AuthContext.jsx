import React, { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../libs/firebase";
import { authApi } from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Modal Control State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("signin"); // "signin" | "register" | "forgot"

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        try {
          let profile = await authApi.getUserProfile(user.uid);
          if (!profile) {
            // Fallback profile if not present in Firestore
            profile = {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName || user.email.split("@")[0],
              photoURL: user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || "User")}&background=0D9488&color=fff`,
              role: "user",
            };
          }
          setUserProfile(profile);
        } catch (e) {
          console.error("Error fetching user profile:", e);
        }
      } else {
        setCurrentUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const register = async (email, password, displayName) => {
    const res = await authApi.registerUser(email, password, displayName);
    setCurrentUser(res.user);
    setUserProfile(res.profile);
    setIsAuthModalOpen(false);
    return res;
  };

  const login = async (email, password) => {
    const res = await authApi.loginUser(email, password);
    setCurrentUser(res.user);
    setUserProfile(res.profile);
    setIsAuthModalOpen(false);
    return res;
  };

  const loginWithGoogle = async () => {
    const res = await authApi.googleSignIn();
    setCurrentUser(res.user);
    setUserProfile(res.profile);
    setIsAuthModalOpen(false);
    return res;
  };

  const logout = async () => {
    await authApi.logoutUser();
    setCurrentUser(null);
    setUserProfile(null);
  };

  const resetPassword = async (email) => {
    return await authApi.resetPassword(email);
  };

  const openAuthModal = (mode = "signin") => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const value = {
    currentUser,
    userProfile,
    loading,
    isAuthModalOpen,
    setIsAuthModalOpen,
    authMode,
    setAuthMode,
    openAuthModal,
    closeAuthModal,
    register,
    login,
    loginWithGoogle,
    logout,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
