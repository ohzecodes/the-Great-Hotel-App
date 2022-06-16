import React from "react";
import Formsubmit from "./formsubmit";

class Form1 extends React.Component {
  constructor(props) {
    super(props);
    this.clearAll = this.clearAll.bind(this);
  }
  clearAll() {
    // document.getElementById("file").value = "";
    document.getElementById("name").value = "";
    document.getElementById("city").value = "";
    document.getElementById("Address").value = "";
    document.getElementById("website").value = "";
  }
  render() {
    // let formsubmit =
    let style = {
      width: "100%",
      textAlign: "center",
      borderTopLeftRadius: "60px",
      borderTopRightRadius: "60px",
      paddingBottom: "10px",
      paddingTop: "10px",
      borderTop: "2px solid black",
    };

    return (
      <form
        style={{ background: this.props.bg }}
        method="post"
        className="formqwe"
        encType="multipart/form-data"
        onSubmit={this.props.submitform}
      >
        <Formsubmit
          submit={this.props.submit}
          style={style}
          reset={this.clearAll}
        />
        ;
        <div className="form-group row">
          <label className="col-sm-12 forml">Add a new Hotel</label>
        </div>
        <div className="form-group row">
          <label className="col-sm-4 col-form-label"> Name </label>
          <div className="col-sm-8">
            <input type="text" className="form-control" id="name" />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-4 col-form-label"> City </label>
          <div className="col-sm-8">
            <input type="text" className="form-control" id="city" />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-4 col-form-label"> Street Address </label>
          <div className="col-sm-8">
            <input type="text" className="form-control" id="Address" />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-4 col-form-label"> Website </label>
          <div className="col-sm-8">
            <input type="text" className="form-control" id="website" />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-4 col-form-label"> Image </label>
          <div className="col-sm-8">
            <input
              onChange={this.props.FShandle}
              type="file"
              name="hotelImg"
              accept="image/*"
              className="form-control"
              id="file"
              hidden
            />
            <label htmlFor="file" id="fileupload">
              {this.props.filename == ""
                ? "Click here to upload image"
                : this.props.filename}
            </label>
            <br /> MAX: 3MB
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-12">
            <button type="submit" className="btn btn-submit form-control">
              Submit
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default Form1;
