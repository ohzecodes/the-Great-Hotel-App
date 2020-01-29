import React from "react";
import Axios from "axios";

class Sb extends React.Component {
  handlesubmition(event) {
    event.preventDefault()
    var city = document.getElementById("search").value;
   location.href=`#${city}`
  }

  render() {
    return (
      <>
        <div className="col-9">
          <form onSubmit={this.handlesubmition}>
            <div
              style={{ marginTop: 25 }}
              className="p-1 bg-dark rounded rounded-pill shadow-sm mb-4"
            >
              <div className="input-group">
                <input
                  id="search"
                  style={this.props.SearchStyle}
                  type="search"
                  placeholder="Where are you looking to Stay?"
                  className="form-control border-0 bg-dark"
                />
                <div className="input-group-append">
                  <button
                    id="button-addon1"
                    type="submit"
                    className="btn btn-link text-primary"
                  >
                    <i className="fa fa-search"></i>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default Sb;
