import React from "react";

const upload = (props) => {
  return (
    <div className="card border-light mb-3 mt-2 shadow p-3 mb-5 bg-white rounded">
      <div className="card-header">
        <h3 style={{ color: "#555", marginLeft: "12px" }}>Audio|Video Upload</h3>
        <p className="text-muted" style={{ marginLeft: "12px" }}>
          Upload Size: ( Max 20MB )
        </p>
      </div>
      <div className="card-body">
        <p className="card-text">Please upload Your Media File</p>
        <input type="file" onChange={(event) => props.singleFileChangedHandler(event)} />
        <div className="mt-3">
          <button className="btn btn-info btn-lg" onClick={props.singleFileUploadHandler}>
            Upload!{props.processBar ? <span className="spinner-grow spinner-grow-lg" /> : null}
          </button>
        </div>
      </div>
    </div>
  );
};

export default upload;
