import React, { useState } from "react";

function Stars({ avg }) {
  let n, m;

  // if (avg !== 0 && !isNaN(avg)) {
  n = [...Array(avg).keys()].map((e, key) => (
    <svg
      key={key}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      className="bi bi-star-fill"
      viewBox="0 0 16 16"
      height="10px"
    >
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
    </svg>
  ));
  m = [...Array(5 - avg).keys()].map((e, key) => (
    <svg
      key={key}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      className="bi bi-star"
      viewBox="0 0 16 16"
      height="10px"
    >
      <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
    </svg>
  ));

  return (
    <>
      {n}
      {m}
    </>
  );
  // } else return null;
}

function Hotel(props) {
  const { _id, city, filepath, name, streetAddress, website, rev, c } = props;
  let av;
  // console.log(rev);
  if (rev.length != 0) {
    av = Math.round(
      rev.map((e) => e.rating).reduce((prev, c) => prev + c, 0) / rev.length
    );
  } else {
    av = 0;
  }
  $("#exampleModal").on("show.bs.modal", function (event) {
    var button = $(event.relatedTarget);
    var recipient = button.data("whatever");

    var modal = $(this);
    modal.find(".modal-title").text(`Please Rate ${recipient}`);
    modal.find("input#recipient-name").val(recipient);
  });

  return (
    <>
      <div
        className={"card " + c}
        style={{
          border: 0,
          borderBottomRightRadius: "3px",
          borderBottomLeftRadius: "3px",
        }}
      >
        <a href={`./show/${city}/${name}`}>
          <img
            src={filepath}
            className="card-img"
            height="243px"
            style={{
              height: 243,
              border: "1px solid white",
              borderRadius: 4,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
            }}
            alt={"A picture of " + name}
          />
        </a>
        <div className="card-body" style={{ paddingLeft: 0, paddingBottom: 0 }}>
          <h3 className="card-title" style={{ textAlign: "center" }}>
            {name}
          </h3>
          <ul style={{ listStyle: "none", textAlign: "center", padding: 0 }}>
            <li>Street Address: {streetAddress}</li>
            <li>
              <a href={website}>{website.toLowerCase().substring(8)}</a>
            </li>
          </ul>
          <div
            style={{
              fontSize: "13px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              marginRight: 20,
            }}
          >
            <Stars avg={av} />
            <p>{rev.length}</p>
          </div>
        </div>
        <div className="button-div" style={{ width: "100%", display: "flex" }}>
          <a
            href={`./show/${city}/${name}`}
            className="btn btn-info"
            style={{
              borderRadius: 0,
              borderBottomLeftRadius: "2px",
              padding: "10px",
              flex: 1,
            }}
          >
            see reviews
          </a>
          <button
            type="button"
            className="btn btn-primary"
            data-toggle="modal"
            data-target="#exampleModal"
            data-whatever={name}
            style={{
              flex: 1,
              borderRadius: 0,
              borderBottomRightRadius: "2px",
            }}
          >
            Rate This Hotel
          </button>
        </div>
      </div>
    </>
  );
}

export default Hotel;
