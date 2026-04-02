import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function BalanceChart({ data }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="mb-2 font-semibold">Balance Trend</h2>

      <LineChart width={400} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="balance"
          stroke="#4f46e5"
          strokeWidth={2}
        />
      </LineChart>
    </div>
  );
}