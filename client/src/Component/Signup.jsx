import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";

export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "https://smart-expense-m50r.onrender.com/api/auth/signup",
                formData
            );

            console.log("Signup success:", response.data);

            alert("Account created successfully");

            window.location.href = "/login";
        } catch (error) {
            console.error(
                "Signup error:",
                error.response?.data || error.message
            );

            alert(
                error.response?.data?.message ||
                "Failed to create account"
            );
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 border border-gray-100">

                {/* Heading */}
                <h2 className="text-2xl font-semibold text-center mb-2">
                    Smart Expense
                </h2>

                <p className="text-sm text-gray-500 text-center mb-6">
                    Create your account
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Username */}
                    <div>
                        <label className="text-sm font-medium">
                            Username
                        </label>

                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter username"
                            required
                            className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="text-sm font-medium">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter email"
                            required
                            className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-sm font-medium">
                            Password
                        </label>

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter password"
                                required
                                className="w-full mt-1 px-4 py-3 pr-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-4"
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5 text-gray-500" />
                                ) : (
                                    <Eye className="h-5 w-5 text-gray-500" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Register button */}
                    <button
                        type="submit"
                        className="w-full bg-black text-white font-semibold rounded-lg py-3 mt-2 hover:bg-gray-800 transition"
                    >
                        Register
                    </button>

                </form>
            </div>
        </div>
    );
}