import jwt from "jsonwebtoken";
import User from "../model/user.js";

export const isAuthenticated = async (req, res, next) => {
    try {
        // Get token from cookie OR Authorization header
        const token =
            req.cookies?.token ||
            (req.headers.authorization?.startsWith("Bearer ")
                ? req.headers.authorization.split(" ")[1]
                : null);

        if (!token) {
            return res.status(401).json({
                message: "Not authenticated",
            });
        }

        // Verify JWT
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Find user
        const user = await User.findById(decoded.id).select(
            "-password"
        );

        if (!user) {
            return res.status(401).json({
                message: "User not found",
            });
        }

        // Attach user to request
        req.user = user;

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token",
        });
    }
};