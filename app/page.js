"use client";

import { useEffect, useState } from "react";
import { supabase } from "./lib/supabaseClient";
import Checkbox from "./components/checkbox";
import getUserId from "./utils/getUserId";
import getTodosFromLocalStorage from "./utils/localStorage/getTodos";
import saveTodosToLocalStorage from "./utils/localStorage/saveTodos";
import Motion from "./lib/motion/y-motion";

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTodos = async (userId) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching todos:", error.message);
    } else {
      const mergedTodos = mergeLocalAndDatabaseTodos(
        getTodosFromLocalStorage(),
        data
      );
      setTodos(mergedTodos);
      saveTodosToLocalStorage(mergedTodos);
    }
    setLoading(false);
  };

  const mergeLocalAndDatabaseTodos = (localTodos, dbTodos) => {
    const dbTodoIds = dbTodos.map((todo) => todo.id);
    const uniqueLocalTodos = localTodos.filter(
      (todo) => !dbTodoIds.includes(todo.id)
    );
    return [...uniqueLocalTodos, ...dbTodos];
  };

  useEffect(() => {
    const id = getUserId();
    setUserId(id);

    const localTodos = getTodosFromLocalStorage();
    setTodos(localTodos);

    fetchTodos(id);
  }, []);

  const addTodo = async () => {
    if (newTodo.trim() !== "") {
      const newTodoItem = {
        id: Date.now(),
        text: newTodo,
        completed: false,
        user_id: userId,
      };

      const updatedTodos = [...todos, newTodoItem];
      setTodos(updatedTodos);
      saveTodosToLocalStorage(updatedTodos);

      setNewTodo("");

      const { error } = await supabase.from("todos").insert([newTodoItem]);
      if (error) {
        console.error("Error adding todo:", error.message);
      }
    }
  };

  const toggleTodo = async (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    saveTodosToLocalStorage(updatedTodos);

    const updatedTodo = updatedTodos.find((todo) => todo.id === id);
    if (updatedTodo) {
      const { error } = await supabase
        .from("todos")
        .update({ completed: updatedTodo.completed })
        .eq("id", id)
        .eq("user_id", userId);

      if (error) {
        console.error("Error updating todo:", error.message);
      }
    }
  };

  const removeTodo = async (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    saveTodosToLocalStorage(updatedTodos);

    const { error } = await supabase
      .from("todos")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);

    if (error) {
      console.error("Error deleting todo:", error.message);
    }
  };

  return (
    <Motion>
      <main className="flex flex-col gap-3 min-h-screen text-center justify-center items-center">
        <div className="max-w-md mx-auto p-4 bg-background">
          <h1 className="text-3xl font-bold mb-4 text-center">Minimalist</h1>
          <div className="flex mb-4">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new todo"
              className="flex-grow mr-2 border rounded p-2 transition-all duration-75 ring-2 ring-neutral-300 border-none active:ring-neutral-500 hover:ring-neutral-500 outline-none "
              onKeyPress={(e) => e.key === "Enter" && addTodo()}
            />

            <button
              disabled={!newTodo}
              onClick={addTodo}
              className="cursor-pointer disabled:bg-neutral-950/65 rounded-md bg-neutral-950 px-2 md:px-3 py-1 text-sm text-white shadow-lg shadow-neutral-500/20 transition active:scale-[.95]"
            >
              Add Todo
            </button>
          </div>
          {loading ? (
            <div
              className="inline-block size-4 animate-spin rounded-full border-2 border-current border-t-transparent text-black"
              role="status"
              aria-label="loading"
            >
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <ul className="space-y-2">
              {todos.map((todo) => (
                <li
                  key={todo.id}
                  className="flex items-center justify-between bg-muted p-2 rounded"
                >
                  <div className="flex items-center">
                    <Checkbox
                      id={`todo-${todo.id}`}
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                      className="mr-2"
                    />
                    <label
                      htmlFor={`todo-${todo.id}`}
                      className={`${
                        todo.completed
                          ? "line-through text-muted-foreground"
                          : ""
                      }`}
                    >
                      {todo.text}
                    </label>
                  </div>

                  <button
                    onClick={() => removeTodo(todo.id)}
                    className="bg-neutral-300 p-2 rounded-xl duration-75 hover:bg-gray-300 transition active:scale-[.95]"
                  >
                    <svg viewBox="0 0 15 15" className="w-5 fill-white">
                      <svg
                        className="w-6 h-6 stroke-red-500"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          strokeLinejoin="round"
                          strokeLinecap="round"
                        ></path>
                      </svg>
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </Motion>
  );
}
