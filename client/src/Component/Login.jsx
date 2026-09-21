import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const API = "http://localhost:5000";
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // ✅ NORMAL LOGIN
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${API}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem("Token", data.token);
                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );
                console.log(
                    "Login successful", data
                );
                navigate("/")
            }
            else {
                console.log(
                    "Login failed", data
                )
            }

        } catch (error) {
            console.log("Login Error", error);
            alert("Please Try Again!")
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">

                <h2 className="text-2xl font-semibold text-center mb-2">
                    Smart Expense Login
                </h2>

                <p className="text-sm text-gray-500 text-center mb-6">
                    Welcome back! Please enter your details
                </p>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* EMAIL */}
                    <div>
                        <label className="text-sm font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="smart@expense.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none"
                        />
                    </div>

                    {/* PASSWORD */}
                    <div className="relative">
                        <label className="text-sm font-medium">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none"
                        />

                        <span
                            className="absolute right-3 top-9 cursor-pointer text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </span>
                    </div>

                    {/* FORGOT PASSWORD */}
                    <div className="text-right">
                        <a href="#" className="text-sm text-black hover:underline">
                            Forgot password?
                        </a>
                    </div>

                    {/* SUBMIT */}
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
                    >
                        Sign In
                    </button>
                </form>

                {/* SIGNUP */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    Don’t have an account?{" "}
                    <Link to="/signup" className="text-black font-medium">
                        Sign up
                    </Link>
                </p>

            </div>
        </div>
    );
}