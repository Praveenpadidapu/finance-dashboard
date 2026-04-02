export default function SummaryCard({ title, value }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow border dark:border-gray-700">
  <p className="text-gray-500 dark:text-gray-400">{title}</p>
  <h2 className="text-xl font-bold text-black dark:text-white">
    ₹ {value}
  </h2>
</div>
  );
}