import React from "react";
import Hotel from "./Hotel";
import { Trendy_Metropolitan } from "./color";
// props: name of the city
class City extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log();
    const { citynum } = this.props;

    let bgnumber =
      citynum % Object.values(Trendy_Metropolitan).splice(1).length;

    const bg =
      Object.values(Trendy_Metropolitan).splice(1)[bgnumber] || "white";

    console.log(bg);
    const name = this.props.hotel[0].city;
    console.log(this.props.hotel);
    this.props.hotel.forEach((element) => {
      element.filepath = "./" + element.filepath.split("/").slice(1).join("/");

      element.website = refineweb(element.website);
      console.log(element.website);
    });
    console.log();
    return (
      <>
        <div
          id={name}
          style={{
            padding: 25,
            borderBottom: "2px dotted black",
            backgroundColor: bg,
          }}
        >
          <h2
            style={{
              textAlign: "center",
              fontFamily: "SignPainter",
              fontSize: "4rem",
            }}
          >
            {name}
          </h2>
          <div id="wrapper" className="row">
            {this.props.hotel.map((r, key) => (
              <Hotel key={key} obj={r} />
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default City;

function refineweb(string) {
  if (string.substring(0, 8) !== "https://") {
    string = "https://" + string;
  }
  return string;
}
