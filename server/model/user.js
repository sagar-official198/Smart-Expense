import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },
        balance: {
            type: Number,
            required: true,
        },
        salary: {
            type: Number,
            required: true,
        },
        totalexpence: {
            type: Number,
            required: true,
        },
        savings: {
            type: Number,
            required: true,
        }
    },
    { timestamps: true }
)
const User = mongoose.model("User", userSchema);
export default User;