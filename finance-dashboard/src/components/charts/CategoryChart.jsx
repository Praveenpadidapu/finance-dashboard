import { PieChart, Pie, Tooltip, Cell } from "recharts";

const COLORS = ["#4f46e5", "#22c55e", "#f59e0b", "#ef4444"];

export default function CategoryChart({ data }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="mb-2 font-semibold">Spending Breakdown</h2>

      <PieChart width={400} height={250}>
        <Pie data={data} dataKey="amount" nameKey="category">
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
}