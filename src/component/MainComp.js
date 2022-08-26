import React from "react";
import Header from "./Header";
import Body from "./Body";
import Topbar from "./Topbar";
import Footer from "./footer.js";
let n =
  "The website uses heroku for its deployment where the filesystem is ephemeral. ";

class MainComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sh: false };
    // console.log();
  }

  render() {
    return (
      <>
        <header>
          <Topbar
            txt={n}
            url="https://help.heroku.com/K1PPS2WM/why-are-my-file-uploads-missing-deleted"
          />
          <Header
            sh={(h) => {
              this.setState({ sh: !this.state.sh });
            }}
            h={this.state.sh}
            user={this.props.location.state || null}
          />{" "}
        </header>
        <Body user={this.props.location.state || null} hidesf={this.state.sh} />
        <Footer />
      </>
    );
  }
}
export default MainComp;
