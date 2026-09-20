import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            require: true,
            trim: true
        },
        email: {
            type: String,
            require: true,
            trim: true,
            unique: true
        },
        password: {
            type: String,
            require: true,
            trim: true,
        },
    },
    { timestamps: true }
)
const User = mongoose.model("User", userSchema);
export default User;