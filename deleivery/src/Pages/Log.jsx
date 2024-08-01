import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/log.css";

const Log = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        formData
      );
      const { token, user } = response.data;

      // Save token and user info to local storage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

     
      if (user.role === "customer") {
        navigate("/customer-profile");
      } else if (user.role === "owner") {
        if (user.status === "approved") {
          navigate("/owner-profile");
        } else {
          navigate("/waiting-for-approval");
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="log-body">
      <div className="log-bg">
        <div className="log-shape"></div>
        <div className="log-shape"></div>
      </div>

      <form onSubmit={handleSubmit} className="log-form">
        <h3>Login</h3>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
        <Link to="/signup">
          <p>Do not have Account..... </p>
        </Link>
      </form>
      {error && <p>{error}</p>}
      {message && <p>{message}</p>}
    </div>
  );
};

export default Log;
