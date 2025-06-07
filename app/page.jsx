"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import Swal from "sweetalert2";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);
  const [loader, setLoader] = useState(false);
  const router = useRouter();

  async function getTodo() {
    setLoader(true);
    const res = await fetch("/api/todos");
    const data = await res.json();
    setLoader(false);
    setTodos(data.data);
  }

  //? ------------------ Get All Todos ----------------------------
  useEffect(() => {
    getTodo();
  }, []);

  //!---------------------- POST ----------------------
  const handleAddOrUpdate = async () => {
    if (input.trim() === "") return;

    if (editId !== null) {
      setTodos(
        todos.map((todo, idx) =>
          idx === editId ? { ...todo, text: input } : todo
        )
      );
      setEditId(null);
    } else {
      const res = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: input }),
      });
      const data = await res.json();
      if (data.message === "success") {
        getTodo();
      } else if (data.message === "unAuthorized") {
        Swal.fire("UnAuthorized", "Please login to access", "warning");
        router.push("/login");
        return;
      }
    }

    setInput("");
  };

  const handleEdit = (index) => {
    setInput(todos[index].text);
    setEditId(index);
  };

  const handleDelete = async (_id) => {
    const res = await fetch("/api/todos", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id }),
    });
    const data = await res.json();
    console.log(data);
    if (data.message === "success") {
      getTodo();
    }
  };

  const toggleComplted = async (_id, completed) => {
    const res = await fetch("/api/todos", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id, value: !completed }),
    });
    const data = await res.json();
    if (data.message === "success") {
      getTodo();
    }
  };

  return (
    <>
      <header className="h-[10vh] bg-indigo-600 flex justify-between items-center my-2 px-10">
        <h1 className="text-zinc-200 text-2xl font-semibold">
          Todo Application
        </h1>
        <Link
          href={"/login"}
          className="bg-zinc-900 text-zinc-200 px-4 py-1 rounded-[2px] cursor-pointer"
        >
          Login
        </Link>
      </header>

      <main className="min-h-[80vh] flex flex-col items-center gap-4 py-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            name="input"
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
        {loader && <BarLoader color="blue" width={"100%"} />}
        <ul className="w-3/4 max-w-md space-y-2">
          {todos.map((todo, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-indigo-100 p-2 rounded shadow"
            >
              <input
                type="checkbox"
                checked={todo.completed}
                name="check"
                onChange={() => toggleComplted(todo._id, todo.completed)}
              />
              <span>{todo.text}</span>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(index)}
                  className="text-sm bg-yellow-400 px-2 py-1 rounded hover:bg-yellow-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(todo._id)}
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
