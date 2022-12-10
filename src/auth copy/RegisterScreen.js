import React from "react";
// import "core-js/stable";?
import "regenerator-runtime/runtime";

import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const RegisterScreen = ({ history }) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [phone, setphone] = useState("");
  const [email, setEmail] = useState("");

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const registerHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        "/api/auth/register",
        {
          firstname,
          lastname,
          phone,
          email,
        },
        config
      );

      const dd = await axios.post(
        "/api/auth/forgotpassword",
        { ...data },
        config
      );

      if (dd.data.success) {
        setSuccess(
          "I have sent you an email. please check it to set a password"
        );
      }
      setTimeout(() => {
        setSuccess("");
      }, 5000);
    } catch (error) {
      console.log(JSON.parse(JSON.stringify(error)));
      const errorDecode = b(error.message, [
        { code: 422, message: "Duplicate Field value entered" },
        { code: 409, message: "Email already in use" },
      ]);
      if (errorDecode) {
        setError(errorDecode);
      } else {
        setError("Unknown Errors");
      }
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <>
      {" "}
      {/* <Header /> */}
      <div className="register-screen">
        <form
          onSubmit={registerHandler}
          id="r1"
          className="register-screen__form"
        >
          <h3 className="register-screen__title">Register</h3>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <div className="form-group">
            <label className="sr-only" htmlFor="firstname">
              First Name:
            </label>
            <input
              type="text"
              required
              id="firstname"
              placeholder="enter First Name"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="sr-only" htmlFor="lastname">
              Last Name:
            </label>
            <input
              type="text"
              required
              id="lastname"
              placeholder="enter lastname"
              value={lastname}
              onChange={(e) => setlastname(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="sr-only" htmlFor="Phone">
              Phone:
            </label>
            <input
              type="tel"
              required
              id="phone"
              placeholder="enter Phone Number"
              value={phone}
              onChange={(e) => {
                if (e.target.value !== "") {
                  if (!isNaN(parseInt(e.target.value)))
                    setphone(parseInt(e.target.value));
                } else {
                  setphone("");
                }
              }}
            />
          </div>

          <div className="form-group">
            <label className="sr-only" htmlFor="email">
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

          <button
            type="button"
            onClick={registerHandler}
            id="register1"
            className="btn btn-primary"
          >
            Register
          </button>
          <span className="register-screen__subtext">
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </form>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default RegisterScreen;
