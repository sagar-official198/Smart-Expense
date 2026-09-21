import User from "../model/user.js";

// =========================
// GET SALARY
// =========================
export const getSalary = async (req, res) => {
    try {
        const user = await User.findById(
            req.user._id
        ).select("salary");

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        return res.status(200).json({
            salary: user.salary ?? 0,
        });

    } catch (error) {
        console.error("Get salary error:", error);

        return res.status(500).json({
            message: "Failed to fetch salary",
        });
    }
};


// =========================
// UPDATE SALARY
// =========================
export const updateSalary = async (req, res) => {
    try {
        const { salary } = req.body;

        // Check salary
        if (
            salary === undefined ||
            salary === null ||
            salary === ""
        ) {
            return res.status(400).json({
                message: "Salary is required",
            });
        }

        // Convert to number
        const salaryNumber = Number(salary);

        // Validate salary
        if (
            !Number.isFinite(salaryNumber) ||
            salaryNumber < 0
        ) {
            return res.status(400).json({
                message: "Please enter a valid salary",
            });
        }

        // Update MongoDB
        const user = await User.findByIdAndUpdate(
            req.user._id,
            {
                salary: salaryNumber,
            },
            {
                returnDocument: "after",
                runValidators: true,
            }
        ).select("salary");

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        return res.status(200).json({
            message: "Salary updated successfully",
            salary: user.salary,
        });

    } catch (error) {
        console.error("Update salary error:", error);

        return res.status(500).json({
            message: "Failed to update salary",
        });
    }
};