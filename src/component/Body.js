import React from "react";
import "./style.css";
import Form1 from "./Form1";
import Axios from "axios";
import Form2 from "./Form2";
import City from "./City";

class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hotelNames: [],
      hotel: [],
      cities: [],
      file: null,
      filepath: ""
    };
    this.hotelFormsubmit = this.hotelFormsubmit.bind(this);
    this.Handleform2submit = this.Handleform2submit.bind(this);
    this.fileSectedhandle = this.fileSectedhandle.bind(this);
  }

  // FIXME:

  fileSectedhandle(event) {
    this.setState({ file: event.target.files[0] });
  }

  hotelFormsubmit(event) {
    event.preventDefault();
    let file = new FormData();
    if (this.state.file != null) {
      file.append("hotelImg", this.state.file, name(this.state.file.name));

      Axios.post("/images", file)
        .then(res => {
          let x = {
            name: titleCase(document.getElementById("name").value + ""),
            city: titleCase(document.getElementById("city").value + ""),
            streetAddress: titleCase(
              document.getElementById("Address").value + ""
            ),
            website: document.getElementById("website").value + "",
            filepath: res.data.path
          };

          var h = this.state.hotelNames.slice(0);
          var m = this.state.hotel.splice(0);
          var c = this.state.cities.splice(0);
          Axios.post("/add/hotels", x).then(r => {
            if (!find(c, r.data.city)) {
              c.push(r.data.city);
            }
            m.push(r.data);
            h.push(x.name);

            this.setState({
              hotel: m,
              hotelNames: h,
              cities: c
            });
            alertonerr(r.data.errors);
            console.log(r.data);
          });
        })
        .catch(e => console.log("e", e));
    }
  }

  // FIXME: it should update everytime the hotel is added
  componentDidMount() {
    let arr = [];
    let city = [];
    Axios.get("/api/all")
      .then(res => {
        arr = res.data.map(item => item.name);
        city = Uniq(res.data.map(item => item.city));
        this.setState({ hotelNames: arr, hotel: res.data, cities: city });
      })

      .catch(e => console.log(e));
  }

  Handleform2submit(event) {
    // review
    event.preventDefault();
    let r = Number(getRadioValues());

    let name = document.getElementById("hotelSelect").value;
    let id = matchid(name, this.state.hotel);

    // rating:{type: Number,required: true},
    // review: {type: String }

    let form2 = {
      name: name,
      rating: r,
      review: document.getElementById("Textarea").value
    };

    Axios.post("/add/reviews", form2)
      .then(res => {
        alertonerr(res.data.errors);
        console.log("cid", res.data);
      })
      .catch(e => console.log(e));
  }

  render() {
    return (
      <>
        <div className="row" style={{ backgroundColor: "black" }}>
          <div className="col-sm-6">
            <Form1
              FShandle={this.fileSectedhandle}
              submitform={this.hotelFormsubmit}
            />
          </div>
          <div className="col-sm-6">
            <Form2
              Hotelnames={this.state.hotelNames}
              submitform={this.Handleform2submit}
            />
          </div>
        </div>

        {this.state.cities.map((r, key) => (
          <City key={key} name={r} />
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
  let b = arr.find(element => element == string);
  if (b !== string) return false;
  else return true;
}
function Uniq(array) {
  var unique = [];
  array.forEach(element => {
    if (unique.indexOf(element) === -1) unique.push(element);
  });
  return unique;
}

function getRadioValues() {
  var val;

  for (var i = 1; i < 6; i++) {
    let doc = document.getElementById("radio" + i);
    if (doc.checked) {
      val = doc.value;
      break;
    }
  }
  return val;
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

