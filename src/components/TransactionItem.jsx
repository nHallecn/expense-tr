import { useState } from "react";
import { useTransactions } from "../context/TransactionContext";
import { formatCurrency, formatDate } from "../utils/helpers";
import { CATEGORY_MAP } from "../utils/constants";

// A single transaction row.
// Shows category icon, description, date, and amount.
// Has a delete button with a confirmation step.

export default function TransactionItem({ transaction }) {
  const { deleteTransaction } = useTransactions();
  const [confirming, setConfirming] = useState(false);

  const cat = CATEGORY_MAP[transaction.category] || CATEGORY_MAP["Other"];
  const isExpense = transaction.type === "expense";

  function handleDelete() {
    if (!confirming) {
      setConfirming(true);       // first click: show confirm state
      return;
    }
    deleteTransaction(transaction.id); // second click: actually delete
  }

  return (
    <div style={s.row}>
      {/* Category icon */}
      <div style={{ ...s.icon, background: cat.color + "22" }}>
        <span style={{ fontSize: 18 }}>{cat.icon}</span>
      </div>

      {/* Description + date */}
      <div style={s.info}>
        <p style={s.desc}>{transaction.description}</p>
        <p style={s.date}>{formatDate(transaction.date)}</p>
      </div>

      {/* Amount */}
      <p style={{ ...s.amount, color: isExpense ? "#FF6B6B" : "#3ECF8E" }}>
        {isExpense ? "−" : "+"}{formatCurrency(transaction.amount)}
      </p>

      {/* Delete button */}
      <button
        style={{ ...s.delBtn, ...(confirming ? s.delConfirm : {}) }}
        onClick={handleDelete}
        onBlur={() => setConfirming(false)}  // cancel if user clicks away
        title={confirming ? "Click again to confirm" : "Delete"}
      >
        {confirming ? "Sure?" : "✕"}
      </button>
    </div>
  );
}

const s = {
  row: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "12px 0",
    borderBottom: "1px solid #1E2333",
    animation: "fadeUp 0.3s ease both",
  },
  icon: {
    width: 40, height: 40,
    borderRadius: 10,
    display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0,
  },
  info: {
    flex: 1,
    minWidth: 0,
  },
  desc: {
    fontSize: 13,
    fontWeight: 500,
    color: "#F0F2F8",
    marginBottom: 2,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  date: {
    fontSize: 11,
    color: "#555E78",
  },
  amount: {
    fontSize: 13,
    fontWeight: 600,
    fontFamily: "'JetBrains Mono', monospace",
    whiteSpace: "nowrap",
  },
  delBtn: {
    background: "none",
    border: "none",
    color: "#555E78",
    fontSize: 12,
    padding: "4px 6px",
    borderRadius: 6,
    transition: "all 0.15s",
    flexShrink: 0,
  },
  delConfirm: {
    background: "#FF6B6B22",
    color: "#FF6B6B",
    fontWeight: 600,
  },
};
