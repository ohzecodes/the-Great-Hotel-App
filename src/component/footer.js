import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        background: "black",
        color: "white",
        padding: 25,
        letterSpacing: 4,
      }}
    >
      <h3
        style={{
          margin: 0,
          textAlign: "center",

          fontWeight: 300,
        }}
      >
        There is something else to show you:{" "}
        <a href="https://github.com/ohzecodes/theGreatHotelApp">
          {" "}
          A github page
        </a>
      </h3>
      <div style={{ textAlign: "center" }}>
        <a href="/" style={{ margin: "auto" }}>
          {" "}
          <img
            src="./logo.png"
            alt="the great hotel app logo"
            style={{
              height: 100,
              marginLeft: "0%",
            }}
          />
        </a>
      </div>
      <p
        style={{
          textAlign: "center",
          fontWeight: 300,
          fontFamily: "Montserrat",
        }}
      >
        {" "}
        The Great Hotel App &copy; 2019
      </p>
    </footer>
  );
};

export default Footer;
