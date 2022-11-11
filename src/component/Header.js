import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let linkColor = {
      color: "white",
      width: "5%",
      margin: "auto 15px auto 0",
    };
    return (
      <div
        className="row"
        style={{
          backgroundColor: "black",
          borderBottom: "2px solid white",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {this.props.location !== "login" ? (
          <div className="col-2 col-md-1">
            <button
              onClick={() => {
                this.props.sh(!this.props.h);
              }}
              className={
                "btn " + (!this.props.h ? "btn-primary" : "btn-danger")
              }
              style={{ width: "100%", height: "100%" }}
            >
              {!this.props.h ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="23"
                  fill="currentColor"
                  className="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              ) : (
                <span aria-hidden="true">&times;</span>
              )}
            </button>
          </div>
        ) : (
          <div></div>
        )}
        <div>
          <a href="/">
            {" "}
            <img
              src="./logo.png"
              alt="the great hotel app logo"
              style={{
                width: "200px",
                height: 100,
                marginLeft: "0%",
              }}
            />
          </a>
        </div>
        {this.props.location !== "login" ? (
          <>
            {this.props.user == null ? (
              <Link to="/login" style={linkColor}>
                Login
              </Link>
            ) : (
              <Link to="/logout" style={linkColor}>
                Logout
              </Link>
            )}
          </>
        ) : (
          <Link to="/" style={linkColor}>
            Home
          </Link>
        )}
      </div>
    );
  }
}

export default Header;
