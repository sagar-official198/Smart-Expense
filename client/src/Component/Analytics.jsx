import { useEffect, useState } from "react";
import axios from "axios";

import {
    TrendingDown,
    Receipt,
    CalendarDays,
    IndianRupee,
    PiggyBank,
    AlertTriangle,
    Lightbulb,
    ArrowDownRight,
} from "lucide-react";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
} from "recharts";

export default function Analytics() {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [period, setPeriod] = useState(
        "thisMonth"
    );

    const API_URL =
        import.meta.env.VITE_API_URL ||
        "https://smart-expense-m50r.onrender.com";

    // ---------------------------------------
    // FETCH ANALYTICS
    // ---------------------------------------

    const fetchAnalytics = async (
        selectedPeriod = period
    ) => {
        try {
            setLoading(true);
            setError("");

            const token =
                localStorage.getItem("Token");

            if (!token) {
                setError(
                    "Please login to view analytics."
                );
                return;
            }

            const response = await axios.get(
                `${API_URL}/analytics`,
                {
                    params: {
                        period: selectedPeriod,
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setAnalytics(response.data);
        } catch (error) {
            console.error(
                "Analytics error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to load analytics."
            );
        } finally {
            setLoading(false);
        }
    };

    // ---------------------------------------
    // INITIAL LOAD
    // ---------------------------------------

    useEffect(() => {
        fetchAnalytics(period);
    }, []);

    // ---------------------------------------
    // REFRESH WHEN EXPENSE CHANGES
    // ---------------------------------------

    useEffect(() => {
        const handleExpenseUpdate = () => {
            fetchAnalytics(period);
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
    }, [period]);

    // ---------------------------------------
    // CHANGE PERIOD
    // ---------------------------------------

    const handlePeriodChange = (e) => {
        const newPeriod = e.target.value;

        setPeriod(newPeriod);

        fetchAnalytics(newPeriod);
    };

    // ---------------------------------------
    // CURRENCY
    // ---------------------------------------

    const formatCurrency = (value) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(Number(value || 0));
    };

    // ---------------------------------------
    // DATE
    // ---------------------------------------

    const formatDate = (date) => {
        if (!date) return "";

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        );
    };

    // ---------------------------------------
    // MONTH FORMAT
    // ---------------------------------------

    const formatMonth = (month) => {
        if (!month) return "";

        const [year, monthNumber] =
            month.split("-");

        return new Date(
            Number(year),
            Number(monthNumber) - 1,
            1
        ).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
        });
    };

    // ---------------------------------------
    // LOADING
    // ---------------------------------------

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-10 h-10 border-4 border-slate-300 border-t-slate-900 rounded-full animate-spin mx-auto mb-4" />

                    <p className="text-sm text-slate-500">
                        Loading analytics...
                    </p>
                </div>
            </div>
        );
    }

    // ---------------------------------------
    // ERROR
    // ---------------------------------------

    if (error) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
                <div className="bg-white border border-red-100 rounded-2xl shadow-sm p-8 text-center max-w-md w-full">
                    <div className="w-12 h-12 mx-auto rounded-full bg-red-50 text-red-500 flex items-center justify-center mb-4">
                        <AlertTriangle
                            size={24}
                        />
                    </div>

                    <h2 className="text-lg font-bold text-slate-800">
                        Unable to load analytics
                    </h2>

                    <p className="text-sm text-slate-500 mt-2 mb-5">
                        {error}
                    </p>

                    <button
                        onClick={() =>
                            fetchAnalytics(period)
                        }
                        className="px-5 py-2.5 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (!analytics) {
        return null;
    }

    const {
        totalExpenses = 0,
        transactionCount = 0,
        dailyAverage = 0,
        highestExpense,
        highestCategory,
        salary = 0,
        savings = 0,
        savingsPercentage = 0,
        categoryExpenses = [],
        dailyExpenses = [],
        monthlyExpenses = [],
        topExpenses = [],
        insights = [],
    } = analytics;

    const pieColors = [
        "#0f172a",
        "#334155",
        "#475569",
        "#64748b",
        "#94a3b8",
        "#cbd5e1",
    ];

    // ---------------------------------------
    // DAILY CHART DATA
    // ---------------------------------------

    const dailyChartData =
        dailyExpenses.map((item) => ({
            ...item,
            label: new Date(
                item.date
            ).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
            }),
        }));

    // ---------------------------------------
    // MONTHLY CHART DATA
    // ---------------------------------------

    const monthlyChartData =
        monthlyExpenses.map((item) => ({
            ...item,
            label: formatMonth(item.month),
        }));

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">

                {/* ============================= */}
                {/* HEADER */}
                {/* ============================= */}

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-7">

                    <div>
                        <p className="text-sm text-slate-500 mb-1">
                            Detailed Financial Analysis
                        </p>

                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                            Analytics
                        </h1>

                        <p className="text-sm text-slate-500 mt-2">
                            Understand where your money is going.
                        </p>
                    </div>

                    {/* PERIOD FILTER */}

                    <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-sm w-fit">
                        <CalendarDays
                            size={17}
                            className="text-slate-500"
                        />

                        <select
                            value={period}
                            onChange={
                                handlePeriodChange
                            }
                            className="bg-transparent text-sm font-medium text-slate-700 outline-none cursor-pointer"
                        >
                            <option value="thisMonth">
                                This Month
                            </option>

                            <option value="lastMonth">
                                Last Month
                            </option>

                            <option value="last3Months">
                                Last 3 Months
                            </option>

                            <option value="last6Months">
                                Last 6 Months
                            </option>

                            <option value="thisYear">
                                This Year
                            </option>
                        </select>
                    </div>
                </div>

                {/* ============================= */}
                {/* SUMMARY CARDS */}
                {/* ============================= */}

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">

                    {/* TOTAL SPENDING */}

                    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                        <div className="flex items-center justify-between mb-5">
                            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                                <TrendingDown
                                    size={20}
                                />
                            </div>

                            <span className="text-xs text-slate-400">
                                Spending
                            </span>
                        </div>

                        <p className="text-2xl font-bold text-slate-900">
                            {formatCurrency(
                                totalExpenses
                            )}
                        </p>

                        <p className="text-xs text-slate-500 mt-1">
                            Total expenses
                        </p>
                    </div>

                    {/* DAILY AVERAGE */}

                    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                        <div className="flex items-center justify-between mb-5">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                <IndianRupee
                                    size={20}
                                />
                            </div>

                            <span className="text-xs text-slate-400">
                                Average
                            </span>
                        </div>

                        <p className="text-2xl font-bold text-slate-900">
                            {formatCurrency(
                                dailyAverage
                            )}
                        </p>

                        <p className="text-xs text-slate-500 mt-1">
                            Daily spending
                        </p>
                    </div>

                    {/* HIGHEST EXPENSE */}

                    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                        <div className="flex items-center justify-between mb-5">
                            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                                <Receipt
                                    size={20}
                                />
                            </div>

                            <span className="text-xs text-slate-400">
                                Highest
                            </span>
                        </div>

                        <p className="text-2xl font-bold text-slate-900">
                            {formatCurrency(
                                highestExpense?.amount
                            )}
                        </p>

                        <p className="text-xs text-slate-500 mt-1 truncate">
                            {highestExpense
                                ?.category ||
                                "No expenses"}
                        </p>
                    </div>

                    {/* TRANSACTIONS */}

                    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                        <div className="flex items-center justify-between mb-5">
                            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                                <Receipt
                                    size={20}
                                />
                            </div>

                            <span className="text-xs text-slate-400">
                                Activity
                            </span>
                        </div>

                        <p className="text-2xl font-bold text-slate-900">
                            {transactionCount}
                        </p>

                        <p className="text-xs text-slate-500 mt-1">
                            Transactions
                        </p>
                    </div>
                </div>

                {/* ============================= */}
                {/* DAILY TREND + CATEGORY */}
                {/* ============================= */}

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">

                    {/* DAILY TREND */}

                    <div className="xl:col-span-2 bg-white border border-slate-200 rounded-2xl shadow-sm p-5">

                        <div className="mb-5">
                            <h2 className="font-bold text-slate-900">
                                Spending Trend
                            </h2>

                            <p className="text-xs text-slate-500 mt-1">
                                Daily spending during the selected period
                            </p>
                        </div>

                        {dailyChartData.length > 0 ? (
                            <div className="h-[320px]">
                                <ResponsiveContainer
                                    width="100%"
                                    height="100%"
                                >
                                    <LineChart
                                        data={
                                            dailyChartData
                                        }
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
                                            dataKey="label"
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
                                            formatter={(
                                                value
                                            ) =>
                                                formatCurrency(
                                                    value
                                                )
                                            }
                                        />

                                        <Line
                                            type="monotone"
                                            dataKey="amount"
                                            stroke="#0f172a"
                                            strokeWidth={
                                                3
                                            }
                                            dot={{
                                                r: 3,
                                            }}
                                            activeDot={{
                                                r: 6,
                                            }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        ) : (
                            <div className="h-[320px] flex items-center justify-center">
                                <p className="text-sm text-slate-400">
                                    No spending data available.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* CATEGORY */}

                    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5">

                        <div className="mb-3">
                            <h2 className="font-bold text-slate-900">
                                Category Analysis
                            </h2>

                            <p className="text-xs text-slate-500 mt-1">
                                Expense distribution
                            </p>
                        </div>

                        {categoryExpenses.length > 0 ? (
                            <>
                                <div className="h-[230px]">
                                    <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                    >
                                        <PieChart>
                                            <Pie
                                                data={
                                                    categoryExpenses
                                                }
                                                dataKey="amount"
                                                nameKey="category"
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={
                                                    55
                                                }
                                                outerRadius={
                                                    85
                                                }
                                            >
                                                {categoryExpenses.map(
                                                    (
                                                        item,
                                                        index
                                                    ) => (
                                                        <Cell
                                                            key={
                                                                item.category
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

                                <div className="space-y-2 max-h-44 overflow-y-auto">
                                    {categoryExpenses.map(
                                        (
                                            item,
                                            index
                                        ) => (
                                            <div
                                                key={
                                                    item.category
                                                }
                                                className="flex items-center justify-between"
                                            >
                                                <div className="flex items-center gap-2 min-w-0">
                                                    <span
                                                        className="w-2.5 h-2.5 rounded-full shrink-0"
                                                        style={{
                                                            backgroundColor:
                                                                pieColors[
                                                                index %
                                                                pieColors.length
                                                                ],
                                                        }}
                                                    />

                                                    <span className="text-sm text-slate-600 truncate">
                                                        {
                                                            item.category
                                                        }
                                                    </span>
                                                </div>

                                                <span className="text-xs font-semibold text-slate-800">
                                                    {
                                                        item.percentage
                                                    }
                                                    %
                                                </span>
                                            </div>
                                        )
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="h-[280px] flex items-center justify-center">
                                <p className="text-sm text-slate-400">
                                    No category data.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* ============================= */}
                {/* MONTHLY COMPARISON */}
                {/* ============================= */}

                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 mb-6">

                    <div className="mb-5">
                        <h2 className="font-bold text-slate-900">
                            Monthly Spending
                        </h2>

                        <p className="text-xs text-slate-500 mt-1">
                            Compare your spending across months
                        </p>
                    </div>

                    {monthlyChartData.length > 0 ? (
                        <div className="h-[320px]">
                            <ResponsiveContainer
                                width="100%"
                                height="100%"
                            >
                                <BarChart
                                    data={
                                        monthlyChartData
                                    }
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
                                        dataKey="label"
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
                                        formatter={(
                                            value
                                        ) =>
                                            formatCurrency(
                                                value
                                            )
                                        }
                                    />

                                    <Bar
                                        dataKey="amount"
                                        fill="#334155"
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
                        <div className="h-[320px] flex items-center justify-center">
                            <p className="text-sm text-slate-400">
                                No monthly data available.
                            </p>
                        </div>
                    )}
                </div>

                {/* ============================= */}
                {/* BOTTOM SECTION */}
                {/* ============================= */}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* TOP EXPENSES */}

                    <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl shadow-sm">

                        <div className="p-5 border-b border-slate-100">
                            <h2 className="font-bold text-slate-900">
                                Top Expenses
                            </h2>

                            <p className="text-xs text-slate-500 mt-1">
                                Your largest transactions
                            </p>
                        </div>

                        {topExpenses.length > 0 ? (
                            <div className="divide-y divide-slate-100">
                                {topExpenses.map(
                                    (expense) => (
                                        <div
                                            key={
                                                expense._id
                                            }
                                            className="p-4 sm:p-5 flex items-center justify-between gap-4"
                                        >
                                            <div className="flex items-center gap-3 min-w-0">
                                                <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                                                    <ArrowDownRight
                                                        size={
                                                            18
                                                        }
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

                                                <p className="text-xs text-slate-400 mt-1">
                                                    {formatDate(
                                                        expense.date
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
                                    No expenses found.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* SAVINGS */}

                    <div className="bg-slate-900 rounded-2xl p-6 text-white">

                        <div className="flex items-center justify-between mb-7">
                            <div>
                                <p className="text-sm text-slate-400">
                                    Savings Analysis
                                </p>

                                <h2 className="text-3xl font-bold mt-1">
                                    {Math.max(
                                        savingsPercentage,
                                        0
                                    )}
                                    %
                                </h2>
                            </div>

                            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                                <PiggyBank
                                    size={20}
                                />
                            </div>
                        </div>

                        <div className="space-y-5">

                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-slate-400">
                                        Salary
                                    </span>

                                    <span className="font-semibold">
                                        {formatCurrency(
                                            salary
                                        )}
                                    </span>
                                </div>

                                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-white rounded-full"
                                        style={{
                                            width: "100%",
                                        }}
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-slate-400">
                                        Expenses
                                    </span>

                                    <span className="font-semibold">
                                        {formatCurrency(
                                            totalExpenses
                                        )}
                                    </span>
                                </div>

                                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-slate-400 rounded-full"
                                        style={{
                                            width: `${Math.min(
                                                salary > 0
                                                    ? (totalExpenses /
                                                        salary) *
                                                    100
                                                    : 0,
                                                100
                                            )}%`,
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="pt-4 border-t border-white/10">
                                <div className="flex justify-between">
                                    <span className="text-slate-400">
                                        Savings
                                    </span>

                                    <span className="font-bold">
                                        {formatCurrency(
                                            savings
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {highestCategory && (
                            <div className="mt-7 pt-5 border-t border-white/10">
                                <p className="text-xs text-slate-400">
                                    Highest category
                                </p>

                                <div className="flex justify-between items-center mt-2">
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

                {/* ============================= */}
                {/* INSIGHTS */}
                {/* ============================= */}

                {insights.length > 0 && (
                    <div className="mt-6 bg-white border border-slate-200 rounded-2xl shadow-sm p-5">

                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-10 h-10 rounded-xl bg-yellow-50 text-yellow-600 flex items-center justify-center">
                                <Lightbulb
                                    size={20}
                                />
                            </div>

                            <div>
                                <h2 className="font-bold text-slate-900">
                                    Smart Insights
                                </h2>

                                <p className="text-xs text-slate-500 mt-1">
                                    Based on your actual spending
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {insights.map(
                                (
                                    insight,
                                    index
                                ) => (
                                    <div
                                        key={index}
                                        className="p-4 rounded-xl bg-slate-50 border border-slate-100"
                                    >
                                        <p className="text-sm font-semibold text-slate-800">
                                            {
                                                insight.title
                                            }
                                        </p>

                                        <p className="text-sm text-slate-500 mt-1 leading-6">
                                            {
                                                insight.message
                                            }
                                        </p>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}