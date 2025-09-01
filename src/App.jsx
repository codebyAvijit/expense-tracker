import "./App.css";

import StatsSection from "./components/StatsSection";
import ExpenseTracker from "./components/ExpenseTracker";

function App() {
  return (
    <>
      <div className="text-center">Expense-Tracker</div>
      <ExpenseTracker />
      <StatsSection />
    </>
  );
}

export default App;
