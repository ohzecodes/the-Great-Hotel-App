import React, { Suspense } from "react";
import "./style.css";
import Form1 from "./Form1";
import Axios from "axios";
import { FORM_ENUM } from "./formSubmitEnum";

const Wrapper = React.lazy(() =>
  import(/* webpackPreload: true */ "./Wrapper")
);

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

class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hotel: [],
      file: null,
      // 0: not filled; 1 is pass; -1 is error
      form1Submit: FORM_ENUM.NOTFILLED,
      form2Submit: FORM_ENUM.NOTFILLED,
    };
    this.hotelFormsubmit = this.hotelFormsubmit.bind(this);
    this.Handleform2submit = this.Handleform2submit.bind(this);
    this.fileSectedhandle = this.fileSectedhandle.bind(this);

    this.clearMsgForm2 = this.clearMsgForm2.bind(this);
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
          const x = {
            name: document.getElementById("name").value,
            city: titleCase(document.getElementById("city").value + ""),
            streetAddress: titleCase(
              document.getElementById("Address").value + ""
            ),
            website: document.getElementById("website").value + "",
            filepath: res.data.path,
          };
          console.log();
          var m = this.state.hotel.splice(0);
          Axios.post("/add/hotels", x)
            .then((r) => {
              this.setState({
                hotel: [...m, r.data],
                form1Submit: FORM_ENUM.SUCCESS,
              });
              alertonerr(r.data.errors);
              console.log(this.state.hotel);
            })
            .catch((e) => {
              this.setState({
                hotel: m,
                form1Submit: FORM_ENUM.ERROR,
              });

              console.log("e", e);
            });
        })
        .catch((e) => {
          console.error("e", e);
          this.setState({
            form1Submit: FORM_ENUM.ERROR,
          });
        });
    }
  }

  componentDidMount() {
    Axios.get("/api/all")
      .then((res) => {
        this.setState({ hotel: res.data });
      })

      .catch((e) => console.log(e));
  }

  Handleform2submit(event) {
    // review
    event.preventDefault();

    const r = document.getElementById("rating").textContent;
    if (r > 0) {
      const name = document.getElementById("recipient-name").value;

      const form2 = {
        name: name,
        rating: r,
        review: document.getElementById("Textarea").value,
      };
      // find which hotel is the rating to
      let current = this.state.hotel.filter((e) => e.name == name)[0];

      Axios.post("/add/reviews", form2)
        .then((res) => {
          const n = this.state.hotel.map((e) => {
            if (e.name === current.name) {
              current.rev.push(res.data);
              return current;
            } else return e;
          });
          // 0: not filled; 1 is pass; -1 is error
          // form2Sumit: 0,
          console.log(n);
          this.setState({ hotel: n, form2Submit: FORM_ENUM.SUCCESS });
        })

        .catch((e) => {
          console.log(e);
          this.setState({ form2Submit: FORM_ENUM.ERROR });
        });
    } else {
      alert("rating not filled");
    }
  }

  clearMsgForm2() {
    this.setState({ form2Submit: FORM_ENUM.NOTFILLED });
  }

  render() {
    let h1style = {
      textAlign: "center",
      textTransform: "capitalize",
      fontFamily: "cursive",
      fontSize: "40px",
    };
    return (
      <>
        <div
          id="firstrow"
          className="row"
          style={{
            backgroundColor: "#1F271B",
            paddingBottom: "20px",
            borderBottom: "2px solid white",
          }}
        >
          <div className="col-sm-6">
            <Form1
              filename={this.state.file == null ? "" : this.state.file.name}
              submit={this.state.form1Submit}
              bg={"#f4f3ee"}
              FShandle={this.fileSectedhandle}
              submitform={this.hotelFormsubmit}
            />
          </div>
          <div
            className="col-sm-6"
            id="introtxt"
            style={{
              color: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h1 style={h1style}>rate your favorite hotels,</h1>
            <h1 style={h1style}>anonymously</h1>
          </div>
        </div>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Wrapper
            clearMsgForm2={this.clearMsgForm2}
            hotel={this.state.hotel}
            Handleform2submit={this.Handleform2submit}
            submit={this.state.form2Submit}
          />
        </Suspense>
      </>
    );
  }
}

export default Body;

/*
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
function matchid(name, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].name == name) {
      return arr[i]._id;
    }
  }
}


}*/
