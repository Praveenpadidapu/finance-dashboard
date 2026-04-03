

export const getBalanceData = (transactions) => {
  let balance = 0;

  return transactions.map((t) => {
    balance += t.type === "income" ? t.amount : -t.amount;

    return {
      date: t.date,
      balance,
    };
  });
};

export const getCategoryData = (transactions) => {
  const map = {};

  transactions.forEach((t) => {
    if (t.type === "expense") {
      map[t.category] = (map[t.category] || 0) + t.amount;
    }
  });

  return Object.keys(map).map((key) => ({
    category: key,
    amount: map[key],
  }));
};
