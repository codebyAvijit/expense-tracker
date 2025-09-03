import React, { useEffect, useState } from "react";
import AddExpenseForm from "./AddExpenseForm";
import ExpenseList from "./ExpenseList";
import StatsSection from "./StatsSection";

const ExpenseTracker = () => {
  //adding a lazy initializer for avoiding local storage to get cleared
  //no need to write useffect to get item if using it this way
  const [allExpenses, setAllExpenes] = useState(() => {
    const stored = localStorage.getItem("allExpenses");
    return stored ? JSON.parse(stored) : [];
  });

  //add states to implement editing functionality

  const [editingId, setEditingId] = useState(null);
  const [editingDescription, setEditingDescription] = useState("");
  const [editingAmount, setEditingAmount] = useState("");
  const [editingCategory, setEditingCategory] = useState("");
  const [editingDate, setEditingDate] = useState("");

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

  //implementing editing functionality

  //implementing editing and filling fields
  const startEditing = (id) => {
    const expense = allExpenses.find((e) => e.id == id);
    setEditingId(id);
    setEditingDescription(expense.description);
    setEditingAmount(String(expense.amount));
    setEditingCategory(expense.category);
    setEditingDate(expense.date);
  };

  //implementing cancelling the edit

  const cancelEdit = (id) => {
    setEditingId(null);
    setEditingDescription("");
    setEditingAmount("");
    setEditingCategory("");
    setEditingDate("");
  };

  //implementing the save edit

  const saveEdit = () => {
    setAllExpenes((prev) =>
      prev.map((expense) =>
        expense.id === editingId
          ? {
              ...expense,
              description: editingDescription.trim(),
              amount: Number(editingAmount),
              category: editingCategory,
              date: editingDate,
            }
          : expense
      )
    );
    cancelEdit();
  };

  //   //checking local strorage items first

  //   useEffect(() => {
  //     const storedExpenses = localStorage.getItem("allExpenses");
  //     if (storedExpenses) {
  //       setAllExpenes(JSON.parse(storedExpenses));
  //     }
  //   }, []);

  //saving items in local storage

  useEffect(() => {
    localStorage.setItem("allExpenses", JSON.stringify(allExpenses));
  }, [allExpenses]);

  //fucntion to clear all expenses at once

  const clearAllExpenses = () => {
    setAllExpenes([]);
    localStorage.removeItem("allExpenses");
  };

  return (
    <div className="p-4">
      <h1 className="text-xl text-center font-bold mb-4">Expense Tracker 💸</h1>
      <div className="text-center">
        <button
          onClick={() => {
            clearAllExpenses();
          }}
          className="py-2.5 px-5 me-2 mt-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Reset Expenses
        </button>
      </div>
      <AddExpenseForm addExpenseHandler={addExpenseHandler} />
      <ExpenseList
        allExpenses={allExpenses}
        handleDeleteExpense={handleDeleteExpense}
        startEditing={startEditing}
        editingId={editingId}
        setEditingId={setEditingId}
        editingDescription={editingDescription}
        setEditingDescription={setEditingDescription}
        editingAmount={editingAmount}
        setEditingAmount={setEditingAmount}
        editingCategory={editingCategory}
        setEditingCategory={setEditingCategory}
        editingDate={editingDate}
        setEditingDate={setEditingDate}
        saveEdit={saveEdit}
        cancelEdit={cancelEdit}
      />
      <StatsSection allExpenses={allExpenses} />
    </div>
  );
};

export default ExpenseTracker;
