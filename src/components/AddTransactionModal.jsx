import { useState, useEffect } from "react";
import { useTransactions } from "../context/TransactionContext";
import { CATEGORIES } from "../utils/constants";
import { todayString } from "../utils/helpers";

// Modal form to add a new transaction.
// Props:
//   onClose — called when the user dismisses the modal

const EMPTY_FORM = {
  description: "",
  amount: "",
  type: "expense",
  category: "Food & Dining",
  date: todayString(),
};

export default function AddTransactionModal({ onClose }) {
  const { addTransaction } = useTransactions();
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Generic change handler — works for all inputs and selects
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // clear error on change
  }

  function validate() {
    const errs = {};
    if (!form.description.trim()) errs.description = "Description is required.";
    if (!form.amount || Number(form.amount) <= 0) errs.amount = "Enter a valid amount.";
    return errs;
  }

  function handleSubmit() {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    addTransaction({
      description: form.description.trim(),
      amount:      parseFloat(form.amount),
      type:        form.type,
      category:    form.category,
      date:        form.date,
    });

    onClose();
  }

  return (
    <div style={s.overlay} onClick={onClose}>
      <div style={s.modal} onClick={(e) => e.stopPropagation()}>

        <div style={s.header}>
          <h2 style={s.title}>Add Transaction</h2>
          <button style={s.closeBtn} onClick={onClose}>✕</button>
        </div>

        {/* Type toggle — Income or Expense */}
        <div style={s.typeRow}>
          {["expense", "income"].map((t) => (
            <button
              key={t}
              style={{
                ...s.typeBtn,
                ...(form.type === t ? (t === "expense" ? s.typeExpense : s.typeIncome) : {}),
              }}
              onClick={() => setForm((p) => ({ ...p, type: t }))}
            >
              {t === "expense" ? "↓ Expense" : "↑ Income"}
            </button>
          ))}
        </div>

        {/* Description */}
        <div style={s.field}>
          <label style={s.label}>Description</label>
          <input
            style={{ ...s.input, ...(errors.description ? s.inputError : {}) }}
            name="description"
            placeholder="e.g. Grocery Shopping"
            value={form.description}
            onChange={handleChange}
          />
          {errors.description && <p style={s.error}>{errors.description}</p>}
        </div>

        {/* Amount */}
        <div style={s.field}>
          <label style={s.label}>Amount ($)</label>
          <input
            style={{ ...s.input, ...(errors.amount ? s.inputError : {}) }}
            name="amount"
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={form.amount}
            onChange={handleChange}
          />
          {errors.amount && <p style={s.error}>{errors.amount}</p>}
        </div>

        {/* Category */}
        <div style={s.field}>
          <label style={s.label}>Category</label>
          <select style={s.input} name="category" value={form.category} onChange={handleChange}>
            {CATEGORIES.map((c) => (
              <option key={c.name} value={c.name}>{c.icon} {c.name}</option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div style={s.field}>
          <label style={s.label}>Date</label>
          <input
            style={s.input}
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
          />
        </div>

        {/* Actions */}
        <div style={s.actions}>
          <button style={s.cancelBtn} onClick={onClose}>Cancel</button>
          <button style={s.submitBtn} onClick={handleSubmit}>Add Transaction</button>
        </div>

      </div>
    </div>
  );
}

const s = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 200,
    backdropFilter: "blur(4px)",
    animation: "fadeIn 0.2s ease",
  },
  modal: {
    background: "#181C27",
    border: "1px solid #252A3A",
    borderRadius: 16,
    padding: "28px",
    width: "100%",
    maxWidth: 440,
    animation: "fadeUp 0.25s ease",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: 600,
    color: "#F0F2F8",
  },
  closeBtn: {
    background: "#1E2333",
    border: "none",
    color: "#8890AA",
    width: 30, height: 30,
    borderRadius: "50%",
    fontSize: 13,
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  typeRow: {
    display: "flex",
    gap: 8,
    marginBottom: 20,
  },
  typeBtn: {
    flex: 1,
    padding: "10px",
    borderRadius: 8,
    border: "1.5px solid #252A3A",
    background: "none",
    color: "#555E78",
    fontSize: 13,
    fontWeight: 500,
    transition: "all 0.15s",
  },
  typeExpense: {
    borderColor: "#FF6B6B",
    color: "#FF6B6B",
    background: "#FF6B6B11",
  },
  typeIncome: {
    borderColor: "#3ECF8E",
    color: "#3ECF8E",
    background: "#3ECF8E11",
  },
  field: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    color: "#8890AA",
    display: "block",
    marginBottom: 6,
    fontWeight: 500,
  },
  input: {
    width: "100%",
    padding: "10px 14px",
    background: "#0F1117",
    border: "1.5px solid #252A3A",
    borderRadius: 8,
    color: "#F0F2F8",
    fontSize: 14,
    fontFamily: "'Sora', sans-serif",
    outline: "none",
  },
  inputError: {
    borderColor: "#FF6B6B",
  },
  error: {
    fontSize: 11,
    color: "#FF6B6B",
    marginTop: 4,
  },
  actions: {
    display: "flex",
    gap: 10,
    marginTop: 24,
  },
  cancelBtn: {
    flex: 1,
    padding: "11px",
    background: "none",
    border: "1.5px solid #252A3A",
    borderRadius: 8,
    color: "#8890AA",
    fontSize: 13,
    fontWeight: 500,
  },
  submitBtn: {
    flex: 2,
    padding: "11px",
    background: "#6C8EFF",
    border: "none",
    borderRadius: 8,
    color: "#fff",
    fontSize: 13,
    fontWeight: 600,
  },
};
