import { useMemo } from "react";
import { useTransactions } from "../context/TransactionContext";
import { computeTotals } from "../utils/helpers";
import StatCard from "../components/StatCard";
import DonutChart from "../components/DonutChart";
import RecentExpenses from "../components/RecentExpenses";
import CategoryBarChart from "../components/CategoryBarChart";

// The main dashboard page.
// Assembles all the pieces — stat cards, charts, recent transactions.
// Props:
//   onViewAll  — navigates to the Expenses page
//   onAddClick — opens the Add Transaction modal

export default function Dashboard({ onViewAll, onAddClick }) {
  const { transactions } = useTransactions();

  const { income, expenses } = useMemo(() => computeTotals(transactions), [transactions]);
  const balance = income - expenses;
  const savings = income > 0 ? ((balance / income) * 100).toFixed(1) : "0";

  return (
    <div>
      {/* Page header */}
      <div style={s.pageHeader}>
        <h2 style={s.pageTitle}>Dashboard</h2>
      </div>

      {/* Stat cards */}
      <div style={s.statsRow}>
        <StatCard
          title="Total Balance"
          amount={balance}
          icon="💳"
          iconBg="#6C8EFF22"
          subtitle="All accounts"
        />
        <StatCard
          title="Total Income"
          amount={income}
          icon="📈"
          iconBg="#3ECF8E22"
          change="+12.5%"
          changeUp={true}
          subtitle="from last month"
        />
        <StatCard
          title="Total Expenses"
          amount={expenses}
          icon="📉"
          iconBg="#FF6B6B22"
          change="-8.3%"
          changeUp={false}
          subtitle="from last month"
        />
        <StatCard
          title="Savings"
          amount={balance}
          icon="🪙"
          iconBg="#A78BFA22"
          change={`${savings}%`}
          changeUp={true}
          subtitle="of income"
        />
      </div>

      {/* Middle row — donut chart + recent expenses */}
      <div style={s.midRow}>
        <DonutChart />
        <RecentExpenses onViewAll={onViewAll} />
      </div>

      {/* Bar chart */}
      <CategoryBarChart />
    </div>
  );
}

const s = {
  pageHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 700,
    color: "#F0F2F8",
  },
  statsRow: {
    display: "flex",
    gap: 16,
    marginBottom: 20,
    flexWrap: "wrap",
  },
  midRow: {
    display: "flex",
    gap: 16,
    marginBottom: 20,
    flexWrap: "wrap",
  },
};
