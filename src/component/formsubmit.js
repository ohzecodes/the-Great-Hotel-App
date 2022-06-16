import React from "react";
import { FORM_ENUM } from "./formSubmitEnum";

const Formsubmit = ({ submit, style, reset }) => {
  switch (submit) {
    case FORM_ENUM.SUCCESS: {
      if (reset) reset();
      return (
        <div
          style={{
            background: "#E9F0D8",
            color: "#6C6B4E",
            ...style,
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
          style={{
            ...style,
            borderTop: 0,
            color: "white",
          }}
        ></div>
      );
    }
    case FORM_ENUM.ERROR: {
      return (
        <div style={{ background: "red", ...style }}>
          {" "}
          Sorry, We encountered errors
        </div>
      );
    }
  }
};

export default Formsubmit;
