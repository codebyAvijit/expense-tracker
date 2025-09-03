import React from "react";

const StatsSection = ({ allExpenses }) => {
  const totalExpense = allExpenses.reduce(
    (acc, expense) => acc + expense.amount,
    0
  );
  return (
    <div className="mt-4 p-3 border rounded bg-gray-100">
      <h2 className="text-lg font-semibold">
        Total Expenses: 💸 {totalExpense}
      </h2>
    </div>
  );
};

export default StatsSection;
