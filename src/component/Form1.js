import React from "react";
class Form1 extends React.Component {
  render() {
    return (
      <form
        style={{ background: this.props.bg }}
        method="post"
        className="formqwe"
        encType="multipart/form-data"
        onSubmit={this.props.submitform}
      >
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
            />
            <span className="help-block">MAX: 5MB</span>
          </div>
        </div>

        <div className="form-group row">
          <div className="col-sm-12">
            <button type="submit" className="btn btn-primary form-control">
              Submit
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default Form1;
