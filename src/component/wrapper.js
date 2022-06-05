import React, { useState } from "react";
// const City = React.lazy(() => import(/* webpackPreload: true */ "./city"));
// const Model = React.lazy(() => import(/* webpackPreload: true */ "./model"));
// const Form2 = React.lazy(() => import(/* webpackPreload: true */ "./Form2"));
import Form2 from "./Form2";
import Model from "./model";
import City from "./city";

function groupBy(objectArray = [], property = "") {
  if (objectArray !== undefined)
    return objectArray.reduce((acc, obj) => {
      let key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
}

const Wrapper = ({ hotel, Handleform2submit, submit, clearMsgForm2 }) => {
  let style = {
    width: "100%",
    textAlign: "center",
    paddingBottom: "10px",
    paddingTop: "10px",
  };
  const [rating, setrating] = useState(-1);
  const reset = () => {
    setrating(-1);
    document.getElementById("Textarea").value = "";
  };
  let formsubmit;
  switch (submit) {
    case 1: {
      formsubmit = (
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
      break;
    }
    case 0: {
      // enpty div for when form not submited
      formsubmit = (
        <div
          style={{
            ...style,
            borderTop: 0,
            color: "white",
          }}
        >
          form yet to be submit
        </div>
      );
      break;
    }
    case -1: {
      formsubmit = (
        <div style={{ background: "red", ...style }}>
          {" "}
          Sorry, We encountered errors
        </div>
      );
      break;
    }
  }

  return (
    <>
      {Object.values(groupBy(hotel, "city")).map((hotel, k) => (
        <City key={k} hotel={hotel} citynum={k}></City>
      ))}
      <Model bg={"#f4f3ee"} clearMsgForm2={clearMsgForm2} reset={reset}>
        {formsubmit}
        <Form2
          bg="white"
          setrating={[rating, setrating]}
          submitform={Handleform2submit}
          reset={reset}
        />
      </Model>
    </>
  );
};

export default Wrapper;
