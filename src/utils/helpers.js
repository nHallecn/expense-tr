export function formatCurrency(amount) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XAF",
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateStr) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function todayString() {
  return new Date().toISOString().split("T")[0];
}

export function generateId() {
  return Math.random().toString(36).slice(2, 9);
}

export function computeTotals(transactions) {
  return transactions.reduce(
    (acc, t) => {
      if (t.type === "income")  acc.income  += t.amount;
      else                       acc.expenses += t.amount;
      return acc;
    },
    { income: 0, expenses: 0 }
  );
}

export function buildChartData(transactions) {
  const map = {};
  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      map[t.category] = (map[t.category] || 0) + t.amount;
    });
  return Object.entries(map).map(([name, value]) => ({ name, value }));
}
