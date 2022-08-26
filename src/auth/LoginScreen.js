// import axios from "axios";
import React, { useEffect } from "react";
import Header from "../component/Header";
// import { Link } from "react-router-dom";
import "./auth.scss";

// import Header from "../component/Header";
// import Footer from "../component/footer";
import LoginForm from "./loginform";

const LoginScreen = (props) => {
  return (
    <>
      <Header location="login" />
      <div className="login-scree">
        <LoginForm {...props} />
      </div>
    </>
  );
};

export default LoginScreen;
