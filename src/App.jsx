import { useState } from "react";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import TodoFooter from "./components/TodoFooter";
import TodoFilter from "./components/TodoFilter"; // <-- Import new component
import TodoSearch from "./components/TodoSearch"; // <-- Import new component

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React", isCompleted: false },
    { id: 2, text: "Build a To-Do App", isCompleted: true },
    { id: 3, text: "Add filter and search features", isCompleted: false },
  ]);

  // --- New state for filter and search ---
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const addTodo = (text) => {
    const newTodo = { id: Date.now(), text, isCompleted: false };
    setTodos([...todos, newTodo]);
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id, newText) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.isCompleted));
  };

  const remainingTodosCount = todos.filter((todo) => !todo.isCompleted).length;

  // --- Chained Filtering Logic ---
  const filteredTodos = todos
    .filter((todo) => {
      // First, filter by status
      if (filter === "active") return !todo.isCompleted;
      if (filter === "completed") return todo.isCompleted;
      return true;
    })
    .filter(
      (
        todo // Then, filter by search term
      ) => todo.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center font-sans">
      <div className="w-full max-w-lg px-4">
        <h1 className="text-5xl font-bold text-center text-white mb-8">
          todos
        </h1>
        <div className="bg-gray-800 rounded-lg shadow-lg">
          <div className="p-6">
            <TodoForm addTodo={addTodo} />
            {/* Conditionally render new filter/search UI */}
            {todos.length > 0 && (
              <>
                <TodoFilter filter={filter} setFilter={setFilter} />
                <TodoSearch
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                />
              </>
            )}
          </div>
          <div className="px-6">
            {/* Pass the final filtered list to TodoList */}
            <TodoList
              todos={filteredTodos}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
            />
          </div>
          {todos.length > 0 && (
            <TodoFooter
              remainingCount={remainingTodosCount}
              clearCompleted={clearCompleted}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
