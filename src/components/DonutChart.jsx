import { useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useTransactions } from "../context/TransactionContext";
import { buildChartData, formatCurrency } from "../utils/helpers";
import { CATEGORY_MAP } from "../utils/constants";

// Doughnut chart showing spending broken down by category.
// Uses recharts — data comes straight from context, no props needed.

export default function DonutChart() {
  const { transactions } = useTransactions();

  // useMemo recalculates only when transactions change, not on every render
  const data = useMemo(() => buildChartData(transactions), [transactions]);
  const total = useMemo(() => data.reduce((s, d) => s + d.value, 0), [data]);

  if (data.length === 0) {
    return (
      <div style={s.card}>
        <h3 style={s.heading}>Expenses Overview</h3>
        <p style={{ color: "#555E78", fontSize: 13, textAlign: "center", paddingTop: 40 }}>
          No expense data yet.
        </p>
      </div>
    );
  }

  return (
    <div style={s.card}>
      <h3 style={s.heading}>Expenses Overview</h3>

      <div style={s.body}>
        {/* Chart */}
        <div style={{ width: 200, height: 200, position: "relative", flexShrink: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%" cy="50%"
                innerRadius={60} outerRadius={90}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={CATEGORY_MAP[entry.name]?.color || "#94A3B8"}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(val) => formatCurrency(val)}
                contentStyle={{ background: "#181C27", border: "1px solid #252A3A", borderRadius: 8, fontSize: 12 }}
              />
            </PieChart>
          </ResponsiveContainer>
          {/* Center label */}
          <div style={s.centerLabel}>
            <p style={s.centerAmount}>{formatCurrency(total)}</p>
            <p style={s.centerSub}>Total</p>
          </div>
        </div>

        {/* Legend */}
        <div style={s.legend}>
          {data.map((entry) => {
            const pct = Math.round((entry.value / total) * 100);
            const color = CATEGORY_MAP[entry.name]?.color || "#94A3B8";
            return (
              <div key={entry.name} style={s.legendRow}>
                <div style={s.legendLeft}>
                  <div style={{ ...s.dot, background: color }} />
                  <span style={s.legendName}>{entry.name}</span>
                </div>
                <span style={s.legendAmt}>{formatCurrency(entry.value)}</span>
                <span style={s.legendPct}>{pct}%</span>
              </div>
            );
          })}
        </div>
      </div>
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
  heading: {
    fontSize: 15,
    fontWeight: 600,
    color: "#F0F2F8",
    marginBottom: 20,
  },
  body: {
    display: "flex",
    gap: 24,
    alignItems: "center",
    flexWrap: "wrap",
  },
  centerLabel: {
    position: "absolute",
    top: "50%", left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    pointerEvents: "none",
  },
  centerAmount: {
    fontSize: 14,
    fontWeight: 700,
    color: "#F0F2F8",
    fontFamily: "'JetBrains Mono', monospace",
  },
  centerSub: {
    fontSize: 11,
    color: "#555E78",
  },
  legend: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    minWidth: 180,
  },
  legendRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  legendLeft: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  dot: {
    width: 10, height: 10,
    borderRadius: "50%",
    flexShrink: 0,
  },
  legendName: {
    fontSize: 12,
    color: "#8890AA",
  },
  legendAmt: {
    fontSize: 12,
    color: "#F0F2F8",
    fontFamily: "'JetBrains Mono', monospace",
    marginRight: 8,
  },
  legendPct: {
    fontSize: 11,
    color: "#555E78",
    width: 32,
    textAlign: "right",
  },
};
