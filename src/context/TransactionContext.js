import { createContext, useContext, useReducer, useEffect } from "react";
import { SEED_TRANSACTIONS } from "../utils/constants";
import { generateId } from "../utils/helpers";

// ── 1. Create the context ────────────────────────────────────────────────────
// This is what components import to read or update transactions.
const TransactionContext = createContext(null);

// ── 2. Reducer — handles all state changes ───────────────────────────────────
// A reducer is a function: (currentState, action) → newState
// Instead of many useState calls, all transaction logic lives here.
function reducer(state, action) {
  switch (action.type) {

    case "ADD": {
      const newTransaction = { ...action.payload, id: generateId() };
      const updated = [newTransaction, ...state];
      localStorage.setItem("transactions", JSON.stringify(updated));
      return updated;
    }

    case "DELETE": {
      const updated = state.filter((t) => t.id !== action.payload);
      localStorage.setItem("transactions", JSON.stringify(updated));
      return updated;
    }

    default:
      return state;
  }
}

// ── 3. Initial state — load from localStorage or use seed data ───────────────
function getInitialState() {
  try {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : SEED_TRANSACTIONS;
  } catch {
    return SEED_TRANSACTIONS;
  }
}

// ── 4. Provider — wraps the app, makes state available to all children ───────
export function TransactionProvider({ children }) {
  const [transactions, dispatch] = useReducer(reducer, getInitialState());

  function addTransaction(data) {
    dispatch({ type: "ADD", payload: data });
  }

  function deleteTransaction(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction, deleteTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
}

// ── 5. Custom hook — clean way to consume the context ────────────────────────
// Instead of importing useContext + TransactionContext everywhere,
// components just call: const { transactions, addTransaction } = useTransactions()
export function useTransactions() {
  const ctx = useContext(TransactionContext);
  if (!ctx) throw new Error("useTransactions must be used inside TransactionProvider");
  return ctx;
}
