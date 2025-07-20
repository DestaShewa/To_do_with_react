import React, { useState, useRef, useEffect } from "react";

function TodoItem({ todo, toggleComplete, deleteTodo, editTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const editInputRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      editInputRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    if (editText.trim()) {
      editTodo(todo.id, editText.trim());
    } else {
      setEditText(todo.text); // Revert if input is empty
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  // If in editing mode, show an input field
  if (isEditing) {
    return (
      <li className="bg-gray-700 p-4 rounded-lg mb-3">
        <input
          ref={editInputRef}
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className="bg-gray-600 text-white w-full rounded p-1 focus:outline-none"
        />
      </li>
    );
  }

  // Otherwise, show the normal display
  return (
    <li className="bg-gray-700 flex items-center justify-between p-4 rounded-lg mb-3">
      <div className="flex items-center">
        <input
          type="checkbox"
          className="h-5 w-5 rounded-sm bg-gray-600 border-gray-500 text-blue-500 focus:ring-0"
          checked={todo.isCompleted}
          onChange={() => toggleComplete(todo.id)}
        />
        <span
          onDoubleClick={() => setIsEditing(true)}
          className={`ml-4 cursor-pointer ${
            todo.isCompleted ? "line-through text-gray-500" : "text-gray-300"
          }`}
        >
          {todo.text}
        </span>
      </div>
      <button
        onClick={() => deleteTodo(todo.id)}
        className="text-gray-500 hover:text-red-500 font-bold"
      >
        ✕
      </button>
    </li>
  );
}

export default TodoItem;
