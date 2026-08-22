import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { IoCloseOutline } from "react-icons/io5";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaPlaneDeparture,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

const AuthModal = () => {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authMode,
    setAuthMode,
    login,
    register,
    loginWithGoogle,
    resetPassword,
  } = useAuth();

  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleTabChange = (mode) => {
    setAuthMode(mode);
    setError("");
    setResetSent(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (authMode === "signin") {
        await login(formData.email, formData.password);
      } else if (authMode === "register") {
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match. Please check again.");
          setLoading(false);
          return;
        }
        if (formData.password.length < 6) {
          setError("Password must be at least 6 characters long.");
          setLoading(false);
          return;
        }
        await register(formData.email, formData.password, formData.displayName);
      } else if (authMode === "forgot") {
        if (!formData.email) {
          setError("Please enter your registered email address.");
          setLoading(false);
          return;
        }
        await resetPassword(formData.email);
        setResetSent(true);
      }
    } catch (err) {
      console.error("Auth error:", err);
      let msg = "An error occurred during authentication.";
      if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
        msg = "Invalid email or password credentials.";
      } else if (err.code === "auth/email-already-in-use") {
        msg = "This email address is already registered. Please sign in instead.";
      } else if (err.code === "auth/weak-password") {
        msg = "Password is too weak. Please use at least 6 characters.";
      } else if (err.message) {
        msg = err.message;
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setError("");
    setLoading(true);
    try {
      await loginWithGoogle();
    } catch (err) {
      console.error("Google Auth Error:", err);
      setError("Failed to sign in with Google. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-gray-200 dark:border-gray-800 relative transition-all duration-300">
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <IoCloseOutline size={22} />
        </button>

        {/* Modal Brand Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
            <FaPlaneDeparture /> Wonder Cambodia Portal
          </div>
          <h2 className="text-2xl font-heading font-black">
            {authMode === "signin"
              ? "Welcome Back Explorer"
              : authMode === "register"
              ? "Create Your Travel Account"
              : "Reset Password"}
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {authMode === "signin"
              ? "Sign in to manage your bookings and unlock exclusive Cambodian tours."
              : authMode === "register"
              ? "Register now to save itineraries, book tours, and track travel history."
              : "Enter your email address and we'll send you a password reset link."}
          </p>
        </div>

        {/* Auth Mode Tabs (Sign In / Register) */}
        {authMode !== "forgot" && (
          <div className="grid grid-cols-2 p-1 bg-gray-100 dark:bg-gray-800/80 rounded-2xl mb-6 text-xs font-extrabold">
            <button
              type="button"
              onClick={() => handleTabChange("signin")}
              className={`py-2.5 rounded-xl transition-all ${
                authMode === "signin"
                  ? "bg-white dark:bg-gray-900 text-primary shadow-sm"
                  : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => handleTabChange("register")}
              className={`py-2.5 rounded-xl transition-all ${
                authMode === "register"
                  ? "bg-white dark:bg-gray-900 text-primary shadow-sm"
                  : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              Create Account
            </button>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center gap-2">
            <FaExclamationTriangle className="shrink-0 text-sm" />
            <span>{error}</span>
          </div>
        )}

        {/* Forgot Password Confirmation Screen */}
        {authMode === "forgot" && resetSent ? (
          <div className="text-center py-4 space-y-4">
            <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
              <FaCheckCircle size={32} />
            </div>
            <h3 className="text-lg font-bold">Reset Email Sent!</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Check your inbox for <strong>{formData.email}</strong> and follow instructions to reset your password.
            </p>
            <button
              onClick={() => handleTabChange("signin")}
              className="w-full py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-2xl text-xs font-extrabold hover:scale-105 transition-all"
            >
              Back to Sign In
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name field (Register only) */}
            {authMode === "register" && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                  <FaUser className="text-primary text-[10px]" /> Full Name
                </label>
                <input
                  type="text"
                  name="displayName"
                  required
                  placeholder="Sophea Chan"
                  value={formData.displayName}
                  onChange={handleChange}
                  className="w-full bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary font-medium"
                />
              </div>
            )}

            {/* Email Address field */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                <FaEnvelope className="text-primary text-[10px]" /> Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="explorer@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary font-medium"
              />
            </div>

            {/* Password field */}
            {authMode !== "forgot" && (
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                    <FaLock className="text-primary text-[10px]" /> Password
                  </label>
                  {authMode === "signin" && (
                    <button
                      type="button"
                      onClick={() => handleTabChange("forgot")}
                      className="text-[11px] font-bold text-primary hover:underline"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl p-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  >
                    {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                  </button>
                </div>
              </div>
            )}

            {/* Confirm Password field (Register only) */}
            {authMode === "register" && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                  <FaLock className="text-primary text-[10px]" /> Confirm Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  required
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary font-medium"
                />
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-glow text-white font-extrabold py-3.5 rounded-2xl text-sm transition-all duration-300 hover:scale-[1.02] active:scale-98 tracking-wide shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : authMode === "signin" ? (
                "Sign In to Account"
              ) : authMode === "register" ? (
                "Create Travel Account"
              ) : (
                "Send Password Reset Email"
              )}
            </button>
          </form>
        )}

        {/* Social Google Login Divider */}
        {authMode !== "forgot" && (
          <div className="mt-6 space-y-4">
            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-gray-200 dark:border-gray-800"></div>
              <span className="flex-shrink mx-4 text-[11px] font-bold uppercase text-gray-400">
                Or Continue With
              </span>
              <div className="flex-grow border-t border-gray-200 dark:border-gray-800"></div>
            </div>

            <button
              type="button"
              onClick={handleGoogleAuth}
              disabled={loading}
              className="w-full bg-gray-50 dark:bg-gray-800/80 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-100 font-bold py-3 rounded-2xl text-xs border border-gray-200 dark:border-gray-700 transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <FaGoogle className="text-rose-500 text-sm" /> Sign in with Google
            </button>
          </div>
        )}

        {/* Bottom Switch Link */}
        {authMode === "forgot" && !resetSent && (
          <p className="mt-6 text-center text-xs text-gray-500">
            Remembered your password?{" "}
            <button
              onClick={() => handleTabChange("signin")}
              className="font-bold text-primary hover:underline"
            >
              Back to Sign In
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
