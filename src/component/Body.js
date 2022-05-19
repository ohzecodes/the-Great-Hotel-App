import React from "react";
import "./style.css";
import Form1 from "./Form1";
import Axios from "axios";
import Form2 from "./Form2";
import City from "./City";
import { understated_versatile } from "./color";

function groupBy(objectArray = [], property = "") {
  if (objectArray !== undefined)
    return objectArray.reduce((acc, obj) => {
      let key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
}

class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hotel: [],
      file: null,
    };
    this.hotelFormsubmit = this.hotelFormsubmit.bind(this);
    this.Handleform2submit = this.Handleform2submit.bind(this);
    this.fileSectedhandle = this.fileSectedhandle.bind(this);
  }

  fileSectedhandle(event) {
    this.setState({ file: event.target.files[0] });
  }

  hotelFormsubmit(event) {
    event.preventDefault();
    let file = new FormData();
    if (this.state.file != null) {
      file.append("hotelImg", this.state.file, name(this.state.file.name));

      Axios.post("/images", file)
        .then((res) => {
          let x = {
            name: titleCase(document.getElementById("name").value + ""),
            city: titleCase(document.getElementById("city").value + ""),
            streetAddress: titleCase(
              document.getElementById("Address").value + ""
            ),
            website: document.getElementById("website").value + "",
            filepath: res.data.path,
          };

          var m = this.state.hotel.splice(0);

          Axios.post("/add/hotels", x)
            .then((r) => {
              this.setState({
                hotel: [...m, r.data],
              });
              alertonerr(r.data.errors);
              console.log(this.state.hotel);
            })
            .catch((e) => {
              this.setState({
                hotel: m,
              });

              console.error("e", e);
            });
        })
        .catch((e) => console.error("e", e));
    }
  }

  componentDidMount() {
    Axios.get("/api/all")
      .then((res) => {
        console.log(res.data);

        this.setState({ hotel: res.data });
      })

      .catch((e) => console.log(e));
  }

  Handleform2submit(event) {
    // review
    event.preventDefault();
    let r = document.getElementById("rating").textContent;
    if (r > 0) {
      let name = document.getElementById("hotelSelect").value;
      let id = matchid(name, this.state.hotel);
      console.log(id);
      let form2 = {
        name: name,
        rating: r,
        review: document.getElementById("Textarea").value,
      };

      Axios.post("/add/reviews", form2)
        .then((res) => {
          console.log(res.data);
          this.setState({ hotel: res.data });
        })
        .catch((e) => console.log(e));
    } else {
      alert("rating not filled");
    }
  }
  render() {
    const h = this.state.hotel.map((h) => h.name);
    // console.log(Trendy_Metropolitan.bg);
    return (
      <>
        <div className="row" style={{ background: understated_versatile.bg }}>
          <div className="col-sm-6">
            <Form1
              bg={understated_versatile.fog}
              FShandle={this.fileSectedhandle}
              submitform={this.hotelFormsubmit}
            />
          </div>
          <div className="col-sm-6">
            <Form2
              bg={understated_versatile.icicle}
              Hotelnames={h}
              submitform={this.Handleform2submit}
            />
          </div>
        </div>
        {Object.values(groupBy(this.state.hotel, "city")).map((hotel, k) => (
          <City key={k} hotel={hotel} citynum={k}></City>
        ))}
      </>
    );
  }
}
function matchid(name, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].name == name) {
      return arr[i]._id;
    }
  }
}
function find(arr, string) {
  let b = arr.find((element) => element == string);
  if (b !== string) return false;
  else return true;
}
function Uniq(array) {
  var unique = [];
  array.forEach((element) => {
    if (unique.indexOf(element) === -1) unique.push(element);
  });
  return unique;
}

export default Body;

function titleCase(str) {
  var splitStr = str.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }

  return splitStr.join(" ");
}
function alertonerr(err) {
  if (err !== undefined) {
    alert("errors, check your console ");
  }
}
function name(str) {
  let r = str.replace(/[,\/#!$%\^&\*;@\"\':{}=\-_`<>\?~()]/g, "").split(".");
  let rend = r[r.length - 1];
  let m = r.slice(0, r.length - 1).join("");
  m = m + "." + rend;
  return m;
}
