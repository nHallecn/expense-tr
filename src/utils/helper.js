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