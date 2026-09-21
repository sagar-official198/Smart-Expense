import { Routes, Route } from "react-router-dom";

import Navbar from "./Component/navbar.jsx";
import Login from "./Component/Login.jsx";
import Signup from "./Component/Signup.jsx";

function Home() {
  const token = localStorage.getItem("Token");
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 py-16">

          <div className="max-w-3xl">

            <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
              {token && user
                ? `Welcome, ${user.username}!`
                : "Welcome to Smart Expense"}
            </h1>

            <p className="mt-4 text-lg text-slate-600">
              Track your daily spending, manage accounts,
              and achieve your financial goals.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>

              <span className="text-sm font-medium">
                Live Sync Active
              </span>
            </div>

          </div>

        </div>
      </main>
    </>
  );
}

function App() {
  return (
    <Routes>

      {/* Home */}
      <Route path="/" element={<Home />} />

      {/* Authentication */}
      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

    </Routes>
  );
}

export default App;