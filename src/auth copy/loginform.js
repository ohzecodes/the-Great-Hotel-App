import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const LoginForm = ({ location = null, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/login",
        { email, password },
        config
      );
      // console.log(data);
      localStorage.setItem("authToken", data.token);
      history.push("welcome");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <>
      <form onSubmit={loginHandler} className="login-screen__form">
        <h3 className="login-screen__title" style={{ textAlign: "center" }}>
          Login
          {location === "welcome" ? (
            <p
              style={{
                fontSize: 15,
                letterSpacing: 3,
                textTransform: "capitalize",
              }}
            >
              for bookings request
            </p>
          ) : null}
        </h3>

        {error && <span className="error-message">{error}</span>}
        <div className="form-group">
          <label htmlFor="email" className="sr-only">
            Email:
          </label>
          <input
            type="email"
            required
            id="email"
            placeholder="Enter Email address"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            tabIndex={1}
          />
        </div>
        <div className="form-group">
          <label className="sr-only" htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            required
            id="password"
            autoComplete="true"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            tabIndex={2}
          />
          <label>
            <Link to="/forgotpassword" className="login-screen__forgotpassword">
              Forgot Password?
            </Link>
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>

        <label id="register" style={{ textTransform: "capitalize" }}>
          Don't have an account? <Link to="/register">Register</Link>
        </label>
      </form>
    </>
  );
};

export default LoginForm;
