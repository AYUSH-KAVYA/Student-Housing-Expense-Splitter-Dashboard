import { useState } from "react";
import "./App.css";

const navItems = [
  { id: "overview",  label: "Overview"  },
  { id: "expenses",  label: "Expenses"  },
  { id: "settle",    label: "Settle Up" },
  { id: "roommates", label: "Roommates" },
  { id: "settings",  label: "Settings"  },
];

const expenses = [
  { id: 1, title: "Rent – May",        category: "Rent",      amount: 48000, date: "01 May", paidBy: "Arjun"  },
  { id: 2, title: "Electricity Bill",  category: "Utility",   amount: 2340,  date: "05 May", paidBy: "Priya"  },
  { id: 3, title: "Wi-Fi Recharge",    category: "Utility",   amount: 999,   date: "08 May", paidBy: "Dev"    },
  { id: 4, title: "Groceries",         category: "Groceries", amount: 1870,  date: "12 May", paidBy: "Sneha"  },
  { id: 5, title: "Gas Cylinder",      category: "Utility",   amount: 960,   date: "15 May", paidBy: "Arjun"  },
];


const roommates = [
  { id: 1, name: "Arjun", paid: 4200, owes: 0    },
  { id: 2, name: "Priya", paid: 1800, owes: 1100 },
  { id: 3, name: "Dev",   paid: 900,  owes: 2300 },
  { id: 4, name: "Sneha", paid: 2600, owes: 400  },
];

function Sidebar({ active, setActive }) {
  return (
    <aside className="sidebar">
      <div className="logo">RoomSplit</div>
      <nav className="nav">
        {navItems.map((item) => (
          <div
            key={item.id}
            className={item.id === active ? "nav-item nav-item-active" : "nav-item"}
            onClick={() => setActive(item.id)}
          >
            {item.label}
          </div>
        ))}
      </nav>
      <div className="sidebar-footer">
        <div className="user-chip">
          <div className="user-avatar">A</div>
          <div>
            <div className="user-name">Arjun</div>
            <div className="user-role">Admin</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function Topbar({ active }) {
  const current = navItems.find((n) => n.id === active);
  return (
    <header className="topbar">
      <span className="topbar-title">{current?.label}</span>
      <div className="topbar-right">
        <span className="topbar-month">May 2025</span>
        <button className="btn-primary">+ Add Expense</button>
      </div>
    </header>
  );
}

function StatCards() {
  const stats = [
    { label: "Total Expenses",  value: "₹55,169" },
    { label: "Your Share",      value: "₹13,792" },
    { label: "You Are Owed",    value: "₹1,200"  },
    { label: "Pending Splits",  value: "3"        },
  ];
  return (
    <div className="stat-row">
      {stats.map((s) => (
        <div key={s.label} className="stat-card">
          <div className="stat-label">{s.label}</div>
          <div className="stat-value">{s.value}</div>
        </div>
      ))}
    </div>
  );
}

function ExpenseList({ items }) {
  return (
    <div className="expense-list">
      {items.map((e) => (
        <div key={e.id} className="expense-row">
          <div className="expense-info">
            <span className="expense-title">{e.title}</span>
            <span className="expense-meta">{e.date} · {e.paidBy}</span>
          </div>
          <span className="expense-category">{e.category}</span>
          <span className="expense-amount">₹{e.amount.toLocaleString("en-IN")}</span>
        </div>
      ))}
    </div>
  );
}

function RoommateList({ items }) {
  return (
    <div className="roommate-list">
      {items.map((r) => (
        <div key={r.id} className="roommate-row">
          <div className="rm-avatar">{r.name[0]}</div>
          <div className="rm-info">
            <span className="rm-name">{r.name}</span>
            <span className="rm-paid">Paid ₹{r.paid.toLocaleString("en-IN")}</span>
          </div>
          <span className={r.owes > 0 ? "rm-owes rm-owes-red" : "rm-owes rm-owes-green"}>
            {r.owes > 0 ? `Owes ₹${r.owes.toLocaleString("en-IN")}` : "Settled"}
          </span>
        </div>
      ))}
    </div>
  );
}

function OverviewPage() {
  return (
    <>
      <StatCards />
      <div className="two-col">
        <div className="panel">
          <div className="panel-head">
            <span className="panel-title">Recent Expenses</span>
            <button className="btn-link">See all</button>
          </div>
          <ExpenseList items={expenses.slice(0, 4)} />
        </div>
        <div className="panel">
          <div className="panel-head">
            <span className="panel-title">Roommate Balances</span>
          </div>
          <RoommateList items={roommates} />
        </div>
      </div>
    </>
  );
}

function ExpensesPage() {
  const categories = ["All", "Rent", "Utility", "Groceries"];
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? expenses : expenses.filter((e) => e.category === filter);
  return (
    <div className="panel">
      <div className="panel-head">
        <span className="panel-title">All Expenses</span>
        <div className="pill-row">
          {categories.map((c) => (
            <button
              key={c}
              className={c === filter ? "pill pill-active" : "pill"}
              onClick={() => setFilter(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      <ExpenseList items={filtered} />
      <button className="btn-primary">+ Add Expense</button>
    </div>
  );
}

function SettlePage() {
  return (
    <div className="panel">
      <div className="panel-head">
        <span className="panel-title">Settle Up</span>
      </div>
      <div className="settle-list">
        {roommates.filter((r) => r.owes > 0).map((r) => (
          <div key={r.id} className="settle-row">
            <div className="rm-avatar">{r.name[0]}</div>
            <div className="rm-info">
              <span className="rm-name">{r.name}</span>
              <span className="rm-paid">owes ₹{r.owes.toLocaleString("en-IN")}</span>
            </div>
            <button className="btn-primary">Mark Settled</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function RoommatesPage() {
  return (
    <div className="panel">
      <div className="panel-head">
        <span className="panel-title">Roommates</span>
        <button className="btn-primary">+ Add Roommate</button>
      </div>
      <RoommateList items={roommates} />
    </div>
  );
}

function SettingsPage() {
  const rows = ["House Name", "Currency", "Split Method", "Notifications", "Export Data"];
  return (
    <div className="panel">
      <div className="panel-head">
        <span className="panel-title">Settings</span>
      </div>
      <div className="settings-list">
        {rows.map((r) => (
          <div key={r} className="settings-row">
            <span className="settings-label">{r}</span>
            <button className="btn-link">Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
}

const pages = {
  overview:  <OverviewPage  />,
  expenses:  <ExpensesPage  />,
  settle:    <SettlePage    />,
  roommates: <RoommatesPage />,
  settings:  <SettingsPage  />,
};

export default function App() {
  const [active, setActive] = useState("overview");
  return (
    <div className="app">
      <Sidebar active={active} setActive={setActive} />
      <div className="main">
        <Topbar active={active} />
        <main className="content">
          {pages[active]}
        </main>
      </div>
    </div>
  );
}