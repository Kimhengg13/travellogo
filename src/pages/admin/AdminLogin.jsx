import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useData } from "../../context/DataContext";
import Logo from "../../assets/logo.png";
import AngkorImg from "../../assets/cambodia/angkor-wat.jpg";
import {
  MdLock,
  MdEmail,
  MdArrowBack,
  MdVisibility,
  MdVisibilityOff,
  MdSecurity,
  MdFlashOn,
  MdErrorOutline,
} from "react-icons/md";

const AdminLogin = () => {
  const { loginAdmin, adminAuth } = useData();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("admin@wondercambodia.com");
  const [password, setPassword] = useState("admin123");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const from = location.state?.from?.pathname || "/admin";

  // If already authenticated, redirect
  React.useEffect(() => {
    if (adminAuth.isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [adminAuth.isAuthenticated, navigate, from]);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const result = loginAdmin(email, password);
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.message || "Invalid credentials");
    }
  };

  const handleQuickDemoLogin = () => {
    setEmail("admin@wondercambodia.com");
    setPassword("admin123");
    const result = loginAdmin("admin@wondercambodia.com", "admin123");
    if (result.success) {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Background Image with Dark Glassmorphic Blur */}
      <div className="absolute inset-0 z-0">
        <img
          src={AngkorImg}
          alt="Angkor Background"
          className="w-full h-full object-cover brightness-40 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/60" />
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bg-white/10 dark:bg-slate-900/80 backdrop-blur-2xl p-8 sm:p-10 rounded-[2.5rem] border border-white/20 dark:border-slate-800 shadow-2xl space-y-8 animate-scaleUp">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white transition-colors"
        >
          <MdArrowBack /> Return to Public Site
        </Link>

        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="inline-block p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-inner">
            <img src={Logo} alt="Wonder Cambodia" className="h-12 w-auto mx-auto" />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-heading font-black tracking-tight text-white">
              Admin Portal
            </h1>
            <p className="text-xs text-slate-300 font-medium">
              Sign in to manage Wonder Cambodia tour operations
            </p>
          </div>
        </div>

        {/* 1-Click Quick Demo Login Pill */}
        <div className="p-3.5 rounded-2xl bg-primary/20 border border-primary/40 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-cyan-300 flex items-center gap-1.5">
              <MdFlashOn className="text-amber-400" /> Evaluation Mode
            </span>
            <span className="text-[10px] text-slate-300 font-mono">admin123</span>
          </div>
          <button
            type="button"
            onClick={handleQuickDemoLogin}
            className="w-full py-2 bg-gradient-to-r from-primary to-secondary hover:shadow-glow text-white text-xs font-bold rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
          >
            ⚡ 1-Click Quick Demo Sign In
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3.5 bg-rose-500/20 border border-rose-500/40 text-rose-300 rounded-xl text-xs font-bold flex items-center gap-2">
            <MdErrorOutline size={16} /> {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          {/* Email */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-200 flex items-center gap-1.5">
              <MdEmail className="text-primary" /> Admin Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@wondercambodia.com"
              className="w-full p-3.5 rounded-2xl bg-black/40 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary font-medium"
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-200 flex items-center gap-1.5">
              <MdLock className="text-primary" /> Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-3.5 pr-10 rounded-2xl bg-black/40 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showPassword ? <MdVisibilityOff size={18} /> : <MdVisibility size={18} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-primary to-secondary hover:shadow-glow text-white font-extrabold text-sm rounded-2xl transition-all shadow-lg hover:scale-[1.02] active:scale-[0.98] mt-2 tracking-wide"
          >
            Enter Admin Dashboard
          </button>
        </form>

        <div className="text-center pt-2">
          <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1">
            <MdSecurity className="text-emerald-400" /> Secure 256-bit encrypted administrator session
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
