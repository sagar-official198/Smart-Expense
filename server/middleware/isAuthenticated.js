import jwt from "jsonwebtoken";
import User from "../model/user.js";

export const isAuthenticated = async (req, res, next) => {
    try {
        // Prefer Authorization header
        let token = null;

        const authHeader = req.headers.authorization;

        if (
            authHeader &&
            authHeader.startsWith("Bearer ")
        ) {
            token = authHeader.split(" ")[1];
        }

        // Fallback to cookie
        if (!token && req.cookies?.token) {
            token = req.cookies.token;
        }

        if (!token) {
            return res.status(401).json({
                message: "Not authenticated",
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await User.findById(
            decoded.id
        ).select("-password");

        if (!user) {
            return res.status(401).json({
                message: "User not found",
            });
        }

        req.user = user;

        next();
    } catch (error) {
        console.error(
            "Authentication error:",
            error
        );

        return res.status(401).json({
            message: "Invalid or expired token",
        });
    }
};