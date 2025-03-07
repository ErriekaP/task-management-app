import { useState, useEffect, use } from "react";
import api from "../api";
import Task from "../components/Task";
import React from "react";
import Modal from "../components/Modal";
import UpdateTaskModal from "../components/UpdateTaskModal";
function Home() {
  const [tasks, setTasks] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [status, setStatus] = React.useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    api
      .get("/api/tasks/")
      .then((res) => res.data)
      .then((data) => {
        setTasks(data);
        console.log(data);
      })
      .catch((error) => alert(error));
  };

  const deleteTask = async (id) => {
    api
      .delete(`/api/tasks/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          alert("Task deleted successfully!");
          setIsUpdateModalOpen(false);
        } else {
          alert("Failed to delete task.");
        }
        getTasks();
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          alert("You do not have permission to delete this task.");
          setIsUpdateModalOpen(false);
        }
        if (error.response && error.response.status === 403) {
          alert("You must be an Admin to update this task.");
          setIsUpdateModalOpen(false);
        } else {
          alert("An error occurred while delete the task.");
          setIsUpdateModalOpen(false);
        }
      });
  };

  const createTask = async () => {
    api
      .post("/api/tasks/", { title, content, status })
      .then((res) => {
        if (res.status === 201) {
          alert("Task created successfully!");
          setIsCreateModalOpen(false);
        } else {
          alert("Failed to create task.");
        }
        getTasks();
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          alert("You must be an Admin to create a task.");
          setIsCreateModalOpen(false);
        } else {
          alert("An error occurred while creating the task.");
          setIsCreateModalOpen(false);
        }
      });
  };

  const updateTask = async (id, title, content, status) => {
    api
      .patch(`/api/tasks/update/${id}/`, {
        title,
        content,
        status,
      })
      .then((res) => {
        if (res.status === 200) {
          alert("Task updated successfully!");
          setIsUpdateModalOpen(false);
        } else {
          alert("Failed to update task.");
        }
        getTasks();
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          alert("You do not have permission to update this task.");
          setIsUpdateModalOpen(false);
        }
        if (error.response && error.response.status === 403) {
          alert("You must be an Admin to update this task.");
          setIsUpdateModalOpen(false);
        } else {
          alert("An error occurred while updating the task.");
          setIsUpdateModalOpen(false);
        }
      });
  };

  const openModal = (task) => {
    setSelectedTask(task);
    setIsUpdateModalOpen(true);
  };

  const closeModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedTask(null);
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center p-4">
      <div className="w-full h-full max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold text-white">Tasks</h1>
          {/* Modal Button */}
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="btn bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
          >
            Add Task
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* To Do Tasks */}
          <div className="col-span-1 bg-gray-600 bg-opacity-20 p-6 rounded-lg shadow-md border border-gray-300 mb-4">
            <h2 className="text-xl font-semibold text-white mb-4">To Do</h2>
            <div className="space-y-4">
              {tasks
                .filter((task) => task.status === "To Do")
                .map((task) => (
                  <div key={task.id} onClick={() => openModal(task)}>
                    <Task task={task} />
                  </div>
                ))}
            </div>
          </div>

          {/* In Progress Tasks */}
          <div className="col-span-1 bg-gray-600 bg-opacity-20 p-6 rounded-lg shadow-md border border-gray-300 mb-4">
            <h2 className="text-xl font-semibold text-white mb-4">
              In Progress
            </h2>
            <div className="space-y-4">
              {tasks
                .filter((task) => task.status === "In Progress")
                .map((task) => (
                  <div key={task.id} onClick={() => openModal(task)}>
                    <Task task={task} />
                  </div>
                ))}
            </div>
          </div>

          {/* In Review Tasks */}
          <div className="col-span-1 bg-gray-600 bg-opacity-20 p-6 rounded-lg shadow-md border border-gray-300 mb-4">
            <h2 className="text-xl font-semibold text-white mb-4">In Review</h2>
            {tasks
              .filter((task) => task.status === "In Review")
              .map((task) => (
                <div key={task.id} onClick={() => openModal(task)}>
                  <Task task={task} />
                </div>
              ))}
          </div>

          {/* Completed Tasks */}
          <div className="col-span-1 bg-gray-600 bg-opacity-20 p-6 rounded-lg shadow-md border border-gray-300 mb-4">
            <h2 className="text-xl font-semibold text-white mb-4">Completed</h2>
            {tasks
              .filter((task) => task.status === "Completed")
              .map((task) => (
                <div key={task.id} onClick={() => openModal(task)}>
                  <Task task={task} />
                </div>
              ))}
          </div>
        </div>

        {/* Update Modal */}
        {isUpdateModalOpen && selectedTask && (
          <UpdateTaskModal
            task={selectedTask}
            onClose={closeModal}
            onUpdate={updateTask}
            onDelete={deleteTask}
          />
        )}
        {/* Modal Component */}
        {isCreateModalOpen && (
          <Modal
            isModalOpen={isCreateModalOpen}
            setIsModalOpen={setIsCreateModalOpen}
            createTask={createTask}
            title={title}
            setTitle={setTitle}
            content={content}
            setContent={setContent}
            status={status}
            setStatus={setStatus}
          />
        )}
      </div>
    </div>
  );
}

export default Home;
