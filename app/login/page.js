"use client";
import { backendapi } from "@/config";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/signin.css";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { loginUser } from "@/reducers/userreducer";
import Link from "next/link";

const Signin = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showEye, setShowEye] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const userChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await dispatch(loginUser(user));

      if (loginUser.fulfilled.match(response)) {
        toast.success("Login Successful");
        setUser({ email: "", password: "" });

        router.push("/showproducts");
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={formSubmit}>
        <input
          type="text"
          name="email"
          className="input-field"
          placeholder="Enter your email"
          value={user.email}
          onChange={userChange}
        />

        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            className="input-field"
            placeholder="Enter your password"
            value={user.password}
            onChange={userChange}
            onFocus={() => setShowEye(true)}
            onBlur={() => !user.password && setShowEye(false)}
          />{" "}
          {showEye && user.password && (
            <button
              type="button"
              className="btn-show"
              title={showPassword ? "hide password" : "show password"}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          )}
        </div>
        <p>
          New Here?{" "}
          <Link href="/signup">
            <span
              style={{
                color: "blue",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Sign up Now
            </span>
          </Link>
        </p>

        <button type="submit" className="login-button" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Signin;
