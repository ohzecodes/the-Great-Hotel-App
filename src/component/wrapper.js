import React, { useState } from "react";
// const City = React.lazy(() => import(/* webpackPreload: true */ "./city"));
// const Model = React.lazy(() => import(/* webpackPreload: true */ "./model"));
// const Form2 = React.lazy(() => import(/* webpackPreload: true */ "./Form2"));
import Form2 from "./Form2";
import Model from "./model";
import City from "./city";
import Formsubmit from "./formsubmit";
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

  return (
    <>
      {Object.values(groupBy(hotel, "city")).map((hotel, k) => (
        <City key={k} hotel={hotel} citynum={k}></City>
      ))}
      <Model bg={"#f4f3ee"} clearMsgForm2={clearMsgForm2} reset={reset}>
        <Formsubmit submit={submit} style={style} reset={reset} />
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
