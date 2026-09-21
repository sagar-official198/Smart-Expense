import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  Wallet,
  TrendingUp,
  PieChart,
  PlusCircle,
  Menu,
  X,
  Bell,
  ArrowRight,
  ReceiptText,
} from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Mobile menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Login status
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("Token")
  );

  // Logged-in user
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");

    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Check login status whenever login/logout happens
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("Token");
      const storedUser = localStorage.getItem("user");

      setIsLoggedIn(!!token);

      setUser(
        storedUser ? JSON.parse(storedUser) : null
      );
    };

    window.addEventListener(
      "loginStatusChanged",
      checkLoginStatus
    );

    return () => {
      window.removeEventListener(
        "loginStatusChanged",
        checkLoginStatus
      );
    };
  }, []);

  // Navigation links
  const navLinks = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: TrendingUp,
    },
    {
      name: "Expenses",
      path: "/expenses",
      icon: ReceiptText,
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: PieChart,
    },
  ];

  // Check active route
  const isActive = (path) => location.pathname === path;

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("user");

    setIsLoggedIn(false);
    setUser(null);

    window.dispatchEvent(
      new Event("loginStatusChanged")
    );

    setMobileMenuOpen(false);

    navigate("/login");
  };

  return (
    <nav className="sticky top-0 left-0 w-full bg-white/85 backdrop-blur-md border-b border-slate-200/80 z-50 shadow-xs">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between h-16 sm:h-20">

          {/* =========================
              LEFT SIDE - LOGO
          ========================== */}

          <div className="flex items-center gap-3">

            <Link
              to="/"
              className="group flex items-center gap-2.5 transition-transform duration-200 hover:scale-[1.02]"
            >

              {/* Logo */}
              <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <Wallet className="w-5 h-5 transition-transform duration-300 group-hover:rotate-6" />
              </div>

              {/* Brand */}
              <div className="flex flex-col">

                <span className="text-xl font-extrabold tracking-tight text-slate-900 leading-tight">
                  Smart
                  <span className="text-blue-600">
                    Expense
                  </span>
                </span>

                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Financial Tracker
                </span>

              </div>

            </Link>

            {/* Version Badge */}
            <span className="hidden xl:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200/60 ml-2">
              v2.0 Beta
            </span>

          </div>

          {/* =========================
              DESKTOP NAVIGATION
          ========================== */}

          {isLoggedIn && (
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">

              {navLinks.map((link) => {

                const Icon = link.icon;
                const active = isActive(link.path);

                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${active
                        ? "bg-blue-50 text-blue-600 font-semibold shadow-xs"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                      }`}
                  >

                    <Icon
                      className={`w-4 h-4 ${active
                          ? "text-blue-600"
                          : "text-slate-400"
                        }`}
                    />

                    <span>{link.name}</span>

                  </Link>
                );
              })}

            </div>
          )}

          {/* =========================
              DESKTOP RIGHT SIDE
          ========================== */}

          <div className="hidden sm:flex items-center gap-3">

            {/* Balance */}
            {isLoggedIn && (
              <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100/90 border border-slate-200/60 text-xs">

                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>

                <span className="text-slate-500 font-medium">
                  Balance:
                </span>

                <span className="font-bold text-slate-800">
                  $4,850.00
                </span>

              </div>
            )}

            {/* Notification */}
            {isLoggedIn && (
              <button
                aria-label="Notifications"
                className="relative p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              >

                <Bell className="w-5 h-5" />

                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></span>

              </button>
            )}

            {/* Add Expense */}
            {isLoggedIn && (
              <button
                onClick={() => navigate("/add-expense")}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200/60 transition-all active:scale-95"
              >

                <PlusCircle className="w-3.5 h-3.5" />

                <span>Add Expense</span>

              </button>
            )}

            {/* =========================
                USER INFORMATION
            ========================== */}

            {isLoggedIn && user && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200">

                {/* User Avatar */}
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">

                  <span className="text-sm font-semibold text-blue-600">
                    {user.username
                      ?.charAt(0)
                      .toUpperCase()}
                  </span>

                </div>

                {/* Username */}
                <span className="text-sm font-semibold text-slate-800">
                  {user.username}
                </span>

              </div>
            )}

            {/* =========================
                LOGGED OUT BUTTONS
            ========================== */}

            {!isLoggedIn && (
              <>
                {/* Sign In */}
                <button
                  onClick={() => navigate("/login")}
                  className="text-sm font-medium text-slate-700 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  Sign In
                </button>

                {/* Get Started */}
                <button
                  onClick={() => navigate("/signup")}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg text-white bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-sm transition-all"
                >

                  <span>Get Started</span>

                  <ArrowRight className="w-4 h-4" />

                </button>
              </>
            )}

            {/* Logout */}
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-red-600 hover:text-red-700 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors"
              >
                Logout
              </button>
            )}

          </div>

          {/* =========================
              MOBILE BUTTONS
          ========================== */}

          <div className="flex items-center gap-2 sm:hidden">

            {!isLoggedIn && (
              <button
                onClick={() => navigate("/login")}
                className="text-xs font-semibold px-2.5 py-1.5 rounded-md text-blue-600 bg-blue-50"
              >
                Sign In
              </button>
            )}

            <button
              onClick={() =>
                setMobileMenuOpen(!mobileMenuOpen)
              }
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle mobile menu"
            >

              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}

            </button>

          </div>

        </div>
      </div>

      {/* =========================
          MOBILE MENU
      ========================== */}

      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-3 shadow-lg">

          {/* Mobile Balance */}
          {isLoggedIn && (
            <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-50 border border-slate-100">

              <span className="text-xs text-slate-500">
                Current Balance
              </span>

              <span className="text-sm font-bold text-slate-800">
                $4,850.00
              </span>

            </div>
          )}

          {/* Mobile User */}
          {isLoggedIn && user && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 border border-blue-100">

              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">

                <span className="text-sm font-semibold text-blue-600">
                  {user.username
                    ?.charAt(0)
                    .toUpperCase()}
                </span>

              </div>

              <span className="text-sm font-semibold text-slate-800">
                {user.username}
              </span>

            </div>
          )}

          {/* Mobile Navigation */}
          {isLoggedIn && (
            <div className="space-y-1">

              {navLinks.map((link) => {

                const Icon = link.icon;
                const active = isActive(link.path);

                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() =>
                      setMobileMenuOpen(false)
                    }
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${active
                        ? "bg-blue-50 text-blue-600 font-semibold"
                        : "text-slate-600 hover:bg-slate-100"
                      }`}
                  >

                    <Icon className="w-4 h-4" />

                    <span>{link.name}</span>

                  </Link>
                );
              })}

            </div>
          )}

          {/* Mobile Actions */}
          {isLoggedIn && (
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">

              {/* Add Expense */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate("/add-expense");
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-50 text-blue-700 font-semibold text-sm border border-blue-200/70"
              >

                <PlusCircle className="w-4 h-4" />

                <span>Add Expense</span>

              </button>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2.5 rounded-lg bg-red-50 text-red-600 font-semibold text-sm"
              >
                Logout
              </button>

            </div>
          )}

          {/* Mobile Logged Out */}
          {!isLoggedIn && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate("/signup");
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-white bg-linear-to-r from-blue-600 to-indigo-600 font-semibold text-sm"
            >

              <span>Get Started</span>

              <ArrowRight className="w-4 h-4" />

            </button>
          )}

        </div>
      )}

    </nav>
  );
}

export default Navbar;