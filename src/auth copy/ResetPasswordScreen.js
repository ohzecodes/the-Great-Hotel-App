import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// import Header from "../Header";
// import Footer from "../Footer";

const ResetPasswordScreen = ({ history, match }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const resetPasswordHandler = async (e) => {
    e.preventDefault();
    // console.log(e);
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords don't match");
    }

    try {
      const { data } = await axios.put(
        `/api/auth/newpassword/${match.params.resetToken}`,
        {
          password,
        },
        config
      );

      setSuccess(data.data);
      console.log(data);
      setTimeout(() => {
        setSuccess("");
      }, 5000);
    } catch (error) {
      setError(error || "an error happened");
      setError("an error happened");
    }
  };

  return (
    <>
      {" "}
      {/* <Header /> */}
      <div className="resetpassword-screen">
        <form
          onSubmit={resetPasswordHandler}
          className="resetpassword-screen__form"
        >
          <h3 className="resetpassword-screen__title">set your password</h3>
          {error && <p className="error-message">{error} </p>}
          {success && (
            <p className="success-message">
              {success} <Link to="/login">Login</Link>
            </p>
          )}
          <div className="form-group">
            <label htmlFor="password" className="sr-only">
              New Password:
            </label>
            <input
              type="password"
              required
              id="password"
              placeholder="enter new password"
              autoComplete="true"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmpassword" className="sr-only">
              Confirm New Password:
            </label>
            <input
              type="password"
              required
              id="confirmpassword"
              placeholder="enter Confirm new password"
              autoComplete="true"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            onClick={resetPasswordHandler}
            className="btn btn-primary"
          >
            Set your Password
          </button>
        </form>
      </div>
      {/* <Footer />{" "} */}
    </>
  );
};

export default ResetPasswordScreen;
