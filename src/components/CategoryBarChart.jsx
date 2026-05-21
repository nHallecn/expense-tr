import { useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell
} from "recharts";
import { useTransactions } from "../context/TransactionContext";
import { buildChartData, formatCurrency } from "../utils/helpers";
import { CATEGORY_MAP } from "../utils/constants";

// Bar chart showing expense totals per category.
// Sits below the donut chart and the recent expenses panel.

export default function CategoryBarChart() {
  const { transactions } = useTransactions();

  const data = useMemo(() => buildChartData(transactions), [transactions]);

  if (data.length === 0) return null;

  return (
    <div style={s.card}>
      <div style={s.header}>
        <h3 style={s.heading}>Expenses by Category</h3>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 16, right: 0, left: 0, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke="#252A3A" />
          <XAxis
            dataKey="name"
            tick={{ fill: "#555E78", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#555E78", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `$${v}`}
          />
          <Tooltip
            cursor={{ fill: "#252A3A" }}
            formatter={(val) => [formatCurrency(val), "Amount"]}
            contentStyle={{ background: "#181C27", border: "1px solid #252A3A", borderRadius: 8, fontSize: 12 }}
          />
          <Bar dataKey="value" radius={[6, 6, 0, 0]}>
            {data.map((entry) => (
              <Cell
                key={entry.name}
                fill={CATEGORY_MAP[entry.name]?.color || "#94A3B8"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

const s = {
  card: {
    background: "#181C27",
    border: "1px solid #252A3A",
    borderRadius: 12,
    padding: "22px 24px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
    fontWeight: 600,
    color: "#F0F2F8",
  },
};
