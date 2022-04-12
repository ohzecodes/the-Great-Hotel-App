import React from "react";
import Hotel from "./Hotel";
import Axios from "axios";
// props: name of the city
class City extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const name = this.props.hotel[0].city;

    return (
      <>
        <div id={name} style={{ marginLeft: 50 }}>
          <h2>{name}</h2>
          <div id="wrapper" className="row">
            {this.props.hotel.map((r, key) => (
              <Hotel
                key={key}
                obj={r}
                src={
                  refineimgsrc(r.filepath) ||
                  "http://via.placeholder.com/640x360"
                }
                web={refineweb(r.website)}
              />
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default City;

function refineimgsrc(string) {
  let m = string.split("/").slice(1).join("/");
  return "/" + m;
}
function refineweb(string) {
  if (string.substring(0, 8) !== "https://") {
    string = "https://" + string;
  }
  return string;
}
