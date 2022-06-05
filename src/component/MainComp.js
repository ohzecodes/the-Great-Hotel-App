import React from "react";
import Header from "./Header";
import Body from "./Body";
import Topbar from "./Topbar";

let n =
  "The website uses heroku for its deployment where the filesystem is ephemeral. ";

class MainComp extends React.Component {
  render() {
    return (
      <>
        <Topbar
          txt={n}
          url="https://help.heroku.com/K1PPS2WM/why-are-my-file-uploads-missing-deleted"
        />
        <Header />
        <Body />
        <footer style={{ background: "black", color: "white", padding: 25 }}>
          <h3
            style={{
              margin: 0,
              textAlign: "center",

              fontFamily: "cursive",
            }}
          >
            There is something else to show you:{" "}
            <a
              style={{ fontFamily: "SignPainter" }}
              href="https://github.com/ohzecodes/theGreatHotelApp"
            >
              {" "}
              A github page
            </a>
          </h3>
        </footer>
      </>
    );
  }
}
export default MainComp;
