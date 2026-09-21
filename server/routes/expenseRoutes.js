import express from "express";

import {
    createExpense,
    getExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense,
} from "../controllers/expense.js";

import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();

router.use(isAuthenticated);

router.post("/", createExpense);

router.get("/", getExpenses);

router.get("/:id", getExpenseById);

router.put("/:id", updateExpense);

router.delete("/:id", deleteExpense);

export default router;