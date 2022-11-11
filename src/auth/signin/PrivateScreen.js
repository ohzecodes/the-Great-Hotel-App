import React from "react";

import { useState, useEffect } from "react";
import axios from "axios";

import LoginApp from "./loginApp";
const PrivateScreen = () => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");
  const [User, SetUser] = useState("");

  useEffect(() => {
    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      try {
        const { data } = await axios.get("/api/private", config);
        setPrivateData(data.data);
        SetUser(data.user);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };
    console.log(error);
    fetchPrivateDate();
  }, []);
  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    <LoginApp data={privateData} user={User} />
  );
};

export default PrivateScreen;
