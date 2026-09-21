import Expense from "../model/expense.js";
import { isValidObjectId } from "mongoose";

// Create a new expense
export const createExpense = async (req, res) => {
    try {
        const {
            amount,
            category,
            date,
            description,
        } = req.body;

        // Validate required fields
        if (!amount || !category || !date) {
            return res.status(400).json({
                message: "Amount, category and date are required",
            });
        }

        // Validate amount
        if (Number(amount) <= 0) {
            return res.status(400).json({
                message: "Amount must be greater than 0",
            });
        }

        const expense = await Expense.create({
            userId: req.user._id,
            amount: Number(amount),
            category,
            date,
            description,
        });

        return res.status(201).json({
            message: "Expense created successfully",
            expense,
        });
    } catch (error) {
        console.error("Create expense error:", error);

        return res.status(500).json({
            message: "Failed to create expense",
            error: error.message,
        });
    }
};


// Get all expenses for logged-in user
export const getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({
            userId: req.user._id,
        }).sort({
            date: -1,
        });

        return res.status(200).json({
            expenses,
        });
    } catch (error) {
        console.error("Get expenses error:", error);

        return res.status(500).json({
            message: "Failed to fetch expenses",
            error: error.message,
        });
    }
};


// Get a single expense by ID
export const getExpenseById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return res.status(400).json({
                message: "Invalid expense ID",
            });
        }

        const expense = await Expense.findOne({
            _id: id,
            userId: req.user._id,
        });

        if (!expense) {
            return res.status(404).json({
                message: "Expense not found",
            });
        }

        return res.status(200).json({
            expense,
        });
    } catch (error) {
        console.error("Get expense error:", error);

        return res.status(500).json({
            message: "Failed to fetch expense",
            error: error.message,
        });
    }
};


// Update an expense
export const updateExpense = async (req, res) => {
    try {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return res.status(400).json({
                message: "Invalid expense ID",
            });
        }

        const allowedFields = [
            "amount",
            "category",
            "date",
            "description",
        ];

        const updateData = {};

        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                updateData[field] = req.body[field];
            }
        });

        // Validate amount
        if (
            updateData.amount !== undefined &&
            Number(updateData.amount) <= 0
        ) {
            return res.status(400).json({
                message: "Amount must be greater than 0",
            });
        }

        if (updateData.amount !== undefined) {
            updateData.amount = Number(updateData.amount);
        }

        const expense = await Expense.findOneAndUpdate(
            {
                _id: id,
                userId: req.user._id,
            },
            {
                $set: updateData,
            },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!expense) {
            return res.status(404).json({
                message: "Expense not found",
            });
        }

        return res.status(200).json({
            message: "Expense updated successfully",
            expense,
        });
    } catch (error) {
        console.error("Update expense error:", error);

        return res.status(500).json({
            message: "Failed to update expense",
            error: error.message,
        });
    }
};


// Delete an expense
export const deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return res.status(400).json({
                message: "Invalid expense ID",
            });
        }

        const expense = await Expense.findOneAndDelete({
            _id: id,
            userId: req.user._id,
        });

        if (!expense) {
            return res.status(404).json({
                message: "Expense not found",
            });
        }

        return res.status(200).json({
            message: "Expense deleted successfully",
        });
    } catch (error) {
        console.error("Delete expense error:", error);

        return res.status(500).json({
            message: "Failed to delete expense",
            error: error.message,
        });
    }
};