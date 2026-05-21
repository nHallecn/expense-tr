import { useState, useMemo } from "react";
import { useTransactions } from "../context/TransactionContext";
import { CATEGORIES } from "../utils/constants";
import TransactionItem from "../components/TransactionItem";

// Full list of all transactions with filter controls.
// Props:
//   onAddClick — opens the Add Transaction modal

const TYPE_FILTERS = ["All", "Income", "Expense"];

export default function ExpensesPage({ onAddClick }) {
  const { transactions } = useTransactions();
  const [typeFilter, setTypeFilter]     = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Apply filters — useMemo so it only recalculates when inputs change
  const filtered = useMemo(() => {
    return [...transactions]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .filter((t) => {
        const matchType = typeFilter === "All" || t.type === typeFilter.toLowerCase();
        const matchCat  = categoryFilter === "All" || t.category === categoryFilter;
        return matchType && matchCat;
      });
  }, [transactions, typeFilter, categoryFilter]);

  return (
    <div>
      {/* Page header */}
      <div style={s.header}>
        <h2 style={s.title}>All Transactions</h2>
        <button style={s.addBtn} onClick={onAddClick}>+ Add New</button>
      </div>

      {/* Filter bar */}
      <div style={s.filterBar}>
        {/* Type filter */}
        <div style={s.filterGroup}>
          {TYPE_FILTERS.map((f) => (
            <button
              key={f}
              style={{ ...s.filterBtn, ...(typeFilter === f ? s.filterActive : {}) }}
              onClick={() => setTypeFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Category filter */}
        <select
          style={s.select}
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="All">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c.name} value={c.name}>{c.icon} {c.name}</option>
          ))}
        </select>
      </div>

      {/* Transaction list */}
      <div style={s.card}>
        {filtered.length === 0 ? (
          <p style={{ fontSize: 13, color: "#555E78", textAlign: "center", padding: "40px 0" }}>
            No transactions match your filters.
          </p>
        ) : (
          filtered.map((t) => <TransactionItem key={t.id} transaction={t} />)
        )}
      </div>

    </div>
  );
}

const s = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    color: "#F0F2F8",
  },
  addBtn: {
    padding: "9px 18px",
    background: "#6C8EFF",
    border: "none",
    borderRadius: 8,
    color: "#fff",
    fontSize: 13,
    fontWeight: 600,
  },
  filterBar: {
    display: "flex",
    gap: 12,
    marginBottom: 16,
    flexWrap: "wrap",
    alignItems: "center",
  },
  filterGroup: {
    display: "flex",
    gap: 4,
    background: "#181C27",
    border: "1px solid #252A3A",
    borderRadius: 8,
    padding: 4,
  },
  filterBtn: {
    padding: "6px 14px",
    borderRadius: 6,
    border: "none",
    background: "none",
    color: "#555E78",
    fontSize: 12,
    fontWeight: 500,
    fontFamily: "'Sora', sans-serif",
  },
  filterActive: {
    background: "#6C8EFF",
    color: "#fff",
  },
  select: {
    padding: "8px 12px",
    background: "#181C27",
    border: "1px solid #252A3A",
    borderRadius: 8,
    color: "#F0F2F8",
    fontSize: 12,
    fontFamily: "'Sora', sans-serif",
    outline: "none",
  },
  card: {
    background: "#181C27",
    border: "1px solid #252A3A",
    borderRadius: 12,
    padding: "8px 20px",
  },
};
