import React, { Suspense, useEffect } from "react";
import "./style.css";
import Form1 from "./Form1";
import Axios from "axios";
import { FORM_ENUM } from "./formSubmitEnum";
import { bgcolors } from "./color";
import { Link } from "react-router-dom";
let bg = bgcolors.PineTree || "white";
console.log(bg);

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

function name(str) {
  let r = str.replace(/[,\/#!$%\^&\*;@\"\':{}=\-_`<>\?~()]/g, "").split(".");
  let rend = r[r.length - 1];
  let m = r.slice(0, r.length - 1).join("");
  m = m + "." + rend;
  return m;
}
function check(str = [], min = 5) {
  let invalid = str.filter(
    (a) => document.getElementById(a).value.length < min
  );

  if (invalid.length != 0) {
    let mainstr = `${invalid.map(
      (str) => titleCase(str) + " must be minimum 5 characters \n"
    )}`;
    alert(mainstr.replace(new RegExp(",", "g"), ""));

    return false;
  } else return true;
}
class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hotel: [],
      hotel_b: [],
      file: null,
      frdisplay: true,
      form1Submit: FORM_ENUM.NOTFILLED,
      form2Submit: FORM_ENUM.NOTFILLED,
    };
    this.searchform = this.searchform.bind(this);
    this.hotelFormsubmit = this.hotelFormsubmit.bind(this);
    this.Handleform2submit = this.Handleform2submit.bind(this);
    this.fileSectedhandle = this.fileSectedhandle.bind(this);
    this.clearMsgForm2 = this.clearMsgForm2.bind(this);
    this.fileRM = this.fileRM.bind(this);
    // console.log();
  }

  fileSectedhandle(event) {
    this.setState({ file: event.target.files[0] });
  }

  hotelFormsubmit(event) {
    event.preventDefault();

    let file = new FormData();
    if (this.state.file == null) {
      alert("Please Attach an Image for the Hotel");
      return 0;
    }
    if (!check(["name", "city", "Address", "website"])) {
      return 0;
    }

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

          var m = this.state.hotel.splice(0);
          Axios.post("/add/hotels", x)
            .then((r) => {
              this.setState({
                hotel: [...m, r.data],
                hotel_b: [...m, r.data],
                form1Submit: FORM_ENUM.SUCCESS,
                file: null,
              });
            })
            .catch((e) => {
              this.setState({
                hotel: m,
                hotel_b: m,
                form1Submit: FORM_ENUM.ERROR,
              });

              console.log(e);
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
        this.setState({ hotel: res.data, hotel_b: res.data });
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
          this.setState({
            hotel: n,
            hotel_b: n,
            form2Submit: FORM_ENUM.SUCCESS,
          });
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
  searchform(e) {
    e.preventDefault();
    const dd = document.getElementById("searchbox").value;
    if (dd.length !== 0) {
      let m = this.state.hotel.filter(
        (e) => e.city.toUpperCase() == dd.toUpperCase()
      );
      if (m.length != 0) {
        this.setState({ hotel: m, frdisplay: false });
      } else {
        alert(`This city doesn't exist ${dd}`);
      }
    } else {
      if (this.state.hotel.length != this.state.hotel_b) {
        this.setState({ hotel: this.state.hotel_b, frdisplay: true });
      }
    }
  }
  fileRM() {
    this.setState({ file: null });
  }
  render() {
    let h1style = {
      textAlign: "center",
      textTransform: "capitalize",
      fontFamily: "Montserrat",
      fontSize: "40px",
    };
    let image;
    if (this.state.file != null) {
      image = URL.createObjectURL(this.state.file);
    } else image = null;

    let hidefr = { display: !this.state.frdisplay ? "none" : "flex" };
    return (
      <>
        <div id={"searchformdiv "} className={"sfd " + this.props.hidesf}>
          <form
            onSubmit={this.searchform}
            id="search"
            className={"form-inline " + this.props.hidesf}
            // style={{ ...hide,  }}
          >
            <div
              className="form-group  mb-2"
              style={{ marginRight: 0, paddingRight: 0 }}
            >
              <label htmlFor="searchbox" className="sr-only">
                Password
              </label>
              <input type="text" id="searchbox" placeholder="Search city" />
            </div>
            <button
              type="submit"
              value="search"
              className="btn btn-primary mb-2"
            >
              search
            </button>
          </form>
        </div>
        <div
          id="firstrow"
          className="row"
          style={{ backgroundColor: bg, ...hidefr }}
        >
          <div className="col-md-5 col-sm-9" id="addformdiv">
            {this.props.user !== null ? (
              <Form1
                filename={this.state.file == null ? "" : this.state.file.name}
                submit={this.state.form1Submit}
                bg={"#f4f3ee"}
                FShandle={this.fileSectedhandle}
                fileremove={this.fileRM}
                submitform={this.hotelFormsubmit}
                image={image}
              />
            ) : (
              <div
                className="formqwe"
                style={{
                  width: 495.859375,
                  height: 459,
                }}
              >
                {" "}
                <h1
                  style={{
                    ...h1style,
                    top: "50%",
                    transform: "translateY(-50%)",
                    // bottom: "50%",
                    position: "absolute",
                  }}
                >
                  please <Link to="/login"> log in</Link> to add a hotel
                </h1>
              </div>
            )}
          </div>
          <div className="col-md-7 col-sm-9" id="introtxt" style={{}}>
            <h1 style={h1style}>rate your favorite hotels,</h1>
            <h1 style={h1style}>anonymously</h1>
          </div>
        </div>
        <Suspense
          fallback={
            <h1 style={{ textAlign: "center", fontFamily: "cursive" }}>
              Loading...
            </h1>
          }
        >
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
