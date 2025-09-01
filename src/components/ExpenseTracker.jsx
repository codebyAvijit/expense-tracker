import React, { useState } from "react";
import AddExpenseForm from "./AddExpenseForm";
import ExpenseList from "./ExpenseList";

const ExpenseTracker = () => {
  const [allExpenses, setAllExpenes] = useState([]);
  const addExpenseHandler = (expense) => {
    setAllExpenes((prev) => {
      return [...prev, expense];
    });
  };
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Expense Tracker 💸</h1>
      <AddExpenseForm addExpenseHandler={addExpenseHandler} />
      <ExpenseList allExpenses={allExpenses} />
    </div>
  );
};

export default ExpenseTracker;
