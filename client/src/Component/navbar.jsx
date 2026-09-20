import React, { useState } from "react";
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
  CreditCard,
  User,
} from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Dashboard", path: "/dashboard", icon: TrendingUp },
    { name: "Expenses", path: "/expenses", icon: ReceiptText },
    { name: "Analytics", path: "/analytics", icon: PieChart },
    { name: "Cards & Accounts", path: "/accounts", icon: CreditCard },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 left-0 w-full bg-white/85 backdrop-blur-md border-b border-slate-200/80 z-50 transition-all duration-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Left Side: Brand Logo */}
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="group flex items-center gap-2.5 transition-transform duration-200 hover:scale-[1.02]"
            >
              <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all">
                <Wallet className="w-5 h-5 transition-transform duration-300 group-hover:rotate-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 leading-tight">
                  Smart<span className="text-blue-600">Expense</span>
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 -mt-0.5">
                  Financial Tracker
                </span>
              </div>
            </Link>

            {/* Quick Badge */}
            <span className="hidden xl:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200/60 ml-2">
              v2.0 Beta
            </span>
          </div>

          {/* Center: Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                    active
                      ? "bg-blue-50 text-blue-600 font-semibold shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      active ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"
                    }`}
                  />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Side: Quick Actions & Profile */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Balance Badge */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100/90 border border-slate-200/60 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-slate-500 font-medium">Balance:</span>
              <span className="font-bold text-slate-800">$4,850.00</span>
            </div>

            {/* Notification Bell */}
            <button
              aria-label="Notifications"
              className="relative p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
            </button>

            {/* Add Expense Button */}
            <button
              onClick={() => navigate("/add-expense")}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200/60 transition-all active:scale-95"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Add Expense</span>
            </button>

            {/* Login Button */}
            <button
              onClick={() => navigate("/login")}
              className="text-sm font-medium text-slate-700 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Sign In
            </button>

            {/* Get Started CTA */}
            <button
              onClick={() => navigate("/register")}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg text-white bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-sm shadow-blue-500/25 transition-all duration-200 hover:shadow-md hover:shadow-blue-500/35 active:scale-98"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Hamburger Menu Button */}
          <div className="flex items-center gap-2 sm:hidden">
            <button
              onClick={() => navigate("/login")}
              className="text-xs font-semibold px-2.5 py-1.5 rounded-md text-blue-600 bg-blue-50"
            >
              Sign In
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-hidden"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-200/90 bg-white px-4 pt-3 pb-5 space-y-3 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between px-2 py-2 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-xs text-slate-500">Current Balance</span>
            <span className="text-sm font-bold text-slate-800">$4,850.00</span>
          </div>

          <div className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? "bg-blue-50 text-blue-600 font-semibold"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${active ? "text-blue-600" : "text-slate-400"}`}
                  />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
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

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate("/register");
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-white bg-linear-to-r from-blue-600 to-indigo-600 font-semibold text-sm shadow-sm"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;