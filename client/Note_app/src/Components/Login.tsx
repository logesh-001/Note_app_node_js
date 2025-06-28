import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/api"; // Adjust the import path as necessary
const Login = () => {
  const navigator = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    try {
      const data = await loginUser(formData);
      if (!data) {
        throw new Error("Login failed, no token received");
      }
      console.log("Login successful:", data);
      navigator("/dashboard"); // Redirect to dashboard after login
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="register-page">
      <form className="register-card" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <label>
          Email
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
