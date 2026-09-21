import Expense from "../model/expense.js";
import User from "../model/user.js";

export const getDashboard = async (req, res) => {
    try {
        const userId = req.user._id;

        // Get user salary
        const user = await User.findById(userId).select(
            "username salary"
        );

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        // Get all expenses of logged-in user
        const expenses = await Expense.find({
            userId,
        }).sort({
            date: -1,
        });

        // -----------------------------
        // TOTAL EXPENSE
        // -----------------------------

        const totalExpenses = expenses.reduce(
            (total, expense) => {
                return total + Number(expense.amount || 0);
            },
            0
        );

        // -----------------------------
        // BALANCE
        // -----------------------------

        const salary = Number(user.salary || 0);

        const balance = salary - totalExpenses;

        // -----------------------------
        // SAVINGS
        // -----------------------------

        const savings = Math.max(balance, 0);

        // -----------------------------
        // CATEGORY EXPENSES
        // -----------------------------

        const categoryMap = {};

        expenses.forEach((expense) => {
            const category = expense.category || "Other";

            if (!categoryMap[category]) {
                categoryMap[category] = 0;
            }

            categoryMap[category] += Number(
                expense.amount || 0
            );
        });

        const categoryExpenses = Object.entries(
            categoryMap
        ).map(([category, amount]) => ({
            category,
            amount,
        }));

        // Sort highest spending category first
        categoryExpenses.sort(
            (a, b) => b.amount - a.amount
        );

        // -----------------------------
        // MONTHLY EXPENSES
        // -----------------------------

        const monthlyMap = {};

        expenses.forEach((expense) => {
            const date = new Date(expense.date);

            const month = date.toLocaleString("en-US", {
                month: "short",
                year: "numeric",
            });

            if (!monthlyMap[month]) {
                monthlyMap[month] = 0;
            }

            monthlyMap[month] += Number(
                expense.amount || 0
            );
        });

        const monthlyExpenses = Object.entries(
            monthlyMap
        ).map(([month, amount]) => ({
            month,
            amount,
        }));

        // -----------------------------
        // RECENT EXPENSES
        // -----------------------------

        const recentExpenses = expenses
            .slice(0, 5)
            .map((expense) => ({
                _id: expense._id,
                amount: expense.amount,
                category: expense.category,
                date: expense.date,
                description: expense.description,
            }));

        // -----------------------------
        // HIGHEST SPENDING CATEGORY
        // -----------------------------

        const highestCategory =
            categoryExpenses.length > 0
                ? categoryExpenses[0]
                : null;

        // -----------------------------
        // SAVINGS PERCENTAGE
        // -----------------------------

        let savingsPercentage = 0;

        if (salary > 0) {
            savingsPercentage =
                (savings / salary) * 100;
        }

        // -----------------------------
        // RESPONSE
        // -----------------------------

        return res.status(200).json({
            user: {
                username: user.username,
            },

            salary,

            totalExpenses,

            balance,

            savings,

            savingsPercentage: Number(
                savingsPercentage.toFixed(2)
            ),

            highestCategory,

            categoryExpenses,

            monthlyExpenses,

            recentExpenses,

            totalExpenseCount: expenses.length,
        });
    } catch (error) {
        console.error(
            "Dashboard error:",
            error
        );

        return res.status(500).json({
            message: "Failed to fetch dashboard data",
            error: error.message,
        });
    }
};