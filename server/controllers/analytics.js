import Expense from "../model/expense.js";
import User from "../model/user.js";

export const getAnalytics = async (req, res) => {
    try {
        const userId = req.user._id;

        const {
            period = "thisMonth",
            startDate,
            endDate,
        } = req.query;

        // --------------------------------
        // USER
        // --------------------------------

        const user = await User.findById(userId).select(
            "username salary"
        );

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        // --------------------------------
        // DATE RANGE
        // --------------------------------

        const now = new Date();

        let start;
        let end;

        if (period === "thisMonth") {
            start = new Date(
                now.getFullYear(),
                now.getMonth(),
                1
            );

            end = new Date(
                now.getFullYear(),
                now.getMonth() + 1,
                0,
                23,
                59,
                59,
                999
            );
        }

        else if (period === "lastMonth") {
            start = new Date(
                now.getFullYear(),
                now.getMonth() - 1,
                1
            );

            end = new Date(
                now.getFullYear(),
                now.getMonth(),
                0,
                23,
                59,
                59,
                999
            );
        }

        else if (period === "last3Months") {
            start = new Date(
                now.getFullYear(),
                now.getMonth() - 2,
                1
            );

            end = new Date(
                now.getFullYear(),
                now.getMonth() + 1,
                0,
                23,
                59,
                59,
                999
            );
        }

        else if (period === "last6Months") {
            start = new Date(
                now.getFullYear(),
                now.getMonth() - 5,
                1
            );

            end = new Date(
                now.getFullYear(),
                now.getMonth() + 1,
                0,
                23,
                59,
                59,
                999
            );
        }

        else if (period === "thisYear") {
            start = new Date(
                now.getFullYear(),
                0,
                1
            );

            end = new Date(
                now.getFullYear(),
                11,
                31,
                23,
                59,
                59,
                999
            );
        }

        else if (
            period === "custom" &&
            startDate &&
            endDate
        ) {
            start = new Date(startDate);
            end = new Date(endDate);

            end.setHours(
                23,
                59,
                59,
                999
            );
        }

        else {
            start = new Date(
                now.getFullYear(),
                now.getMonth(),
                1
            );

            end = new Date(
                now.getFullYear(),
                now.getMonth() + 1,
                0,
                23,
                59,
                59,
                999
            );
        }

        // --------------------------------
        // FETCH EXPENSES
        // --------------------------------

        const expenses = await Expense.find({
            userId,
            date: {
                $gte: start,
                $lte: end,
            },
        }).sort({
            date: -1,
        });

        // --------------------------------
        // TOTAL EXPENSE
        // --------------------------------

        const totalExpenses = expenses.reduce(
            (total, expense) =>
                total + Number(expense.amount || 0),
            0
        );

        // --------------------------------
        // TRANSACTIONS
        // --------------------------------

        const transactionCount = expenses.length;

        // --------------------------------
        // NUMBER OF DAYS
        // --------------------------------

        const millisecondsPerDay =
            1000 * 60 * 60 * 24;

        const numberOfDays = Math.max(
            1,
            Math.ceil(
                (end - start) /
                    millisecondsPerDay
            )
        );

        // --------------------------------
        // DAILY AVERAGE
        // --------------------------------

        const dailyAverage =
            totalExpenses / numberOfDays;

        // --------------------------------
        // HIGHEST EXPENSE
        // --------------------------------

        let highestExpense = null;

        if (expenses.length > 0) {
            const highest = expenses.reduce(
                (max, expense) =>
                    Number(expense.amount) >
                    Number(max.amount)
                        ? expense
                        : max
            );

            highestExpense = {
                _id: highest._id,
                amount: Number(highest.amount),
                category: highest.category,
                description:
                    highest.description || "",
                date: highest.date,
            };
        }

        // --------------------------------
        // CATEGORY ANALYSIS
        // --------------------------------

        const categoryMap = {};

        expenses.forEach((expense) => {
            const category =
                expense.category || "Other";

            if (!categoryMap[category]) {
                categoryMap[category] = 0;
            }

            categoryMap[category] += Number(
                expense.amount || 0
            );
        });

        const categoryExpenses = Object.entries(
            categoryMap
        )
            .map(([category, amount]) => ({
                category,
                amount,
                percentage:
                    totalExpenses > 0
                        ? Number(
                              (
                                  (amount /
                                      totalExpenses) *
                                  100
                              ).toFixed(2)
                          )
                        : 0,
            }))
            .sort(
                (a, b) =>
                    b.amount - a.amount
            );

        // --------------------------------
        // DAILY SPENDING
        // --------------------------------

        const dailyMap = {};

        expenses.forEach((expense) => {
            const date = new Date(
                expense.date
            );

            const key =
                date.toISOString().split("T")[0];

            if (!dailyMap[key]) {
                dailyMap[key] = 0;
            }

            dailyMap[key] += Number(
                expense.amount || 0
            );
        });

        const dailyExpenses = Object.entries(
            dailyMap
        )
            .map(([date, amount]) => ({
                date,
                amount,
            }))
            .sort(
                (a, b) =>
                    new Date(a.date) -
                    new Date(b.date)
            );

        // --------------------------------
        // MONTHLY SPENDING
        // --------------------------------

        const monthlyMap = {};

        expenses.forEach((expense) => {
            const date = new Date(
                expense.date
            );

            const key = `${date.getFullYear()}-${String(
                date.getMonth() + 1
            ).padStart(2, "0")}`;

            if (!monthlyMap[key]) {
                monthlyMap[key] = {
                    month: key,
                    amount: 0,
                };
            }

            monthlyMap[key].amount += Number(
                expense.amount || 0
            );
        });

        const monthlyExpenses = Object.values(
            monthlyMap
        ).sort((a, b) =>
            a.month.localeCompare(b.month)
        );

        // --------------------------------
        // TOP EXPENSES
        // --------------------------------

        const topExpenses = [...expenses]
            .sort(
                (a, b) =>
                    Number(b.amount) -
                    Number(a.amount)
            )
            .slice(0, 5)
            .map((expense) => ({
                _id: expense._id,
                amount: Number(
                    expense.amount
                ),
                category:
                    expense.category,
                description:
                    expense.description || "",
                date: expense.date,
            }));

        // --------------------------------
        // SALARY
        // --------------------------------

        const salary = Number(
            user.salary || 0
        );

        // --------------------------------
        // SAVINGS
        // --------------------------------

        const savings =
            salary - totalExpenses;

        const savingsPercentage =
            salary > 0
                ? (savings / salary) * 100
                : 0;

        // --------------------------------
        // HIGHEST CATEGORY
        // --------------------------------

        const highestCategory =
            categoryExpenses.length > 0
                ? categoryExpenses[0]
                : null;

        // --------------------------------
        // INSIGHTS
        // --------------------------------

        const insights = [];

        if (highestCategory) {
            insights.push({
                type: "category",
                title: "Highest Spending Category",
                message: `${highestCategory.category} is your highest spending category with ${highestCategory.percentage}% of your total expenses.`,
            });
        }

        if (salary > 0) {
            if (savings > 0) {
                insights.push({
                    type: "savings",
                    title: "Savings",
                    message: `You have saved ₹${Math.round(
                        savings
                    ).toLocaleString(
                        "en-IN"
                    )} from your salary during this period.`,
                });
            } else {
                insights.push({
                    type: "warning",
                    title: "Spending Alert",
                    message:
                        "Your expenses have reached or exceeded your salary for this period.",
                });
            }
        }

        if (dailyAverage > 0) {
            insights.push({
                type: "average",
                title: "Daily Average",
                message: `Your average spending is ₹${Math.round(
                    dailyAverage
                ).toLocaleString(
                    "en-IN"
                )} per day.`,
            });
        }

        if (highestExpense) {
            insights.push({
                type: "expense",
                title: "Largest Transaction",
                message: `Your largest transaction was ₹${Number(
                    highestExpense.amount
                ).toLocaleString(
                    "en-IN"
                )} for ${highestExpense.category}.`,
            });
        }

        // --------------------------------
        // RESPONSE
        // --------------------------------

        return res.status(200).json({
            period,

            dateRange: {
                start,
                end,
            },

            user: {
                username: user.username,
            },

            salary,

            totalExpenses,

            transactionCount,

            numberOfDays,

            dailyAverage: Number(
                dailyAverage.toFixed(2)
            ),

            highestExpense,

            highestCategory,

            savings,

            savingsPercentage: Number(
                savingsPercentage.toFixed(2)
            ),

            categoryExpenses,

            dailyExpenses,

            monthlyExpenses,

            topExpenses,

            insights,
        });
    } catch (error) {
        console.error(
            "Analytics error:",
            error
        );

        return res.status(500).json({
            message:
                "Failed to fetch analytics data",
            error: error.message,
        });
    }
};