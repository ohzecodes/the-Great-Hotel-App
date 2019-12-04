import React from "react";
import  Model  from "./Model";


// props: name address rev[] price
function Hotel(props) {

  return (
    <>
      <div className="card" style={{width: "18rem", marginRight:"20px" }}>
      <img src={props.src} className="card-img-top" alt={"A picture of "+props.obj.name }/>
        <div className="card-body">
        <h5 className="card-title">{props.obj.name}</h5>
          <ul className="card-text">
            <li>Street Address: {props.obj.streetAddress}</li>
            <li>Website: <a href= {props.web}>{props.web}</a></li>
          
          </ul>
          <Model rev={props.obj.rev} name={props.obj.name}/>
                
        </div>
      </div>
    </>
  );
}

export default Hotel;

