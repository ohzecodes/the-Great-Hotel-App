import React from "react";
import Model from "./Model";
import axios from "axios";
function Hotel(props) {
  console.log(props.obj.rev);
  let a = "";
  axios
    .get(props.src)
    .then(() => {
      a = props.src;
    })
    .catch(() => {
      a = "./uploads/placeholder.png";
    });

  return (
    <>
      <div className="card">
        <img
          src={a}
          className="card-img"
          style={{ maxHeight: 243 }}
          alt={"A picture of " + props.obj.name}
        />
        <div className="card-body" style={{ paddingLeft: 0 }}>
          <h3 className="card-title" style={{ textAlign: "center" }}>
            {props.obj.name}
          </h3>
          <ul>
            <li>Street Address: {props.obj.streetAddress}</li>
            <li>
              Website: <a href={props.web}>{props.web}</a>
            </li>
          </ul>

          <Model
            rev={props.obj.rev}
            name={props.obj.name}
            id={refinenametoid(props.obj.name)}
          />
        </div>
      </div>
    </>
  );
}

export default Hotel;
function refinenametoid(string) {
  return string.replace(/\s/g, "");
}
