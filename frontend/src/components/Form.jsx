import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import LoadingIndicator from "./LoadingIndicator";

function Form({ route, method }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const name = method === "login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      let requestData = { username, password };

      if (method === "register") {
        requestData.role = role;
      }
      const res = await api.post(route, requestData);

      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md w-full mx-auto bg-white p-8 rounded-lg shadow-lg"
    >
      <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">
        {name}
      </h1>

      {/* Username Input */}
      <input
        className="w-full p-3 border border-gray-300 rounded-md mb-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />

      {/* Conditionally Render Role Select (for Register only) */}
      {method === "register" && (
        <select
          className="w-full p-3 border border-gray-300 rounded-md mb-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      )}

      {/* Password Input */}
      <input
        className="w-full p-3 border border-gray-300 rounded-md mb-6 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />

      {/* Loading Indicator */}
      {loading && (
        <div className="flex justify-center mb-4">
          <LoadingIndicator />
        </div>
      )}

      {/* Submit Button */}
      <button
        className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        disabled={loading}
      >
        {loading ? "Submitting..." : name}
      </button>
    </form>
  );
}
export default Form;
