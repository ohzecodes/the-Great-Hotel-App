import React from "react";
import Radiobutton from "./Radiobutton";
import Rating from "./rating";
class Form2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: -1,
    };

    this.getr = this.getr.bind(this);
  }

  getr(r) {
    this.setState({ rating: r });
  }
  render() {
    return (
      <form className="formqwe" onSubmit={this.props.submitform}>
        <div className="form-group row"></div>
        <label className="col-sm-12 forml">Rate Your Stay</label>
        <div />

        <div className="form-group row">
          <label className="col-sm-3 col-form-label" htmlFor="hotelSelect">
            Select your Hotel
          </label>
          <select id="hotelSelect" className="form-control col-sm-9 ">
            {this.props.Hotelnames.map((e, key) => (
              <option key={key}>{e}</option>
            ))}
          </select>
        </div>
        <div className="form-group row">
          <label className="col-sm-3 col-form-label" htmlFor="rateme">
            Rate your stay
          </label>

          <Rating
            stars={5}
            getr={this.getr}
            hoverColor="grey"
            clickColor="black"
            style={{
              display: "flex",
              width: 250,
              height: "50px",
              justifyContent: "center",
              alignItems: "center",
              background: "white",
            }}
          />
          <p id="rating" hidden>
            {this.state.rating}
          </p>
        </div>
        <div className="form-group row">
          <label className="col-sm-3 col-form-label" htmlFor="Textarea">
            Comments{" "}
          </label>
          <div className="col-sm-9">
            <textarea
              className="form-control "
              id="Textarea"
              rows="3"
            ></textarea>
            <span className="help-block">MAX:200 charecters</span>
          </div>{" "}
        </div>
        <button
          type="submit"
          className="btn btn-primary col-sm-12 form-control"
        >
          Submit
        </button>
      </form>
    );
  }
}

export default Form2;
