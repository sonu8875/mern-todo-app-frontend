import axios from "axios";
import React, { useEffect, useState } from "react";

function TodoForm({ editTodo, setEditTodo, fetchAllTodos }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (editTodo) {
        const response = await axios.put(
          `https://mern-todo-app-backend-m69o.onrender.com/todos/${editTodo._id}`,
          {
            title,
            description,
          },
        );
        (fetchAllTodos(), setEditTodo(null));
      } else {
        const response = await axios.post(
          "https://mern-todo-app-backend-m69o.onrender.com/todos",
          {
            title,
            description,
          },
        );
        fetchAllTodos();
        setTitle("");
        setDescription("");
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (editTodo) {
      setTitle(editTodo.title);
      setDescription(editTodo.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [editTodo]);

  return (
    <div className=" flex justify-start items-center m-3 text-white ">
      <form
        onSubmit={handleSubmit}
        className="bg-[#21201e] p-6 rounded-lg shadow-lg w-150 space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Add Todo</h1>

        <div className="flex flex-col gap-2">
          <label className="font-semibold" htmlFor="title">
            Title :
          </label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            id="title"
            type="text"
            placeholder="Enter your title"
            className="border rounded-md px-3 py-2 outline-none focus:ring-2"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold" htmlFor="description">
            Description :
          </label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            id="description"
            placeholder="Enter your description"
            className="border rounded-md px-3 py-2 outline-none focus:ring-2 resize-none h-24"
          />
        </div>

        <button
          type="submit"
          className={`w-full border text-white ${editTodo ? "bg-green-600" : " bg-blue-500"} py-2 rounded-md font-semibold`}
        >
          {editTodo ? <> update</> : " Add Todo"}
        </button>
      </form>
    </div>
  );
}

export default TodoForm;
