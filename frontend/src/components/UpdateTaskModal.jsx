import { useState, useEffect, use } from "react";
import api from "../api";
import React from "react";

function UpdateTaskModal({ task, onClose, onUpdate, onDelete }) {
  const [newTitle, setNewTitle] = useState(task.title);
  const [newContent, setNewContent] = useState(task.content);
  const [newStatus, setNewStatus] = useState(task.status);

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setNewContent(e.target.value);
  };
  const handleStatusChange = (e) => {
    setNewStatus(e.target.value);
  };

  const handleUpdate = () => {
    onUpdate(task.id, newTitle, newContent, newStatus);
    onClose();
  };

  const handleDelete = () => {
    onDelete(task.id);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Update Task</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <span className="text-2xl">×</span>
          </button>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title:
            </label>
            <input
              type="text"
              id="title"
              value={newTitle}
              onChange={handleTitleChange}
              className="mt-1 text-black block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700"
            >
              Content:
            </label>
            <textarea
              name="content"
              id="content"
              value={newContent}
              onChange={handleContentChange}
              className="mt-1 text-black block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700"
            >
              Status:
            </label>
            <select
              value={newStatus}
              onChange={handleStatusChange}
              className="select bg-white mt-1 text-gray-700 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="In Review">In Review</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleUpdate}
              className="w-full sm:w-auto mt-4 bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300"
            >
              Update
            </button>
            <button
              onClick={handleDelete}
              className="w-full sm:w-auto mt-4 bg-red-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-300"
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateTaskModal;
