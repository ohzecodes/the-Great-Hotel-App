import React from "react";
import { FORM_ENUM } from "./formSubmitEnum";

const Formsubmit = ({ submit, style, reset }) => {
  switch (submit) {
    case FORM_ENUM.SUCCESS: {
      if (reset) reset();
      return (
        <div
          className="submit_form"
          style={{
            backgroundColor: "#E9F0D8",
            color: "#6C6B4E",
          }}
        >
          successful submit{" "}
        </div>
      );
    }
    case FORM_ENUM.NOTFILLED: {
      // enpty div for when form not submited
      return (
        <div
          className="submit_form"
          style={{
            backgroundColor: "#000",
            color: "#fff",
          }}
          hidden
        >
          nothing yet
        </div>
      );
    }
    case FORM_ENUM.ERROR: {
      return (
        <div
          className="submit_form"
          style={{ backgroundColor: "red", color: "white" }}
        >
          {" "}
          Sorry, We encountered errors
        </div>
      );
    }
  }
};

export default Formsubmit;
