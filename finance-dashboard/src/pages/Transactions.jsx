import { useStore } from "../store/useStore";
import { useState } from "react";

export default function Transactions() {
    const {
        transactions,
        deleteTransaction,
        role,
        setRole,
        addTransaction,
    } = useStore();

    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("");
    const [sort, setSort] = useState("");
    const [showModal, setShowModal] = useState(false);

    const [form, setForm] = useState({
        amount: "",
        category: "",
        type: "expense",
        date: "",
    });

    // 🔹 Filter
    const filtered = transactions.filter((t) => {
        return (
            t.category.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (filter === "" || t.type === filter)
        );
    });

    // 🔹 Sort
    const sorted = [...filtered].sort((a, b) => {
        if (sort === "amount") return b.amount - a.amount;
        if (sort === "date") return new Date(b.date) - new Date(a.date);
        return 0;
    });

    // 🔹 Export CSV
    const exportCSV = () => {
        const csv = [
            ["Date", "Category", "Type", "Amount"],
            ...transactions.map((t) => [
                t.date,
                t.category,
                t.type,
                t.amount,
            ]),
        ]
            .map((row) => row.join(","))
            .join("\n");

        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "transactions.csv";
        a.click();
    };

    return (
        <div className="p-6 space-y-6 bg-gray-50 dark:bg-gray-900 text-black dark:text-white min-h-screen">

            {/* Header */}
            <div className="flex flex-wrap justify-between items-center gap-4">
                <h1 className="text-2xl font-bold">Transactions</h1>

                <div className="flex gap-2 flex-wrap">
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}


                        className="border p-2 rounded bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700"
                    >
                        <option value="viewer">Viewer</option>
                        <option value="admin">Admin</option>
                    </select>

                    {role === "admin" && (
                        <button
                            onClick={() => setShowModal(true)}
                            className="bg-indigo-500 text-white px-4 py-2 rounded"
                        >
                            + Add
                        </button>
                    )}

                    <button
                        onClick={exportCSV}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                        Export
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="flex gap-3 flex-wrap">
                <input
                    type="text"
                    placeholder="Search..."

                    className="border p-2 rounded bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <select
                    onChange={(e) => setFilter(e.target.value)}

                    className="border p-2 rounded bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700"
                >
                    <option value="">All</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>

                <select
                    onChange={(e) => setSort(e.target.value)}
                    className="border p-2 rounded bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700"
                >
                    <option value="">Sort</option>
                    <option value="amount">Amount</option>
                    <option value="date">Date</option>
                </select>
            </div>

            {/* Table */}
            <table className="w-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow">
                <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                    <tr>
                        <th className="p-4 text-left">Date</th>
                        <th className="p-4 text-left">Category</th>
                        <th className="p-4 text-left">Type</th>
                        <th className="p-4 text-left">Amount</th>
                        {role === "admin" && <th className="p-4 text-left">Action</th>}
                    </tr>
                </thead>

                <tbody>
                    {sorted.map((t) => (
                        <tr
                            key={t.id}
                            className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                        >
                            <td className="p-4">{t.date}</td>
                            <td className="p-4 font-medium">{t.category}</td>
                            <td className="p-4 capitalize">{t.type}</td>
                            <td className="p-4 font-semibold">₹ {t.amount}</td>

                            {role === "admin" && (
                                <td className="p-4">
                                    <button
                                        onClick={() => deleteTransaction(t.id)}
                                        className="text-red-500 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
                    <div className="bg-white dark:bg-gray-900 text-black dark:text-white p-6 rounded-xl shadow space-y-4 w-80">

                        {/* Amount */}
                        <input
                            type="number"
                            placeholder="Amount"
                            className="border p-2 w-full rounded 
      bg-white text-black 
      dark:bg-gray-800 dark:text-white 
      dark:border-gray-700"
                            onChange={(e) =>
                                setForm({ ...form, amount: Number(e.target.value) })
                            }
                        />

                        {/* Category */}
                        <input
                            type="text"
                            placeholder="Category"
                            className="border p-2 w-full rounded 
      bg-white text-black 
      dark:bg-gray-800 dark:text-white 
      dark:border-gray-700"
                            onChange={(e) =>
                                setForm({ ...form, category: e.target.value })
                            }
                        />

                        {/* Date */}
                        <input
                            type="date"
                            className="border p-2 w-full rounded 
      bg-white text-black 
      dark:bg-gray-800 dark:text-white 
      dark:border-gray-700"
                            onChange={(e) =>
                                setForm({ ...form, date: e.target.value })
                            }
                        />

                        {/* Type */}
                        <select
                            className="border p-2 w-full rounded 
      bg-white text-black 
      dark:bg-gray-800 dark:text-white 
      dark:border-gray-700"
                            onChange={(e) =>
                                setForm({ ...form, type: e.target.value })
                            }
                        >
                            <option value="expense">Expense</option>
                            <option value="income">Income</option>
                        </select>

                        {/* Buttons */}
                        <div className="flex justify-between">
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-gray-500 dark:text-gray-300"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={() => {
                                    addTransaction({ ...form, id: Date.now() });
                                    setShowModal(false);
                                }}
                                className="bg-indigo-500 text-white px-4 py-2 rounded"
                            >
                                Add
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}