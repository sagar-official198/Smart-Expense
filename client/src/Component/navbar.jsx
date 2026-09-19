import React from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";

function Navbar() {
    const navigate = useNavigate();

    return (
        <div className="navbar-container fixed top-0 left-0 w-full h-16 bg-white border-b shadow-sm z-50 px-8 flex justify-between items-center">

            {/* Left Side */}
            <div
                className="navbar-brand text-xl font-bold text-blue-600 cursor-pointer"
                onClick={() => navigate("/")}
            >
                <div className="navbar-brand-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                </div>
                <span>Smart Expense</span>
            </div>

            {/* Right Side */}
            <div className="navbar-menu flex items-center gap-6">
                <button
                    onClick={() => navigate("/dashboard")}
                    className="navbar-link text-gray-700 font-medium hover:text-blue-600 transition"
                >
                    Dashboard
                </button>
                <button
                    onClick={() => navigate("/add-expense")}
                    className="navbar-link text-gray-700 font-medium hover:text-blue-600 transition"
                >
                    Add Expense
                </button>
                <button
                    onClick={() => navigate("/login")}
                    className="navbar-login-btn bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Login
                </button>
            </div>
        </div>
    );
}

export default Navbar;