import { create } from "zustand";

const savedTransactions =
  JSON.parse(localStorage.getItem("transactions")) || [
    { id: 1, type: "income", amount: 5000, category: "Salary", date: "2026-04-01" },
    { id: 2, type: "expense", amount: 1000, category: "Food", date: "2026-04-02" },
  ];

export const useStore = create((set) => ({
  transactions: savedTransactions,

  role: "viewer",
  darkMode: false,

  setRole: (role) => set({ role }),

  toggleDarkMode: () =>
    set((state) => ({ darkMode: !state.darkMode })),

  addTransaction: (tx) =>
    set((state) => {
      const updated = [...state.transactions, tx];
      localStorage.setItem("transactions", JSON.stringify(updated));
      return { transactions: updated };
    }),

  deleteTransaction: (id) =>
    set((state) => {
      const updated = state.transactions.filter((t) => t.id !== id);
      localStorage.setItem("transactions", JSON.stringify(updated));
      return { transactions: updated };
    }),
}));
