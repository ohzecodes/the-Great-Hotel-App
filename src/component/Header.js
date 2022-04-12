import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Sb from "./Sb";
class Header extends React.Component {
  render() {
    let SearchStyle = {
      marginLeft: 12,
      PaddingLeft: 0,
      color: "white",
      float: "right",
    };

    return (
      <div className="row " style={{ backgroundColor: "black" }}>
        <div
          className="col-2 "
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <img
            src="./logo.png"
            style={{
              width: "200px",
              height: 100,
              marginLeft: "0%",
            }}
          />
        </div>
        <Sb SearchStyle={SearchStyle} />
      </div>
    );
  }
}

export default Header;
