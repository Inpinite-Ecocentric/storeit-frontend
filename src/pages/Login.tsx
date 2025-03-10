/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/global.css";
import { useAuth } from "../components/AuthContext";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, isAdmin, isWorker, isSupervisor } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await login({
        username,
        password,
      });

      if (!result.success) {
        setError(result.message);
        setLoading(false);
        return;
      }

      // Redirect to dashboard for all users
      navigate("/dashboard");
    } catch (err: any) {
      setError(
        err.message || "An unexpected error occurred. Please try again."
      );
      setLoading(false);
    }
  };

  return (
    <div className="pt-4 vh-100 align-items-center bgLoginPage">
      <div className="container d-flex justify-content-center align-items-center border border-0 p-2 shadow p-3 mb-5 bg-white rounded w-75">
        <div>
          <img src="/Frame 37745.jpg" height={500} width={350} alt="Login" />
        </div>
        <div className="card border border-0 w-100">
          <div className="card-body">
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="d-flex w-100">
                <div className="p-2 w-100">
                  <label className="d-flex justify-content-start">
                    Username
                  </label>
                  <input
                    required
                    id="username"
                    name="username"
                    type="text"
                    className="border border-0 border-bottom w-100 mt-2 border-black"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
              <div className="d-flex w-100">
                <div className="p-2 w-100">
                  <label className="d-flex justify-content-start">
                    Password
                  </label>
                  <input
                    required
                    id="password"
                    name="password"
                    type="password"
                    className="border border-0 border-bottom border-black w-100 mt-2"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <button type="submit" className="loginButton" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
