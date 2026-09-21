import { useEffect, useState } from "react";

function Expenses() {
    const [expenses, setExpenses] = useState([]);

    const [formData, setFormData] = useState({
        amount: "",
        category: "",
        date: "",
        description: "",
    });

    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem("Token");

    // Fetch all expenses
    const fetchExpenses = async () => {
        try {
            const response = await fetch(
                "http://localhost:5000/api/expenses",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (response.ok) {
                setExpenses(data.expenses);
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error("Fetch expenses error:", error);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    // Handle input
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Add / Update expense
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !formData.amount ||
            !formData.category ||
            !formData.date
        ) {
            alert("Please fill all required fields");
            return;
        }

        try {
            setLoading(true);

            const url = editingId
                ? `http://localhost:5000/api/expenses/${editingId}`
                : "http://localhost:5000/api/expenses";

            const method = editingId ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                alert(
                    editingId
                        ? "Expense updated successfully"
                        : "Expense added successfully"
                );

                setFormData({
                    amount: "",
                    category: "",
                    date: "",
                    description: "",
                });

                setEditingId(null);

                fetchExpenses();
            } else {
                alert(data.message || "Something went wrong");
            }
        } catch (error) {
            console.error("Expense error:", error);
        } finally {
            setLoading(false);
        }
    };

    // Edit expense
    const handleEdit = (expense) => {
        setEditingId(expense._id);

        setFormData({
            amount: expense.amount,
            category: expense.category,
            date: expense.date.split("T")[0],
            description: expense.description || "",
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    // Delete expense
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this expense?"
        );

        if (!confirmDelete) return;

        try {
            const response = await fetch(
                `http://localhost:5000/api/expenses/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (response.ok) {
                alert("Expense deleted successfully");
                fetchExpenses();
            } else {
                alert(data.message || "Delete failed");
            }
        } catch (error) {
            console.error("Delete error:", error);
        }
    };

    // Cancel edit
    const handleCancelEdit = () => {
        setEditingId(null);

        setFormData({
            amount: "",
            category: "",
            date: "",
            description: "",
        });
    };

    // Calculate total
    const totalExpense = expenses.reduce(
        (total, expense) => total + Number(expense.amount),
        0
    );

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <div className="max-w-6xl mx-auto">

                {/* Heading */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Expenses
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Manage and track your expenses
                    </p>
                </div>

                {/* Summary */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                    <p className="text-gray-500">
                        Total Expenses
                    </p>

                    <h2 className="text-3xl font-bold text-gray-800 mt-1">
                        ₹{totalExpense.toLocaleString("en-IN")}
                    </h2>
                </div>

                {/* Add Expense Form */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">

                    <h2 className="text-xl font-semibold text-gray-800 mb-5">
                        {editingId ? "Edit Expense" : "Add Expense"}
                    </h2>

                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 md:grid-cols-2 gap-5"
                    >

                        {/* Amount */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Amount
                            </label>

                            <input
                                type="number"
                                name="amount"
                                value={formData.amount}
                                onChange={handleChange}
                                placeholder="Enter amount"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Category
                            </label>

                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select Category</option>
                                <option value="Housing">Housing</option>
                                <option value="Food">Food</option>
                                <option value="Transportation">Transportation</option>
                                <option value="Personal">Personal</option>
                                <option value="Investment">Investment</option>
                                <option value="Emergency">Emergency</option>
                                <option value="Savings">Savings</option>
                                <option value="Shopping">Shopping</option>
                                <option value="Bills & Utilities">
                                    Bills & Utilities
                                </option>
                                <option value="Education">Education</option>
                                <option value="Health">Health</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        {/* Date */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Date
                            </label>

                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>

                            <input
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Example: Monthly rent"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="md:col-span-2 flex gap-3">

                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                            >
                                {loading
                                    ? "Saving..."
                                    : editingId
                                        ? "Update Expense"
                                        : "Add Expense"}
                            </button>

                            {editingId && (
                                <button
                                    type="button"
                                    onClick={handleCancelEdit}
                                    className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                            )}

                        </div>
                    </form>
                </div>

                {/* Expense List */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">

                    <div className="p-6 border-b">
                        <h2 className="text-xl font-semibold text-gray-800">
                            All Expenses
                        </h2>
                    </div>

                    {expenses.length === 0 ? (
                        <div className="p-10 text-center text-gray-500">
                            No expenses found.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">

                            <table className="w-full">

                                <thead className="bg-gray-50">

                                    <tr>
                                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                            Date
                                        </th>

                                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                            Category
                                        </th>

                                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                            Description
                                        </th>

                                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                            Amount
                                        </th>

                                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                            Action
                                        </th>
                                    </tr>

                                </thead>

                                <tbody>

                                    {expenses.map((expense) => (
                                        <tr
                                            key={expense._id}
                                            className="border-t hover:bg-gray-50"
                                        >

                                            <td className="px-6 py-4 text-gray-700">
                                                {new Date(
                                                    expense.date
                                                ).toLocaleDateString("en-IN")}
                                            </td>

                                            <td className="px-6 py-4">
                                                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                                                    {expense.category}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4 text-gray-600">
                                                {expense.description || "-"}
                                            </td>

                                            <td className="px-6 py-4 font-semibold text-gray-800">
                                                ₹{Number(
                                                    expense.amount
                                                ).toLocaleString("en-IN")}
                                            </td>

                                            <td className="px-6 py-4">

                                                <div className="flex gap-2">

                                                    <button
                                                        onClick={() =>
                                                            handleEdit(expense)
                                                        }
                                                        className="text-blue-600 hover:text-blue-800 font-medium"
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            handleDelete(expense._id)
                                                        }
                                                        className="text-red-600 hover:text-red-800 font-medium"
                                                    >
                                                        Delete
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>
                                    ))}

                                </tbody>

                            </table>

                        </div>
                    )}

                </div>

            </div>
        </div>
    );
}

export default Expenses;