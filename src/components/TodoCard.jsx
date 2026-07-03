import React from "react";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import { FiEdit } from "react-icons/fi";
import { IoCheckmarkDone } from "react-icons/io5";
import axios from "axios";

function TodoCard({ fetchAllTodos, todo, setEditTodo, editTodo }) {
  const {
    _id: todId,
    title,
    description,
    isComplete,
    createdAt,
    updatedAt,
  } = todo;

  async function handleDelete() {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <p className="font-semibold">
          Are you sure you want to delete this todo?
        </p>

        <div className="flex gap-2 justify-end">
          <button
            className="bg-red-500 text-white px-3 py-1 rounded"
            onClick={async () => {
              toast.dismiss(t.id);

              try {
                await axios.delete(
                  `https://mern-todo-app-backend-m69o.onrender.com/todos/${todId}`,
                );

                toast.success("Todo Deleted Successfully");
                fetchAllTodos();
              } catch (error) {
                toast.error("Failed to Delete");
              }
            }}
          >
            Yes
          </button>

          <button
            className="bg-gray-400 text-white px-3 py-1 rounded"
            onClick={() => toast.dismiss(t.id)}
          >
            No
          </button>
        </div>
      </div>
    ));
  }
  async function handleComplete() {
    try {
      await axios.patch(
        `https://mern-todo-app-backend-m69o.onrender.com/todos/${todId}`,
      );

      fetchAllTodos();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="bg-black text-white rounded-2xl w-120 shadow-[0_0_25px_black] p-6 mt-4 ">
      {/* Title */}
      <h2 className="text-3xl font-bold">{title}</h2>

      {/* Description */}
      <p className="text-gray-600 mt-3 text-lg">{description}</p>

      <hr className="my-5" />

      {/* Bottom Section */}
      <div className="flex justify-between items-center">
        {/* Mark Complete */}
        {!editTodo && (
          <button
            onClick={handleComplete}
            className={`flex items-center gap-2 border ${isComplete ? "bg-green-600  text-white " : " border-green-500 text-green-600"} px-4 py-2 rounded-lg hover:bg-green-50`}
          >
            <IoCheckmarkDone size={22} />
            {isComplete ? "Completed" : "Mark as Complete"}
          </button>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => setEditTodo(todo)}
            className="p-3 rounded-full bg-blue-100 text-blue-600 hover:scale-105 transition"
          >
            <FiEdit size={22} />
          </button>

          <button
            onClick={handleDelete}
            className="p-3 rounded-full bg-red-100 text-red-600 hover:scale-105 transition"
          >
            <MdDelete size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoCard;
