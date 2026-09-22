import { Routes, Route, Link } from "react-router-dom";

import {
  ArrowRight,
  BarChart3,
  Wallet,
  PiggyBank,
  TrendingUp,
  Receipt,
  ShieldCheck,
  Sparkles,
  CircleDollarSign,
} from "lucide-react";

import Navbar from "./Component/navbar.jsx";
import Login from "./Component/Login.jsx";
import Signup from "./Component/Signup.jsx";
import Expenses from "./Component/Expenses.jsx";
import Dashboard from "./Component/Dashboard.jsx";
import Analytics from "./Component/Analytics.jsx";

function Home() {
  const token = localStorage.getItem("Token");

  let user = null;

  try {
    user = JSON.parse(
      localStorage.getItem("user")
    );
  } catch {
    user = null;
  }

  const isLoggedIn = Boolean(token && user);

  return (
    <main className="min-h-screen bg-slate-50 overflow-hidden">

      {/* ========================================= */}
      {/* HERO */}
      {/* ========================================= */}

      <section className="relative">
        {/* Background decoration */}

        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-60" />

          <div className="absolute top-72 -left-40 w-80 h-80 bg-indigo-100 rounded-full blur-3xl opacity-50" />
        </div>

        <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 pb-16 lg:pb-24">

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* LEFT */}

            <div>

              {/* Badge */}

              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-6">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-50">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </span>

                <span className="text-xs sm:text-sm font-medium text-slate-600">
                  Smart financial tracking
                </span>

                <Sparkles
                  size={14}
                  className="text-blue-500"
                />
              </div>

              {/* Heading */}

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-950 leading-[1.08]">
                Take control of
                <span className="block text-blue-600">
                  your money.
                </span>
              </h1>

              {/* Description */}

              <p className="mt-6 text-base sm:text-lg text-slate-600 leading-7 max-w-xl">
                Track your expenses, understand your
                spending habits, and build better
                financial habits with SmartExpense.
              </p>

              {/* Buttons */}

              <div className="flex flex-col sm:flex-row gap-3 mt-8">

                {isLoggedIn ? (
                  <Link
                    to="/dashboard"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 text-white font-semibold shadow-lg shadow-blue-200 hover:bg-blue-700 transition"
                  >
                    Open Dashboard
                    <ArrowRight size={18} />
                  </Link>
                ) : (
                  <Link
                    to="/signup"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 text-white font-semibold shadow-lg shadow-blue-200 hover:bg-blue-700 transition"
                  >
                    Get Started
                    <ArrowRight size={18} />
                  </Link>
                )}

                <Link
                  to={
                    isLoggedIn
                      ? "/analytics"
                      : "/login"
                  }
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold hover:bg-slate-100 transition"
                >
                  {isLoggedIn
                    ? "View Analytics"
                    : "Sign In"}
                </Link>

              </div>

              {/* Trust points */}

              <div className="flex flex-wrap gap-x-6 gap-y-3 mt-8">

                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <ShieldCheck
                    size={17}
                    className="text-emerald-500"
                  />
                  Secure data
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <TrendingUp
                    size={17}
                    className="text-blue-500"
                  />
                  Real-time insights
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Wallet
                    size={17}
                    className="text-purple-500"
                  />
                  Easy tracking
                </div>

              </div>
            </div>

            {/* RIGHT — DASHBOARD PREVIEW */}

            <div className="relative">

              {/* Floating expense card */}

              <div className="absolute -left-2 sm:-left-8 top-12 z-20 bg-white rounded-2xl border border-slate-200 shadow-xl px-4 py-3 hidden sm:block">
                <div className="flex items-center gap-3">

                  <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center">
                    <Receipt
                      size={17}
                      className="text-red-500"
                    />
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Recent expense
                    </p>

                    <p className="text-sm font-bold text-slate-800">
                      Food · ₹450
                    </p>
                  </div>

                </div>
              </div>

              {/* Main dashboard card */}

              <div className="relative bg-white rounded-3xl border border-slate-200 shadow-2xl p-5 sm:p-7 max-w-lg mx-auto">

                {/* Card header */}

                <div className="flex items-center justify-between mb-7">

                  <div>
                    <p className="text-xs text-slate-400">
                      Financial Overview
                    </p>

                    <h3 className="text-lg font-bold text-slate-900 mt-1">
                      My Finances
                    </h3>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                    <Wallet
                      size={20}
                      className="text-blue-600"
                    />
                  </div>

                </div>

                {/* Balance */}

                <div className="rounded-2xl bg-slate-950 p-5 text-white">

                  <p className="text-xs text-slate-400">
                    Available Balance
                  </p>

                  <p className="text-3xl sm:text-4xl font-bold mt-2">
                    ₹17,550
                  </p>

                  <div className="flex items-center gap-2 mt-3 text-xs text-emerald-400">
                    <TrendingUp size={14} />
                    Healthy savings
                  </div>

                </div>

                {/* Mini cards */}

                <div className="grid grid-cols-2 gap-3 mt-4">

                  <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4">

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">
                        Salary
                      </span>

                      <CircleDollarSign
                        size={16}
                        className="text-blue-500"
                      />
                    </div>

                    <p className="text-lg font-bold text-slate-900 mt-2">
                      ₹30,000
                    </p>

                  </div>

                  <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4">

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">
                        Expenses
                      </span>

                      <TrendingUp
                        size={16}
                        className="text-red-500"
                      />
                    </div>

                    <p className="text-lg font-bold text-slate-900 mt-2">
                      ₹12,450
                    </p>

                  </div>

                </div>

                {/* Spending progress */}

                <div className="mt-5">

                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-slate-500">
                      Monthly spending
                    </span>

                    <span className="text-xs font-semibold text-slate-700">
                      41.5%
                    </span>
                  </div>

                  <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full w-[42%] bg-blue-600 rounded-full" />
                  </div>

                </div>

                {/* Chart */}

                <div className="mt-6">

                  <div className="flex items-center justify-between mb-3">

                    <p className="text-sm font-semibold text-slate-800">
                      Spending trend
                    </p>

                    <BarChart3
                      size={17}
                      className="text-slate-400"
                    />

                  </div>

                  <div className="flex items-end gap-2 h-20">

                    <div className="flex-1 bg-blue-100 rounded-t-md h-[35%]" />
                    <div className="flex-1 bg-blue-200 rounded-t-md h-[55%]" />
                    <div className="flex-1 bg-blue-300 rounded-t-md h-[42%]" />
                    <div className="flex-1 bg-blue-400 rounded-t-md h-[72%]" />
                    <div className="flex-1 bg-blue-500 rounded-t-md h-[60%]" />
                    <div className="flex-1 bg-blue-600 rounded-t-md h-[85%]" />
                    <div className="flex-1 bg-blue-500 rounded-t-md h-[68%]" />

                  </div>

                </div>

              </div>

              {/* Savings floating card */}

              <div className="absolute -right-2 sm:-right-8 bottom-8 z-20 bg-white rounded-2xl border border-slate-200 shadow-xl px-4 py-3 hidden sm:block">

                <div className="flex items-center gap-3">

                  <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <PiggyBank
                      size={17}
                      className="text-emerald-600"
                    />
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Savings
                    </p>

                    <p className="text-sm font-bold text-emerald-600">
                      ₹17,550
                    </p>
                  </div>

                </div>

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ========================================= */}
      {/* FEATURES */}
      {/* ========================================= */}

      <section className="bg-white border-y border-slate-200">

        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 lg:py-20">

          <div className="text-center max-w-2xl mx-auto">

            <p className="text-sm font-semibold text-blue-600">
              Everything in one place
            </p>

            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
              Manage your finances smarter
            </h2>

            <p className="text-slate-500 mt-4">
              SmartExpense gives you the tools to
              understand and improve your financial habits.
            </p>

          </div>

          <div className="grid md:grid-cols-3 gap-5 mt-12">

            {/* Feature 1 */}

            <div className="group p-6 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:shadow-lg transition">

              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
                <Receipt size={23} />
              </div>

              <h3 className="text-lg font-bold text-slate-900 mt-5">
                Expense Tracking
              </h3>

              <p className="text-sm text-slate-500 leading-6 mt-2">
                Record your daily expenses and keep
                every transaction organized in one place.
              </p>

            </div>

            {/* Feature 2 */}

            <div className="group p-6 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:shadow-lg transition">

              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition">
                <BarChart3 size={23} />
              </div>

              <h3 className="text-lg font-bold text-slate-900 mt-5">
                Powerful Analytics
              </h3>

              <p className="text-sm text-slate-500 leading-6 mt-2">
                Understand spending patterns with
                category breakdowns and detailed analytics.
              </p>

            </div>

            {/* Feature 3 */}

            <div className="group p-6 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:shadow-lg transition">

              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition">
                <PiggyBank size={23} />
              </div>

              <h3 className="text-lg font-bold text-slate-900 mt-5">
                Track Your Savings
              </h3>

              <p className="text-sm text-slate-500 leading-6 mt-2">
                Monitor your balance and savings so you
                always know where your money stands.
              </p>

            </div>

          </div>
        </div>
      </section>

      {/* ========================================= */}
      {/* ANALYTICS SECTION */}
      {/* ========================================= */}

      <section className="bg-slate-50">

        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 lg:py-20">

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* LEFT */}

            <div>

              <div className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
                <BarChart3 size={17} />
                Financial insights
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-3">
                Know where your money goes.
              </h2>

              <p className="text-slate-500 leading-7 mt-5 max-w-lg">
                Get a clear picture of your spending with
                category analysis, monthly trends, and
                detailed financial insights.
              </p>

              <Link
                to={
                  isLoggedIn
                    ? "/analytics"
                    : "/signup"
                }
                className="inline-flex items-center gap-2 mt-7 text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                Explore analytics
                <ArrowRight size={17} />
              </Link>

            </div>

            {/* RIGHT */}

            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-5 sm:p-7">

              <div className="flex items-center justify-between mb-7">

                <div>
                  <p className="text-xs text-slate-400">
                    Spending breakdown
                  </p>

                  <p className="text-xl font-bold text-slate-900 mt-1">
                    ₹12,450
                  </p>
                </div>

                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">
                  This month
                </span>

              </div>

              <div className="space-y-5">

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-600">
                      Food
                    </span>

                    <span className="font-semibold text-slate-800">
                      ₹4,200
                    </span>
                  </div>

                  <div className="h-2 bg-slate-100 rounded-full">
                    <div className="h-full w-[65%] bg-blue-600 rounded-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-600">
                      Shopping
                    </span>

                    <span className="font-semibold text-slate-800">
                      ₹3,100
                    </span>
                  </div>

                  <div className="h-2 bg-slate-100 rounded-full">
                    <div className="h-full w-[48%] bg-purple-500 rounded-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-600">
                      Travel
                    </span>

                    <span className="font-semibold text-slate-800">
                      ₹2,650
                    </span>
                  </div>

                  <div className="h-2 bg-slate-100 rounded-full">
                    <div className="h-full w-[40%] bg-emerald-500 rounded-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-600">
                      Bills
                    </span>

                    <span className="font-semibold text-slate-800">
                      ₹2,500
                    </span>
                  </div>

                  <div className="h-2 bg-slate-100 rounded-full">
                    <div className="h-full w-[37%] bg-orange-500 rounded-full" />
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ========================================= */}
      {/* CTA */}
      {/* ========================================= */}

      <section className="bg-slate-950">

        <div className="max-w-5xl mx-auto px-5 sm:px-6 py-16 lg:py-20 text-center">

          <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto mb-6">
            <Wallet size={26} />
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Start managing your money smarter.
          </h2>

          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            Take the first step toward better spending
            habits and clearer financial goals.
          </p>

          {!isLoggedIn && (
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 mt-8 px-7 py-3.5 rounded-xl bg-white text-slate-900 font-semibold hover:bg-slate-100 transition"
            >
              Create your account
              <ArrowRight size={18} />
            </Link>
          )}

          {isLoggedIn && (
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 mt-8 px-7 py-3.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              Go to Dashboard
              <ArrowRight size={18} />
            </Link>
          )}

        </div>
      </section>

      {/* ========================================= */}
      {/* FOOTER */}
      {/* ========================================= */}

      <footer className="bg-slate-950 border-t border-white/10">

        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-7">

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">

            <div className="flex items-center gap-2">

              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <Wallet
                  size={16}
                  className="text-white"
                />
              </div>

              <span className="font-bold text-white">
                SmartExpense
              </span>

            </div>

            <p className="text-xs text-slate-500">
              © 2026 SmartExpense. Manage smarter.
            </p>

          </div>

        </div>
      </footer>

    </main>
  );
}

function App() {
  return (
    <>
      {/* Navbar stays visible on all pages */}
      <Navbar />

      <Routes>

        {/* Home */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* Authentication */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* Expenses */}
        <Route
          path="/expenses"
          element={<Expenses />}
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* Analytics */}
        <Route
          path="/analytics"
          element={<Analytics />}
        />

        {/* Add Expense */}
        <Route
          path="/add-expense"
          element={<Expenses />}
        />

      </Routes>
    </>
  );
}

export default App;