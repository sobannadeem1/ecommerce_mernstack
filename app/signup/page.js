"use client";
import { backendapi } from "@/config";
import axios from "axios";
import "../styles/signup.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { signUser } from "@/reducers/userreducer";
import { FaEye, FaEyeSlash, FaSlash } from "react-icons/fa";

const Signup = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showEye, setShowEye] = useState(false);
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    role: "user",
    profileImage: null,
  });

  const [loading, setLoading] = useState(false);

  const userChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setUser({ ...user, profileImage: e.target.files[0] });
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("username", user.username);
    formData.append("password", user.password);
    formData.append("email", user.email);
    formData.append("role", user.role);

    if (user.profileImage) {
      formData.append("profileImage", user.profileImage);
    }

    try {
      const resultAction = await dispatch(signUser(formData));

      if (signUser.fulfilled.match(resultAction)) {
        toast.success("User created successfully");
        setUser({
          username: "",
          password: "",
          email: "",
          role: "user",
          profileImage: null,
        });
      }
    } catch (error) {
      console.error("Error Response:", error.response);
      toast.error(error.response?.data?.message || "Signup failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h1 className="text-center text-success">Sign-Up</h1>
      <ToastContainer position="top-right" autoClose={2000} />
      <form onSubmit={formSubmit} className="signup-form">
        <label htmlFor="username">UserName:</label>
        <input
          type="text"
          id="username"
          name="username"
          required
          value={user.username}
          onChange={userChange}
        />
        <label htmlFor="password">Password:</label>
        <div className="passwordcontainer">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            required
            value={user.password}
            onChange={userChange}
            onFocus={() => setShowEye(true)}
            onBlur={() => !user.password && setShowEye(false)}
          />

          {showEye && user.password && (
            <button
              type="button"
              title={showPassword ? "Hide Password" : "Show Password"}
              className="btn-show"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          )}
        </div>

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          required
          value={user.email}
          onChange={userChange}
        />

        <label htmlFor="profileImage">Profile Image:</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />

        <label htmlFor="role">Role:</label>
        <select name="role" id="role" value={user.role} onChange={userChange}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
