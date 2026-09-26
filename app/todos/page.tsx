
"use client";

import { useEffect, useState } from "react";
import {Trash } from "lucide-react";
import {toast} from "sonner"
import { redirect } from "next/navigation";

interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
  status: "pending" | "completed";
}

export default function Todo() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState<TodoItem[]>([]);

//  useEffect(()=>{
//   const getLoginData = localStorage.getItem("LoginData")
//   if(!getLoginData){
//     redirect("/login")
//   }
//  },[]) 

  const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!todo.trim()) {
      alert("Please enter a todo first!");
      return;
    }

    const newTodo: TodoItem = {
      id: Date.now(),
      title: todo.trim(),
      completed: false,
      status: "pending",
    };

    setTodos((prev) => [...prev, newTodo]);
    setTodo("");
    toast("Todo has been added successfully 🎉")
    
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              completed: !item.completed,
              status: !item.completed ? "completed" : "pending",
            }
          : item
      )
    );
    
  };

  const deleteTodo = (id:number) => {
   setTodos((prev)=>prev.filter((ele)=>ele.id!==id))
   toast("Todo has been deleted successfully ✅")
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-900 sm:text-4xl">
            Todo App
          </h1>

          <p className="mt-2 text-gray-600">
            CI/CD Pipeline Practice Project
          </p>
        </div>

        {/* Add Todo */}
        <form
          onSubmit={addTodo}
          className="mx-auto mt-8 flex max-w-xl gap-2"
        >
          <input
            type="text"
            placeholder="Enter your todo..."
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />

          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 active:scale-95"
          >
            Add
          </button>
        </form>

        {/* Todo List */}
        {todos.length > 0 ? (
          <section className="mt-12">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">
                Your Todos
              </h2>

              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                {todos.length} {todos.length === 1 ? "Todo" : "Todos"}
              </span>
            </div>

           
<div className="space-y-3">
  {todos.map((item) => (
    <div
      key={item.id}
      className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      {/* Left Side: Checkbox + Todo */}
      <div className="flex min-w-0 items-center gap-3">
        <input
          type="checkbox"
          checked={item.completed}
          onChange={() => toggleTodo(item.id)}
          className="h-5 w-5 shrink-0 cursor-pointer accent-blue-600"
        />

        <div className="min-w-0">
          <p
            className={`truncate font-medium ${
              item.completed
                ? "text-gray-400 line-through"
                : "text-gray-800"
            }`}
          >
            {item.title}
          </p>

          <span
            className={`text-sm ${
              item.status === "completed"
                ? "text-green-600"
                : "text-orange-500"
            }`}
          >
            {item.status === "completed" ? "Completed" : "Pending"}
          </span>
        </div>
      </div>

      {/* Right Side: Delete */}
      <button
        data-testid={`todo-${item.id}`}
        type="button"
        className="ml-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-red-500 transition hover:bg-red-50 hover:text-red-600"
        aria-label={`Delete ${item.title}`}
        onClick={()=>deleteTodo(item.id)}
      >
        <Trash size={20} color="currentColor" />
      </button>
    </div>
  ))}
</div>


          </section>
        ) : (
          <div className="mt-16 text-center">
            <p className="text-lg text-gray-500">
              No todos yet. Add your first todo! 📝
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

