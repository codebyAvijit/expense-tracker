import react from "react";

import "./App.css";
import AddExpenseForm from "./components/AddExpenseForm";
import ExpenseList from "./components/ExpenseList";
import StatsSection from "./components/StatsSection";

function App() {
  return (
    <>
      <div className="text-center">Expense-Tracker</div>
      <AddExpenseForm />
      <ExpenseList />
      <StatsSection />
    </>
  );
}

export default App;
