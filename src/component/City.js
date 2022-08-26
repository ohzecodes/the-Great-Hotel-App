import React from "react";
import Hotel from "./Hotel";
import { Trendy_Metropolitan } from "./color";
import HotelWrapper from "./HotelWrapper";

function refineweb(string) {
  if (string.substring(0, 8) !== "https://") {
    string = "https://" + string;
  }
  return string;
}
function Is_light(color) {
  const hex = color.replace("#", "");
  const c_r = parseInt(hex.substr(0, 2), 16);
  const c_g = parseInt(hex.substr(2, 2), 16);
  const c_b = parseInt(hex.substr(4, 2), 16);
  const brightness = (c_r * 299 + c_g * 587 + c_b * 114) / 1000;
  return brightness > 155;
}

class City extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { citynum } = this.props;
    let bgnumber =
      citynum % Object.values(Trendy_Metropolitan).splice(1).length;
    const bg =
      Object.values(Trendy_Metropolitan).splice(1)[bgnumber] || "white";
    const name = this.props.hotel[0].city;

    this.props.hotel.forEach((element) => {
      element.filepath = !element.filepath
        ? "./uploads/placeholder.png"
        : "./" + element.filepath.split("/").slice(1).join("/");
      element.website = refineweb(element.website);
    });
    return (
      <>
        <div
          id={name}
          style={{
            padding: 25,
            borderBottom: Is_light(bg) ? "2px solid black" : "2px solid white",
            backgroundColor: bg,
          }}
        >
          <h2
            className="city-title"
            style={{ color: Is_light(bg) ? "black" : "white" }}
          >
            {name}
          </h2>
          <div id="wrapper" className="row hotelwrapper">
            <HotelWrapper hotel={this.props.hotel} />
          </div>
        </div>
      </>
    );
  }
}

export default City;
