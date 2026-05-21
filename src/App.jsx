import { useState } from "react";
import { TransactionProvider } from "./context/TransactionContext";
import Sidebar from "./components/Sidebar";
import AddTransactionModal from "./components/AddTransactionModal";
import Dashboard from "./pages/Dashboard";
import ExpensesPage from "./pages/Expenses";

export default function App() {
  const [page, setPage]           = useState("dashboard");
  const [showModal, setShowModal] = useState(false);

  function renderPage() {
    switch (page) {
      case "dashboard":
        return (
          <Dashboard
            onViewAll={() => setPage("expenses")}
            onAddClick={() => setShowModal(true)}
          />
        );
      case "expenses":
        return <ExpensesPage onAddClick={() => setShowModal(true)} />;
      default:
        return (
          <div style={{ color: "#555E78", paddingTop: 60, textAlign: "center" }}>
            <p style={{ fontSize: 32, marginBottom: 8 }}>🚧</p>
            <p>This page is not built yet — great practice for you!</p>
          </div>
        );
    }
  }

  return (
    // TransactionProvider wraps everything so all components can access transactions
    <TransactionProvider>
      <div className="app-layout">

        <Sidebar
          activePage={page}
          onNavigate={setPage}
          onAddClick={() => setShowModal(true)}
        />

        <main className="main-content">
          {renderPage()}
        </main>

        {/* Modal is rendered at the top level so it overlays everything */}
        {showModal && (
          <AddTransactionModal onClose={() => setShowModal(false)} />
        )}

      </div>
    </TransactionProvider>
  );
}
