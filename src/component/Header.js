import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

class Header extends React.Component {
  render() {
    return (
      <div
        className="row"
        style={{ backgroundColor: "black", borderBottom: "2px solid white" }}
      >
        <div
          className="col-12"
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <a href="/">
            {" "}
            <img
              src="./logo.png"
              alt="the great hotel app logo"
              style={{
                width: "200px",
                height: 100,
                marginLeft: "0%",
              }}
            />
          </a>
        </div>
      </div>
    );
  }
}

export default Header;
