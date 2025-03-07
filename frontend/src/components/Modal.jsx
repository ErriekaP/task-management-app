import React from "react";

const Modal = ({
  isModalOpen,
  setIsModalOpen,
  createTask,
  title,
  setTitle,
  content,
  setContent,
  status,
  setStatus,
}) => {
  const handleChange = (e) => {
    setStatus(e.target.value);
  };

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">
                Create a Task
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <span className="text-2xl">×</span>
              </button>
            </div>

            <form onSubmit={createTask} className="space-y-5">
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
                  name="title"
                  required
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
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
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="mt-1 text-black block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                ></textarea>
              </div>

              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700"
                >
                  Status:
                </label>
                <select
                  onChange={handleChange}
                  value={status}
                  className="select bg-white mt-1 text-gray-700 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select Status</option>
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="In Review">In Review</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div>
                <input
                  type="submit"
                  value="Submit"
                  className="mt-6 w-full bg-indigo-600 text-white font-semibold py-3 px-4 rounded-md cursor-pointer hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
