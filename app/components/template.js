"use client";

import { useEffect, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

import { supabase } from "../lib/supabaseClient";

import Checkbox from "./checkbox";
import Trash from "./trash";

import Motion from "../lib/motion/y-motion";

import getUserId from "../utils/getUserId";
import getTodosFromLocalStorage from "../utils/localStorage/getTodos";
import saveTodosToLocalStorage from "../utils/localStorage/saveTodos";

import debounce from "../utils/debounce";

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

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

  const addTodo = debounce(async () => {
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
  }, 200);

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

    toast.success("Todo deleted successfully!");

    const { error } = await supabase
      .from("todos")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);

    if (error) {
      console.error("Error deleting todo:", error.message);
    }
  };

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => setShowSpinner(true), 300); // 300ms delay
      return () => clearTimeout(timer);
    }
    setShowSpinner(false);
  }, [loading]);

  return (
    <Motion>
      <div className="flex flex-col gap-3 text-center justify-center items-center relative">
        <div className="max-w-md mx-auto p-4 bg-background">
          <h1 className="text-3xl font-bold text-center">Minimalist.</h1>
          <p className="sm:text-xl font-thin mb-4 text-center">
            The most minimal Todo app
          </p>

          <div className="content">
            <div className="flex mb-4">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new todo"
                className="flex-grow mr-2 border font-light placeholder:text-sm placeholder:font-light placeholder:font-sans rounded p-2 transition-all duration-75 ring-1 md:ring-2 ring-neutral-300 border-none active:ring-neutral-500 hover:ring-neutral-500 outline-none "
                aria-label="Add a new todo"
                onKeyPress={(e) => e.key === "Enter" && addTodo()}
              />

              <button
                disabled={!newTodo}
                onClick={addTodo}
                aria-label="Add todo"
                className={`cursor-pointer text-sm font-light disabled:bg-neutral-950/65 rounded-md bg-neutral-950 px-2 md:px-3 py-1 text-white shadow-lg shadow-neutral-500/20 transition ${
                  !newTodo ? "" : "active:scale-[.95]"
                }`}
              >
                Add Todo
              </button>
            </div>
            {showSpinner ? (
              <div
                className="inline-block size-4 animate-spin rounded-full border-2 border-current border-t-transparent text-black"
                role="status"
                aria-label="Loading"
              >
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <AnimatePresence>
                <motion.ul className="space-y-2 font-sans font-light">
                  {todos
                    .slice()
                    .reverse()
                    .map((todo) => (
                      <motion.li
                        key={todo.id}
                        className="flex items-center justify-between p-2 rounded"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{
                          opacity: 0,
                          y: -15,
                          height: 0,
                          marginBottom: 0,
                          paddingTop: 0,
                          transition: { duration: 0.2 },
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                          duration: 0.5,
                        }}
                        layout
                      >
                        <div className="flex items-center w-full">
                          <Checkbox
                            id={`todo-${todo.id}`}
                            checked={todo.completed}
                            onChange={() => toggleTodo(todo.id)}
                            className="mr-2 mt-1.5 self-start"
                            aria-label={`Mark todo ${todo.text} as completed`}
                          />
                          <p
                            htmlFor={`todo-${todo.id}`}
                            className={`text-start truncate w-[15rem] ${
                              todo.completed
                                ? "line-through text-muted-foreground"
                                : ""
                            }`}
                          >
                            {todo.text}
                          </p>
                        </div>

                        <button
                          onClick={() => removeTodo(todo.id)}
                          aria-label="Remove todo"
                          className="bg-neutral-300 ml-2 p-2 self-start rounded-xl duration-75 hover:bg-gray-300 transition active:scale-[.95]"
                        >
                          <Trash />
                        </button>
                      </motion.li>
                    ))}
                </motion.ul>
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </Motion>
  );
}
