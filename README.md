# 💳 Expense Tracker — React Web

A full dashboard app built with React + Vite + Recharts.

## Project structure

```
expense-tracker-web/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx                        ← boots the app
    ├── App.jsx                         ← shell: page routing + modal state
    |── index.css                       ← global CSS variables + reset                
    │
    ├── context/
    │   └── TransactionContext.jsx      ← useReducer + Context (global state)
    │
    ├── utils/
    │   ├── constants.js                ← categories, seed data
    │   └── helpers.js                  ← pure functions (format, compute)
    │                  
    │
    ├── components/                     ← reusable UI pieces
    │   ├── Sidebar.jsx
    │   ├── StatCard.jsx
    │   ├── DonutChart.jsx
    │   ├── CategoryBarChart.jsx
    │   ├── RecentExpenses.jsx
    │   ├── TransactionItem.jsx
    │   └── AddTransactionModal.jsx
    │
    └── pages/                          ← full screens
        ├── Dashboard.jsx
        └── Expenses.jsx
```

## Key concepts in each file

| File | What it teaches |
|---|---|
| `TransactionContext.jsx` | `useReducer`, `createContext`, `useContext`, custom hooks |
| `helpers.js` | Pure functions separated from React logic |
| `Dashboard.jsx` | `useMemo` for derived data, composing components |
| `Expenses.jsx` | Filtering with `useMemo`, controlled selects |
| `AddTransactionModal.jsx` | Controlled form, validation, `useEffect` for keyboard |
| `TransactionItem.jsx` | Two-step delete confirmation with local state |
| `DonutChart.jsx` | Recharts `PieChart`, `useMemo` for chart data |
| `App.jsx` | String-based page routing, lifting modal state up |

## Pages left to build (great practice!)

- **Categories** — list all categories, show totals per category
- **Reports** — monthly breakdown, income vs expense trend line
- **Settings** — clear all data, change currency, export CSV
