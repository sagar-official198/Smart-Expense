import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const API = "https://smart-expense-m50r.onrender.com";

    const navigate = useNavigate();

    // =====================================================
    // HANDLE INPUT
    // =====================================================

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        setError("");
    };

    // =====================================================
    // LOGIN
    // =====================================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {
            const res = await fetch(
                `${API}/api/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            const data = await res.json();

            console.log("Login response:", data);

            // =================================================
            // SUCCESS
            // =================================================

            if (res.ok) {

                // ---------------------------------------------
                // Save JWT token
                // ---------------------------------------------

                if (data.token) {
                    localStorage.setItem(
                        "Token",
                        data.token
                    );
                }

                // ---------------------------------------------
                // Save user
                // ---------------------------------------------

                if (data.user) {
                    localStorage.setItem(
                        "user",
                        JSON.stringify(data.user)
                    );
                }

                // ---------------------------------------------
                // IMPORTANT:
                // Tell Navbar that login happened
                // ---------------------------------------------

                window.dispatchEvent(
                    new Event("loginStatusChanged")
                );

                console.log(
                    "Login successful"
                );

                // ---------------------------------------------
                // Go to dashboard/home
                // ---------------------------------------------

                navigate("/");

            } else {

                // Login failed

                setError(
                    data.message ||
                    "Invalid email or password"
                );

                console.log(
                    "Login failed:",
                    data
                );
            }

        } catch (error) {

            console.error(
                "Login Error:",
                error
            );

            setError(
                "Unable to connect to server. Please try again."
            );

        } finally {

            setLoading(false);

        }
    };

    // =====================================================
    // UI
    // =====================================================

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">

                {/* =================================================
                    TITLE
                ================================================= */}

                <h2 className="text-2xl font-semibold text-center mb-2">
                    Smart Expense Login
                </h2>

                <p className="text-sm text-gray-500 text-center mb-6">
                    Welcome back! Please enter your details
                </p>

                {/* =================================================
                    ERROR
                ================================================= */}

                {error && (
                    <div className="mb-5 rounded-lg bg-red-50 border border-red-200 px-4 py-3">

                        <p className="text-sm text-red-600">
                            {error}
                        </p>

                    </div>
                )}

                {/* =================================================
                    FORM
                ================================================= */}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    {/* =================================================
                        EMAIL
                    ================================================= */}

                    <div>

                        <label className="text-sm font-medium">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            placeholder="smart@expense.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none disabled:bg-gray-100"
                        />

                    </div>

                    {/* =================================================
                        PASSWORD
                    ================================================= */}

                    <div className="relative">

                        <label className="text-sm font-medium">
                            Password
                        </label>

                        <input
                            type={
                                showPassword
                                    ? "text"
                                    : "password"
                            }
                            name="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none disabled:bg-gray-100"
                        />

                        <button
                            type="button"
                            disabled={loading}
                            className="absolute right-3 top-9 text-gray-500 hover:text-gray-800"
                            onClick={() =>
                                setShowPassword(
                                    !showPassword
                                )
                            }
                        >

                            {showPassword ? (
                                <EyeOff size={18} />
                            ) : (
                                <Eye size={18} />
                            )}

                        </button>

                    </div>

                    {/* =================================================
                        FORGOT PASSWORD
                    ================================================= */}

                    <div className="text-right">

                        <a
                            href="#"
                            className="text-sm text-black hover:underline"
                        >
                            Forgot password?
                        </a>

                    </div>

                    {/* =================================================
                        SUBMIT
                    ================================================= */}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >

                        {loading
                            ? "Signing In..."
                            : "Sign In"}

                    </button>

                </form>

                {/* =================================================
                    SIGNUP
                ================================================= */}

                <p className="text-center text-sm text-gray-500 mt-6">

                    Don’t have an account?{" "}

                    <Link
                        to="/signup"
                        className="text-black font-medium hover:underline"
                    >
                        Sign up
                    </Link>

                </p>

            </div>

        </div>
    );
}