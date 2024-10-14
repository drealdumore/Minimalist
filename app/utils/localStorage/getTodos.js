const getTodosFromLocalStorage = () => {
  const storedTodos = localStorage.getItem("todos");

  try {
    return storedTodos ? JSON.parse(storedTodos) : [];
  } catch (error) {
    console.error("Error parsing JSON from localStorage:", error);
    return [];
  }
};

export default getTodosFromLocalStorage;
