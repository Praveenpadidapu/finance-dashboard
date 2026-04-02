import { useStore } from "../store/useStore";
import SummaryCard from "../components/SummaryCard";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function Dashboard() {
  const { transactions, role, setRole } = useStore();

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const balance = income - expense;

  const currentMonth = new Date().getMonth();

  const currentExpense = transactions
    .filter(
      (t) =>
        t.type === "expense" &&
        new Date(t.date).getMonth() === currentMonth
    )
    .reduce((a, b) => a + b.amount, 0);

  const prevExpense = transactions
    .filter(
      (t) =>
        t.type === "expense" &&
        new Date(t.date).getMonth() === currentMonth - 1
    )
    .reduce((a, b) => a + b.amount, 0);

  const COLORS = ["#4f46e5", "#22c55e", "#f59e0b", "#ef4444"];
  const categoryData = Object.values(
    transactions
      .filter((t) => t.type === "expense")
      .reduce((acc, curr) => {
        if (!acc[curr.category]) {
          acc[curr.category] = { name: curr.category, value: 0 };
        }
        acc[curr.category].value += curr.amount;
        return acc;
      }, {})
  );

  return (
    <div className="p-6 space-y-6 bg-gray-50 dark:bg-gray-900 text-black dark:text-white min-h-screen">

      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Dashboard</h1>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border p-2 rounded bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700"
        >
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <SummaryCard title="Balance" value={balance} />
        <SummaryCard title="Income" value={income} />
        <SummaryCard title="Expenses" value={expense} />
      </div>

      <div className="bg-indigo-500 text-white p-4 rounded">
        This month ₹{currentExpense} vs last month ₹{prevExpense}
      </div>

      <div className="grid grid-cols-2 gap-4">

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={transactions}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line dataKey="amount" stroke="#4f46e5" />
          </LineChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {categoryData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>

      </div>
    </div>
  );
}