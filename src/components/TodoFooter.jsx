import React from "react";

function TodoFooter({ remainingCount, clearCompleted }) {
  return (
    <div className="flex justify-between items-center p-4 text-gray-400 text-sm border-t border-gray-700">
      <span>
        {remainingCount} {remainingCount === 1 ? "item" : "items"} left
      </span>
      <button
        onClick={clearCompleted}
        className="hover:text-white transition-colors duration-200"
      >
        Clear Completed
      </button>
    </div>
  );
}

export default TodoFooter;
