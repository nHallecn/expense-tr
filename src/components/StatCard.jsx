import { formatCurrency } from "../utils/helpers";

export default function StatCard({ title, amount, icon, iconBg, change, changeUp, subtitle }) {
  return (
    <div style={s.card}>
      <div style={s.top}>
        <div>
          <p style={s.title}>{title}</p>
          <p style={s.amount}>{formatCurrency(amount)}</p>
        </div>
        <div style={{ ...s.iconWrap, background: iconBg }}>
          <span style={{ fontSize: 20 }}>{icon}</span>
        </div>
      </div>
      <p style={s.sub}>
        {change && (
          <span style={{ color: changeUp ? "#3ECF8E" : "#FF6B6B", fontWeight: 500, marginRight: 4 }}>
            {change}
          </span>
        )}
        {subtitle}
      </p>
    </div>
  );
}

const s = {
  card: {
    background: "#181C27",
    border: "1px solid #252A3A",
    borderRadius: 12,
    padding: "20px 22px",
    flex: 1,
    minWidth: 180,
    animation: "fadeUp 0.4s ease both",
  },
  top: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  title: {
    fontSize: 12,
    color: "#8890AA",
    marginBottom: 6,
    fontWeight: 400,
  },
  amount: {
    fontSize: 22,
    fontWeight: 700,
    color: "#F0F2F8",
    fontFamily: "'JetBrains Mono', monospace",
    letterSpacing: "-0.5px",
  },
  iconWrap: {
    width: 44, height: 44,
    borderRadius: 12,
    display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0,
  },
  sub: {
    fontSize: 12,
    color: "#555E78",
  },
};
