"use client";

import { useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);

  const handleAddOrUpdate = () => {
    if (input.trim() === "") return;

    if (editId !== null) {
      setTodos(
        todos.map((todo, idx) =>
          idx === editId ? { ...todo, text: input } : todo
        )
      );
      setEditId(null);
    } else {
      setTodos([...todos, { text: input }]);
    }

    setInput("");
  };

  const handleEdit = (index) => {
    setInput(todos[index].text);
    setEditId(index);
  };

  const handleDelete = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <>
      <header className="h-[10vh] bg-indigo-600 flex justify-center items-center my-2">
        <h1 className="text-zinc-200 text-2xl font-semibold">
          Todo Application
        </h1>
      </header>

      <main className="min-h-[80vh] flex flex-col items-center gap-4 py-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter a task..."
            className="border border-gray-300 rounded px-3 py-1 w-64"
          />
          <button
            onClick={handleAddOrUpdate}
            className="bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700"
          >
            {editId !== null ? "Update" : "Add"}
          </button>
        </div>

        <ul className="w-3/4 max-w-md space-y-2">
          {todos.map((todo, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-indigo-100 p-2 rounded shadow"
            >
              <span>{todo.text}</span>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(index)}
                  className="text-sm bg-yellow-400 px-2 py-1 rounded hover:bg-yellow-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="text-sm bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </main>

      <footer className="bg-indigo-500 h-[10vh] flex justify-center items-center">
        <p className="text-gray-300 text-sm">Code and develop by Ansari Ali</p>
      </footer>
    </>
  );
}
