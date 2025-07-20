import React from "react";

function TodoFilter({ filter, setFilter }) {
  const getButtonClass = (buttonFilter) => {
    return `px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${
      filter === buttonFilter
        ? "bg-blue-600 text-white"
        : "bg-gray-600 text-gray-300 hover:bg-gray-500"
    }`;
  };

  return (
    <div className="flex justify-center space-x-4 my-6">
      <button
        onClick={() => setFilter("all")}
        className={getButtonClass("all")}
      >
        All
      </button>
      <button
        onClick={() => setFilter("active")}
        className={getButtonClass("active")}
      >
        Active
      </button>
      <button
        onClick={() => setFilter("completed")}
        className={getButtonClass("completed")}
      >
        Completed
      </button>
    </div>
  );
}

export default TodoFilter;
