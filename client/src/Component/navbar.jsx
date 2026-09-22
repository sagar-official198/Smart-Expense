import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

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

const API_URL =
  import.meta.env.VITE_API_URL || "https://smart-expense-m50r.onrender.com";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // =====================================================
  // MOBILE
  // =====================================================

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // =====================================================
  // LOGIN
  // =====================================================

  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("Token"))
  );

  // =====================================================
  // USER
  // =====================================================

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) return null;

    try {
      return JSON.parse(storedUser);
    } catch {
      return null;
    }
  });

  // =====================================================
  // SALARY
  // =====================================================

  const [salary, setSalary] = useState(0);
  const [salaryInput, setSalaryInput] = useState("");
  const [showSalaryForm, setShowSalaryForm] = useState(false);

  const [salaryLoading, setSalaryLoading] =
    useState(false);

  const [salarySaving, setSalarySaving] =
    useState(false);

  const [salaryError, setSalaryError] =
    useState("");

  // =====================================================
  // REFRESH LOGIN STATE
  // =====================================================

  const refreshLoginState = () => {
    const token = localStorage.getItem("Token");
    const storedUser = localStorage.getItem("user");

    const loggedIn = Boolean(token);

    setIsLoggedIn(loggedIn);

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    } else {
      setUser(null);
    }

    if (!loggedIn) {
      setSalary(0);
      setShowSalaryForm(false);
    }
  };

  // =====================================================
  // LOGIN STATUS LISTENER
  // =====================================================

  useEffect(() => {
    // Check immediately
    refreshLoginState();

    // Custom event used by login/logout
    window.addEventListener(
      "loginStatusChanged",
      refreshLoginState
    );

    // Storage event
    window.addEventListener(
      "storage",
      refreshLoginState
    );

    return () => {
      window.removeEventListener(
        "loginStatusChanged",
        refreshLoginState
      );

      window.removeEventListener(
        "storage",
        refreshLoginState
      );
    };
  }, []);

  // =====================================================
  // GET SALARY FROM MONGODB
  // =====================================================

  const fetchSalary = async () => {
    const token = localStorage.getItem("Token");

    if (!token) {
      setSalary(0);
      return;
    }

    try {
      setSalaryLoading(true);
      setSalaryError("");

      const response = await axios.get(
        `${API_URL}/api/user/salary`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const savedSalary = Number(
        response.data.salary
      );

      setSalary(
        Number.isFinite(savedSalary)
          ? savedSalary
          : 0
      );
    } catch (error) {
      console.error(
        "Failed to fetch salary:",
        error
      );

      /*
       * IMPORTANT:
       * Salary failure must NOT log the user out.
       */

      setSalaryError(
        error.response?.data?.message ||
        "Unable to load salary"
      );
    } finally {
      setSalaryLoading(false);
    }
  };

  // =====================================================
  // LOAD SALARY AFTER LOGIN
  // =====================================================

  useEffect(() => {
    if (isLoggedIn) {
      fetchSalary();
    } else {
      setSalary(0);
    }
  }, [isLoggedIn]);

  // =====================================================
  // OPEN SALARY MODAL
  // =====================================================

  const openSalaryForm = () => {
    setSalaryInput(String(salary ?? ""));
    setSalaryError("");
    setShowSalaryForm(true);
  };

  // =====================================================
  // CLOSE SALARY MODAL
  // =====================================================

  const closeSalaryForm = () => {
    if (salarySaving) return;

    setShowSalaryForm(false);
    setSalaryError("");
  };

  // =====================================================
  // UPDATE SALARY
  // =====================================================

  const handleSalarySubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("Token");

    if (!token) {
      setSalaryError("Please login again.");
      return;
    }

    const salaryNumber = Number(salaryInput);

    if (
      salaryInput === "" ||
      !Number.isFinite(salaryNumber) ||
      salaryNumber < 0
    ) {
      setSalaryError(
        "Please enter a valid salary amount."
      );

      return;
    }

    try {
      setSalarySaving(true);
      setSalaryError("");

      const response = await axios.put(
        `${API_URL}/api/user/salary`,
        {
          salary: salaryNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedSalary = Number(
        response.data.salary
      );

      const finalSalary = Number.isFinite(
        updatedSalary
      )
        ? updatedSalary
        : salaryNumber;

      // Update Navbar immediately
      setSalary(finalSalary);

      // Close modal
      setShowSalaryForm(false);

      // Notify other components
      window.dispatchEvent(
        new CustomEvent("salaryUpdated", {
          detail: {
            salary: finalSalary,
          },
        })
      );
    } catch (error) {
      console.error(
        "Failed to update salary:",
        error
      );

      setSalaryError(
        error.response?.data?.message ||
        "Failed to update salary. Please try again."
      );
    } finally {
      setSalarySaving(false);
    }
  };

  // =====================================================
  // NAVIGATION
  // =====================================================

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

  const isActive = (path) =>
    location.pathname === path;

  // =====================================================
  // FORMAT SALARY
  // =====================================================

  const formattedSalary =
    Number(salary || 0).toLocaleString(
      "en-US",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    );

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("user");

    setIsLoggedIn(false);
    setUser(null);
    setSalary(0);

    setMobileMenuOpen(false);
    setShowSalaryForm(false);

    window.dispatchEvent(
      new Event("loginStatusChanged")
    );

    navigate("/login");
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <>
      <nav className="sticky top-0 left-0 w-full bg-white/85 backdrop-blur-md border-b border-slate-200/80 z-50 shadow-xs">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex items-center justify-between h-16 sm:h-20">

            {/* =================================================
                LOGO
            ================================================= */}

            <div className="flex items-center gap-3">

              <Link
                to="/"
                className="group flex items-center gap-2.5 transition-transform duration-200 hover:scale-[1.02]"
              >

                <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">

                  <Wallet className="w-5 h-5 transition-transform duration-300 group-hover:rotate-6" />

                </div>

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

              <span className="hidden xl:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200/60 ml-2">
                v2.0 Beta
              </span>

            </div>

            {/* =================================================
                DESKTOP NAVIGATION
            ================================================= */}

            {isLoggedIn && (
              <div className="hidden md:flex items-center space-x-1 lg:space-x-2">

                {navLinks.map((link) => {
                  const Icon = link.icon;

                  const active =
                    isActive(link.path);

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

                      <span>
                        {link.name}
                      </span>

                    </Link>
                  );
                })}

              </div>
            )}

            {/* =================================================
                RIGHT SIDE
            ================================================= */}

            <div className="hidden sm:flex items-center gap-3">

              {/* =================================================
                  SALARY
              ================================================= */}

              {isLoggedIn && (
                <button
                  type="button"
                  onClick={openSalaryForm}
                  disabled={salaryLoading}
                  title="Click to update salary"
                  className="hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-50 border border-slate-200 hover:bg-blue-50 hover:border-blue-200 transition-all duration-200 cursor-pointer active:scale-95 disabled:opacity-70"
                >

                  <span className="w-2 h-2 rounded-full bg-emerald-500" />

                  <span className="text-xs font-medium text-slate-500">
                    Salary:
                  </span>

                  <span className="text-sm font-bold text-slate-800">
                    {salaryLoading
                      ? "Loading..."
                      : `₹${formattedSalary}`}
                  </span>

                </button>
              )}

              {/* =================================================
                  NOTIFICATION
              ================================================= */}

              {isLoggedIn && (
                <button
                  type="button"
                  aria-label="Notifications"
                  className="relative p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                >

                  <Bell className="w-5 h-5" />

                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />

                </button>
              )}

              {/* =================================================
                  ADD EXPENSE
              ================================================= */}

              {isLoggedIn && (
                <button
                  type="button"
                  onClick={() =>
                    navigate("/add-expense")
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200/60 transition-all active:scale-95"
                >

                  <PlusCircle className="w-3.5 h-3.5" />

                  Add Expense

                </button>
              )}

              {/* =================================================
                  USER
              ================================================= */}

              {isLoggedIn && user && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200">

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

              {/* =================================================
                  LOGGED OUT
              ================================================= */}

              {!isLoggedIn && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      navigate("/login")
                    }
                    className="text-sm font-medium text-slate-700 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    Sign In
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      navigate("/signup")
                    }
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg text-white bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-sm transition-all"
                  >

                    Get Started

                    <ArrowRight className="w-4 h-4" />

                  </button>
                </>
              )}

              {/* =================================================
                  LOGOUT
              ================================================= */}

              {isLoggedIn && (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-sm font-medium text-red-600 hover:text-red-700 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors"
                >
                  Logout
                </button>
              )}

            </div>

            {/* =================================================
                MOBILE BUTTON
            ================================================= */}

            <div className="flex items-center gap-2 sm:hidden">

              <button
                type="button"
                onClick={() =>
                  setMobileMenuOpen(
                    !mobileMenuOpen
                  )
                }
                className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
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

        {/* =================================================
            MOBILE MENU
        ================================================= */}

        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-3 shadow-lg">

            {/* SALARY */}

            {isLoggedIn && (
              <button
                type="button"
                onClick={openSalaryForm}
                className="w-full flex items-center justify-between px-3 py-3 rounded-lg bg-slate-50 border border-slate-200 hover:bg-blue-50 hover:border-blue-200 transition-all"
              >

                <div className="flex items-center gap-2">

                  <span className="w-2 h-2 rounded-full bg-emerald-500" />

                  <span className="text-xs font-medium text-slate-500">
                    Salary
                  </span>

                </div>

                <span className="text-sm font-bold text-slate-800">
                  {salaryLoading
                    ? "Loading..."
                    : `$${formattedSalary}`}
                </span>

              </button>
            )}

            {/* USER */}

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

            {/* NAVIGATION */}

            {isLoggedIn && (
              <div className="space-y-1">

                {navLinks.map((link) => {

                  const Icon = link.icon;

                  const active =
                    isActive(link.path);

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

                      {link.name}

                    </Link>
                  );
                })}

              </div>
            )}

            {/* ACTIONS */}

            {isLoggedIn && (
              <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate("/add-expense");
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-50 text-blue-700 font-semibold text-sm border border-blue-200/70"
                >

                  <PlusCircle className="w-4 h-4" />

                  Add Expense

                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full px-4 py-2.5 rounded-lg bg-red-50 text-red-600 font-semibold text-sm"
                >
                  Logout
                </button>

              </div>
            )}

            {/* LOGGED OUT */}

            {!isLoggedIn && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate("/signup");
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-white bg-linear-to-r from-blue-600 to-indigo-600 font-semibold text-sm"
              >

                Get Started

                <ArrowRight className="w-4 h-4" />

              </button>
            )}

          </div>
        )}

      </nav>

      {/* =====================================================
          SALARY MODAL
      ===================================================== */}

      {showSalaryForm && isLoggedIn && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4"
          onClick={closeSalaryForm}
        >

          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* HEADER */}

            <div className="flex items-start justify-between mb-6">

              <div>

                <h2 className="text-xl font-bold text-slate-800">
                  Update Salary
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Update your monthly salary.
                </p>

              </div>

              <button
                type="button"
                onClick={closeSalaryForm}
                disabled={salarySaving}
                className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 text-xl"
              >
                ×
              </button>

            </div>

            {/* FORM */}

            <form
              onSubmit={handleSalarySubmit}
            >

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Salary Amount
              </label>

              <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">

                <span className="px-4 py-3 text-slate-500 bg-slate-50 border-r border-slate-200">
                  $
                </span>

                <input
                  type="number"
                  value={salaryInput}
                  onChange={(e) => {
                    setSalaryInput(
                      e.target.value
                    );

                    setSalaryError("");
                  }}
                  placeholder="Enter salary"
                  min="0"
                  step="0.01"
                  autoFocus
                  required
                  disabled={salarySaving}
                  className="w-full px-3 py-3 outline-none text-slate-800 font-medium"
                />

              </div>

              {/* ERROR */}

              {salaryError && (
                <p className="mt-2 text-sm text-red-600">
                  {salaryError}
                </p>
              )}

              {/* BUTTONS */}

              <div className="flex justify-end gap-3 mt-6">

                <button
                  type="button"
                  onClick={closeSalaryForm}
                  disabled={salarySaving}
                  className="px-5 py-2.5 rounded-lg border border-slate-300 text-slate-600 font-medium hover:bg-slate-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={salarySaving}
                  className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50"
                >

                  {salarySaving
                    ? "Saving..."
                    : "Save Salary"}

                </button>

              </div>

            </form>

          </div>

        </div>
      )}
    </>
  );
}

export default Navbar;