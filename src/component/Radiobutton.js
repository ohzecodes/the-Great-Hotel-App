import React from 'react';
function Radiobutton(props){
    return <div className="form-check form-check-inline">
    <input className="form-check-input" name={props.name} type="radio" id={`radio${props.id}`} value={props.id}/>
    <label className="form-check-label" htmlFor={`radio${props.id}`}>
    {props.id}
    </label>
  </div>

}


export default Radiobutton;