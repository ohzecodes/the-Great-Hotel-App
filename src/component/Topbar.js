import React from "react";
function Topbar(prop) {
  return (
    <a href={prop.url}>
      <div className="alert alert-info alert-dismissible" role="alert">
        <button className="close" data-dismiss="alert">
          ×
        </button>
        {prop.txt}
        <span style={{ color: "#0079fa", textDecoration: "underline" }}>
          Click here to learn more
        </span>
      </div>
    </a>
  );
}

export default Topbar;
