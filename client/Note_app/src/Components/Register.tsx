import React, { useEffect, useState } from "react";
import { registerUser } from "../api/api"; // Adjust the import path as necessary
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigator = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    contact: "",
    profile_image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "image" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await registerUser(formData);
      console.log("Registration successful:", data);
      navigator("/login"); // Redirect to login after successful registration
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      // Reset form data after submission
      setFormData({
        username: "",
        email: "",
        password: "",
        contact: "",
        profile_image: null,
      });
    }
  };

  return (
    <div className="register-page">
      <form className="register-card" onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        <label>
          Username
          <input
            type="text"
            name="username"
            required
            value={formData.username}
            onChange={handleChange}
          />
        </label>

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

        <label>
          Contact (optional)
          <input
            type="tel"
            name="contact"
            required
            value={formData.contact}
            onChange={handleChange}
          />
        </label>

        <label>
          Profile Image
          <input
            type="file"
            name="profile_image"
            accept="image/*"
            onChange={handleChange}
          />
        </label>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
