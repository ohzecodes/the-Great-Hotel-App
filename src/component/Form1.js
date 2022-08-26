import React from "react";
import Formsubmit from "./formsubmit";

class Form1 extends React.Component {
  constructor(props) {
    super(props);

    this.clearAll = this.clearAll.bind(this);
  }
  clearAll() {
    document.getElementById("name").value = "";
    document.getElementById("city").value = "";
    document.getElementById("Address").value = "";
    document.getElementById("website").value = "";
  }
  render() {
    return (
      <form
        style={{ backgroundColor: this.props.bg }}
        method="post"
        id="formAdd"
        className="formqwe"
        encType="multipart/form-data"
        onSubmit={this.props.submitform}
      >
        <Formsubmit submit={this.props.submit} reset={this.clearAll} />

        <div className="form-group row">
          <h1 className="col-sm-12 forml">Add a new Hotel</h1>
        </div>
        <div className="form-body">
          <div className="form-group row">
            <label className="col-sm-3 col-form-label sr-only">
              Name<span className="req">*</span>
            </label>
            <div className="col-sm-12">
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Name"
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 col-form-label sr-only">
              City<span className="req">*</span>
            </label>
            <div className="col-sm-12">
              <input
                type="text"
                className="form-control"
                id="city"
                placeholder="City"
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 col-form-label sr-only">
              Street Address<span className="req">*</span>
            </label>
            <div className="col-sm-12">
              <input
                type="text"
                className="form-control"
                id="Address"
                placeholder="Address"
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 col-form-label sr-only">
              Website<span className="req">*</span>
            </label>
            <div className="col-sm-12">
              <input
                type="text"
                className="form-control"
                id="website"
                placeholder="Website"
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 col-form-label alert-dismissible sr-only">
              Image<span className="req">*</span>
            </label>
            <div className="col-sm-12">
              <div style={{ display: "flex" }}>
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
                  <span
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {this.props.filename == "" ? (
                      <p>
                        <span className="upload">Click Here to Upload </span>
                        Image
                      </p>
                    ) : (
                      this.props.filename
                    )}
                  </span>
                </label>
                <input
                  className="btn btn-danger"
                  type="button"
                  id="file-reset"
                  onClick={this.props.fileremove}
                  value="reset"
                />
              </div>
              {this.props.image !== null ? (
                <div id="formimgcon">
                  <img
                    src={this.props.image}
                    alt="The current file"
                    width={100}
                    height={100}
                    className="image"
                    onClick={this.props.fileremove}
                  />
                  <div className="imgoverlay" onClick={this.props.fileremove}>
                    <span aria-hidden="true">&times;</span>
                  </div>
                </div>
              ) : null}
              <p> MAX: 3MB</p>
            </div>
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
