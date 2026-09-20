import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

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