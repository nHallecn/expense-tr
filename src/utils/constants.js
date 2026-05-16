export const CATEGORIES = [
    { name: "Food & Dining",     color: "#6C8EFF", icon: "🍽️" },
  { name: "Transport",         color: "#3ECF8E", icon: "🚗" },
  { name: "Shopping",          color: "#FFB547", icon: "🛍️" },
  { name: "Bills & Utilities", color: "#A78BFA", icon: "⚡" },
  { name: "Entertainment",     color: "#FF6B6B", icon: "🎬" },
  { name: "Health",            color: "#34D399", icon: "💊" },
  { name: "Salary",            color: "#60A5FA", icon: "💰" },
  { name: "Other",             color: "#94A3B8", icon: "📦" },
];

export const CATEGORY_MAP = Object.fromEntries(
    CATEGORIES.map((c)=>[c.name, c])
);

export const SEED_TRANSACTIONS = [
  { id: "t1", description: "Monthly Salary",    amount: 4300, type: "income",  category: "Salary",            date: "2026-05-01" },
  { id: "t2", description: "Grocery Shopping",  amount: 85.4, type: "expense", category: "Food & Dining",     date: "2026-05-02" },
  { id: "t3", description: "Uber Ride",          amount: 18.2, type: "expense", category: "Transport",         date: "2026-05-04" },
  { id: "t4", description: "Electricity Bill",   amount: 60,   type: "expense", category: "Bills & Utilities", date: "2026-05-06" },
  { id: "t5", description: "Lunch",              amount: 15.5, type: "expense", category: "Food & Dining",     date: "2026-05-08" },
  { id: "t6", description: "Movie Tickets",      amount: 24,   type: "expense", category: "Entertainment",     date: "2026-05-10" },
  { id: "t7", description: "New Shoes",          amount: 89,   type: "expense", category: "Shopping",          date: "2026-05-11" },
  { id: "t8", description: "Doctor Visit",       amount: 45,   type: "expense", category: "Health",            date: "2026-05-12" },
];
