import React, { useEffect, useState } from "react";
import axios from "axios";
import TodoForm from "./components/todoForm";
import TodoCard from "./components/todocard";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [error, setError] = useState(null);
  const [editTodo, setEditTodo] = useState(null);

  // * pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [totalTodosCount, setTotalTodosCount] = useState(0);
  // * search section -->

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchAllTodos();
  }, [page, limit, search]);
  async function fetchAllTodos() {
    try {
      const response = await axios.get(
        `https://mern-todo-app-backend-m69o.onrender.com/todos?page=${page}&limit=${limit}&query=${search}`,
      );

      const todos = response.data.data;

      const totalTodosCount = response.data.totalTodosCount;
      const totalPages = response.data.totalPages;

      setTotalTodosCount(totalTodosCount);
      setTotalPages(totalPages);

      setTodoList(todos);
    } catch (error) {
      console.log("err", error);
      setError(error.message);
    }
  }

  if (error) {
    return <h1> {error} </h1>;
  }

  function handleSelect(value) {
    setLimit(Number(value));
    setPage(1);
  }

  function handlePagination(pageNumber) {
    setPage(pageNumber);
  }

  const pageArray = Array.from({ length: totalPages }, (_, index) => index + 1);
  return (
    <div>
      <TodoForm
        editTodo={editTodo}
        setEditTodo={setEditTodo}
        fetchAllTodos={fetchAllTodos}
      />
      <input
        type="text"
        placeholder="Search by title..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        className="border p-2 rounded w-80 m-4"
      />

      <div className="p-6 grid grid-cols-3 gap-2 max-sm:grid-cols-1">
        {todoList.length > 0 ? (
          todoList.map((todo) => (
            <TodoCard
              key={todo._id}
              fetchAllTodos={fetchAllTodos}
              todo={todo}
              editTodo={editTodo}
              setEditTodo={setEditTodo}
            />
          ))
        ) : (
          <h2 className="text-xl text-red-500">No Todo Found</h2>
        )}
      </div>

      <div className="flex justify-center py-6 flex-wrap gap-2">
        {/* limit handle */}
        <label htmlFor="limit">set limit</label>
        <select
          onChange={(e) => handleSelect(e.target.value)}
          value={limit}
          className="border text-xl mr-2 cursor-pointer"
          name="limit"
          id="limit"
        >
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>

        {pageArray.map((index) => (
          <button
            className={` ${page == index ? "bg-rose-500 scale-120" : "bg-violet-500"}  mx-1 px-3 rounded py-1 cursor-pointer text-white font-medium`}
            key={index}
            onClick={() => handlePagination(index)}
          >
            {index}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
