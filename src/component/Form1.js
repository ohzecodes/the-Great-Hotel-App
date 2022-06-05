import React from "react";
class Form1 extends React.Component {
  render() {
    let formsubmit;
    let style = {
      width: "100%",
      textAlign: "center",
      borderTopLeftRadius: "60px",
      borderTopRightRadius: "60px",
      paddingBottom: "10px",
      paddingTop: "10px",
      borderTop: "2px solid black",
    };
    switch (this.props.submit) {
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
          ></div>
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
      <form
        style={{ background: this.props.bg }}
        method="post"
        className="formqwe"
        encType="multipart/form-data"
        onSubmit={this.props.submitform}
      >
        {formsubmit}
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
