import React, { useState } from "react";
import Rating from "./rating";

const Form2 = (props) => {
  const { submitform, reset } = props;
  const setrating = props.setrating[1];
  const rating = props.setrating[0];

  return (
    <form
      className="formqwe"
      id="ratingform"
      style={{ background: props.bg }}
      onSubmit={submitform}
    >
      <div className="form-group row"></div>
      <label className="col-sm-12 forml">Rate Your Stay</label>
      <div />

      <div className="form-group row">
        <label className="col-sm-3 col-form-label" htmlFor="recipient-name">
          Select your Hotel
        </label>
        <input
          type="text"
          className="form-control col-sm-9"
          id="recipient-name"
          disabled
        />
      </div>
      <div className="form-group row">
        <label className="col-sm-3 col-form-label" htmlFor="rateme">
          Rate your stay
        </label>

        <Rating
          stars={5}
          setrating={[rating, setrating]}
          hoverColor="grey"
          clickColor="black"
          initcolor={props.bg}
          style={{
            display: "flex",
            width: 250,
            height: "50px",
            justifyContent: "center",
            alignItems: "center",
            background: "inherit",
          }}
        />
        <p id="rating" hidden>
          {rating}
        </p>
      </div>
      <div className="form-group row">
        <label className="col-sm-3 col-form-label" htmlFor="Textarea">
          Comments{" "}
        </label>
        <div className="col-sm-9">
          <textarea className="form-control " id="Textarea" rows="3"></textarea>
          <span className="help-block">MAX:200 charecters</span>
        </div>{" "}
      </div>

      <button
        onClick={reset}
        type="button"
        style={{
          borderBottomRightRadius: 0,
          borderBottomLeftRadius: 0,
          textTransform: "capitalize",
        }}
        className="btn btn-danger col-sm-12 form-control"
      >
        reset
      </button>
      <button
        type="submit"
        style={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
        className="btn btn-submit col-sm-12 form-control"
      >
        Submit
      </button>
    </form>
  );
};
export default Form2;
