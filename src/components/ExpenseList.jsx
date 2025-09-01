import React from "react";

const ExpenseList = ({ allExpenses }) => {
  //   console.log(allExpenses);
  if (allExpenses.length === 0) {
    return (
      <p className="mt-4 text-center text-gray-500">
        No expenses yet. Add one!
      </p>
    );
  }
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Amount
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {allExpenses.map((singleExpense, index) => {
            return (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                key={singleExpense.id}
              >
                {/* <td className="px-6 py-2">{singleExpense.description}</td> */}
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {singleExpense.description}
                </th>
                <td className="px-6 py-2">{singleExpense.category}</td>
                <td className="px-6 py-2">{singleExpense.amount || ""}</td>
                <td className="px-6 py-2">{singleExpense.date}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
