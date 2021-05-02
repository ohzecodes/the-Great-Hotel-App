import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Sb from './Sb';
class Header extends React.Component {
  render() {
    let SearchStyle = {
      marginLeft: 12,
      PaddingLeft: 0,
      color: "white",
      float: "right"
    };

    let logoStyle = {
      width: "100%",
      height: 100,
      marginLeft:"0%"
    };
    return (
        <div className="row " style={{backgroundColor:"black"}} >
          <div className="col-2 "
          >
            <img src={require("../../logo.png")} style={logoStyle} />
          </div>
          <Sb SearchStyle={SearchStyle} />
        </div>

    );
  }
}

export default Header;
