import User from "../model/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        console.log("Signup request received:", {
            username,
            email,
        });

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Username, email and password are required",
            });
        }

        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is missing");

            return res.status(500).json({
                message: "JWT_SECRET is missing on server",
            });
        }

        const existingUser = await User.findOne({
            email: email.toLowerCase().trim(),
        });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username: username.trim(),
            email: email.toLowerCase().trim(),
            password: hashedPassword,

            // Initial financial values
            balance: 0,
            salary: 0,
            totalexpence: 0,
            savings: 0,
        });

        await newUser.save();

        const token = jwt.sign(
            {
                id: newUser._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h",
            }
        );

        return res.status(201).json({
            message: "User registered successfully",
            token,
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
            },
        });
    } catch (error) {
        console.error("========== SIGNUP ERROR ==========");
        console.error(error);
        console.error("=================================");

        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};