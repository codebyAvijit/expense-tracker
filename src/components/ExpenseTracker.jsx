import React, { useState } from "react";
import AddExpenseForm from "./AddExpenseForm";
import ExpenseList from "./ExpenseList";

const ExpenseTracker = () => {
  const [allExpenses, setAllExpenes] = useState([]);
  //create expenses
  const addExpenseHandler = (expense) => {
    setAllExpenes((prev) => {
      return [...prev, expense];
    });
  };

  //deleting expenses

  const handleDeleteExpense = (id) => {
    setAllExpenes((prevExpenses) => {
      return prevExpenses.filter((expense) => expense.id !== id);
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Expense Tracker 💸</h1>
      <AddExpenseForm addExpenseHandler={addExpenseHandler} />
      <ExpenseList
        allExpenses={allExpenses}
        handleDeleteExpense={handleDeleteExpense}
      />
    </div>
  );
};

export default ExpenseTracker;
