import React, { Component } from "react";
import ShowRating from "./showratings";

function Modal(props) {
  console.log(props.rev);
  var name = props.name;
  const id = props.id;
  let btnstyle = {
    width: "80%",
    position: "absolute",
    bottom: "2%",
    padding: 6,
    marginLeft: "10%",
  };
  const len = props.rev.length;
  return (
    <div>
      <button
        style={btnstyle}
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target={`#Modal${id}`}
      >
        View Ratings
      </button>

      <div className="modal" id={`Modal${id}`} role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {name}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-body">
              <table className="container">
                <thead>
                  <tr className="row">
                    <th className="col-9 " style={{ textAlign: "center" }}>
                      Review
                    </th>
                    <th className="col-3 " style={{ textAlign: "center" }}>
                      Rating
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {props.rev.map((r, key) => (
                    <tr
                      style={{
                        borderBottom: len > 1 ? "1px solid #dee2e6" : null,
                      }}
                      className="row"
                      key={key}
                    >
                      <td className="col-9 ">{r.review}</td>
                      <td className="col-3 " style={{ paddingRight: 0 }}>
                        <ShowRating width="30px" rating={r.rating} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="modal-footer" style={{ borderTop: 0 }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Modal;
