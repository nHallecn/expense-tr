const NAV_ITEMS = [
  { id: "dashboard",  label: "Dashboard",  icon: "⊞" },
  { id: "expenses",   label: "Expenses",   icon: "↕" },
  { id: "categories", label: "Categories", icon: "◫" },
  { id: "reports",    label: "Reports",    icon: "∷" },
  { id: "settings",   label: "Settings",   icon: "⚙" },
];

export default function Sidebar({ activePage, onNavigate, onAddClick }) {
  return (
    <aside style={s.sidebar}>

      {/* Logo */}
      <div style={s.logo}>
        <div style={s.logoIcon}>💳</div>
        <span style={s.logoText}>Expense<br/>Tracker</span>
      </div>

      {/* Nav items */}
      <nav style={s.nav}>
        {NAV_ITEMS.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              style={{ ...s.navItem, ...(isActive ? s.navActive : {}) }}
              onClick={() => onNavigate(item.id)}
            >
              <span style={s.navIcon}>{item.icon}</span>
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Add Expense button */}
      <button style={s.addBtn} onClick={onAddClick}>
        <span style={{ fontSize: 18, lineHeight: 1 }}>+</span>
        Add Expense
      </button>

      {/* Footer */}
      <div style={s.footer}>
        <div style={s.avatar}>JD</div>
        <div>
          <p style={s.userName}>John Doe</p>
          <p style={s.userEmail}>john@example.com</p>
        </div>
      </div>

    </aside>
  );
}

const s = {
  sidebar: {
    position: "fixed",
    top: 0, left: 0, bottom: 0,
    width: 220,
    background: "#181C27",
    borderRight: "1px solid #252A3A",
    display: "flex",
    flexDirection: "column",
    padding: "24px 16px",
    zIndex: 100,
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 32,
    paddingLeft: 4,
  },
  logoIcon: {
    width: 36, height: 36,
    background: "#6C8EFF",
    borderRadius: 10,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 18,
  },
  logoText: {
    fontSize: 13,
    fontWeight: 600,
    color: "#F0F2F8",
    lineHeight: 1.3,
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    flex: 1,
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 12px",
    borderRadius: 8,
    border: "none",
    background: "none",
    color: "#8890AA",
    fontSize: 13,
    fontWeight: 400,
    textAlign: "left",
    transition: "all 0.15s",
  },
  navActive: {
    background: "#6C8EFF22",
    color: "#6C8EFF",
    fontWeight: 500,
  },
  navIcon: {
    fontSize: 16,
    width: 20,
    textAlign: "center",
  },
  addBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: "11px",
    background: "#6C8EFF",
    border: "none",
    borderRadius: 10,
    color: "#fff",
    fontSize: 13,
    fontWeight: 600,
    marginBottom: 24,
    transition: "opacity 0.15s",
  },
  footer: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    borderTop: "1px solid #252A3A",
    paddingTop: 16,
  },
  avatar: {
    width: 34, height: 34,
    background: "#6C8EFF33",
    color: "#6C8EFF",
    borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 12,
    fontWeight: 600,
    flexShrink: 0,
  },
  userName: {
    fontSize: 12,
    fontWeight: 500,
    color: "#F0F2F8",
    marginBottom: 1,
  },
  userEmail: {
    fontSize: 11,
    color: "#555E78",
  },
};
