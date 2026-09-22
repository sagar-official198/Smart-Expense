import { useEffect, useState } from "react";
import axios from "axios";

import {
    Wallet,
    TrendingUp,
    TrendingDown,
    PiggyBank,
    Receipt,
    ArrowUpRight,
    ArrowDownRight,
} from "lucide-react";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts";

export default function Dashboard() {
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const API_URL =
        import.meta.env.VITE_API_URL ||
        "https://smart-expense-m50r.onrender.com";

    const fetchDashboard = async () => {
        try {
            setLoading(true);
            setError("");

            const token = localStorage.getItem("Token");

            if (!token) {
                setError("Please login first.");
                return;
            }

            const response = await axios.get(
                `${API_URL}/dashboard`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setDashboard(response.data);
        } catch (error) {
            console.error(
                "Dashboard error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to load dashboard"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboard();

        // Refresh dashboard after expense changes
        const handleExpenseUpdate = () => {
            fetchDashboard();
        };

        window.addEventListener(
            "expenseUpdated",
            handleExpenseUpdate
        );

        return () => {
            window.removeEventListener(
                "expenseUpdated",
                handleExpenseUpdate
            );
        };
    }, []);

    // ----------------------------------
    // LOADING
    // ----------------------------------

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-10 h-10 border-4 border-slate-300 border-t-slate-800 rounded-full animate-spin mx-auto mb-4"></div>

                    <p className="text-slate-500">
                        Loading dashboard...
                    </p>
                </div>
            </div>
        );
    }

    // ----------------------------------
    // ERROR
    // ----------------------------------

    if (error) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
                <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-8 text-center max-w-md w-full">
                    <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Receipt size={24} />
                    </div>

                    <h2 className="text-lg font-bold text-slate-800 mb-2">
                        Unable to load dashboard
                    </h2>

                    <p className="text-sm text-slate-500 mb-5">
                        {error}
                    </p>

                    <button
                        onClick={fetchDashboard}
                        className="px-5 py-2.5 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (!dashboard) {
        return null;
    }

    const {
        user,
        salary = 0,
        totalExpenses = 0,
        balance = 0,
        savings = 0,
        savingsPercentage = 0,
        highestCategory,
        categoryExpenses = [],
        monthlyExpenses = [],
        recentExpenses = [],
    } = dashboard;

    // ----------------------------------
    // FORMAT CURRENCY
    // ----------------------------------

    const formatCurrency = (value) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(Number(value || 0));
    };

    // ----------------------------------
    // PIE COLORS
    // ----------------------------------

    const pieColors = [
        "#0f172a",
        "#334155",
        "#475569",
        "#64748b",
        "#94a3b8",
        "#cbd5e1",
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">

                {/* -------------------------------- */}
                {/* HEADER */}
                {/* -------------------------------- */}

                <div className="mb-7">
                    <p className="text-sm text-slate-500 mb-1">
                        Financial Overview
                    </p>

                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                        Welcome back,{" "}
                        {user?.username || "User"} 👋
                    </h1>

                    <p className="text-sm text-slate-500 mt-2">
                        Here's your current expense and
                        savings overview.
                    </p>
                </div>

                {/* -------------------------------- */}
                {/* SUMMARY CARDS */}
                {/* -------------------------------- */}

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">

                    {/* Salary */}

                    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                        <div className="flex items-center justify-between mb-5">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                <Wallet size={20} />
                            </div>

                            <span className="text-xs font-medium text-slate-400">
                                Salary
                            </span>
                        </div>

                        <p className="text-2xl font-bold text-slate-900">
                            {formatCurrency(salary)}
                        </p>

                        <p className="text-xs text-slate-500 mt-1">
                            Monthly income
                        </p>
                    </div>

                    {/* Expenses */}

                    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                        <div className="flex items-center justify-between mb-5">
                            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                                <TrendingDown size={20} />
                            </div>

                            <span className="text-xs font-medium text-slate-400">
                                Expenses
                            </span>
                        </div>

                        <p className="text-2xl font-bold text-slate-900">
                            {formatCurrency(totalExpenses)}
                        </p>

                        <p className="text-xs text-slate-500 mt-1">
                            Total spending
                        </p>
                    </div>

                    {/* Balance */}

                    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                        <div className="flex items-center justify-between mb-5">
                            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                <TrendingUp size={20} />
                            </div>

                            <span className="text-xs font-medium text-slate-400">
                                Balance
                            </span>
                        </div>

                        <p
                            className={`text-2xl font-bold ${balance < 0
                                    ? "text-red-600"
                                    : "text-slate-900"
                                }`}
                        >
                            {formatCurrency(balance)}
                        </p>

                        <p className="text-xs text-slate-500 mt-1">
                            Remaining amount
                        </p>
                    </div>

                    {/* Savings */}

                    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                        <div className="flex items-center justify-between mb-5">
                            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                                <PiggyBank size={20} />
                            </div>

                            <span className="text-xs font-medium text-slate-400">
                                Savings
                            </span>
                        </div>

                        <p className="text-2xl font-bold text-slate-900">
                            {formatCurrency(savings)}
                        </p>

                        <p className="text-xs text-slate-500 mt-1">
                            {savingsPercentage}% of salary
                        </p>
                    </div>
                </div>

                {/* -------------------------------- */}
                {/* CHART SECTION */}
                {/* -------------------------------- */}

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">

                    {/* Monthly Expense Chart */}

                    <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-5">

                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="font-bold text-slate-900">
                                    Monthly Expenses
                                </h2>

                                <p className="text-xs text-slate-500 mt-1">
                                    Your spending over time
                                </p>
                            </div>

                            <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center">
                                <TrendingDown
                                    size={18}
                                    className="text-slate-600"
                                />
                            </div>
                        </div>

                        {monthlyExpenses.length > 0 ? (
                            <div className="h-[300px]">
                                <ResponsiveContainer
                                    width="100%"
                                    height="100%"
                                >
                                    <BarChart
                                        data={monthlyExpenses}
                                        margin={{
                                            top: 10,
                                            right: 10,
                                            left: 0,
                                            bottom: 0,
                                        }}
                                    >
                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            vertical={false}
                                        />

                                        <XAxis
                                            dataKey="month"
                                            tick={{
                                                fontSize: 11,
                                            }}
                                        />

                                        <YAxis
                                            tick={{
                                                fontSize: 11,
                                            }}
                                        />

                                        <Tooltip
                                            formatter={(value) =>
                                                formatCurrency(
                                                    value
                                                )
                                            }
                                        />

                                        <Bar
                                            dataKey="amount"
                                            fill="#0f172a"
                                            radius={[
                                                6,
                                                6,
                                                0,
                                                0,
                                            ]}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        ) : (
                            <div className="h-[300px] flex items-center justify-center">
                                <p className="text-sm text-slate-400">
                                    No expense data available.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Category Chart */}

                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">

                        <div className="mb-4">
                            <h2 className="font-bold text-slate-900">
                                Spending Categories
                            </h2>

                            <p className="text-xs text-slate-500 mt-1">
                                Where your money goes
                            </p>
                        </div>

                        {categoryExpenses.length > 0 ? (
                            <>
                                <div className="h-[220px]">
                                    <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                    >
                                        <PieChart>
                                            <Pie
                                                data={categoryExpenses}
                                                dataKey="amount"
                                                nameKey="category"
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={80}
                                                innerRadius={45}
                                            >
                                                {categoryExpenses.map(
                                                    (
                                                        entry,
                                                        index
                                                    ) => (
                                                        <Cell
                                                            key={
                                                                entry.category
                                                            }
                                                            fill={
                                                                pieColors[
                                                                index %
                                                                pieColors.length
                                                                ]
                                                            }
                                                        />
                                                    )
                                                )}
                                            </Pie>

                                            <Tooltip
                                                formatter={(
                                                    value
                                                ) =>
                                                    formatCurrency(
                                                        value
                                                    )
                                                }
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>

                                <div className="space-y-2 max-h-40 overflow-y-auto">
                                    {categoryExpenses.map(
                                        (
                                            item,
                                            index
                                        ) => (
                                            <div
                                                key={
                                                    item.category
                                                }
                                                className="flex items-center justify-between text-sm"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <span
                                                        className="w-2.5 h-2.5 rounded-full"
                                                        style={{
                                                            backgroundColor:
                                                                pieColors[
                                                                index %
                                                                pieColors.length
                                                                ],
                                                        }}
                                                    />

                                                    <span className="text-slate-600">
                                                        {
                                                            item.category
                                                        }
                                                    </span>
                                                </div>

                                                <span className="font-semibold text-slate-800">
                                                    {formatCurrency(
                                                        item.amount
                                                    )}
                                                </span>
                                            </div>
                                        )
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="h-[280px] flex items-center justify-center">
                                <p className="text-sm text-slate-400">
                                    No category data available.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* -------------------------------- */}
                {/* BOTTOM SECTION */}
                {/* -------------------------------- */}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Recent Expenses */}

                    <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm">

                        <div className="p-5 border-b border-slate-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="font-bold text-slate-900">
                                        Recent Expenses
                                    </h2>

                                    <p className="text-xs text-slate-500 mt-1">
                                        Your latest transactions
                                    </p>
                                </div>

                                <Receipt
                                    size={19}
                                    className="text-slate-400"
                                />
                            </div>
                        </div>

                        {recentExpenses.length > 0 ? (
                            <div className="divide-y divide-slate-100">
                                {recentExpenses.map(
                                    (expense) => (
                                        <div
                                            key={
                                                expense._id
                                            }
                                            className="p-4 sm:p-5 flex items-center justify-between gap-4"
                                        >
                                            <div className="flex items-center gap-3 min-w-0">
                                                <div className="w-10 h-10 shrink-0 rounded-xl bg-slate-100 flex items-center justify-center">
                                                    <ArrowDownRight
                                                        size={
                                                            18
                                                        }
                                                        className="text-red-500"
                                                    />
                                                </div>

                                                <div className="min-w-0">
                                                    <p className="font-medium text-slate-800 truncate">
                                                        {
                                                            expense.category
                                                        }
                                                    </p>

                                                    <p className="text-xs text-slate-400 truncate">
                                                        {expense.description ||
                                                            "No description"}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="text-right shrink-0">
                                                <p className="font-bold text-red-600">
                                                    -
                                                    {formatCurrency(
                                                        expense.amount
                                                    )}
                                                </p>

                                                <p className="text-xs text-slate-400">
                                                    {new Date(
                                                        expense.date
                                                    ).toLocaleDateString(
                                                        "en-IN"
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        ) : (
                            <div className="p-10 text-center">
                                <p className="text-sm text-slate-400">
                                    No expenses added yet.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Savings Card */}

                    <div className="bg-slate-900 rounded-2xl p-6 text-white">

                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <p className="text-sm text-slate-400">
                                    Savings Progress
                                </p>

                                <h2 className="text-2xl font-bold mt-1">
                                    {savingsPercentage}%
                                </h2>
                            </div>

                            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                                <PiggyBank size={20} />
                            </div>
                        </div>

                        <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden mb-3">
                            <div
                                className="h-full bg-white rounded-full transition-all duration-700"
                                style={{
                                    width: `${Math.min(
                                        Math.max(
                                            savingsPercentage,
                                            0
                                        ),
                                        100
                                    )}%`,
                                }}
                            />
                        </div>

                        <p className="text-sm text-slate-400">
                            You have saved{" "}
                            <span className="text-white font-semibold">
                                {formatCurrency(savings)}
                            </span>{" "}
                            from your salary.
                        </p>

                        {highestCategory && (
                            <div className="mt-8 pt-5 border-t border-white/10">
                                <p className="text-xs text-slate-400">
                                    Highest spending
                                </p>

                                <div className="flex items-center justify-between mt-2">
                                    <span className="font-semibold">
                                        {
                                            highestCategory.category
                                        }
                                    </span>

                                    <span className="font-bold">
                                        {formatCurrency(
                                            highestCategory.amount
                                        )}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}