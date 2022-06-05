import React from "react";

const Model = ({ children, clearMsgForm2, reset }) => {
  return (
    <div className="modal fade" id="exampleModal" data-backdrop="static">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Modal title
            </h5>

            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                clearMsgForm2();
                reset();
              }}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body" style={{ paddingTop: 0 }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Model;
