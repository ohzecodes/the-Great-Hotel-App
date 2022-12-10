import React from "react";

import { useState } from "react";
import axios from "axios";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const a = { email: email, newuser: false };
      const { data } = await axios.post(
        "/api/auth/forgotpassword",
        { ...a },
        config
      );

      setSuccess(data.data);
      setTimeout(() => {
        setSuccess("");
      }, 5000);
    } catch (error) {
      setError(error.response.data.error);
      setEmail("");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div>
      {" "}
      <div className="forgotpassword-screen">
        <form
          onSubmit={forgotPasswordHandler}
          className="forgotpassword-screen__form"
        >
          <h3 className="forgotpassword-screen__title">reset A Password</h3>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <div className="form-group">
            <p className="forgotpassword-screen__subtext">
              Please enter the email address you register your account with. We
              will send you reset password confirmation to this email
            </p>
            <label htmlFor="email" className="sr-only">
              Email:
            </label>
            <input
              type="email"
              required
              id="email"
              placeholder="enter Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Send Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordScreen;
