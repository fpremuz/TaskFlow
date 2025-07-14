import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", { username, password });
      setMessage("Registered successfully! Redirecting to login...");
      setUsername("");
      setPassword("");

      setTimeout(() => navigate("/login"), 2000); // wait 2 sec then go to login
    } catch (error: any) {
      setMessage(error.response?.data || "Failed to register.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Register</h2>

      {message && <p className="mb-4 text-green-600">{message}</p>}

      <label className="block mb-2">
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border px-2 py-1 rounded"
          required
        />
      </label>

      <label className="block mb-4">
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-2 py-1 rounded"
          required
        />
      </label>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Register
      </button>
    </form>
  );
}