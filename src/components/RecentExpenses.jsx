import { useMemo } from "react";
import { useTransactions } from "../context/TransactionContext";
import TransactionItem from "./TransactionItem";

// Shows the 6 most recent transactions on the dashboard.
// The full list is on the Expenses page.

export default function RecentExpenses({ onViewAll }) {
  const { transactions } = useTransactions();

  // Sort by date descending, take the first 6
  const recent = useMemo(() => {
    return [...transactions]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 6);
  }, [transactions]);

  return (
    <div style={s.card}>
      <div style={s.header}>
        <h3 style={s.heading}>Recent Expenses</h3>
        <button style={s.viewAll} onClick={onViewAll}>View all</button>
      </div>

      {recent.length === 0 ? (
        <p style={{ fontSize: 13, color: "#555E78", textAlign: "center", paddingTop: 32 }}>
          No transactions yet.
        </p>
      ) : (
        <div>
          {recent.map((t) => (
            <TransactionItem key={t.id} transaction={t} />
          ))}
        </div>
      )}
    </div>
  );
}

const s = {
  card: {
    background: "#181C27",
    border: "1px solid #252A3A",
    borderRadius: 12,
    padding: "22px 24px",
    flex: 1,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  heading: {
    fontSize: 15,
    fontWeight: 600,
    color: "#F0F2F8",
  },
  viewAll: {
    background: "none",
    border: "none",
    color: "#6C8EFF",
    fontSize: 12,
    fontWeight: 500,
  },
};
