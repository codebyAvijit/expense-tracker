import React, { useEffect, useState } from "react";
import AddExpenseForm from "./AddExpenseForm";
import ExpenseList from "./ExpenseList";

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

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Expense Tracker 💸</h1>
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
    </div>
  );
};

export default ExpenseTracker;
