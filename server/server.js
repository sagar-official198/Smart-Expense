import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import salaryRoutes from "./routes/salary.js";
import dashboardRoutes from "./routes/dashboard.js";
import analyticsRoutes from "./routes/analytics.js";

dotenv.config();

const app = express();

// =========== Middleware ===========

app.use(express.json());

app.use(
    cors({
        origin: true,
        credentials: true,
    })
);

app.use(cookieParser());

// =========== Routes ===========

app.use("/api/auth", authRoutes);

app.use("/api/expenses", expenseRoutes);

app.use("/api/user/salary", salaryRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/analytics", analyticsRoutes);


// =========== Test Route ===========

app.get("/", (req, res) => {
    res.json({
        message: "Smart Expense API is running",
    });
});

// =========== Database ===========

connectDB();

// =========== Server ===========

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});