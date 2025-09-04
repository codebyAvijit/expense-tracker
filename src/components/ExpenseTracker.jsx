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

  //add state by filtering by categories

  const [selectedCategory, setSelectedCategory] = useState("");

  //adding state for sorting by category

  const [sortingOption, setSortingOption] = useState("none");

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

  // filtered expenses logic

  const filteredExpenses =
    selectedCategory === "" || selectedCategory === "all"
      ? allExpenses
      : allExpenses.filter((exp) => exp.category === selectedCategory);

  //sorting logic

  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    switch (sortingOption) {
      case "date-asc":
        return new Date(a.date) - new Date(b.date);
      case "date-desc":
        return new Date(b.date) - new Date(a.date);
      case "amount-asc":
        return a.amount - b.amount;
      case "amount-desc":
        return b.amount - a.amount;
      default:
        return 0;
    }
  });

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
      <div>
        <label
          htmlFor="category"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Filter By Category:{" "}
        </label>
        <select
          value={selectedCategory}
          className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => {
            setSelectedCategory(e.target.value);
          }}
        >
          <option value="all">All</option>
          <option value="food">Food</option>
          <option value="transport">Transport</option>
          <option value="rent">Rent</option>
          <option value="shopping">Shopping</option>
          <option value="entertainment">Entertainment</option>
          <option value="utilities">Utilities</option>
          <option value="health">Health</option>
          <option value="education">Education</option>
          <option value="others">Others</option>
        </select>
      </div>
      <div>
        <label
          htmlFor="sorting"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Sort By Category:{" "}
        </label>
        <select
          value={sortingOption}
          className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => {
            setSortingOption(e.target.value);
          }}
        >
          <option value="none">None</option>
          <option value="date-asc">Ascending Date</option>
          <option value="date-desc">Descending Date</option>
          <option value="amount-asc">Ascending Amount</option>
          <option value="amount-desc">Descending Amount</option>
        </select>
      </div>
      <ExpenseList
        // allExpenses={allExpenses} //for normal array passing
        // allExpenses={filteredExpenses} //filter logic array will change for filter
        allExpenses={sortedExpenses} //array will again change for sorting
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
